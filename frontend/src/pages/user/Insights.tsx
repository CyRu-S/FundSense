import { DashboardLayout } from '@/components/common/DashboardLayout'
import { MagicCard, MagicGrid } from '@/components/react-bits/MagicCard'
import { TrendingUp, TrendingDown, ArrowRight, BarChart3, Calendar, DollarSign, ChevronDown, MoreVertical } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, BarChart, Bar, CartesianGrid, Legend } from 'recharts'
import { Button } from '@/components/common/button'

// Mock Data - Top Performing Analysts
const topAnalysts = [
    { 
        id: 1, 
        name: 'Aria Nakamura', 
        role: 'Equity Analyst', 
        rating: 88, 
        earnings: '$14,200', 
        projects: '2.1k', 
        stars: 5.0,
        highlight: true 
    },
    { 
        id: 2, 
        name: 'Luca Marino', 
        role: 'Macro Strategist', 
        rating: 44, 
        earnings: '$11,700', 
        projects: '1.4k', 
        stars: 4.8,
        highlight: false 
    },
    { 
        id: 3, 
        name: 'James Solis', 
        role: 'Fund Manager', 
        rating: 76, 
        earnings: '$9,300', 
        projects: '1.6k', 
        stars: 4.6,
        highlight: false 
    },
]

// Trending Strategies
const trendingStrategies = [
    { name: 'Dynamic storyboards', change: 12.4, positive: true },
    { name: 'Hyper-real textures', change: 5.1, positive: true },
]

// Time vs Revenue Data
const timeRevenueData = [
    { month: 'Jul', productionTime: 30, finalizedAssets: 45 },
    { month: 'Aug', productionTime: 45, finalizedAssets: 60 },
    { month: 'Sep', productionTime: 35, finalizedAssets: 50 },
    { month: 'Oct', productionTime: 55, finalizedAssets: 70 },
    { month: 'Nov', productionTime: 40, finalizedAssets: 55 },
    { month: 'Dec', productionTime: 65, finalizedAssets: 80 },
]

// Performance Data  
const performanceData = [
    { month: 'Dec', equityFund: 2100, debtFund: 3500, balanced: 2800 },
    { month: 'Jan', equityFund: 2200, debtFund: 3200, balanced: 2600 },
    { month: 'Feb', equityFund: 2800, debtFund: 3400, balanced: 2900 },
    { month: 'Mar', equityFund: 3500, debtFund: 3600, balanced: 4500 },
    { month: 'Apr', equityFund: 4200, debtFund: 3800, balanced: 5200 },
    { month: 'May', equityFund: 5200, debtFund: 4200, balanced: 5800 },
    { month: 'Jun', equityFund: 6100, debtFund: 4450, balanced: 5500 },
    { month: 'Jul', equityFund: 5800, debtFund: 4800, balanced: 5200 },
    { month: 'Aug', equityFund: 5500, debtFund: 5200, balanced: 4900 },
    { month: 'Sep', equityFund: 5200, debtFund: 5500, balanced: 4600 },
    { month: 'Oct', equityFund: 5000, debtFund: 5800, balanced: 4400 },
    { month: 'Nov', equityFund: 4800, debtFund: 6000, balanced: 4200 },
    { month: 'Dec', equityFund: 4600, debtFund: 6200, balanced: 4000 },
]

export const InsightsPage = () => {
    return (
        <DashboardLayout>
            <div className="max-w-[1600px] mx-auto space-y-8">
                
                {/* Top Analysts Section */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-xl font-bold text-white">Top Performing Analysts</h2>
                        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-white transition-colors">
                            View all <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                    
                    <MagicGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {topAnalysts.map((analyst) => (
                            <MagicCard 
                                key={analyst.id}
                                className={`p-6 rounded-2xl border relative overflow-hidden ${
                                    analyst.highlight 
                                        ? 'bg-gradient-to-br from-[#3b82f6] to-[#1d4ed8] border-blue-400/30' 
                                        : 'glass-card border-white/10'
                                }`}
                                glowColor={analyst.highlight ? "59, 130, 246" : "255, 255, 255"}
                                enableStars={true}
                                enableTilt={false}
                            >
                                {/* Header */}
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-12 h-12 rounded-full overflow-hidden border-2 ${analyst.highlight ? 'border-white/40' : 'border-white/20'}`}>
                                            <img 
                                                src={`https://ui-avatars.com/api/?name=${analyst.name}&background=${analyst.highlight ? '1e40af' : '374151'}&color=fff`} 
                                                alt={analyst.name} 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <span className={`font-semibold ${analyst.highlight ? 'text-white' : 'text-white'}`}>
                                                    {analyst.name}
                                                </span>
                                                <svg className="w-4 h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                                </svg>
                                            </div>
                                            <p className={`text-xs ${analyst.highlight ? 'text-blue-200' : 'text-emerald-400'}`}>
                                                {analyst.role}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                            analyst.highlight 
                                                ? 'bg-white/20 text-white' 
                                                : 'bg-white/10 text-muted-foreground'
                                        }`}>
                                            {analyst.rating}%
                                        </span>
                                        <MoreVertical className={`w-4 h-4 ${analyst.highlight ? 'text-white/60' : 'text-muted-foreground'}`} />
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="grid grid-cols-3 gap-4">
                                    <div>
                                        <p className={`text-xs mb-1 ${analyst.highlight ? 'text-blue-200' : 'text-muted-foreground'}`}>Earnings</p>
                                        <p className={`text-lg font-bold ${analyst.highlight ? 'text-white' : 'text-white'}`}>
                                            {analyst.earnings}
                                        </p>
                                    </div>
                                    <div>
                                        <p className={`text-xs mb-1 ${analyst.highlight ? 'text-blue-200' : 'text-muted-foreground'}`}>Projects</p>
                                        <p className={`text-lg font-bold ${analyst.highlight ? 'text-white' : 'text-white'}`}>
                                            {analyst.projects}
                                        </p>
                                    </div>
                                    <div>
                                        <p className={`text-xs mb-1 ${analyst.highlight ? 'text-blue-200' : 'text-muted-foreground'}`}>Rating</p>
                                        <p className={`text-lg font-bold ${analyst.highlight ? 'text-white' : 'text-white'}`}>
                                            {analyst.stars}
                                        </p>
                                    </div>
                                </div>
                            </MagicCard>
                        ))}
                    </MagicGrid>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-12 gap-6">
                    
                    {/* Left Column - Trending & Time vs Revenue */}
                    <div className="col-span-12 lg:col-span-4 space-y-6">
                        
                        {/* Trending AI Styles */}
                        <MagicCard 
                            className="glass-card p-6 rounded-2xl border border-white/10"
                            glowColor="107, 123, 247"
                            enableStars={true}
                            enableTilt={false}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <div className="flex items-center gap-2">
                                    <h3 className="text-sm font-semibold text-white">Trending Strategies</h3>
                                    <BarChart3 className="w-4 h-4 text-muted-foreground" />
                                </div>
                                <ArrowRight className="w-4 h-4 text-muted-foreground" />
                            </div>
                            
                            <div className="grid grid-cols-2 gap-4">
                                {trendingStrategies.map((strategy, i) => (
                                    <div key={i} className="bg-white/5 rounded-xl p-4 border border-white/5">
                                        <p className="text-xs text-muted-foreground mb-2">{strategy.name}</p>
                                        <div className="flex items-center gap-1">
                                            {strategy.positive ? (
                                                <TrendingUp className="w-4 h-4 text-emerald-400" />
                                            ) : (
                                                <TrendingDown className="w-4 h-4 text-red-400" />
                                            )}
                                            <span className={`text-sm font-semibold ${strategy.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                                                {strategy.change}%
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </MagicCard>

                        {/* Time vs Revenue */}
                        <MagicCard 
                            className="glass-card p-6 rounded-2xl border border-white/10"
                            glowColor="107, 123, 247"
                            enableStars={true}
                            enableTilt={false}
                        >
                            <h3 className="text-sm font-semibold text-white mb-6">Time vs Revenue</h3>
                            
                            <div className="h-48">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={timeRevenueData} barGap={2}>
                                        <XAxis 
                                            dataKey="month" 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fill: '#64748b', fontSize: 11 }}
                                        />
                                        <Bar 
                                            dataKey="productionTime" 
                                            fill="rgba(59, 130, 246, 0.3)" 
                                            radius={[4, 4, 0, 0]}
                                            stackId="a"
                                        />
                                        <Bar 
                                            dataKey="finalizedAssets" 
                                            fill="#3b82f6" 
                                            radius={[4, 4, 0, 0]}
                                            stackId="b"
                                        />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                            
                            {/* Legend */}
                            <div className="flex items-center gap-6 mt-4">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500/30" />
                                    <span className="text-xs text-muted-foreground">Production time</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                    <span className="text-xs text-muted-foreground">Finalized assets</span>
                                </div>
                            </div>
                        </MagicCard>
                    </div>

                    {/* Right Column - Performance Chart */}
                    <div className="col-span-12 lg:col-span-8">
                        <MagicCard 
                            className="glass-card p-6 rounded-2xl border border-white/10 h-full"
                            glowColor="107, 123, 247"
                            enableStars={true}
                            enableTilt={false}
                        >
                            {/* Header */}
                            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex bg-white/5 rounded-full p-1">
                                        <button className="px-4 py-2 rounded-full text-sm font-medium bg-white/10 text-white">
                                            Overview
                                        </button>
                                        <button className="px-4 py-2 rounded-full text-sm font-medium text-muted-foreground hover:text-white transition-colors">
                                            My region
                                        </button>
                                    </div>
                                </div>
                                
                                <div className="flex items-center gap-4">
                                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-sm text-muted-foreground hover:text-white transition-colors border border-white/10">
                                        <Calendar className="w-4 h-4" />
                                        Jan 1, 2025 - Jan 1, 2026
                                        <ChevronDown className="w-4 h-4" />
                                    </button>
                                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-sm text-muted-foreground hover:text-white transition-colors border border-white/10">
                                        <DollarSign className="w-4 h-4" />
                                        USD
                                        <ChevronDown className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Chart Title */}
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-white">Performance</h3>
                                    <p className="text-xs text-muted-foreground">Output value across fund categories</p>
                                </div>
                                <div className="flex gap-2">
                                    <button className="p-2 rounded-lg bg-white/10 text-white">
                                        <BarChart3 className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 rounded-lg bg-white/5 text-muted-foreground hover:text-white transition-colors">
                                        <TrendingUp className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            {/* Chart */}
                            <div className="h-72">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={performanceData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                        <XAxis 
                                            dataKey="month" 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fill: '#64748b', fontSize: 11 }}
                                        />
                                        <YAxis 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fill: '#64748b', fontSize: 11 }}
                                            tickFormatter={(value) => `$${value / 1000}K`}
                                        />
                                        <Tooltip 
                                            contentStyle={{ 
                                                backgroundColor: '#1a1d29', 
                                                border: '1px solid rgba(255,255,255,0.1)', 
                                                borderRadius: '8px',
                                                boxShadow: '0 10px 40px rgba(0,0,0,0.5)'
                                            }}
                                            labelStyle={{ color: '#fff', fontWeight: 600, marginBottom: '8px' }}
                                            itemStyle={{ color: '#94a3b8', fontSize: '12px' }}
                                            formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name]}
                                        />
                                        <Line 
                                            type="stepAfter" 
                                            dataKey="equityFund" 
                                            name="Equity Fund"
                                            stroke="#f97316" 
                                            strokeWidth={2}
                                            dot={false}
                                            activeDot={{ r: 4, fill: '#f97316' }}
                                        />
                                        <Line 
                                            type="stepAfter" 
                                            dataKey="debtFund" 
                                            name="Debt Fund"
                                            stroke="#3b82f6" 
                                            strokeWidth={2}
                                            dot={false}
                                            activeDot={{ r: 4, fill: '#3b82f6' }}
                                        />
                                        <Line 
                                            type="stepAfter" 
                                            dataKey="balanced" 
                                            name="Balanced"
                                            stroke="#ec4899" 
                                            strokeWidth={2}
                                            dot={false}
                                            activeDot={{ r: 4, fill: '#ec4899' }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Legend */}
                            <div className="flex items-center gap-6 mt-4 justify-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-0.5 bg-orange-500 rounded-full" />
                                    <span className="text-xs text-muted-foreground">Equity Fund</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-0.5 bg-blue-500 rounded-full" />
                                    <span className="text-xs text-muted-foreground">Debt Fund</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-0.5 bg-pink-500 rounded-full" />
                                    <span className="text-xs text-muted-foreground">Balanced</span>
                                </div>
                            </div>
                        </MagicCard>
                    </div>
                </div>

                {/* Market Overview Section */}
                <MagicGrid className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {[
                        { title: 'Total AUM', value: '$2.4B', change: '+12.5%', positive: true, color: 'from-blue-500 to-blue-600' },
                        { title: 'Active Funds', value: '156', change: '+8', positive: true, color: 'from-emerald-500 to-emerald-600' },
                        { title: 'Avg. Return', value: '18.3%', change: '+2.1%', positive: true, color: 'from-purple-500 to-purple-600' },
                        { title: 'Risk Score', value: 'Moderate', change: 'Stable', positive: true, color: 'from-amber-500 to-amber-600' },
                    ].map((stat, i) => (
                        <MagicCard 
                            key={i}
                            className="glass-card p-6 rounded-2xl border border-white/10"
                            glowColor="107, 123, 247"
                            enableStars={true}
                            enableTilt={false}
                        >
                            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center mb-4 shadow-lg`}>
                                <TrendingUp className="w-5 h-5 text-white" />
                            </div>
                            <p className="text-xs text-muted-foreground mb-1">{stat.title}</p>
                            <div className="flex items-end gap-3">
                                <h3 className="text-2xl font-bold text-white">{stat.value}</h3>
                                <span className={`text-xs font-medium ${stat.positive ? 'text-emerald-400' : 'text-red-400'}`}>
                                    {stat.change}
                                </span>
                            </div>
                        </MagicCard>
                    ))}
                </MagicGrid>

            </div>
        </DashboardLayout>
    )
}
