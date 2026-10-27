'use client';
import { NavBar } from "@/components/utilities/shared/navbar";
import { Footer } from "@/components/pages/landing/footer";
import { ProductsPageSection } from "@/components/pages/products/products";

export default function ProductsPage() {
    return (
        <>
            <NavBar />

            <div className="min-h-screen bg-background/50 md:backdrop-blur-sm">
                <ProductsPageSection />
            </div>

            <Footer />
        </>
    );
}