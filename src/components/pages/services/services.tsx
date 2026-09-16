'use client';

import { Fragment } from "react";
import { FaArrowRight, FaArrowDown } from "react-icons/fa";
import services from "@/data/services.json";
import { ServiceCard } from "./service-card";
import { PricingSection } from "./pricing";
import { Service } from "@/components/utilities/shared/service-icon";

const steps = [
    { label: "Book a call", description: "Talk through what's actually going on, no obligation." },
    { label: "Scope", description: "I figure out exactly what needs to happen." },
    { label: "Quote", description: "A fixed quote before any work starts." },
    { label: "Build", description: "I build it, fix it, or migrate it, and hand off clean documentation." },
];

export const ServicesPageSection = () => {
    return (
        <section className="min-h-screen pt-24 pb-16 px-4 md:px-8 lg:px-16 container mx-auto">
            <div className="flex flex-col gap-2 mb-16 max-w-3xl">
                <span className="text-xs font-semibold uppercase tracking-widest text-foreground/80">What I Offer</span>
                <h1 className="text-5xl md:text-6xl font-bold font-fira-code text-foreground">Services</h1>
                <p className="text-lg text-foreground/80 mt-3">
                    From capacity planning to rate limits and security guardrails, I help you design a system that fits your reality, not a textbook or copy-pasted solution.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-start gap-8 lg:gap-6 mb-20 max-w-6xl">
                {steps.map((step, i) => (
                    <Fragment key={step.label}>
                        <div className="flex flex-col gap-2 lg:flex-1">
                            <span className="font-fira-code text-callout text-sm">0{i + 1}</span>
                            <h3 className="font-bold text-lg text-foreground">{step.label}</h3>
                            <p className="text-sm text-foreground/70">{step.description}</p>
                        </div>
                        {i < steps.length - 1 && (
                            <div className="flex items-center justify-center text-foreground/30 flex-shrink-0">
                                <FaArrowDown className="lg:hidden" size={18} />
                                <FaArrowRight className="hidden lg:block mt-1" size={18} />
                            </div>
                        )}
                    </Fragment>
                ))}
            </div>

            <PricingSection />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
                {(services as Service[]).map((service) => (
                    <ServiceCard key={service.id} service={service} />
                ))}
            </div>
        </section>
    );
};
