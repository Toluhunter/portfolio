'use client';
import { NavBar } from "@/components/utilities/shared/navbar";
import { Herosection } from "@/components/pages/landing/hero";
import { ProjectSection } from "@/components/pages/landing/projects";
import { CertificationsSection } from "@/components/pages/landing/certifications";
import { SkillSection } from "@/components/pages/landing/skills";
import { ContactMeSection } from "@/components/pages/landing/contact";
import { Footer } from "@/components/pages/landing/footer";


export default function Home() {
  return (
    <>
      <NavBar />
      <Herosection />
      <ProjectSection />
      <CertificationsSection />
      <SkillSection />
      <ContactMeSection />
      <Footer />
    </>
  );
}
