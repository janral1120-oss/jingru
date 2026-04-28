import { motion } from 'framer-motion';
import { coreSectors } from '@/lib/portfolioData';

export function CoreSectors() {
  return (
    <section
      id="sectors"
      className="relative py-20 md:py-24 overflow-hidden bg-card/20"
    >
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
              Core Sectors · 核心赛道
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground tracking-tight">
              多栖统筹 <span className="text-primary">六大能力赛道</span>
            </h2>
          </div>
          <div className="hidden md:block font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground/70">
            Six Pillars · One Operator
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {coreSectors.map((sector, idx) => (
            <motion.article
              key={sector.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{
                duration: 0.55,
                delay: idx * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm overflow-hidden hover:border-primary/60 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_18px_60px_-22px_rgba(230,161,87,0.4)]"
            >
              {/* left amber accent bar */}
              <div className="absolute left-0 top-6 bottom-6 w-[3px] rounded-r-full bg-primary/70 group-hover:bg-primary transition-colors" />

              {/* number plate */}
              <div className="absolute top-5 right-5 font-mono text-[10px] tracking-[0.22em] text-muted-foreground/60">
                № {String(idx + 1).padStart(2, '0')}
              </div>

              <div className="p-6 md:p-7 pl-7 md:pl-8 flex flex-col h-full min-h-[200px]">
                <h3 className="font-serif text-xl md:text-2xl text-foreground group-hover:text-primary transition-colors leading-tight tracking-tight">
                  {sector.title}
                </h3>

                <p className="mt-4 text-sm md:text-[15px] text-muted-foreground leading-relaxed flex-1">
                  {sector.caption}
                </p>

                <div className="mt-5 pt-4 border-t border-dashed border-border/60 flex items-center justify-between">
                  <span className="text-[10px] tracking-[0.22em] text-muted-foreground/60 font-mono uppercase">
                    Signature
                  </span>
                  <span className="font-mono text-sm font-semibold text-primary tracking-wide">
                    {sector.metric}
                  </span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
