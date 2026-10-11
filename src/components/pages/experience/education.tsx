"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { EducationCardSkeleton } from "@/components/utilities/shared/skeletons";

interface Education {
    institution: string;
    degree: string;
    duration: string;
    description: string[];
    logo: string;
}

const EducationCard = ({ education }: { education: Education }) => {
    return (
        <div className="flex gap-5 items-start p-6 rounded-2xl bg-panel border border-foreground/10 hover:border-foreground/25 transition-colors duration-300">
            <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-white flex items-center justify-center p-2">
                <Image
                    src={education.logo}
                    alt={`${education.institution} logo`}
                    width={48}
                    height={48}
                    className="object-contain"
                />
            </div>
            <div className="min-w-0 flex flex-col gap-1">
                <h3 className="text-lg font-bold text-foreground leading-snug">{education.degree}</h3>
                <p className="text-muted">{education.institution}</p>
                {education.duration && (
                    <p className="font-fira-code text-sm text-faint mt-1">{education.duration}</p>
                )}
                {education.description.length > 0 && (
                    <ul className="flex flex-col gap-1.5 text-muted leading-relaxed prose-measure mt-2">
                        {education.description.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

const EducationSection = () => {
    const [education, setEducation] = useState<Education[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEducation = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/education`);
                const data = await res.json();
                setEducation(data.education || []);
            } catch (error) {
                console.error("Failed to fetch education:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchEducation();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[0, 1].map((i) => (
                    <EducationCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {education.map((edu, index) => (
                <EducationCard key={index} education={edu} />
            ))}
        </div>
    );
};

export default EducationSection;