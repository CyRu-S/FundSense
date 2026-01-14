import { TrendingUp, Sparkles, Star, ArrowRight, Zap, Target, Shield, ChevronRight } from 'lucide-react'
import { MagicCard } from '@/components/react-bits/MagicCard'
import { Button } from '@/components/common/button'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

interface RecommendedFund {
    id: number
    name: string
    house: string
    category: string
    risk: string
    returns1Y: number
    chartData: { v: number }[]
    reason: string
    matchScore: number
}

const recommendedFunds: RecommendedFund[] = [
    {
        id: 1,
        name: 'HDFC Mid-Cap Opportunities',
        house: 'HDFC',
        category: 'Mid Cap',
        risk: 'High',
        returns1Y: 28.5,
        chartData: [{ v: 30 }, { v: 45 }, { v: 38 }, { v: 52 }, { v: 48 }, { v: 65 }, { v: 58 }, { v: 72 }],
        reason: 'Matches your growth-oriented profile',
        matchScore: 95,
    },
    {
        id: 2,
        name: 'Mirae Asset Tax Saver',
        house: 'Mirae Asset',
        category: 'ELSS',
        risk: 'Moderate',
        returns1Y: 24.6,
        chartData: [{ v: 35 }, { v: 42 }, { v: 38 }, { v: 55 }, { v: 48 }, { v: 62 }, { v: 58 }, { v: 68 }],
        reason: 'Tax saving + excellent returns',
        matchScore: 92,
    },
    {
        id: 3,
        name: 'Axis Bluechip Fund',
        house: 'Axis',
        category: 'Large Cap',
        risk: 'Moderate',
        returns1Y: 18.2,
        chartData: [{ v: 40 }, { v: 42 }, { v: 48 }, { v: 45 }, { v: 52 }, { v: 58 }, { v: 55 }, { v: 62 }],
        reason: 'Stable returns with lower volatility',
        matchScore: 88,
    },
]

const aiInsights = [
    {
        icon: Target,
        title: 'Goal Progress',
        description: 'You\'re 67% towards your retirement goal. Increase SIP by ₹5,000 to stay on track.',
        color: 'blue',
    },
    {
        icon: Shield,
        title: 'Risk Alert',
        description: 'Your portfolio is overweight in mid-caps. Consider rebalancing for stability.',
        color: 'yellow',
    },
    {
        icon: Zap,
        title: 'Opportunity',
        description: 'Market correction alert! Good time to invest in large-cap funds.',
        color: 'emerald',
    },
]

export function AIRecommendations() {
    return (
        <div className="space-y-6">
            {/* Section Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                        <Sparkles className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-white">AI Recommendations</h2>
                        <p className="text-xs text-slate-400">Personalized for your investment profile</p>
                    </div>
                </div>
                <Button variant="ghost" className="text-blue-400 hover:text-blue-300 text-sm">
                    View All <ChevronRight className="w-4 h-4 ml-1" />
                </Button>
            </div>

            {/* AI Insights Row */}
            <div className="grid grid-cols-3 gap-4">
                {aiInsights.map((insight, i) => (
                    <MagicCard
                        key={i}
                        className={`glass-card p-4 rounded-xl border cursor-pointer hover:scale-[1.02] transition-transform ${
                            insight.color === 'blue' ? 'border-blue-500/20 hover:border-blue-500/40' :
                            insight.color === 'yellow' ? 'border-yellow-500/20 hover:border-yellow-500/40' :
                            'border-emerald-500/20 hover:border-emerald-500/40'
                        }`}
                        glowColor={
                            insight.color === 'blue' ? '59, 130, 246' :
                            insight.color === 'yellow' ? '234, 179, 8' :
                            '16, 185, 129'
                        }
                        enableStars={false}
                        enableTilt={false}
                    >
                        <div className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                                insight.color === 'blue' ? 'bg-blue-500/20' :
                                insight.color === 'yellow' ? 'bg-yellow-500/20' :
                                'bg-emerald-500/20'
                            }`}>
                                <insight.icon className={`w-4 h-4 ${
                                    insight.color === 'blue' ? 'text-blue-400' :
                                    insight.color === 'yellow' ? 'text-yellow-400' :
                                    'text-emerald-400'
                                }`} />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-sm font-semibold text-white mb-1">{insight.title}</h4>
                                <p className="text-xs text-slate-400 leading-relaxed">{insight.description}</p>
                            </div>
                        </div>
                    </MagicCard>
                ))}
            </div>

            {/* Recommended Funds */}
            <div className="grid grid-cols-3 gap-4">
                {recommendedFunds.map((fund) => (
                    <MagicCard
                        key={fund.id}
                        className="glass-card p-5 rounded-xl border border-white/10 hover:border-blue-500/30 transition-all cursor-pointer group"
                        glowColor="59, 130, 246"
                        enableStars={true}
                        enableTilt={false}
                    >
                        {/* Match Score Badge */}
                        <div className="flex items-center justify-between mb-3">
                            <span className="flex items-center gap-1.5 text-xs font-medium text-blue-400 bg-blue-500/10 px-2 py-1 rounded-full">
                                <Sparkles className="w-3 h-3" />
                                {fund.matchScore}% Match
                            </span>
                            <span className={`text-xs px-2 py-0.5 rounded ${
                                fund.risk === 'High' ? 'bg-orange-500/20 text-orange-400' :
                                fund.risk === 'Moderate' ? 'bg-yellow-500/20 text-yellow-400' :
                                'bg-emerald-500/20 text-emerald-400'
                            }`}>
                                {fund.risk} Risk
                            </span>
                        </div>

                        {/* Fund Name */}
                        <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-blue-400 transition-colors">
                            {fund.name}
                        </h3>
                        <p className="text-xs text-slate-500 mb-3">{fund.house} • {fund.category}</p>

                        {/* AI Reason */}
                        <div className="bg-slate-800/50 rounded-lg px-3 py-2 mb-3">
                            <p className="text-xs text-slate-300 flex items-center gap-1.5">
                                <Sparkles className="w-3 h-3 text-blue-400" />
                                {fund.reason}
                            </p>
                        </div>

                        {/* Chart & Returns */}
                        <div className="flex items-end justify-between">
                            <div>
                                <p className="text-xs text-slate-500">1Y Returns</p>
                                <p className="text-xl font-bold text-emerald-400">+{fund.returns1Y}%</p>
                            </div>
                            <div className="w-20 h-10">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={fund.chartData}>
                                        <Line type="monotone" dataKey="v" stroke="#3b82f6" strokeWidth={2} dot={false} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>

                        {/* Invest Button */}
                        <Button className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white h-9 text-sm rounded-lg group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all">
                            Invest Now <ArrowRight className="w-4 h-4 ml-1" />
                        </Button>
                    </MagicCard>
                ))}
            </div>
        </div>
    )
}
