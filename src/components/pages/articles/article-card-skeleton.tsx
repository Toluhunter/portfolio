export const ArticleCardSkeleton = () => {
    return (
        <div className="rounded-2xl border border-foreground/10 bg-panel overflow-hidden">
            <div className="w-full h-56 bg-foreground/10 animate-pulse"></div>
            <div className="p-5 space-y-2">
                <div className="h-6 w-3/4 bg-foreground/10 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-foreground/10 rounded animate-pulse"></div>
                <div className="h-4 w-5/6 bg-foreground/10 rounded animate-pulse"></div>
            </div>
        </div>
    );
};

export const FeaturedArticleCardSkeleton = () => {
    return (
        <div className="rounded-2xl border border-foreground/10 bg-panel overflow-hidden flex flex-col lg:flex-row">
            <div className="w-full lg:w-[45%] h-64 lg:h-80 bg-foreground/10 animate-pulse shrink-0"></div>
            <div className="p-6 lg:p-8 flex-1 flex flex-col justify-center gap-4">
                <div className="h-3 w-20 bg-foreground/10 rounded animate-pulse"></div>
                <div className="h-8 w-full bg-foreground/10 rounded animate-pulse"></div>
                <div className="h-8 w-4/5 bg-foreground/10 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-foreground/10 rounded animate-pulse"></div>
                <div className="h-4 w-5/6 bg-foreground/10 rounded animate-pulse"></div>
                <div className="h-5 w-28 bg-foreground/10 rounded animate-pulse mt-2"></div>
            </div>
        </div>
    );
};
