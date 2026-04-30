import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import theaterWork from '@assets/theater-work.jpg_1777523190866.JPG';

function TungstenBulbSVG({ lit }: { lit: boolean }) {
  const col = lit ? '#e6a157' : 'rgba(230,161,87,0.55)';
  const fillGlow = lit ? 'rgba(230,161,87,0.30)' : 'rgba(230,161,87,0.06)';
  const glow = lit
    ? 'drop-shadow(0 0 5px rgba(230,161,87,0.85)) drop-shadow(0 0 12px rgba(230,161,87,0.45))'
    : 'none';
  return (
    <svg viewBox="0 0 26 42" fill="none" xmlns="http://www.w3.org/2000/svg"
      style={{ width: 22, height: 36, filter: glow, transition: 'filter 0.5s ease' }}>
      {/* Bulb glass */}
      <ellipse cx="13" cy="14" rx="9" ry="10" fill={fillGlow} stroke={col} strokeWidth="1.2" />
      {/* Tungsten filament coils */}
      <path d="M9 14 Q10 11 11 14 Q12 17 13 14 Q14 11 15 14 Q16 17 17 14"
        stroke={lit ? 'rgba(255,213,100,0.85)' : 'rgba(230,161,87,0.30)'}
        strokeWidth="1.2" strokeLinecap="round" fill="none" />
      {/* Neck */}
      <rect x="10.5" y="23" width="5" height="3.5" rx="1" fill={fillGlow} stroke={col} strokeWidth="1" />
      {/* Base ridges */}
      <rect x="10" y="26" width="6" height="1.2" rx="0.4" fill={col} opacity="0.7" />
      <rect x="10.5" y="28" width="5" height="1.2" rx="0.4" fill={col} opacity="0.55" />
      <rect x="11" y="30" width="4" height="1.2" rx="0.4" fill={col} opacity="0.4" />
      {/* Contact tip */}
      <rect x="12" y="31.5" width="2" height="2" rx="0.5" fill={col} opacity="0.65" />
    </svg>
  );
}

export function TheaterEasterEgg() {
  const [lit, setLit] = useState(false);
  const [pulling, setPulling] = useState(false);
  const [swinging, setSwinging] = useState(false);
  const swingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = () => {
    setPulling(true);
    setTimeout(() => {
      setPulling(false);
      setLit(v => !v);
    }, 360);
  };

  const handleHover = () => {
    if (swingTimerRef.current) clearTimeout(swingTimerRef.current);
    setSwinging(true);
    swingTimerRef.current = setTimeout(() => setSwinging(false), 2000);
  };

  const CORD_HEIGHT = 72;

  return (
    <>
      {/* ── Top-left pull-chain cord ── */}
      <div className="fixed z-[1000]" style={{ top: 0, left: 'clamp(2rem, 4vw, 4rem)' }}>
        <motion.div
          style={{ transformOrigin: 'top center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          animate={
            swinging
              ? { rotate: [0, 5, -4, 3, -2, 1.2, -0.8, 0] }
              : pulling
              ? { y: [0, 18, 0] }
              : { rotate: 0, y: 0 }
          }
          transition={
            swinging
              ? { duration: 1.8, ease: 'easeOut' }
              : pulling
              ? { duration: 0.36, ease: [0.22, 0.8, 0.36, 1], times: [0, 0.3, 1] }
              : { duration: 0.3 }
          }
        >
          {/* Cord line */}
          <div style={{
            width: '1.5px',
            height: CORD_HEIGHT,
            background: 'linear-gradient(to bottom, rgba(230,161,87,0.45), rgba(230,161,87,0.80))',
            borderRadius: '1px',
          }} />

          {/* Tungsten Bulb button */}
          <button
            onClick={handleClick}
            onMouseEnter={handleHover}
            aria-label={lit ? '关灯' : '开灯 · 探索彩蛋'}
            className="relative flex flex-col items-center focus:outline-none group"
            style={{ marginTop: '-1px' }}
          >
            <div className="group-hover:scale-110 active:scale-90 transition-transform duration-200">
              <TungstenBulbSVG lit={lit} />
            </div>
            {/* PULL label */}
            <AnimatePresence>
              {!lit && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.25, 0.5, 0.25] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute left-7 top-2 font-mono italic text-[8px] tracking-[0.22em] text-primary/55 select-none pointer-events-none whitespace-nowrap"
                >
                  PULL
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.div>
      </div>

      {/* ── Background blur + dark scrim ── */}
      <AnimatePresence>
        {lit && (
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-[997] pointer-events-none"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              background: 'rgba(12,10,7,0.70)',
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Spotlight cone ── */}
      <AnimatePresence>
        {lit && (
          <motion.div
            key="spotlight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
            className="fixed inset-0 z-[997] pointer-events-none"
            style={{ background: 'radial-gradient(ellipse 50% 60% at 50% 5%, rgba(230,161,87,0.22) 0%, transparent 70%)' }}
          />
        )}
      </AnimatePresence>

      {/* ── Photo + caption ── */}
      <div
        className="fixed inset-0 z-[999] flex flex-col items-center justify-center px-4"
        onClick={lit ? () => setLit(false) : undefined}
        style={{
          opacity: lit ? 1 : 0,
          transition: 'opacity 1.4s ease-in-out',
          pointerEvents: lit ? 'auto' : 'none',
          cursor: lit ? 'pointer' : 'default',
        }}
      >
        {/* Photo — original aspect ratio, no crop, white edges hidden via bg */}
        <div
          className="relative max-w-lg w-[90vw] md:w-[60vw] rounded-2xl overflow-hidden flex items-center justify-center"
          style={{
            background: 'transparent',
            boxShadow: '0 0 60px rgba(230,161,87,0.40), 0 24px 72px rgba(12,10,7,0.65)',
          }}
        >
          <img
            src={theaterWork}
            alt="剧场工作照"
            className="block w-full h-auto rounded-2xl"
            style={{
              objectFit: 'contain',
              filter: 'sepia(0.10) contrast(1.04) brightness(1.06) saturate(0.95)',
              clipPath: 'inset(2% 2% 4% 2% round 1rem)',
            }}
          />
        </div>

        {/* Caption */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={lit ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 1, delay: 0.9 }}
          className="mt-5 text-center select-none"
        >
          <p className="font-serif italic text-foreground/90 text-lg md:text-xl tracking-wide">Enjoy the show.</p>
          <p className="mt-1 text-sm text-primary/80 font-mono tracking-[0.18em]">很高兴在幕后遇见你。</p>
          <p className="mt-4 text-[10px] text-muted-foreground/45 font-mono tracking-widest uppercase">点击任意处关灯</p>
        </motion.div>
      </div>
    </>
  );
}
