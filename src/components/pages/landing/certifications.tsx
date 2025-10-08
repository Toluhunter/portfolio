import { Title } from "@/components/utilities/shared/title";
import { CertificationsCarousel } from "@/components/utilities/landingpage/certifications/certifications-carousel";
// import { Certification } from "@/components/utilities/landingpage/certifications/certficiation-card";
import { certifications } from "@/data/content.json";


export const CertificationsSection = () => {
    return (
        <section className="relative flex h-screen max-h-[1600px] flex-col overflow-hidden bg-[url('https://assets.toluhunter.com/landing/backgrounds/certifications.webp')] bg-cover bg-center items-center">

            <div className="flex flex-col h-screen container">
                <Title text="Certifications" />
                <CertificationsCarousel certifications={certifications} />

            </div>
        </section>

    )
}