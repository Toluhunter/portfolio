'use client';

import { services } from "@/data/content.json";
import { Title } from "@/components/utilities/shared/title";
import { ServiceCard } from "./service-card";

export const ServicesPageSection = () => {
    return (
        <section className="min-h-screen py-25">
             <Title text="My Services" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto py-10">
                {services.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </div>
        </section>
    );
};