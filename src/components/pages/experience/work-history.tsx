"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CaseStudyStat } from "@/components/utilities/shared/beat";
import { TimelineEntrySkeleton } from "@/components/utilities/shared/skeletons";

interface Experience {
    company: string;
    role: string;
    duration: string;
    description: string[];
    logo: string;
    stats?: CaseStudyStat[];
}

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
            <div className="absolute left-[11px] top-3 bottom-0 w-0.5 bg-foreground/25" />
            {experience.map((exp, index) => (
                <div key={index} className="flex gap-6 pb-12 last:pb-0">
                    <div className="flex-shrink-0 mt-1 z-10">
                        <div className="w-6 h-6 rounded-full border-2 border-foreground bg-background" />
                    </div>
                    <div className="flex flex-col sm:flex-row gap-4 flex-1">
                        <div className="flex-shrink-0">
                            <Image
                                src={exp.logo}
                                alt={`${exp.company} logo`}
                                width={64}
                                height={64}
                                className="object-contain"
                            />
                        </div>
                        <div className="flex flex-col gap-3 flex-1">
                            <div>
                                <h3 className="text-xl font-bold text-foreground">{exp.company}</h3>
                                <p className="text-base font-semibold text-foreground">{exp.role}</p>
                                <p className="text-sm text-foreground/80">{exp.duration}</p>
                            </div>
                            <ul className="list-disc list-inside text-foreground space-y-1 text-sm">
                                {exp.description.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                            {exp.stats && exp.stats.length > 0 && (
                                <div className="flex flex-wrap gap-3 mt-1">
                                    {exp.stats.map((stat) => (
                                        <div key={stat.label} className="flex flex-col gap-0.5 px-4 py-2 border border-foreground/20 rounded-lg">
                                            <span className="font-fira-code text-lg font-bold text-callout">{stat.value}</span>
                                            <span className="text-[10px] text-foreground/60 uppercase tracking-wide">{stat.label}</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WorkHistorySection;
