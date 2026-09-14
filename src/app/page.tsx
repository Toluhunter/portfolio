'use client';
import { NavBar } from "@/components/utilities/shared/navbar";
import { Herosection } from "@/components/pages/landing/hero";
import { ServicesSection } from "@/components/pages/landing/services";
import { ProjectSection } from "@/components/pages/landing/projects";
import { EngagementsSection } from "@/components/pages/landing/engagements";
import { CertificationsSection } from "@/components/pages/landing/certifications";
import { SkillSection } from "@/components/pages/landing/skills";
import { ContactMeSection } from "@/components/pages/landing/contact";
import { Footer } from "@/components/pages/landing/footer";


export default function Home() {
  return (
    <>
      <NavBar />
      <Herosection />
      <ServicesSection />
      <ProjectSection />
      <EngagementsSection />
      <CertificationsSection />
      <SkillSection />
      <ContactMeSection />
      <Footer />
    </>
  );
}
