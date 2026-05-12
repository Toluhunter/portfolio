"use client";
import { useState, useEffect } from 'react';
import WorkHistorySection from "./work-history";
import EducationSection from "./education";
import CertificationsSection from "./certifications";

const navSections = [
    { id: 'experience', label: 'Experience' },
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
        <section className="min-h-screen pt-25 w-full container mx-auto flex flex-col px-8 pb-20">

            {/* Hero */}
            <div className="flex flex-col gap-4 mb-16 max-w-2xl">
                <span className="text-xs font-semibold uppercase tracking-widest text-foreground/80">Background</span>
                <h1 className="text-5xl md:text-6xl font-bold font-fira-code text-foreground">Experience</h1>
                <p className="text-lg text-foreground/80 mt-1">Roles, education, and certifications.</p>
            </div>

            {/* Body: sticky sidebar + scrollable sections */}
            <div className="flex flex-col lg:flex-row gap-12">

                {/* Sticky sidebar, desktop only */}
                <aside className="hidden lg:block w-44 flex-shrink-0">
                    <nav className="sticky top-28 flex flex-col gap-1">
                        {navSections.map(({ id, label }) => (
                            <button
                                key={id}
                                onClick={() => scrollTo(id)}
                                className={`text-left px-4 py-2.5 border-l-2 text-sm font-medium transition-all duration-200 cursor-pointer ${
                                    activeSection === id
                                        ? 'border-foreground text-foreground'
                                        : 'border-transparent text-foreground hover:text-foreground hover:border-foreground/30'
                                }`}
                            >
                                {label}
                            </button>
                        ))}
                    </nav>
                </aside>

                {/* Sections */}
                <div className="flex-1 flex flex-col gap-16">
                    <div id="experience">
                        <h2 className="text-2xl font-bold text-foreground mb-8">Experience</h2>
                        <WorkHistorySection />
                    </div>
                    <div id="education">
                        <h2 className="text-2xl font-bold text-foreground mb-8">Education</h2>
                        <EducationSection />
                    </div>
                    <div id="certifications">
                        <h2 className="text-2xl font-bold text-foreground mb-8">Certifications</h2>
                        <CertificationsSection />
                    </div>
                </div>
            </div>
        </section>
    );
};