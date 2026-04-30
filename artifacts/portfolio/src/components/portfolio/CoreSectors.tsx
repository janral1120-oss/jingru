import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Music,
  MapPin,
  TrendingUp,
  Sparkles,
  Eye,
  Network,
  type LucideIcon,
} from 'lucide-react';
import { coreSectors, type CoreSector } from '@/lib/portfolioData';

const ICON_MAP: Record<string, LucideIcon> = {
  Music, MapPin, TrendingUp, Sparkles, Eye, Network,
};

// Bento grid areas for each card index (3-col grid, 3-row)
// template-areas: "c0 c0 c1" / "c2 c3 c1" / "c2 c4 c5"
const GRID_AREAS = ['c0', 'c1', 'c2', 'c3', 'c4', 'c5'];
const GRID_TEMPLATE = `"c0 c0 c1" "c2 c3 c1" "c2 c4 c5"`;

// staggered spring for explosion
function cardVariants(i: number) {
  return {
    hidden: {
      opacity: 0,
      scale: 0.35,
      rotateX: 55,
      rotateY: i % 2 === 0 ? 35 : -35,
      y: 0,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 220,
        damping: 18,
        delay: i * 0.07,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.35,
      rotateX: 55,
      rotateY: i % 2 === 0 ? -35 : 35,
      transition: { duration: 0.22, delay: (5 - i) * 0.04 },
    },
  };
}

function FlipCard({ sector, index }: { sector: CoreSector; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = ICON_MAP[sector.icon] ?? Sparkles;

  return (
    <motion.div
      variants={cardVariants(index)}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="select-none"
      style={{ minHeight: 180 }}
    >
      <div
        className={[
          'rounded-2xl border bg-card/70 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:shadow-[0_6px_28px_rgba(230,161,87,0.16)]',
          expanded ? 'border-primary/60' : 'border-border/70 hover:border-primary/40',
        ].join(' ')}
      >
        {/* Card front — always visible */}
        <div className="relative px-5 pt-5 pb-4">
          <div className="absolute left-0 top-5 bottom-5 w-[3px] rounded-r-full bg-primary/55" />
          <div className="absolute top-4 right-4 font-mono text-[9px] tracking-[0.2em] text-muted-foreground/45">
            № {String(index + 1).padStart(2, '0')}
          </div>

          <div className="flex items-start gap-3 mb-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center">
              <Icon className="w-4.5 h-4.5 text-primary" strokeWidth={1.6} />
            </div>
            <div className="flex-1 min-w-0 pr-6">
              <h3 className="font-serif text-sm md:text-base text-foreground leading-tight tracking-tight">
                {sector.title}
              </h3>
              <p className="mt-1 text-[11px] text-muted-foreground/75 leading-relaxed line-clamp-2">
                {sector.caption}
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="font-mono text-xs font-bold text-primary">{sector.metric}</span>
            <button
              onClick={() => setExpanded(v => !v)}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-mono tracking-[0.18em] uppercase transition-all duration-200"
              style={{
                background: expanded ? 'rgba(230,161,87,0.2)' : 'rgba(230,161,87,0.08)',
                color: expanded ? '#e6a157' : 'rgba(230,161,87,0.6)',
                border: '1px solid',
                borderColor: expanded ? 'rgba(230,161,87,0.5)' : 'rgba(230,161,87,0.2)',
              }}
            >
              {expanded ? '收起' : '策划故事'}
              <motion.span
                animate={{ rotate: expanded ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                style={{ display: 'inline-block', lineHeight: 1 }}
              >
                ▾
              </motion.span>
            </button>
          </div>
        </div>

        {/* Expandable story section */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="story"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ overflow: 'hidden' }}
            >
              <div className="px-5 pb-5 pt-1 border-t border-primary/15 bg-gradient-to-b from-primary/5 to-transparent">
                <p className="text-[12px] text-foreground/85 leading-relaxed font-serif italic mt-3">
                  "{sector.story}"
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// The stacked "mystery box" shown when collapsed
function ToolboxStack({ onClick }: { onClick: () => void }) {
  return (
    <motion.div
      key="stack"
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.75 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center justify-center py-12"
    >
      {/* Stacked card silhouettes */}
      <div
        className="relative w-56 h-36 cursor-pointer group"
        onClick={onClick}
        style={{ perspective: '800px' }}
      >
        {[5, 4, 3, 2, 1].map((i) => (
          <div
            key={i}
            className="absolute inset-0 rounded-2xl border border-primary/30 bg-card/40 backdrop-blur-sm transition-all duration-500 group-hover:scale-105"
            style={{
              transform: `translate(${(i - 3) * 3}px, ${-(i - 1) * 7}px) rotateX(4deg) rotateZ(${(i - 3) * 0.8}deg)`,
              background: `rgba(26,20,16,${0.3 + i * 0.06})`,
              boxShadow: i === 1 ? '0 8px 32px rgba(230,161,87,0.12)' : 'none',
            }}
          />
        ))}

        {/* Front face (top card) */}
        <div
          className="absolute inset-0 rounded-2xl border border-primary/60 bg-card flex flex-col items-center justify-center gap-3 group-hover:border-primary/90 transition-all duration-400"
          style={{ transform: 'translate(0, -28px) rotateX(4deg)', boxShadow: '0 12px 40px rgba(230,161,87,0.22)' }}
        >
          <div className="grid grid-cols-3 gap-1.5 mb-1">
            {[Music, MapPin, TrendingUp, Sparkles, Eye, Network].map((Icon, i) => (
              <div key={i} className="w-6 h-6 rounded bg-primary/15 border border-primary/25 flex items-center justify-center">
                <Icon className="w-3 h-3 text-primary/70" strokeWidth={1.5} />
              </div>
            ))}
          </div>
          <span className="font-mono text-[9px] tracking-[0.28em] text-primary/80 uppercase">六种杠杆</span>
          <span className="font-mono text-[8px] tracking-[0.18em] text-muted-foreground/50">CLICK TO OPEN</span>
        </div>
      </div>

      <p className="mt-8 text-[11px] font-mono tracking-[0.28em] text-muted-foreground/45 uppercase">
        ↑ 点击展开工具箱
      </p>
    </motion.div>
  );
}

export function CoreSectors() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <section id="sectors" className="relative py-12 md:py-16 overflow-hidden bg-card/20">
      {/* ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[80%] max-w-4xl h-40 rounded-full bg-primary/8 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header — click to toggle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-10 flex items-end justify-between flex-wrap gap-6"
        >
          <div>
            <p className="text-[11px] tracking-[0.32em] text-primary/80 font-mono uppercase mb-3">
              My Toolkit · 我的工具箱
            </p>
            <button
              onClick={() => setIsOpen(v => !v)}
              className="group flex items-center gap-3 focus:outline-none"
            >
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground tracking-tight text-left group-hover:text-primary/90 transition-colors">
                策划者的 <span className="text-primary">工具箱 · 六种杠杆</span>
              </h2>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                className="text-primary/70 text-2xl font-light leading-none mt-1 select-none"
              >
                +
              </motion.span>
            </button>
            <p className="mt-2 text-[11px] font-mono tracking-wide text-muted-foreground/50">
              {isOpen ? '再次点击标题即可收起' : '点击标题展开 · 悬停卡片翻开策划故事'}
            </p>
          </div>
          <div className="hidden md:block font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground/70">
            Six Levers · One Operator
          </div>
        </motion.div>

        {/* Blueprint grid overlay — shows briefly during expand */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              key="blueprint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 pointer-events-none"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(230,161,87,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(230,161,87,0.055) 1px, transparent 1px)',
                backgroundSize: '44px 44px',
              }}
            />
          )}
        </AnimatePresence>

        {/* Toolbox stack ↔ Bento grid */}
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <ToolboxStack key="closed" onClick={() => setIsOpen(true)} />
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bento-grid gap-4 md:gap-5"
            >
              {coreSectors.map((sector, idx) => (
                <FlipCard key={sector.id} sector={sector} index={idx} />
              ))}
              <style>{`
                .bento-grid {
                  display: grid;
                  grid-template-columns: 1fr 1fr;
                  grid-template-rows: auto;
                }
                @media (min-width: 1024px) {
                  .bento-grid {
                    grid-template-areas: ${GRID_TEMPLATE};
                    grid-template-columns: repeat(3, 1fr);
                    grid-template-rows: auto auto auto;
                  }
                  .bento-grid > *:nth-child(1) { grid-area: c0; }
                  .bento-grid > *:nth-child(2) { grid-area: c1; }
                  .bento-grid > *:nth-child(3) { grid-area: c2; }
                  .bento-grid > *:nth-child(4) { grid-area: c3; }
                  .bento-grid > *:nth-child(5) { grid-area: c4; }
                  .bento-grid > *:nth-child(6) { grid-area: c5; }
                }
              `}</style>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
