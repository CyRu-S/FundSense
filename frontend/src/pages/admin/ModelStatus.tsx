
import React, { useEffect, useState } from 'react';
import { AdminService, type AIModel } from '../../services/adminService';
import {
    Cpu,
    Activity,
    Zap,
    RefreshCw,
    Clock,
    AlertTriangle,
    CheckCircle,
    Server,
    BarChart3
} from 'lucide-react';
import { MagicCard, MagicGrid } from '../../components/react-bits/MagicCard';

export const ModelStatus: React.FC = () => {
    const [models, setModels] = useState<AIModel[]>([]);
    const [loading, setLoading] = useState(true);
    const [retrainingId, setRetrainingId] = useState<string | null>(null);

    useEffect(() => {
        const fetchModels = async () => {
            try {
                const data = await AdminService.getModels();
                setModels(data);
            } catch (error) {
                console.error("Failed to fetch models", error);
            } finally {
                setLoading(false);
            }
        };
        fetchModels();
    }, []);

    const handleRetrain = (id: string) => {
        if (confirm("Are you sure you want to trigger a retraining run for this model? This action will consume GPU resources.")) {
            setRetrainingId(id);
            setTimeout(() => {
                setModels(prev => prev.map(m =>
                    m.id === id ? { ...m, status: 'Training' as const } : m
                ));
                setRetrainingId(null);
            }, 1000);
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
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">AI Model Registry</h1>
                    <p className="text-slate-400 text-sm">Monitor ML model performance, drift, and serving status.</p>
                </div>
                <MagicCard 
                    className="flex items-center gap-2 text-sm text-slate-300 glass-card px-3 py-1.5 rounded-lg"
                    glowColor="16, 185, 129"
                    enableTilt={false}
                    enableStars={true}
                >
                    <Server className="w-4 h-4 text-emerald-400" />
                    Inference Cluster: <span className="font-semibold text-white">Healthy</span>
                </MagicCard>
            </div>

            <MagicGrid className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 max-h-[600px] overflow-y-auto custom-scrollbar pr-2">
                {models.map((model) => (
                    <MagicCard 
                        key={model.id} 
                        className="rounded-xl glass-card relative overflow-hidden"
                        glowColor="59, 130, 246"
                        enableTilt={false}
                        enableStars={true}
                        clickEffect={true}
                    >
                        {/* Status Strip */}
                        <div className={`h-1.5 w-full ${model.status === 'Serving' ? 'bg-emerald-500' :
                                model.status === 'Training' ? 'bg-blue-500 animate-pulse' :
                                    'bg-red-500'
                            }`} />

                        <div className="p-6 space-y-6">
                            {/* Header */}
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="p-2.5 bg-white/5 rounded-lg border border-white/10">
                                        <Cpu className="w-6 h-6 text-blue-400" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">{model.name}</h3>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-xs font-mono bg-white/5 text-slate-400 px-1.5 py-0.5 rounded border border-white/10">
                                                {model.version}
                                            </span>
                                            {model.driftDetected && (
                                                <span className="flex items-center gap-1 text-[10px] uppercase font-bold text-amber-400 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                                                    <AlertTriangle className="w-3 h-3" /> Drift
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className={`px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1.5 
                                    ${model.status === 'Serving' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                        model.status === 'Training' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                            'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                    {model.status === 'Serving' ? <CheckCircle className="w-3 h-3" /> :
                                        model.status === 'Training' ? <RefreshCw className="w-3 h-3 animate-spin" /> :
                                            <AlertTriangle className="w-3 h-3" />}
                                    {model.status}
                                </div>
                            </div>

                            {/* Metrics Grid */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                                        <Activity className="w-3 h-3" /> Accuracy
                                    </div>
                                    <span className="text-lg font-bold text-white">{model.accuracy}%</span>
                                </div>
                                <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                                        <Zap className="w-3 h-3" /> Latency
                                    </div>
                                    <span className="text-lg font-bold text-white">{model.latency}</span>
                                </div>
                            </div>

                            {/* Footer / Actions */}
                            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                                <span className="text-xs text-slate-500 flex items-center gap-1">
                                    <Clock className="w-3 h-3" /> Trained {model.lastTrained}
                                </span>
                                <div className="flex gap-2">
                                    <button className="p-2 text-slate-500 hover:text-slate-300 hover:bg-white/5 rounded-lg transition-colors" title="View Training Logs">
                                        <BarChart3 className="w-4 h-4" />
                                    </button>
                                    <button
                                        onClick={() => handleRetrain(model.id)}
                                        disabled={model.status === 'Training' || retrainingId === model.id}
                                        className="flex items-center gap-1.5 px-3 py-1.5 glass-card border border-white/10 text-slate-300 text-xs font-semibold rounded-lg hover:bg-white/5 hover:text-blue-400 hover:border-blue-500/30 transition-all disabled:opacity-50"
                                    >
                                        <RefreshCw className={`w-3 h-3 ${model.status === 'Training' ? 'animate-spin' : ''}`} />
                                        Retrain
                                    </button>
                                </div>
                            </div>
                        </div>
                    </MagicCard>
                ))}
            </MagicGrid>
        </div>
    );
};
