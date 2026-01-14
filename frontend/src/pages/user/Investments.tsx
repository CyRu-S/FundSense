import { DashboardLayout } from '@/components/common/DashboardLayout'
import { MagicCard, MagicGrid } from '@/components/react-bits/MagicCard'
import { TrendingUp, TrendingDown, Search } from 'lucide-react'
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts'
import { Button } from '@/components/common/button'

// Portfolio Return Chart Data
const portfolioReturnData = [
    { date: 'Aug 26', value: 5000 },
    { date: 'Aug 27', value: 7000 },
    { date: 'Aug 28', value: 6500 },
    { date: 'Aug 29', value: 9000 },
    { date: 'Aug 30', value: 12000 },
    { date: 'Aug 31', value: 15000 },
    { date: 'Sep 1', value: 18000 },
]

// My Portfolio Data
const myPortfolio = [
    { symbol: 'AAPL', name: 'Apple Inc.', logo: '🍎', shares: 20, price: 148.79, change: -0.20, value: 2972.4 },
    { symbol: 'AMC', name: 'Entertainment Holdi...', logo: '🎬', shares: 10, price: 40.64, change: 3.42, value: 408.8 },
    { symbol: 'MRIN', name: 'Main Software Inco...', logo: '💻', shares: 8, price: 12.88, change: 64.91, value: 54.5 },
    { symbol: 'MRNA', name: 'Moderna Inc.', logo: '💉', shares: 5, price: 448.72, change: 1.56, value: 872.48 },
    { symbol: 'AZN', name: 'AstraZeneca', logo: '💊', shares: 12, price: 232.32, change: 0.98, value: 292.4 },
]

// My Watchlist Data
const myWatchlist = [
    { symbol: 'AAPL', name: 'Apple Inc.', change: -0.20, trend: 'down' },
    { symbol: 'AMC', name: 'Entertainment Holdi...', change: 3.42, trend: 'up' },
    { symbol: 'MRIN', name: 'Main Software Inco...', change: 64.91, trend: 'up' },
    { symbol: 'MRNA', name: 'Moderna Inc.', change: 1.56, trend: 'up' },
    { symbol: 'AZN', name: 'AstraZeneca', change: 0.98, trend: 'up' },
    { symbol: 'GOOGL', name: 'Alphabet Inc.', change: 2.15, trend: 'up' },
    { symbol: 'TSLA', name: 'Tesla Inc.', change: -1.87, trend: 'down' },
]

// Markets Data
const marketsData = [
    { symbol: 'NVDA', name: 'NVIDIA Corporation', logo: '🟢', marketCap: '$3.111T', price: 126.46, change: -2.25, volume: '332.962M', relVolume: 1.71, pe: 34.59, sector: 'Electronic Technology', rating: 'Strong Buy' },
    { symbol: 'MSFT', name: 'Microsoft Corp.', logo: '🔵', marketCap: '$2.95T', price: 378.91, change: 1.42, volume: '245.123M', relVolume: 0.98, pe: 32.45, sector: 'Technology Services', rating: 'Strong Buy' },
]

// Mini sparkline data generator
const generateSparkline = (trend: string) => {
    const points = []
    let value = 50
    for (let i = 0; i < 20; i++) {
        value += trend === 'up' ? Math.random() * 10 - 3 : Math.random() * 10 - 7
        points.push({ x: i, y: Math.max(10, Math.min(90, value)) })
    }
    return points
}

export const InvestmentsPage = () => {
    return (
        <DashboardLayout>
            <div className="max-w-[1600px] mx-auto space-y-6 pr-2">
                
                <MagicGrid className="grid grid-cols-12 gap-6">
                    
                    {/* Current Value Card */}
                    <div className="col-span-12 lg:col-span-3">
                        <MagicCard 
                            className="glass-card p-6 rounded-xl border border-white/5 h-full"
                            glowColor="59, 130, 246"
                            enableStars={true}
                            enableTilt={false}
                        >
                            <p className="text-slate-400 text-sm mb-3">Current Value</p>
                            <div className="flex items-center gap-3 mb-2">
                                <h2 className="text-3xl font-bold text-white">$7291.32</h2>
                                <Button variant="outline" className="h-8 px-4 text-xs border-slate-700 text-slate-300 hover:bg-slate-800 rounded-full">
                                    See Details
                                </Button>
                            </div>
                            <p className="text-emerald-400 text-sm mb-6">0.64 (+1.23%)</p>
                            
                            <div className="pt-4 border-t border-slate-800">
                                <p className="text-slate-500 text-xs mb-1">Invested Value</p>
                                <div className="flex items-center gap-3">
                                    <span className="text-xl font-bold text-white">$7291.32</span>
                                    <span className="text-slate-400 text-sm">0.64 (+1.23%)</span>
                                </div>
                            </div>
                        </MagicCard>
                    </div>

                    {/* Portfolio Return Chart */}
                    <div className="col-span-12 lg:col-span-6">
                        <MagicCard 
                            className="glass-card p-6 rounded-xl border border-white/5 h-full"
                            glowColor="59, 130, 246"
                            enableStars={true}
                            enableTilt={false}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <p className="text-slate-400 text-sm">Portfolio Return</p>
                                <div className="flex bg-slate-800/50 rounded-lg p-0.5">
                                    {['1D', '7D', '1M', '1Y', 'All'].map((period) => (
                                        <button 
                                            key={period}
                                            className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                                                period === '1M' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                                            }`}
                                        >
                                            {period}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="h-40">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={portfolioReturnData}>
                                        <defs>
                                            <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#10b981" stopOpacity={0.3}/>
                                                <stop offset="100%" stopColor="#10b981" stopOpacity={0}/>
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                                        <XAxis 
                                            dataKey="date" 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fill: '#64748b', fontSize: 10 }}
                                        />
                                        <YAxis 
                                            axisLine={false} 
                                            tickLine={false} 
                                            tick={{ fill: '#64748b', fontSize: 10 }}
                                            tickFormatter={(v) => `$${v/1000}K`}
                                            domain={[0, 20000]}
                                        />
                                        <Tooltip 
                                            contentStyle={{ 
                                                backgroundColor: '#1e293b', 
                                                border: '1px solid rgba(255,255,255,0.1)', 
                                                borderRadius: '8px',
                                            }}
                                        />
                                        <Area 
                                            type="monotone" 
                                            dataKey="value" 
                                            stroke="#10b981" 
                                            strokeWidth={2}
                                            fill="url(#portfolioGradient)" 
                                        />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </MagicCard>
                    </div>

                    {/* Transaction Order & Purchase Quantity */}
                    <div className="col-span-12 lg:col-span-3 space-y-4">
                        <MagicCard 
                            className="glass-card p-5 rounded-xl border border-white/5"
                            glowColor="59, 130, 246"
                            enableStars={true}
                            enableTilt={false}
                        >
                            <p className="text-slate-400 text-sm mb-2">Transaction Order</p>
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-white">29</span>
                                <span className="text-slate-500 text-lg">/35</span>
                                <span className="text-slate-400 text-xs ml-2">5.24% vs Last Month</span>
                            </div>
                        </MagicCard>
                        
                        <MagicCard 
                            className="glass-card p-5 rounded-xl border border-white/5"
                            glowColor="59, 130, 246"
                            enableStars={true}
                            enableTilt={false}
                        >
                            <p className="text-slate-400 text-sm mb-2">Purchase Quantity</p>
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-bold text-white">2,189.48</span>
                                <span className="text-slate-500 text-sm">USDT</span>
                            </div>
                        </MagicCard>
                    </div>

                    {/* My Portfolio */}
                    <div className="col-span-12 lg:col-span-6 h-full">
                        <MagicCard 
                            className="glass-card p-5 rounded-xl border border-white/5 h-full"
                            glowColor="59, 130, 246"
                            enableStars={true}
                            enableTilt={false}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-white font-semibold">My Portfolio</h3>
                                <div className="flex items-center gap-2">
                                    <div className="flex bg-slate-800/50 rounded-lg p-0.5">
                                        {['All', 'Gainers', 'Decliners'].map((tab) => (
                                            <button 
                                                key={tab}
                                                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                                                    tab === 'All' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                                                }`}
                                            >
                                                {tab}
                                            </button>
                                        ))}
                                    </div>
                                    <Button variant="outline" className="h-7 px-3 text-xs border-slate-700 text-slate-400 hover:text-white rounded-full">
                                        See All
                                    </Button>
                                </div>
                            </div>
                            
                            {/* Table Header */}
                            <div className="grid grid-cols-5 gap-2 pb-2 border-b border-slate-800 mb-2">
                                <span className="text-xs text-slate-500"></span>
                                <span className="text-xs text-slate-500">Share amount</span>
                                <span className="text-xs text-slate-500">Price</span>
                                <span className="text-xs text-slate-500">Change</span>
                                <span className="text-xs text-slate-500">Current Value</span>
                            </div>
                            
                            {myPortfolio.map((stock, i) => (
                                <div key={i} className="grid grid-cols-5 gap-2 py-2.5 items-center hover:bg-slate-800/30 rounded-lg transition-colors">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm">
                                            {stock.logo}
                                        </div>
                                        <div>
                                            <p className="text-white text-sm font-medium">{stock.symbol}</p>
                                            <p className="text-slate-500 text-[10px]">{stock.name}</p>
                                        </div>
                                    </div>
                                    <span className="text-white text-sm">{stock.shares}</span>
                                    <span className="text-white text-sm">${stock.price}</span>
                                    <span className={`text-sm ${stock.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                        {stock.change >= 0 ? '+' : ''}{stock.change}%
                                    </span>
                                    <span className="text-white text-sm font-medium">${stock.value}</span>
                                </div>
                            ))}
                        </MagicCard>
                    </div>

                    {/* My Watchlist */}
                    <div className="col-span-12 lg:col-span-6 h-full">
                        <MagicCard 
                            className="glass-card p-5 rounded-xl border border-white/5 h-full flex flex-col"
                            glowColor="59, 130, 246"
                            enableStars={true}
                            enableTilt={false}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-white font-semibold">My Watchlist</h3>
                                <div className="flex items-center gap-2">
                                    <div className="flex bg-slate-800/50 rounded-lg p-0.5">
                                        {['All', 'Gainers', 'Decliners'].map((tab) => (
                                            <button 
                                                key={tab}
                                                className={`px-3 py-1 text-xs font-medium rounded-md transition-colors ${
                                                    tab === 'All' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                                                }`}
                                            >
                                                {tab}
                                            </button>
                                        ))}
                                    </div>
                                    <Button variant="outline" className="h-7 px-3 text-xs border-slate-700 text-slate-400 hover:text-white rounded-full">
                                        See All
                                    </Button>
                                </div>
                            </div>
                            
                            {/* Scrollable content - fills to match portfolio height */}
                            <div 
                                className="flex-1 overflow-y-auto pr-2"
                                style={{
                                    scrollbarWidth: 'thin',
                                    scrollbarColor: '#3b82f6 transparent'
                                }}
                            >
                                {myWatchlist.map((stock, i) => (
                                    <div key={i} className="flex items-center justify-between py-2.5 hover:bg-slate-800/30 rounded-lg transition-colors px-1">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-sm">
                                                {myPortfolio.find(p => p.symbol === stock.symbol)?.logo}
                                            </div>
                                            <div>
                                                <p className="text-white text-sm font-medium">{stock.symbol}</p>
                                                <p className="text-slate-500 text-[10px]">{stock.name}</p>
                                            </div>
                                        </div>
                                        
                                        {/* Mini Sparkline */}
                                        <div className="w-20 h-8">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={generateSparkline(stock.trend)}>
                                                    <Area 
                                                        type="monotone" 
                                                        dataKey="y" 
                                                        stroke={stock.change >= 0 ? '#10b981' : '#ef4444'} 
                                                        strokeWidth={1.5}
                                                        fill="transparent"
                                                    />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </div>
                                        
                                        <div className="text-right">
                                            <p className="text-slate-500 text-[10px]">Change</p>
                                            <p className={`text-sm font-medium ${stock.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                                {stock.change >= 0 ? '+' : ''}{stock.change}%
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </MagicCard>
                    </div>

                    {/* Markets */}
                    <div className="col-span-12">
                        <MagicCard 
                            className="glass-card p-5 rounded-xl border border-white/5"
                            glowColor="59, 130, 246"
                            enableStars={true}
                            enableTilt={false}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-white font-semibold">Markets</h3>
                                <div className="flex bg-slate-800/50 rounded-lg p-0.5">
                                    {['Overview', 'Performance', 'Valuation', 'Dividends', 'Profitability', 'Income Statement', 'Cash Flow'].map((tab) => (
                                        <button 
                                            key={tab}
                                            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                                                tab === 'Overview' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
                                            }`}
                                        >
                                            {tab}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Table Header */}
                            <div className="grid grid-cols-9 gap-3 pb-3 border-b border-slate-800 mb-2">
                                <span className="text-xs text-slate-500 col-span-2"></span>
                                <span className="text-xs text-slate-500">Market cap</span>
                                <span className="text-xs text-slate-500">Price</span>
                                <span className="text-xs text-slate-500">Change</span>
                                <span className="text-xs text-slate-500">Volume</span>
                                <span className="text-xs text-slate-500">Rel Volume</span>
                                <span className="text-xs text-slate-500">P/E</span>
                                <span className="text-xs text-slate-500">Sector</span>
                            </div>
                            
                            {marketsData.map((stock, i) => (
                                <div key={i} className="grid grid-cols-9 gap-3 py-3 items-center hover:bg-slate-800/30 rounded-lg transition-colors">
                                    <div className="flex items-center gap-3 col-span-2">
                                        <div className="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center text-lg">
                                            {stock.logo}
                                        </div>
                                        <div>
                                            <p className="text-white text-sm font-medium">{stock.symbol}</p>
                                            <p className="text-slate-500 text-[10px]">{stock.name}</p>
                                        </div>
                                    </div>
                                    <span className="text-white text-sm">{stock.marketCap}</span>
                                    <span className="text-white text-sm">${stock.price}</span>
                                    <span className={`text-sm ${stock.change >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                        {stock.change >= 0 ? '+' : ''}{stock.change}%
                                    </span>
                                    <span className="text-white text-sm">{stock.volume}</span>
                                    <span className="text-white text-sm">{stock.relVolume}</span>
                                    <span className="text-white text-sm">{stock.pe}</span>
                                    <div className="flex items-center gap-2">
                                        <span className="text-emerald-400 text-xs">{stock.sector}</span>
                                        <span className="bg-emerald-600 text-white text-[10px] px-2.5 py-1 rounded-full font-medium">
                                            {stock.rating}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </MagicCard>
                    </div>
                </MagicGrid>
            </div>
        </DashboardLayout>
    )
}
