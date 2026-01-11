import { DashboardLayout } from '@/components/common/DashboardLayout'
import { MagicCard, MagicGrid } from '@/components/react-bits/MagicCard'
import {
    Plus, ArrowRightLeft, History, Clock, MoreVertical,
    ArrowUpRight, ArrowDownLeft, Wallet, Search, Bell
} from 'lucide-react'
import { Button } from '@/components/common/button'
import { Input } from '@/components/common/input'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

export function DashboardPage() {
    // --- MOCK DATA ---
    const cashflowData = [
        { name: 'Jan', income: 4000, expense: 2400 },
        { name: 'Feb', income: 3000, expense: 1398 },
        { name: 'Mar', income: 2000, expense: 9800 },
        { name: 'Apr', income: 2780, expense: 3908 },
        { name: 'May', income: 1890, expense: 4800 },
        { name: 'Jun', income: 2390, expense: 3800 },
        { name: 'Jul', income: 3490, expense: 4300 },
        { name: 'Aug', income: 4000, expense: 2400 },
        { name: 'Sep', income: 3000, expense: 1398 },
        { name: 'Oct', income: 2000, expense: 9800 },
        { name: 'Nov', income: 2780, expense: 3908 },
        { name: 'Dec', income: 1890, expense: 4800 },
    ]

    const expenseData = [
        { name: 'Rent', value: 3500, color: '#10b981' },
        { name: 'Food', value: 1200, color: '#3b82f6' },
        { name: 'Transport', value: 800, color: '#f59e0b' },
        { name: 'Ent.', value: 500, color: '#ec4899' },
    ]

    const transactions = [
        { id: 1, name: 'Electricity Bill', date: '2026-03-01', time: '04:30 PM', amount: -250.00, status: 'Failed', icon: 'E' },
        { id: 2, name: 'Weekly Groceries', date: '2026-03-01', time: '02:30 PM', amount: -120.50, status: 'Completed', icon: 'W' },
        { id: 3, name: 'Movie Night', date: '2026-02-28', time: '08:00 PM', amount: -65.00, status: 'Pending', icon: 'M' },
        { id: 4, name: 'Medical Check-up', date: '2026-02-27', time: '10:00 AM', amount: -650.00, status: 'Pending', icon: 'M' },
    ]

    const activity = [
        { id: 1, name: 'Jamie Smith', action: 'updated account settings', time: '09:00', img: 'J' },
        { id: 2, name: 'Alex Johnson', action: 'logged in', time: '09:15', img: 'A' },
        { id: 3, name: 'Morgan Lee', action: 'added a new savings goal', time: '10:00', img: 'M' },
        { id: 4, name: 'Taylor Green', action: 'reviewed recent transactions', time: '11:05', img: 'T' },
        { id: 5, name: 'Wilson Baptista', action: 'transferred funds', time: '12:05', img: 'W' },
    ]

    const savingPlans = [
        { name: 'Emergency Fund', current: 5000, target: 10000, color: 'bg-emerald-500' },
        { name: 'Vacation Fund', current: 3000, target: 5000, color: 'bg-blue-500' },
        { name: 'Home Down Payment', current: 7250, target: 20000, color: 'bg-purple-500' },
    ]

    return (
        <DashboardLayout>
            <div className="space-y-6 max-w-[1920px] mx-auto overflow-hidden">
                {/* Header (replicated inside dashboard for layout control) */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                    <h1 className="text-2xl font-bold text-white tracking-tight">Dashboard</h1>
                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="relative w-64">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                                placeholder="Search placeholder"
                                className="pl-10 bg-white/5 border-white/10 text-white rounded-full h-10"
                            />
                        </div>
                        <Button variant="ghost" size="icon" className="rounded-full bg-white/5 text-white hover:bg-white/10">
                            <Bell className="w-5 h-5" />
                        </Button>
                        <div className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                                A
                            </div>
                            <span className="text-sm font-medium text-white hidden md:block">Andrew Forbist</span>
                        </div>
                    </div>
                </div>

                {/* Main Content Grid - PONSTER LAYOUT */}
                <MagicGrid className="grid grid-cols-12 gap-4 pb-10">

                    {/* === LEFT COLUMN (25%) === */}
                    <div className="col-span-12 lg:col-span-3 flex flex-col gap-4 h-full">

                        {/* 1. Credit Card */}
                        <MagicCard className="p-6 rounded-3xl relative overflow-hidden h-[240px] flex flex-col justify-between border-0 shrink-0"
                            style={{ background: 'linear-gradient(135deg, #1e3a8a 0%, #172554 100%)' }}
                            glowColor="59, 130, 246"
                            enableStars={true}
                            enableTilt={false}
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <div className="flex gap-1 mb-4">
                                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                                            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                        </div>
                                        <div className="w-6 h-6 rounded-full bg-blue-500/20 -ml-2 flex items-center justify-center">
                                            <div className="w-3 h-3 rounded-full bg-blue-500/50"></div>
                                        </div>
                                    </div>
                                    <h3 className="text-white font-medium text-lg">Andrew Forbist</h3>
                                </div>
                                <div className="text-white/60">
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M23.5 12a11.5 11.5 0 1 1-23 0 11.5 11.5 0 0 1 23 0z" /><path d="M12 2a10 10 0 0 1 10 10 10 10 0 0 1-10 10 10 10 0 0 1-10-10 10 10 0 0 1 10-10z" opacity="0.5" /></svg>
                                </div>
                            </div>
                            <div>
                                <p className="text-blue-200/60 text-xs mb-1 font-medium">Balance Amount</p>
                                <h2 className="text-3xl font-bold text-white mb-4">$562,000</h2>
                                <div className="flex justify-between text-white/40 text-[10px] font-mono uppercase tracking-widest">
                                    <div className="flex gap-4">
                                        <div className="flex flex-col">
                                            <span>EXP</span>
                                            <span className="text-white">11/29</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span>CVV</span>
                                            <span className="text-white">323</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </MagicCard>

                        {/* 2. Quick Actions */}
                        <div className="flex justify-between px-2 py-2 shrink-0 gap-2">
                            {[
                                { icon: Plus, label: 'Top Up' },
                                { icon: ArrowRightLeft, label: 'Transfer' },
                                { icon: Clock, label: 'Request' },
                                { icon: History, label: 'History' }
                            ].map((action, i) => (
                                <div key={i} className="flex flex-col items-center gap-3 cursor-pointer group">
                                    <div className="w-14 h-14 rounded-full glass-card border border-white/5 flex items-center justify-center text-white/90 hover:bg-white/10 hover:scale-105 transition-all shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                                        <action.icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-[11px] text-muted-foreground font-medium group-hover:text-white transition-colors">{action.label}</span>
                                </div>
                            ))}
                        </div>

                        {/* 3. Daily Limit */}
                        <MagicCard className="glass-card p-6 rounded-2xl border border-white/5 shrink-0" enableStars={true} enableTilt={false}>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-semibold text-white text-sm">Daily Limit</h3>
                                <MoreVertical className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <div className="mb-3">
                                <div className="flex justify-between text-xs mb-2 font-medium">
                                    <span className="text-white">$2,500.00</span>
                                    <span className="text-muted-foreground">Limit $10,000.00</span>
                                </div>
                                <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-emerald-500 to-emerald-400 w-[25%] rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                </div>
                            </div>
                        </MagicCard>

                        {/* 4. Saving Plans */}
                        <MagicCard className="glass-card p-6 rounded-2xl border border-white/5 flex-1" enableStars={true} enableTilt={false}>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-semibold text-white text-sm">Saving Plans</h3>
                                <button className="text-[10px] text-muted-foreground hover:text-white flex items-center gap-1 font-medium transition-colors">
                                    <Plus className="w-3 h-3" /> Add Plan
                                </button>
                            </div>
                            <div className="mb-6">
                                <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold">Total Savings</span>
                                <h2 className="text-3xl font-bold text-white mt-1">$84,500</h2>
                            </div>
                            <div className="space-y-6">
                                {savingPlans.map((plan, i) => (
                                    <div key={i}>
                                        <div className="flex justify-between items-center mb-2">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-8 h-8 rounded-lg bg-opacity-20 flex items-center justify-center ${plan.color.replace('bg-', 'bg-').replace('500', '500/20')}`}>
                                                    <Wallet className={`w-4 h-4 ${plan.color.replace('bg-', 'text-')}`} />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-semibold text-white">{plan.name}</p>
                                                    <p className="text-[10px] text-muted-foreground">Target ${plan.target.toLocaleString()}</p>
                                                </div>
                                            </div>
                                            <span className="text-xs font-bold text-white">${plan.current.toLocaleString()}</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                            <div className={`h-full ${plan.color} rounded-full`} style={{ width: `${(plan.current / plan.target) * 100}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </MagicCard>
                    </div>

                    {/* === MIDDLE COLUMN (50%) === */}
                    <div className="col-span-12 lg:col-span-6 flex flex-col gap-4 h-full">

                        {/* 1. Stats Row */}
                        <div className="grid grid-cols-3 gap-4 shrink-0">
                            {[
                                { label: 'Total Income', value: '$78,000', change: '+12%', color: 'text-emerald-400', icon: ArrowUpRight, bg: 'bg-emerald-500/10' },
                                { label: 'Total Expense', value: '$43,000', change: '-5%', color: 'text-red-400', icon: ArrowDownLeft, bg: 'bg-red-500/10' },
                                { label: 'Total Savings', value: '$56,000', change: '+8%', color: 'text-emerald-400', icon: Wallet, bg: 'bg-emerald-500/10' }
                            ].map((stat, i) => (
                                <MagicCard key={i} className="glass-card p-5 rounded-2xl border border-white/5" enableStars={true} enableTilt={false}>
                                    <div className="flex justify-between items-start mb-4">
                                        <div className={`w-9 h-9 rounded-full ${stat.bg} flex items-center justify-center ${stat.color}`}>
                                            <stat.icon className="w-4 h-4" />
                                        </div>
                                        <MoreVertical className="w-4 h-4 text-muted-foreground cursor-pointer hover:text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider font-semibold mb-1">{stat.label}</p>
                                        <h3 className="text-2xl font-bold text-white mb-2">{stat.value}</h3>
                                        <span className={`text-[10px] ${stat.color} bg-white/5 px-2 py-1 rounded-md font-medium`}>{stat.change}</span>
                                    </div>
                                </MagicCard>
                            ))}
                        </div>

                        {/* 2. Cashflow Chart */}
                        <MagicCard className="glass-card p-6 rounded-2xl h-[380px] shrink-0" enableStars={true} enableTilt={false}>
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h3 className="font-semibold text-white text-lg">Cashflow</h3>
                                    <div className="mt-1">
                                        <span className="text-xs text-muted-foreground block">Total Balance</span>
                                        <span className="text-2xl font-bold text-white">$562,000</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2 text-xs">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                        <span className="text-muted-foreground">Income</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-xs">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500/20"></span>
                                        <span className="text-muted-foreground">Expense</span>
                                    </div>
                                    <select className="bg-white/5 border-none text-xs text-white rounded px-2 py-1 outline-none">
                                        <option>This Year</option>
                                    </select>
                                </div>
                            </div>
                            <div className="h-[240px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <BarChart data={cashflowData} barGap={8}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                                        <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 10 }} axisLine={false} tickLine={false} />
                                        <YAxis stroke="rgba(255,255,255,0.3)" tick={{ fontSize: 10 }} tickFormatter={(value) => `${value / 1000}k`} axisLine={false} tickLine={false} />
                                        <Tooltip
                                            contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0,0,0,0.5)' }}
                                            cursor={{ fill: 'transparent' }}
                                        />
                                        <Bar dataKey="income" fill="#10b981" radius={[4, 4, 4, 4]} maxBarSize={12} />
                                        <Bar dataKey="expense" fill="rgba(16, 185, 129, 0.2)" radius={[4, 4, 4, 4]} maxBarSize={12} />
                                    </BarChart>
                                </ResponsiveContainer>
                            </div>
                        </MagicCard>

                        {/* 3. Recent Transactions */}
                        <MagicCard className="glass-card p-6 rounded-2xl flex-1" enableStars={true} enableTilt={false}>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-semibold text-white text-lg">Recent Transactions</h3>
                                <div className="flex gap-2">
                                    <select className="bg-white/5 border-none text-xs text-white rounded px-2 py-1 outline-none">
                                        <option>This Month</option>
                                    </select>
                                    <Button variant="ghost" size="icon" className="h-6 w-6"><MoreVertical className="w-4 h-4 text-muted-foreground" /></Button>
                                </div>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-xs text-muted-foreground border-b border-white/5">
                                            <th className="pb-3 font-medium">Description Name</th>
                                            <th className="pb-3 font-medium">Date & Time</th>
                                            <th className="pb-3 font-medium">Amount</th>
                                            <th className="pb-3 font-medium">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {transactions.map((tx) => (
                                            <tr key={tx.id} className="group hover:bg-white/5 transition-colors">
                                                <td className="py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center font-bold text-xs">{tx.icon}</div>
                                                        <span className="font-medium text-white">{tx.name}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4">
                                                    <div className="flex flex-col">
                                                        <span className="text-white/80 text-xs">{tx.date}</span>
                                                        <span className="text-muted-foreground text-[10px]">{tx.time}</span>
                                                    </div>
                                                </td>
                                                <td className="py-4 font-medium text-white">${Math.abs(tx.amount).toFixed(2)}</td>
                                                <td className="py-4">
                                                    <span className={`text-[10px] px-2 py-1 rounded-full ${tx.status === 'Completed' ? 'bg-emerald-500/10 text-emerald-500' :
                                                        tx.status === 'Pending' ? 'bg-yellow-500/10 text-yellow-500' :
                                                            'bg-red-500/10 text-red-500'
                                                        }`}>
                                                        {tx.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </MagicCard>
                    </div>

                    {/* === RIGHT COLUMN (25%) === */}
                    <div className="col-span-12 lg:col-span-3 flex flex-col gap-4 h-full">

                        {/* 1. Statistic Donut */}
                        <MagicCard className="glass-card p-6 rounded-2xl shrink-0" enableStars={true} enableTilt={false}>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-semibold text-white text-sm">Statistic</h3>
                                <select className="bg-transparent border-none text-xs text-muted-foreground focus:ring-0 cursor-pointer">
                                    <option>This Month</option>
                                </select>
                            </div>
                            <div className="flex justify-between text-xs text-muted-foreground mb-4">
                                <span>Income <span className="text-emerald-400">$12,400</span></span>
                                <span>Expense <span className="text-red-400">$5,800</span></span>
                            </div>
                            <div className="h-[180px] w-full relative mb-6">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={expenseData}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={55}
                                            outerRadius={70}
                                            paddingAngle={5}
                                            dataKey="value"
                                            startAngle={90}
                                            endAngle={-270}
                                        >
                                            {expenseData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                                            ))}
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-xl font-bold text-white">$3,500</span>
                                    <span className="text-[10px] text-muted-foreground">Total Saving</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {expenseData.map((item, i) => (
                                    <div key={i} className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-2">
                                            <span className={`px-1.5 py-0.5 rounded text-[10px] bg-white/5 font-medium`} style={{ color: item.color }}>{Math.round(item.value / 60)}%</span>
                                            <span className="text-muted-foreground">{item.name}</span>
                                        </div>
                                        <span className="font-medium text-white">${item.value}</span>
                                    </div>
                                ))}
                            </div>
                        </MagicCard>

                        {/* 2. Recent Activity Timeline */}
                        <MagicCard className="glass-card p-6 rounded-2xl flex-1" enableStars={true} enableTilt={false}>
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="font-semibold text-white text-sm">Recent Activity</h3>
                                <MoreVertical className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <div className="space-y-6 relative">
                                {/* Vertical Line */}
                                <div className="absolute left-[19px] top-2 bottom-2 w-[1px] bg-white/5"></div>

                                {['Today', 'Yesterday'].map((day, dIndex) => (
                                    <div key={dIndex} className="relative z-10">
                                        <h4 className="text-xs font-semibold text-white mb-4 pl-1">{day}</h4>
                                        <div className="space-y-6">
                                            {activity.slice(0, 3).map((act, i) => (
                                                <div key={i} className="flex gap-4 group">
                                                    <div className="w-10 h-10 rounded-full bg-white/10 border border-white/5 flex items-center justify-center shrink-0 z-10 relative">
                                                        <img
                                                            src={`https://ui-avatars.com/api/?name=${act.name}&background=random`}
                                                            alt={act.name}
                                                            className="w-full h-full rounded-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                                                        />
                                                    </div>
                                                    <div className="pt-1">
                                                        <p className="text-xs text-white leading-relaxed">
                                                            <span className="font-semibold">{act.name}</span> {act.action}
                                                        </p>
                                                        <span className="text-[10px] text-muted-foreground">{act.time}</span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </MagicCard>
                    </div>
                </MagicGrid>
            </div>
        </DashboardLayout>
    )
}
