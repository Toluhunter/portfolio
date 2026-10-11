import { FaLandmark, FaStore } from "react-icons/fa";
import { Beat, CaseStudy } from "@/components/utilities/shared/beat";
import { StatList } from "@/components/utilities/shared/ui";

const icons = {
    landmark: FaLandmark,
    store: FaStore,
} as const;

export interface Engagement {
    title: string;
    subtitle: string;
    icon: keyof typeof icons;
    caseStudy: CaseStudy;
}

// Full-width row: who and what it achieved on the left, the story read across on the right.
export const EngagementCard = ({ engagement }: { engagement: Engagement }) => {
    const { caseStudy } = engagement;
    const IconComponent = icons[engagement.icon];

    return (
        <article className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 py-12 border-t border-foreground/10">
            <div className="lg:col-span-4 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 flex-shrink-0 rounded-xl bg-callout/10 text-callout">
                        <IconComponent size={22} aria-hidden />
                    </div>
                    <div>
                        <h3 className="text-2xl font-bold tracking-tight text-foreground">{engagement.title}</h3>
                        <p className="text-muted">{engagement.subtitle}</p>
                    </div>
                </div>
                {caseStudy.stats && caseStudy.stats.length > 0 && <StatList stats={caseStudy.stats} />}
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <Beat label="the problem" text={caseStudy.problem} />
                <Beat label="what i built" text={caseStudy.built} />
                <Beat label="the result" text={caseStudy.result} />
            </div>
        </article>
    );
};
