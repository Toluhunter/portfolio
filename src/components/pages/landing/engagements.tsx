"use client";
import { useEffect, useState } from "react";
import { SectionHeading } from "@/components/utilities/shared/ui"
import { EngagementCard, Engagement } from "@/components/utilities/landingpage/engagement/engagement-card"
import { EngagementCardSkeleton } from "@/components/utilities/shared/skeletons"
import type { ApiEngagement, EngagementsResponse } from "@/types/api"

export const EngagementsSection = () => {
    const [engagements, setEngagements] = useState<Engagement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEngagements = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/engagements`);
                const data: EngagementsResponse = await res.json();
                const fetched = data.engagements || [];
                setEngagements(fetched.map((e: ApiEngagement) => ({
                    title: e.title,
                    subtitle: e.subtitle,
                    // The API sends a plain string; the seed data only uses names the card knows.
                    icon: e.icon as Engagement["icon"],
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
        <section id="engagements" className="py-24 md:py-32">
            <div className="container mx-auto px-5 md:px-8">
                <SectionHeading title="Client engagements" />

                <div className="flex flex-col border-b border-foreground/10">
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
