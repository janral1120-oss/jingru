import { motion } from 'framer-motion';
import { TrendingUp, Sparkles, MapPin, Network, Eye, Layers, Video, CheckSquare, BarChart2 } from 'lucide-react';

type BentoCard = {
  id: string;
  icon: React.ReactNode;
  title: string;
  metric: string;
  metricLabel: string;
  desc: string;
  colSpan: string;
  rowSpan?: string;
  accent?: boolean;
};

const cards: BentoCard[] = [
  {
    id: 'b1',
    icon: <TrendingUp className="w-6 h-6" />,
    title: '整合营销全案操盘',
    metric: '百万级',
    metricLabel: '品牌曝光',
    desc: '从 0 到 1 孵化 IP，卡门返场单视频破百万，沉淀「预埋热点—引爆—分发」SOP 并复用至多个项目。',
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-2',
    accent: true,
  },
  {
    id: 'b2',
    icon: <BarChart2 className="w-6 h-6" />,
    title: '直播电商 · ROI',
    metric: '1:10',
    metricLabel: '单场ROI',
    desc: '3 万撬动 30 万 GMV，选品 · 定价 · 逼单全策略，GMV 累计破百万。',
    colSpan: 'md:col-span-1',
  },
  {
    id: 'b3',
    icon: <Sparkles className="w-6 h-6" />,
    title: 'AIGC 内容提效',
    metric: '−40%',
    metricLabel: '创意周期',
    desc: 'Midjourney 出图 + ChatGPT 批量文案，AI Agent 0 代码自动化。',
    colSpan: 'md:col-span-1',
  },
  {
    id: 'b4',
    icon: <Video className="w-6 h-6" />,
    title: '演出直播统筹',
    metric: '5000w+',
    metricLabel: '观看人次',
    desc: '20+ 剧目，技术+内容双 SOP，国家基金补贴，央视转播。',
    colSpan: 'md:col-span-1',
  },
  {
    id: 'b5',
    icon: <Layers className="w-6 h-6" />,
    title: '在地化 SOP 体系',
    metric: '+30%',
    metricLabel: '筹备效率',
    desc: '阿那亚三亚·北戴河·金山岭多门店标准化体系落地，新人 3 天上手，30+ 对标案例库。',
    colSpan: 'md:col-span-2',
    rowSpan: 'md:row-span-2',
    accent: true,
  },
  {
    id: 'b6',
    icon: <MapPin className="w-6 h-6" />,
    title: '跨地域标准化运营',
    metric: '15 城',
    metricLabel: '巡演覆盖',
    desc: '演出工具包全国复制，「中央-地方」接口制，平均上座率 70%。',
    colSpan: 'md:col-span-1',
  },
  {
    id: 'b7',
    icon: <Eye className="w-6 h-6" />,
    title: '用户洞察 · 爆款内容',
    metric: '800w+',
    metricLabel: '单篇浏览',
    desc: '情绪捕捉与趋势预判，单篇 3.1w 点赞，双账号自然流量方法论。',
    colSpan: 'md:col-span-1',
  },
  {
    id: 'b8',
    icon: <Network className="w-6 h-6" />,
    title: '资源整合 · 达人矩阵',
    metric: '100+',
    metricLabel: '达人资源',
    desc: '精细化种草 SOP，从筛选·共创到转化追踪，赋能品牌完整销售闭环。',
    colSpan: 'md:col-span-1',
  },
  {
    id: 'b9',
    icon: <CheckSquare className="w-6 h-6" />,
    title: '项目全周期管理',
    metric: '20+',
    metricLabel: '剧目零事故',
    desc: '里程碑追踪、多线并行、风险预案，从立项到结项全程把控，沉淀公司级操盘手册。',
    colSpan: 'md:col-span-2',
  },
];

function Card({ card, index }: { card: BentoCard; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4, scale: 1.01 }}
      className={[
        'group relative rounded-2xl border p-5 md:p-6 flex flex-col gap-3 overflow-hidden cursor-default',
        'transition-all duration-400',
        card.colSpan,
        card.rowSpan ?? '',
        card.accent
          ? 'border-primary/40 bg-gradient-to-br from-primary/10 via-card/80 to-card/60 hover:border-primary/70 hover:shadow-[0_0_40px_rgba(230,161,87,0.25)]'
          : 'border-border/60 bg-card/60 hover:border-primary/40 hover:bg-card/80 hover:shadow-[0_8px_30px_rgba(230,161,87,0.12)]',
        'backdrop-blur-sm',
      ].join(' ')}
    >
      {/* background shimmer for accent cards */}
      {card.accent && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_20%_30%,rgba(230,161,87,0.08),transparent)] pointer-events-none" />
      )}

      {/* icon */}
      <div className={[
        'w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0',
        'border transition-colors duration-300',
        card.accent
          ? 'bg-primary/15 border-primary/40 text-primary group-hover:bg-primary/25'
          : 'bg-primary/10 border-primary/20 text-primary/80 group-hover:bg-primary/18 group-hover:border-primary/35',
      ].join(' ')}>
        {card.icon}
      </div>

      {/* big metric */}
      <div className="flex-1 flex flex-col">
        <div className="font-mono text-3xl md:text-4xl font-bold text-primary tracking-tight leading-none">
          {card.metric}
        </div>
        <div className="text-[10px] tracking-[0.22em] text-primary/60 font-mono uppercase mt-1">
          {card.metricLabel}
        </div>
      </div>

      {/* title + desc */}
      <div>
        <h3 className="font-serif font-semibold text-foreground text-base md:text-lg leading-tight mb-2">
          {card.title}
        </h3>
        <p className="text-[13px] text-muted-foreground/80 leading-relaxed">
          {card.desc}
        </p>
      </div>
    </motion.div>
  );
}

export function SkillMap() {
  return (
    <section className="py-24 bg-card/30 relative overflow-hidden" id="skills">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] max-w-2xl h-96 rounded-full bg-primary/6 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <p className="text-[11px] tracking-[0.32em] text-primary/80 font-mono uppercase mb-3">
            Core Competencies · 能力图谱
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            九大核心能力 <span className="text-primary">Skill Map</span>
          </h2>
          <p className="mt-3 text-sm text-muted-foreground/80 tracking-wide max-w-lg mx-auto">
            商业增长 · AIGC 提效 · 跨界资源整合 · 在地化 SOP — 每张卡片对应真实落地案例。
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 max-w-6xl mx-auto">
          {cards.map((card, i) => (
            <Card key={card.id} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
