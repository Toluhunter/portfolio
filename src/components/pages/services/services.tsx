'use client';

import { useEffect, useState } from "react";
import { ServiceCard } from "./service-card";
import { PricingSection } from "./pricing";
import { Service } from "@/components/utilities/shared/service-icon";
import { ServiceCardSkeleton } from "@/components/utilities/shared/skeletons";
import { PageHeader, SectionHeading, card } from "@/components/utilities/shared/ui";

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
                const data = await res.json();
                const fetched = data.services || [];
                setServices(fetched.map((s: any) => ({
                    id: s.id,
                    name: s.name,
                    icon: s.icon,
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
            />

            {/* How an engagement runs: a real sequence, so the steps are numbered */}
            <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-24 md:mb-32">
                {steps.map((step, i) => (
                    <li key={step.label} className={`${card} flex flex-col gap-2 p-6`}>
                        <span className="font-fira-code text-sm text-callout">0{i + 1}</span>
                        <h3 className="font-bold text-lg text-foreground">{step.label}</h3>
                        <p className="text-muted leading-relaxed">{step.description}</p>
                    </li>
                ))}
            </ol>

            <div className="mb-24 md:mb-32">
                <SectionHeading eyebrow="services" title="What I can take off your plate" />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
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
