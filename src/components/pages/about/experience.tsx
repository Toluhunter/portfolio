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
            `
            Integrated traditional AI workflows with AWS services such as AWS
            Lambda, Amazon RDS, and Amazon S3, enabling seamless data
            preprocessing, model training, and inference pipelines that reduced
            processing times by 25%
            `,
        ],
        logo: "/vontech-logo.svg",
    },
    {
        company: "Tech Solutions",
        role: "Software Engineer",
        duration: "Oct 2023 - Oct 2024",
        description: [
            `
            Implemented robust CI/CD pipelines using Jenkins and AWS
            CodePipeline, leading to a 60% decrease in deployment times and a 30%
            increase in deployment frequency.
            `,
            `
            Automated routine tasks and workflows with Terraform and AWS
            Lambda, reducing manual intervention by 80%.
            `,
            `
            Analyzed and optimized cloud spending, employing Reserved Instances
            and Spot Instances to achieve a 25% cost saving on AWS bills.
            `,
            `
            Employed serverless architecture to architect and deploy scalable, cost-
            efficient solutions for clients, resulting in a 40% decrease in
            infrastructure expenses.
            `,
            `
            Implemented Large Language Model (LLM) agents to streamline in-house
            operations, improving infrastructure development speed by 40% through
            automation and advanced generative capabilities.
            `
        ],
        logo: "/datamellon-logo.svg", // Example: /path/to/your/logo.svg
    },
];

// The new ExperienceCard component
const ExperienceCard = ({ experience }: { experience: Experience }) => {
    return (
        <div className="flex items-start p-6 mb-8 not-dark:bg-white rounded-lg shadow-md transition-transform transform hover:scale-105">
            <div className="flex-shrink-0 mr-6">
                <Image
                    src={experience.logo}
                    alt={`${experience.company} logo`}
                    width={64}
                    height={64}
                    className=" object-contain"
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
