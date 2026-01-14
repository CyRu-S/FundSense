import { useState } from 'react'
import { DashboardLayout } from '@/components/common/DashboardLayout'
import { MagicCard, MagicGrid } from '@/components/react-bits/MagicCard'
import { Search, Filter, ChevronDown, Star, TrendingUp, TrendingDown, ArrowUpRight, BarChart3, PieChart, Wallet, Shield, Leaf, Building2, X, Plus, Check } from 'lucide-react'
import { Button } from '@/components/common/button'
import { LineChart, Line, ResponsiveContainer } from 'recharts'

// Fund Categories
const categories = [
    { id: 'all', name: 'All Funds', icon: BarChart3 },
    { id: 'equity', name: 'Equity', icon: TrendingUp },
    { id: 'debt', name: 'Debt', icon: Shield },
    { id: 'hybrid', name: 'Hybrid', icon: PieChart },
    { id: 'elss', name: 'ELSS (Tax Saver)', icon: Leaf },
    { id: 'index', name: 'Index Funds', icon: BarChart3 },
]

// Risk Levels
const riskLevels = ['Low', 'Moderate', 'High', 'Very High']

// Fund Houses
const fundHouses = ['HDFC', 'ICICI Prudential', 'SBI', 'Axis', 'Kotak', 'Nippon India', 'Mirae Asset', 'UTI']

// Mock Fund Data
const fundsData = [
    {
        id: 1,
        name: 'HDFC Mid-Cap Opportunities Fund',
        house: 'HDFC',
        category: 'equity',
        subcategory: 'Mid Cap',
        risk: 'Very High',
        rating: 5,
        nav: 142.35,
        aum: '₹45,230 Cr',
        expenseRatio: '1.68%',
        returns: { y1: 28.5, y3: 22.4, y5: 18.7 },
        minSIP: 500,
        chartData: [{ v: 30 }, { v: 45 }, { v: 38 }, { v: 52 }, { v: 48 }, { v: 65 }, { v: 58 }, { v: 72 }],
    },
    {
        id: 2,
        name: 'ICICI Prudential Bluechip Fund',
        house: 'ICICI Prudential',
        category: 'equity',
        subcategory: 'Large Cap',
        risk: 'High',
        rating: 4,
        nav: 78.92,
        aum: '₹38,450 Cr',
        expenseRatio: '1.82%',
        returns: { y1: 18.2, y3: 15.6, y5: 14.2 },
        minSIP: 100,
        chartData: [{ v: 40 }, { v: 42 }, { v: 48 }, { v: 45 }, { v: 52 }, { v: 58 }, { v: 55 }, { v: 62 }],
    },
    {
        id: 3,
        name: 'SBI Small Cap Fund',
        house: 'SBI',
        category: 'equity',
        subcategory: 'Small Cap',
        risk: 'Very High',
        rating: 5,
        nav: 156.78,
        aum: '₹22,180 Cr',
        expenseRatio: '1.72%',
        returns: { y1: 42.3, y3: 28.9, y5: 24.1 },
        minSIP: 500,
        chartData: [{ v: 25 }, { v: 35 }, { v: 28 }, { v: 48 }, { v: 42 }, { v: 68 }, { v: 55 }, { v: 78 }],
    },
    {
        id: 4,
        name: 'Axis Liquid Fund',
        house: 'Axis',
        category: 'debt',
        subcategory: 'Liquid',
        risk: 'Low',
        rating: 4,
        nav: 2456.32,
        aum: '₹35,890 Cr',
        expenseRatio: '0.20%',
        returns: { y1: 6.8, y3: 5.9, y5: 5.4 },
        minSIP: 1000,
        chartData: [{ v: 50 }, { v: 51 }, { v: 52 }, { v: 52 }, { v: 53 }, { v: 54 }, { v: 54 }, { v: 55 }],
    },
    {
        id: 5,
        name: 'Mirae Asset Tax Saver Fund',
        house: 'Mirae Asset',
        category: 'elss',
        subcategory: 'ELSS',
        risk: 'High',
        rating: 5,
        nav: 42.15,
        aum: '₹18,920 Cr',
        expenseRatio: '1.58%',
        returns: { y1: 24.6, y3: 19.8, y5: 17.2 },
        minSIP: 500,
        chartData: [{ v: 35 }, { v: 42 }, { v: 38 }, { v: 55 }, { v: 48 }, { v: 62 }, { v: 58 }, { v: 68 }],
    },
    {
        id: 6,
        name: 'HDFC Balanced Advantage Fund',
        house: 'HDFC',
        category: 'hybrid',
        subcategory: 'Balanced',
        risk: 'Moderate',
        rating: 4,
        nav: 382.45,
        aum: '₹62,340 Cr',
        expenseRatio: '1.52%',
        returns: { y1: 15.8, y3: 13.2, y5: 12.8 },
        minSIP: 100,
        chartData: [{ v: 45 }, { v: 48 }, { v: 52 }, { v: 50 }, { v: 55 }, { v: 58 }, { v: 56 }, { v: 60 }],
    },
    {
        id: 7,
        name: 'UTI Nifty 50 Index Fund',
        house: 'UTI',
        category: 'index',
        subcategory: 'Index',
        risk: 'High',
        rating: 4,
        nav: 142.80,
        aum: '₹12,450 Cr',
        expenseRatio: '0.20%',
        returns: { y1: 16.2, y3: 14.8, y5: 13.5 },
        minSIP: 500,
        chartData: [{ v: 42 }, { v: 45 }, { v: 48 }, { v: 46 }, { v: 52 }, { v: 55 }, { v: 53 }, { v: 58 }],
    },
    {
        id: 8,
        name: 'Kotak Corporate Bond Fund',
        house: 'Kotak',
        category: 'debt',
        subcategory: 'Corporate Bond',
        risk: 'Moderate',
        rating: 4,
        nav: 3245.67,
        aum: '₹14,780 Cr',
        expenseRatio: '0.45%',
        returns: { y1: 8.2, y3: 7.5, y5: 7.8 },
        minSIP: 1000,
        chartData: [{ v: 48 }, { v: 50 }, { v: 52 }, { v: 51 }, { v: 54 }, { v: 55 }, { v: 56 }, { v: 58 }],
    },
]

export const FundExplorerPage = () => {
    const [selectedCategory, setSelectedCategory] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedRisk, setSelectedRisk] = useState<string[]>([])
    const [selectedHouses, setSelectedHouses] = useState<string[]>([])
    const [sortBy, setSortBy] = useState('returns')
    const [compareList, setCompareList] = useState<number[]>([])
    const [showFilters, setShowFilters] = useState(false)

    // Filter funds
    const filteredFunds = fundsData.filter(fund => {
        if (selectedCategory !== 'all' && fund.category !== selectedCategory) return false
        if (searchQuery && !fund.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
        if (selectedRisk.length > 0 && !selectedRisk.includes(fund.risk)) return false
        if (selectedHouses.length > 0 && !selectedHouses.includes(fund.house)) return false
        return true
    })

    // Sort funds
    const sortedFunds = [...filteredFunds].sort((a, b) => {
        if (sortBy === 'returns') return b.returns.y1 - a.returns.y1
        if (sortBy === 'rating') return b.rating - a.rating
        if (sortBy === 'aum') return parseFloat(b.aum.replace(/[^\d.]/g, '')) - parseFloat(a.aum.replace(/[^\d.]/g, ''))
        return 0
    })

    const toggleCompare = (fundId: number) => {
        if (compareList.includes(fundId)) {
            setCompareList(compareList.filter(id => id !== fundId))
        } else if (compareList.length < 3) {
            setCompareList([...compareList, fundId])
        }
    }

    const getRiskColor = (risk: string) => {
        switch (risk) {
            case 'Low': return 'text-emerald-400 bg-emerald-500/20'
            case 'Moderate': return 'text-yellow-400 bg-yellow-500/20'
            case 'High': return 'text-orange-400 bg-orange-500/20'
            case 'Very High': return 'text-red-400 bg-red-500/20'
            default: return 'text-slate-400 bg-slate-500/20'
        }
    }

    return (
        <DashboardLayout>
            <div className="max-w-[1600px] mx-auto min-h-[calc(100vh-4rem)]">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Fund Explorer</h1>
                        <p className="text-sm text-slate-400">Discover and compare mutual funds across categories</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="text-sm text-slate-400">{sortedFunds.length} funds found</span>
                    </div>
                </div>

                {/* Search & Filter Bar */}
                <MagicCard 
                    className="glass-card p-4 rounded-xl border border-white/10 mb-6"
                    glowColor="59, 130, 246"
                    enableStars={false}
                    enableTilt={false}
                >
                    <div className="flex items-center gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input 
                                type="text"
                                placeholder="Search funds by name, category, or fund house..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full bg-slate-800/50 border border-white/10 rounded-lg pl-10 pr-4 py-2.5 text-white placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            />
                        </div>

                        {/* Filter Toggle */}
                        <Button 
                            variant="outline" 
                            className={`h-10 px-4 border-slate-700 text-slate-300 hover:bg-slate-800 ${showFilters ? 'bg-blue-600/20 border-blue-500/50 text-blue-400' : ''}`}
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <Filter className="w-4 h-4 mr-2" />
                            Filters
                            {(selectedRisk.length > 0 || selectedHouses.length > 0) && (
                                <span className="ml-2 w-5 h-5 rounded-full bg-blue-500 text-white text-xs flex items-center justify-center">
                                    {selectedRisk.length + selectedHouses.length}
                                </span>
                            )}
                        </Button>

                        {/* Sort */}
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-slate-400">Sort by:</span>
                            <select 
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="bg-slate-800/50 border border-white/10 rounded-lg px-3 py-2 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                            >
                                <option value="returns">1Y Returns</option>
                                <option value="rating">Rating</option>
                                <option value="aum">AUM</option>
                            </select>
                        </div>
                    </div>

                    {/* Expanded Filters */}
                    {showFilters && (
                        <div className="mt-4 pt-4 border-t border-slate-800 grid grid-cols-2 gap-6">
                            {/* Risk Level */}
                            <div>
                                <p className="text-sm font-medium text-slate-300 mb-3">Risk Level</p>
                                <div className="flex flex-wrap gap-2">
                                    {riskLevels.map(risk => (
                                        <button
                                            key={risk}
                                            onClick={() => setSelectedRisk(
                                                selectedRisk.includes(risk) 
                                                    ? selectedRisk.filter(r => r !== risk)
                                                    : [...selectedRisk, risk]
                                            )}
                                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                                selectedRisk.includes(risk)
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-slate-800 text-slate-400 hover:text-white'
                                            }`}
                                        >
                                            {risk}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Fund House */}
                            <div>
                                <p className="text-sm font-medium text-slate-300 mb-3">Fund House</p>
                                <div className="flex flex-wrap gap-2">
                                    {fundHouses.map(house => (
                                        <button
                                            key={house}
                                            onClick={() => setSelectedHouses(
                                                selectedHouses.includes(house)
                                                    ? selectedHouses.filter(h => h !== house)
                                                    : [...selectedHouses, house]
                                            )}
                                            className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                                                selectedHouses.includes(house)
                                                    ? 'bg-blue-600 text-white'
                                                    : 'bg-slate-800 text-slate-400 hover:text-white'
                                            }`}
                                        >
                                            {house}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </MagicCard>

                {/* Category Tabs */}
                <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    {categories.map(cat => {
                        const Icon = cat.icon
                        return (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                                    selectedCategory === cat.id
                                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                                        : 'bg-slate-800/50 text-slate-400 hover:text-white hover:bg-slate-800'
                                }`}
                            >
                                <Icon className="w-4 h-4" />
                                {cat.name}
                            </button>
                        )
                    })}
                </div>

                {/* Compare Bar */}
                {compareList.length > 0 && (
                    <MagicCard 
                        className="bg-blue-600/20 border border-blue-500/30 p-4 rounded-xl mb-6"
                        glowColor="59, 130, 246"
                        enableStars={false}
                        enableTilt={false}
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <span className="text-blue-400 font-medium">Compare Funds ({compareList.length}/3)</span>
                                <div className="flex gap-2">
                                    {compareList.map(id => {
                                        const fund = fundsData.find(f => f.id === id)
                                        return fund ? (
                                            <span key={id} className="flex items-center gap-1 bg-slate-800 px-3 py-1 rounded-full text-sm text-white">
                                                {fund.name.split(' ').slice(0, 2).join(' ')}
                                                <X className="w-3 h-3 cursor-pointer hover:text-red-400" onClick={() => toggleCompare(id)} />
                                            </span>
                                        ) : null
                                    })}
                                </div>
                            </div>
                            <Button className="bg-blue-600 hover:bg-blue-700 text-white h-9 px-4 text-sm">
                                Compare Now
                            </Button>
                        </div>
                    </MagicCard>
                )}

                {/* Funds Grid */}
                <MagicGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {sortedFunds.map(fund => (
                        <MagicCard 
                            key={fund.id}
                            className="glass-card p-5 rounded-xl border border-white/10 hover:border-blue-500/30 transition-all cursor-pointer group"
                            glowColor="59, 130, 246"
                            enableStars={true}
                            enableTilt={false}
                        >
                            {/* Header */}
                            <div className="flex justify-between items-start mb-3">
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <Building2 className="w-4 h-4 text-slate-400" />
                                        <span className="text-xs text-slate-400">{fund.house}</span>
                                    </div>
                                    <h3 className="text-sm font-semibold text-white leading-tight group-hover:text-blue-400 transition-colors">
                                        {fund.name}
                                    </h3>
                                </div>
                                <button 
                                    onClick={(e) => { e.stopPropagation(); toggleCompare(fund.id); }}
                                    className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                                        compareList.includes(fund.id) 
                                            ? 'bg-blue-600 text-white' 
                                            : 'bg-slate-800 text-slate-400 hover:text-white'
                                    }`}
                                >
                                    {compareList.includes(fund.id) ? <Check className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                </button>
                            </div>

                            {/* Tags */}
                            <div className="flex items-center gap-2 mb-4">
                                <span className="text-xs px-2 py-0.5 rounded bg-slate-800 text-slate-300">{fund.subcategory}</span>
                                <span className={`text-xs px-2 py-0.5 rounded ${getRiskColor(fund.risk)}`}>{fund.risk}</span>
                            </div>

                            {/* Mini Chart */}
                            <div className="h-12 mb-4">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={fund.chartData}>
                                        <Line 
                                            type="monotone" 
                                            dataKey="v" 
                                            stroke={fund.returns.y1 > 0 ? '#3b82f6' : '#ef4444'} 
                                            strokeWidth={2} 
                                            dot={false} 
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            {/* Returns */}
                            <div className="grid grid-cols-3 gap-2 mb-4">
                                <div className="text-center">
                                    <p className="text-xs text-slate-500 mb-0.5">1Y</p>
                                    <p className={`text-sm font-bold ${fund.returns.y1 > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                        {fund.returns.y1 > 0 ? '+' : ''}{fund.returns.y1}%
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-slate-500 mb-0.5">3Y</p>
                                    <p className={`text-sm font-bold ${fund.returns.y3 > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                        {fund.returns.y3 > 0 ? '+' : ''}{fund.returns.y3}%
                                    </p>
                                </div>
                                <div className="text-center">
                                    <p className="text-xs text-slate-500 mb-0.5">5Y</p>
                                    <p className={`text-sm font-bold ${fund.returns.y5 > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                                        {fund.returns.y5 > 0 ? '+' : ''}{fund.returns.y5}%
                                    </p>
                                </div>
                            </div>

                            {/* Rating & Details */}
                            <div className="flex items-center justify-between text-xs text-slate-400 mb-4">
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <Star key={i} className={`w-3 h-3 ${i < fund.rating ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'}`} />
                                    ))}
                                </div>
                                <span>NAV: ₹{fund.nav}</span>
                            </div>

                            {/* Footer */}
                            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                                <div>
                                    <p className="text-xs text-slate-500">Min SIP</p>
                                    <p className="text-sm font-semibold text-white">₹{fund.minSIP}</p>
                                </div>
                                <Button className="bg-blue-600 hover:bg-blue-700 text-white h-8 px-4 text-xs rounded-lg">
                                    <Wallet className="w-3.5 h-3.5 mr-1.5" />
                                    Invest
                                </Button>
                            </div>
                        </MagicCard>
                    ))}
                </MagicGrid>

                {/* Empty State */}
                {sortedFunds.length === 0 && (
                    <div className="text-center py-16">
                        <Search className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                        <h3 className="text-xl font-semibold text-white mb-2">No funds found</h3>
                        <p className="text-slate-400">Try adjusting your filters or search query</p>
                    </div>
                )}
            </div>
        </DashboardLayout>
    )
}
