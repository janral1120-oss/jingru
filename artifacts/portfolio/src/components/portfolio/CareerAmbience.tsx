import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type LightPhase = 'before' | 'spotlight' | 'blend' | 'sunset' | 'after';

/** Smoothstep easing 0→1 */
function smoothstep(t: number) {
  t = Math.max(0, Math.min(1, t));
  return t * t * (3 - 2 * t);
}

export function CareerAmbience() {
  const [phase, setPhase]   = useState<LightPhase>('before');
  const [prog,  setProg]    = useState(0);
  const [beamX, setBeamX]   = useState<number | null>(null);
  const beamTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // ── Beam scheduling ─────────────────────────────────────────────────────────
  const scheduleBeam = () => {
    if (beamTimer.current) clearTimeout(beamTimer.current);
    const delay = 5000 + Math.random() * 6000;
    beamTimer.current = setTimeout(() => {
      setBeamX(10 + Math.random() * 80); // 10%–90% of viewport width
      setTimeout(() => setBeamX(null), 3200);
      scheduleBeam();
    }, delay);
  };

  useEffect(() => {
    let latestPhase: LightPhase = 'before';

    function onScroll() {
      const section = document.getElementById('career');
      if (!section) return;

      const vpH    = window.innerHeight;
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const scrollY = window.scrollY;

      // progress: 0 = entering viewport, 1 = fully scrolled through
      const raw    = (scrollY + vpH * 0.5 - top) / height;
      const clamped = Math.max(0, Math.min(1, raw));

      // Determine phase
      let p: LightPhase;
      if (raw < 0)    p = 'before';
      else if (raw > 1) p = 'after';
      else if (clamped < 0.35) p = 'spotlight';
      else if (clamped < 0.6)  p = 'blend';
      else                      p = 'sunset';

      setPhase(p);
      setProg(clamped);
      latestPhase = p;
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  // Start/stop beam based on phase
  useEffect(() => {
    if (phase === 'spotlight' || phase === 'blend') {
      scheduleBeam();
    } else {
      if (beamTimer.current) clearTimeout(beamTimer.current);
      setBeamX(null);
    }
    return () => { if (beamTimer.current) clearTimeout(beamTimer.current); };
  }, [phase]);

  if (phase === 'before' || phase === 'after') return null;

  // Interpolated opacities
  const spotAlpha = smoothstep(1 - prog / 0.7);  // 1→0 over first 70% of section
  const sunAlpha  = smoothstep((prog - 0.3) / 0.7); // 0→1 from 30% to 100%
  const showBeam  = beamX !== null && spotAlpha > 0.15;

  return (
    <div className="pointer-events-none fixed inset-0 z-[22]" aria-hidden="true">

      {/* ── Spotlight vignette ───────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 transition-opacity duration-[1200ms]"
        style={{
          opacity: spotAlpha * 0.72,
          background: [
            'radial-gradient(ellipse 55% 65% at 27% 50%, transparent 18%, rgba(0,0,0,0.42) 55%, rgba(0,0,0,0.72) 100%)',
          ].join(', '),
        }}
      />

      {/* ── Subtle scan-line top edge (stage feel) ───────────────────────────── */}
      <div
        className="absolute top-0 inset-x-0 h-24 transition-opacity duration-[1200ms]"
        style={{
          opacity: spotAlpha * 0.35,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0.6), transparent)',
        }}
      />

      {/* ── Sweeping vertical light beam ─────────────────────────────────────── */}
      <AnimatePresence>
        {showBeam && (
          <motion.div
            key={`beam-${beamX}`}
            className="absolute inset-y-0 w-[2px]"
            style={{
              left: `${beamX}%`,
              background: 'linear-gradient(to bottom, transparent 0%, rgba(230,161,87,0.18) 25%, rgba(230,161,87,0.28) 50%, rgba(230,161,87,0.18) 75%, transparent 100%)',
              filter: 'blur(1px)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0.7, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, times: [0, 0.15, 0.85, 1], ease: 'easeInOut' }}
          />
        )}
      </AnimatePresence>

      {/* ── Sunset ambient glow ───────────────────────────────────────────────── */}
      <div
        className="absolute inset-0 transition-opacity duration-[1400ms]"
        style={{
          opacity: sunAlpha * 0.85,
          background: [
            'radial-gradient(ellipse 90% 70% at 72% 80%, rgba(230,161,87,0.11) 0%, rgba(200,110,50,0.06) 45%, transparent 70%)',
            'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(180,80,30,0.05) 0%, transparent 60%)',
          ].join(', '),
        }}
      />

      {/* ── Warm horizon strip at bottom (sunset) ────────────────────────────── */}
      <div
        className="absolute bottom-0 inset-x-0 h-28 transition-opacity duration-[1400ms]"
        style={{
          opacity: sunAlpha * 0.5,
          background: 'linear-gradient(to top, rgba(230,120,40,0.06), transparent)',
        }}
      />
    </div>
  );
}
