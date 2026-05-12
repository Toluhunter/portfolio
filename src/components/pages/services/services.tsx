'use client';

import { services } from "@/data/content.json";
import { ServiceCard } from "./service-card";

export const ServicesPageSection = () => {
    return (
        <section className="min-h-screen pt-24 pb-16 px-4 md:px-8 lg:px-16 container mx-auto">
            <div className="flex flex-col gap-2 mb-12">
                <span className="text-xs font-semibold uppercase tracking-widest text-foreground/40">What I Offer</span>
                <h1 className="text-5xl md:text-6xl font-bold font-fira-code text-foreground">Services</h1>
                <p className="text-lg text-foreground/60 mt-1">Specialized cloud and engineering services, available for hire.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto py-10">
                {services.map((service) => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </div>
        </section>
    );
};