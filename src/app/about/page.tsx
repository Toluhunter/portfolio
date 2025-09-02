'use client';
import { NavBar } from "@/components/utilities/shared/navbar";
import { AboutSection } from "@/components/pages/about/about";
import { Footer } from "@/components/pages/landing/footer";
import { BuyMeACoffee } from "@/components/utilities/shared/buymecoffee";


export default function Home() {
    return (
        <>
            <NavBar />
            <AboutSection/>
            <BuyMeACoffee />
            <Footer />
        </>
    );
}
