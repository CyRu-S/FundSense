import { DashboardLayout } from '@/components/common/DashboardLayout'
import { MagicCard } from '@/components/react-bits/MagicCard'
import {
    TrendingUp, TrendingDown, DollarSign, Activity, CreditCard,
    ArrowUpRight, ArrowDownLeft, Wallet, Send, MoreHorizontal, Bell, Search
} from 'lucide-react'
import { Button } from '@/components/common/button'
import { Input } from '@/components/common/input'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

export function DashboardPage() {
    // Mock Data for Charts
    const cashflowData = [
        { name: 'Jan', income: 4000, expense: 2400 },
        { name: 'Feb', income: 3000, expense: 1398 },
        { name: 'Mar', income: 2000, expense: 9800 },
        { name: 'Apr', income: 2780, expense: 3908 },
        { name: 'May', income: 1890, expense: 4800 },
        { name: 'Jun', income: 2390, expense: 3800 },
        { name: 'Jul', income: 3490, expense: 4300 },
    ]

    const expenseData = [
        { name: 'Rent', value: 3500, color: '#10b981' }, // emerald-500
        { name: 'Food', value: 1200, color: '#3b82f6' }, // blue-500
        { name: 'Transport', value: 800, color: '#f59e0b' }, // amber-500
        { name: 'Ent.', value: 500, color: '#ec4899' }, // pink-500
    ]

    const transactions = [
        { id: 1, name: 'Netflix Subscription', date: '2023-11-20', amount: -15.99, type: 'expense', icon: 'N' },
        { id: 2, name: 'Salary Deposit', date: '2023-11-19', amount: 4250.00, type: 'income', icon: 'S' },
        { id: 3, name: 'Uber Ride', date: '2023-11-18', amount: -24.50, type: 'expense', icon: 'U' },
        { id: 4, name: 'Spotify Premium', date: '2023-11-17', amount: -9.99, type: 'expense', icon: 'S' },
    ]

    return (
        <DashboardLayout>
            <div className="space-y-6 max-w-[1600px] mx-auto">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-white tracking-tight">Dashboard</h1>
                        <p className="text-muted-foreground">Overview of your financial performance</p>
                    </div>
                    
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input 
                                placeholder="Search..." 
                                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:border-primary/50" 
                            />
                        </div>
                        <Button size="icon" variant="ghost" className="bg-white/5 hover:bg-white/10 text-white border border-white/10">
                            <Bell className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                {/* Main Grid Layout */}
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                    
                    {/* Left Column (2/3 width on large screens) */}
                    <div className="xl:col-span-2 space-y-6">
                        
                        {/* Top Widgets Row: Card + Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            
                            {/* Credit Card Visual */}
                            <MagicCard className="glass-card p-6 rounded-2xl md:col-span-1 lg:col-span-1 relative overflow-hidden flex flex-col justify-between h-[220px]" glowColor="16, 185, 129" enableStars={true} enableTilt={false}>
                                <div className="absolute top-0 right-0 p-3 opacity-20">
                                    <Activity className="w-32 h-32 text-white -rotate-12 translate-x-8 -translate-y-8" />
                                </div>
                                <div className="relative z-10 flex justify-between items-start">
                                    <div>
                                        <p className="text-white/60 text-sm font-medium">Total Balance</p>
                                        <h2 className="text-3xl font-bold text-white mt-1">$562,000</h2>
                                    </div>
                                    <Wallet className="w-6 h-6 text-emerald-400" />
                                </div>
                                <div className="relative z-10">
                                    <div className="flex gap-4 mb-4">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-white/50 uppercase tracking-wider">Card Holder</span>
                                            <span className="text-white font-medium">Andrew Forbist</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[10px] text-white/50 uppercase tracking-wider">Expires</span>
                                            <span className="text-white font-medium">11/29</span>
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-2">
                                         <p className="text-lg font-mono text-white/80 tracking-widest">**** **** **** 4298</p>
                                         <div className="flex gap-1">
                                             <div className="w-6 h-4 bg-white/20 rounded-sm"></div>
                                             <div className="w-6 h-4 bg-white/20 rounded-sm"></div>
                                         </div>
                                    </div>
                                </div>
                            </MagicCard>

                            {/* Stats Cards */}
                            <div className="md:col-span-1 lg:col-span-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <MagicCard className="glass-card p-4 rounded-xl flex flex-col justify-center" glowColor="34, 197, 94" enableStars={true} enableTilt={false}>
                                    <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mb-3 text-green-500">
                                        <ArrowUpRight className="w-5 h-5" />
                                    </div>
                                    <p className="text-muted-foreground text-xs font-medium uppercase">Total Income</p>
                                    <h3 className="text-xl font-bold text-white mt-1">$78,000</h3>
                                    <span className="text-xs text-green-500 font-medium flex items-center mt-2">
                                        +12% <span className="text-white/30 ml-1">vs last month</span>
                                    </span>
                                </MagicCard>

                                <MagicCard className="glass-card p-4 rounded-xl flex flex-col justify-center" glowColor="239, 68, 68" enableStars={true} enableTilt={false}>
                                    <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center mb-3 text-red-500">
                                        <ArrowDownLeft className="w-5 h-5" />
                                    </div>
                                    <p className="text-muted-foreground text-xs font-medium uppercase">Total Expense</p>
                                    <h3 className="text-xl font-bold text-white mt-1">$43,000</h3>
                                    <span className="text-xs text-red-500 font-medium flex items-center mt-2">
                                        -5% <span className="text-white/30 ml-1">vs last month</span>
                                    </span>
                                </MagicCard>

                                <MagicCard className="glass-card p-4 rounded-xl flex flex-col justify-center" glowColor="59, 130, 246" enableStars={true} enableTilt={false}>
                                    <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mb-3 text-blue-500">
                                        <Wallet className="w-5 h-5" />
                                    </div>
                                    <p className="text-muted-foreground text-xs font-medium uppercase">Total Savings</p>
                                    <h3 className="text-xl font-bold text-white mt-1">$56,000</h3>
                                    <span className="text-xs text-blue-500 font-medium flex items-center mt-2">
                                        +8% <span className="text-white/30 ml-1">vs last month</span>
                                    </span>
                                </MagicCard>
                            </div>
                        </div>

                        {/* Cashflow Chart Section */}
                        <MagicCard className="glass-card p-6 rounded-2xl min-h-[400px]" glowColor="168, 85, 247" enableStars={true} enableTilt={false}>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold text-white">Cashflow Analysis</h3>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <div className="w-2 h-2 rounded-full bg-primary" /> Income
                                    </div>
                                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                        <div className="w-2 h-2 rounded-full bg-slate-600" /> Expense
                                    </div>
                                </div>
                            </div>
                            <div className="h-[300px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={cashflowData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                        <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12 }} />
                                        <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value}`} />
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                            cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                        />
                                        <Bar dataKey="income" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} maxBarSize={40} />
                                        <Bar dataKey="expense" fill="rgba(255,255,255,0.2)" radius={[4, 4, 0, 0]} maxBarSize={40} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </MagicCard>

                        {/* Recent Transactions List */}
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <MagicCard className="glass-card p-6 rounded-2xl" glowColor="236, 72, 153" enableStars={true} enableTilt={false}>
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
                                    <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-white">View All</Button>
                                </div>
                                <div className="space-y-4">
                                    {transactions.map(tx => (
                                        <div key={tx.id} className="flex items-center justify-between group p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
                                            <div className="flex items-center gap-3 relative">
                                                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold ${tx.type === 'income' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                                    {tx.icon}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-white group-hover:text-primary transition-colors">{tx.name}</p>
                                                    <p className="text-xs text-muted-foreground">{tx.date}</p>
                                                </div>
                                            </div>
                                            <span className={`text-sm font-semibold ${tx.type === 'income' ? 'text-green-500' : 'text-white'}`}>
                                                {tx.amount > 0 ? '+' : ''}{tx.amount}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </MagicCard>

                            {/* Quick Transfer Widget */}
                             <MagicCard className="glass-card p-6 rounded-2xl" glowColor="245, 158, 11" enableStars={true} enableTilt={false}>
                                <h3 className="text-lg font-semibold text-white mb-6">Quick Transfer</h3>
                                <div className="flex gap-4 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                                    {['Alex', 'Sarah', 'Mike', 'Lisa'].map((person, i) => (
                                        <div key={i} className="flex flex-col items-center gap-2 cursor-pointer group min-w-[60px]">
                                            <div className="w-12 h-12 rounded-full bg-white/10 border border-white/5 flex items-center justify-center text-lg font-bold text-white group-hover:bg-primary group-hover:border-primary transition-all">
                                                {person[0]}
                                            </div>
                                            <span className="text-xs text-muted-foreground group-hover:text-white transition-colors">{person}</span>
                                        </div>
                                    ))}
                                    <div className="flex flex-col items-center gap-2 cursor-pointer group min-w-[60px]">
                                        <div className="w-12 h-12 rounded-full border border-dashed border-white/20 flex items-center justify-center text-white/50 hover:border-primary hover:text-primary transition-all">
                                            +
                                        </div>
                                        <span className="text-xs text-muted-foreground">Add</span>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                     <div className="relative">
                                         <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                         <Input type="number" placeholder="0.00" className="pl-8 bg-black/20 border-white/10 text-white" />
                                     </div>
                                     <Button className="w-full bg-primary hover:bg-primary/90 text-white">Send Money</Button>
                                </div>
                            </MagicCard>
                         </div>

                    </div>

                    {/* Right Column (1/3 width on large screens) */}
                    <div className="space-y-6">
                        {/* Statistics Pie Chart */}
                        <MagicCard className="glass-card p-6 rounded-2xl min-h-[350px]" glowColor="14, 165, 233" enableStars={true} enableTilt={false}>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold text-white">Expense Stats</h3>
                                <select className="bg-transparent border-none text-xs text-muted-foreground focus:ring-0 cursor-pointer">
                                    <option>This Month</option>
                                    <option>Last Month</option>
                                </select>
                            </div>
                            <div className="h-[250px] w-full relative">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={expenseData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {expenseData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} stroke="rgba(0,0,0,0.5)" strokeWidth={2} />
                                            ))}
                                        </Pie>
                                        <Tooltip 
                                            contentStyle={{ backgroundColor: '#000', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-2xl font-bold text-white">$3,500</span>
                                    <span className="text-xs text-muted-foreground">Total</span>
                                </div>
                            </div>
                            <div className="space-y-3 mt-4">
                                {expenseData.map((item, i) => (
                                    <div key={i} className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                                            <span className="text-muted-foreground">{item.name}</span>
                                        </div>
                                        <span className="font-medium text-white">${item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </MagicCard>

                        {/* Saving Plans */}
                         <MagicCard className="glass-card p-6 rounded-2xl" glowColor="139, 92, 246" enableStars={true} enableTilt={false}>

                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-lg font-semibold text-white">Saving Plans</h3>
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-muted-foreground hover:text-white">
                                    +
                                </Button>
                            </div>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-white font-medium">New Car</span>
                                        <span className="text-muted-foreground">$15k / $20k</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-blue-500 w-[75%] rounded-full" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-white font-medium">Emergency Fund</span>
                                        <span className="text-muted-foreground">$2k / $10k</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-emerald-500 w-[20%] rounded-full" />
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-sm mb-2">
                                        <span className="text-white font-medium">Vacation</span>
                                        <span className="text-muted-foreground">$4k / $5k</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                        <div className="h-full bg-purple-500 w-[80%] rounded-full" />
                                    </div>
                                </div>
                            </div>
                        </MagicCard>
                    </div>

                </div>
            </div>
        </DashboardLayout>
    )
}
