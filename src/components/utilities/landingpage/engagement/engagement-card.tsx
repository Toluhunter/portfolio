import { FaLandmark, FaStore } from "react-icons/fa";
import { Beat, CaseStudy } from "@/components/utilities/shared/beat";
import { StatList, card, cardHover } from "@/components/utilities/shared/ui";

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

export const EngagementCard = ({ engagement }: { engagement: Engagement }) => {
    const { caseStudy } = engagement;
    const IconComponent = icons[engagement.icon];

    return (
        <div className={`${card} ${cardHover} flex flex-col gap-6 p-6 md:p-8 text-left`}>
            <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 flex-shrink-0 rounded-xl bg-callout/10 text-callout">
                    <IconComponent size={22} aria-hidden />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-foreground">{engagement.title}</h3>
                    <p className="text-sm text-muted">{engagement.subtitle}</p>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <Beat label="the problem" text={caseStudy.problem} />
                <Beat label="what i built" text={caseStudy.built} />
                <Beat label="the result" text={caseStudy.result} />
            </div>

            {caseStudy.stats && caseStudy.stats.length > 0 && (
                <div className="pt-6 border-t border-foreground/10">
                    <StatList stats={caseStudy.stats} />
                </div>
            )}
        </div>
    );
};
