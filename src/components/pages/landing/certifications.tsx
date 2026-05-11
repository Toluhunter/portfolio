import { Title } from "@/components/utilities/shared/title";
import { CertificationsCarousel } from "@/components/utilities/landingpage/certifications/certifications-carousel";
import { certifications } from "@/data/content.json";


export const CertificationsSection = () => {
    return (
        <section className="relative flex flex-col overflow-hidden items-center py-12">
            <div className="absolute inset-x-0 top-0 h-24 md:h-32 bg-gradient-to-b from-background to-transparent pointer-events-none" />
            <div className="flex flex-col w-full container">
                <Title text="Certifications" />
                <CertificationsCarousel certifications={certifications} />
            </div>
        </section>
    )
}
