'use client';
import { NavBar } from "@/components/utilities/shared/navbar";
import { Footer } from "@/components/pages/landing/footer";
import { BuyMeACoffee } from "@/components/utilities/shared/buymecoffee";
import { ServicesPageSection } from "@/components/pages/services/services";


export default function Home() {
    return (
        <>
            <NavBar />
            <ServicesPageSection />
            <BuyMeACoffee />
            <Footer />
        </>
    );
}