'use client';
import { NavBar } from "@/components/utilities/shared/navbar";
import { ExperiencePageSection } from "@/components/pages/experience/experience";
import { Footer } from "@/components/pages/landing/footer";

export default function ExperiencePage() {
    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-background/50 backdrop-blur-sm">
                <ExperiencePageSection />
            </div>
            <Footer />
        </>
    );
}
