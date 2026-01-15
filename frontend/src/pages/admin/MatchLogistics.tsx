
import React, { useEffect, useState } from 'react';
import { AdminService, type MatchLog } from '../../services/adminService';
import {
    Users,
    Link,
    CheckCircle,
    XCircle,
    Clock,
    Search
} from 'lucide-react';
import { MagicCard } from '../../components/react-bits/MagicCard';

export const MatchLogistics: React.FC = () => {
    const [matches, setMatches] = useState<MatchLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const data = await AdminService.getMatches();
                setMatches(data);
            } catch (error) {
                console.error("Failed to fetch matches", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMatches();
    }, []);

    const getStatusBadge = (status: MatchLog['status']) => {
        switch (status) {
            case 'Accepted': return <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20"><CheckCircle className="w-3 h-3" /> Accepted</span>;
            case 'Proposed': return <span className="flex items-center gap-1 text-xs font-bold text-blue-400 bg-blue-500/10 px-2 py-1 rounded-md border border-blue-500/20"><Clock className="w-3 h-3" /> Proposed</span>;
            case 'Declined': return <span className="flex items-center gap-1 text-xs font-bold text-slate-400 bg-slate-500/10 px-2 py-1 rounded-md border border-slate-500/20"><XCircle className="w-3 h-3" /> Declined</span>;
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Match Logistics</h1>
                    <p className="text-slate-400 text-sm">Monitor investor-fund matching and allocation status.</p>
                </div>
                <MagicCard 
                    className="flex items-center gap-2 px-3 py-2 glass-card rounded-lg text-sm text-slate-300"
                    glowColor="59, 130, 246"
                    enableTilt={false}
                    enableStars={true}
                >
                    <span className="font-semibold text-blue-400">{matches.length}</span> Active Matches
                </MagicCard>
            </div>

            <MagicCard 
                className="glass-card rounded-xl overflow-hidden"
                glowColor="59, 130, 246"
                enableTilt={false}
                enableStars={true}
            >
                <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                    <div className="relative w-full max-w-sm">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search by investor or fund..."
                            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto max-h-[500px] overflow-y-auto custom-scrollbar">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/5 border-b border-white/10 text-slate-400 font-medium sticky top-0">
                            <tr>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Investor</th>
                                <th className="px-6 py-3">Fund</th>
                                <th className="px-6 py-3">Match Score</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {matches.map((match) => (
                                <tr key={match.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 text-slate-500 font-mono text-xs">
                                        {match.date}
                                    </td>
                                    <td className="px-6 py-4 font-medium text-white flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center font-bold text-xs">
                                            {match.investorName.charAt(0)}
                                        </div>
                                        {match.investorName}
                                    </td>
                                    <td className="px-6 py-4 text-slate-400">
                                        {match.fundName}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                <div
                                                    className={`h-full rounded-full ${match.matchScore > 0.9 ? 'bg-emerald-500' : match.matchScore > 0.7 ? 'bg-blue-500' : 'bg-amber-500'}`}
                                                    style={{ width: `${match.matchScore * 100}%` }}
                                                />
                                            </div>
                                            <span className="text-xs font-mono font-medium text-slate-300">
                                                {(match.matchScore * 100).toFixed(0)}%
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        {getStatusBadge(match.status)}
                                    </td>
                                </tr>
                            ))}
                            {matches.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                        No matches found.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </MagicCard>
        </div>
    );
};
