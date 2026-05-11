'use client';

import { Title } from "@/components/utilities/shared/title";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { services } from "@/data/content.json";

const ServiceCard = ({ service }: { service: typeof services[0] }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div
            className="flex flex-col items-center justify-between p-8 bg-background rounded-xl shadow-xl border border-gray-700 hover:border-callout transition-all duration-300 transform hover:scale-105 group"
        >
            <div className="relative w-[18.75rem] h-[12.5rem] mb-4">
                {isLoading && (
                    <div className="absolute inset-0 bg-gray-700 rounded-lg animate-pulse"></div>
                )}
                <Image
                    src={service.imageUrl}
                    alt={service.name}
                    fill
                    sizes="300px"
                    className={`rounded-lg object-cover transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                    onLoad={() => setIsLoading(false)}
                />
            </div>
            <span className="font-bold text-xl text-center text-foreground group-hover:text-white transition-colors duration-300 mb-4">{service.name}</span>
            <p className="text-center text-muted-foreground mb-4 flex-grow">{service.description}</p>
            <Link
                href="/book"
                className="mt-auto px-6 py-2 border border-callout text-foreground font-bold rounded-lg hover:bg-callout hover:text-white transition-all duration-300 ease-in-out"
            >
                Schedule a Call
            </Link>
        </div>
    );
};

export const ServicesSection = () => {
    return (
        <section
            id="services"
            className="flex flex-col items-center min-h-[64rem] w-full overflow-hidden relative py-5"
        >
            <div className="relative w-full h-full container mx-auto px-4">
                <Title text="Services" />
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
                    {services.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
            </div>
        </section>
    );
};
