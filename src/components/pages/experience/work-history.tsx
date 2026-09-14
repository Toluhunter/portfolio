"use client";
import Image from "next/image";
import content from "@/data/content.json";
import { CaseStudyStat } from "@/components/utilities/shared/beat";

interface Experience {
    company: string;
    role: string;
    duration: string;
    description: string[];
    logo: string;
    stats?: CaseStudyStat[];
}

const WorkHistorySection = () => {
    return (
        <div className="relative">
            <div className="absolute left-[11px] top-3 bottom-0 w-0.5 bg-foreground/25" />
            {(content.experience as Experience[]).map((exp, index) => (
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
