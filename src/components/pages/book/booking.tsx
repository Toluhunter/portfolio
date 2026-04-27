'use client'

import { useEffect } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";

export const BookingSection = () => {
    useEffect(() => {
        (async function () {
            const cal = await getCalApi({ namespace: "discovery-call" });
            cal("ui", {
                theme: "dark",
                cssVarsPerTheme: {
                    dark: { "cal-brand": "#804F94" },
                    light: { "cal-brand": "#804F94" },
                },
                hideEventTypeDetails: false,
                layout: "month_view",
            });
        })();
    }, []);

    return (
        <section className="min-h-screen pt-20 pb-10 px-4 flex flex-col items-center">
            <div className="container mx-auto max-w-5xl w-full">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl md:text-4xl font-bold font-fira-code mb-3">
                        Book a <span className="text-callout">Discovery Call</span>
                    </h1>
                    <p className="text-foreground/60 font-fira-code text-sm md:text-base max-w-xl mx-auto">
                        30 minutes, no commitment. Pick a time that works for you and tell me about your Infrastructure/project.
                    </p>
                </div>

                <Cal
                    namespace="discovery-call"
                    calLink="tolulope-fakoya-hunter/discovery-call"
                    style={{ width: "100%", height: "100%", overflow: "scroll" }}
                    config={{ layout: "month_view" }}
                />
            </div>
        </section>
    );
};
