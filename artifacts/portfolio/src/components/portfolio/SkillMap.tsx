import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';

const AXES = [
  {
    label: '活动策划\n与体验设计',
    shortLabel: '活动策划',
    value: 4.6,
    tooltip: '跨地域门店 SOP 体系化，活动筹备效率提升 30%；阿那亚三亚·金山岭多目的地标准化落地。',
  },
  {
    label: '整合营销\n与品牌内容',
    shortLabel: '整合营销',
    value: 4.5,
    tooltip: '卡门返场破圈，「预埋热点 — 引爆 — 分发」SOP 复用；媒体曝光百万级。',
  },
  {
    label: '直播销售\n与增长',
    shortLabel: '直播增长',
    value: 4.5,
    tooltip: '单场 ROI 1:10，以 3 万撬动 30 万 GMV；累计 GMV 百万+，可复用直播 SOP。',
  },
  {
    label: '社交媒体\n与用户洞察',
    shortLabel: '社交洞察',
    value: 4.6,
    tooltip: '单篇 800w+ 浏览量；情绪捕捉与趋势预判，爆款选题方法论沉淀。',
  },
  {
    label: '项目全周期\n管理',
    shortLabel: '项目管理',
    value: 4.7,
    tooltip: '20+ 剧目零事故落地；演出直播 5000w+ 观看，获国家基金补贴及央视转播。',
  },
  {
    label: 'AI 工具\n与数字提效',
    shortLabel: 'AI 提效',
    value: 4.0,
    tooltip: 'Midjourney / ChatGPT 提效 40%；0 代码 Agent 搭建，学习效率提升 3 倍。',
  },
];

const MAX_SCORE = 5.0;
const RINGS = [1, 2, 3, 4, 5];
const CX = 220;
const CY = 220;
const R = 155;

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
  const LABEL_R = R + 30;
  return { x: CX + LABEL_R * Math.cos(a), y: CY + LABEL_R * Math.sin(a) };
}

function scorePosition(i: number, value: number) {
  const a = axisAngle(i);
  const SCORE_R = R * (value / MAX_SCORE) + 14;
  return { x: CX + SCORE_R * Math.cos(a), y: CY + SCORE_R * Math.sin(a) };
}

function textAnchor(i: number): 'start' | 'middle' | 'end' {
  const a = axisAngle(i) * (180 / Math.PI); // back to degrees
  if (a > -20 && a < 20) return 'middle'; // top
  if (a >= 20 && a < 160) return 'start';  // right side
  if (a >= 160) return 'middle';            // bottom
  if (a < -20 && a > -160) return 'end';   // left side
  return 'middle';
}

interface TooltipState {
  index: number;
  x: number;
  y: number;
}

export function SkillMap() {
  const ref = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-80px' });
  const [hovered, setHovered] = useState<TooltipState | null>(null);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  const dataRatios = AXES.map(a => a.value / MAX_SCORE);
  const dataPoints = pointsString(dataRatios);

  // For hover highlight: slightly brighten the whole polygon
  const fillOpacity = activeIdx !== null ? 0.6 : 0.35;

  const SVG_W = 440;
  const SVG_H = 440;

  return (
    <section id="skills" className="py-16 md:py-24 bg-card/30 relative overflow-hidden">
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
            The Lab · 能力实验室
          </p>
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-foreground">
            能力图谱 <span className="text-primary">Skill Map</span>
          </h2>
        </motion.div>

        {/* Chart + legend row */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          {/* SVG Radar */}
          <div ref={containerRef} className="relative" style={{ maxWidth: 480, width: '100%' }}>
            <svg
              ref={ref}
              viewBox={`0 0 ${SVG_W} ${SVG_H}`}
              className="w-full h-auto"
              style={{ maxWidth: 480 }}
            >
              {/* Grid rings */}
              {RINGS.map(ring => {
                const ringRatio = ring / MAX_SCORE;
                const pts = Array.from({ length: 6 }, (_, i) => {
                  const { x, y } = polarToXY(i, ringRatio);
                  return `${x},${y}`;
                }).join(' ');
                return (
                  <polygon
                    key={ring}
                    points={pts}
                    fill="none"
                    stroke="rgba(230,161,87,0.18)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Axis spokes */}
              {AXES.map((_, i) => {
                const tip = polarToXY(i, 1);
                return (
                  <line
                    key={i}
                    x1={CX}
                    y1={CY}
                    x2={tip.x}
                    y2={tip.y}
                    stroke="rgba(230,161,87,0.15)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Data polygon — animates from center out */}
              <motion.g
                initial={{ scale: 0 }}
                animate={isInView ? { scale: 1 } : { scale: 0 }}
                style={{ transformOrigin: `${CX}px ${CY}px` }}
                transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
              >
                <polygon
                  points={dataPoints}
                  fill={`rgba(230,161,87,${fillOpacity})`}
                  stroke="#e6a157"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  style={{ transition: 'fill-opacity 0.3s ease' }}
                />
              </motion.g>

              {/* Vertex dots + hover targets */}
              {AXES.map((axis, i) => {
                const pt = polarToXY(i, axis.value / MAX_SCORE);
                const isActive = activeIdx === i;
                return (
                  <motion.g
                    key={i}
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    style={{ transformOrigin: `${pt.x}px ${pt.y}px` }}
                    transition={{ duration: 0.6, delay: 0.4 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {/* Hover zone (invisible larger circle) */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={20}
                      fill="transparent"
                      style={{ cursor: 'pointer' }}
                      onMouseEnter={(e) => {
                        const rect = (e.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect();
                        const svgX = pt.x / SVG_W * rect.width + rect.left;
                        const svgY = pt.y / SVG_H * rect.height + rect.top;
                        setHovered({ index: i, x: svgX, y: svgY });
                        setActiveIdx(i);
                      }}
                      onMouseLeave={() => { setHovered(null); setActiveIdx(null); }}
                    />
                    {/* Visible dot */}
                    <circle
                      cx={pt.x}
                      cy={pt.y}
                      r={isActive ? 6 : 4}
                      fill={isActive ? '#ffd580' : '#e6a157'}
                      stroke={isActive ? 'rgba(230,161,87,0.5)' : 'rgba(230,161,87,0.3)'}
                      strokeWidth={isActive ? 4 : 2}
                      style={{ transition: 'all 0.2s ease', filter: isActive ? 'drop-shadow(0 0 8px rgba(230,161,87,0.9))' : 'none' }}
                      pointerEvents="none"
                    />
                  </motion.g>
                );
              })}

              {/* Score labels near dots */}
              {AXES.map((axis, i) => {
                const sp = scorePosition(i, axis.value);
                return (
                  <motion.text
                    key={i}
                    x={sp.x}
                    y={sp.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fontSize="11"
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
                const lineHeight = 14;
                const offsetY = lines.length > 1 ? -(lineHeight / 2) : 0;
                return (
                  <motion.g
                    key={i}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 0.7 + i * 0.06, duration: 0.4 }}
                  >
                    {lines.map((line, li) => (
                      <text
                        key={li}
                        x={lp.x}
                        y={lp.y + offsetY + li * lineHeight}
                        textAnchor={anchor}
                        dominantBaseline="middle"
                        fontSize="11"
                        fill={activeIdx === i ? 'rgba(245,240,232,0.95)' : 'rgba(245,240,232,0.72)'}
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
              <text
                x={CX}
                y={CY}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="9"
                fill="rgba(245,240,232,0.25)"
                fontFamily="monospace"
                letterSpacing="2"
              >
                BASELINE
              </text>
            </svg>

            {/* Tooltip */}
            {hovered !== null && (
              <div
                className="fixed z-50 pointer-events-none"
                style={{
                  left: hovered.x + 14,
                  top: hovered.y - 16,
                  transform: 'translateY(-50%)',
                }}
              >
                <div
                  className="rounded-lg px-3 py-2 text-left shadow-xl"
                  style={{
                    background: 'rgba(230,161,87,0.95)',
                    backdropFilter: 'blur(8px)',
                    maxWidth: '200px',
                    boxShadow: '0 4px 24px rgba(12,10,7,0.5)',
                  }}
                >
                  <div className="font-serif font-bold text-[12px] text-[#1a1410] mb-1 leading-tight">
                    {AXES[hovered.index].shortLabel}
                    <span className="ml-2 font-mono text-[11px]">{AXES[hovered.index].value.toFixed(1)}</span>
                  </div>
                  <div className="text-[11px] text-[#2a1a08] leading-snug">
                    {AXES[hovered.index].tooltip}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Legend sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col gap-3 w-full lg:max-w-[240px]"
          >
            {AXES.map((axis, i) => (
              <div
                key={i}
                className="flex items-center gap-3 cursor-default group"
                onMouseEnter={() => setActiveIdx(i)}
                onMouseLeave={() => setActiveIdx(null)}
              >
                <div
                  className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold transition-all duration-200"
                  style={{
                    background: activeIdx === i ? 'rgba(230,161,87,0.3)' : 'rgba(230,161,87,0.1)',
                    border: `1px solid ${activeIdx === i ? 'rgba(230,161,87,0.7)' : 'rgba(230,161,87,0.25)'}`,
                    color: activeIdx === i ? '#ffd580' : '#e6a157',
                  }}
                >
                  {`0${i + 1}`}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[12px] text-foreground/80 font-serif leading-tight group-hover:text-foreground/100 transition-colors">
                    {axis.shortLabel}
                  </div>
                  <div className="mt-0.5 flex items-center gap-2">
                    <div className="flex-1 h-1 rounded-full bg-primary/10 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-primary"
                        initial={{ width: 0 }}
                        animate={isInView ? { width: `${(axis.value / MAX_SCORE) * 100}%` } : { width: 0 }}
                        transition={{ duration: 1, delay: 0.5 + i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </div>
                    <span className="text-[10px] font-mono text-primary/80 flex-shrink-0">{axis.value}</span>
                  </div>
                </div>
              </div>
            ))}

            <p className="mt-3 text-[10px] italic text-muted-foreground/40 font-serif leading-relaxed">
              基于过往项目成果自评，<br />多维数据均有案例支撑。
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
