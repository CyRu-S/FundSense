
import React, { useState } from 'react';
import { 
    ToggleLeft, 
    ToggleRight, 
    Save, 
    Mail, 
    Shield, 
    Cloud, 
    Bell
} from 'lucide-react';
import { MagicCard } from '../../components/react-bits/MagicCard';

export const SystemSettings: React.FC = () => {
    const [settings, setSettings] = useState({
        maintenanceMode: false,
        autoApproveFunds: false,
        ragExplanations: true,
        emailNotifications: true,
        logRetentionDays: 90
    });

    const toggle = (key: keyof typeof settings) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    return (
        <div className="max-w-4xl space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-white">System Settings</h1>
                    <p className="text-slate-400 text-sm">Configure global platform behavior and feature flags.</p>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/25">
                    <Save className="w-4 h-4" />
                    Save Changes
                </button>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {/* Feature Flags */}
                <MagicCard 
                    className="glass-card rounded-xl overflow-hidden"
                    glowColor="59, 130, 246"
                    enableTilt={false}
                    enableStars={true}
                >
                    <div className="px-6 py-4 border-b border-white/10 bg-white/5">
                        <h3 className="font-semibold text-white flex items-center gap-2">
                            <Cloud className="w-4 h-4 text-blue-400" />
                            Feature Flags
                        </h3>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-white">RAG Explanations</p>
                                <p className="text-sm text-slate-400">Enable AI-generated explanations for fund recommendations.</p>
                            </div>
                            <button onClick={() => toggle('ragExplanations')} className={`text-2xl ${settings.ragExplanations ? 'text-blue-400' : 'text-slate-600'}`}>
                                {settings.ragExplanations ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10" />}
                            </button>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-white">Auto-Approve Low Risk Funds</p>
                                <p className="text-sm text-slate-400">Automatically approve new fund listings if Risk Level is 'Low'.</p>
                            </div>
                            <button onClick={() => toggle('autoApproveFunds')} className={`text-2xl ${settings.autoApproveFunds ? 'text-blue-400' : 'text-slate-600'}`}>
                                {settings.autoApproveFunds ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10" />}
                            </button>
                        </div>
                    </div>
                </MagicCard>

                {/* Notifications & Security */}
                <MagicCard 
                    className="glass-card rounded-xl overflow-hidden"
                    glowColor="16, 185, 129"
                    enableTilt={false}
                    enableStars={true}
                >
                    <div className="px-6 py-4 border-b border-white/10 bg-white/5">
                        <h3 className="font-semibold text-white flex items-center gap-2">
                            <Shield className="w-4 h-4 text-emerald-400" />
                            Security & Notifications
                        </h3>
                    </div>
                    <div className="p-6 space-y-6">
                         <div className="flex items-center justify-between">
                            <div>
                                <p className="font-medium text-white">System Activity Emails</p>
                                <p className="text-sm text-slate-400">Send daily digests of critical system alerts to admins.</p>
                            </div>
                            <button onClick={() => toggle('emailNotifications')} className={`text-2xl ${settings.emailNotifications ? 'text-blue-400' : 'text-slate-600'}`}>
                                {settings.emailNotifications ? <ToggleRight className="w-10 h-10" /> : <ToggleLeft className="w-10 h-10" />}
                            </button>
                        </div>
                        
                         <div className="border-t border-white/10 pt-6">
                             <label className="block text-sm font-medium text-slate-300 mb-2">Log Retention Policy</label>
                             <select 
                                value={settings.logRetentionDays} 
                                onChange={(e) => setSettings(prev => ({...prev, logRetentionDays: Number(e.target.value)}))}
                                className="w-full sm:w-64 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/30 focus:border-blue-500/50 [&>option]:bg-slate-900"
                             >
                                 <option value={30}>30 Days</option>
                                 <option value={60}>60 Days</option>
                                 <option value={90}>90 Days</option>
                                 <option value={365}>1 Year</option>
                             </select>
                         </div>
                    </div>
                </MagicCard>
            </div>
        </div>
    );
};
