"use client";
import Image from "next/image";
import Link from "next/link";
import { certifications } from "@/data/content.json";

// Define the type for a single certification entry
interface Certification {
    picture: string;
    title: string;
    date: string;
    expiring?: string;
    institution: string;
    verifyLink: string;
}

// The CertificationCard component
const CertificationCard = ({ certification }: { certification: Certification }) => {
    return (
        <div className="flex lg:flex-row flex-col gap-5 md:gap-0 items-start mb-8 not-dark:bg-white rounded-lg shadow-md transition-transform transform hover:scale-105 p-5">
            <div className="mr-6 flex-shrink-0">
                <Image
                    src={certification.picture}
                    alt={`${certification.title} logo`}
                    width={150}
                    height={150}
                    className="object-contain"
                />
            </div>
            <div className="w-full">
                <h2 className="text-2xl font-bold text-foreground">{certification.title}</h2>
                <p className="text-lg font-semibold text-foreground">{certification.institution}</p>
                <p className="text-sm text-gray-400 mb-1">Issued: {certification.date}</p>
                {certification.expiring && <p className="text-sm text-gray-400 mb-3">Expires: {certification.expiring}</p>}
                <Link href={certification.verifyLink} target="_blank">
                    <span className="text-callout hover:underline">Verify Credential</span>
                </Link>
            </div>
        </div>
    );
};

const AboutCertificationsSection = () => {
    return (
        <section className="py-12">
            <h1 className="text-center font-bold text-4xl mb-10 text-foreground">My Certifications</h1>
            <div className="max-w-4xl mx-auto px-4 text-foreground">
                {certifications.map((cert, index) => (
                    <CertificationCard key={index} certification={cert} />
                ))}
            </div>
        </section>
    );
};

export default AboutCertificationsSection;