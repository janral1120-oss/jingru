import careerYuelehui from "@/assets/career-yuelehui.png";
import careerAranya from "@/assets/career-aranya.png";
import projectCarmen from "@/assets/project-carmen.png";
import projectTeaAgent from "@/assets/project-tea-agent.png";
import projectGallery from "@/assets/project-gallery-opening.png";
import projectMountainTea from "@/assets/project-mountain-tea.png";
import project15Cities from "@/assets/project-15cities.png";

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
  children: { id: string; label: string; detail?: string }[];
};

export type ProjectCase = {
  id: string;
  title: string;
  tags: string[];
  keyData: string;
  role: string;
  image: string;
  star: {
    s: string;
    t: string;
    a: string;
    r: string;
  };
};

export const careerJourney: CareerNode[] = [
  {
    id: "career-1",
    period: "2023–2025",
    company: "爱乐汇",
    role: "营销部项目经理",
    image: careerYuelehui,
    caption: "Stage · 音乐 IP 孵化与现场营销",
    highlights: [
      "从 0 到 1 搭建音乐 IP jjapa & friends，0 预算冷启动，首场售罄，3 个月 10+ 场，最高 150% 上座率",
      "搭建直播电商体系，3 万成本撬动 30 万 GMV，ROI 1:10",
      "小红书达人体系，年合作达人 100+，百万级曝光与转化"
    ]
  },
  {
    id: "career-2",
    period: "2026–至今",
    company: "阿那亚",
    role: "内容与传播部活动主管",
    image: careerAranya,
    caption: "Atelier · 在地体验与 AI 内容工作流",
    highlights: [
      "建立活动内容 SOP 及物料清单，筹备效率 +30%",
      "用 Midjourney / ChatGPT 将创意产出周期缩短 40%",
      "设计『私人定制旅行 Agent』方案框架"
    ]
  }
];

export const skillClusters: SkillCluster[] = [
  {
    id: "ai-tools",
    label: "AI 营销工具",
    children: [
      { id: "ai-1", label: "Midjourney", detail: "视觉提效 3 倍" },
      { id: "ai-2", label: "ChatGPT & DeepSeek", detail: "文案脚本" },
      { id: "ai-3", label: "AI 考试 Agent", detail: "评茶员题库" },
      { id: "ai-4", label: "旅行 Agent 设计", detail: "私人定制方案" },
      { id: "ai-5", label: "AI + 文旅", detail: "私人定制旅行 Agent" }
    ]
  },
  {
    id: "marketing",
    label: "整合营销策划",
    children: [
      { id: "mkt-1", label: "爆款事件打造", detail: "卡门返场" },
      { id: "mkt-2", label: "跨界资源整合" },
      { id: "mkt-3", label: "社群深度激活", detail: "钢琴诗人项目" }
    ]
  },
  {
    id: "sop",
    label: "产品化运营 SOP",
    children: [
      { id: "sop-1", label: "活动 SOP 制定" },
      { id: "sop-2", label: "跨地域远程协同", detail: "15 城巡演" },
      { id: "sop-3", label: "物料清单标准化" }
    ]
  },
  {
    id: "data",
    label: "数据分析与复盘",
    children: [
      { id: "data-1", label: "ROI 分析", detail: "1:10" },
      { id: "data-2", label: "活动数据看板" },
      { id: "data-3", label: "A/B 测试" }
    ]
  }
];

export const featuredProjects: ProjectCase[] = [
  {
    id: "case-1",
    title: "营销事件 · \u201C卡门\u201D返场舞破圈传播",
    tags: ["整合营销", "社交媒体爆款", "低成本高回报"],
    keyData: "百万级曝光 | 上座率 +20%",
    role: "整合营销策划。负责从洞察到落地的全案策划，并协调内外部资源执行。",
    image: projectCarmen,
    star: {
      s: "国际弗拉门戈舞剧《卡门》票房增长乏力，演出方预算有限，无法进行大规模广告投放。",
      t: "以极低成本制造社交媒体热点，实现破圈传播，直接拉动票房。",
      a: "① 监测到抖音热点\u201C刀马舞\u201D播放量激增，主动策划\u201C返场舞\u201D作为传播引爆点。② 整理抖音数据趋势，说服舞团在常规演出后加演 5 分钟\u201C返场舞\u201D并融入互动动作。③ 准备 A/B/C 三套传播物料；以个人专业小红书账号为首发阵地发布剧透短视频；同步联动 3-5 个本地生活方式素人账号制造\u201C稀缺感\u201D。④ 演出当天返场环节录制高清视频，结束后 1 小时内剪出 15 秒精华版通过种子账号二次分发。",
      r: "单条视频播放量百万级，登上小红书/抖音本地热榜；后续场次门票售罄，整体上座率提升 20%，带动酒水等周边消费；沉淀出\u201C预埋热点-现场引爆-剪辑分发\u201D的事件营销 SOP，被公司复用至多个项目。"
    }
  },
  {
    id: "case-2",
    title: "AI 智能体 · 评茶员考试题库 Agent",
    tags: ["AI Agent", "知识转化", "0 代码开发"],
    keyData: "学习效率提升 3 倍 | 可迁移至企业培训",
    role: "独立开发者与产品经理。全流程负责需求分析、提示词工程、交互设计。",
    image: projectTeaAgent,
    star: {
      s: "备考评茶员证书时，学习资料为零散的长 PDF 文档，无法进行自我测验。",
      t: "将静态 PDF 转化为可交互、可自测、可持续迭代的智能题库工具。",
      a: "① 使用 ChatGPT/DeepSeek 按章节拆解知识点，用提示词链提取\u201C术语定义\u201D、\u201C关键数据\u201D、\u201C易混淆点\u201D。② 设计提示词链将陈述句自动转换为选择题（含干扰项）、判断题、填空题。③ 利用飞书多维表格创建题库数据库，设置\u201C随机出题\u201D、\u201C自动批改\u201D、\u201C错题本\u201D功能；同时用微信机器人实现对话式刷题。④ 根据刷题记录分析错误率高的知识点，反向优化题库和提示词。",
      r: "学习效率提升 3 倍，备考时间缩短 2/3；零成本、零代码完成，完全自主可控；能力可迁移至企业培训系统、客服知识库问答机器人、文旅项目游客互动问答等场景。"
    }
  },
  {
    id: "case-3",
    title: "发布会操盘 · 新艺术空间开业全案",
    tags: ["发布会策划", "品牌落地", "跨部门协同"],
    keyData: "开业客流超预期 150% | 媒体 30+ 家",
    role: "开业全案负责人。统筹策划、设计、媒体、工程、运营等多模块。",
    image: projectGallery,
    star: {
      s: "公司在不同城市开设 2 个新艺术空间，需在 1 个月内完成开业并建立\u201C城市艺术会客厅\u201D的品牌认知。",
      t: "策划并执行高影响力的开业庆典及季首系列活动，实现客流与声量双目标。",
      a: "① 品牌定义：提出 slogan\u201C让艺术走向大众\u201D，设计全套 VI 延展（邀请函、导视系统、周边）。② 发布会流程设计：媒体签到 → 艺术导览 → 主理人演讲 → 嘉宾对谈 → 自由酒会，穿插小型室内乐演奏和沉浸式光影秀。③ 媒体与达人邀约：邀请本地艺术圈 KOL、20+ 生活方式媒体、10+ 主流新闻媒体，提前寄送手写定制邀请函。④ 开业季系列活动：策划连续 4 周的\u201C开幕主题周\u201D（音乐周、亲子周、市集周、会员周），每周末举办付费工作坊和免费快闪活动。⑤ 现场执行：制定详细执行手册（动线、安保、防疫、应急预案），并进行 2 次全流程彩排。",
      r: "开业当天客流超预期 150%，媒体报道 30+ 篇，社交媒体话题阅读量 50 万+；开业季系列活动售出 80% 门票，会员转化率 25%；成功塑造\u201C城市艺术会客厅\u201D品牌形象，为后续空间复制提供标准模板。"
    }
  },
  {
    id: "case-4",
    title: "活动策划 · 在地文化体验产品化",
    tags: ["活动策划", "体验设计", "SOP 搭建"],
    keyData: "筹备效率 +30% | 复用至多门店",
    role: "活动主管。负责从 0 到 1 设计并落地酒店在地文化体验活动体系。",
    image: projectMountainTea,
    star: {
      s: "阿那亚酒店希望打造差异化的\u201C山居风物诗\u201D体验，但各地门店活动标准不一，执行质量参差不齐，缺乏可复用的方法。",
      t: "建立一套可标准化、可本地化微调的活动产品体系，提升体验一致性与筹备效率。",
      a: "① 将\u201C徒步茶席\u201D、\u201C日出茶席\u201D、\u201C手作工坊\u201D等概念拆解为标准化体验模块（含主题文案、物料清单、动线图、执行 checklist、应急预案）。② 制作《活动执行手册》（话术库、音乐歌单、灯光参数），建立飞书素材库（文案/图片/视频模板），供多门店直接调用。③ 用 Midjourney 生成场景参考图，用 ChatGPT 批量产出活动文案和朋友圈宣传语，创意周期缩短 30%。④ 通过飞书任务追踪表和多门店周会，确保信息对齐和问题快速响应。",
      r: "活动筹备效率提升 30%；活动 NPS 保持在 85 分以上，用户自发在小红书发布种草内容。"
    }
  },
  {
    id: "case-5",
    title: "规模化运营 · 全国 15 城巡演标准化复制",
    tags: ["标准化运营", "跨地域协同", "流程管理"],
    keyData: "覆盖 15 城 | 平均上座率 70% | 单项目营收 200 万",
    role: "项目统筹。负责将单一成功的演出模型产品化并推向全国。",
    image: project15Cities,
    star: {
      s: "一款音乐会产品在本地验证成功后，公司希望快速复制到全国 15 个城市，但各地团队能力参差、市场环境差异大。",
      t: "输出可复制的标准化工具包，建立高效的中央-地方协同机制，确保各地执行质量稳定。",
      a: "① 开发《演出执行 SOP》、《技术设备清单》、《营销素材库》（海报模板、朋友圈文案、短信话术）、《票务操作指南》等标准化工具包。② 建立\u201C中央-地方\u201D单一接口人制度；要求各地每日提交日报（销售进度+物料确认+客诉汇总）；每周召开 1 次线上复盘会。③ 本地化适配（广州案例）：针对一线城市 IP 竞争力弱的问题，调整渠道（集中预算投本地头部达人）、内容（宣传点转为\u201C冬季限定情感仪式\u201D）、体验（增加烛光氛围布置）。",
      r: "成功在 15 城复制，平均上座率 70%，单项目累计营收 200 万；沉淀出\u201C工具包 + 日报反馈 + 周复盘 + 敏捷调整\u201D的跨地域运营方法论，被公司列为内部培训案例。"
    }
  }
];
