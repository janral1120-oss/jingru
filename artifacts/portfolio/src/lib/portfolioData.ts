import careerYuelehui from "@/assets/career-yuelehui.png";
import careerAranya from "@/assets/career-aranya.png";
import projectCarmen from "@/assets/project-carmen.png";
import projectTeaAgent from "@/assets/project-tea-agent.png";
import projectGallery from "@/assets/project-gallery-opening.png";
import projectWukesong from "@/assets/project-wukesong.png";
import project15Cities from "@/assets/project-15cities.png";
import projectLivestream from "@/assets/project-livestream.png";
import projectMountainTea from "@/assets/project-mountain-tea.png";

export type CoreSector = {
  id: string;
  icon: string;
  title: string;
  caption: string;
  metric: string;
  story: string;
};

export type CareerNode = {
  id: string;
  period: string;
  company: string;
  role: string;
  highlights: string[];
  image: string;
  caption: string;
};

export type SkillCluster = {
  id: string;
  label: string;
  isCore?: boolean;
  children: { id: string; label: string; detail?: string }[];
};

export type ProjectBattle = {
  date: string;
  title: string;
  tags: string[];
  keyData: string;
  image: string;
  star: { s: string; t: string; a: string; r: string };
};

export type ProjectCase = {
  id: string;
  title: string;
  tags: string[];
  keyData: string;
  intro: string;
  role: string;
  image: string;
  isCombined?: boolean;
  battles?: ProjectBattle[];
  star: { s: string; t: string; a: string; r: string };
};

export type SocialOpsBlock = {
  id: string;
  category: string;
  account?: string;
  description: string;
  tags?: string[];
  stats?: { label: string; value: string }[];
  screenshotSlots: number;
  screenshots?: string[];
};

export type Testimonial = {
  id: string;
  imageUrl?: string;
  caption?: string;
};

export const heroSubTagline =
  "从千人级演出到高端酒旅，贯穿大型文化活动全链路操盘";

export const coreSectors: CoreSector[] = [
  {
    id: "sector-stage",
    icon: "Music",
    title: "大型文化演艺操盘",
    caption: "500 人级以上剧场 / Livehouse 开业及常态化商业演出",
    metric: "500+ 席",
    story:
      "曾统筹 500 人剧场开业，设计三层场馆「流动式」演出发布会，把音乐厅 · 剧场 · Livehouse 串成一条体验动线，实现客流 150% 超预期。",
  },
  {
    id: "sector-travel",
    icon: "MapPin",
    title: "跨门店活动 SOP 与在地资源整合",
    caption: "多门店活动内容标准化 · 跨地域协同 · 在地资源接入",
    metric: "筹备效率 +30%",
    story:
      "为三亚、金山岭、北戴河等目的地建立活动标准化 SOP，将筹备效率提升 30%，新人 3 天可独立上手，跨地域多门店同步运营无压力。",
  },
  {
    id: "sector-brand",
    icon: "TrendingUp",
    title: "直播电商增长体系",
    caption: "从 0 搭建高转化音乐现场 IP，统筹直播矩阵达成百万级总销售额",
    metric: "ROI 1:10",
    story:
      "以 3 万元成本撬动 30 万 GMV（ROI 1:10），从选品策略到流量节奏全程统筹，并沉淀为可复用直播 SOP，赋能团队规模化复制至百万级销售额。",
  },
  {
    id: "sector-ai",
    icon: "Sparkles",
    title: "AI 辅助内容生产",
    caption: "Midjourney / ChatGPT 重构创意生产流程，提效 40%",
    metric: "提效 40%",
    story:
      "用 Midjourney 生成场景参考图，以 ChatGPT 批量产出活动文案，将创意周期缩短 40%，并自主搭建 0 代码 Agent 实现内容自动化提效。",
  },
  {
    id: "sector-insight",
    icon: "Eye",
    title: "社交媒体爆款洞察",
    caption: "双账号运营，单篇 800w+ 浏览量爆款案例",
    metric: "800w 浏览",
    story:
      "以真实用户视角运营双账号，单篇「林町春私房面包」笔记斩获 800w+ 浏览量，靠情绪捕捉与趋势预判实现自然流量爆款，总结出可复用的爆款选题方法论。",
  },
  {
    id: "sector-resource",
    icon: "Network",
    title: "资源整合",
    caption: "跨部门 · 跨地域 · 跨行业协同",
    metric: "3 跨协同",
    story:
      "100+ 达人合作网络、跨工程 · 运营 · 营销 · 政府五线并行，用协同 SOP 撬动百万级媒体曝光，打通从 B 端资源到 C 端声量的全链路。",
  },
];

export const careerJourney: CareerNode[] = [
  {
    id: "career-1",
    period: "2023–2025",
    company: "爱乐汇空间艺术（北京）有限公司",
    role: "营销部项目经理 / 董事长业务助理",
    image: careerYuelehui,
    caption: "爱乐汇·营销部",
    highlights: [
      "作为项目负责人，从 0 到 1 孵化音乐 IP jjapa & friends，统筹达人内容共创、票务运营、社群裂变全链路，0 预算冷启动，实现 3 个月 10+ 场、150% 上座率",
      "统筹演出直播全流程（20+ 剧目），建立技术标准与内容 SOP，总观看人次超 5000 万，获国家基金补贴及央视转播",
      "主导搭建直播电商体系，制定选品策略与流量节奏，以 3 万成本撬动 30 万 GMV（ROI 1:10），并沉淀为可复用的 SOP",
      "构建小红书达人资源库及合作标准，年合作达人 100+，赋能团队实现百万级品牌曝光与销售转化",
    ],
  },
  {
    id: "career-2",
    period: "2026–至今",
    company: "海南阿那亚商业运营有限公司北京分公司",
    role: "内容与传播部活动主管",
    image: careerAranya,
    caption: "阿那亚·活动部",
    highlights: [
      "建立多门店活动内容 SOP 及标准化物料清单，推动跨地域协同与进度追踪，使筹备效率提升 30%",
      "引入 AI 工具重构内容生产流程，将创意产出周期缩短 40%，并制定团队使用规范",
      "主导设计『私人定制旅行 Agent』产品方案，探索 AI 在文旅场景的落地应用",
      "建立活动数据埋点与复盘机制，整合在地资源形成可调用的资源矩阵",
      "制定极端天气应急预案与执行流程优化手册，覆盖多门店突发场景",
    ],
  },
];

export const skillClusters: SkillCluster[] = [
  {
    id: "core-management",
    label: "管理力核心",
    isCore: true,
    children: [
      { id: "mg-1", label: "项目全周期管理", detail: "里程碑 / 风险 / 多线程" },
      { id: "mg-2", label: "跨部门资源整合", detail: "工程 · 运营 · 营销 · 文创 · 政府" },
      { id: "mg-3", label: "标准化体系搭建", detail: "SOP · 知识库 · 质量基线" },
      { id: "mg-4", label: "影响力传播与申报", detail: "国家基金 · 主流媒体 · 行业奖项" },
    ],
  },
  {
    id: "user-insight",
    label: "用户洞察",
    isCore: true,
    children: [
      { id: "ui-1", label: "双账号运营", detail: "工作号 + 个人号" },
      { id: "ui-2", label: "用户评论分析", detail: "数据驱动选题" },
      { id: "ui-3", label: "情绪捕捉", detail: "共情内容创作" },
    ],
  },
  {
    id: "ai-tools",
    label: "AI 营销工具",
    children: [
      { id: "ai-1", label: "Midjourney", detail: "视觉提效 3 倍" },
      { id: "ai-2", label: "ChatGPT & DeepSeek", detail: "文案脚本" },
      { id: "ai-3", label: "AI 考试 Agent", detail: "评茶员题库" },
      { id: "ai-4", label: "旅行 Agent 设计", detail: "AI + 文旅" },
    ],
  },
  {
    id: "ai-learning",
    label: "AI 学习能力",
    children: [
      { id: "al-1", label: "自主搭建智能体", detail: "0 代码 Agent" },
      { id: "al-2", label: "AIGC 工具迭代", detail: "持续追踪与替换" },
      { id: "al-3", label: "跨领域整合", detail: "营销 / 文旅 / 培训" },
    ],
  },
  {
    id: "marketing",
    label: "整合营销策划",
    children: [
      { id: "mkt-1", label: "爆款事件打造", detail: "卡门返场" },
      { id: "mkt-2", label: "跨界资源整合" },
      { id: "mkt-3", label: "社群深度激活", detail: "钢琴诗人项目" },
    ],
  },
  {
    id: "sop",
    label: "产品化运营 SOP",
    children: [
      { id: "sop-1", label: "活动 SOP 制定" },
      { id: "sop-2", label: "跨地域远程协同", detail: "15 城巡演" },
      { id: "sop-3", label: "物料清单标准化" },
    ],
  },
  {
    id: "data",
    label: "数据分析与复盘",
    children: [
      { id: "data-1", label: "ROI 分析", detail: "1:10" },
      { id: "data-2", label: "活动数据看板" },
      { id: "data-3", label: "A/B 测试" },
    ],
  },
];

export const featuredProjects: ProjectCase[] = [
  {
    id: "case-1",
    title: "营销事件 · \u201C卡门\u201D返场舞破圈传播",
    tags: ["整合营销", "社交媒体爆款", "低成本高回报"],
    keyData: "百万级曝光 | 上座率 +20%",
    intro:
      "国际弗拉门戈舞剧《卡门》票房乏力，需以低成本制造破圈热点，直接拉动票房。",
    role: "全案策划与项目统筹。负责从洞察到落地的全案策划，并协调内外部资源执行。",
    image: projectCarmen,
    star: {
      s: "国际弗拉门戈舞剧《卡门》票房增长乏力，演出方预算有限，无法进行大规模广告投放。",
      t: "以极低成本制造社交媒体热点，实现破圈传播，直接拉动票房。",
      a: "① 监测到抖音热点「刀马舞」播放量激增，主动策划「返场舞」作为传播引爆点。② 整理抖音数据趋势，说服舞团在常规演出后加演 5 分钟「返场舞」并融入互动动作。③ 准备 A/B/C 三套传播物料；以个人专业小红书账号为首发阵地发布剧透短视频；同步联动 3-5 个本地生活方式素人账号制造「稀缺感」。④ 演出当天返场环节录制高清视频，结束后 1 小时内剪出 15 秒精华版通过种子账号二次分发。",
      r: "单条视频播放量百万级，登上小红书/抖音本地热榜；后续场次门票售罄，整体上座率提升 20%，带动酒水等周边消费；沉淀出「预埋热点-现场引爆-剪辑分发」的事件营销 SOP，被公司复用至多个项目。",
    },
  },
  {
    id: "case-2",
    title: "AI 智能体 · 评茶员考试题库 Agent",
    tags: ["AI Agent", "知识转化", "0 代码开发"],
    keyData: "学习效率提升 3 倍 | 可迁移至企业培训",
    intro:
      "备考评茶员证书时，学习资料为零散长 PDF 文档，无法自我测验，亟需结构化交互工具。",
    role: "独立开发者与产品经理。全流程负责需求分析、提示词工程、交互设计。",
    image: projectTeaAgent,
    star: {
      s: "备考评茶员证书时，学习资料为零散的长 PDF 文档，无法进行自我测验。",
      t: "将静态 PDF 转化为可交互、可自测、可持续迭代的智能题库工具。",
      a: "① 使用 ChatGPT/DeepSeek 按章节拆解知识点，用提示词链提取「术语定义」、「关键数据」、「易混淆点」。② 设计提示词链将陈述句自动转换为选择题（含干扰项）、判断题、填空题。③ 利用飞书多维表格创建题库数据库，设置「随机出题」、「自动批改」、「错题本」功能；同时用微信机器人实现对话式刷题。④ 根据刷题记录分析错误率高的知识点，反向优化题库和提示词。",
      r: "学习效率提升 3 倍，备考时间缩短 2/3；零成本、零代码完成，完全自主可控；能力可迁移至企业培训系统、客服知识库问答机器人、文旅项目游客互动问答等场景。",
    },
  },
  {
    id: "case-3",
    title: "新空间开业操盘 · 业态矩阵进化",
    tags: ["发布会策划", "媒体统筹", "多业态联动"],
    keyData: "2 城市 · 4 场馆 · 30+ 媒体 | 流动式发布会 × 交响乐团现场",
    intro:
      "爱乐汇艺术空间常营（2023.10）与五棵松（2024.5）两次开业战役：从创意流动式发布会到国家级官方仪式，完整见证品牌势能的阶段跃升。",
    role: "两次开业项目负责人，统筹策划、媒体、演出、商场联动全链路。",
    image: projectGallery,
    isCombined: true,
    battles: [
      {
        date: "2023.10 · 常营",
        title: "发布会操盘 · 北京常营爱乐汇艺术空间开业",
        tags: ["发布会策划", "空间联动", "创意冷餐会"],
        keyData:
          "3 个差异化场馆（音乐厅 · 剧场 · Livehouse）| 音乐演出植入 | 三层接连演出",
        image: projectGallery,
        star: {
          s: "2023 年 10 月，北京常营爱乐汇艺术空间落成，集音乐厅、剧场、Livehouse 三种业态于一体；常规剪彩式开幕难以让媒体与观众感知「三重空间」的差异与联动价值。",
          t: "策划一场打破场馆界限的「流动式」开业发布会，把三层 200 人级场馆贯通为同一条体验动线，让观众在演出中走完整个空间。",
          a: "① 业态拆解：把音乐厅、剧场、Livehouse 三业态分别匹配古典三重奏、当代戏剧片段、现场乐队三种节目；制定接连演出节奏卡，每场 20 分钟。② 动线设计：以创意冷餐会为枢纽，把饮品、菜单、灯光与下一场演出主题强绑定；设计三层流动指引与媒体导览路线。③ 多线统筹：协调演员、舞美、灯光、音响、安保、餐饮、媒体接待 7 条线并行，制定全流程总控表。",
          r: "三个 200 人级场馆全部满座；现场打通「看演出 + 走空间 + 喝酒 + 谈合作」的复合体验；发布会本身成为常营空间对外传播的内容素材，被多家文化媒体报道；建立「多业态空间发布会」操盘模板。",
        },
      },
      {
        date: "2024.5 · 五棵松",
        title: "发布会操盘 · 北京五棵松爱乐汇艺术空间开业",
        tags: ["官方发布会", "媒体统筹", "交响乐团演出"],
        keyData: "2 个 500 人场馆 | 30+ 媒体 | 交响乐团现场",
        image: projectWukesong,
        star: {
          s: "2024 年 5 月，五棵松新爱乐汇艺术空间（2 个 500 人场馆）需要建立「高端文化空间」的主流媒体心智，并借助商圈位置撬动家庭与商务客群。",
          t: "策划一场具有国家级质感的官方发布会，配合现场交响乐团演出与媒体矩阵，实现「官方背书 + 艺术势能 + 商场曝光」三位一体。",
          a: "① 仪式编排：设计交响乐团暖场 + 官方致辞 + 主理人演讲 + 嘉宾对谈的发布会议程；制定主舞台灯光、音效、摄录全套技术方案。② 媒体统筹：定向邀约 30+ 主流媒体，提前 2 周发出深度采访提纲与一对一专访排期；现场设置媒体专访间。③ 商场联动：与商场协同设计户外水牌、室内引流动线及限时艺术装置，让发布会延伸成为周末客流活动。④ 全流程总控：从签到、安保、动线、后台、应急到媒体撤场分时段调度，确保高密度议程零失误。",
          r: "发布会顺利落地，2 个 500 人场馆全程坐满；30+ 媒体集中报道，包括主流文化与城市生活类媒体；交响乐团演出片段成为传播素材，建立五棵松空间的高端品牌心智，为后续档期奠定客户与媒体基础。",
        },
      },
    ],
    star: {
      s: "爱乐汇艺术空间在北京先后落地常营与五棵松两处场馆，每次开业都需以发布会建立品牌势能，但两次背景与目标截然不同。",
      t: "针对两次开业的差异化定位，分别策划具有鲜明记忆点的发布活动，并在执行中沉淀可复用的操盘方法论。",
      a: "常营站：以「流动式」发布会打通三业态体验动线。五棵松站：以交响乐团 + 媒体矩阵建立国家级质感。",
      r: "两次合计覆盖 4 个场馆、30+ 媒体，品牌从「艺术新势力」升级为「北京高端演艺地标」，操盘 SOP 沉淀为公司核心资产。",
    },
  },
  {
    id: "case-4",
    title: "规模化运营 · 全国 15 城巡演标准化复制",
    tags: ["标准化运营", "跨地域协同", "流程管理"],
    keyData: "覆盖 15 城 | 平均上座率 70% | 单项目营收 200 万",
    intro:
      "单一成功演出模型需快速复制到全国，但各地团队能力参差、市场环境差异大。",
    role: "全国项目统筹。负责将单一成功的演出模型产品化并推向全国。",
    image: project15Cities,
    star: {
      s: "一款音乐会产品在本地验证成功后，公司希望快速复制到全国 15 个城市，但各地团队能力参差、市场环境差异大。",
      t: "输出可复制的标准化工具包，建立高效的中央-地方协同机制，确保各地执行质量稳定。",
      a: "① 开发《演出执行 SOP》、《技术设备清单》、《营销素材库》（海报模板、朋友圈文案、短信话术）、《票务操作指南》等标准化工具包。② 建立「中央-地方」单一接口人制度；要求各地每日提交日报（销售进度+物料确认+客诉汇总）；每周召开 1 次线上复盘会。③ 本地化适配（广州案例）：针对一线城市 IP 竞争力弱的问题，调整渠道（集中预算投本地头部达人）、内容（宣传点转为「冬季限定情感仪式」）、体验（增加烛光氛围布置）。",
      r: "成功在 15 城复制，平均上座率 70%，单项目累计营收 200 万；沉淀出「工具包 + 日报反馈 + 周复盘 + 敏捷调整」的跨地域运营方法论，被公司列为内部培训案例。",
    },
  },
  {
    id: "case-5",
    title: "演出直播 · 全流程操盘与行业标杆",
    tags: ["演出直播", "全流程统筹", "国家级传播"],
    keyData: "观看人次 5000 万+ | 直播剧目 20+ | 国家基金补贴 | 央视转播",
    intro:
      "公司希望将线下演出通过直播规模化，提升影响力并争取国家级认可，需要从 0 搭建可复制的直播体系。",
    role: "演出直播项目统筹。负责直播 SOP、技术标准、内容脚本、媒体对接、申报与数据复盘。",
    image: projectLivestream,
    star: {
      s: "线下演出受时间地域限制，影响力天花板明显；公司希望通过直播实现规模化扩散，并争取国家级背书与传播资源。",
      t: "从 0 到 1 搭建演出直播全流程体系，沉淀技术与内容 SOP，争取国家基金补贴及主流媒体转播。",
      a: "① 制定《演出直播 SOP》：覆盖前期机位踩点、技术彩排、信号备份、应急切换等关键节点；建立技术标准与设备清单。② 设计多机位导播脚本与节奏卡，匹配剧目情绪曲线；与导播、灯光、舞美深度对齐。③ 对接央视及主流媒体，撰写选题方案与版权合作框架，最终促成央视转播。④ 撰写并申报国家艺术基金等资助项目，准备全套立项与结项材料。⑤ 搭建直播数据看板，按场次复盘观看人次、互动率、留存曲线，反向优化下一场剧目编排。",
      r: "完成 20+ 场剧目直播，总观看人次超 5000 万，单场峰值 200 万；获国家基金补贴及央视转播；演出直播 SOP 成为公司核心资产并对外输出，使公司在行业内成为演出直播标杆。",
    },
  },
  {
    id: "case-6",
    title: "活动策划 · 在地文化体验产品化",
    tags: ["活动策划", "体验设计", "SOP 搭建"],
    keyData: "筹备效率 +30% | 新人上手 3 天 | 复用至多门店",
    intro:
      "阿那亚酒管希望根据品牌定位打造差异化的酒店体验，但各地门店标准不一，需建立可标准化、可本地化微调的活动产品体系。",
    role: "活动主管 / 产品化运营。负责从 0 到 1 设计并落地酒店在地文化体验活动体系。",
    image: projectMountainTea,
    star: {
      s: "阿那亚酒店希望打造差异化的「山居风物诗」体验，但各地门店活动标准不一，执行质量参差不齐，缺乏可复用的方法。",
      t: "建立一套可标准化、可本地化微调的活动产品体系，提升体验一致性与筹备效率，并显著缩短新人上手时间。",
      a: "① 将「徒步茶席」、「日出茶席」、「手作工坊」等概念拆解为标准化体验模块（含主题文案、物料清单、动线图、执行 checklist、应急预案）。② 制作《活动执行手册》（话术库、音乐歌单、灯光参数），建立飞书素材库（文案/图片/视频模板），供多门店直接调用。③ 用 Midjourney 生成场景参考图，用 ChatGPT 批量产出活动文案和朋友圈宣传语，创意周期缩短 30%。④ 通过飞书任务追踪表和多门店周会，确保信息对齐和问题快速响应。",
      r: "活动筹备效率提升 30%，新人上手时间缩短至 3 天；活动 NPS 保持在 85 分以上，用户自发在小红书发布种草内容；体系被复用至多门店，成为品牌资产沉淀。",
    },
  },
];

export const manifesto =
  "不仅追求单点爆款，更擅长搭建体系、统筹资源、赋能团队，实现从 0 到 1、从 1 到 N 的规模化增长。";

export const socialOps: SocialOpsBlock[] = [
  {
    id: "social-1",
    category: "小红书达人矩阵",
    account: "B 端思维 · 资源池",
    description:
      "拥有 100+ 达人资源库，建立标准化合作 SOP，从对接、内容审核、数据回收到结算全链路打通，赋能品牌规模化种草。",
    tags: ["达人资源库", "合作 SOP", "品牌种草", "数据回收"],
    stats: [
      { label: "达人资源", value: "100+" },
      { label: "合作 SOP", value: "全链路" },
      { label: "曝光级别", value: "百万级" },
    ],
    screenshotSlots: 0,
  },
  {
    id: "social-2",
    category: "工作号 · 爆款内容策展",
    account: "@Lululune",
    description:
      "深度参与卡门、jjapa & friends 等项目的爆款内容策划与推动，用专业账号承接品牌内容首发、二次剪辑分发与社群引流。",
    tags: ["爆款策划", "首发阵地", "二次分发", "社群引流"],
    screenshotSlots: 4,
  },
  {
    id: "social-3",
    category: "个人号 · 共情内容创作者",
    account: "@Lune 漫游手册",
    description:
      "以真实用户视角创作，善于捕捉情绪共鸣。曾为「林町春私房面包」连续发布多篇笔记，借小红书自然流量获得 3.1w 点赞、800w+ 浏览量；发现爆款趋势后迅速发布攻略与 Q&A，有效带动账号粉丝增长。",
    tags: ["真实视角", "情绪共鸣", "自然流量", "攻略 / Q&A"],
    stats: [
      { label: "单篇点赞", value: "3.1w" },
      { label: "浏览量", value: "800w+" },
    ],
    screenshotSlots: 4,
  },
];

export const testimonials: Testimonial[] = [
  { id: "t-1", caption: "客户好评 · 截图占位 01" },
  { id: "t-2", caption: "客户好评 · 截图占位 02" },
  { id: "t-3", caption: "客户好评 · 截图占位 03" },
  { id: "t-4", caption: "客户好评 · 截图占位 04" },
  { id: "t-5", caption: "客户好评 · 截图占位 05" },
  { id: "t-6", caption: "客户好评 · 截图占位 06" },
];
