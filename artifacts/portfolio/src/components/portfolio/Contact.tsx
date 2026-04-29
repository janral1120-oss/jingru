import { motion } from 'framer-motion';
import { MessageCircle, Phone, Mail } from 'lucide-react';

const contacts = [
  {
    icon: MessageCircle,
    label: 'WeChat',
    value: 'jrlune',
    href: undefined,
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '138 9817 1261',
    href: 'tel:13898171261',
  },
  {
    icon: Mail,
    label: 'Email',
    value: '13898171261@163.com',
    href: 'mailto:13898171261@163.com',
  },
] as const;

export function Contact() {
  return (
    <footer id="contact" className="relative py-32 overflow-hidden bg-[#0c0a07]">
      {/* deep amber glow pooling at bottom */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[70%] max-w-2xl h-72 rounded-full bg-primary/14 blur-3xl" />
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-full h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-[11px] tracking-[0.38em] text-primary/70 font-mono uppercase mb-8"
        >
          开放交流 · 寻找同频的品牌与机遇
        </motion.p>

        {/* main headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl font-serif font-bold text-foreground leading-tight tracking-tight mb-4"
        >
          期待与你共创
          <br />
          <span className="text-primary">下一个现场</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif italic text-muted-foreground/70 text-lg md:text-xl tracking-wide mb-16"
        >
          Let's Create the Next Milestone
        </motion.p>

        {/* contact grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8"
        >
          {contacts.map(({ icon: Icon, label, value, href }, i) => {
            const inner = (
              <div className="group flex items-center gap-4 px-7 py-5 rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm transition-all duration-400 hover:border-primary/70 hover:bg-card/80 hover:shadow-[0_0_22px_rgba(230,161,87,0.35)] hover:-translate-y-1">
                <div className="w-10 h-10 rounded-xl bg-primary/12 border border-primary/30 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:border-primary/60 transition-colors">
                  <Icon className="w-4.5 h-4.5 text-primary" strokeWidth={1.7} />
                </div>
                <div className="text-left">
                  <p className="text-[10px] tracking-[0.22em] font-mono uppercase text-muted-foreground/60 mb-0.5">
                    {label}
                  </p>
                  <p className="font-medium text-foreground/90 group-hover:text-primary transition-colors text-sm md:text-base">
                    {value}
                  </p>
                </div>
              </div>
            );

            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.25 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {href ? (
                  <a href={href} className="block">{inner}</a>
                ) : (
                  <div>{inner}</div>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* bottom rule */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-20 pt-8 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-muted-foreground/40 text-xs font-mono tracking-widest"
        >
          <span>© {new Date().getFullYear()} 王静茹 (Jingru Wang)</span>
          <span>体验产品 · 整合营销 · 项目统筹</span>
        </motion.div>
      </div>
    </footer>
  );
}
