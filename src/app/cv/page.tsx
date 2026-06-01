'use client';
import dynamic from 'next/dynamic';
import { NavBar } from "@/components/utilities/shared/navbar";
import { Footer } from "@/components/pages/landing/footer";

const PdfView = dynamic(
    () => import('@/components/pages/CV/pdfview').then(m => m.PdfView),
    {
        ssr: false,
        loading: () => (
            <div className="min-h-screen flex items-center justify-center">
                <span className="font-mono text-foreground/50 animate-pulse">Loading CV...</span>
            </div>
        ),
    }
);

export default function CVPage() {
    return (
        <>
            <NavBar />
            <PdfView />
            <Footer />
        </>
    );
}