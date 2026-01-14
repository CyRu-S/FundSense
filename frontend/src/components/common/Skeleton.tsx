import { cn } from '@/utils/helpers'

interface SkeletonProps {
    className?: string
    variant?: 'default' | 'circle' | 'rounded'
    animate?: 'shimmer' | 'pulse' | 'none'
}

/**
 * Base Skeleton component with shimmer animation
 * Matches glassmorphism design system
 */
export function Skeleton({
    className,
    variant = 'default',
    animate = 'shimmer'
}: SkeletonProps) {
    return (
        <div
            className={cn(
                'bg-white/5 relative overflow-hidden',
                variant === 'circle' && 'rounded-full',
                variant === 'rounded' && 'rounded-lg',
                variant === 'default' && 'rounded',
                animate === 'shimmer' && 'skeleton-shimmer',
                animate === 'pulse' && 'animate-pulse',
                className
            )}
        />
    )
}

/**
 * Skeleton for MagicCard loading states
 */
export function SkeletonCard({ className }: { className?: string }) {
    return (
        <div className={cn(
            'glass-card p-6 rounded-2xl border border-white/5',
            className
        )}>
            <div className="flex justify-between items-start mb-4">
                <Skeleton className="w-9 h-9" variant="rounded" />
                <Skeleton className="w-4 h-4" variant="rounded" />
            </div>
            <Skeleton className="h-3 w-20 mb-2" />
            <Skeleton className="h-8 w-32 mb-3" />
            <Skeleton className="h-5 w-16" variant="rounded" />
        </div>
    )
}

/**
 * Skeleton for chart placeholders
 */
export function SkeletonChart({ className, height = 240 }: { className?: string; height?: number }) {
    return (
        <div className={cn('glass-card p-6 rounded-2xl border border-white/5', className)}>
            <div className="flex justify-between items-start mb-6">
                <div>
                    <Skeleton className="h-5 w-24 mb-2" />
                    <Skeleton className="h-3 w-16 mb-1" />
                    <Skeleton className="h-7 w-28" />
                </div>
                <div className="flex gap-4">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-16" />
                </div>
            </div>
            <div
                className="w-full flex items-end gap-2 px-4"
                style={{ height }}
            >
                {Array.from({ length: 12 }).map((_, i) => {
                    const h1 = 30 + (i * 5) % 60
                    const h2 = 20 + (i * 3) % 40
                    return (
                        <div
                            key={i}
                            className="flex-1 flex gap-1 items-end h-full"
                        >
                            <div
                                className="flex-1 bg-white/5 rounded-lg skeleton-shimmer relative overflow-hidden"
                                style={{ height: `${h1}%` }}
                            />
                            <div
                                className="flex-1 bg-white/5 rounded-lg skeleton-shimmer relative overflow-hidden opacity-30"
                                style={{ height: `${h2}%` }}
                            />
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

/**
 * Skeleton for table row placeholders
 */
export function SkeletonTableRow() {
    return (
        <tr className="border-b border-white/5">
            <td className="py-4">
                <div className="flex items-center gap-3">
                    <Skeleton className="w-8 h-8" variant="circle" />
                    <Skeleton className="h-4 w-32" />
                </div>
            </td>
            <td className="py-4">
                <div className="flex flex-col gap-1">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-2 w-14" />
                </div>
            </td>
            <td className="py-4">
                <Skeleton className="h-4 w-16" />
            </td>
            <td className="py-4">
                <Skeleton className="h-5 w-20" variant="rounded" />
            </td>
        </tr>
    )
}

/**
 * Skeleton for transaction table
 */
export function SkeletonTable({ rows = 4 }: { rows?: number }) {
    return (
        <div className="glass-card p-6 rounded-2xl border border-white/5">
            <div className="flex justify-between items-center mb-6">
                <Skeleton className="h-5 w-40" />
                <div className="flex gap-2">
                    <Skeleton className="h-6 w-24" variant="rounded" />
                    <Skeleton className="h-6 w-6" variant="rounded" />
                </div>
            </div>
            <table className="w-full">
                <thead>
                    <tr className="border-b border-white/5">
                        <th className="pb-3"><Skeleton className="h-3 w-28" /></th>
                        <th className="pb-3"><Skeleton className="h-3 w-20" /></th>
                        <th className="pb-3"><Skeleton className="h-3 w-16" /></th>
                        <th className="pb-3"><Skeleton className="h-3 w-14" /></th>
                    </tr>
                </thead>
                <tbody>
                    {Array.from({ length: rows }).map((_, i) => (
                        <SkeletonTableRow key={i} />
                    ))}
                </tbody>
            </table>
        </div>
    )
}

/**
 * Skeleton for credit card
 */
export function SkeletonCreditCard() {
    return (
        <div
            className="p-6 rounded-3xl relative overflow-hidden h-[240px] flex flex-col justify-between border-0"
            style={{ background: 'linear-gradient(135deg, rgba(30,58,138,0.5) 0%, rgba(23,37,84,0.5) 100%)' }}
        >
            <div className="flex justify-between items-start">
                <div>
                    <div className="flex gap-1 mb-4">
                        <Skeleton className="w-6 h-6" variant="circle" />
                        <Skeleton className="w-6 h-6 -ml-2" variant="circle" />
                    </div>
                    <Skeleton className="h-5 w-32" />
                </div>
                <Skeleton className="w-6 h-6" variant="circle" />
            </div>
            <div>
                <Skeleton className="h-3 w-24 mb-2" />
                <Skeleton className="h-8 w-40 mb-4" />
                <div className="flex gap-4">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-4 w-12" />
                </div>
            </div>
        </div>
    )
}

/**
 * Skeleton for saving plan items
 */
export function SkeletonSavingPlan() {
    return (
        <div className="glass-card p-6 rounded-2xl border border-white/5">
            <div className="flex justify-between items-center mb-6">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-16" />
            </div>
            <Skeleton className="h-3 w-20 mb-1" />
            <Skeleton className="h-8 w-28 mb-6" />
            <div className="space-y-6">
                {Array.from({ length: 3 }).map((_, i) => (
                    <div key={i}>
                        <div className="flex justify-between items-center mb-2">
                            <div className="flex items-center gap-3">
                                <Skeleton className="w-8 h-8" variant="rounded" />
                                <div>
                                    <Skeleton className="h-3 w-24 mb-1" />
                                    <Skeleton className="h-2 w-16" />
                                </div>
                            </div>
                            <Skeleton className="h-3 w-12" />
                        </div>
                        <Skeleton className="h-1.5 w-full" variant="rounded" />
                    </div>
                ))}
            </div>
        </div>
    )
}

/**
 * Full dashboard skeleton for initial page load
 */
export function DashboardSkeleton() {
    return (
        <div className="space-y-6 max-w-[1920px] mx-auto overflow-hidden animate-in fade-in duration-300">
            {/* Header */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                <Skeleton className="h-8 w-32" />
                <div className="flex items-center gap-4">
                    <Skeleton className="h-10 w-64" variant="rounded" />
                    <Skeleton className="w-10 h-10" variant="circle" />
                    <div className="flex items-center gap-2">
                        <Skeleton className="w-9 h-9" variant="circle" />
                        <Skeleton className="h-4 w-28" />
                    </div>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-12 gap-4">
                {/* Left Column */}
                <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
                    <SkeletonCreditCard />
                    <div className="flex justify-between px-2 py-2 gap-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className="flex flex-col items-center gap-3">
                                <Skeleton className="w-14 h-14" variant="circle" />
                                <Skeleton className="h-2 w-12" />
                            </div>
                        ))}
                    </div>
                    <SkeletonCard />
                    <SkeletonSavingPlan />
                </div>

                {/* Middle Column */}
                <div className="col-span-12 lg:col-span-6 flex flex-col gap-4">
                    <div className="grid grid-cols-3 gap-4">
                        {Array.from({ length: 3 }).map((_, i) => (
                            <SkeletonCard key={i} />
                        ))}
                    </div>
                    <SkeletonChart height={240} />
                    <SkeletonTable rows={4} />
                </div>

                {/* Right Column */}
                <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
                    <SkeletonCard className="h-[350px]" />
                    <SkeletonCard className="flex-1" />
                </div>
            </div>
        </div>
    )
}
