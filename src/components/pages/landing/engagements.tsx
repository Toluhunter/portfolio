"use client";
import { useEffect, useState } from "react";
import { Title } from "@/components/utilities/shared/title"
import { EngagementCard, Engagement } from "@/components/utilities/landingpage/engagement/engagement-card"
import { EngagementCardSkeleton } from "@/components/utilities/shared/skeletons"

export const EngagementsSection = () => {
    const [engagements, setEngagements] = useState<Engagement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEngagements = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/engagements`);
                const data = await res.json();
                const fetched = data.engagements || [];
                setEngagements(fetched.map((e: any) => ({
                    title: e.title,
                    subtitle: e.subtitle,
                    icon: e.icon,
                    caseStudy: e.case_study,
                })));
            } catch (error) {
                console.error("Failed to fetch engagements:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEngagements();
    }, []);

    if (!loading && engagements.length === 0) return null;

    return (
        <section id="engagements" className="relative flex flex-col items-center py-12">
            <div className="relative flex flex-col container px-4 md:px-8">
                <Title text="Client Engagements" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {loading && [0, 1].map((i) => (
                        <EngagementCardSkeleton key={`skeleton-${i}`} />
                    ))}
                    {engagements.map((engagement) => (
                        <EngagementCard key={engagement.title} engagement={engagement} />
                    ))}
                </div>
            </div>
        </section>
    );
};
