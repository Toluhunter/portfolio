import { Title } from "@/components/utilities/shared/title";
import { CertificationsCarousel } from "@/components/utilities/landingpage/certifications/certifications-carousel";
import { Certification } from "@/components/utilities/landingpage/certifications/certficiation-card";


const certifications: Certification[] = [
    {
        picture: 'https://assets.toluhunter.com/certifications/comptia-security-ce-certification.webp',
        title: 'CompTIA Security+ ce Certification',
        date: 'August 16, 2024',
        institution: 'CompTIA',
        verifyLink: 'https://www.credly.com/badges/b41ec3b7-e89b-425a-9a27-1acab75c06f5',
    },
    {
        picture: 'https://assets.toluhunter.com/certifications/aws-certified-devops-engineer-professional.webp',
        title: 'AWS Certified DevOps Engineer – Professional',
        date: 'June 05, 2024',
        institution: 'Amazon Web Services (AWS)',
        verifyLink: 'https://www.credly.com/badges/903530ff-d305-4c6f-8edf-7c459cea45fc', // Replace with actual verification link
    },
    {
        picture: 'https://assets.toluhunter.com/certifications/aws-certified-machine-learning-specialty.webp',
        title: 'AWS Certified Machine Learning – Specialty',
        date: 'March 01, 2025',
        institution: 'Amazon Web Services (AWS)',
        verifyLink: 'https://www.credly.com/badges/51d36c94-97ce-4d4c-b286-f98a769f2e71', // Replace with actual verification link
    },
    {
        picture: 'https://assets.toluhunter.com/certifications/aws-certified-solutions-architect-associate.webp',
        title: 'AWS Certified Solutions Architect - Associate',
        date: 'February 07, 2024',
        institution: 'Amazon Web Services (AWS)',
        verifyLink: 'https://www.credly.com/badges/07e8216c-1aa2-4d75-847a-c5442d73462e', // Replace with actual verification link
    },
    {
        picture: 'https://assets.toluhunter.com/certifications/certified-in-cybersecurity-cc.webp',
        title: 'Certified in Cybersecurity (CC)',
        date: 'December 31, 2023',
        institution: 'ISC2',
        verifyLink: 'https://www.credly.com/badges/89c54739-c2c5-4fc0-8bcc-832192d9191d/public_url'
    }
];

export const CertificationsSection = () => {
    return (
        <section className="relative flex min-h-screen flex-col overflow-hidden bg-[url('https://assets.toluhunter.com/landing/backgrounds/certifications.webp')] bg-cover bg-center items-center">

            <div className="flex flex-col h-screen bg-background container">
                <Title text="Certifications" />
                <CertificationsCarousel certifications={certifications} />

            </div>
        </section>

    )
}