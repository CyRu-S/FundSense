import { useState, useEffect } from 'react'
import { Link, useLocation, Outlet } from 'react-router-dom'
import { 
    LayoutDashboard, 
    LogOut, 
    ArrowRightLeft, 
    PiggyBank, 
    TrendingUp, 
    Mail, 
    LineChart,
    Menu,
    X,
    Bell,
    ChevronDown,
    Wallet
} from 'lucide-react'
import { useAuthStore } from '@/store'
import { cn } from '@/utils/cn'

// --- Types ---
type NavItem = {
    label: string;
    href: string;
    icon: React.ElementType;
    badge?: number;
};

// --- Config ---
const NAV_ITEMS: NavItem[] = [
    { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
    { label: 'Payments', href: '/payments', icon: ArrowRightLeft },
    { label: 'Investments', href: '/investments', icon: TrendingUp },
    { label: 'Fund Explorer', href: '/funds', icon: PiggyBank },
    { label: 'Inbox', href: '/inbox', icon: Mail, badge: 3 },
    { label: 'Insights', href: '/insights', icon: LineChart },
];

export function DashboardLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const { logout, user } = useAuthStore()
    const location = useLocation()

    // Default sidebar to closed on mobile
    useEffect(() => {
        if (window.innerWidth < 1024) {
            setSidebarOpen(false);
        }
    }, []);

    return (
        <div className="min-h-screen bg-transparent text-foreground font-sans selection:bg-primary/30 selection:text-primary overflow-x-hidden isolate">
            
            {/* --- Mobile Overlay --- */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* --- Sidebar --- */}
            <aside
                className={cn(
                    "fixed top-0 left-0 z-50 h-screen w-64 transition-transform duration-300 ease-in-out",
                    "glass-card border-r border-white/10 flex flex-col",
                    !sidebarOpen && "-translate-x-full lg:translate-x-0 lg:w-20"
                )}
            >
                <div className="flex flex-col h-full">
                    {/* Logo Area */}
                    <div className={cn("h-16 flex items-center px-6 border-b border-white/10", !sidebarOpen && "lg:justify-center lg:px-0")}>
                        <Link to="/" className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-blue-500/30">
                                <Wallet className="w-5 h-5" />
                            </div>
                            <span className={cn("font-bold text-white text-lg tracking-tight transition-opacity duration-300", !sidebarOpen && "lg:hidden lg:opacity-0")}>
                                FundSense<span className="text-blue-500">.</span>
                            </span>
                        </Link>
                    </div>

                    {/* Nav Items */}
                    <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1 custom-scrollbar">
                        {NAV_ITEMS.map((item) => {
                            const isActive = location.pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    to={item.href}
                                    onClick={() => window.innerWidth < 1024 && setSidebarOpen(false)}
                                    className={cn(
                                        "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group relative",
                                        isActive
                                            ? "bg-blue-500/10 text-blue-400 font-medium"
                                            : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                                    )}
                                    title={!sidebarOpen ? item.label : undefined}
                                >
                                    <item.icon className={cn("w-5 h-5 flex-shrink-0 transition-colors", isActive ? "text-blue-400" : "text-slate-500 group-hover:text-slate-300")} />
                                    <span className={cn("whitespace-nowrap transition-opacity duration-200 flex-1", !sidebarOpen && "lg:opacity-0 lg:hidden")}>
                                        {item.label}
                                    </span>
                                    
                                    {/* Badge */}
                                    {item.badge && (
                                        <span className={cn(
                                            "bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                                            !sidebarOpen && "lg:hidden"
                                        )}>
                                            {item.badge}
                                        </span>
                                    )}
                                    
                                    {/* Active Indicator Strip */}
                                    {isActive && <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Sidebar Footer */}
                    <div className="p-4 border-t border-white/10">
                        {/* User Info */}
                        <div className={cn("flex items-center gap-3 px-2 mb-4", !sidebarOpen && "lg:hidden")}>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold shadow-lg">
                                {user?.name?.[0] || 'U'}
                            </div>
                            <div className="overflow-hidden">
                                <p className="text-sm font-medium text-white truncate">{user?.name || 'User'}</p>
                                <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                            </div>
                        </div>
                        
                        <button 
                            onClick={logout}
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-red-500/10 hover:text-red-400 transition-colors group",
                                !sidebarOpen && "lg:justify-center"
                            )}
                        >
                            <LogOut className="w-5 h-5 group-hover:text-red-500" />
                            <span className={cn("whitespace-nowrap", !sidebarOpen && "lg:hidden")}>Sign Out</span>
                        </button>
                    </div>
                </div>
            </aside>

            {/* --- Main Content Wrapper --- */}
            <div className={cn("transition-all duration-300 min-h-screen flex flex-col", sidebarOpen ? "lg:ml-64" : "lg:ml-20")}>
                
                {/* Top Navbar */}
                <header className="h-16 border-b border-white/10 sticky top-0 z-30 px-4 sm:px-6 lg:px-8 flex items-center justify-between glass-card bg-black/20 backdrop-blur-md">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            className="p-2 -ml-2 rounded-lg text-slate-400 hover:bg-white/5 focus:outline-none focus:ring-2 focus:ring-white/10"
                        >
                            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                        
                        {/* Page Title - visible on mobile */}
                        <h1 className="text-white font-semibold lg:hidden">
                            {NAV_ITEMS.find(item => item.href === location.pathname)?.label || 'Dashboard'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Notifications */}
                        <button className="relative p-2 text-slate-400 hover:bg-white/5 rounded-full transition-colors">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-black"></span>
                        </button>

                        <div className="h-8 w-px bg-white/10 mx-1 hidden sm:block" />

                        {/* User Profile */}
                        <div className="flex items-center gap-3 cursor-pointer hover:bg-white/5 p-1.5 pr-3 rounded-full transition-colors border border-transparent hover:border-white/10">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-sm">
                                {user?.name?.[0] || 'U'}
                            </div>
                            <div className="hidden sm:block text-left">
                                <p className="text-sm font-semibold text-slate-200 leading-none">{user?.name || 'User'}</p>
                                <p className="text-[10px] text-slate-500 font-medium truncate max-w-[120px]">{user?.email}</p>
                            </div>
                            <ChevronDown className="w-4 h-4 text-slate-500 hidden sm:block" />
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
