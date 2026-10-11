'use client'

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { FAQSection } from "./faq";
import { PageHeader, card } from "@/components/utilities/shared/ui";

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
                    title="Book a Discovery Call"
                    lede="30 minutes, no commitment. Pick a time that works for you and tell me about your infrastructure or project."
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
