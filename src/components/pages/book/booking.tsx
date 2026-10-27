'use client'

import { useEffect, useRef, useState } from "react";
import Cal, { getCalApi } from "@calcom/embed-react";
import { FAQSection } from "./faq";
import { BOOK_LABEL, EMAIL_HREF, EMAIL_LABEL, PageHeader, btnPrimary, btnSecondary, card } from "@/components/utilities/shared/ui";
// Facts a visitor wants before picking a slot, taken from the FAQ below.
const details = [
    { term: "30 minutes, no commitment", detail: "Long enough to talk through what you are building." },
    { term: "Any size of project", detail: "Audits and small fixes are as common as full migrations." },
    { term: "Based in Eastern Time", detail: "Calls happen whenever overlaps best for you." },
];

// A pixel floor, not rem: the 15px mobile root would otherwise shrink the tap target.
const tapTarget = "min-h-[44px]";

// The card's measured height at the booker's first step, held while it loads so the page doesn't jump.
// Once released, Cal sizes the iframe itself on every step and the card follows.
const loadingFloor = "min-h-[1075px] sm:min-h-[1300px] md:min-h-[1390px] lg:min-h-[570px] xl:min-h-[600px]";

// linkReady fires before Cal reports its full height, so the floor waits until the iframe holds still this long.
const SETTLE_MS = 1000;

export const BookingSection = () => {
    const [calReady, setCalReady] = useState(false);
    const cardRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let settle: ReturnType<typeof setTimeout> | undefined;
        let observer: ResizeObserver | undefined;
        (async function () {
            const cal = await getCalApi({ namespace: "discovery-call" });
            cal("on", {
                action: "linkReady",
                callback: () => {
                    const iframe = cardRef.current?.querySelector("iframe");
                    if (!iframe) {
                        setCalReady(true);
                        return;
                    }
                    const restart = () => {
                        clearTimeout(settle);
                        settle = setTimeout(() => {
                            observer?.disconnect();
                            setCalReady(true);
                        }, SETTLE_MS);
                    };
                    observer = new ResizeObserver(restart);
                    observer.observe(iframe);
                    restart();
                },
            });
        })();
        return () => {
            clearTimeout(settle);
            observer?.disconnect();
        };
    }, []);

    useEffect(() => {
        (async function () {
            const cal = await getCalApi({ namespace: "discovery-call" });
            // Cal applies its theme at load and cannot restyle a live booker (a later "ui" theme only flips
            // color-scheme), so the theme is read once here and never re-sent. Reloading the iframe instead
            // would throw away a half-filled booking. Note: Cal's embed.js itself polls the page body's
            // color-scheme every 50ms and forwards changes to the booker, so a site toggle still reaches it.
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
                    eyebrow="contact"
                    title="Let's talk about what you're building"
                    lede="Book a 30 minute call from the calendar below, or send an email if you would rather start in writing."
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
                >
                    <div className="flex flex-col gap-3 mt-2">
                        <div className="flex flex-wrap gap-3">
                            <a href="#calendar" className={`${btnPrimary} ${tapTarget}`}>{BOOK_LABEL}</a>
                            <a href={EMAIL_HREF} className={`${btnSecondary} ${tapTarget}`}>{EMAIL_LABEL}</a>
                        </div>
                        <p className="text-sm text-muted">A call if you want to talk it through, email if you would rather write it down.</p>
                    </div>
                </PageHeader>

                {/* scroll-mt clears the fixed navbar and its hanging bulb when the header link jumps here */}
                <div ref={cardRef} id="calendar" className={`${card} overflow-hidden p-2 md:p-4 scroll-mt-40 ${calReady ? "" : loadingFloor}`}>
                    <Cal
                        namespace="discovery-call"
                        calLink="tolulope-fakoya-hunter/discovery-call"
                        style={{ width: "100%" }}
                        config={{ layout: "month_view" }}
                    />
                </div>

                <div className={`${card} mt-8 md:mt-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6 p-6 md:p-8`}>
                    <div className="flex flex-col gap-2 max-w-2xl">
                        <h2 className="text-2xl font-bold text-foreground tracking-tight">Prefer to write?</h2>
                        <p className="text-muted leading-relaxed">In the email, include what you are building, roughly what stage it is at, and any deadline.</p>
                    </div>
                    <a href={EMAIL_HREF} className={`${btnSecondary} ${tapTarget} flex-shrink-0`}>{EMAIL_LABEL}</a>
                </div>

                <FAQSection />
            </div>
        </section>
    );
};
