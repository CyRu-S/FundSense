
import React, { useEffect, useState } from 'react';
import { AdminService, type AuditLog } from '../../services/adminService';
import {
    Search,
    FileText,
    ShieldAlert,
    Clock,
    Terminal
} from 'lucide-react';
import { MagicCard
 } from '../../components/react-bits/MagicCard';

export const AuditLogs: React.FC = () => {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const data = await AdminService.getAuditLogs();
                setLogs(data);
            } catch (error) {
                console.error("Failed to fetch logs", error);
            } finally {
                setLoading(false);
            }
        };
        fetchLogs();
    }, []);

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
                    <h1 className="text-2xl font-bold text-white">Audit Logs</h1>
                    <p className="text-slate-400 text-sm">Track system events, security alerts, and administrative actions.</p>
                </div>
                <MagicCard 
                    className="flex items-center gap-2 px-3 py-2 glass-card rounded-lg text-xs font-mono text-slate-400"
                    glowColor="59, 130, 246"
                    enableTilt={false}
                    enableStars={true}
                >
                    <Terminal className="w-3 h-3" />
                    <span>Retention: 90 Days</span>
                </MagicCard>
            </div>

            <MagicCard 
                className="rounded-xl glass-card overflow-hidden"
                glowColor="59, 130, 246"
                enableTilt={false}
                enableStars={true}
            >
                <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
                    <div className="relative w-full max-w-sm">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input
                            type="text"
                            placeholder="Search logs by user, action or IP..."
                            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto max-h-[500px] overflow-y-auto custom-scrollbar">
                    <table className="w-full text-left text-sm font-mono">
                        <thead className="bg-white/5 border-b border-white/10 text-slate-400 font-medium sticky top-0">
                            <tr>
                                <th className="px-6 py-3">Timestamp</th>
                                <th className="px-6 py-3">Action</th>
                                <th className="px-6 py-3">User</th>
                                <th className="px-6 py-3">Details</th>
                                <th className="px-6 py-3 text-right">IP Address</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {logs.map((log) => (
                                <tr key={log.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-3 text-slate-500 whitespace-nowrap">
                                        {log.timestamp}
                                    </td>
                                    <td className="px-6 py-3">
                                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide
                                            ${log.action.includes('FAILED') || log.action.includes('ERROR') || log.action.includes('DISABLED') || log.action.includes('REJECTION') ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                                log.action.includes('APPROVAL') || log.action.includes('COMPLETED') || log.action.includes('CREATED') ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                    'bg-blue-500/10 text-blue-400 border border-blue-500/20'}`}>
                                            {log.action}
                                        </span>
                                    </td>
                                    <td className="px-6 py-3 text-slate-300">
                                        {log.user}
                                    </td>
                                    <td className="px-6 py-3 text-slate-400 max-w-xs truncate" title={log.details}>
                                        {log.details}
                                    </td>
                                    <td className="px-6 py-3 text-right text-slate-500">
                                        {log.ipAddress}
                                    </td>
                                </tr>
                            ))}
                            {logs.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-slate-500">
                                        No logs found.
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
