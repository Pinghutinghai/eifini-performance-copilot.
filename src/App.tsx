import { useMemo, useState } from "react"
import type { ReactNode } from "react"
import {
  Activity,
  BarChart3,
  Bot,
  CheckCircle2,
  ClipboardList,
  FileSearch,
  Gauge,
  LineChart,
  Loader2,
  PanelLeft,
  RefreshCw,
  Sparkles,
  Target,
  TrendingUp,
  UserRound,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import {
  advisors,
  closedLoopSteps,
  kpis,
  matrixQuadrants,
  overviewDiagnosis,
  researchEvidence,
  storeContext,
  trendData,
} from "./mockData"
import type { Advisor, Metric } from "./mockData"

type TabId = "overview" | "profile" | "diagnosis" | "tasks" | "research"

type Tab = {
  id: TabId
  label: string
  icon: LucideIcon
}

const tabs: Tab[] = [
  { id: "overview", label: "门店总览", icon: Gauge },
  { id: "profile", label: "导购档案", icon: UserRound },
  { id: "diagnosis", label: "AI 绩效诊断", icon: Bot },
  { id: "tasks", label: "反馈任务卡", icon: ClipboardList },
  { id: "research", label: "调研证据", icon: FileSearch },
]

const toneClasses: Record<string, string> = {
  blue: "border-blue-100 bg-blue-50 text-blue-700",
  green: "border-emerald-100 bg-emerald-50 text-emerald-700",
  amber: "border-amber-100 bg-amber-50 text-amber-700",
  red: "border-rose-100 bg-rose-50 text-rose-700",
  slate: "border-slate-200 bg-slate-50 text-slate-600",
}

function App() {
  const [activeTab, setActiveTab] = useState<TabId>("overview")
  const [selectedAdvisorId, setSelectedAdvisorId] = useState(advisors[0].id)
  const [isGenerating, setIsGenerating] = useState(false)

  const selectedAdvisor = useMemo(
    () => advisors.find((advisor) => advisor.id === selectedAdvisorId) ?? advisors[0],
    [selectedAdvisorId],
  )

  function selectAdvisor(advisorId: string, nextTab?: TabId) {
    setSelectedAdvisorId(advisorId)
    setIsGenerating(false)
    if (nextTab) {
      setActiveTab(nextTab)
    }
  }

  function generateFeedbackCard() {
    setIsGenerating(true)
    window.setTimeout(() => setIsGenerating(false), 1000)
  }

  return (
    <div className="min-h-screen bg-[#f4f6fa] text-slate-900">
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="z-20 flex w-full flex-col border-r border-slate-200 bg-white lg:fixed lg:inset-y-0 lg:left-0 lg:w-[248px]">
          <div className="border-b border-slate-200 px-6 py-6">
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-700 text-white">
              <Sparkles className="h-5 w-5" />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-blue-700">Eifini</p>
            <h1 className="mt-2 text-lg font-semibold leading-snug text-slate-950">
              伊芙丽导购绩效闭环工作台
            </h1>
            <p className="mt-2 text-xs leading-5 text-slate-500">Eifini Frontline Performance Copilot</p>
          </div>

          <nav className="flex flex-1 gap-1 overflow-x-auto px-3 py-4 lg:block lg:space-y-1 lg:overflow-visible">
            {tabs.map((tab) => {
              const Icon = tab.icon
              const active = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  className={[
                    "flex w-max items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition lg:w-full",
                    active ? "bg-blue-700 text-white shadow-sm" : "text-slate-600 hover:bg-slate-100 hover:text-slate-950",
                  ].join(" ")}
                  onClick={() => setActiveTab(tab.id)}
                  type="button"
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              )
            })}
          </nav>

          <div className="m-4 rounded-lg border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-medium text-slate-500">当前门店</p>
            <p className="mt-1 text-sm font-semibold text-slate-950">{storeContext.store}</p>
            <p className="mt-3 text-xs font-medium text-slate-500">周期</p>
            <p className="mt-1 text-sm text-slate-700">{storeContext.cycle}</p>
          </div>
        </aside>

        <div className="flex min-h-screen flex-1 flex-col lg:ml-[248px]">
          <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
            <div className="mx-auto flex max-w-[1180px] flex-wrap items-center justify-between gap-3 px-6 py-4">
              <div className="flex items-center gap-3">
                <PanelLeft className="h-5 w-5 text-slate-400" />
                <div>
                  <p className="text-xs font-medium text-slate-500">{storeContext.store} · {storeContext.cycle}</p>
                  <h2 className="text-xl font-semibold text-slate-950">{tabs.find((tab) => tab.id === activeTab)?.label}</h2>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs text-slate-500">
                  数据更新时间 {storeContext.updatedAt}
                </span>
                <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50" type="button">
                  <RefreshCw className="h-4 w-4" />
                  刷新 mock
                </button>
              </div>
            </div>
          </header>

          <main className="mx-auto w-full max-w-[1180px] flex-1 px-6 py-5">
            {activeTab === "overview" && <OverviewPage onSelectAdvisor={selectAdvisor} selectedAdvisorId={selectedAdvisorId} />}
            {activeTab === "profile" && <ProfilePage advisor={selectedAdvisor} onSelectAdvisor={selectAdvisor} />}
            {activeTab === "diagnosis" && <DiagnosisPage />}
            {activeTab === "tasks" && (
              <TasksPage advisor={selectedAdvisor} isGenerating={isGenerating} onGenerate={generateFeedbackCard} onSelectAdvisor={selectAdvisor} />
            )}
            {activeTab === "research" && <ResearchPage />}
          </main>
        </div>
      </div>
    </div>
  )
}

function SectionHeader({ eyebrow, title, action }: { eyebrow?: string; title: string; action?: string }) {
  return (
    <div className="mb-3 flex items-end justify-between gap-4">
      <div>
        {eyebrow ? <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">{eyebrow}</p> : null}
        <h3 className="mt-1 text-base font-semibold text-slate-950">{title}</h3>
      </div>
      {action ? <p className="text-xs font-medium text-slate-500">{action}</p> : null}
    </div>
  )
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-lg border border-slate-200 bg-white shadow-[0_8px_24px_rgba(15,23,42,0.04)] ${className}`}>{children}</section>
}

function MetricCard({ metric }: { metric: Metric }) {
  return (
    <Card className="p-4">
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-medium text-slate-500">{metric.label}</p>
        <span className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${toneClasses[metric.tone]}`}>{metric.helper}</span>
      </div>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">{metric.value}</p>
    </Card>
  )
}

function StatusBadge({ tone, children }: { tone: Advisor["actionTone"]; children: ReactNode }) {
  return <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-semibold ${toneClasses[tone]}`}>{children}</span>
}

function OverviewPage({ onSelectAdvisor, selectedAdvisorId }: { onSelectAdvisor: (id: string, tab?: TabId) => void; selectedAdvisorId: string }) {
  return (
    <div className="space-y-5">
      <div className="flex items-start justify-between gap-6">
        <div>
          <p className="text-sm font-medium text-blue-700">{storeContext.store} · {storeContext.cycle}</p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">伊芙丽导购绩效闭环工作台</h2>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            将客户复盘、AI 练货、门店仪表盘和导购成长档案整合为绩效计划、绩效监控、绩效评价、绩效反馈的完整闭环。
          </p>
        </div>
        <div className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-3 text-right">
          <p className="text-xs font-medium text-blue-700">闭环成熟度</p>
          <p className="mt-1 text-2xl font-semibold text-blue-900">B+</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-6">
        {kpis.map((kpi) => (
          <MetricCard key={kpi.label} metric={kpi} />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1.45fr_0.85fr]">
        <Card className="p-4">
          <SectionHeader eyebrow="Performance loop" title="横向绩效闭环流程" action="计划 → 监控 → 评价 → 反馈" />
          <div className="grid grid-cols-1 gap-3 md:grid-cols-5">
            {closedLoopSteps.map((step, index) => (
              <div key={step.title} className="relative rounded-lg border border-slate-200 bg-slate-50 p-3">
                {index < closedLoopSteps.length - 1 ? <div className="absolute right-[-18px] top-8 h-px w-6 bg-slate-300" /> : null}
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-700 text-xs font-semibold text-white">{index + 1}</span>
                  <p className="text-sm font-semibold text-slate-950">{step.title}</p>
                </div>
                <p className="mt-3 text-xs leading-5 text-slate-600">{step.status}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <SectionHeader eyebrow="Store trend" title="周度过程与销售趋势" />
          <div className="h-[164px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={trendData} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                <CartesianGrid stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="week" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#64748b" }} tickFormatter={(value: number) => `${value / 1000}k`} />
                <Tooltip cursor={{ fill: "#eff6ff" }} />
                <Bar dataKey="sales" fill="#2563eb" radius={[4, 4, 0, 0]} name="销售额" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <Card className="border-blue-200 bg-blue-50/50 p-4">
        <div className="flex gap-3">
          <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-700 text-white">
            <Bot className="h-5 w-5" />
          </div>
          <div>
            <p className="text-sm font-semibold text-blue-950">AI 诊断摘要</p>
            <p className="mt-2 text-sm leading-6 text-blue-950/80">{overviewDiagnosis}</p>
          </div>
        </div>
      </Card>

      <AdvisorTable selectedAdvisorId={selectedAdvisorId} onSelectAdvisor={onSelectAdvisor} />
    </div>
  )
}

function AdvisorTable({ selectedAdvisorId, onSelectAdvisor }: { selectedAdvisorId: string; onSelectAdvisor: (id: string, tab?: TabId) => void }) {
  return (
    <Card className="overflow-hidden">
      <div className="border-b border-slate-200 px-4 py-3">
        <SectionHeader title="导购列表" action="点击行可同步导购档案与反馈任务卡" />
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="px-4 py-3">导购</th>
              <th className="px-4 py-3">绩效类型</th>
              <th className="px-4 py-3">销售额</th>
              <th className="px-4 py-3">转化率</th>
              <th className="px-4 py-3">复盘数</th>
              <th className="px-4 py-3">AI 练货分</th>
              <th className="px-4 py-3">动作</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {advisors.map((advisor) => {
              const selected = selectedAdvisorId === advisor.id
              return (
                <tr
                  key={advisor.id}
                  className={selected ? "cursor-pointer bg-blue-50/70" : "cursor-pointer bg-white hover:bg-slate-50"}
                  onClick={() => onSelectAdvisor(advisor.id)}
                >
                  <td className="px-4 py-3 font-semibold text-slate-950">{advisor.name}</td>
                  <td className="px-4 py-3 text-slate-600">{advisor.segment}</td>
                  <td className="px-4 py-3 font-medium text-slate-900">{advisor.sales}</td>
                  <td className="px-4 py-3 text-slate-700">{advisor.conversion}</td>
                  <td className="px-4 py-3 text-slate-700">{advisor.reviewCount}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-20 rounded-full bg-slate-100">
                        <div className="h-1.5 rounded-full bg-blue-600" style={{ width: `${advisor.aiScore}%` }} />
                      </div>
                      <span className="font-medium text-slate-800">{advisor.aiScore}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <button type="button" onClick={(event) => { event.stopPropagation(); onSelectAdvisor(advisor.id, "profile") }}>
                      <StatusBadge tone={advisor.actionTone}>{advisor.action}</StatusBadge>
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </Card>
  )
}

function ProfilePage({ advisor, onSelectAdvisor }: { advisor: Advisor; onSelectAdvisor: (id: string) => void }) {
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_330px]">
      <div className="space-y-5">
        <AdvisorSwitcher selectedId={advisor.id} onSelectAdvisor={onSelectAdvisor} />
        <Card className="p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-blue-700">导购成长档案</p>
              <h2 className="mt-1 text-2xl font-semibold text-slate-950">{advisor.name}｜{advisor.segment}</h2>
            </div>
            <StatusBadge tone={advisor.actionTone}>{advisor.action}</StatusBadge>
          </div>
        </Card>

        <EvidenceBlock title="结果绩效" icon={Target} metrics={advisor.resultMetrics} columns="grid-cols-5" />
        <EvidenceBlock title="过程绩效" icon={Activity} metrics={advisor.processMetrics} columns="grid-cols-5" />

        <div className="grid grid-cols-1 gap-4 xl:grid-cols-[1fr_0.92fr]">
          <Card className="p-4">
            <SectionHeader title="能力绩效" action={`AI 练货总分 ${advisor.aiScore}/100`} />
            <div className="h-[244px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={advisor.abilityScores}>
                  <PolarGrid stroke="#dbe4ef" />
                  <PolarAngleAxis dataKey="subject" tick={{ fontSize: 11, fill: "#475569" }} />
                  <Radar dataKey="score" stroke="#2563eb" fill="#2563eb" fillOpacity={0.18} />
                  <Tooltip />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-4">
            <SectionHeader title="成长绩效" />
            <div className="space-y-3">
              {advisor.growthMetrics.map((metric) => (
                <div key={metric.label} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="text-xs font-medium text-slate-500">{metric.label}</p>
                  <p className="mt-1 text-sm font-semibold leading-5 text-slate-950">{metric.value}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <aside className="space-y-4">
        <Card className="p-5">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5 text-blue-700" />
            <h3 className="font-semibold text-slate-950">AI 诊断卡</h3>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-700">{advisor.diagnosis}</p>
        </Card>
        <Card className="p-5">
          <SectionHeader title="店长动作建议" />
          <ul className="space-y-3">
            {advisor.managerActions.map((action) => (
              <li key={action} className="flex gap-3 text-sm leading-5 text-slate-700">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
                {action}
              </li>
            ))}
          </ul>
        </Card>
      </aside>
    </div>
  )
}

function AdvisorSwitcher({ selectedId, onSelectAdvisor }: { selectedId: string; onSelectAdvisor: (id: string) => void }) {
  return (
    <div className="flex flex-wrap gap-2">
      {advisors.slice(0, 6).map((advisor) => (
        <button
          key={advisor.id}
          className={[
            "rounded-full border px-3 py-1.5 text-xs font-semibold transition",
            selectedId === advisor.id ? "border-blue-700 bg-blue-700 text-white" : "border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-blue-700",
          ].join(" ")}
          onClick={() => onSelectAdvisor(advisor.id)}
          type="button"
        >
          {advisor.name}
        </button>
      ))}
    </div>
  )
}

function EvidenceBlock({ title, icon: Icon, metrics, columns }: { title: string; icon: LucideIcon; metrics: Metric[]; columns: string }) {
  return (
    <Card className="p-4">
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-5 w-5 text-blue-700" />
        <h3 className="font-semibold text-slate-950">{title}</h3>
      </div>
      <div className={`grid ${columns} gap-3`}>
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs font-medium text-slate-500">{metric.label}</p>
            <p className="mt-2 text-lg font-semibold text-slate-950">{metric.value}</p>
            <p className={`mt-2 inline-flex rounded-full border px-2 py-0.5 text-[11px] font-semibold ${toneClasses[metric.tone]}`}>{metric.helper}</p>
          </div>
        ))}
      </div>
    </Card>
  )
}

function DiagnosisPage() {
  return (
    <div className="space-y-5">
      <Card className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-blue-700">AI Performance Diagnosis</p>
            <h2 className="mt-1 text-2xl font-semibold text-slate-950">过程投入 × 销售结果 2x2 矩阵</h2>
          </div>
          <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
            <BarChart3 className="h-4 w-4 text-blue-700" />
            AI 只输出证据，不替代店长评价
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-[54px_1fr]">
        <div className="flex items-center justify-center">
          <div className="-rotate-90 whitespace-nowrap text-sm font-semibold text-slate-600">销售结果</div>
        </div>
        <Card className="relative p-5">
          <div className="grid h-[510px] grid-cols-2 grid-rows-2 overflow-hidden rounded-lg border border-slate-200">
            {matrixQuadrants.map((quadrant) => (
              <div key={quadrant.key} className="relative border border-slate-200 bg-white p-5">
                <p className="text-sm font-semibold text-slate-950">{quadrant.title}</p>
                <p className="mt-1 text-xs font-medium text-blue-700">{quadrant.subtitle}</p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {quadrant.names.map((name) => (
                    <span key={name} className="inline-flex rounded-full border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-800 shadow-sm">
                      {name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-3 text-center text-sm font-semibold text-slate-600">过程投入</div>
          <div className="pointer-events-none absolute bottom-14 left-8 text-xs text-slate-400">低</div>
          <div className="pointer-events-none absolute bottom-14 right-8 text-xs text-slate-400">高</div>
          <div className="pointer-events-none absolute left-7 top-8 text-xs text-slate-400">高</div>
          <div className="pointer-events-none absolute bottom-16 left-7 text-xs text-slate-400">低</div>
        </Card>
      </div>

      <Card className="border-blue-200 bg-blue-50 p-5">
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-blue-700" />
          <p className="text-base font-semibold leading-6 text-blue-950">
            AI 的价值不是直接给出绩效等级，而是帮助店长识别同样销售结果背后的不同绩效原因。
          </p>
        </div>
      </Card>
    </div>
  )
}

function TasksPage({
  advisor,
  isGenerating,
  onGenerate,
  onSelectAdvisor,
}: {
  advisor: Advisor
  isGenerating: boolean
  onGenerate: () => void
  onSelectAdvisor: (id: string) => void
}) {
  return (
    <div className="space-y-4">
      <AdvisorSwitcher selectedId={advisor.id} onSelectAdvisor={onSelectAdvisor} />
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-[0.82fr_1.15fr_0.9fr]">
        <Card className="p-5">
          <SectionHeader title={`${advisor.name}｜本周期问题`} />
          <ul className="space-y-3">
            {advisor.cycleIssues.map((issue) => (
              <li key={issue} className="flex gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-sm text-slate-700">
                <Activity className="mt-0.5 h-4 w-4 shrink-0 text-blue-700" />
                {issue}
              </li>
            ))}
          </ul>
        </Card>

        <Card className="min-h-[620px] p-5">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">AI generated card</p>
              <h3 className="mt-1 text-lg font-semibold text-slate-950">反馈任务卡｜{advisor.name}</h3>
            </div>
            <button
              className="inline-flex items-center gap-2 rounded-lg bg-blue-700 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-800 disabled:cursor-not-allowed disabled:bg-blue-300"
              disabled={isGenerating}
              onClick={onGenerate}
              type="button"
            >
              {isGenerating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              生成反馈任务卡
            </button>
          </div>

          {isGenerating ? (
            <div className="flex h-[500px] flex-col items-center justify-center rounded-lg border border-dashed border-blue-200 bg-blue-50 text-blue-800">
              <Loader2 className="h-8 w-8 animate-spin" />
              <p className="mt-3 text-sm font-semibold">正在汇总销售、复盘与练货证据...</p>
            </div>
          ) : (
            <div className="space-y-4">
              <TaskTextBlock title="本周期问题" text={advisor.feedback.problem} />
              <TaskTextBlock title="店长反馈重点" text={advisor.feedback.focus} />
              <div>
                <p className="text-sm font-semibold text-slate-950">训练任务</p>
                <ol className="mt-3 space-y-2">
                  {advisor.feedback.tasks.map((task, index) => (
                    <li key={task} className="flex gap-3 rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-700">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-blue-700 text-xs font-semibold text-white">{index + 1}</span>
                      {task}
                    </li>
                  ))}
                </ol>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-950">追踪指标</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {advisor.feedback.tracking.map((item) => (
                    <div key={item} className="rounded-lg border border-blue-100 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-900">{item}</div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </Card>

        <Card className="p-5">
          <SectionHeader title="下一周期绩效计划" action={storeContext.cycle} />
          <PlanGroup icon={TrendingUp} title="结果目标" items={advisor.feedback.nextPlan.result} />
          <PlanGroup icon={LineChart} title="过程目标" items={advisor.feedback.nextPlan.process} />
          <PlanGroup icon={Bot} title="能力目标" items={advisor.feedback.nextPlan.ability} />
          <PlanGroup icon={ClipboardList} title="辅导安排" items={advisor.feedback.nextPlan.coaching} />
        </Card>
      </div>
    </div>
  )
}

function TaskTextBlock({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
      <p className="text-sm font-semibold text-slate-950">{title}</p>
      <p className="mt-2 text-sm leading-6 text-slate-700">“{text}”</p>
    </div>
  )
}

function PlanGroup({ icon: Icon, title, items }: { icon: LucideIcon; title: string; items: string[] }) {
  return (
    <div className="border-b border-slate-100 py-4 last:border-b-0">
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-4 w-4 text-blue-700" />
        <p className="text-sm font-semibold text-slate-950">{title}</p>
      </div>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="text-sm leading-5 text-slate-600">- {item}</li>
        ))}
      </ul>
    </div>
  )
}

function ResearchPage() {
  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-[0.88fr_1.12fr]">
      <div className="space-y-4">
        <EvidenceCard title={researchEvidence.online.title} findings={researchEvidence.online.findings} />
        <EvidenceCard title={researchEvidence.offline.title} findings={researchEvidence.offline.findings} />
      </div>
      <Card className="overflow-hidden">
        <div className="border-b border-slate-200 p-5">
          <p className="text-sm font-medium text-blue-700">Design response</p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-950">设计回应</h2>
          <p className="mt-2 text-sm text-slate-600">将调研中的模糊要求转译为绩效闭环中的明确工具位。</p>
        </div>
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs font-semibold uppercase tracking-wide text-slate-500">
            <tr>
              <th className="w-1/3 px-5 py-3">调研问题</th>
              <th className="px-5 py-3">工具设计回应</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {researchEvidence.responses.map((row) => (
              <tr key={row.issue}>
                <td className="px-5 py-4 font-semibold text-slate-950">{row.issue}</td>
                <td className="px-5 py-4 leading-6 text-slate-700">{row.response}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="border-t border-slate-200 bg-blue-50 p-5">
          <p className="text-sm font-semibold leading-6 text-blue-950">
            调研证据用于解释为什么 Demo 不只是“练货工具”，而是把过程数据放进计划、监控、评价与反馈的管理闭环。
          </p>
        </div>
      </Card>
    </div>
  )
}

function EvidenceCard({ title, findings }: { title: string; findings: string[] }) {
  return (
    <Card className="p-5">
      <div className="mb-4 flex items-center gap-2">
        <FileSearch className="h-5 w-5 text-blue-700" />
        <h3 className="font-semibold text-slate-950">{title}</h3>
      </div>
      <ul className="space-y-3">
        {findings.map((finding) => (
          <li key={finding} className="flex gap-3 text-sm leading-6 text-slate-700">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-700" />
            {finding}
          </li>
        ))}
      </ul>
    </Card>
  )
}

export default App
