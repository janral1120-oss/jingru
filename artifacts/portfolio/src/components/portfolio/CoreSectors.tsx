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

function SectorCard({ sector, index }: { sector: CoreSector; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const Icon = ICON_MAP[sector.icon] ?? Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={[
          'h-full rounded-2xl border bg-card/70 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:shadow-[0_6px_28px_rgba(230,161,87,0.16)]',
          expanded ? 'border-primary/60' : 'border-border/70 hover:border-primary/40',
        ].join(' ')}
      >
        {/* Card top — always visible */}
        <div className="relative px-5 pt-5 pb-4">
          <div className="absolute left-0 top-5 bottom-5 w-[3px] rounded-r-full bg-primary/55" />
          <div className="absolute top-4 right-4 font-mono text-[9px] tracking-[0.2em] text-muted-foreground/40">
            № {String(index + 1).padStart(2, '0')}
          </div>

          <div className="flex items-start gap-3 mb-3">
            <div className="flex-shrink-0 w-9 h-9 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center">
              <Icon className="w-4 h-4 text-primary" strokeWidth={1.6} />
            </div>
            <div className="flex-1 min-w-0 pr-6">
              <h3 className="font-serif text-sm md:text-[15px] text-foreground leading-tight tracking-tight">
                {sector.title}
              </h3>
              <p className="mt-1 text-[11px] text-muted-foreground/70 leading-relaxed line-clamp-2">
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

        {/* Expandable story */}
        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="story"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
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

export function CoreSectors() {
  return (
    <section id="sectors" className="relative py-12 md:py-16 overflow-hidden bg-card/20">
      {/* ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[80%] max-w-4xl h-40 rounded-full bg-primary/8 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-8 flex items-end justify-between flex-wrap gap-4"
        >
          <div>
            <p className="text-[11px] tracking-[0.32em] text-primary/80 font-mono uppercase mb-3">
              My Toolkit · 我的工具箱
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground tracking-tight">
              策划者的 <span className="text-primary">工具箱 · 六种杠杆</span>
            </h2>
            <p className="mt-2 text-[11px] font-mono tracking-wide text-muted-foreground/50">
              点击卡片右下角展开策划故事
            </p>
          </div>
          <div className="hidden md:block font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground/70">
            Six Levers · One Operator
          </div>
        </motion.div>

        {/* 6-card grid — always visible */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {coreSectors.map((sector, idx) => (
            <SectorCard key={sector.id} sector={sector} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
