import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import theaterWork from '@assets/theater-work.jpg_1777523190866.JPG';

function BulbIcon({ lit }: { lit: boolean }) {
  return (
    <svg viewBox="0 0 32 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* cord */}
      <motion.line
        x1="16" y1="0" x2="16" y2="10"
        stroke={lit ? '#e6a157' : 'rgba(245,240,232,0.45)'}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* bulb glass */}
      <motion.path
        d="M8 18 Q8 10 16 10 Q24 10 24 18 Q24 25 20 28 L20 32 L12 32 L12 28 Q8 25 8 18Z"
        stroke={lit ? '#e6a157' : 'rgba(245,240,232,0.45)'}
        strokeWidth="1.5"
        fill={lit ? 'rgba(230,161,87,0.22)' : 'rgba(245,240,232,0.05)'}
      />
      {/* filament */}
      <path
        d="M13 24 Q14 21 16 22 Q18 23 19 20"
        stroke={lit ? '#ffd580' : 'rgba(245,240,232,0.25)'}
        strokeWidth="1"
        strokeLinecap="round"
        fill="none"
      />
      {/* base bands */}
      <line x1="12" y1="32" x2="20" y2="32" stroke={lit ? '#e6a157' : 'rgba(245,240,232,0.35)'} strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="35" x2="20" y2="35" stroke={lit ? '#e6a157' : 'rgba(245,240,232,0.25)'} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

export function TheaterEasterEgg() {
  const [lit, setLit] = useState(false);

  return (
    <>
      {/* ── Fixed trigger: lightbulb on a hanging cord ── */}
      <motion.button
        onClick={() => setLit((v) => !v)}
        aria-label={lit ? '关灯' : '开灯 — 探索彩蛋'}
        className="fixed right-0 top-[38%] z-[998] w-8 h-12 -mr-0.5 focus:outline-none"
        style={{ filter: lit ? 'drop-shadow(0 0 10px rgba(230,161,87,0.8))' : undefined }}
        animate={lit ? {} : {
          filter: [
            'drop-shadow(0 0 2px rgba(230,161,87,0.2))',
            'drop-shadow(0 0 6px rgba(230,161,87,0.55))',
            'drop-shadow(0 0 2px rgba(230,161,87,0.2))',
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ x: -4, scale: 1.08 }}
        whileTap={{ scale: 0.93 }}
      >
        <BulbIcon lit={lit} />
      </motion.button>

      {/* ── Spotlight overlay ── */}
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
                'radial-gradient(ellipse 55% 70% at 50% 8%, rgba(230,161,87,0.18) 0%, transparent 65%), rgba(12,10,7,0.55)',
              mixBlendMode: 'multiply',
            }}
          />
        )}
      </AnimatePresence>

      {/* ── Photo + text overlay ── */}
      <div
        className="fixed inset-0 z-[999] flex flex-col items-center justify-center"
        onClick={lit ? () => setLit(false) : undefined}
        style={{
          opacity: lit ? 1 : 0,
          transition: 'opacity 1.5s ease-in-out',
          pointerEvents: lit ? 'auto' : 'none',
          cursor: lit ? 'pointer' : 'default',
        }}
      >
        {/* cinematic photo */}
        <div
          className="relative max-w-sm md:max-w-md w-[88vw] rounded-2xl overflow-hidden"
          style={{
            filter: 'sepia(0.6) contrast(1.2) brightness(0.9) saturate(0.8)',
            boxShadow: 'inset 0 0 60px rgba(12,10,7,0.7), 0 30px 80px rgba(12,10,7,0.8)',
          }}
        >
          <img
            src={theaterWork}
            alt="剧场工作照"
            className="w-full h-auto block"
          />
          {/* inner darkening vignette */}
          <div className="absolute inset-0 shadow-[inset_0_0_60px_rgba(12,10,7,0.65)] rounded-2xl pointer-events-none" />
        </div>

        {/* caption */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={lit ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 1, delay: 0.8, ease: 'easeOut' }}
          className="mt-5 text-center select-none"
        >
          <p className="font-serif italic text-foreground/90 text-lg md:text-xl tracking-wide">
            Enjoy the show.
          </p>
          <p className="mt-1 text-sm text-primary/80 font-mono tracking-[0.18em]">
            很高兴在幕后遇见你。
          </p>
          <p className="mt-4 text-[10px] text-muted-foreground/50 font-mono tracking-widest uppercase">
            点击任意处关灯
          </p>
        </motion.div>
      </div>
    </>
  );
}
