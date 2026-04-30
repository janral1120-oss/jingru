import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import theaterWork from '@assets/theater-work.jpg_1777523190866.JPG';

export function TheaterEasterEgg() {
  const [lit, setLit] = useState(false);
  const [pulling, setPulling] = useState(false);
  const [swinging, setSwinging] = useState(false);
  const swingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleClick = () => {
    // Start pull animation
    setPulling(true);
    setTimeout(() => {
      setPulling(false);
      setLit(v => !v);
    }, 380);
  };

  const handleHover = () => {
    if (swingTimerRef.current) clearTimeout(swingTimerRef.current);
    setSwinging(true);
    swingTimerRef.current = setTimeout(() => setSwinging(false), 2000);
  };

  const CORD_HEIGHT = 88; // px — visible cord length

  return (
    <>
      {/* ── Top-left pull-chain cord ── */}
      <div
        className="fixed z-[1000]"
        style={{ top: 0, left: 'clamp(2rem, 4vw, 4rem)' }}
      >
        <motion.div
          style={{ transformOrigin: 'top center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
          animate={
            swinging
              ? {
                  rotate: [0, 5, -4, 3, -2, 1.5, -1, 0],
                }
              : pulling
              ? { y: [0, 15, 0] }
              : { rotate: 0, y: 0 }
          }
          transition={
            swinging
              ? { duration: 1.8, ease: 'easeOut' }
              : pulling
              ? { duration: 0.38, ease: [0.22, 0.8, 0.36, 1], times: [0, 0.3, 1] }
              : { duration: 0.3 }
          }
        >
          {/* Cord line */}
          <div
            style={{
              width: '1.5px',
              height: CORD_HEIGHT,
              background: 'linear-gradient(to bottom, rgba(230,161,87,0.55), rgba(230,161,87,0.85))',
              borderRadius: '1px',
            }}
          />

          {/* Pull ring / ball */}
          <button
            onClick={handleClick}
            onMouseEnter={handleHover}
            aria-label={lit ? '关灯' : '开灯 · 探索彩蛋'}
            className="relative flex flex-col items-center focus:outline-none group"
            style={{ marginTop: '-2px' }}
          >
            <div
              className="w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-300 group-hover:scale-110 active:scale-95"
              style={{
                borderColor: lit ? '#e6a157' : 'rgba(230,161,87,0.7)',
                background: lit
                  ? 'radial-gradient(circle, #ffd580, #e6a157)'
                  : 'radial-gradient(circle, rgba(230,161,87,0.35), rgba(230,161,87,0.15))',
                boxShadow: lit
                  ? '0 0 14px rgba(230,161,87,0.85), 0 0 30px rgba(230,161,87,0.35)'
                  : '0 0 6px rgba(230,161,87,0.30)',
              }}
            />

            {/* PULL label — italic, beside the ring */}
            <AnimatePresence>
              {!lit && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.28, 0.52, 0.28] }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute left-6 top-0 font-mono italic text-[8px] tracking-[0.22em] text-primary/55 select-none pointer-events-none whitespace-nowrap"
                  style={{ lineHeight: '20px' }}
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
            transition={{ duration: 0.8, ease: 'easeInOut' }}
            className="fixed inset-0 z-[997] pointer-events-none"
            style={{
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              background: 'rgba(12,10,7,0.65)',
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
            transition={{ duration: 1.2, ease: 'easeInOut' }}
            className="fixed inset-0 z-[997] pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse 50% 65% at 50% 5%, rgba(230,161,87,0.22) 0%, transparent 70%)',
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Photo + caption ── */}
      <div
        className="fixed inset-0 z-[999] flex flex-col items-center justify-center px-4"
        onClick={lit ? () => setLit(false) : undefined}
        style={{
          opacity: lit ? 1 : 0,
          transition: 'opacity 1.5s ease-in-out',
          pointerEvents: lit ? 'auto' : 'none',
          cursor: lit ? 'pointer' : 'default',
        }}
      >
        {/* Photo — crop bottom white border via overflow+objectPosition */}
        <div
          className="relative max-w-sm md:max-w-md w-[88vw] rounded-2xl overflow-hidden"
          style={{
            aspectRatio: '3 / 4',
            boxShadow:
              '0 0 60px rgba(230,161,87,0.45), 0 30px 80px rgba(12,10,7,0.7)',
          }}
        >
          <img
            src={theaterWork}
            alt="剧场工作照"
            className="absolute inset-0 w-full h-full object-cover"
            style={{
              objectPosition: 'center 15%',
              filter: 'sepia(0.12) contrast(1.05) brightness(1.08) saturate(0.92)',
            }}
          />
          <div className="absolute inset-0 shadow-[inset_0_0_40px_rgba(12,10,7,0.35)] rounded-2xl pointer-events-none" />
        </div>

        {/* Caption */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={lit ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 1, delay: 0.9, ease: 'easeOut' }}
          className="mt-6 text-center select-none"
        >
          <p className="font-serif italic text-foreground/90 text-lg md:text-xl tracking-wide">
            Enjoy the show.
          </p>
          <p className="mt-1 text-sm text-primary/80 font-mono tracking-[0.18em]">
            很高兴在幕后遇见你。
          </p>
          <p className="mt-5 text-[10px] text-muted-foreground/45 font-mono tracking-widest uppercase">
            点击任意处关灯
          </p>
        </motion.div>
      </div>
    </>
  );
}
