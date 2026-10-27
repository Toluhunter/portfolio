"use client";
import Link from "next/link";
import { ReactNode, useEffect, useState } from "react";
import { FaCheck, FaPlus } from "react-icons/fa";
import { PricingTierSkeleton } from "@/components/utilities/shared/skeletons";
import { SectionHeading, card } from "@/components/utilities/shared/ui";
import type { ApiPricingTier, PricingResponse } from "@/types/api";

interface Tier {
    name: string;
    description: string;
    comparison: string;
    included: string[];
    addOns: string[];
    audit: string;
    project: string;
    retainer: string;
}

interface Pricing {
    intro: string;
    tiers: Tier[];
}

const PriceBox = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col gap-1 px-4 py-3 rounded-xl bg-foreground/[0.04]">
        <span className="text-sm text-muted">{label}</span>
        <span className="font-fira-code text-xl font-bold text-callout">{value}</span>
    </div>
);

const FeatureList = ({ title, icon, items }: { title: string; icon: ReactNode; items: string[] }) => (
    <div className="flex flex-col gap-3">
        <h4 className="font-fira-code text-sm text-faint">{title}</h4>
        <ul className="flex flex-col gap-2 prose-measure">
            {items.map((item) => (
                <li key={item} className="flex gap-3 text-muted leading-relaxed">
                    <span className="mt-0.5 flex-shrink-0 text-callout">{icon}</span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    </div>
);

export const PricingSection = () => {
    const [pricingData, setPricingData] = useState<Pricing | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPricing = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/pricing`);
                const data: PricingResponse = await res.json();
                setPricingData({
                    intro: data.intro,
                    tiers: (data.tiers || []).map((t: ApiPricingTier) => ({
                        name: t.name,
                        description: t.description,
                        comparison: t.comparison,
                        included: t.included,
                        addOns: t.add_ons,
                        audit: t.audit,
                        project: t.project,
                        retainer: t.retainer,
                    })),
                });
            } catch (error) {
                console.error("Failed to fetch pricing:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPricing();
    }, []);

    if (loading) {
        return (
            <div>
                <SectionHeading title="Pricing" />
                <div className="flex flex-col gap-5">
                    {[0, 1, 2].map((i) => (
                        <PricingTierSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    if (!pricingData) return null;

    return (
        <div>
            <SectionHeading title="Pricing" />
            <p className="text-lg text-muted leading-relaxed max-w-2xl -mt-4 mb-10">{pricingData.intro}</p>

            <div className="flex flex-col gap-5">
                {pricingData.tiers.map((tier) => (
                    <div key={tier.name} className={`${card} p-6 md:p-8`}>
                        <div className="mb-6">
                            <h3 className="text-2xl font-bold tracking-tight text-foreground">{tier.name}</h3>
                            <p className="text-foreground mt-2 prose-measure leading-relaxed">{tier.description}</p>
                            <p className="text-muted text-sm mt-1 prose-measure">{tier.comparison}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                            <FeatureList title="Included" icon={<FaCheck size={12} />} items={tier.included} />
                            {tier.addOns.length > 0 && (
                                <FeatureList title="Add-on" icon={<FaPlus size={12} />} items={tier.addOns} />
                            )}
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            <PriceBox label="Audit" value={tier.audit} />
                            <PriceBox label="Fixed-Scope Project" value={tier.project} />
                            <PriceBox label="Retainer" value={tier.retainer} />
                        </div>
                    </div>
                ))}
            </div>

            <p className="text-muted mt-8 prose-measure">
                Not sure which tier fits? <Link href="/book" className="text-callout hover:underline">Book a free call</Link> and we will figure it out together.
            </p>
        </div>
    );
};
