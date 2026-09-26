"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

interface Education {
    institution: string;
    degree: string;
    duration: string;
    description: string[];
    logo: string;
}

const EducationCard = ({ education }: { education: Education }) => {
    return (
        <div className="flex lg:flex-row flex-col gap-5 md:gap-0 items-start mb-8 rounded-lg shadow-md transition-transform transform hover:scale-105">
            <div className="mr-6">
                <Image
                    src={education.logo}
                    alt={`${education.institution} logo`}
                    width={80}
                    height={80}
                    className="object-contain"
                />
            </div>
            <div className="w-full">
                <h2 className="text-2xl font-bold text-foreground">{education.institution}</h2>
                <p className="text-lg font-semibold text-foreground">{education.degree}</p>
                {education.duration && (
                    <p className="text-sm text-foreground/80 mb-3">{education.duration}</p>
                )}
                <ul className="list-disc list-inside text-foreground space-y-1">
                    {education.description.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const EducationSection = () => {
    const [education, setEducation] = useState<Education[]>([]);

    useEffect(() => {
        const fetchEducation = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/education`);
                const data = await res.json();
                setEducation(data.education || []);
            } catch (error) {
                console.error("Failed to fetch education:", error);
            }
        };

        fetchEducation();
    }, []);

    return (
        <div className="text-foreground">
            {education.map((edu, index) => (
                <EducationCard key={index} education={edu} />
            ))}
        </div>
    );
};

export default EducationSection;