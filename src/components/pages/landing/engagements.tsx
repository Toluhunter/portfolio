import { Title } from "@/components/utilities/shared/title"
import { EngagementCard, Engagement } from "@/components/utilities/landingpage/engagement/engagement-card"
import engagementsData from "@/data/engagements.json";

const engagements = engagementsData as Engagement[];

export const EngagementsSection = () => {
    return (
        <section id="engagements" className="relative flex flex-col items-center py-12">
            <div className="relative flex flex-col container px-4 md:px-8">
                <Title text="Client Engagements" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {engagements.map((engagement) => (
                        <EngagementCard key={engagement.title} engagement={engagement} />
                    ))}
                </div>
            </div>
        </section>
    );
};
