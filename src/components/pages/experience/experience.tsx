"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PageHeader, textLink } from '@/components/utilities/shared/ui';
import WorkHistorySection from "./work-history";
import EducationSection from "./education";
import CertificationsSection from "./certifications";

const navSections = [
    { id: 'experience', label: 'Work History' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certifications' },
];

export const ExperiencePageSection = () => {
    const [activeSection, setActiveSection] = useState('experience');

    useEffect(() => {
        const handleScroll = () => {
            const scrollPos = window.scrollY + window.innerHeight * 0.35;
            let current = navSections[0].id;
            for (const { id } of navSections) {
                const el = document.getElementById(id);
                if (el && el.offsetTop <= scrollPos) {
                    current = id;
                }
            }
            setActiveSection(current);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (!el) return;
        const top = el.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top, behavior: 'smooth' });
    };

    return (
        <section className="min-h-screen pt-32 w-full container mx-auto flex flex-col px-5 md:px-8 pb-28">

            {/* Hero */}
            <PageHeader
                eyebrow="background"
                title="Experience"
                lede="5+ years across cloud architecture, DevOps, and systems administration. Now researching TinyML security at Ontario Tech."
            >
                <Link href="/cv" className={textLink}>
                    Download CV &rarr;
                </Link>
            </PageHeader>

            {/* Body: sticky sidebar + scrollable sections */}
            <div className="flex flex-col lg:flex-row gap-12">

                {/* Sticky sidebar, desktop only */}
                <aside className="hidden lg:block w-44 flex-shrink-0">
                    <nav aria-label="On this page" className="sticky top-28 flex flex-col gap-1">
                        {navSections.map(({ id, label }) => (
                            <button
                                key={id}
                                type="button"
                                onClick={() => scrollTo(id)}
                                aria-current={activeSection === id ? 'location' : undefined}
                                className={`text-left px-4 py-2.5 border-l-2 text-sm font-medium transition-all duration-200 cursor-pointer ${
                                    activeSection === id
                                        ? 'border-callout text-foreground'
                                        : 'border-foreground/10 text-muted hover:text-foreground hover:border-foreground/30'
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Sections */}
                <div className="flex-1 min-w-0 flex flex-col gap-24">
                    <div id="experience" className="scroll-mt-28">
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-10">Work History</h2>
                        <WorkHistorySection />
                    </div>
                    <div id="education" className="scroll-mt-28">
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-10">Education</h2>
                        <EducationSection />
                    </div>
                    <div id="certifications" className="scroll-mt-28">
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-10">Certifications</h2>
                        <CertificationsSection />
                    </div>
                </div>
            </div>
        </section>
    );
};