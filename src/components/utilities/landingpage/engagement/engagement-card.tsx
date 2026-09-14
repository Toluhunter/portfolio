import { FaLandmark, FaStore } from "react-icons/fa";
import { Beat, CaseStudy } from "@/components/utilities/shared/beat";

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
        <div className="flex flex-col gap-6 p-6 md:p-8 border border-foreground/20 rounded-xl text-left">
            <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-14 h-14 flex-shrink-0 rounded-lg border border-foreground/30 text-callout">
                    <IconComponent size={26} />
                </div>
                <div>
                    <h3 className="text-xl font-bold text-foreground">{engagement.title}</h3>
                    <p className="text-sm text-foreground/60">{engagement.subtitle}</p>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                <Beat label="the problem" text={caseStudy.problem} />
                <Beat label="what i built" text={caseStudy.built} />
                <Beat label="the result" text={caseStudy.result} />
            </div>

            {caseStudy.stats && caseStudy.stats.length > 0 && (
                <div className="flex flex-wrap gap-4">
                    {caseStudy.stats.map((stat) => (
                        <div key={stat.label} className="flex flex-col gap-1 px-5 py-3 border border-foreground/20 rounded-lg">
                            <span className="font-fira-code text-2xl font-bold text-callout">{stat.value}</span>
                            <span className="text-xs text-foreground/60 uppercase tracking-wide">{stat.label}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};
