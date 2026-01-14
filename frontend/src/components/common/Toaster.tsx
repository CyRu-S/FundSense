import { Toaster as HotToaster, toast as hotToast } from 'react-hot-toast'
import { CheckCircle2, XCircle, AlertTriangle, Info, X } from 'lucide-react'
import { cn } from '@/utils/helpers'

/**
 * Custom Toaster component with glassmorphism styling
 */
export function Toaster() {
    return (
        <HotToaster
            position="top-right"
            gutter={12}
            containerStyle={{
                top: 80,
                right: 20,
            }}
            toastOptions={{
                duration: 4000,
                style: {
                    background: 'transparent',
                    padding: 0,
                    boxShadow: 'none',
                },
            }}
        />
    )
}

interface ToastContentProps {
    variant: 'success' | 'error' | 'warning' | 'info'
    title: string
    description?: string
    onClose?: () => void
}

function ToastContent({ variant, title, description, onClose }: ToastContentProps) {
    const icons = {
        success: CheckCircle2,
        error: XCircle,
        warning: AlertTriangle,
        info: Info,
    }

    const colors = {
        success: {
            icon: 'text-emerald-400',
            bg: 'bg-emerald-500/10',
            border: 'border-emerald-500/30',
            glow: 'shadow-[0_0_20px_rgba(16,185,129,0.15)]',
        },
        error: {
            icon: 'text-red-400',
            bg: 'bg-red-500/10',
            border: 'border-red-500/30',
            glow: 'shadow-[0_0_20px_rgba(239,68,68,0.15)]',
        },
        warning: {
            icon: 'text-amber-400',
            bg: 'bg-amber-500/10',
            border: 'border-amber-500/30',
            glow: 'shadow-[0_0_20px_rgba(245,158,11,0.15)]',
        },
        info: {
            icon: 'text-blue-400',
            bg: 'bg-blue-500/10',
            border: 'border-blue-500/30',
            glow: 'shadow-[0_0_20px_rgba(59,130,246,0.15)]',
        },
    }

    const Icon = icons[variant]
    const colorSet = colors[variant]

    return (
        <div
            className={cn(
                'flex items-start gap-3 w-[360px] p-4 rounded-xl',
                'glass-card backdrop-blur-xl',
                'border',
                colorSet.border,
                colorSet.glow,
                'toast-enter'
            )}
        >
            <div className={cn('shrink-0 p-1 rounded-lg', colorSet.bg)}>
                <Icon className={cn('w-5 h-5', colorSet.icon)} />
            </div>
            <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white">{title}</p>
                {description && (
                    <p className="text-xs text-slate-400 mt-0.5 line-clamp-2">{description}</p>
                )}
            </div>
            {onClose && (
                <button
                    onClick={onClose}
                    className="shrink-0 p-1 rounded-lg hover:bg-white/10 transition-colors"
                >
                    <X className="w-4 h-4 text-slate-400" />
                </button>
            )}
        </div>
    )
}

/**
 * Toast utility functions matching the design system
 */
export const toast = {
    success: (title: string, description?: string) => {
        hotToast.custom(
            (t) => (
                <ToastContent
                    variant="success"
                    title={title}
                    description={description}
                    onClose={() => hotToast.dismiss(t.id)}
                />
            ),
            { duration: 4000 }
        )
    },

    error: (title: string, description?: string) => {
        hotToast.custom(
            (t) => (
                <ToastContent
                    variant="error"
                    title={title}
                    description={description}
                    onClose={() => hotToast.dismiss(t.id)}
                />
            ),
            { duration: 5000 }
        )
    },

    warning: (title: string, description?: string) => {
        hotToast.custom(
            (t) => (
                <ToastContent
                    variant="warning"
                    title={title}
                    description={description}
                    onClose={() => hotToast.dismiss(t.id)}
                />
            ),
            { duration: 4500 }
        )
    },

    info: (title: string, description?: string) => {
        hotToast.custom(
            (t) => (
                <ToastContent
                    variant="info"
                    title={title}
                    description={description}
                    onClose={() => hotToast.dismiss(t.id)}
                />
            ),
            { duration: 4000 }
        )
    },

    // Dismiss all toasts
    dismiss: () => hotToast.dismiss(),
}
