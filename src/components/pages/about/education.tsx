"use client";
import Image from "next/image";

// Define the type for a single education entry
interface Education {
    institution: string;
    degree: string;
    duration: string;
    description: string[];
    logo: string; // Path to the logo image
}

// Sample data for education. Replace with your own.
const educations: Education[] = [
    {
        institution: "Ontario Tech University",
        degree: "Master of Science in Computer Science",
        duration: "2025 - 2027 (Expected)",
        description: [
        ],
        logo: "/ontariotech-logo.svg", // Replace with actual logo path
    },
    {
        institution: "Babcock University",
        degree: "Bachelor of Science in Software Engineering",
        duration: "2019 - 2023",
        description: [
        ],
        logo: "/babcock-logo.svg", // Replace with actual logo path
    },
];

// The EducationCard component
const EducationCard = ({ education }: { education: Education }) => {
    return (
        <div className="flex items-start p-6 mb-8 not-dark:bg-white rounded-lg shadow-md transition-transform transform hover:scale-105">
            <div className="flex-shrink-0 mr-6">
                <Image
                    src={education.logo}
                    alt={`${education.institution} logo`}
                    width={80}
                    height={80}
                    className=" object-contain"
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
        <section className="py-12">
            <h1 className="text-center font-bold text-4xl mb-10 text-foreground">My Education</h1>
            <div className="max-w-4xl mx-auto px-4 text-foreground">
                {educations.map((edu, index) => (
                    <EducationCard key={index} education={edu} />
                ))}
            </div>
        </section>
    );
};

export default EducationSection;
