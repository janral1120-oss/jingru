import { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

const NAV_ITEMS = [
  { id: 'hero',       num: '01', act: 'PROLOGUE',       label: '序幕' },
  { id: 'sectors',    num: '02', act: 'THE ARCHIVE',    label: '核心赛道' },
  { id: 'career',     num: '03', act: 'ACT I · LOBBY',  label: '演艺/酒旅' },
  { id: 'skills',     num: '04', act: 'THE LAB',        label: '能力图谱' },
  { id: 'projects',   num: '05', act: 'SHOWCASE',       label: '重点案例' },
  { id: 'social-ops', num: '06', act: 'SOCIAL OPS',     label: '社交实验' },
  { id: 'contact',    num: '07', act: 'BACKSTAGE',      label: '联系我' },
] as const;

type NavId = typeof NAV_ITEMS[number]['id'];

function getSectionTops(): Record<NavId, number> {
  const result: Partial<Record<NavId, number>> = {};
  for (const item of NAV_ITEMS) {
    const el = document.getElementById(item.id);
    result[item.id] = el ? el.getBoundingClientRect().top + window.scrollY : 0;
  }
  return result as Record<NavId, number>;
}

function getActive(tops: Record<NavId, number>): NavId {
  const scrollY = window.scrollY;
  const viewH = window.innerHeight;
  const threshold = scrollY + viewH * 0.38;

  let current: NavId = NAV_ITEMS[0].id;
  for (const item of NAV_ITEMS) {
    if (tops[item.id] <= threshold) {
      current = item.id;
    }
  }
  return current;
}

export function JourneyIndicator() {
  const [activeId, setActiveId] = useState<NavId>('hero');
  const [opacity, setOpacity] = useState(0.22);
  const [hovering, setHovering] = useState(false);

  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const topsRef = useRef<Record<NavId, number>>({} as Record<NavId, number>);

  // compute section tops once layout settles, and on resize
  const refreshTops = useCallback(() => {
    topsRef.current = getSectionTops();
    setActiveId(getActive(topsRef.current));
  }, []);

  useEffect(() => {
    refreshTops();
    // slight delay for layout to stabilise
    const t = setTimeout(refreshTops, 600);

    const onScroll = () => {
      setActiveId(getActive(topsRef.current));
      setOpacity(1);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        if (!hovering) setOpacity(0.22);
      }, 1800);
    };

    const onResize = () => refreshTops();

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      clearTimeout(t);
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [refreshTops, hovering]);

  const scrollTo = (id: NavId) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const activeIndex = NAV_ITEMS.findIndex(n => n.id === activeId);
  // slider Y position: 0% (top node) to 100% (bottom node) along the line
  const sliderPct = NAV_ITEMS.length > 1 ? (activeIndex / (NAV_ITEMS.length - 1)) * 100 : 0;

  const LINE_TOP_PX  = 20;   // px gap at top before first node
  const LINE_BOT_PX  = 20;   // px gap at bottom after last node
  const NODE_GAP_PX  = 40;   // space between nodes
  const totalHeight  = LINE_TOP_PX + (NAV_ITEMS.length - 1) * NODE_GAP_PX + LINE_BOT_PX;

  return (
    <>
      {/* ─── Desktop: vertical right rail ─── */}
      <motion.nav
        className="fixed right-4 top-1/2 -translate-y-1/2 z-[96] hidden md:flex flex-col items-center"
        style={{ opacity, height: totalHeight }}
        animate={{ opacity }}
        transition={{ duration: 0.6 }}
        onMouseEnter={() => { setHovering(true);  setOpacity(1); }}
        onMouseLeave={() => { setHovering(false); setOpacity(0.22); }}
        aria-label="Page navigation"
      >
        {/* Amber thread line */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-px rounded-full"
          style={{
            top: LINE_TOP_PX,
            height: (NAV_ITEMS.length - 1) * NODE_GAP_PX,
            background: 'linear-gradient(to bottom, rgba(230,161,87,0.18), rgba(230,161,87,0.45), rgba(230,161,87,0.18))',
          }}
        />

        {/* Amber sliding cursor */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full z-10"
          style={{
            top: LINE_TOP_PX - 5,
            background: '#e6a157',
            boxShadow: '0 0 8px rgba(230,161,87,0.75)',
          }}
          animate={{ y: sliderPct / 100 * (NAV_ITEMS.length - 1) * NODE_GAP_PX }}
          transition={{ type: 'spring', stiffness: 280, damping: 30 }}
        />

        {/* Nodes + labels */}
        {NAV_ITEMS.map((item, i) => {
          const isActive = item.id === activeId;
          return (
            <motion.button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className="absolute flex items-center group focus:outline-none"
              style={{ top: LINE_TOP_PX + i * NODE_GAP_PX, left: '50%', transform: 'translateX(-50%)' }}
              whileHover={{ x: -5 }}
              transition={{ type: 'spring', stiffness: 350, damping: 28 }}
              aria-label={`Go to ${item.act}`}
            >
              {/* Node dot */}
              <motion.div
                className="w-1.5 h-1.5 rounded-full flex-shrink-0 transition-all duration-300"
                animate={{
                  scale: isActive ? 1.5 : 1,
                  background: isActive ? '#e6a157' : 'rgba(230,161,87,0.35)',
                  boxShadow: isActive ? '0 0 6px rgba(230,161,87,0.7)' : 'none',
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Label — appears to the left, right-aligned */}
              <div
                className="absolute right-4 flex flex-col items-end pointer-events-none"
                style={{ whiteSpace: 'nowrap' }}
              >
                <span
                  className="font-mono text-[7px] tracking-[0.28em] uppercase transition-all duration-300"
                  style={{ color: isActive ? 'rgba(230,161,87,0.9)' : 'rgba(245,240,232,0.28)', letterSpacing: '0.28em' }}
                >
                  {item.num} {item.act}
                </span>
                <motion.span
                  className="font-mono text-[8px] tracking-widest transition-all duration-300"
                  style={{ color: isActive ? 'rgba(230,161,87,0.55)' : 'rgba(245,240,232,0.15)' }}
                  animate={{ filter: isActive ? 'drop-shadow(0 0 4px rgba(230,161,87,0.45))' : 'none' }}
                >
                  {item.label}
                </motion.span>
              </div>
            </motion.button>
          );
        })}
      </motion.nav>

      {/* ─── Mobile: bottom horizontal bar ─── */}
      <nav
        className="fixed bottom-0 left-0 right-0 z-[96] md:hidden"
        style={{
          background: 'rgba(12,10,7,0.88)',
          backdropFilter: 'blur(12px)',
          borderTop: '1px solid rgba(230,161,87,0.15)',
        }}
      >
        <div className="flex overflow-x-auto scrollbar-hide">
          {NAV_ITEMS.map((item) => {
            const isActive = item.id === activeId;
            return (
              <button
                key={item.id}
                onClick={() => scrollTo(item.id)}
                className="flex-shrink-0 flex flex-col items-center gap-0.5 px-3 py-2 focus:outline-none transition-all duration-300"
                style={{ minWidth: '4.5rem' }}
              >
                <span
                  className="font-mono text-[7px] tracking-[0.22em]"
                  style={{ color: isActive ? 'rgba(230,161,87,0.9)' : 'rgba(245,240,232,0.3)' }}
                >
                  {item.num}
                </span>
                <span
                  className="font-mono text-[8px] tracking-wide"
                  style={{ color: isActive ? 'rgba(230,161,87,0.75)' : 'rgba(245,240,232,0.22)' }}
                >
                  {item.label}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="mobile-indicator"
                    className="w-4 h-px rounded-full"
                    style={{ background: '#e6a157', boxShadow: '0 0 4px rgba(230,161,87,0.7)' }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </nav>
    </>
  );
}
