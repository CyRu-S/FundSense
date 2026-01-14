import { DashboardLayout } from '@/components/common/DashboardLayout'
import { MagicCard, MagicGrid } from '@/components/react-bits/MagicCard'
import { ArrowUpRight, ArrowDownRight, Send, Download, RefreshCw, Filter, MoreHorizontal, CheckCircle } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid } from 'recharts'
import { Button } from '@/components/common/button'

// Mock Data - Transactions History
const transactionHistoryData = [
    { month: 'Jan', income: 15000, expense: 12000 },
    { month: 'Feb', income: 18000, expense: 14000 },
    { month: 'Mar', income: 22000, expense: 16000 },
    { month: 'Apr', income: 25000, expense: 18000 },
    { month: 'May', income: 32000, expense: 22000 },
    { month: 'Jun', income: 28000, expense: 25000 },
    { month: 'Jul', income: 24000, expense: 20000 },
    { month: 'Aug', income: 26000, expense: 18000 },
    { month: 'Sep', income: 30000, expense: 22000 },
    { month: 'Oct', income: 28000, expense: 24000 },
    { month: 'Nov', income: 32000, expense: 26000 },
    { month: 'Dec', income: 35000, expense: 28000 },
]

// Recent Activity
const recentActivity = [
    { type: 'Received', amount: '+$1,982', method: 'Credit Card', methodDetail: '•••• 8126', status: 'Success', person: 'Mikolin Slavana', date: 'July 24, 2024 - 12:00 PM' },
    { type: 'Sent', amount: '-$1,962', method: 'Stripe', methodDetail: '@alexander', status: 'Success', person: 'Ann Baker', date: 'July 24, 2024 - 12:00 PM' },
    { type: 'Received', amount: '+$3,450', method: 'Bank Transfer', methodDetail: '•••• 4521', status: 'Success', person: 'John Davis', date: 'July 23, 2024 - 3:45 PM' },
    { type: 'Sent', amount: '-$890', method: 'PayPal', methodDetail: '@business', status: 'Success', person: 'Sarah Wilson', date: 'July 23, 2024 - 11:20 AM' },
]

export const PaymentsPage = () => {
    return (
        <DashboardLayout>
            <div className="max-w-[1600px] mx-auto min-h-[calc(100vh-4rem)] flex flex-col">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-xl font-semibold text-white mb-1">Welcome Back, Alexander!</h1>
                        <p className="text-sm text-slate-400">All general information appears in this page.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                            <span>Last 7 Days</span>
                            <span className="text-slate-600">|</span>
                            <span>1 Jun - 2 Jun 2024</span>
                        </div>
                        <Button variant="outline" className="h-9 px-4 text-xs border-slate-700 text-slate-300 hover:bg-slate-800">
                            <Download className="w-4 h-4 mr-2" />
                            Export
                        </Button>
                    </div>
                </div>

                {/* Total Balance Card - BLUE */}
                <MagicCard 
                    className="bg-gradient-to-r from-blue-600 to-blue-700 p-6 rounded-2xl mb-6 relative overflow-hidden"
                    glowColor="59, 130, 246"
                    enableStars={true}
                    enableTilt={false}
                >
                    <div className="flex justify-between items-center relative z-10">
                        <div>
                            <p className="text-blue-100 text-sm mb-1">Total Balance</p>
                            <h2 className="text-4xl font-bold text-white mb-2">$145,379.00</h2>
                            <p className="text-blue-100 text-sm">
                                Your balance has grown by <span className="text-white font-semibold">$2,901</span> this month
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Button className="bg-white text-blue-700 hover:bg-blue-50 h-9 px-4 text-xs font-medium rounded-lg">
                                <Send className="w-4 h-4 mr-1.5" />
                                Send
                            </Button>
                            <Button className="bg-white/20 text-white hover:bg-white/30 h-9 px-4 text-xs font-medium rounded-lg border border-white/20">
                                <Download className="w-4 h-4 mr-1.5" />
                                Request
                            </Button>
                            <Button className="bg-white/20 text-white hover:bg-white/30 h-9 px-4 text-xs font-medium rounded-lg border border-white/20">
                                <RefreshCw className="w-4 h-4 mr-1.5" />
                                Convert
                            </Button>
                            <Button size="icon" className="bg-white/20 text-white hover:bg-white/30 h-9 w-9 rounded-lg border border-white/20">
                                <MoreHorizontal className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </MagicCard>

                {/* Stats Cards Row - 3 columns */}
                <MagicGrid className="grid grid-cols-3 gap-4 mb-6">
                    {/* Total Income */}
                    <MagicCard 
                        className="glass-card p-5 rounded-xl border border-white/10"
                        glowColor="59, 130, 246"
                        enableStars={true}
                        enableTilt={false}
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center">
                                    <ArrowDownRight className="w-4 h-4 text-blue-500" />
                                </div>
                                <span className="text-slate-400 text-sm">Total Income</span>
                            </div>
                            <span className="text-slate-500 text-xs cursor-pointer hover:text-white">View more</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-2xl font-bold text-white">$28,982.00</h3>
                            <span className="text-blue-400 text-sm font-medium flex items-center">
                                20.0% <ArrowUpRight className="w-3.5 h-3.5" />
                            </span>
                        </div>
                        <p className="text-slate-500 text-sm mt-1">vs 2,293.00 last month</p>
                    </MagicCard>

                    {/* Total Expense */}
                    <MagicCard 
                        className="glass-card p-5 rounded-xl border border-white/10"
                        glowColor="59, 130, 246"
                        enableStars={true}
                        enableTilt={false}
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-red-500/20 flex items-center justify-center">
                                    <ArrowUpRight className="w-4 h-4 text-red-500" />
                                </div>
                                <span className="text-slate-400 text-sm">Total Expense</span>
                            </div>
                            <span className="text-slate-500 text-xs cursor-pointer hover:text-white">View more</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-2xl font-bold text-white">$29,249.00</h3>
                            <span className="text-red-400 text-sm font-medium flex items-center">
                                20.0% <ArrowUpRight className="w-3.5 h-3.5" />
                            </span>
                        </div>
                        <p className="text-slate-500 text-sm mt-1">vs 2,293.00 last month</p>
                    </MagicCard>

                    {/* Total Saving */}
                    <MagicCard 
                        className="glass-card p-5 rounded-xl border border-white/10"
                        glowColor="59, 130, 246"
                        enableStars={true}
                        enableTilt={false}
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div className="flex items-center gap-2">
                                <div className="w-7 h-7 rounded-full bg-blue-500/20 flex items-center justify-center">
                                    <ArrowDownRight className="w-4 h-4 text-blue-500" />
                                </div>
                                <span className="text-slate-400 text-sm">Total Saving</span>
                            </div>
                            <span className="text-slate-500 text-xs cursor-pointer hover:text-white">View more</span>
                        </div>
                        <div className="flex items-baseline gap-2">
                            <h3 className="text-2xl font-bold text-white">$15,340.00</h3>
                            <span className="text-blue-400 text-sm font-medium flex items-center">
                                20.0% <ArrowUpRight className="w-3.5 h-3.5" />
                            </span>
                        </div>
                        <p className="text-slate-500 text-sm mt-1">vs 2,293.00 last month</p>
                    </MagicCard>
                </MagicGrid>

                {/* Main Content Grid - Transaction History (left) + Cash Flow (right) */}
                <div className="grid grid-cols-12 gap-6 mb-6 flex-1">
                    
                    {/* Transaction History - Left Side */}
                    <div className="col-span-8">
                        <MagicCard 
                            className="glass-card p-6 rounded-xl border border-white/10 h-full"
                            glowColor="59, 130, 246"
                            enableStars={true}
                            enableTilt={false}
                        >
                            <div className="flex justify-between items-center mb-4">
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-0.5">Transactions History</h3>
                                    <p className="text-slate-500 text-sm">All general information appears in this page.</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="flex bg-slate-800 rounded-lg p-0.5">
                                        {['1W', '1M', '6M', '1Y'].map((period) => (
                                            <button 
                                                key={period}
                                                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                                                    period === '1Y' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
                                                }`}
                                            >
                                                {period}
                                            </button>
                                        ))}
                                    </div>
                                    <Button variant="outline" className="h-8 px-4 text-sm border-slate-700 text-slate-400 hover:text-white">
                                        <Filter className="w-4 h-4 mr-1.5" />
                                        Filter
                                    </Button>
                                </div>
                            </div>

                            <div className="h-56">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={transactionHistoryData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                        <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(v) => `${v/1000}K`} />
                                        <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }} />
                                        <Line type="monotone" dataKey="income" name="Income" stroke="#3b82f6" strokeWidth={2.5} dot={false} />
                                        <Line type="monotone" dataKey="expense" name="Expense" stroke="#ef4444" strokeWidth={2.5} dot={false} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>

                            <div className="flex items-center gap-8 mt-4 justify-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-500" />
                                    <span className="text-sm text-slate-400">Income</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <span className="text-sm text-slate-400">Expense</span>
                                </div>
                            </div>
                        </MagicCard>
                    </div>

                    {/* Cash Flow - Right Side (Tall) */}
                    <div className="col-span-4">
                        <MagicCard 
                            className="glass-card p-6 rounded-xl border border-white/10 h-full flex flex-col"
                            glowColor="59, 130, 246"
                            enableStars={true}
                            enableTilt={false}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <span className="text-slate-400 text-sm font-medium">Cash Flow</span>
                                <span className="text-slate-500 text-xs cursor-pointer hover:text-white">View more</span>
                            </div>
                            
                            {/* Total */}
                            <h3 className="text-3xl font-bold text-white mb-2">$95,193.00</h3>
                            <p className="text-slate-500 text-sm mb-6">vs 2,293.00 last month</p>

                            {/* Money In - GREEN */}
                            <div className="bg-emerald-600/20 p-4 rounded-xl border border-emerald-500/20 mb-4">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h4 className="text-xl font-bold text-white">$95,193.00</h4>
                                        <p className="text-slate-400 text-xs mt-0.5">vs 2,293.00 last month</p>
                                    </div>
                                    <span className="text-emerald-400 text-sm font-medium">80% money in</span>
                                </div>
                                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '80%' }} />
                                </div>
                            </div>

                            {/* Money Out - RED */}
                            <div className="bg-red-600/10 p-4 rounded-xl border border-red-500/20 flex-1">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <h4 className="text-xl font-bold text-white">$95,193.00</h4>
                                        <p className="text-slate-400 text-xs mt-0.5">vs 2,293.00 last month</p>
                                    </div>
                                    <span className="text-red-400 text-sm font-medium">40% money out</span>
                                </div>
                                <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden flex gap-0.5">
                                    {Array.from({ length: 20 }).map((_, i) => (
                                        <div key={i} className={`flex-1 h-full rounded-sm ${i < 8 ? 'bg-red-500' : 'bg-slate-700'}`} />
                                    ))}
                                </div>
                            </div>
                        </MagicCard>
                    </div>
                </div>

                {/* Recent Activity Table - FULL WIDTH */}
                <MagicCard 
                    className="glass-card p-6 rounded-xl border border-white/10"
                    glowColor="59, 130, 246"
                    enableStars={true}
                    enableTilt={false}
                >
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="text-lg font-semibold text-white">Recent Activity</h3>
                        <div className="flex items-center gap-3">
                            <div className="flex bg-slate-800 rounded-lg p-0.5">
                                {['1W', '1M', '6M', '1Y'].map((period) => (
                                    <button key={period} className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${period === '1W' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}>
                                        {period}
                                    </button>
                                ))}
                            </div>
                            <Button variant="outline" className="h-8 px-4 text-sm border-slate-700 text-slate-400 hover:text-white">
                                <Filter className="w-4 h-4 mr-1.5" />
                                Filter
                            </Button>
                        </div>
                    </div>

                    {/* Table Header */}
                    <div className="grid grid-cols-6 gap-4 pb-3 border-b border-slate-800 mb-2">
                        <span className="text-sm text-slate-500 font-medium">Type</span>
                        <span className="text-sm text-slate-500 font-medium">Amount</span>
                        <span className="text-sm text-slate-500 font-medium">Payment Method</span>
                        <span className="text-sm text-slate-500 font-medium">Status</span>
                        <span className="text-sm text-slate-500 font-medium">People</span>
                        <span className="text-sm text-slate-500 font-medium">Date</span>
                    </div>

                    {/* Table Rows */}
                    {recentActivity.map((activity, i) => (
                        <div key={i} className="grid grid-cols-6 gap-4 py-4 items-center hover:bg-slate-800/30 rounded-lg transition-colors">
                            <div className="flex items-center gap-3">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${activity.type === 'Received' ? 'bg-blue-500/20' : 'bg-red-500/20'}`}>
                                    {activity.type === 'Received' ? <ArrowDownRight className="w-4 h-4 text-blue-500" /> : <ArrowUpRight className="w-4 h-4 text-red-500" />}
                                </div>
                                <span className="text-base text-white font-medium">{activity.type}</span>
                            </div>
                            <span className={`text-base font-semibold ${activity.type === 'Received' ? 'text-blue-400' : 'text-red-400'}`}>{activity.amount}</span>
                            <div>
                                <p className="text-base text-white">{activity.method}</p>
                                <p className="text-sm text-slate-500">{activity.methodDetail}</p>
                            </div>
                            <span className="inline-flex items-center gap-1.5 text-sm text-blue-400 bg-blue-500/10 px-3 py-1.5 rounded-full w-fit">
                                <CheckCircle className="w-4 h-4" />
                                {activity.status}
                            </span>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-700 overflow-hidden">
                                    <img src={`https://ui-avatars.com/api/?name=${activity.person}&background=374151&color=fff&size=32`} alt={activity.person} className="w-full h-full" />
                                </div>
                                <span className="text-base text-white">{activity.person}</span>
                            </div>
                            <span className="text-sm text-slate-400">{activity.date}</span>
                        </div>
                    ))}
                </MagicCard>
            </div>
        </DashboardLayout>
    )
}
