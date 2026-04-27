import { motion } from 'framer-motion';
import { careerJourney } from '@/lib/portfolioData';

export function CareerJourney() {
  return (
    <section className="py-24 relative overflow-hidden" id="career">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-3xl md:text-4xl font-serif font-bold text-foreground mb-4"
        >
          职业脉络 <span className="text-primary">Career Journey</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground mb-14 max-w-xl"
        >
          两段履历，一条线索 — 在现场打磨节奏感，在 AI 工具里加倍杠杆。
        </motion.p>

        <div className="relative">
          {/* timeline line — desktop horizontal */}
          <div className="hidden md:block absolute top-[180px] left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 relative z-10">
            {careerJourney.map((node, index) => (
              <motion.article
                key={node.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-80px' }}
                transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="group relative"
              >
                {/* image frame */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-border/60 bg-card">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-[1.4s] ease-out group-hover:scale-[1.06]"
                    style={{ backgroundImage: `url(${node.image})` }}
                  />
                  {/* warm vignette */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/85 via-background/20 to-transparent" />
                  {/* grain overlay */}
                  <div
                    className="absolute inset-0 opacity-[0.18] mix-blend-overlay pointer-events-none"
                    style={{
                      backgroundImage:
                        'url("data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"160\\" height=\\"160\\"><filter id=\\"n\\"><feTurbulence type=\\"fractalNoise\\" baseFrequency=\\"0.85\\" numOctaves=\\"2\\"/></filter><rect width=\\"100%\\" height=\\"100%\\" filter=\\"url(%23n)\\" opacity=\\"0.7\\"/></svg>")',
                    }}
                  />
                  {/* period badge */}
                  <div className="absolute top-5 left-5 z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-background/80 backdrop-blur-md border border-primary/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                    <span className="text-[11px] tracking-[0.18em] uppercase text-primary font-mono font-semibold">
                      {node.period}
                    </span>
                  </div>
                  {/* caption */}
                  <div className="absolute bottom-5 left-5 right-5 z-10 text-foreground/90 text-xs md:text-sm font-light tracking-wide italic font-serif">
                    {node.caption}
                  </div>
                  {/* timeline dot for desktop */}
                  <div className="hidden md:block absolute -bottom-[10px] left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary shadow-[0_0_18px_rgba(230,161,87,0.7)] z-20" />
                </div>

                {/* content */}
                <div className="pt-10 md:pt-12">
                  <h3 className="text-2xl md:text-3xl font-serif font-bold text-foreground tracking-tight">
                    {node.company}
                  </h3>
                  <h4 className="mt-2 text-secondary text-sm md:text-base font-medium tracking-wide">
                    {node.role}
                  </h4>

                  <ul className="mt-6 space-y-4">
                    {node.highlights.map((highlight, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + idx * 0.08 }}
                        className="flex items-start gap-3 text-sm md:text-[15px] leading-relaxed text-muted-foreground group/item"
                      >
                        <span className="mt-2 w-6 h-px bg-primary/50 flex-shrink-0 group-hover/item:bg-primary group-hover/item:w-8 transition-all duration-300" />
                        <span className="group-hover/item:text-foreground/95 transition-colors">
                          {highlight}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
