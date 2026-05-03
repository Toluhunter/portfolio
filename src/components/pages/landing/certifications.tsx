import { Title } from "@/components/utilities/shared/title";
import { CertificationsCarousel } from "@/components/utilities/landingpage/certifications/certifications-carousel";
import { certifications } from "@/data/content.json";


export const CertificationsSection = () => {
    return (
        <section className="relative flex flex-col overflow-hidden items-center py-12">
            <div className="flex flex-col w-full container">
                <Title text="Certifications" />
                <CertificationsCarousel certifications={certifications} />
            </div>
        </section>
    )
}
