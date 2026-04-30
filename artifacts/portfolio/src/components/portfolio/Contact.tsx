import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, Mail } from 'lucide-react';

const contacts = [
  {
    icon: MessageCircle,
    label: 'WeChat',
    value: 'jrlune',
    href: undefined as string | undefined,
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

function TeaCupIcon() {
  return (
    <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      {/* steam wisps */}
      <motion.path
        d="M18 10 Q19 7 18 4"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        animate={{ pathLength: [0.3, 1, 0.3], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.path
        d="M24 9 Q25 5.5 24 2"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        animate={{ pathLength: [0.3, 1, 0.3], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />
      <motion.path
        d="M30 10 Q31 7 30 4"
        stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"
        animate={{ pathLength: [0.3, 1, 0.3], opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
      {/* cup body */}
      <path
        d="M10 16 L14 40 H34 L38 16 Z"
        stroke="currentColor" strokeWidth="2" strokeLinejoin="round" fill="none"
      />
      {/* saucer */}
      <path
        d="M6 40 Q24 46 42 40"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"
      />
      {/* handle */}
      <path
        d="M38 20 Q46 22 44 30 Q42 36 36 35"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none"
      />
    </svg>
  );
}

export function Contact() {
  const [open, setOpen] = useState(false);

  return (
    <footer id="contact" className="relative py-28 overflow-hidden bg-[#0c0a07]">
      {/* ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 -translate-x-1/2 bottom-0 w-[70%] max-w-2xl h-72 rounded-full bg-primary/14 blur-3xl" />
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-full h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        {/* main headline */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-6xl font-serif font-bold text-foreground leading-tight tracking-tight mb-5"
        >
          感谢你看到这里，<br />
          <span className="text-primary">欢迎聊聊</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif italic text-muted-foreground/75 text-lg md:text-xl tracking-wide mb-4"
        >
          不下班的策划人，常在线的体验官。我已准备好迎接下一个好故事。
        </motion.p>

        {/* tea cup CTA */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="flex flex-col items-center gap-2 mb-10"
        >
          <p className="text-sm text-muted-foreground/60 tracking-widest font-mono">
            聊聊增长，或者喝杯好茶
          </p>
          <motion.button
            onClick={() => setOpen((v) => !v)}
            aria-label="显示联系方式"
            className="relative mt-2 w-14 h-14 text-primary hover:text-primary/80 transition-colors focus:outline-none"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.95 }}
          >
            <TeaCupIcon />
            {/* glow ring when open */}
            {open && (
              <motion.div
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="absolute inset-0 rounded-full bg-primary/15 blur-md -z-10"
              />
            )}
          </motion.button>
          <motion.span
            animate={{ opacity: open ? 0 : [0.4, 1, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-primary/60 text-xs font-mono tracking-widest"
          >
            {open ? '' : '↓ 点击展开'}
          </motion.span>
        </motion.div>

        {/* contacts revealed on click */}
        <AnimatePresence>
          {open && (
            <motion.div
              key="contacts"
              initial={{ opacity: 0, y: 20, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: 10, height: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 pt-2 pb-6">
                {contacts.map(({ icon: Icon, label, value, href }, i) => {
                  const inner = (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.85 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                      className="group flex items-center gap-4 px-7 py-5 rounded-2xl border border-border/60 bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary/70 hover:bg-card/80 hover:shadow-[0_0_22px_rgba(230,161,87,0.35)] hover:-translate-y-1"
                    >
                      <div className="w-10 h-10 rounded-xl bg-primary/12 border border-primary/30 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 group-hover:border-primary/60 transition-colors">
                        <Icon className="w-4 h-4 text-primary" strokeWidth={1.7} />
                      </div>
                      <div className="text-left">
                        <p className="text-[10px] tracking-[0.22em] font-mono uppercase text-muted-foreground/60 mb-0.5">
                          {label}
                        </p>
                        <p className="font-medium text-foreground/90 group-hover:text-primary transition-colors text-sm md:text-base">
                          {value}
                        </p>
                      </div>
                    </motion.div>
                  );
                  return href ? (
                    <a key={label} href={href} className="block">{inner}</a>
                  ) : (
                    <div key={label}>{inner}</div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* bottom rule */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-16 pt-8 border-t border-border/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-muted-foreground/40 text-xs font-mono tracking-widest"
        >
          <span>© {new Date().getFullYear()} 王静茹 (Jingru Wang)</span>
          <span>品效合一的整合营销与增长操盘手</span>
        </motion.div>
      </div>
    </footer>
  );
}
