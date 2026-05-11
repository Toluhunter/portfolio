'use client';
import { NavBar } from "@/components/utilities/shared/navbar";
import { Footer } from "@/components/pages/landing/footer";
import { BuyMeACoffee } from "@/components/utilities/shared/buymecoffee";
import Image from "next/image";
import Link from "next/link";
import content from "@/data/content.json";

const SectionLabel = ({ text }: { text: string }) => (
    <h2 className="text-xs font-semibold uppercase tracking-widest text-foreground/40 mb-8 pb-3 border-b border-foreground/10">
        {text}
    </h2>
);

export default function ExperiencePage() {
    return (
        <>
            <NavBar />

            <div className="min-h-screen bg-background/50 backdrop-blur-sm" style={{
                color: 'var(--foreground)',
                fontFamily: 'Arial, Helvetica, sans-serif'
            }}>
                <main className="pt-24 pb-16 px-4 md:px-8 lg:px-16 container mx-auto relative">

                    {/* Hero */}
                    <div className="flex flex-col gap-2 mb-16">
                        <span className="text-xs font-semibold uppercase tracking-widest text-foreground/40">Background</span>
                        <h1 className="text-5xl md:text-6xl font-bold font-fira-code text-foreground">Experience</h1>
                        <p className="text-lg text-foreground/60 mt-1">Roles, education, and certifications.</p>
                    </div>

                    {/* Work History */}
                    <section className="mb-16">
                        <SectionLabel text="Work History" />
                        <div className="flex flex-col divide-y divide-foreground/10">
                            {content.experience.map((exp, index) => (
                                <div key={index} className="flex flex-col md:flex-row gap-5 md:gap-8 py-8 first:pt-0">
                                    <div className="flex-shrink-0 w-14 h-14">
                                        <Image
                                            src={exp.logo}
                                            alt={`${exp.company} logo`}
                                            width={56}
                                            height={56}
                                            className="object-contain w-full h-full"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                                            <h3 className="text-xl font-bold text-foreground">{exp.company}</h3>
                                            <span className="text-sm text-foreground/50 flex-shrink-0">{exp.duration}</span>
                                        </div>
                                        <p className="text-base font-medium text-foreground/60 mb-4">{exp.role}</p>
                                        {exp.description.length > 0 && (
                                            <ul className="flex flex-col gap-2">
                                                {exp.description.map((item, i) => (
                                                    <li key={i} className="flex gap-3 text-sm text-foreground/70">
                                                        <span className="text-foreground/30 mt-0.5 flex-shrink-0">•</span>
                                                        <span>{item}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Education */}
                    <section className="mb-16">
                        <SectionLabel text="Education" />
                        <div className="flex flex-col divide-y divide-foreground/10">
                            {content.education.map((edu, index) => (
                                <div key={index} className="flex flex-col md:flex-row gap-5 md:gap-8 py-8 first:pt-0">
                                    <div className="flex-shrink-0 w-14 h-14">
                                        <Image
                                            src={edu.logo}
                                            alt={`${edu.institution} logo`}
                                            width={56}
                                            height={56}
                                            className="object-contain w-full h-full"
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-1">
                                            <h3 className="text-xl font-bold text-foreground">{edu.institution}</h3>
                                            <span className="text-sm text-foreground/50 flex-shrink-0">{edu.duration}</span>
                                        </div>
                                        <p className="text-base font-medium text-foreground/60">{edu.degree}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Certifications */}
                    <section>
                        <SectionLabel text="Certifications" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {content.certifications.map((cert, index) => (
                                <Link
                                    key={index}
                                    href={cert.verifyLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-5 p-4 rounded-lg border border-foreground/10 hover:border-foreground/30 transition-colors duration-200"
                                >
                                    <Image
                                        src={cert.picture}
                                        alt={cert.title}
                                        width={64}
                                        height={64}
                                        className="object-contain flex-shrink-0"
                                    />
                                    <div>
                                        <p className="text-sm font-semibold text-foreground leading-snug">{cert.title}</p>
                                        <p className="text-xs text-foreground/50 mt-1">{cert.institution}</p>
                                        {cert.expiring && (
                                            <p className="text-xs text-foreground/40 mt-0.5">Expires {cert.expiring}</p>
                                        )}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>

                </main>
            </div>

            <BuyMeACoffee />
            <Footer />
        </>
    );
}