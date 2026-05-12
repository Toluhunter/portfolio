"use client";
import Image from "next/image";
import content from "@/data/content.json";

interface Experience {
    company: string;
    role: string;
    duration: string;
    description: string[];
    logo: string;
}

const WorkHistorySection = () => {
    return (
        <div className="relative">
            <div className="absolute left-[11px] top-3 bottom-0 w-0.5 bg-callout/25" />
            {(content.experience as Experience[]).map((exp, index) => (
                <div key={index} className="flex gap-6 pb-12 last:pb-0">
                    <div className="flex-shrink-0 mt-1 z-10">
                        <div className="w-6 h-6 rounded-full border-2 border-callout bg-background" />
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
                        <div>
                            <h3 className="text-xl font-bold text-foreground">{exp.company}</h3>
                            <p className="text-base font-semibold text-foreground">{exp.role}</p>
                            <p className="text-sm text-foreground/50 mb-3">{exp.duration}</p>
                            <ul className="list-disc list-inside text-foreground space-y-1 text-sm">
                                {exp.description.map((item, i) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default WorkHistorySection;