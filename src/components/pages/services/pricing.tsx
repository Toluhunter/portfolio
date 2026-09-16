import Link from "next/link";
import { ReactNode } from "react";
import { FaCheck, FaPlus } from "react-icons/fa";
import pricingData from "@/data/pricing.json";

const PriceBox = ({ label, value }: { label: string; value: string }) => (
    <div className="flex flex-col gap-1 px-4 py-3 border border-foreground/20 rounded-lg">
        <span className="text-xs text-foreground/60 uppercase tracking-wide">{label}</span>
        <span className="font-fira-code text-xl font-bold text-callout">{value}</span>
    </div>
);

const FeatureList = ({ title, icon, items }: { title: string; icon: ReactNode; items: string[] }) => (
    <div className="flex flex-col gap-3">
        <h4 className="text-xs font-semibold uppercase tracking-widest text-foreground/60">{title}</h4>
        <ul className="flex flex-col gap-2">
            {items.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-foreground/90">
                    <span className="mt-0.5 flex-shrink-0 text-callout">{icon}</span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    </div>
);

export const PricingSection = () => {
    return (
        <div className="mb-20 max-w-6xl">
            <h2 className="text-2xl font-bold text-foreground mb-3">Pricing</h2>
            <p className="text-foreground/80 max-w-2xl mb-10">{pricingData.intro}</p>

            <div className="flex flex-col gap-6">
                {pricingData.tiers.map((tier) => (
                    <div key={tier.name} className="border border-foreground/20 rounded-xl p-6 md:p-8">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-foreground">{tier.name}</h3>
                            <p className="text-foreground/90 mt-1">{tier.description}</p>
                            <p className="text-foreground/60 italic text-sm mt-1">{tier.comparison}</p>
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

            <p className="text-sm text-foreground/60 mt-6">
                Not sure which tier fits? <Link href="/book" className="text-callout hover:underline">Book a free call</Link> and we will figure it out together.
            </p>
        </div>
    );
};
