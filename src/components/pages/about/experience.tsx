"use client";
import Image from "next/image";

// Define the type for a single experience
interface Experience {
    company: string;
    role: string;
    duration: string;
    description: string[];
    logo: string; // Path to the logo image
}

// Sample data for experiences. You can replace this with your own data.
const experiences: Experience[] = [
    {
        company: "Vontech Group",
        role: "Lead Solutions Architect",
        duration: "Oct 2024 - Present",
        description: [
            `Designed and developed AI solutions leveraging AWS services such as
            AWS Bedrock and SageMaker, this enabled clients accelerate their
            machine learning workflows and reduce model deployment times by
            35%.`,
            `
            Led migration efforts for 5+ startup clients, executing lift-and-shift
            strategies for existing infrastructure to AWS, reducing operational costs
            by 25% on average and improving system reliability.
            `,
            "Mentored junior developers and conducted code reviews.",
        ],
        logo: "/logo-black.svg", // Example: /path/to/your/logo.svg
    },
    {
        company: "Tech Solutions",
        role: "Software Engineer",
        duration: "Jun 2018 - Dec 2019",
        description: [
            "Developed and maintained features for a SaaS application.",
            "Worked with a team of 5 engineers in an agile environment.",
            "Contributed to the migration of a legacy system to a modern tech stack.",
        ],
        logo: "/logo.svg", // Example: /path/to/your/logo.svg
    },
];

// The new ExperienceCard component
const ExperienceCard = ({ experience }: { experience: Experience }) => {
    return (
        <div className="flex items-start p-6 mb-8 bg-white rounded-lg shadow-md transition-transform transform hover:scale-105">
            <div className="flex-shrink-0 mr-6">
                <Image
                    src={experience.logo}
                    alt={`${experience.company} logo`}
                    width={64}
                    height={64}
                    className="rounded-full object-contain"
                />
            </div>
            <div className="w-full">
                <h2 className="text-2xl font-bold text-foreground">{experience.company}</h2>
                <p className="text-lg font-semibold text-foreground">{experience.role}</p>
                <p className="text-sm text-gray-400 mb-3">{experience.duration}</p>
                <ul className="list-disc list-inside text-foreground space-y-1">
                    {experience.description.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

const ExperienceSection = () => {
    return (
        <section className="py-12">
            <h1 className="text-center font-bold text-4xl mb-10 text-foreground">My Experience</h1>
            <div className="max-w-4xl mx-auto px-4 text-foreground">
                {experiences.map((exp, index) => (
                    <ExperienceCard key={index} experience={exp} />
                ))}
            </div>
        </section>
    );
};

export default ExperienceSection;
