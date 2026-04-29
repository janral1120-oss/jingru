import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { skillClusters } from '@/lib/portfolioData';

type Pt = { x: number; y: number };

type LabelNode = {
  id: string;
  label: string;
  detail?: string;
  pos: Pt;
  kind: 'center' | 'hub' | 'leaf';
};

type LineSpec = { from: Pt; to: Pt; key: string; seed: number };

const VW = 1300;
const VH = 880;

// ─── Pentagon layout: 5 clusters evenly spaced from top ───
// Angles: -π/2, -π/10, 0.3π, 0.7π, -0.9π   (72° apart)
const CLUSTER_LAYOUT: Record<string, { hubAngle: number; hubR: number; childR: number; childSpread: number }> = {
  management:   { hubAngle: -Math.PI / 2,       hubR: 270, childR: 420, childSpread: 0.65 },
  marketing:    { hubAngle: -Math.PI / 10,       hubR: 270, childR: 420, childSpread: 0.50 },
  'data-ops':   { hubAngle:  Math.PI * 0.30,     hubR: 270, childR: 430, childSpread: 0.68 },
  'user-insight': { hubAngle: Math.PI * 0.70,    hubR: 270, childR: 415, childSpread: 0.45 },
  'ai-apps':    { hubAngle: -Math.PI * 0.90,     hubR: 270, childR: 430, childSpread: 0.55 },
};

function seededRandom(seed: number) {
  let s = seed;
  return () => {
    s = (s * 9301 + 49297) % 233280;
    return s / 233280;
  };
}

function buildLayout(clusters: typeof skillClusters) {
  const labels: LabelNode[] = [
    { id: 'center', label: 'Skill Map', pos: { x: 0, y: 0 }, kind: 'center' },
  ];
  const lines: LineSpec[] = [];

  clusters.forEach((cluster, ci) => {
    const layout = CLUSTER_LAYOUT[cluster.id];
    if (!layout) return;

    const hubPos: Pt = {
      x: Math.cos(layout.hubAngle) * layout.hubR,
      y: Math.sin(layout.hubAngle) * layout.hubR,
    };
    labels.push({ id: cluster.id, label: cluster.label, pos: hubPos, kind: 'hub' });
    lines.push({ from: { x: 0, y: 0 }, to: hubPos, key: `hub-${cluster.id}`, seed: 7 + ci * 13 });

    const n = cluster.children.length;
    cluster.children.forEach((child, ki) => {
      const t = n === 1 ? 0 : ki / (n - 1) - 0.5;
      const childAngle = layout.hubAngle + t * layout.childSpread;
      const radial = layout.childR + (ki % 2 === 0 ? -18 : 18) + ((ki * 11) % 15);
      const childPos: Pt = {
        x: Math.cos(childAngle) * radial,
        y: Math.sin(childAngle) * radial,
      };

      labels.push({ id: child.id, label: child.label, detail: child.detail, pos: childPos, kind: 'leaf' });
      lines.push({ from: hubPos, to: childPos, key: `${cluster.id}-${child.id}`, seed: ci * 100 + ki * 7 + 3 });
    });
  });

  return { labels, lines };
}

function buildCurve(from: Pt, to: Pt, seed: number) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const dist = Math.sqrt(dx * dx + dy * dy) || 1;
  const rand = seededRandom(seed);

  const px = -dy / dist;
  const py = dx / dist;
  const offset = (rand() - 0.5) * dist * 0.3;
  const cx = (from.x + to.x) / 2 + px * offset;
  const cy = (from.y + to.y) / 2 + py * offset;

  const path = `M ${from.x} ${from.y} Q ${cx} ${cy} ${to.x} ${to.y}`;

  const particles: { x: number; y: number; r: number; o: number }[] = [];
  const count = Math.max(6, Math.round(dist / 14));
  for (let i = 1; i < count; i++) {
    const t = i / count;
    const mt = 1 - t;
    const x = mt * mt * from.x + 2 * mt * t * cx + t * t * to.x;
    const y = mt * mt * from.y + 2 * mt * t * cy + t * t * to.y;
    const jitter = 5 + rand() * 4;
    particles.push({
      x: x + (rand() - 0.5) * jitter,
      y: y + (rand() - 0.5) * jitter,
      r: 0.5 + rand() * 1.6,
      o: 0.35 + rand() * 0.55,
    });
  }
  return { path, particles };
}

export function SkillMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);

  const { labels, lines } = useMemo(() => buildLayout(skillClusters), []);
  const curves = useMemo(
    () => lines.map((l) => ({ ...l, ...buildCurve(l.from, l.to, l.seed) })),
    [lines],
  );

  const ambientParticles = useMemo(() => {
    const rand = seededRandom(317);
    return Array.from({ length: 100 }).map(() => {
      const angle = rand() * Math.PI * 2;
      const r = 70 + rand() * (VW / 2 - 90);
      return {
        x: Math.cos(angle) * r,
        y: Math.sin(angle) * r * 0.85,
        r: 0.35 + rand() * 1.1,
        o: 0.08 + rand() * 0.28,
      };
    });
  }, []);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let raf = 0;
    let pending: { x: number; y: number } | null = null;

    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      pending = {
        x: (e.clientX - rect.left) / rect.width * VW - VW / 2,
        y: (e.clientY - rect.top) / rect.height * VH - VH / 2,
      };
      if (!raf) {
        raf = requestAnimationFrame(() => {
          if (pending) setMouse(pending);
          raf = 0;
        });
      }
    };
    const onLeave = () => setMouse(null);

    el.addEventListener('pointermove', onMove);
    el.addEventListener('pointerleave', onLeave);
    return () => {
      el.removeEventListener('pointermove', onMove);
      el.removeEventListener('pointerleave', onLeave);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section className="py-32 bg-card/30 relative overflow-hidden" id="skills">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            能力图谱 <span className="text-primary">Skill Map</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground/80 tracking-wide">
            五大能力集群环绕中枢 — 越靠近光标，能力越发亮。
          </p>
        </motion.div>

        <div
          ref={containerRef}
          className="relative w-full max-w-6xl mx-auto"
          style={{ aspectRatio: `${VW} / ${VH}` }}
        >
          <svg
            viewBox={`${-VW / 2} ${-VH / 2} ${VW} ${VH}`}
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <radialGradient id="sm-center-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="rgba(230,161,87,0.50)" />
                <stop offset="40%"  stopColor="rgba(230,161,87,0.16)" />
                <stop offset="100%" stopColor="rgba(230,161,87,0)"    />
              </radialGradient>
              <radialGradient id="sm-hub-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%"   stopColor="rgba(230,161,87,0.32)" />
                <stop offset="100%" stopColor="rgba(230,161,87,0)"    />
              </radialGradient>
            </defs>

            <circle cx="0" cy="0" r="220" fill="url(#sm-center-glow)" />

            {ambientParticles.map((p, i) => (
              <circle key={`amb-${i}`} cx={p.x} cy={p.y} r={p.r} fill="rgba(230,161,87,1)" opacity={p.o} />
            ))}

            {curves.map((c) => (
              <g key={c.key}>
                <path d={c.path} fill="none" stroke="rgba(230,161,87,0.15)" strokeWidth="1" strokeLinecap="round" />
                {c.particles.map((p, i) => (
                  <circle key={i} cx={p.x} cy={p.y} r={p.r} fill="rgba(245,240,232,1)" opacity={p.o} />
                ))}
              </g>
            ))}

            {labels
              .filter((l) => l.kind !== 'center')
              .map((l) => (
                <circle
                  key={`hub-glow-${l.id}`}
                  cx={l.pos.x}
                  cy={l.pos.y}
                  r={l.kind === 'hub' ? 58 : 26}
                  fill="url(#sm-hub-glow)"
                  opacity={l.kind === 'hub' ? 0.9 : 0.45}
                />
              ))}
          </svg>

          {labels.map((label) => {
            const xPct = 50 + (label.pos.x / VW) * 100;
            const yPct = 50 + (label.pos.y / VH) * 100;

            let scale = 1;
            let glow = 0;
            if (mouse) {
              const dx = label.pos.x - mouse.x;
              const dy = label.pos.y - mouse.y;
              const dist = Math.sqrt(dx * dx + dy * dy);
              const reach = label.kind === 'leaf' ? 160 : 220;
              if (dist < reach) {
                const t = 1 - dist / reach;
                scale = 1 + t * (label.kind === 'leaf' ? 0.22 : 0.18);
                glow = t;
              }
            }

            const isCenter = label.kind === 'center';
            const isHub = label.kind === 'hub';

            return (
              <div
                key={label.id}
                className={`absolute pointer-events-none whitespace-nowrap text-center ${isCenter ? 'z-30' : isHub ? 'z-20' : 'z-10'}`}
                style={{
                  left: `${xPct}%`,
                  top: `${yPct}%`,
                  transform: `translate(-50%, -50%) scale(${scale})`,
                  transition: 'transform 220ms cubic-bezier(0.22,1,0.36,1), filter 220ms ease-out',
                  filter: `drop-shadow(0 0 ${4 + glow * 16}px rgba(230,161,87,${0.2 + glow * 0.6}))`,
                }}
              >
                {isCenter ? (
                  <div className="relative">
                    <div className="absolute inset-0 -m-6 rounded-full bg-background/70 backdrop-blur-md border border-primary/40 shadow-[0_0_60px_rgba(230,161,87,0.25)]" />
                    <div className="relative font-serif italic font-bold text-2xl md:text-3xl text-primary tracking-[0.22em] px-8 py-4">
                      {label.label}
                    </div>
                  </div>
                ) : isHub ? (
                  <div className="relative">
                    <div className="absolute inset-0 -mx-3 -my-1.5 rounded-full bg-background/60 backdrop-blur-sm border border-primary/35" />
                    <div className="relative font-serif font-semibold text-base md:text-xl text-primary tracking-wider px-4 py-1.5">
                      {label.label}
                    </div>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="absolute inset-0 -mx-2 -my-1 rounded-md bg-background/45 backdrop-blur-[2px]" />
                    <div className="relative px-2.5 py-1">
                      <div className="text-xs md:text-sm font-medium text-foreground/90 tracking-wide">
                        {label.label}
                      </div>
                      {label.detail && (
                        <div className="text-[10px] md:text-[11px] text-secondary/80 mt-0.5 tracking-wider font-mono">
                          {label.detail}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
