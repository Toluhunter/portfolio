'use client';
import { NavBar } from "@/components/utilities/shared/navbar";
import { AboutSection } from "@/components/pages/about/about";
import { Footer } from "@/components/pages/landing/footer";
import { BuyMeACoffee } from "@/components/utilities/shared/buymecoffee";


export default function Home() {
    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-background/50 backdrop-blur-sm">
                <AboutSection/>
            </div>
            <BuyMeACoffee />
            <Footer />
        </>
    );
}
