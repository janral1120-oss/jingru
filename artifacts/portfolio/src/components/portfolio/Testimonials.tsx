import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';
import { testimonials, Testimonial } from '@/lib/portfolioData';

function TestimonialCard({ item, index }: { item: Testimonial; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.55,
        delay: (index % 3) * 0.08 + Math.floor(index / 3) * 0.05,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative aspect-[4/5] rounded-2xl overflow-hidden border border-border/70 bg-card/60 backdrop-blur-sm hover:border-primary/60 hover:-translate-y-1 hover:shadow-[0_20px_60px_-22px_rgba(230,161,87,0.4)] transition-all duration-500"
    >
      {item.imageUrl ? (
        <>
          <img
            src={item.imageUrl}
            alt={item.caption ?? `Testimonial ${index + 1}`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        </>
      ) : (
        <>
          {/* tonal placeholder layers */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/8" />
          <div
            className="absolute inset-0 opacity-20 mix-blend-overlay"
            style={{
              backgroundImage:
                'url("data:image/svg+xml;utf8,<svg xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"160\\" height=\\"160\\"><filter id=\\"n\\"><feTurbulence type=\\"fractalNoise\\" baseFrequency=\\"0.85\\" numOctaves=\\"2\\"/></filter><rect width=\\"100%\\" height=\\"100%\\" filter=\\"url(%23n)\\" opacity=\\"0.7\\"/></svg>")',
            }}
          />

          <div className="absolute top-5 left-5">
            <div className="w-10 h-10 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center">
              <Quote className="w-4 h-4 text-primary" />
            </div>
          </div>

          <div className="absolute top-5 right-5 font-mono text-[10px] tracking-[0.22em] text-muted-foreground/70">
            № {String(index + 1).padStart(2, '0')}
          </div>

          <div className="absolute inset-x-5 bottom-5 flex flex-col gap-2">
            <p className="text-[11px] tracking-[0.22em] text-primary/80 font-mono uppercase">
              Echoes
            </p>
            <p className="text-foreground/90 font-serif text-base leading-snug">
              {item.caption ?? '客户好评 · 截图占位'}
            </p>
            <p className="text-[11px] text-muted-foreground/70 mt-1">
              此处插入客户好评截图
            </p>
          </div>
        </>
      )}
    </motion.div>
  );
}

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 relative overflow-hidden">
      {/* faint amber wash */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] max-w-3xl h-72 rounded-full bg-primary/8 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-14 text-center"
        >
          <p className="text-[11px] tracking-[0.32em] text-primary/80 font-mono uppercase mb-3">
            Echoes · 客户回声
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground tracking-tight">
            来自合作方与用户的 <span className="text-primary">真实声音</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto text-sm md:text-base">
            收集自项目复盘、合作方反馈与社交账号评论。每张卡片对应一条真实截图（即将更新）。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {testimonials.map((item, idx) => (
            <TestimonialCard key={item.id} item={item} index={idx} />
          ))}
        </div>

        <div className="mt-10 text-center font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground/60">
          {testimonials.length} Echoes · Updating
        </div>
      </div>
    </section>
  );
}
