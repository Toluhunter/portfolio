"use client";
import Image from "next/image";
import Link from "next/link";
import { certifications } from "@/data/content.json";

interface Certification {
    picture: string;
    title: string;
    date: string;
    expiring?: string;
    institution: string;
    verifyLink: string;
}

const CertificationCard = ({ certification }: { certification: Certification }) => {
    return (
        <div className="flex gap-4 items-start p-4 rounded-lg border border-callout/20 hover:border-callout/50 transition-colors duration-200">
            <div className="flex-shrink-0">
                <Image
                    src={certification.picture}
                    alt={certification.title}
                    width={64}
                    height={64}
                    className="object-contain"
                />
            </div>
            <div className="min-w-0">
                <h3 className="font-bold text-foreground text-sm leading-snug mb-1">{certification.title}</h3>
                <p className="text-xs text-foreground/50">{certification.institution}</p>
                {certification.expiring && (
                    <p className="text-xs text-foreground/50">Expires {certification.expiring}</p>
                )}
                <Link
                    href={certification.verifyLink}
                    target="_blank"
                    className="text-xs text-callout hover:underline mt-1 inline-block"
                >
                    Verify Credential
                </Link>
            </div>
        </div>
    );
};

const AboutCertificationsSection = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
                <CertificationCard key={index} certification={cert} />
            ))}
        </div>
    );
};

export default AboutCertificationsSection;