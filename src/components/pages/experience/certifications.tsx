"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CertificationCardSkeleton } from "@/components/utilities/shared/skeletons";

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
        <div className="flex gap-4 items-start p-4 rounded-lg border border-foreground/20 hover:border-foreground/50 transition-colors duration-200">
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
                <p className="text-xs text-foreground/80">{certification.institution}</p>
                {certification.expiring && (
                    <p className="text-xs text-foreground/80">Expires {certification.expiring}</p>
                )}
                <Link
                    href={certification.verifyLink}
                    target="_blank"
                    className="text-xs text-foreground hover:underline mt-1 inline-block"
                >
                    Verify Credential
                </Link>
            </div>
        </div>
    );
};

const CertificationsSection = () => {
    const [certifications, setCertifications] = useState<Certification[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCertifications = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/certifications`);
                const data = await res.json();
                const fetched = data.certifications || [];
                setCertifications(fetched.map((c: any) => ({
                    picture: c.picture,
                    title: c.title,
                    date: c.date,
                    expiring: c.expiring,
                    institution: c.institution,
                    verifyLink: c.verify_link,
                })));
            } catch (error) {
                console.error("Failed to fetch certifications:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchCertifications();
    }, []);

    if (loading) {
        return (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[0, 1, 2, 3].map((i) => (
                    <CertificationCardSkeleton key={i} />
                ))}
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {certifications.map((cert, index) => (
                <CertificationCard key={index} certification={cert} />
            ))}
        </div>
    );
};

export default CertificationsSection;