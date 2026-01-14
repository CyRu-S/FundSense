import { useState } from 'react'
import { DashboardLayout } from '@/components/common/DashboardLayout'
import { MagicCard, MagicGrid } from '@/components/react-bits/MagicCard'
import { Button } from '@/components/common/button'
import { 
    Bell, CheckCircle2, TrendingUp, TrendingDown, AlertTriangle, 
    Sparkles, ShieldCheck, Newspaper, DollarSign, BarChart3, 
    Clock, Check, Trash2, MailOpen, Filter, Search
} from 'lucide-react'

// Notification Types for filtering
type NotificationType = 'all' | 'transactions' | 'portfolio' | 'recommendations' | 'system' | 'news'

interface Notification {
    id: string
    type: NotificationType
    title: string
    message: string
    timestamp: string
    read: boolean
    icon: 'success' | 'warning' | 'info' | 'ai' | 'security' | 'news' | 'money' | 'chart'
    actionLabel?: string
    actionUrl?: string
    amount?: string
    fundName?: string
}

// Mock notification data - representing real investment platform notifications
const mockNotifications: Notification[] = [
    {
        id: '1',
        type: 'transactions',
        title: 'SIP Executed Successfully',
        message: 'Your monthly SIP of ₹5,000 in HDFC Flexi Cap Fund has been executed at NAV ₹1,456.23',
        timestamp: '2 hours ago',
        read: false,
        icon: 'success',
        amount: '₹5,000',
        fundName: 'HDFC Flexi Cap Fund'
    },
    {
        id: '2',
        type: 'recommendations',
        title: 'AI Fund Recommendation',
        message: 'Based on your risk profile and goals, we recommend adding Axis Small Cap Fund to diversify your portfolio.',
        timestamp: '5 hours ago',
        read: false,
        icon: 'ai',
        actionLabel: 'View Fund',
        actionUrl: '/investments'
    },
    {
        id: '3',
        type: 'portfolio',
        title: 'Portfolio Alert: Price Target Reached',
        message: 'Mirae Asset Large Cap Fund has crossed your price target of ₹85. Current NAV: ₹87.45 (+3.2%)',
        timestamp: '8 hours ago',
        read: false,
        icon: 'chart',
        fundName: 'Mirae Asset Large Cap Fund'
    },
    {
        id: '4',
        type: 'news',
        title: 'Dividend Declared',
        message: 'SBI Bluechip Fund has declared a dividend of ₹2.50 per unit. Record date: Jan 15, 2026.',
        timestamp: '1 day ago',
        read: true,
        icon: 'money',
        fundName: 'SBI Bluechip Fund'
    },
    {
        id: '5',
        type: 'system',
        title: 'KYC Verification Complete',
        message: 'Your KYC documents have been verified successfully. You can now invest in all fund categories.',
        timestamp: '2 days ago',
        read: true,
        icon: 'security'
    },
    {
        id: '6',
        type: 'portfolio',
        title: 'Rebalancing Suggestion',
        message: 'Your portfolio has drifted 8% from target allocation. Consider rebalancing to maintain risk levels.',
        timestamp: '2 days ago',
        read: true,
        icon: 'warning',
        actionLabel: 'View Suggestion',
        actionUrl: '/insights'
    },
    {
        id: '7',
        type: 'transactions',
        title: 'Redemption Processed',
        message: 'Your redemption request for 50 units of Kotak Equity Opportunities Fund has been processed. Amount: ₹12,450',
        timestamp: '3 days ago',
        read: true,
        icon: 'success',
        amount: '₹12,450',
        fundName: 'Kotak Equity Opportunities Fund'
    },
    {
        id: '8',
        type: 'news',
        title: 'NFO Alert: New Fund Launch',
        message: 'ICICI Prudential launches Innovation Fund - A sector-focused fund targeting emerging tech companies.',
        timestamp: '4 days ago',
        read: true,
        icon: 'news',
        actionLabel: 'Learn More'
    },
    {
        id: '9',
        type: 'recommendations',
        title: 'Market Insight',
        message: 'Small-cap indices are showing bullish patterns. Your portfolio exposure to small-caps is 12%, below your target of 20%.',
        timestamp: '5 days ago',
        read: true,
        icon: 'ai'
    },
    {
        id: '10',
        type: 'system',
        title: 'Security Alert: New Login',
        message: 'New login detected from Chrome on Windows. Location: Mumbai, India. If this wasn\'t you, please reset your password.',
        timestamp: '1 week ago',
        read: true,
        icon: 'security'
    }
]

const getIconComponent = (iconType: Notification['icon']) => {
    const iconMap = {
        success: { Icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-500/20' },
        warning: { Icon: AlertTriangle, color: 'text-amber-400', bg: 'bg-amber-500/20' },
        info: { Icon: Bell, color: 'text-blue-400', bg: 'bg-blue-500/20' },
        ai: { Icon: Sparkles, color: 'text-purple-400', bg: 'bg-purple-500/20' },
        security: { Icon: ShieldCheck, color: 'text-blue-400', bg: 'bg-blue-500/20' },
        news: { Icon: Newspaper, color: 'text-cyan-400', bg: 'bg-cyan-500/20' },
        money: { Icon: DollarSign, color: 'text-green-400', bg: 'bg-green-500/20' },
        chart: { Icon: BarChart3, color: 'text-indigo-400', bg: 'bg-indigo-500/20' }
    }
    return iconMap[iconType] || iconMap.info
}

const filterTabs = [
    { id: 'all', label: 'All', count: 10 },
    { id: 'transactions', label: 'Transactions', count: 2 },
    { id: 'portfolio', label: 'Portfolio', count: 2 },
    { id: 'recommendations', label: 'AI Insights', count: 2 },
    { id: 'system', label: 'System', count: 2 },
    { id: 'news', label: 'News', count: 2 }
] as const

export const InboxPage = () => {
    const [notifications, setNotifications] = useState<Notification[]>(mockNotifications)
    const [activeFilter, setActiveFilter] = useState<NotificationType>('all')
    const [searchQuery, setSearchQuery] = useState('')

    const filteredNotifications = notifications.filter(n => {
        const matchesFilter = activeFilter === 'all' || n.type === activeFilter
        const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              n.message.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesFilter && matchesSearch
    })

    const unreadCount = notifications.filter(n => !n.read).length

    const markAsRead = (id: string) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n))
    }

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })))
    }

    const deleteNotification = (id: string) => {
        setNotifications(prev => prev.filter(n => n.id !== id))
    }

    return (
        <DashboardLayout>
            <div className="max-w-[1200px] mx-auto">
                
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-white mb-1">Inbox</h1>
                        <p className="text-sm text-slate-400">
                            Stay updated with your investments, alerts and recommendations
                        </p>
                    </div>
                    <div className="flex items-center gap-3">
                        {unreadCount > 0 && (
                            <Button 
                                variant="outline" 
                                className="h-9 px-4 text-xs border-slate-700 text-slate-300 hover:bg-slate-800"
                                onClick={markAllAsRead}
                            >
                                <Check className="w-4 h-4 mr-2" />
                                Mark all as read
                            </Button>
                        )}
                    </div>
                </div>

                {/* Stats Cards */}
                <MagicGrid className="grid grid-cols-4 gap-4 mb-6">
                    <MagicCard 
                        className="glass-card p-4 rounded-xl border border-white/10"
                        glowColor="59, 130, 246"
                        enableStars={true}
                        enableTilt={false}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                                <Bell className="w-5 h-5 text-blue-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white">{unreadCount}</p>
                                <p className="text-xs text-slate-400">Unread</p>
                            </div>
                        </div>
                    </MagicCard>
                    
                    <MagicCard 
                        className="glass-card p-4 rounded-xl border border-white/10"
                        glowColor="59, 130, 246"
                        enableStars={true}
                        enableTilt={false}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white">
                                    {notifications.filter(n => n.type === 'transactions').length}
                                </p>
                                <p className="text-xs text-slate-400">Transactions</p>
                            </div>
                        </div>
                    </MagicCard>
                    
                    <MagicCard 
                        className="glass-card p-4 rounded-xl border border-white/10"
                        glowColor="59, 130, 246"
                        enableStars={true}
                        enableTilt={false}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                                <Sparkles className="w-5 h-5 text-purple-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white">
                                    {notifications.filter(n => n.type === 'recommendations').length}
                                </p>
                                <p className="text-xs text-slate-400">AI Insights</p>
                            </div>
                        </div>
                    </MagicCard>
                    
                    <MagicCard 
                        className="glass-card p-4 rounded-xl border border-white/10"
                        glowColor="59, 130, 246"
                        enableStars={true}
                        enableTilt={false}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-amber-500/20 flex items-center justify-center">
                                <TrendingUp className="w-5 h-5 text-amber-400" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold text-white">
                                    {notifications.filter(n => n.type === 'portfolio').length}
                                </p>
                                <p className="text-xs text-slate-400">Portfolio Alerts</p>
                            </div>
                        </div>
                    </MagicCard>
                </MagicGrid>

                {/* Main Inbox Card */}
                <MagicCard 
                    className="glass-card rounded-xl border border-white/10 overflow-hidden"
                    glowColor="59, 130, 246"
                    enableStars={true}
                    enableTilt={false}
                >
                    {/* Filter Tabs & Search */}
                    <div className="p-4 border-b border-slate-800 flex justify-between items-center">
                        <div className="flex bg-slate-800/50 rounded-lg p-0.5">
                            {filterTabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveFilter(tab.id as NotificationType)}
                                    className={`px-4 py-2 text-xs font-medium rounded-md transition-colors flex items-center gap-2 ${
                                        activeFilter === tab.id 
                                            ? 'bg-blue-600 text-white' 
                                            : 'text-slate-400 hover:text-white'
                                    }`}
                                >
                                    {tab.label}
                                    {tab.id === 'all' && unreadCount > 0 && (
                                        <span className="bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                            {unreadCount}
                                        </span>
                                    )}
                                </button>
                            ))}
                        </div>
                        
                        <div className="relative">
                            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                            <input 
                                type="text"
                                placeholder="Search notifications..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="bg-slate-800/50 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 w-64"
                            />
                        </div>
                    </div>

                    {/* Notifications List */}
                    <div className="divide-y divide-slate-800/50">
                        {filteredNotifications.length === 0 ? (
                            <div className="p-12 text-center">
                                <MailOpen className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                                <p className="text-slate-400">No notifications found</p>
                            </div>
                        ) : (
                            filteredNotifications.map(notification => {
                                const { Icon, color, bg } = getIconComponent(notification.icon)
                                return (
                                    <div 
                                        key={notification.id}
                                        className={`p-4 hover:bg-slate-800/30 transition-colors cursor-pointer group ${
                                            !notification.read ? 'bg-blue-500/5 border-l-2 border-l-blue-500' : ''
                                        }`}
                                        onClick={() => markAsRead(notification.id)}
                                    >
                                        <div className="flex items-start gap-4">
                                            {/* Icon */}
                                            <div className={`w-10 h-10 rounded-full ${bg} flex items-center justify-center flex-shrink-0`}>
                                                <Icon className={`w-5 h-5 ${color}`} />
                                            </div>
                                            
                                            {/* Content */}
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between gap-4">
                                                    <div className="flex-1">
                                                        <div className="flex items-center gap-2 mb-1">
                                                            <h4 className={`text-sm font-semibold ${
                                                                !notification.read ? 'text-white' : 'text-slate-300'
                                                            }`}>
                                                                {notification.title}
                                                            </h4>
                                                            {!notification.read && (
                                                                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                                                            )}
                                                        </div>
                                                        <p className="text-sm text-slate-400 line-clamp-2">
                                                            {notification.message}
                                                        </p>
                                                        
                                                        {/* Fund badge or amount */}
                                                        <div className="flex items-center gap-3 mt-2">
                                                            {notification.fundName && (
                                                                <span className="text-xs bg-slate-800 text-slate-300 px-2 py-1 rounded">
                                                                    {notification.fundName}
                                                                </span>
                                                            )}
                                                            {notification.amount && (
                                                                <span className="text-xs font-semibold text-emerald-400">
                                                                    {notification.amount}
                                                                </span>
                                                            )}
                                                            {notification.actionLabel && (
                                                                <button className="text-xs text-blue-400 hover:text-blue-300 font-medium">
                                                                    {notification.actionLabel} →
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>
                                                    
                                                    {/* Timestamp & Actions */}
                                                    <div className="flex items-center gap-2 flex-shrink-0">
                                                        <span className="text-xs text-slate-500 flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {notification.timestamp}
                                                        </span>
                                                        <button 
                                                            onClick={(e) => {
                                                                e.stopPropagation()
                                                                deleteNotification(notification.id)
                                                            }}
                                                            className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/20 rounded transition-all"
                                                        >
                                                            <Trash2 className="w-4 h-4 text-red-400" />
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        )}
                    </div>
                </MagicCard>
            </div>
        </DashboardLayout>
    )
}
