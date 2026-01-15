
import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingFallback: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-transparent">
            <div className="bg-gradient-to-br from-blue-500 to-purple-600 p-4 rounded-2xl shadow-lg shadow-blue-500/20 animate-pulse">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
            </div>
            <p className="mt-4 text-slate-400 font-medium animate-pulse">Loading App...</p>
        </div>
    );
};
