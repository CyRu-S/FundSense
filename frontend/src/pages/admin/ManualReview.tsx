
import React, { useEffect, useState } from 'react';
import { AdminService, type ReviewItem } from '../../services/adminService';
import {
    CheckCircle,
    XCircle,
    Clock,
    Flag,
    RefreshCw
} from 'lucide-react';
import { MagicCard, MagicGrid } from '../../components/react-bits/MagicCard';

export const ManualReview: React.FC = () => {
    const [reviews, setReviews] = useState<ReviewItem[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReviews = async () => {
            try {
                const data = await AdminService.getReviews();
                setReviews(data);
            } catch (error) {
                console.error("Failed to fetch reviews", error);
            } finally {
                setLoading(false);
            }
        };
        fetchReviews();
    }, []);

    const handleAction = (id: string, action: 'approve' | 'reject') => {
        setReviews(prev => prev.map(item =>
            item.id === id ? { ...item, status: action === 'approve' ? 'APPROVED' : 'REJECTED' } : item
        ));
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
                    <h1 className="text-2xl font-bold text-white">Manual Review Queue</h1>
                    <p className="text-slate-400 text-sm">Review flagged offers and low-confidence ML predictions.</p>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-slate-400">Queue Status:</span>
                    <span className="px-2 py-1 bg-amber-500/10 text-amber-400 text-xs font-bold rounded-full border border-amber-500/20">
                        {reviews.filter(r => r.status === 'PENDING').length} Pending
                    </span>
                </div>
            </div>

            <MagicGrid className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-h-[700px] overflow-y-auto custom-scrollbar pr-2">
                {reviews.map((item) => (
                    <MagicCard
                        key={item.id}
                        className="rounded-xl glass-card overflow-hidden flex flex-col"
                        glowColor="59, 130, 246"
                        enableTilt={false}
                        enableStars={true}
                        clickEffect={true}
                    >
                        {/* Image Header */}
                        <div className="relative h-48 bg-slate-800">
                            <img
                                src={item.imageUrl}
                                alt={item.description}
                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                            />
                            <div className="absolute top-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-md flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {item.timestamp}
                            </div>
                            {item.status !== 'PENDING' && (
                                <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px] flex items-center justify-center">
                                    <div className={`px-4 py-2 rounded-full font-bold flex items-center gap-2 ${item.status === 'APPROVED' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'}`}>
                                        {item.status === 'APPROVED' ? <CheckCircle className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                                        {item.status}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Content */}
                        <div className="p-4 flex-1 flex flex-col">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <h3 className="font-semibold text-white line-clamp-1" title={item.donorName}>{item.donorName}</h3>
                                    <span className="text-xs text-slate-500">{item.offerId}</span>
                                </div>
                                <div className="flex flex-col items-end">
                                    <span className="text-xs font-medium text-slate-500">Confidence</span>
                                    <span className={`text-sm font-bold ${item.confidence < 0.7 ? 'text-amber-400' : 'text-slate-300'}`}>
                                        {(item.confidence * 100).toFixed(0)}%
                                    </span>
                                </div>
                            </div>

                            <p className="text-sm text-slate-400 mb-4 line-clamp-2 flex-1">
                                {item.description}
                            </p>

                            <div className="bg-white/5 rounded-lg p-3 mb-4 space-y-2 border border-white/5">
                                <div className="flex items-center justify-between text-xs">
                                    <span className="text-slate-500">Risk Score</span>
                                    <span className={`font-semibold ${item.spoilageScore > 0.8 ? 'text-red-400' : 'text-slate-300'}`}>
                                        {(item.spoilageScore * 100).toFixed(0)}/100
                                    </span>
                                </div>
                                <div className="flex items-center gap-1.5 text-xs text-amber-400 font-medium">
                                    <Flag className="w-3 h-3" />
                                    Flag: {item.flagReason}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="grid grid-cols-2 gap-3 mt-auto">
                                <button
                                    onClick={() => handleAction(item.id, 'reject')}
                                    disabled={item.status !== 'PENDING'}
                                    className="flex items-center justify-center gap-2 px-3 py-2 glass-card border border-white/10 text-slate-300 rounded-lg text-sm font-medium hover:bg-red-500/10 hover:text-red-400 hover:border-red-500/20 transition-all disabled:opacity-50"
                                >
                                    <XCircle className="w-4 h-4" />
                                    Reject
                                </button>
                                <button
                                    onClick={() => handleAction(item.id, 'approve')}
                                    disabled={item.status !== 'PENDING'}
                                    className="flex items-center justify-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25 disabled:opacity-50 disabled:bg-slate-600"
                                >
                                    <CheckCircle className="w-4 h-4" />
                                    Approve
                                </button>
                            </div>
                        </div>
                    </MagicCard>
                ))}
            </MagicGrid>

            {reviews.length === 0 && !loading && (
                <MagicCard
                    className="text-center py-24 glass-card rounded-xl border border-dashed border-white/20"
                    glowColor="59, 130, 246"
                    enableTilt={false}
                    enableStars={true}
                >
                    <CheckCircle className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white">All caught up!</h3>
                    <p className="text-slate-400">No items pending manual review.</p>
                    <button className="mt-4 flex items-center gap-2 px-4 py-2 mx-auto text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors">
                        <RefreshCw className="w-4 h-4" /> Refresh Queue
                    </button>
                </MagicCard>
            )}
        </div>
    );
};
