"use client";
import { useEffect, useState } from "react";
import { Title } from "@/components/utilities/shared/title";
import { CertificationsCarousel } from "@/components/utilities/landingpage/certifications/certifications-carousel";
import { Certification } from "@/components/utilities/landingpage/certifications/certficiation-card";
import { LandingCertificationsSkeleton } from "@/components/utilities/shared/skeletons";

export const CertificationsSection = () => {
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

    if (!loading && certifications.length === 0) return null;

    return (
        <section className="relative flex flex-col overflow-hidden items-center py-12">
            <div className="absolute inset-x-0 top-0 h-24 md:h-32 bg-gradient-to-b from-background to-transparent pointer-events-none" />
            <div className="flex flex-col w-full container">
                <Title text="Certifications" />
                {loading ? <LandingCertificationsSkeleton /> : <CertificationsCarousel certifications={certifications} />}
            </div>
        </section>
    )
}
