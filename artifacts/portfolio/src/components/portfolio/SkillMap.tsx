import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, BarChart2, Network, Eye, Sparkles, Cpu, Database, MapPin, Layers, GitBranch, Video, CheckSquare } from 'lucide-react';

type Skill = {
  icon: React.ReactNode;
  label: string;
  metric: string;
  detail: string;
};

type Tab = {
  id: string;
  num: string;
  label: string;
  sub: string;
  skills: Skill[];
};

const tabs: Tab[] = [
  {
    id: 'marketing',
    num: '01',
    label: '整合营销',
    sub: 'MARKETING & EVENTS',
    skills: [
      {
        icon: <TrendingUp className="w-5 h-5" />,
        label: '整合营销全案操盘',
        metric: '百万级曝光',
        detail: '从洞察到落地的完整事件营销策略；卡门返场破圈，沉淀「预埋热点—引爆—分发」SOP，复用至多项目。',
      },
      {
        icon: <Video className="w-5 h-5" />,
        label: '演出直播统筹',
        metric: '5000w+ 观看',
        detail: '技术+内容双SOP，多机位导播脚本，获国家艺术基金补贴，促成央视转播，行业标杆。',
      },
      {
        icon: <CheckSquare className="w-5 h-5" />,
        label: '项目全周期管理',
        metric: '20+ 剧目零事故',
        detail: '里程碑追踪、风险预案、多线并行；从立项报批到演出结算的完整商业闭环。',
      },
      {
        icon: <GitBranch className="w-5 h-5" />,
        label: '跨部门资源协同',
        metric: '5 条线并行',
        detail: '工程 · 运营 · 营销 · 政府 · 媒体五线总控，撬动百万级媒体曝光，OKR对齐到周级。',
      },
    ],
  },
  {
    id: 'growth',
    num: '02',
    label: '增长电商',
    sub: 'GROWTH & COMMERCE',
    skills: [
      {
        icon: <BarChart2 className="w-5 h-5" />,
        label: '直播电商 · ROI',
        metric: '1:10 单场ROI',
        detail: '3万撬动30万GMV；选品定价、逼单话术、限时优惠、私域导流全链路策略，GMV累计破百万。',
      },
      {
        icon: <Network className="w-5 h-5" />,
        label: '达人矩阵运营',
        metric: '100+ 达人',
        detail: '从内容筛选、共创到转化追踪，精细化种草SOP，赋能品牌从曝光到销售完整闭环。',
      },
      {
        icon: <Eye className="w-5 h-5" />,
        label: '用户洞察 · 爆款内容',
        metric: '800w+ 单篇浏览',
        detail: '情绪捕捉与趋势预判，单篇3.1w点赞，双账号自然流量方法论，可复用爆款选题框架。',
      },
      {
        icon: <Database className="w-5 h-5" />,
        label: '数据看板 · A/B测试',
        metric: 'ROI 分析全覆盖',
        detail: '按场次搭建数据看板，追踪观看人次/互动率/留存曲线，反向优化下一场策略。',
      },
    ],
  },
  {
    id: 'ai',
    num: '03',
    label: 'AI 数字',
    sub: 'AI & DIGITAL TOOLS',
    skills: [
      {
        icon: <Sparkles className="w-5 h-5" />,
        label: 'AIGC 内容提效',
        metric: '创意周期 −40%',
        detail: 'Midjourney批量生成活动效果图 + ChatGPT产出文案与话术，将创意设计周期缩短40%。',
      },
      {
        icon: <Cpu className="w-5 h-5" />,
        label: 'AI Agent 搭建',
        metric: '0 代码实现',
        detail: '使用飞书多维表格+微信机器人构建对话式知识库；自主搭建评茶员题库Agent，学习效率提升3倍。',
      },
      {
        icon: <Database className="w-5 h-5" />,
        label: 'AIGC 工具迭代追踪',
        metric: '持续替换升级',
        detail: '持续追踪 Midjourney / Sora / DeepSeek 等前沿工具，快速评估并引入团队生产流程。',
      },
      {
        icon: <CheckSquare className="w-5 h-5" />,
        label: 'AI 规范与团队赋能',
        metric: '团队全员上手',
        detail: '制定AI工具使用规范，组织内部分享，推动团队将AIGC嵌入日常内容生产流程。',
      },
    ],
  },
  {
    id: 'ops',
    num: '04',
    label: '规模化运营',
    sub: 'SCALE & OPS',
    skills: [
      {
        icon: <MapPin className="w-5 h-5" />,
        label: '跨地域标准化运营',
        metric: '15 城 · 上座率 70%',
        detail: '演出工具包全国复制；「中央-地方」单一接口制 + 日报机制，确保各城执行质量稳定。',
      },
      {
        icon: <Layers className="w-5 h-5" />,
        label: '在地化 SOP 体系',
        metric: '筹备效率 +30%',
        detail: '阿那亚三亚·北戴河·金山岭多门店落地；标准化体验模块+飞书素材库，新人3天独立上手。',
      },
      {
        icon: <GitBranch className="w-5 h-5" />,
        label: '多门店远程协同',
        metric: '4 目的地同步',
        detail: '飞书任务追踪表+周会机制，制定极端天气应急预案，覆盖全部目的地门店。',
      },
      {
        icon: <Database className="w-5 h-5" />,
        label: '知识库 · 对标智库',
        metric: '30+ 案例库',
        detail: '定期解构标杆酒店在地体验案例，提炼优质活动模型，供总部及门店日常策划调用。',
      },
    ],
  },
];

function SkillCard({ skill, index }: { skill: Skill; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="group relative rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm p-5 hover:border-primary/50 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(230,161,87,0.12)] transition-all duration-300"
    >
      <div className="flex items-start gap-3 mb-3">
        <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center flex-shrink-0 text-primary/80 group-hover:bg-primary/18 group-hover:border-primary/40 transition-colors">
          {skill.icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-mono text-xl font-bold text-primary tracking-tight leading-none">
            {skill.metric}
          </div>
          <div className="font-serif font-semibold text-foreground/90 text-sm mt-1">
            {skill.label}
          </div>
        </div>
      </div>
      <p className="text-[12px] text-muted-foreground/75 leading-relaxed">
        {skill.detail}
      </p>
    </motion.div>
  );
}

export function SkillMap() {
  const [activeId, setActiveId] = useState(tabs[0].id);
  const activeTab = tabs.find(t => t.id === activeId) ?? tabs[0];
  const activeIndex = tabs.findIndex(t => t.id === activeId);

  return (
    <section className="py-24 bg-card/30 relative overflow-hidden" id="skills">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[50%] max-w-2xl h-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-10"
        >
          <p className="text-[11px] tracking-[0.32em] text-primary/80 font-mono uppercase mb-3">
            The Archive · 复古档案系统
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            能力图谱 <span className="text-primary">Skill Map</span>
          </h2>
        </motion.div>

        {/* Tab bar — horizontal scroll on mobile */}
        <div className="relative mb-8 max-w-2xl mx-auto">
          <div className="flex overflow-x-auto gap-0 border-b border-border/40 scrollbar-hide">
            {tabs.map((tab, i) => (
              <button
                key={tab.id}
                onClick={() => setActiveId(tab.id)}
                className={[
                  'relative flex-shrink-0 flex flex-col items-center gap-0.5 px-6 py-3 transition-colors duration-300 focus:outline-none',
                  activeId === tab.id ? 'text-foreground' : 'text-muted-foreground/50 hover:text-muted-foreground/80',
                ].join(' ')}
              >
                <span className="font-mono text-[8px] tracking-[0.28em] opacity-60 mb-0.5">
                  {tab.num}
                </span>
                <span className="font-serif font-semibold text-sm tracking-wide whitespace-nowrap">
                  {tab.label}
                </span>
                <span className="font-mono text-[8px] tracking-[0.2em] opacity-50 whitespace-nowrap hidden sm:block">
                  {tab.sub}
                </span>

                {/* Active underline slider */}
                {activeId === tab.id && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-primary rounded-full"
                    style={{ boxShadow: '0 0 8px rgba(230,161,87,0.6)' }}
                    transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Current tab number indicator */}
          <div className="absolute right-0 top-1/2 -translate-y-1/2 font-mono text-[10px] tracking-[0.22em] text-muted-foreground/30 hidden md:block">
            {tabs[activeIndex].num} / 04
          </div>
        </div>

        {/* Content area with fade transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl mx-auto"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeTab.skills.map((skill, i) => (
                <SkillCard key={skill.label} skill={skill} index={i} />
              ))}
            </div>

            <div className="mt-6 text-center font-mono text-[10px] tracking-[0.25em] uppercase text-muted-foreground/35">
              {activeTab.sub} · {activeTab.skills.length} Competencies
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
