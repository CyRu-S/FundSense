
import React, { useEffect, useState } from 'react';
import { 
    Users, 
    TrendingUp, 
    PieChart, 
    AlertTriangle, 
    CheckCircle, 
    Activity,
    ArrowUpRight
} from 'lucide-react';
import { AdminService } from '../../services/adminService';
import type { KPIStats, ActivityItem } from '../../services/adminService';
import { MagicCard, MagicGrid } from '../../components/react-bits/MagicCard';

const StatCard: React.FC<{ title: string; value: string | number; change?: string; icon: React.ElementType }> = ({ title, value, change, icon: Icon }) => (
    <MagicCard 
        className="p-6 rounded-xl glass-card" 
        glowColor="59, 130, 246"
        enableTilt={false}
        clickEffect={true}
        enableStars={true}
    >
        <div className="flex items-center justify-between relative z-10">
            <div>
                <p className="text-sm font-medium text-slate-400">{title}</p>
                <h3 className="text-3xl font-bold text-white mt-2">{value}</h3>
            </div>
            <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
                <Icon className="w-6 h-6 text-blue-400" />
            </div>
        </div>
        {change && (
            <div className="mt-4 flex items-center text-sm relative z-10">
                <span className="text-emerald-400 font-medium bg-emerald-500/10 px-2 py-0.5 rounded-full flex items-center gap-1 border border-emerald-500/20">
                    <TrendingUp className="w-3 h-3" /> {change}
                </span>
                <span className="text-slate-500 ml-2">vs last month</span>
            </div>
        )}
    </MagicCard>
);


export const AdminOverview: React.FC = () => {
    const [stats, setStats] = useState<KPIStats | null>(null);
    const [activity, setActivity] = useState<ActivityItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [statsData, activityData] = await Promise.all([
                    AdminService.getOverviewStats(),
                    AdminService.getRecentActivity()
                ]);
                setStats(statsData);
                setActivity(activityData || []);
            } catch (error) {
                console.error("Failed to fetch admin data", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
                <p className="text-slate-400 mt-2">Welcome back, here's what's happening with your platform today.</p>
            </div>

            {/* KPI Grid */}
            <MagicGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard 
                    title="Total Users" 
                    value={stats?.totalUsers.toLocaleString() || '0'} 
                    change="+12%"
                    icon={Users} 
                />
                <StatCard 
                    title="Active Investors" 
                    value={stats?.activeInvestors.toLocaleString() || '0'} 
                    change="+5%"
                    icon={Activity} 
                />
                <StatCard 
                    title="Total Funds" 
                    value={stats?.totalFunds || '0'} 
                    icon={PieChart} 
                />
                 <MagicCard 
                    className="p-6 rounded-xl glass-card flex flex-col justify-between"
                    glowColor="59, 130, 246"
                    enableTilt={false}
                    clickEffect={true}
                    enableStars={true}
                 >
                    <div>
                        <p className="text-sm font-medium text-slate-400">ML Model Status</p>
                        <div className="flex items-center gap-2 mt-2">
                             {stats?.modelStatus === 'OK' ? (
                                 <CheckCircle className="w-5 h-5 text-emerald-500" />
                             ) : (
                                 <AlertTriangle className="w-5 h-5 text-amber-500" />
                             )}
                             <span className={`text-xl font-bold ${stats?.modelStatus === 'OK' ? 'text-emerald-400' : 'text-amber-500'}`}>
                                {stats?.modelStatus}
                             </span>
                        </div>
                    </div>
                    <button className="text-sm text-blue-400 font-medium hover:text-blue-300 flex items-center gap-1 mt-4 group/btn">
                        View Details <ArrowUpRight className="w-3 h-3 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
                    </button>
                </MagicCard>
            </MagicGrid>

            {/* Middle Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Chart Placeholder */}
                <MagicCard 
                    className="lg:col-span-2 p-6 rounded-xl glass-card min-h-[400px]"
                    glowColor="59, 130, 246"
                    enableTilt={false}
                    enableStars={true}
                >
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-white">Platform Growth</h3>
                        <select className="bg-black/20 border border-white/10 text-sm rounded-lg px-3 py-1 text-slate-300 outline-none focus:ring-2 focus:ring-blue-500/20 [&>option]:bg-slate-900">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                            <option>This Year</option>
                        </select>
                    </div>
                    <div className="h-80 flex items-center justify-center bg-white/5 rounded-lg border border-dashed border-white/10">
                        <p className="text-slate-500 font-medium">Chart Component Coming Soon</p>
                    </div>
                </MagicCard>

                {/* Activity Feed */}
                <MagicCard 
                    className="p-6 rounded-xl glass-card"
                    glowColor="59, 130, 246"
                    enableTilt={false}
                    enableStars={true}
                >
                     <h3 className="text-lg font-bold text-white mb-6">Recent Activity</h3>
                     <div className="space-y-6 max-h-[350px] overflow-y-auto custom-scrollbar pr-2">
                        {activity.map((item) => (
                            <div key={item.id} className="flex gap-4 group">
                                <div className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border border-white/5 
                                    ${item.severity === 'critical' ? 'bg-red-500/10 text-red-500' : 
                                      item.severity === 'warning' ? 'bg-amber-500/10 text-amber-500' : 
                                      'bg-blue-500/10 text-blue-500'}`}>
                                    {item.severity === 'critical' ? <AlertTriangle className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-medium text-slate-300 group-hover:text-white transition-colors">{item.message}</p>
                                    <p className="text-xs text-slate-500 mt-1">{item.timestamp}</p>
                                </div>
                            </div>
                        ))}
                     </div>
                </MagicCard>
            </div>
        </div>
    );
};
