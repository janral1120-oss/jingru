import { useState } from 'react';
import { motion } from 'framer-motion';
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
  Music,
  MapPin,
  TrendingUp,
  Sparkles,
  Eye,
  Network,
};

function ToolCard({ sector, index }: { sector: CoreSector; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const Icon = ICON_MAP[sector.icon] ?? Sparkles;

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.8, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
      onClick={() => setFlipped((f) => !f)}
      className="cursor-pointer select-none transition-shadow duration-500 hover:shadow-[0_8px_32px_rgba(230,161,87,0.22)]"
      style={{ perspective: '1200px', height: '260px' }}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
        style={{ transformStyle: 'preserve-3d', position: 'relative', width: '100%', height: '100%' }}
      >
        {/* ── FRONT ── */}
        <div
          style={{ backfaceVisibility: 'hidden' }}
          className="absolute inset-0 rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm overflow-hidden flex flex-col"
        >
          {/* subtle tonal grain */}
          <div
            className="absolute inset-0 opacity-[0.12] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage:
                'url("data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"160\\" height=\\"160\\"><filter id=\\"n\\"><feTurbulence type=\\"fractalNoise\\" baseFrequency=\\"0.85\\" numOctaves=\\"2\\"/></filter><rect width=\\"100%\\" height=\\"100%\\" filter=\\"url(%23n)\\" opacity=\\"0.7\\"/></svg>")',
            }}
          />

          {/* left amber bar */}
          <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-r-full bg-primary/60" />

          {/* № plate */}
          <div className="absolute top-5 right-5 font-mono text-[10px] tracking-[0.22em] text-muted-foreground/55">
            № {String(index + 1).padStart(2, '0')}
          </div>

          {/* flip hint */}
          <div className="absolute bottom-5 right-5 font-mono text-[9px] tracking-[0.18em] text-muted-foreground/40 uppercase">
            hover · 查看故事
          </div>

          <div className="flex flex-col h-full px-7 pt-7 pb-10">
            {/* icon */}
            <div className="mb-4 w-11 h-11 rounded-xl bg-primary/10 border border-primary/25 flex items-center justify-center flex-shrink-0">
              <Icon className="w-5 h-5 text-primary" strokeWidth={1.6} />
            </div>

            <h3 className="font-serif text-lg md:text-xl text-foreground leading-tight tracking-tight flex-shrink-0">
              {sector.title}
            </h3>

            <p className="mt-2.5 text-[13px] text-muted-foreground leading-relaxed flex-1 line-clamp-3">
              {sector.caption}
            </p>

            <div className="mt-4 pt-3.5 border-t border-dashed border-border/55 flex items-center justify-between flex-shrink-0">
              <span className="text-[9px] tracking-[0.22em] text-muted-foreground/55 font-mono uppercase">
                Signature
              </span>
              <span className="font-mono text-sm font-semibold text-primary tracking-wide">
                {sector.metric}
              </span>
            </div>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
          className="absolute inset-0 rounded-2xl border border-primary/60 bg-card overflow-hidden flex flex-col"
        >
          {/* warm amber wash */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/12 via-transparent to-secondary/8 pointer-events-none" />

          {/* grain */}
          <div
            className="absolute inset-0 opacity-[0.14] mix-blend-overlay pointer-events-none"
            style={{
              backgroundImage:
                'url("data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"160\\" height=\\"160\\"><filter id=\\"n\\"><feTurbulence type=\\"fractalNoise\\" baseFrequency=\\"0.85\\" numOctaves=\\"2\\"/></filter><rect width=\\"100%\\" height=\\"100%\\" filter=\\"url(%23n)\\" opacity=\\"0.7\\"/></svg>")',
            }}
          />

          <div className="relative z-10 flex flex-col h-full px-7 pt-7 pb-7">
            {/* icon + label */}
            <div className="flex items-center gap-3 mb-5 flex-shrink-0">
              <div className="w-9 h-9 rounded-lg bg-primary/20 border border-primary/40 flex items-center justify-center">
                <Icon className="w-4 h-4 text-primary" strokeWidth={1.6} />
              </div>
              <span className="font-mono text-[10px] tracking-[0.22em] uppercase text-primary/80">
                策划故事
              </span>
            </div>

            {/* story */}
            <p className="text-foreground/95 text-sm md:text-[15px] leading-relaxed flex-1 font-serif italic">
              "{sector.story}"
            </p>

            {/* metric echo */}
            <div className="mt-5 pt-4 border-t border-primary/20 flex items-center justify-between flex-shrink-0">
              <span className="text-[10px] tracking-[0.22em] font-mono uppercase text-muted-foreground/60">
                {sector.title}
              </span>
              <span className="font-mono text-sm font-bold text-primary">
                {sector.metric}
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function CoreSectors() {
  return (
    <section id="sectors" className="relative py-28 md:py-32 overflow-hidden bg-card/20">
      {/* faint amber wash */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[80%] max-w-4xl h-40 rounded-full bg-primary/8 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          className="mb-12 flex items-end justify-between flex-wrap gap-6"
        >
          <div>
            <p className="text-[11px] tracking-[0.32em] text-primary/80 font-mono uppercase mb-3">
              My Toolkit · 我的工具箱
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground tracking-tight">
              策划者的 <span className="text-primary">工具箱 · 六种杠杆</span>
            </h2>
          </div>
          <div className="hidden md:block font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground/70">
            Six Levers · One Operator
          </div>
        </motion.div>

        {/* hint text */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mb-8 text-xs text-muted-foreground/60 font-mono tracking-wide"
        >
          ↗ 悬停或点击任意卡片，翻开一个真实的策划故事
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {coreSectors.map((sector, idx) => (
            <ToolCard key={sector.id} sector={sector} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
