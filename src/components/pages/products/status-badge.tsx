'use client';

export const StatusBadge = ({ status }: { status: string }) => {
    const isActive = status.toLowerCase().includes('progress') || status.toLowerCase().includes('live');
    return (
        <span className={`inline-flex items-center gap-2 text-sm px-3 py-1 rounded-full border w-fit ${isActive
                ? 'border-green-700/40 dark:border-green-500/40 text-green-700 dark:text-green-400 bg-green-700/10 dark:bg-green-500/10'
                : 'border-foreground/20 text-foreground/80 bg-foreground/5'
            }`}>
            <span className={`w-2 h-2 rounded-full flex-shrink-0 ${isActive ? 'bg-green-600 dark:bg-green-400' : 'bg-foreground/40'}`} />
            {status}
        </span>
    );
};