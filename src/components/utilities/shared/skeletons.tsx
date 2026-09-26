const Bar = ({ className = "" }: { className?: string }) => (
    <div className={`bg-foreground/10 rounded animate-pulse ${className}`} />
);

export const CertificationCardSkeleton = () => (
    <div aria-hidden="true" className="flex gap-4 items-start p-4 rounded-lg bg-panel border border-foreground/15">
        <Bar className="w-16 h-16 flex-shrink-0 rounded-md" />
        <div className="flex-1 space-y-2 pt-1">
            <Bar className="h-4 w-4/5" />
            <Bar className="h-3 w-3/5" />
            <Bar className="h-3 w-2/5" />
        </div>
    </div>
);

export const LandingCertificationsSkeleton = () => (
    <div aria-hidden="true" className="flex gap-4 overflow-hidden px-4 py-4">
        {[0, 1, 2, 3].map((i) => (
            <Bar key={i} className="w-80 h-44 shrink-0 rounded-xl" />
        ))}
    </div>
);

export const TimelineEntrySkeleton = () => (
    <div aria-hidden="true" className="flex gap-6 pb-12 last:pb-0">
        <div className="flex-shrink-0 mt-1 z-10">
            <div className="w-6 h-6 rounded-full border-2 border-foreground/30 bg-background" />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <Bar className="w-16 h-16 flex-shrink-0 rounded-md" />
            <div className="flex flex-col gap-3 flex-1">
                <div className="space-y-2">
                    <Bar className="h-6 w-1/2" />
                    <Bar className="h-4 w-1/3" />
                    <Bar className="h-3 w-1/4" />
                </div>
                <div className="space-y-2">
                    <Bar className="h-4 w-full max-w-2xl" />
                    <Bar className="h-4 w-11/12 max-w-2xl" />
                    <Bar className="h-4 w-4/5 max-w-2xl" />
                </div>
            </div>
        </div>
    </div>
);

export const EducationCardSkeleton = () => (
    <div aria-hidden="true" className="flex lg:flex-row flex-col gap-5 md:gap-0 items-start mb-8">
        <Bar className="w-20 h-20 mr-6 flex-shrink-0 rounded-md" />
        <div className="w-full space-y-3">
            <Bar className="h-7 w-2/3" />
            <Bar className="h-5 w-1/2" />
            <Bar className="h-4 w-1/4" />
        </div>
    </div>
);

export const ProjectListingSkeleton = ({ reverse = false }: { reverse?: boolean }) => (
    <div aria-hidden="true" className={`flex flex-col gap-8 lg:gap-12 items-start ${reverse ? "lg:flex-row-reverse" : "lg:flex-row"}`}>
        <div className="flex flex-col gap-4 w-full lg:w-1/2">
            <Bar className="h-4 w-24" />
            <Bar className="h-10 w-2/3" />
            <Bar className="h-5 w-4/5" />
            <div className="space-y-2 pt-2">
                <Bar className="h-4 w-full" />
                <Bar className="h-4 w-11/12" />
                <Bar className="h-4 w-5/6" />
            </div>
            <div className="flex gap-3 pt-2">
                <Bar className="h-16 w-32 rounded-lg" />
                <Bar className="h-16 w-32 rounded-lg" />
            </div>
        </div>
        <Bar className="w-full lg:w-1/2 aspect-video rounded-xl" />
    </div>
);

export const ProjectCardSkeleton = () => (
    <div aria-hidden="true" className="flex flex-col gap-8">
        <Bar className="h-7 w-24 rounded-full" />
        <div className="flex flex-col lg:flex-row lg:gap-12 items-start gap-8">
            <div className="flex flex-col gap-6 w-full lg:w-[55%]">
                <div className="space-y-3">
                    <Bar className="h-12 w-3/4" />
                    <Bar className="h-6 w-2/3" />
                </div>
                <div className="space-y-2">
                    <Bar className="h-4 w-full" />
                    <Bar className="h-4 w-11/12" />
                    <Bar className="h-4 w-full" />
                    <Bar className="h-4 w-4/5" />
                </div>
                <Bar className="h-10 w-40 rounded-lg" />
            </div>
            <Bar className="w-full lg:w-[45%] aspect-video rounded-xl" />
        </div>
    </div>
);

export const EngagementCardSkeleton = () => (
    <div aria-hidden="true" className="flex flex-col gap-6 p-6 md:p-8 bg-panel border border-foreground/15 rounded-xl">
        <div className="flex items-center gap-4">
            <Bar className="w-14 h-14 flex-shrink-0 rounded-lg" />
            <div className="flex-1 space-y-2">
                <Bar className="h-5 w-2/3" />
                <Bar className="h-4 w-1/2" />
            </div>
        </div>
        {[0, 1, 2].map((i) => (
            <div key={i} className="space-y-2">
                <Bar className="h-3 w-20" />
                <Bar className="h-4 w-full" />
                <Bar className="h-4 w-5/6" />
            </div>
        ))}
    </div>
);

export const ServiceTileSkeleton = () => (
    <div aria-hidden="true" className="flex flex-col items-center gap-4 p-6 bg-panel border border-foreground/15 rounded-xl">
        <Bar className="w-14 h-14 rounded-lg" />
        <Bar className="h-4 w-2/3" />
    </div>
);

export const ServiceCardSkeleton = () => (
    <div aria-hidden="true" className="flex flex-col gap-5 p-6 md:p-8 bg-panel border border-foreground/15 rounded-xl">
        <div className="flex items-center gap-4">
            <Bar className="w-12 h-12 flex-shrink-0 rounded-lg" />
            <Bar className="h-6 w-1/2" />
        </div>
        <div className="space-y-2">
            <Bar className="h-4 w-full" />
            <Bar className="h-4 w-4/5" />
        </div>
        <div className="space-y-2">
            <Bar className="h-4 w-11/12" />
            <Bar className="h-4 w-3/4" />
            <Bar className="h-4 w-5/6" />
        </div>
        <Bar className="h-11 w-32 rounded-lg" />
    </div>
);

export const PricingTierSkeleton = () => (
    <div aria-hidden="true" className="bg-panel border border-foreground/15 rounded-xl p-6 md:p-8">
        <div className="mb-6 space-y-2">
            <Bar className="h-6 w-32" />
            <Bar className="h-4 w-2/3" />
            <Bar className="h-4 w-1/2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            {[0, 1].map((c) => (
                <div key={c} className="space-y-3">
                    <Bar className="h-3 w-20" />
                    <Bar className="h-4 w-11/12" />
                    <Bar className="h-4 w-3/4" />
                    <Bar className="h-4 w-5/6" />
                </div>
            ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[0, 1, 2].map((b) => (
                <Bar key={b} className="h-20 rounded-lg" />
            ))}
        </div>
    </div>
);
