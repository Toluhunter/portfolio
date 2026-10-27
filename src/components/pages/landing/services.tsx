"use client";
import { useEffect, useState } from "react";
import { BOOK_LABEL, btnPrimary, textLink } from "@/components/utilities/shared/ui";
import Link from "next/link";
import { serviceIcons, Service } from "@/components/utilities/shared/service-icon";
import { ServiceTileSkeleton } from "@/components/utilities/shared/skeletons";
import type { ApiService, ServicesResponse } from "@/types/api";

const ServiceRow = ({ service }: { service: Service }) => {
    const IconComponent = serviceIcons[service.icon];

    return (
        <Link
            href={`/services#${service.id}`}
            className="group flex gap-4 py-6 border-t border-foreground/10"
        >
            <IconComponent size={22} aria-hidden className="flex-shrink-0 mt-1 text-callout" />
            <div className="flex flex-col gap-1.5 min-w-0">
                <span className="text-lg font-bold text-foreground leading-snug group-hover:text-callout transition-colors duration-200">
                    {service.name}
                </span>
                {service.hook && <span className="text-muted leading-relaxed line-clamp-2">{service.hook}</span>}
            </div>
        </Link>
    );
};

export const ServicesSection = () => {
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
        <section id="services" className="w-full py-24 md:py-32">
            {/* Split: sticky intro on the left, the services themselves fill the right */}
            <div className="container mx-auto px-5 md:px-8 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                <div className="lg:col-span-4 lg:sticky lg:top-28 self-start flex flex-col gap-6">
                    <h2 className="text-3xl md:text-5xl font-bold text-foreground tracking-tight">
                        What I can take off your plate
                    </h2>
                    <p className="text-lg text-muted leading-relaxed">
                        I work with small teams shipping an AI or cloud product who don&apos;t have a platform team in place yet.
                    </p>
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                        <Link href="/book" className={btnPrimary}>{BOOK_LABEL}</Link>
                        <Link href="/services" className={`${textLink} font-semibold`}>All services &rarr;</Link>
                    </div>
                </div>
                <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-x-10">
                    {loading && Array.from({ length: 6 }, (_, i) => (
                        <ServiceTileSkeleton key={`skeleton-${i}`} />
                    ))}
                    {services.map((service) => (
                        <ServiceRow key={service.id} service={service} />
                    ))}
                </div>
            </div>
        </section>
    );
};
