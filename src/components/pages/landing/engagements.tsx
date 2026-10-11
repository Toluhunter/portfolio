"use client";
import { useEffect, useState } from "react";
import { SectionHeading } from "@/components/utilities/shared/ui"
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
        <section id="engagements" className="py-20 md:py-28">
            <div className="container mx-auto px-5 md:px-8">
                <SectionHeading eyebrow="client work" title="Client engagements" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
