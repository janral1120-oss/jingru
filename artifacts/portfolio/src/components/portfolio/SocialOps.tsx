import { motion } from 'framer-motion';
import { ImageIcon, Hash } from 'lucide-react';
import { socialOps, SocialOpsBlock } from '@/lib/portfolioData';

function ScreenshotPlaceholders({ block }: { block: SocialOpsBlock }) {
  if (block.screenshotSlots <= 0) return null;
  const slots = Array.from({ length: block.screenshotSlots });
  return (
    <div className="grid grid-cols-2 gap-3">
      {slots.map((_, idx) => {
        const realImage = block.screenshots?.[idx];
        return (
          <div
            key={idx}
            className="group/slot relative aspect-[3/4] rounded-xl overflow-hidden border border-dashed border-border/70 bg-background/50 hover:border-primary/60 transition-colors"
          >
            {realImage ? (
              <img
                src={realImage}
                alt={`${block.account ?? block.category} screenshot ${idx + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3 text-center">
                <ImageIcon className="w-5 h-5 text-primary/60" />
                <p className="text-[10px] tracking-[0.18em] text-muted-foreground/70 font-mono uppercase">
                  Slot {String(idx + 1).padStart(2, '0')}
                </p>
                <p className="text-[11px] text-muted-foreground/60 leading-tight">
                  此处插入爆款数据截图
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

function StatsBlock({ block }: { block: SocialOpsBlock }) {
  if (!block.stats || block.stats.length === 0) return null;
  return (
    <div className="grid grid-cols-3 gap-3">
      {block.stats.map((s) => (
        <div
          key={s.label}
          className="rounded-xl border border-border/70 bg-background/40 px-3 py-4 text-center hover:border-primary/50 transition-colors"
        >
          <div className="font-mono text-lg md:text-xl font-bold text-primary tracking-wide">
            {s.value}
          </div>
          <div className="mt-1 text-[10px] tracking-[0.18em] text-muted-foreground/70 uppercase">
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}

function Block({ block, index }: { block: SocialOpsBlock; index: number }) {
  const hasScreenshots = block.screenshotSlots > 0;
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative rounded-2xl border border-border/70 bg-card/60 backdrop-blur-sm p-6 md:p-8 hover:border-primary/50 transition-colors"
    >
      <div className="absolute top-6 right-6 font-mono text-[10px] tracking-[0.22em] text-muted-foreground/60">
        № {String(index + 1).padStart(2, '0')} / 03
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.15fr] gap-8 lg:gap-10">
        {/* left: copy */}
        <div className="flex flex-col">
          <p className="text-[10px] tracking-[0.32em] text-primary/80 font-mono uppercase mb-3">
            {block.category}
          </p>
          {block.account && (
            <h3 className="font-serif text-2xl md:text-3xl text-foreground tracking-tight leading-tight">
              {block.account}
            </h3>
          )}
          <p className="mt-5 text-[15px] text-muted-foreground leading-relaxed flex-1">
            {block.description}
          </p>
          {block.tags && block.tags.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {block.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-1 rounded-full bg-secondary/15 text-secondary border border-secondary/25"
                >
                  <Hash className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* right: stats and / or screenshots */}
        <div className="flex flex-col gap-5">
          {block.stats && block.stats.length > 0 && <StatsBlock block={block} />}
          {hasScreenshots && <ScreenshotPlaceholders block={block} />}
          {!hasScreenshots && (!block.stats || block.stats.length === 0) && (
            <div className="rounded-xl border border-dashed border-border/70 p-8 text-center text-sm text-muted-foreground/70">
              暂无附件
            </div>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function SocialOps() {
  return (
    <section id="social-ops" className="py-24 bg-card/15 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="mb-14 flex items-end justify-between flex-wrap gap-6"
        >
          <div>
            <p className="text-[11px] tracking-[0.32em] text-primary/80 font-mono uppercase mb-3">
              Personal Content Ops · 社交媒体实战
            </p>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground tracking-tight">
              个人爆款内容运营 <span className="text-primary">/ Social Lab</span>
            </h2>
            <p className="mt-4 text-muted-foreground max-w-xl">
              从 B 端达人矩阵到个人共情账号 — 用真实账号验证爆款方法论，再反哺品牌项目。
            </p>
          </div>
          <div className="hidden md:block font-mono text-[11px] tracking-[0.22em] uppercase text-muted-foreground/70">
            3 Accounts · 1 System
          </div>
        </motion.div>

        <div className="space-y-6 md:space-y-8">
          {socialOps.map((block, idx) => (
            <Block key={block.id} block={block} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
