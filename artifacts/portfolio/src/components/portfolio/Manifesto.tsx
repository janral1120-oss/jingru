import { motion } from 'framer-motion';
import { manifesto } from '@/lib/portfolioData';

export function Manifesto() {
  return (
    <section id="manifesto" className="relative pt-20 md:pt-28 pb-8 overflow-hidden">
      {/* faint amber wash */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] max-w-3xl h-72 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl mx-auto text-center"
        >
          <p className="font-mono text-[10px] md:text-[11px] tracking-[0.4em] uppercase text-primary/70 mb-7">
            Manifesto · 我的总括
          </p>

          <div className="relative">
            <span aria-hidden className="absolute -left-2 -top-6 md:-left-6 md:-top-10 font-serif text-primary/30 text-7xl md:text-9xl leading-none select-none">
              &ldquo;
            </span>
            <span aria-hidden className="absolute -right-2 -bottom-12 md:-right-6 md:-bottom-16 font-serif text-primary/30 text-7xl md:text-9xl leading-none select-none">
              &rdquo;
            </span>

            <blockquote className="font-serif text-xl md:text-3xl lg:text-[34px] leading-snug md:leading-[1.45] text-foreground tracking-[0.02em] px-2 md:px-10">
              {manifesto}
            </blockquote>
          </div>

          <div className="mt-10 flex items-center justify-center gap-4 text-muted-foreground/70">
            <span className="h-px w-10 bg-primary/40" />
            <span className="font-mono text-[10px] tracking-[0.32em] uppercase text-primary/70">
              0 → 1 · 1 → N
            </span>
            <span className="h-px w-10 bg-primary/40" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
