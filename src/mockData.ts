export type Metric = {
  label: string
  value: string
  helper: string
  tone: "blue" | "green" | "amber" | "red" | "slate"
}

export type Advisor = {
  id: string
  name: string
  segment: string
  sales: string
  conversion: string
  reviewCount: number
  aiScore: number
  action: string
  actionTone: "blue" | "green" | "amber" | "red" | "slate"
  resultMetrics: Metric[]
  processMetrics: Metric[]
  abilityScores: { subject: string; score: number }[]
  growthMetrics: { label: string; value: string }[]
  diagnosis: string
  managerActions: string[]
  cycleIssues: string[]
  feedback: {
    problem: string
    focus: string
    tasks: string[]
    tracking: string[]
    nextPlan: {
      result: string[]
      process: string[]
      ability: string[]
      coaching: string[]
    }
  }
}

export const storeContext = {
  store: "汉光百货店",
  cycle: "2026 年 6 月绩效周期",
  updatedAt: "2026-06-01 09:30",
}

export const kpis: Metric[] = [
  { label: "本月美妆销售额", value: "¥128,600", helper: "较上周期 +6.8%", tone: "blue" },
  { label: "平均转化率", value: "8.7%", helper: "低于计划 0.3pct", tone: "amber" },
  { label: "客户复盘完成率", value: "72%", helper: "8 人中 6 人达标", tone: "blue" },
  { label: "AI 练货完成率", value: "64%", helper: "重点课程 4/6", tone: "amber" },
  { label: "高风险导购", value: "3 人", helper: "需店长跟进", tone: "red" },
  { label: "高成长导购", value: "2 人", helper: "建议重点培养", tone: "green" },
]

export const closedLoopSteps = [
  { title: "计划设定", status: "已生成个人计划 6/8" },
  { title: "过程监控", status: "发现过程异常 3 条" },
  { title: "证据评价", status: "待店长确认评价 4 人" },
  { title: "反馈任务", status: "已生成反馈任务 5 张" },
  { title: "下一轮计划", status: "下周期计划待同步 3 人" },
]

export const trendData = [
  { week: "W1", sales: 25200, reviews: 38, ai: 58 },
  { week: "W2", sales: 29600, reviews: 44, ai: 61 },
  { week: "W3", sales: 31800, reviews: 51, ai: 66 },
  { week: "W4", sales: 42000, reviews: 58, ai: 72 },
]

export const overviewDiagnosis =
  "本周期门店销售结果基本达标，但过程数据存在分化。2 名导购转化率连续下降，3 名导购客户复盘不足，1 名新员工 AI 练货评分提升明显。建议店长优先处理“高过程低转化型”和“高销售低过程型”导购。"

const commonNextPlan = {
  result: ["美妆销售额 ¥36,000", "转化率 9.0%"],
  process: ["客户复盘 30 条以上", "高潜客户跟进率 75%"],
  ability: ["异议处理评分提升至 72", "成交引导评分提升至 70"],
  coaching: ["店长一对一反馈 1 次", "情景陪练 2 次", "下周复盘 1 次"],
}

export const advisors: Advisor[] = [
  {
    id: "wang-yuting",
    name: "王雨婷",
    segment: "高过程低转化型",
    sales: "¥32,500",
    conversion: "7.8%",
    reviewCount: 35,
    aiScore: 78,
    action: "需辅导",
    actionTone: "amber",
    resultMetrics: [
      { label: "美妆销售额", value: "¥32,500", helper: "计划完成率 90%", tone: "blue" },
      { label: "转化率", value: "7.8%", helper: "低于门店均值", tone: "amber" },
      { label: "客单价", value: "¥486", helper: "稳定", tone: "slate" },
      { label: "复购率", value: "12%", helper: "可提升", tone: "amber" },
      { label: "门店排名", value: "4/8", helper: "中位水平", tone: "blue" },
    ] as Metric[],
    processMetrics: [
      { label: "客户复盘数", value: "35 条", helper: "高于门店均值", tone: "green" },
      { label: "复盘完整度", value: "84%", helper: "证据充分", tone: "green" },
      { label: "高潜客户跟进率", value: "63%", helper: "需提升", tone: "amber" },
      { label: "试用客户转化率", value: "18%", helper: "偏低", tone: "amber" },
      { label: "未成交原因记录完整度", value: "79%", helper: "接近达标", tone: "blue" },
    ],
    abilityScores: [
      { subject: "产品知识", score: 82 },
      { subject: "功效表达", score: 80 },
      { subject: "话术结构", score: 76 },
      { subject: "异议处理", score: 61 },
      { subject: "成交引导", score: 64 },
    ],
    growthMetrics: [
      { label: "练货评分变化", value: "69 → 78" },
      { label: "新品学习速度", value: "较快" },
      { label: "店长辅导后改善", value: "明显" },
      { label: "主要短板", value: "价格异议处理、试用后成交引导" },
    ],
    diagnosis:
      "王雨婷属于“高过程低转化型”导购。其客户复盘数量和完整度高于门店均值，说明过程投入较充分；但转化率低于门店均值，且 AI 练货中“异议处理”和“成交引导”分数偏低。建议店长重点辅导价格异议处理与试用后转化话术。",
    managerActions: [
      "复盘最近 5 个未成交案例",
      "安排 2 次价格异议处理练货",
      "跟进 10 位试用未购买客户",
      "下周现场抽查 1 次成交引导话术",
    ],
    cycleIssues: [
      "转化率低于门店均值",
      "客户复盘数量较高",
      "AI 练货评分持续提升",
      "异议处理得分偏低",
      "试用后成交引导不足",
    ],
    feedback: {
      problem:
        "过程投入充分，客户复盘质量较高，但转化率偏低，主要短板集中在价格异议处理和成交引导。",
      focus: "不是简单要求提高转化率，而是帮助其把客户复盘转化为成交动作。",
      tasks: [
        "完成 2 次“价格异议处理”AI 练货",
        "复盘最近 5 个未成交客户",
        "总结 3 类常见顾虑：价格、功效、适用人群",
        "跟进 10 位试用未购买客户",
        "下周由店长现场抽查 1 次成交引导话术",
      ],
      tracking: ["转化率：7.8% → 9.0%", "高潜客户跟进率：63% → 75%", "异议处理得分：61 → 72", "未成交案例复盘完成：5/5"],
      nextPlan: commonNextPlan,
    },
  },
  {
    id: "li-jianing",
    name: "李佳宁",
    segment: "高业绩低过程型",
    sales: "¥48,600",
    conversion: "12.4%",
    reviewCount: 12,
    aiScore: 71,
    action: "需补过程",
    actionTone: "amber",
    resultMetrics: [
      { label: "美妆销售额", value: "¥48,600", helper: "门店领先", tone: "green" },
      { label: "转化率", value: "12.4%", helper: "高于门店均值", tone: "green" },
      { label: "客单价", value: "¥522", helper: "较高", tone: "green" },
      { label: "复购率", value: "15%", helper: "稳定", tone: "blue" },
      { label: "门店排名", value: "1/8", helper: "销售第一", tone: "green" },
    ],
    processMetrics: [
      { label: "客户复盘数", value: "12 条", helper: "明显不足", tone: "red" },
      { label: "复盘完整度", value: "58%", helper: "证据缺口", tone: "red" },
      { label: "高潜客户跟进率", value: "49%", helper: "低于目标", tone: "amber" },
      { label: "试用客户转化率", value: "27%", helper: "结果较好", tone: "green" },
      { label: "未成交原因记录完整度", value: "52%", helper: "需规范", tone: "red" },
    ],
    abilityScores: [
      { subject: "产品知识", score: 76 },
      { subject: "功效表达", score: 74 },
      { subject: "话术结构", score: 70 },
      { subject: "异议处理", score: 69 },
      { subject: "成交引导", score: 72 },
    ],
    growthMetrics: [
      { label: "练货评分变化", value: "70 → 71" },
      { label: "新品学习速度", value: "正常" },
      { label: "店长辅导后改善", value: "不稳定" },
      { label: "主要短板", value: "复盘沉淀、过程留痕" },
    ],
    diagnosis:
      "李佳宁销售结果突出，但过程证据不足。当前绩效评价不能只奖励销售结果，需要补齐客户复盘、未成交原因和高潜客户跟进记录，避免个人经验无法复制。",
    managerActions: ["补录最近 10 个成交/未成交案例", "将高频成交话术沉淀为门店案例", "每周固定提交高潜客户跟进清单", "由店长抽查复盘完整度"],
    cycleIssues: ["销售额和转化率领先", "客户复盘数量明显不足", "过程数据不足以支持评价", "未成交原因记录不完整", "个人经验未被团队复用"],
    feedback: {
      problem: "销售结果优秀，但复盘和跟进记录不足，优秀经验难以沉淀为门店可复制方法。",
      focus: "将高业绩背后的有效动作显性化，补齐过程证据，而不是简单增加填报负担。",
      tasks: ["补录最近 10 个关键客户案例", "提炼 3 条高转化话术", "完成 1 次成交案例分享", "每周提交高潜客户跟进清单", "店长抽查 3 条未成交原因记录"],
      tracking: ["客户复盘数：12 → 24", "复盘完整度：58% → 75%", "高潜客户跟进率：49% → 65%", "成交案例分享：1/1"],
      nextPlan: {
        result: ["美妆销售额 ¥50,000", "转化率 12.0% 以上"],
        process: ["客户复盘 24 条以上", "高潜客户跟进率 65%"],
        ability: ["话术结构评分提升至 76", "产品知识评分提升至 80"],
        coaching: ["店长复盘抽查 1 次", "门店案例分享 1 次", "周中过程提醒 1 次"],
      },
    },
  },
  {
    id: "chen-siqi",
    name: "陈思琪",
    segment: "高成长新员工",
    sales: "¥18,900",
    conversion: "6.1%",
    reviewCount: 30,
    aiScore: 84,
    action: "重点培养",
    actionTone: "green",
    resultMetrics: [
      { label: "美妆销售额", value: "¥18,900", helper: "处于爬坡期", tone: "amber" },
      { label: "转化率", value: "6.1%", helper: "待提升", tone: "amber" },
      { label: "客单价", value: "¥438", helper: "基础稳定", tone: "blue" },
      { label: "复购率", value: "9%", helper: "新客为主", tone: "amber" },
      { label: "门店排名", value: "7/8", helper: "新员工阶段", tone: "amber" },
    ],
    processMetrics: [
      { label: "客户复盘数", value: "30 条", helper: "执行积极", tone: "green" },
      { label: "复盘完整度", value: "81%", helper: "持续改善", tone: "green" },
      { label: "高潜客户跟进率", value: "68%", helper: "接近目标", tone: "blue" },
      { label: "试用客户转化率", value: "16%", helper: "需陪练", tone: "amber" },
      { label: "未成交原因记录完整度", value: "82%", helper: "记录充分", tone: "green" },
    ],
    abilityScores: [
      { subject: "产品知识", score: 88 },
      { subject: "功效表达", score: 86 },
      { subject: "话术结构", score: 82 },
      { subject: "异议处理", score: 79 },
      { subject: "成交引导", score: 76 },
    ],
    growthMetrics: [
      { label: "练货评分变化", value: "58 → 84" },
      { label: "新品学习速度", value: "很快" },
      { label: "店长辅导后改善", value: "显著" },
      { label: "主要短板", value: "真实客流下的成交稳定性" },
    ],
    diagnosis:
      "陈思琪处于新员工成长爬坡期，AI 练货提升明显，客户复盘质量也在改善。短期不宜只看销售额，应围绕真实场景转化和稳定成交动作进行培养。",
    managerActions: ["安排资深导购带教 2 次", "选取高频产品做情景陪练", "建立新员工周复盘模板", "给予高成长标签并跟踪 2 周"],
    cycleIssues: ["销售结果仍处爬坡期", "AI 练货评分提升明显", "复盘执行积极", "真实客流转化不稳定", "需要资深导购带教"],
    feedback: {
      problem: "学习速度快、练货表现好，但真实销售场景下成交稳定性仍不足。",
      focus: "保护高成长势头，把 AI 练货能力迁移到真实客户接待和成交引导中。",
      tasks: ["完成 2 次真实客流复盘", "与资深导购联合接待 4 位客户", "整理 5 条新品功效表达话术", "完成 1 次成交引导模拟", "店长进行周末现场观察"],
      tracking: ["转化率：6.1% → 7.5%", "AI 练货总分：84 → 88", "联合接待复盘：4/4", "新品话术沉淀：5 条"],
      nextPlan: {
        result: ["美妆销售额 ¥24,000", "转化率 7.5%"],
        process: ["客户复盘 30 条以上", "真实客流复盘 2 次"],
        ability: ["产品知识评分提升至 90", "成交引导评分提升至 82"],
        coaching: ["资深导购带教 2 次", "店长现场观察 1 次", "周复盘 1 次"],
      },
    },
  },
  {
    id: "zhao-man",
    name: "赵曼",
    segment: "稳定停滞型",
    sales: "¥39,700",
    conversion: "10.1%",
    reviewCount: 18,
    aiScore: 75,
    action: "需激活",
    actionTone: "blue",
    resultMetrics: [
      { label: "美妆销售额", value: "¥39,700", helper: "稳定", tone: "blue" },
      { label: "转化率", value: "10.1%", helper: "略高均值", tone: "blue" },
      { label: "客单价", value: "¥501", helper: "稳定", tone: "blue" },
      { label: "复购率", value: "13%", helper: "正常", tone: "blue" },
      { label: "门店排名", value: "3/8", helper: "中上", tone: "blue" },
    ],
    processMetrics: [
      { label: "客户复盘数", value: "18 条", helper: "偏少", tone: "amber" },
      { label: "复盘完整度", value: "70%", helper: "可提升", tone: "amber" },
      { label: "高潜客户跟进率", value: "61%", helper: "接近均值", tone: "blue" },
      { label: "试用客户转化率", value: "21%", helper: "正常", tone: "blue" },
      { label: "未成交原因记录完整度", value: "68%", helper: "偏弱", tone: "amber" },
    ],
    abilityScores: [
      { subject: "产品知识", score: 78 },
      { subject: "功效表达", score: 76 },
      { subject: "话术结构", score: 74 },
      { subject: "异议处理", score: 72 },
      { subject: "成交引导", score: 75 },
    ],
    growthMetrics: [
      { label: "练货评分变化", value: "74 → 75" },
      { label: "新品学习速度", value: "正常" },
      { label: "店长辅导后改善", value: "轻微" },
      { label: "主要短板", value: "成长目标不清晰" },
    ],
    diagnosis: "赵曼结果稳定但成长动能不足，需要通过更清晰的挑战目标和案例分享任务激活。",
    managerActions: ["设置单品突破目标", "安排一次优秀案例分享", "强化新品学习检查", "跟踪两周成长指标"],
    cycleIssues: ["销售和转化稳定", "成长指标变化有限", "客户复盘偏少", "新品学习反馈一般", "需要挑战性目标"],
    feedback: {
      problem: "绩效稳定但提升曲线平缓，过程证据和成长动作不足。",
      focus: "用挑战目标激活成长，不把稳定表现误判为无需辅导。",
      tasks: ["设定 1 个重点单品突破目标", "复盘 3 个高客单客户", "完成 1 次新品话术练货", "输出 1 个门店分享案例"],
      tracking: ["销售额：¥39,700 → ¥42,000", "客户复盘数：18 → 24", "AI 练货总分：75 → 80", "分享案例：1/1"],
      nextPlan: {
        result: ["美妆销售额 ¥42,000", "转化率 10.5%"],
        process: ["客户复盘 24 条以上", "高客单客户复盘 3 条"],
        ability: ["新品表达评分提升至 82", "话术结构评分提升至 78"],
        coaching: ["挑战目标确认 1 次", "案例分享 1 次", "周复盘 1 次"],
      },
    },
  },
  {
    id: "zhou-xinyi",
    name: "周欣怡",
    segment: "均衡型",
    sales: "¥41,200",
    conversion: "9.6%",
    reviewCount: 27,
    aiScore: 82,
    action: "正常",
    actionTone: "slate",
    resultMetrics: [
      { label: "美妆销售额", value: "¥41,200", helper: "达标", tone: "green" },
      { label: "转化率", value: "9.6%", helper: "高于均值", tone: "green" },
      { label: "客单价", value: "¥493", helper: "稳定", tone: "blue" },
      { label: "复购率", value: "14%", helper: "正常", tone: "blue" },
      { label: "门店排名", value: "2/8", helper: "良好", tone: "green" },
    ],
    processMetrics: [
      { label: "客户复盘数", value: "27 条", helper: "达标", tone: "green" },
      { label: "复盘完整度", value: "80%", helper: "良好", tone: "green" },
      { label: "高潜客户跟进率", value: "72%", helper: "良好", tone: "green" },
      { label: "试用客户转化率", value: "24%", helper: "良好", tone: "green" },
      { label: "未成交原因记录完整度", value: "76%", helper: "正常", tone: "blue" },
    ],
    abilityScores: [
      { subject: "产品知识", score: 84 },
      { subject: "功效表达", score: 82 },
      { subject: "话术结构", score: 80 },
      { subject: "异议处理", score: 78 },
      { subject: "成交引导", score: 81 },
    ],
    growthMetrics: [
      { label: "练货评分变化", value: "80 → 82" },
      { label: "新品学习速度", value: "较快" },
      { label: "店长辅导后改善", value: "稳定" },
      { label: "主要短板", value: "可承担团队示范任务" },
    ],
    diagnosis: "周欣怡销售结果和过程证据均衡，可作为门店稳定样板，适合承担案例示范和带教角色。",
    managerActions: ["沉淀 1 个优秀复盘案例", "参与新员工带教", "保持常规跟进节奏", "分享高潜客户跟进方法"],
    cycleIssues: ["销售与过程表现均衡", "AI 练货评分稳定", "适合作为门店样板", "可承担带教任务", "需保持复盘质量"],
    feedback: {
      problem: "整体表现均衡，下一阶段重点是把个人方法沉淀为团队样板。",
      focus: "保持稳定绩效，同时承担示范和带教职责。",
      tasks: ["输出 1 个优秀客户复盘案例", "带教新员工联合接待 2 次", "分享高潜客户跟进方法", "保持每周复盘节奏"],
      tracking: ["客户复盘数：27 → 30", "AI 练货总分：82 → 84", "带教次数：2/2", "优秀案例：1/1"],
      nextPlan: {
        result: ["美妆销售额 ¥43,000", "转化率 9.8%"],
        process: ["客户复盘 30 条以上", "带教联合接待 2 次"],
        ability: ["异议处理评分提升至 80", "成交引导评分提升至 83"],
        coaching: ["案例共创 1 次", "带教复盘 1 次", "常规反馈 1 次"],
      },
    },
  },
  {
    id: "liu-ke",
    name: "刘可",
    segment: "低投入低产出型",
    sales: "¥21,400",
    conversion: "5.9%",
    reviewCount: 9,
    aiScore: 63,
    action: "高风险",
    actionTone: "red",
    resultMetrics: [
      { label: "美妆销售额", value: "¥21,400", helper: "低于计划", tone: "red" },
      { label: "转化率", value: "5.9%", helper: "低于均值", tone: "red" },
      { label: "客单价", value: "¥421", helper: "偏低", tone: "amber" },
      { label: "复购率", value: "8%", helper: "偏低", tone: "red" },
      { label: "门店排名", value: "8/8", helper: "末位", tone: "red" },
    ],
    processMetrics: [
      { label: "客户复盘数", value: "9 条", helper: "不足", tone: "red" },
      { label: "复盘完整度", value: "46%", helper: "不足", tone: "red" },
      { label: "高潜客户跟进率", value: "38%", helper: "不足", tone: "red" },
      { label: "试用客户转化率", value: "11%", helper: "不足", tone: "red" },
      { label: "未成交原因记录完整度", value: "43%", helper: "不足", tone: "red" },
    ],
    abilityScores: [
      { subject: "产品知识", score: 68 },
      { subject: "功效表达", score: 64 },
      { subject: "话术结构", score: 62 },
      { subject: "异议处理", score: 58 },
      { subject: "成交引导", score: 59 },
    ],
    growthMetrics: [
      { label: "练货评分变化", value: "62 → 63" },
      { label: "新品学习速度", value: "较慢" },
      { label: "店长辅导后改善", value: "有限" },
      { label: "主要短板", value: "基础过程执行、产品表达" },
    ],
    diagnosis: "刘可结果和过程均低于门店要求，需要建立短周期改善任务，并由店长进行密集跟进。",
    managerActions: ["制定 7 天改善清单", "完成基础产品知识练货", "每日检查客户复盘", "必要时进行岗位适配评估"],
    cycleIssues: ["销售结果低于计划", "过程投入不足", "AI 练货评分偏低", "客户跟进明显不足", "需进入高风险辅导"],
    feedback: {
      problem: "销售结果、过程记录和练货表现均低于门店要求，需要短周期纠偏。",
      focus: "先恢复基础过程执行，再观察能力训练后的转化变化。",
      tasks: ["完成 7 天客户复盘打卡", "完成 2 次基础产品知识练货", "每日跟进 3 位高潜客户", "店长进行 2 次现场陪访", "周末做一次风险复盘"],
      tracking: ["转化率：5.9% → 7.0%", "客户复盘数：9 → 20", "AI 练货总分：63 → 70", "每日打卡：7/7"],
      nextPlan: {
        result: ["美妆销售额 ¥28,000", "转化率 7.0%"],
        process: ["客户复盘 20 条以上", "每日高潜客户跟进 3 位"],
        ability: ["产品知识评分提升至 74", "功效表达评分提升至 70"],
        coaching: ["现场陪访 2 次", "每日过程检查", "风险复盘 1 次"],
      },
    },
  },
]

export const matrixQuadrants = [
  { key: "sales-only", title: "高销售 × 低过程", subtitle: "高业绩低过程型", names: ["李佳宁", "赵曼｜稳定停滞型"] },
  { key: "balanced", title: "高销售 × 高过程", subtitle: "均衡优秀型", names: ["周欣怡"] },
  { key: "risk", title: "低销售 × 低过程", subtitle: "高风险型", names: ["刘可"] },
  { key: "process-only", title: "低销售 × 高过程", subtitle: "高过程低转化型", names: ["王雨婷", "陈思琪｜高成长新员工"] },
]

export const researchEvidence = {
  online: {
    title: "线上访谈：13 人",
    findings: [
      "普遍存在“练货”要求",
      "名称不统一：AI 练货、正常练货、人工验货",
      "执行方式不统一：手机任务、录制视频、店长讲解",
      "扣款规则不透明：有人说不扣钱，有人说指标不达标可能扣钱",
      "员工认为难度不高：“习惯了就好”“没有想象中那么难”",
    ],
  },
  offline: {
    title: "线下店访：汉光百货店",
    findings: [
      "服饰与美妆业务已基本分开",
      "AI 练货更像转型初期工具",
      "现有绩效仍较依赖销售结果",
      "AI 尚未稳定进入计划、监控、评价、反馈闭环",
    ],
  },
  responses: [
    { issue: "名称不统一", response: "统一为“导购绩效闭环工作台”" },
    { issue: "使用深度不足", response: "将练货数据纳入绩效计划与反馈任务" },
    { issue: "绩效挂钩不清晰", response: "明确 AI 只提供证据，店长承担评价责任" },
    { issue: "反馈不够具体", response: "自动生成训练任务和追踪指标" },
    { issue: "过程数据未闭环", response: "连接计划、监控、评价、反馈四环节" },
  ],
}
