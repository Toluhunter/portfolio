"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CaseStudyStat } from "@/components/utilities/shared/beat";
import { TimelineEntrySkeleton } from "@/components/utilities/shared/skeletons";
import { Reveal } from "@/components/utilities/shared/reveal";
import { StatList } from "@/components/utilities/shared/ui";

interface Experience {
    company: string;
    role: string;
    duration: string;
    description: string[];
    logo: string;
    stats?: CaseStudyStat[];
}

const ExperienceEntry = ({ exp }: { exp: Experience }) => {
    const [expanded, setExpanded] = useState(false);
    const isCurrent = exp.duration.toLowerCase().includes("present");
    const [lead, ...rest] = exp.description;

    return (
        <div className="flex gap-6 pb-14 last:pb-0">
            {/* Timeline dot, centred in a 24px column so it sits on the line */}
            <div className="flex-shrink-0 w-6 flex justify-center pt-5 z-10">
                {isCurrent ? (
                    <span className="relative flex w-3.5 h-3.5">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-callout opacity-60 animate-ping motion-reduce:animate-none" />
                        <span className="relative inline-flex w-3.5 h-3.5 rounded-full bg-callout" />
                    </span>
                ) : (
                    <span className="w-3 h-3 rounded-full bg-background border-2 border-foreground/40" />
                )}
            </div>

            <Reveal className="flex-1 min-w-0">
                <div className="flex flex-col gap-5 p-6 md:p-8 rounded-2xl bg-panel border border-foreground/10 hover:border-foreground/25 transition-colors duration-300">

                    {/* Header row */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                        <div className="flex items-center gap-4">
                            <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white flex items-center justify-center p-1.5">
                                <Image
                                    src={exp.logo}
                                    alt={`${exp.company} logo`}
                                    width={40}
                                    height={40}
                                    className="object-contain"
                                />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-foreground leading-tight">{exp.role}</h3>
                                <p className="text-muted">{exp.company}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 sm:flex-col sm:items-end sm:gap-1.5">
                            <span className="font-fira-code text-sm text-muted whitespace-nowrap">{exp.duration}</span>
                            {isCurrent && (
                                <span className="text-xs font-semibold uppercase tracking-wider text-callout">Current</span>
                            )}
                        </div>
                    </div>

                    {/* Stats first: the fastest read */}
                    {exp.stats && exp.stats.length > 0 && (
                        <StatList stats={exp.stats} />
                    )}

                    {/* Lead bullet, rest behind a toggle */}
                    {lead && <p className="text-foreground leading-relaxed prose-measure">{lead}</p>}
                    {rest.length > 0 && (
                        <>
                            <div
                                className={`grid transition-[grid-template-rows] duration-300 ease-out ${expanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                            >
                                <ul className="overflow-hidden flex flex-col gap-2 text-muted leading-relaxed prose-measure">
                                    {rest.map((item, i) => (
                                        <li key={i} className="flex gap-3">
                                            <span aria-hidden className="text-callout mt-[0.1rem]">&rsaquo;</span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <button
                                type="button"
                                onClick={() => setExpanded((v) => !v)}
                                aria-expanded={expanded}
                                className="w-fit font-fira-code text-sm text-foreground hover:text-callout transition-colors duration-200 cursor-pointer"
                            >
                                {expanded ? "Show less" : `Show ${rest.length} more`}
                            </button>
                        </>
                    )}
                </div>
            </Reveal>
        </div>
    );
};

const WorkHistorySection = () => {
    const [experience, setExperience] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/experience`);
                const data = await res.json();
                setExperience(data.experience || []);
            } catch (error) {
                console.error("Failed to fetch experience:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchExperience();
    }, []);

    if (loading) {
        return (
            <div className="relative">
                <div className="absolute left-[11px] top-3 bottom-0 w-0.5 bg-foreground/25" />
                {[0, 1, 2].map((i) => (
                    <TimelineEntrySkeleton key={i} />
                ))}
            </div>
        );
    }

    return (
        <div className="relative">
            <div className="absolute left-[11px] top-6 bottom-6 w-px bg-gradient-to-b from-callout/60 via-foreground/15 to-transparent" />
            {experience.map((exp, index) => (
                <ExperienceEntry key={index} exp={exp} />
            ))}
        </div>
    );
};

export default WorkHistorySection;
