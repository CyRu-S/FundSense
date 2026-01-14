import { cn } from '@/utils/helpers'
import { Button } from './button'
import type { LucideIcon } from 'lucide-react'
import { Search, FileX, Inbox, AlertCircle, TrendingUp, Wallet } from 'lucide-react'

interface EmptyStateProps {
    /** Icon to display */
    icon?: LucideIcon
    /** Main title */
    title: string
    /** Description text */
    description: string
    /** Primary action button */
    action?: {
        label: string
        onClick: () => void
    }
    /** Secondary action link */
    secondaryAction?: {
        label: string
        onClick: () => void
    }
    /** Size variant */
    size?: 'sm' | 'md' | 'lg'
    /** Additional class names */
    className?: string
}

/**
 * Reusable empty state component with visual appeal and CTAs
 * Matches the glassmorphism design system
 */
export function EmptyState({
    icon: Icon = FileX,
    title,
    description,
    action,
    secondaryAction,
    size = 'md',
    className,
}: EmptyStateProps) {
    const sizes = {
        sm: {
            icon: 'w-12 h-12',
            iconWrapper: 'w-20 h-20',
            title: 'text-lg',
            description: 'text-xs',
            padding: 'py-8',
        },
        md: {
            icon: 'w-16 h-16',
            iconWrapper: 'w-28 h-28',
            title: 'text-xl',
            description: 'text-sm',
            padding: 'py-12',
        },
        lg: {
            icon: 'w-20 h-20',
            iconWrapper: 'w-36 h-36',
            title: 'text-2xl',
            description: 'text-base',
            padding: 'py-16',
        },
    }

    const sizeStyles = sizes[size]

    return (
        <div
            className={cn(
                'flex flex-col items-center justify-center text-center fade-up',
                sizeStyles.padding,
                className
            )}
        >
            {/* Icon container with subtle glow */}
            <div
                className={cn(
                    'rounded-full bg-gradient-to-b from-white/10 to-white/5',
                    'border border-white/10 flex items-center justify-center mb-6',
                    'shadow-[0_0_40px_rgba(59,130,246,0.1)]',
                    sizeStyles.iconWrapper
                )}
            >
                <Icon className={cn('text-slate-500', sizeStyles.icon)} />
            </div>

            {/* Title */}
            <h3
                className={cn(
                    'font-semibold text-white mb-2',
                    sizeStyles.title
                )}
            >
                {title}
            </h3>

            {/* Description */}
            <p
                className={cn(
                    'text-slate-400 max-w-md mb-6',
                    sizeStyles.description
                )}
            >
                {description}
            </p>

            {/* Actions */}
            {(action || secondaryAction) && (
                <div className="flex items-center gap-4">
                    {action && (
                        <Button
                            onClick={action.onClick}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6"
                        >
                            {action.label}
                        </Button>
                    )}
                    {secondaryAction && (
                        <button
                            onClick={secondaryAction.onClick}
                            className="text-sm text-blue-400 hover:text-blue-300 transition-colors underline-offset-4 hover:underline"
                        >
                            {secondaryAction.label}
                        </button>
                    )}
                </div>
            )}
        </div>
    )
}

// Pre-configured empty states for common use cases

export function EmptySearchResults({
    query,
    onClear
}: {
    query?: string
    onClear?: () => void
}) {
    return (
        <EmptyState
            icon={Search}
            title="No results found"
            description={
                query
                    ? `We couldn't find anything matching "${query}". Try adjusting your search or filters.`
                    : "Try adjusting your search or filters to find what you're looking for."
            }
            action={onClear ? { label: 'Clear Search', onClick: onClear } : undefined}
        />
    )
}

export function EmptyTransactions({ onAdd }: { onAdd?: () => void }) {
    return (
        <EmptyState
            icon={Wallet}
            title="No transactions yet"
            description="Your transaction history will appear here once you make your first payment or investment."
            action={onAdd ? { label: 'Add Transaction', onClick: onAdd } : undefined}
        />
    )
}

export function EmptyInvestments({ onExplore }: { onExplore?: () => void }) {
    return (
        <EmptyState
            icon={TrendingUp}
            title="No investments yet"
            description="Start your investment journey by exploring our curated selection of top-performing mutual funds."
            action={onExplore ? { label: 'Explore Funds', onClick: onExplore } : undefined}
        />
    )
}

export function EmptyInbox({ onCheckLater }: { onCheckLater?: () => void }) {
    return (
        <EmptyState
            icon={Inbox}
            title="Inbox zero!"
            description="You're all caught up. New notifications and messages will appear here."
            size="sm"
        />
    )
}

export function ErrorState({
    onRetry
}: {
    onRetry?: () => void
}) {
    return (
        <EmptyState
            icon={AlertCircle}
            title="Something went wrong"
            description="We encountered an error while loading. Please try again."
            action={onRetry ? { label: 'Try Again', onClick: onRetry } : undefined}
        />
    )
}
