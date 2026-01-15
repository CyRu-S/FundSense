
import React, { useEffect, useState } from 'react';
import { AdminService, type Fund } from '../../services/adminService';
import { 
    Search, 
    Filter, 
    MoreHorizontal, 
    Plus, 
    UploadCloud,
    TrendingUp,
    AlertTriangle,
    ShieldCheck
} from 'lucide-react';
import { MagicCard, MagicGrid } from '../../components/react-bits/MagicCard';

export const ManageFunds: React.FC = () => {
    const [funds, setFunds] = useState<Fund[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchFunds = async () => {
            try {
                const data = await AdminService.getFunds();
                setFunds(data);
            } catch (error) {
                console.error("Failed to fetch funds", error);
            } finally {
                setLoading(false);
            }
        };
        fetchFunds();
    }, []);

    const filteredFunds = funds.filter(fund => 
        fund.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
        fund.provider.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const getRiskBadge = (risk: Fund['riskLevel']) => {
        switch (risk) {
            case 'High': return <span className="flex items-center gap-1 text-xs font-medium text-red-400 bg-red-500/10 px-2 py-1 rounded-md border border-red-500/20"><TrendingUp className="w-3 h-3" /> High Risk</span>;
            case 'Medium': return <span className="flex items-center gap-1 text-xs font-medium text-amber-400 bg-amber-500/10 px-2 py-1 rounded-md border border-amber-500/20"><AlertTriangle className="w-3 h-3" /> Medium</span>;
            case 'Low': return <span className="flex items-center gap-1 text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-md border border-emerald-500/20"><ShieldCheck className="w-3 h-3" /> Low Risk</span>;
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
                    <h1 className="text-2xl font-bold text-white">Manage Funds</h1>
                    <p className="text-slate-400 text-sm">Oversee investment funds, approve listings, and manage data.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-4 py-2 glass-card border border-white/10 rounded-lg text-sm font-medium text-slate-300 hover:bg-white/5 hover:border-white/20 transition-all group">
                        <UploadCloud className="w-4 h-4 text-slate-400 group-hover:text-blue-400" />
                        Import CSV
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg text-sm font-medium text-white hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25">
                        <Plus className="w-4 h-4" />
                        Add Fund
                    </button>
                </div>
            </div>

            {/* Filters */}
            <MagicCard 
                className="p-4 rounded-xl glass-card flex flex-col sm:flex-row gap-4 items-center justify-between"
                glowColor="59, 130, 246"
                enableTilt={false}
                enableStars={true}
            >   
                <div className="flex items-center gap-4">
                    <div className="relative w-full sm:w-96">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                        <input 
                            type="text" 
                            placeholder="Search funds or providers..." 
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 transition-all"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-400 hover:bg-white/10 hover:border-white/20 transition-all">
                        <Filter className="w-4 h-4" />
                        <span>Filter</span>
                    </button>
                </div>
            </MagicCard>

             {/* Table */}
            <MagicCard 
                className="rounded-xl glass-card overflow-hidden"
                glowColor="59, 130, 246"
                enableTilt={false}
                enableStars={true}
            >
                <div className="overflow-x-auto max-h-[500px] overflow-y-auto custom-scrollbar">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-white/5 border-b border-white/10 sticky top-0">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-slate-300">Fund Name</th>
                                <th className="px-6 py-4 font-semibold text-slate-300">Provider</th>
                                <th className="px-6 py-4 font-semibold text-slate-300">Category</th>
                                <th className="px-6 py-4 font-semibold text-slate-300">Risk Level</th>
                                <th className="px-6 py-4 font-semibold text-slate-300 text-right">AUM</th>
                                <th className="px-6 py-4 font-semibold text-slate-300">Status</th>
                                <th className="px-6 py-4 font-semibold text-slate-300">Last Updated</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                           {filteredFunds.length > 0 ? (
                               filteredFunds.map((fund) => (
                                <tr key={fund.id} className="hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white">
                                        {fund.name}
                                    </td>
                                    <td className="px-6 py-4 text-slate-400">
                                        {fund.provider}
                                    </td>
                                    <td className="px-6 py-4 text-slate-400">
                                        <span className="inline-block px-2 py-1 bg-white/5 border border-white/10 rounded text-xs text-slate-300">
                                            {fund.category}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {getRiskBadge(fund.riskLevel)}
                                    </td>
                                    <td className="px-6 py-4 text-right font-mono text-slate-300">
                                        {fund.aum}
                                    </td>
                                    <td className="px-6 py-4">
                                         {fund.status === 'Approved' ? (
                                             <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                 Approved
                                             </span>
                                         ) : (
                                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-slate-500/10 text-slate-400 border border-slate-500/20">
                                                 Draft
                                             </span>
                                         )}
                                    </td>
                                    <td className="px-6 py-4 text-slate-500 whitespace-nowrap text-xs">
                                        {fund.lastUpdated}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-1.5 hover:bg-white/10 rounded-md text-slate-500 hover:text-slate-300 transition-colors">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                           ) : (
                               <tr>
                                   <td colSpan={8} className="px-6 py-12 text-center text-slate-500">
                                       No funds found.
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
