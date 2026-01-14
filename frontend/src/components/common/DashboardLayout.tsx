import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, ScrollText, LogOut, ArrowRightLeft, FileText, CreditCard, PiggyBank, TrendingUp, Mail, Tag, LineChart } from 'lucide-react'
import { useAuthStore } from '@/store'
import { Button } from '@/components/common/button'


export function DashboardLayout({ children }: { children: React.ReactNode }) {
    const { logout, user } = useAuthStore()
    const location = useLocation()

    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
        { icon: ArrowRightLeft, label: 'Payments', href: '/payments' },
        { icon: TrendingUp, label: 'Investments', href: '/investments' },
        { icon: PiggyBank, label: 'Fund Explorer', href: '/funds' },
        { icon: Mail, label: 'Inbox', href: '/inbox' },
        { icon: LineChart, label: 'Insights', href: '/insights' },
    ]

    return (
        <div className="min-h-screen flex bg-transparent">
            {/* Sidebar */}
            <aside className="fixed left-0 top-0 bottom-0 w-56 glass-card m-4 rounded-xl border-border hidden md:flex flex-col">
                {/* Logo */}
                <div className="p-6 border-b border-border/50">
                    <Link to="/" className="flex items-center gap-2">
                        <img src="/logo.png" alt="FundSense" className="h-8 w-auto object-contain" />
                        <span className="font-bold text-lg text-foreground">FundSense</span>
                    </Link>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-4 py-6 space-y-2">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.href
                        return (
                            <Link key={item.href} to={item.href}>
                                <Button
                                    variant={isActive ? "secondary" : "ghost"}
                                    className={`w-full justify-start gap-3 ${isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'
                                        }`}
                                >
                                    <item.icon className="w-5 h-5" />
                                    {item.label}
                                    {item.badge && (
                                        <span className="ml-auto bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                                            {item.badge}
                                        </span>
                                    )}
                                </Button>
                            </Link>
                        )
                    })}
                </nav>

                {/* User Profile & Logout */}
                <div className="p-4 border-t border-border/50">
                    <div className="flex items-center gap-3 px-2 mb-4">
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
                            {user?.name?.[0] || 'U'}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-medium truncate">{user?.name || 'User'}</p>
                            <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                        </div>
                    </div>
                    <Button variant="outline" className="w-full gap-2 border-destructive/20 text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={logout}>
                        <LogOut className="w-4 h-4" />
                        Sign Out
                    </Button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-58 p-4 md:p-8 pt-20 md:pt-8 min-h-screen transition-all">
                {children}
            </main>
        </div>
    )
}
