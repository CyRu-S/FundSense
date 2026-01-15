
import React from 'react';
import {
    BarChart3,
    TrendingUp,
    Users,
    Calendar,
    Download
} from 'lucide-react';
import { MagicCard, MagicGrid } from '../../components/react-bits/MagicCard';

const USER_GROWTH_DATA = [
    { date: 'Jan 1', users: 4000 },
    { date: 'Jan 2', users: 3000 },
    { date: 'Jan 3', users: 2000 },
    { date: 'Jan 4', users: 2780 },
    { date: 'Jan 5', users: 1890 },
    { date: 'Jan 6', users: 2390 },
    { date: 'Jan 7', users: 3490 },
];

const FUND_PERFORMANCE_DATA = [
    { name: 'Equity', return: 12.5 },
    { name: 'Bond', return: 4.2 },
    { name: 'Alt.', return: 8.1 },
    { name: 'Cash', return: 2.0 },
    { name: 'Crypto', return: 15.8 },
];

export const AdminAnalytics: React.FC = () => {
    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Platform Analytics</h1>
                    <p className="text-slate-400 text-sm">Deep dive into user growth, fund performance, and system usage.</p>
                </div>
                <div className="flex items-center gap-3">
                    <MagicCard 
                        className="flex items-center gap-2 px-3 py-2 glass-card rounded-lg text-sm text-slate-300"
                        glowColor="59, 130, 246"
                        enableTilt={false}
                        enableStars={true}
                    >
                        <Calendar className="w-4 h-4 text-slate-500" />
                        <span>Last 30 Days</span>
                    </MagicCard>
                    <button className="flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25">
                        <Download className="w-4 h-4" />
                        Export Report
                    </button>
                </div>
            </div>

            {/* Top Stats Cards */}
            <MagicGrid className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <MagicCard 
                    className="glass-card p-6 rounded-xl"
                    glowColor="16, 185, 129"
                    enableTilt={false}
                    enableStars={true}
                    clickEffect={true}
                >
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-400">Total Revenue</span>
                        <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
                            <TrendingUp className="w-4 h-4 text-emerald-400" />
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-white">$2.4M</div>
                    <div className="text-xs text-emerald-400 font-medium mt-1">+12.5% vs last month</div>
                </MagicCard>
                <MagicCard 
                    className="glass-card p-6 rounded-xl"
                    glowColor="59, 130, 246"
                    enableTilt={false}
                    enableStars={true}
                    clickEffect={true}
                >
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-400">Active Sessions</span>
                        <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                            <Users className="w-4 h-4 text-blue-400" />
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-white">1,245</div>
                    <div className="text-xs text-blue-400 font-medium mt-1">Currently online</div>
                </MagicCard>
                <MagicCard 
                    className="glass-card p-6 rounded-xl"
                    glowColor="168, 85, 247"
                    enableTilt={false}
                    enableStars={true}
                    clickEffect={true}
                >
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-slate-400">Fund Inflows</span>
                        <div className="p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
                            <BarChart3 className="w-4 h-4 text-purple-400" />
                        </div>
                    </div>
                    <div className="text-2xl font-bold text-white">$450K</div>
                    <div className="text-xs text-slate-500 font-medium mt-1">Last 24 hours</div>
                </MagicCard>
            </MagicGrid>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* User Growth Chart */}
                <MagicCard 
                    className="glass-card p-6 rounded-xl"
                    glowColor="59, 130, 246"
                    enableTilt={false}
                    enableStars={true}
                >
                    <h3 className="text-lg font-bold text-white mb-6">User Growth Trend</h3>
                    <div className="h-80 w-full flex items-center justify-center bg-white/5 rounded-lg border border-dashed border-white/10 text-slate-500">
                        Chart Component Coming Soon
                    </div>
                </MagicCard>

                 {/* Fund Performance Chart */}
                <MagicCard 
                    className="glass-card p-6 rounded-xl"
                    glowColor="59, 130, 246"
                    enableTilt={false}
                    enableStars={true}
                >
                    <h3 className="text-lg font-bold text-white mb-6">Avg Return by Category (YTD)</h3>
                    <div className="h-80 w-full flex items-center justify-center bg-white/5 rounded-lg border border-dashed border-white/10 text-slate-500">
                         Chart Component Coming Soon
                    </div>
                </MagicCard>
            </div>
        </div>
    );
};
