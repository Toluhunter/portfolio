"use client";
import Image from "next/image";
import content from "@/data/content.json";

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
                <p className="text-sm text-gray-400 mb-3">{education.duration}</p>
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
    return (
        <div className="text-foreground">
            {content.education.map((edu, index) => (
                <EducationCard key={index} education={edu} />
            ))}
        </div>
    );
};

export default EducationSection;