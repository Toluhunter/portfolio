'use client';
import { NavBar } from "@/components/utilities/shared/navbar";
import { Footer } from "@/components/pages/landing/footer";
import { BuyMeACoffee } from "@/components/utilities/shared/buymecoffee";
import { ServicesPageSection } from "@/components/pages/services/services";


export default function Home() {
    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-background/50 backdrop-blur-sm">
                <ServicesPageSection />
            </div>
            <BuyMeACoffee />
            <Footer />
        </>
    );
}