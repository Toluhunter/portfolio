"use client";
import { useEffect, useState } from "react";
import { SectionHeading, btnSecondary, card } from "@/components/utilities/shared/ui";
import Link from "next/link";
import { serviceIcons, Service } from "@/components/utilities/shared/service-icon";
import { ServiceTileSkeleton } from "@/components/utilities/shared/skeletons";

const ServiceTile = ({ service }: { service: Service }) => {
    const IconComponent = serviceIcons[service.icon];

    return (
        <Link
            href={`/services#${service.id}`}
            className={`${card} group flex flex-col items-start gap-5 p-6 hover:border-callout/60 transition-colors duration-300`}
        >
            <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-callout/10 text-callout">
                <IconComponent size={22} aria-hidden />
            </div>
            <span className="font-bold text-foreground leading-snug group-hover:text-callout transition-colors duration-200">{service.name}</span>
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
        <section
            id="services"
            className="w-full py-20 md:py-28"
        >
            <div className="container mx-auto px-5 md:px-8">
                <SectionHeading eyebrow="services" title="What I can take off your plate" link="/services" linkLabel="All services" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {loading && Array.from({ length: 8 }, (_, i) => (
                        <ServiceTileSkeleton key={`skeleton-${i}`} />
                    ))}
                    {services.map((service) => (
                        <ServiceTile key={service.id} service={service} />
                    ))}
                </div>
                <div className="mt-10">
                    <Link href="/book" className={btnSecondary}>
                        Book a Call
                    </Link>
                </div>
            </div>
        </section>
    );
};
