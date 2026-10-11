'use client';

// Status reads from the label and the dot shape together, never from color alone.
export const StatusBadge = ({ status }: { status: string }) => {
    const isActive = status.toLowerCase().includes('progress') || status.toLowerCase().includes('live');
    return (
        <span className={`inline-flex items-center gap-2 font-fira-code text-sm px-3 py-1 rounded-full border w-fit ${isActive
                ? 'border-green-700/30 dark:border-green-400/30 text-green-800 dark:text-green-400 bg-green-700/10 dark:bg-green-400/10'
                : 'border-foreground/15 text-muted bg-foreground/5'
            }`}>
            <span aria-hidden className={`w-2 h-2 rounded-full flex-shrink-0 ${isActive ? 'bg-green-600 dark:bg-green-400' : 'border border-foreground/40'}`} />
            {status}
        </span>
    );
};
