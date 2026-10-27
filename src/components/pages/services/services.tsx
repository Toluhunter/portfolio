'use client';

import { useEffect, useState } from "react";
import { ServiceCard } from "./service-card";
import { PricingSection } from "./pricing";
import { Service } from "@/components/utilities/shared/service-icon";
import { ServiceCardSkeleton } from "@/components/utilities/shared/skeletons";
import type { ApiService, ServicesResponse } from "@/types/api";
import Link from "next/link";
import { BOOK_LABEL, PageHeader, SectionHeading, btnPrimary } from "@/components/utilities/shared/ui";

const steps = [
    { label: "Book a call", description: "Talk through what's actually going on, no obligation." },
    { label: "Scope", description: "I figure out exactly what needs to happen." },
    { label: "Quote", description: "A fixed quote before any work starts." },
    { label: "Build", description: "I build it, fix it, or migrate it, and hand off clean documentation." },
];

export const ServicesPageSection = () => {
    const [services, setServices] = useState<Service[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/services`);
                const data: ServicesResponse = await res.json();
                const fetched = data.services || [];
                setServices(fetched.map((s: ApiService) => ({
                    id: s.id,
                    name: s.name,
                    // The API sends a plain string; the seed data only uses names the icon map knows.
                    icon: s.icon as Service["icon"],
                    hook: s.hook,
                    includes: s.includes,
                    caseStudyLink: s.case_study_link,
                })));
            } catch (error) {
                console.error("Failed to fetch services:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchServices();
    }, []);

    return (
        <section className="min-h-screen pt-32 pb-28 px-5 md:px-8 container mx-auto">
            <PageHeader
                eyebrow="what I offer"
                title="Services"
                lede="From capacity planning to rate limits and security guardrails, I help you design a system that fits your reality, not a textbook or copy-pasted solution."
                aside={
                    // How an engagement runs: a real sequence, so the steps are numbered
                    <ol className="flex flex-col">
                        {steps.map((step, i) => (
                            <li key={step.label} className="grid grid-cols-[2.5rem_1fr] gap-x-2 py-4 border-t border-foreground/10 last:border-b">
                                <span className="font-fira-code text-sm text-callout pt-0.5">0{i + 1}</span>
                                <div>
                                    <h2 className="font-bold text-foreground">{step.label}</h2>
                                    <p className="text-muted leading-relaxed">{step.description}</p>
                                </div>
                            </li>
                        ))}
                    </ol>
                }
            >
                <Link href="/book" className={`${btnPrimary} mt-2`}>{BOOK_LABEL}</Link>
            </PageHeader>

            <div className="mb-24 md:mb-32">
                <SectionHeading title="What I can take off your plate" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16">
                    {loading && [0, 1, 2, 3].map((i) => (
                        <ServiceCardSkeleton key={`skeleton-${i}`} />
                    ))}
                    {services.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
            </div>

            <PricingSection />
        </section>
    );
};
