import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── SVG: Theater Ticket ─────────────────────────────────────────────────────
function TheaterTicket() {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      {/* Ticket body */}
      <rect x="4" y="12" width="36" height="20" rx="2.5" strokeWidth="1.4" />
      {/* Perforated tear line */}
      <line x1="4" y1="22" x2="40" y2="22" strokeWidth="1" strokeDasharray="2.8 2.2" opacity="0.7" />
      {/* Notch semi-circles (classic stub) */}
      <path d="M4 22 a2.5 2.5 0 0 1 0-0.01" strokeWidth="0" />
      <circle cx="4"  cy="22" r="2.6" fill="#0c0a07" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="40" cy="22" r="2.6" fill="#0c0a07" stroke="currentColor" strokeWidth="1.2" />
      {/* Decorative text lines (top stub) */}
      <line x1="9"  y1="16.5" x2="26" y2="16.5" strokeWidth="1.1" opacity="0.55" />
      <line x1="9"  y1="19.5" x2="20" y2="19.5" strokeWidth="0.8" opacity="0.35" />
      {/* Star / ornament */}
      <circle cx="33" cy="16.5" r="1.1" fill="currentColor" opacity="0.7" />
      {/* Bottom stub hint lines */}
      <line x1="9"  y1="26"   x2="30" y2="26"   strokeWidth="0.9" opacity="0.35" />
      <line x1="9"  y1="28.5" x2="22" y2="28.5" strokeWidth="0.7" opacity="0.25" />
    </svg>
  );
}

// ─── SVG: Luggage Tag ────────────────────────────────────────────────────────
function LuggageTag() {
  return (
    <svg
      viewBox="0 0 44 44"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-full h-full"
    >
      {/* Tag body */}
      <rect x="9" y="14" width="26" height="26" rx="3.5" strokeWidth="1.4" />
      {/* Hole at top */}
      <circle cx="22" cy="14" r="2.6" strokeWidth="1.3" />
      {/* Loop / strap */}
      <path d="M22 11.4 Q22 6 16.5 6 Q11 6 11 11.4" strokeWidth="1.3" />
      {/* Hotel / name lines */}
      <line x1="14" y1="22" x2="30" y2="22" strokeWidth="1.1" opacity="0.65" />
      <line x1="14" y1="26" x2="28" y2="26" strokeWidth="0.9" opacity="0.45" />
      <line x1="14" y1="30" x2="26" y2="30" strokeWidth="0.8" opacity="0.30" />
      {/* Small leaf / logo mark */}
      <circle cx="22" cy="35" r="1.4" fill="currentColor" opacity="0.55" />
    </svg>
  );
}

// ─── Indicator container ──────────────────────────────────────────────────────
type Stage = 'stage' | 'resort';

export function JourneyIndicator() {
  const [stage, setStage]   = useState<Stage>('stage');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      const career = document.getElementById('career');
      if (!career) return;

      const vpH    = window.innerHeight;
      const top    = career.offsetTop;
      const height = career.offsetHeight;
      const sy     = window.scrollY;

      // Visibility: show when career section is within viewport
      const inView = sy + vpH > top - 200 && sy < top + height + 200;
      setVisible(inView);

      // Stage: switch at 40% scroll through the section
      const prog = (sy + vpH * 0.5 - top) / height;
      setStage(prog < 0.42 ? 'stage' : 'resort');
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="journey-indicator"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-2"
          aria-hidden="true"
        >
          {/* Icon box */}
          <div className="relative w-11 h-11">
            {/* Theater Ticket */}
            <AnimatePresence mode="wait">
              {stage === 'stage' ? (
                <motion.div
                  key="ticket"
                  className="absolute inset-0 text-primary"
                  initial={{ opacity: 0, rotateY: -90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: 90 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{ perspective: '200px' }}
                >
                  <div className="w-full h-full p-0.5 rounded-lg border border-primary/40 bg-background/80 backdrop-blur-sm shadow-[0_0_14px_rgba(230,161,87,0.25)]">
                    <TheaterTicket />
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="tag"
                  className="absolute inset-0 text-primary"
                  initial={{ opacity: 0, rotateY: -90 }}
                  animate={{ opacity: 1, rotateY: 0 }}
                  exit={{ opacity: 0, rotateY: 90 }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                  style={{ perspective: '200px' }}
                >
                  <div className="w-full h-full p-0.5 rounded-lg border border-primary/40 bg-background/80 backdrop-blur-sm shadow-[0_0_14px_rgba(230,161,87,0.25)]">
                    <LuggageTag />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Vertical progress track */}
          <div className="w-px h-10 bg-border/40 rounded-full overflow-hidden">
            <motion.div
              className="w-full bg-primary rounded-full"
              animate={{ height: stage === 'stage' ? '35%' : '100%' }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {/* Label */}
          <div className="flex flex-col items-center gap-0.5">
            <span
              className="font-mono text-[8px] tracking-[0.22em] uppercase transition-colors duration-500"
              style={{ color: stage === 'stage' ? 'rgba(230,161,87,0.85)' : 'rgba(230,161,87,0.45)' }}
            >
              舞台
            </span>
            <span className="w-px h-3 bg-border/30" />
            <span
              className="font-mono text-[8px] tracking-[0.22em] uppercase transition-colors duration-500"
              style={{ color: stage === 'resort' ? 'rgba(230,161,87,0.85)' : 'rgba(230,161,87,0.45)' }}
            >
              酒旅
            </span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
