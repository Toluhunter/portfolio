import { Title } from "@/components/utilities/shared/title";
import { CertificationsCarousel } from "@/components/utilities/landingpage/certifications/certifications-carousel";
import { Certification } from "@/components/utilities/landingpage/certifications/certficiation-card";

const certifications: Certification[] = [
    {
        id: '1',
        picture: 'https://placehold.co/100x100/A0D6B4/0C0D1A.png?text=Security%2B', // Placeholder image
        title: 'CompTIA Security+',
        date: 'October 2023',
        institution: 'CompTIA',
        verifyLink: '#', // Replace with actual verification link
    },
    {
        id: '2',
        picture: 'https://placehold.co/100x100/F0C27B/0C0D1A.png?text=AWS%20DevOps%20Pro', // Placeholder image
        title: 'AWS Certified DevOps Engineer - Professional',
        date: 'July 2024',
        institution: 'Amazon Web Services (AWS)',
        verifyLink: '#', // Replace with actual verification link
    },
    {
        id: '3',
        picture: 'https://placehold.co/100x100/98C1D9/0C0D1A.png?text=Azure%20Admin', // Placeholder image
        title: 'Microsoft Certified: Azure Administrator Associate',
        date: 'April 2023',
        institution: 'Microsoft',
        verifyLink: '#', // Replace with actual verification link
    },
    {
        id: '4',
        picture: 'https://placehold.co/100x100/E9AFA3/0C0D1A.png?text=CCNA', // Placeholder image
        title: 'Cisco Certified Network Associate (CCNA)',
        date: 'February 2022',
        institution: 'Cisco',
        verifyLink: '#', // Replace with actual verification link
    },
    {
        id: '5',
        picture: 'https://placehold.co/100x100/C2D8B9/0C0D1A.png?text=PMP', // Placeholder image
        title: 'Project Management Professional (PMP)',
        date: 'December 2023',
        institution: 'Project Management Institute (PMI)',
        verifyLink: '#', // Replace with actual verification link
    },
];

export const CertificationsSection = () => {
    return (
        <section className="relative flex flex-col overflow-hidden bg-background items-center">
            <div className="flex flex-col h-screen bg-background container">
                <Title text="Certifications" />
                <CertificationsCarousel certifications={certifications} />

            </div>
        </section>

    )
}