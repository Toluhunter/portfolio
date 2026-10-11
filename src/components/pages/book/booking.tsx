'use client'

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { FAQSection } from "./faq";
import { PageHeader, card } from "@/components/utilities/shared/ui";

// Facts a visitor wants before picking a slot, taken from the FAQ below.
const details = [
    { term: "30 minutes, no commitment", detail: "Long enough to talk through what you are building." },
    { term: "Any size of project", detail: "Audits and small fixes are as common as full migrations." },
    { term: "Based in Eastern Time", detail: "Calls happen whenever overlaps best for you." },
];

export const BookingSection = () => {
    useEffect(() => {
        (async function () {
            const cal = await getCalApi({ namespace: "discovery-call" });
            // Match the site: same appearance as the page, same accent as every other primary action.
            const isDark = document.documentElement.classList.contains("dark");
            cal("ui", {
                theme: isDark ? "dark" : "light",
                cssVarsPerTheme: {
                    dark: { "cal-brand": "#9B2D3A" },
                    light: { "cal-brand": "#9B2D3A" },
                },
                hideEventTypeDetails: false,
                layout: "month_view",
            });
        })();
    }, []);

    return (
        <section className="min-h-screen pt-32 pb-28 px-5 md:px-8">
            <div className="container mx-auto max-w-5xl w-full">
                <PageHeader
                    eyebrow="book a call"
                    title="Book a discovery call"
                    lede="Pick a time that works for you and tell me about your infrastructure or project."
                    aside={
                        <dl className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 border-t border-foreground/10">
                            {details.map(({ term, detail }) => (
                                <div key={term} className="flex flex-col gap-1 py-4 border-b border-foreground/10">
                                    <dt className="font-bold text-foreground">{term}</dt>
                                    <dd className="text-muted">{detail}</dd>
                                </div>
                            ))}
                        </dl>
                    }
                />

                <div className={`${card} overflow-hidden p-2 md:p-4`}>
                    <Cal
                        namespace="discovery-call"
                        calLink="tolulope-fakoya-hunter/discovery-call"
                        style={{ width: "100%", height: "100%", overflow: "scroll" }}
                        config={{ layout: "month_view" }}
                    />
                </div>

                <FAQSection />
            </div>
        </section>
    );
};
