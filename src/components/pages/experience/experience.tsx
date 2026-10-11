"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { PageHeader, btnPrimary, btnSecondary } from '@/components/utilities/shared/ui';
import WorkHistorySection from "./work-history";
import EducationSection from "./education";
import CertificationsSection from "./certifications";

const navSections = [
    { id: 'experience', label: 'Work history' },
    { id: 'education', label: 'Education' },
    { id: 'certifications', label: 'Certifications' },
];

export const ExperiencePageSection = () => {
    const [activeSection, setActiveSection] = useState('experience');

    useEffect(() => {
        // A section becomes active as it crosses a line 35% down the viewport.
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveSection(entry.target.id);
                });
            },
            { rootMargin: '-35% 0px -64% 0px' }
        );
        navSections.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });
        return () => observer.disconnect();
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
                aside={
                    <div className="flex flex-wrap gap-3 lg:justify-end">
                        <Link href="/cv" className={btnPrimary}>View CV</Link>
                        <a href="https://www.linkedin.com/in/tolulope-fakoya/" target="_blank" rel="noopener noreferrer" className={btnSecondary}>
                            LinkedIn
                        </a>
                    </div>
                }
            />

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
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-10">Work history</h2>
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