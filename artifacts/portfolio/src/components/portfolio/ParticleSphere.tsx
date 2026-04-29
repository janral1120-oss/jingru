import { useEffect, useRef } from 'react';

// ─── Constants ────────────────────────────────────────────────────────────────
const N          = 1500;   // particle count
const K          = 6.5;    // spring stiffness (higher = snappier return)
const DAMP       = 3.8;    // velocity damping  (higher = less oscillation)
const MOUSE_R    = 155;    // repulsion radius in screen px
const MOUSE_F    = 340;    // repulsion force magnitude (px/s)
const ROT_SPEED  = 0.15;   // radians per second (Y-axis auto-rotate)
const ROT_X      = 0.13;   // fixed tilt toward viewer

// Amber + warm sunset palette (weighted)
const PALETTE = [
  '#e6a157', '#e6a157', '#e6a157', '#e6a157', // primary amber    ×4
  '#f2be78', '#f2be78',                         // lighter gold     ×2
  '#d4844a', '#c97030',                         // deep orange      ×2
];

// Fibonacci sphere – uniform point distribution
function fibSphere(n: number): [number, number, number][] {
  const gr = Math.PI * (3 - Math.sqrt(5));
  return Array.from({ length: n }, (_, i) => {
    const y  = 1 - (i / (n - 1)) * 2;
    const r  = Math.sqrt(Math.max(0, 1 - y * y));
    const th = gr * i;
    return [r * Math.cos(th), y, r * Math.sin(th)] as [number, number, number];
  });
}

type P = {
  ox: number; oy: number; oz: number;   // unit-sphere resting position
  sx: number; sy: number;               // 2-D screen-space displacement
  vsx: number; vsy: number;             // screen-space velocity
  color: string;
  alphaBase: number;
};

export function ParticleSphere({ className = '' }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // ── Sizing ────────────────────────────────────────────────────────────────
    let cw = 0, ch = 0;
    function resize() {
      cw = canvas!.offsetWidth;
      ch = canvas!.offsetHeight;
      canvas!.width  = cw * dpr;
      canvas!.height = ch * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();

    // ── Particles ─────────────────────────────────────────────────────────────
    const base   = fibSphere(N);
    const rand01 = () => Math.random();
    const particles: P[] = base.map(([ox, oy, oz]) => ({
      ox, oy, oz,
      sx: 0, sy: 0, vsx: 0, vsy: 0,
      color:     PALETTE[Math.floor(rand01() * PALETTE.length)],
      alphaBase: 0.35 + rand01() * 0.52,
    }));

    // ── State ─────────────────────────────────────────────────────────────────
    let rotY  = rand01() * Math.PI * 2;
    let last  = performance.now();
    let rafId = 0;
    const mouse = { x: -9999, y: -9999 };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    // ── RAF loop ──────────────────────────────────────────────────────────────
    function frame(now: number) {
      rafId = requestAnimationFrame(frame);
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      rotY += dt * ROT_SPEED;

      // Sphere display parameters (responsive)
      const R  = Math.min(cw, ch) * 0.38;  // sphere radius
      const cx = cw  * 0.30;               // center-x (sits behind avatar col)
      const cy = ch  * 0.50;               // center-y
      const fv = 2.3;                       // perspective strength

      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(ROT_X), sinX = Math.sin(ROT_X);

      // ── 1. Project all particles ───────────────────────────────────────────
      type Item = { px: number; py: number; pz: number; p: P };
      const items: Item[] = new Array(N);
      for (let i = 0; i < N; i++) {
        const { ox, oy, oz, sx, sy } = particles[i];
        // Rotate Y
        const x1 = ox * cosY + oz * sinY;
        const z1 = -ox * sinY + oz * cosY;
        // Rotate X (fixed tilt)
        const y2 =  oy * cosX - z1 * sinX;
        const z2 =  oy * sinX + z1 * cosX;
        // Perspective project + screen-space offset
        const sc = fv / (fv + z2);
        items[i] = {
          px: cx + x1 * R * sc + sx,
          py: cy + y2 * R * sc + sy,
          pz: z2,
          p: particles[i],
        };
      }

      // ── 2. Physics (mouse repulsion + spring return) ───────────────────────
      for (const { px, py, p } of items) {
        const mdx = px - mouse.x;
        const mdy = py - mouse.y;
        const d2  = mdx * mdx + mdy * mdy;
        if (d2 < MOUSE_R * MOUSE_R && d2 > 0.01) {
          const dist  = Math.sqrt(d2);
          const force = (1 - dist / MOUSE_R) * MOUSE_F * dt;
          p.vsx += (mdx / dist) * force;
          p.vsy += (mdy / dist) * force;
        }
        // Spring: a = -K·s  –  B·v
        p.vsx += (-K * p.sx - DAMP * p.vsx) * dt;
        p.vsy += (-K * p.sy - DAMP * p.vsy) * dt;
        p.sx  += p.vsx * dt * 60;
        p.sy  += p.vsy * dt * 60;
      }

      // ── 3. Sort back → front ──────────────────────────────────────────────
      items.sort((a, b) => a.pz - b.pz);

      // ── 4. Render ─────────────────────────────────────────────────────────
      ctx.clearRect(0, 0, cw, ch);
      for (const { px, py, pz, p } of items) {
        const depth = (pz + 1) * 0.5;               // 0 = back, 1 = front
        const size  = 0.65 + depth * 1.6;
        const alpha = p.alphaBase * (0.22 + depth * 0.78);
        ctx.globalAlpha = alpha;
        ctx.fillStyle   = p.color;
        ctx.beginPath();
        ctx.arc(px, py, size, 0, 6.283185);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    }

    rafId = requestAnimationFrame(frame);
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    />
  );
}
