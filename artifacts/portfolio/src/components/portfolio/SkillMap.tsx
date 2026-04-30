import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const AXES = [
  {
    label: '活动策划\n与体验设计',
    shortLabel: '活动策划与体验设计',
    value: 4.8,
    detail: '跨地域门店 SOP 体系化，活动筹备效率提升 30%；三层场馆「流动式」发布会客流 150% 超预期；阿那亚三亚、金山岭、北戴河多目的地标准化落地。',
  },
  {
    label: '整合营销\n与品牌内容',
    shortLabel: '整合营销与品牌内容',
    value: 4.8,
    detail: '卡门返场破圈，沉淀「预埋热点 — 引爆 — 剪辑分发」SOP 并复用至多个项目；百万级媒体曝光；构建 100+ 达人资源矩阵赋能品牌全链路转化。',
  },
  {
    label: '直播销售\n与增长',
    shortLabel: '直播销售与增长',
    value: 4.5,
    detail: '单场 ROI 1:10，以 3 万元撬动 30 万 GMV；累计 GMV 百万+；从选品定价、逼单话术到私域导流，全程沉淀可复用直播 SOP。',
  },
  {
    label: '社交媒体\n与用户洞察',
    shortLabel: '社交媒体与用户洞察',
    value: 4.5,
    detail: '单篇「林町春私房面包」笔记 800w+ 浏览量；双账号矩阵运营；情绪捕捉与趋势预判，沉淀爆款选题方法论并赋能团队规模化复制。',
  },
  {
    label: '项目全周期\n管理',
    shortLabel: '项目全周期管理',
    value: 4.7,
    detail: '20+ 剧目零事故落地；演出直播总观看人次超 5000 万，获国家基金补贴及央视转播；15 城巡演标准化复制，平均上座率 70%，单项目营收 200 万。',
  },
  {
    label: 'AI 工具\n与数字提效',
    shortLabel: 'AI 工具与数字提效',
    value: 4.0,
    detail: 'Midjourney / ChatGPT 将创意周期缩短 40%；0 代码搭建评茶 Agent，学习效率提升 3 倍；持续跟踪 AIGC 工具迭代，构建个人数字杠杆体系。',
  },
];

const MAX_SCORE = 5.0;
const RINGS = [1, 2, 3, 4, 5];
const CX = 200;
const CY = 200;
const R = 145;

function axisAngle(i: number) {
  return ((60 * i - 90) * Math.PI) / 180;
}

function polarToXY(i: number, ratio: number) {
  const a = axisAngle(i);
  return { x: CX + R * ratio * Math.cos(a), y: CY + R * ratio * Math.sin(a) };
}

function pointsString(ratios: number[]) {
  return ratios
    .map((r, i) => {
      const { x, y } = polarToXY(i, r);
      return `${x},${y}`;
    })
    .join(' ');
}

function labelPosition(i: number) {
  const a = axisAngle(i);
  const LABEL_R = R + 28;
  return { x: CX + LABEL_R * Math.cos(a), y: CY + LABEL_R * Math.sin(a) };
}

function scorePosition(i: number, value: number) {
  const a = axisAngle(i);
  const SCORE_R = R * (value / MAX_SCORE) - 18;
  return { x: CX + SCORE_R * Math.cos(a), y: CY + SCORE_R * Math.sin(a) };
}

function textAnchor(i: number): 'start' | 'middle' | 'end' {
  const deg = axisAngle(i) * (180 / Math.PI);
  if (deg > -20 && deg < 20) return 'middle';
  if (deg >= 20 && deg < 160) return 'start';
  if (deg >= 160) return 'middle';
  if (deg < -20 && deg > -160) return 'end';
  return 'middle';
}

const SVG_W = 400;
const SVG_H = 400;

export function SkillMap() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const dataRatios = AXES.map(a => a.value / MAX_SCORE);
  const dataPoints = pointsString(dataRatios);
  const fillOpacity = activeIdx !== null ? 0.55 : 0.32;

  return (
    <section id="skills" className="py-16 md:py-24 bg-card/30 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] max-w-3xl h-96 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <p className="text-[11px] tracking-[0.32em] text-primary/80 font-mono uppercase mb-3">
            The Lab · 能力实验室
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            能力图谱 <span className="text-primary">Skill Map</span>
          </h2>
        </motion.div>

        {/* Left + Right layout */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12 items-start">

          {/* ── LEFT: SVG Radar ── */}
          <div ref={containerRef} className="w-full lg:w-[55%] flex-shrink-0 relative">
            <svg
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              className="w-full h-auto"
              style={{ maxWidth: 480, margin: '0 auto', display: 'block' }}
            >
              {/* Grid rings */}
              {RINGS.map(ring => {
                const pts = Array.from({ length: 6 }, (_, i) => {
                  const { x, y } = polarToXY(i, ring / MAX_SCORE);
                  return `${x},${y}`;
                }).join(' ');
                return (
                  <polygon
                    key={ring}
                    points={pts}
                    fill="none"
                    stroke="rgba(230,161,87,0.2)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Axis spokes */}
              {AXES.map((_, i) => {
                const tip = polarToXY(i, 1);
                return (
                  <line key={i} x1={CX} y1={CY} x2={tip.x} y2={tip.y}
                    stroke="rgba(230,161,87,0.15)" strokeWidth="1" />
                );
              })}

              {/* Data polygon — animates scale up from center */}
              <motion.g
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                style={{ transformOrigin: `${CX}px ${CY}px` }}
                transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              >
                <polygon
                  points={dataPoints}
                  fill={`rgba(230,161,87,${fillOpacity})`}
                  stroke="#e6a157"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  style={{ transition: 'fill-opacity 0.35s ease' }}
                />
              </motion.g>

              {/* Vertex dots + hover zones */}
              {AXES.map((axis, i) => {
                const pt = polarToXY(i, axis.value / MAX_SCORE);
                const isActive = activeIdx === i;
                return (
                  <motion.g
                    key={i}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    style={{ transformOrigin: `${pt.x}px ${pt.y}px` }}
                    transition={{ duration: 0.6, delay: 0.45 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Invisible hover zone */}
                    <circle
                      cx={pt.x} cy={pt.y} r={22}
                      fill="transparent"
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={() => setActiveIdx(i)}
                      onMouseLeave={() => setActiveIdx(null)}
                      onTouchStart={() => setActiveIdx(activeIdx === i ? null : i)}
                    />
                    {/* Glow ring when active */}
                    {isActive && (
                      <circle
                        cx={pt.x} cy={pt.y} r={12}
                        fill="rgba(230,161,87,0.15)"
                        stroke="rgba(230,161,87,0.4)"
                        strokeWidth="1"
                        pointerEvents="none"
                      />
                    )}
                    {/* Dot */}
                    <circle
                      cx={pt.x} cy={pt.y}
                      r={isActive ? 5.5 : 3.5}
                      fill={isActive ? '#ffd580' : '#e6a157'}
                      stroke={isActive ? 'rgba(255,213,128,0.5)' : 'rgba(230,161,87,0.3)'}
                      strokeWidth={isActive ? 3 : 2}
                      style={{ transition: 'all 0.2s ease', filter: isActive ? 'drop-shadow(0 0 8px rgba(230,161,87,0.95))' : 'none' }}
                      pointerEvents="none"
                    />
                  </motion.g>
                );
              })}

              {/* Score labels — inside each vertex */}
              {AXES.map((axis, i) => {
                const sp = scorePosition(i, axis.value);
                return (
                  <motion.text
                    key={i}
                    x={sp.x} y={sp.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="10"
                    fontWeight="700"
                    fontFamily="monospace"
                    fill={activeIdx === i ? '#ffd580' : '#e6a157'}
                    style={{ transition: 'fill 0.2s ease' }}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.9 + i * 0.05, duration: 0.4 }}
                  >
                    {axis.value.toFixed(1)}
                  </motion.text>
                );
              })}

              {/* Axis labels */}
              {AXES.map((axis, i) => {
                const lp = labelPosition(i);
                const anchor = textAnchor(i);
                const lines = axis.label.split('\n');
                const lineH = 13;
                const offsetY = lines.length > 1 ? -(lineH / 2) : 0;
                const isActive = activeIdx === i;
                return (
                  <motion.g
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.7 + i * 0.06, duration: 0.4 }}
                    style={{ cursor: 'pointer' }}
                    onMouseEnter={() => setActiveIdx(i)}
                    onMouseLeave={() => setActiveIdx(null)}
                  >
                    {lines.map((line, li) => (
                      <text
                        key={li}
                        x={lp.x}
                        y={lp.y + offsetY + li * lineH}
                        textAnchor={anchor}
                        dominantBaseline="middle"
                        fontSize="10.5"
                        fill={isActive ? 'rgba(245,240,232,1)' : 'rgba(245,240,232,0.70)'}
                        fontFamily="serif"
                        style={{ transition: 'fill 0.2s ease' }}
                      >
                        {line}
                      </text>
                    ))}
                  </motion.g>
                );
              })}

              {/* Center label */}
              <text x={CX} y={CY} textAnchor="middle" dominantBaseline="middle"
                fontSize="8" fill="rgba(245,240,232,0.18)" fontFamily="monospace" letterSpacing="2">
                BASELINE
              </text>
            </svg>
          </div>

          {/* ── RIGHT: Fixed Info Panel ── */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="w-full lg:w-[45%] flex-shrink-0"
            style={{ minHeight: 320 }}
          >
            <div
              className="relative rounded-2xl overflow-hidden"
              style={{
                height: 320,
                border: '1px solid rgba(230,161,87,0.18)',
                background: 'rgba(26,20,16,0.55)',
                backdropFilter: 'blur(12px)',
                boxShadow: 'inset 0 1px 0 rgba(230,161,87,0.10), 0 8px 40px rgba(0,0,0,0.35)',
              }}
            >
              {/* ── DEFAULT STATE ── */}
              <AnimatePresence>
                {activeIdx === null && (
                  <motion.div
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 p-7 flex flex-col justify-between"
                  >
                    {/* Big decorative number */}
                    <div
                      className="absolute right-5 bottom-3 font-serif leading-none select-none pointer-events-none"
                      style={{ fontSize: '9rem', color: 'rgba(230,161,87,0.05)', fontWeight: 700 }}
                    >
                      06
                    </div>

                    <div className="relative z-10">
                      <p className="text-[9px] tracking-[0.3em] font-mono uppercase mb-3"
                        style={{ color: 'rgba(230,161,87,0.7)' }}>
                        THE OPERATOR'S BASELINE · 能力综述
                      </p>
                      <p className="font-serif text-sm md:text-[15px] leading-relaxed text-foreground/85">
                        拥有跨越千人级演艺现场与高端酒旅的复合操盘经验。不盲目追求单点爆款，更注重体系化搭建、跨部门协同与资源整合，确保每一次商业创想都能落地为可被验证的增长数据。
                      </p>
                    </div>

                    {/* Blinking prompt */}
                    <motion.p
                      className="relative z-10 text-[10px] font-mono tracking-[0.18em]"
                      style={{ color: 'rgba(230,161,87,0.5)' }}
                      animate={{ opacity: [0.4, 1, 0.4] }}
                      transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                      → Hover the radar nodes to reveal data.
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── HOVER STATE ── */}
              <AnimatePresence>
                {activeIdx !== null && (
                  <motion.div
                    key={`skill-${activeIdx}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 p-7 flex flex-col justify-between"
                  >
                    {/* Big decorative axis number */}
                    <div
                      className="absolute right-5 bottom-3 font-serif leading-none select-none pointer-events-none"
                      style={{ fontSize: '9rem', color: 'rgba(230,161,87,0.05)', fontWeight: 700 }}
                    >
                      {String(activeIdx + 1).padStart(2, '0')}
                    </div>

                    <div className="relative z-10">
                      {/* Score badge */}
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-[11px] font-bold"
                          style={{
                            background: 'rgba(230,161,87,0.18)',
                            border: '1px solid rgba(230,161,87,0.45)',
                            color: '#ffd580',
                          }}
                        >
                          {AXES[activeIdx].value.toFixed(1)} / 5.0
                        </div>

                        {/* Mini score bar */}
                        <div className="flex-1 h-1 rounded-full bg-primary/10 overflow-hidden">
                          <motion.div
                            className="h-full rounded-full"
                            style={{ background: '#e6a157' }}
                            initial={{ width: 0 }}
                            animate={{ width: `${(AXES[activeIdx].value / MAX_SCORE) * 100}%` }}
                            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                          />
                        </div>
                      </div>

                      <p className="text-[9px] tracking-[0.3em] font-mono uppercase mb-2"
                        style={{ color: 'rgba(230,161,87,0.6)' }}>
                        SKILL RECORD · 战绩实证
                      </p>
                      <h3 className="font-serif font-bold text-foreground text-base md:text-lg mb-4 leading-snug">
                        {AXES[activeIdx].shortLabel}
                      </h3>
                      <p className="font-serif text-sm md:text-[14px] leading-relaxed text-foreground/80">
                        {AXES[activeIdx].detail}
                      </p>
                    </div>

                    <p className="relative z-10 text-[10px] font-mono tracking-[0.18em]"
                      style={{ color: 'rgba(230,161,87,0.4)' }}>
                      ← Move to another node to switch.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Footnote */}
            <p className="mt-4 text-[10px] italic text-muted-foreground/40 font-serif leading-relaxed">
              基于过往项目成果自评，多维数据均有案例支撑。
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
