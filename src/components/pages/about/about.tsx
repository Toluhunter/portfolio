"use client";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from 'next/link';
import { useState, useEffect } from 'react';
import ExperienceSection from "./experience";
import EducationSection from "./education";
import AboutCertificationsSection from "./certifications";

const navSections = [
    { id: 'experience', label: 'Experience' },
    { id: 'certifications', label: 'Certifications' },
    { id: 'education', label: 'Education' },
];

export const AboutSection = () => {
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
                <span className="text-xs font-semibold uppercase tracking-widest text-foreground/40">Who I Am</span>
                <h1 className="text-5xl md:text-6xl font-bold font-fira-code text-foreground">About</h1>
                <p className="text-xl font-semibold text-foreground mt-2">
                    I&apos;m Tolulope Fakoya, a Cloud and AI Engineer based in Canada.
                </p>
                <p className="text-lg text-foreground/70 leading-relaxed">
                    With 5+ years building, securing, and operating cloud-native and AI-powered systems, my focus is AWS architecture, MLOps, and security-first infrastructure. I&apos;ve led cloud migrations for 25+ clients, designed AI workflows using AWS Bedrock and SageMaker, and built systems that cut costs without sacrificing reliability. Whether you&apos;re starting fresh or rearchitecting something fragile, I build infrastructure that lasts.
                </p>
                <div className="flex flex-wrap gap-5 items-center mt-2">
                    <Link
                        href="/book"
                        className="px-5 py-2 text-base border-2 border-callout rounded-md hover:bg-callout hover:text-white transition-colors duration-300 text-foreground"
                    >
                        Book a Free Meeting
                    </Link>
                    <div className="flex gap-5 items-center">
                        <Link
                            href="https://github.com/toluhunter"
                            target="_blank"
                            className="flex items-center gap-2 text-foreground hover:text-callout transition-colors duration-200"
                        >
                            <FaGithub size={20} />
                            <span>GitHub</span>
                        </Link>
                        <Link
                            href="https://www.linkedin.com/in/tolulope-fakoya/"
                            target="_blank"
                            className="flex items-center gap-2 text-foreground hover:text-callout transition-colors duration-200"
                        >
                            <FaLinkedin size={20} />
                            <span>LinkedIn</span>
                        </Link>
                    </div>
                </div>
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
                                        ? 'border-callout text-callout'
                                        : 'border-transparent text-foreground/50 hover:text-foreground hover:border-foreground/30'
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
                        <ExperienceSection />
                    </div>
                    <div id="certifications">
                        <h2 className="text-2xl font-bold text-foreground mb-8">Certifications</h2>
                        <AboutCertificationsSection />
                    </div>
                    <div id="education">
                        <h2 className="text-2xl font-bold text-foreground mb-8">Education</h2>
                        <EducationSection />
                    </div>
                </div>
            </div>
        </section>
    );
};