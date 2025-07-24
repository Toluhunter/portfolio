'use client';
import { PdfView } from "@/components/pages/CV/pdfview";
import { NavBar } from "@/components/utilities/shared/navbar";
import { Footer } from "@/components/pages/landing/footer";
import { BuyMeACoffee } from "@/components/utilities/shared/buymecoffee";


export default function Home() {
    return (
        <>
            <NavBar />
            <PdfView />
            <BuyMeACoffee />
            <Footer />
        </>
    );
}
