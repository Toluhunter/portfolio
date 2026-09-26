"use client";
import { useEffect, useState } from "react";
import { Title } from "@/components/utilities/shared/title";
import Link from "next/link";
import { serviceIcons, Service } from "@/components/utilities/shared/service-icon";

const ServiceTile = ({ service }: { service: Service }) => {
    const IconComponent = serviceIcons[service.icon];

    return (
        <Link
            href={`/services#${service.id}`}
            className="flex flex-col items-center gap-4 p-6 border border-foreground/20 rounded-xl text-center hover:border-callout transition-colors duration-300"
        >
            <div className="flex items-center justify-center w-14 h-14 rounded-lg border border-foreground/30 text-callout">
                <IconComponent size={26} />
            </div>
            <span className="font-bold text-foreground">{service.name}</span>
        </Link>
    );
};

export const ServicesSection = () => {
    const [services, setServices] = useState<Service[]>([]);

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
            }
        };

        fetchServices();
    }, []);

    return (
        <section
            id="services"
            className="flex flex-col items-center w-full py-12"
        >
            <div className="relative w-full container mx-auto px-4">
                <Title text="Services" link="/services" hasMore={true} />
                <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl mx-auto">
                    {services.map((service) => (
                        <ServiceTile key={service.id} service={service} />
                    ))}
                </div>
                <div className="flex justify-center mt-10">
                    <Link
                        href="/book"
                        className="px-8 py-3 border-2 border-callout text-foreground font-bold rounded-lg hover:bg-callout hover:text-on-callout transition-all duration-300 ease-in-out"
                    >
                        Book a Call
                    </Link>
                </div>
            </div>
        </section>
    );
};
