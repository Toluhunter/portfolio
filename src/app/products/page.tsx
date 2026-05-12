'use client';
import { NavBar } from "@/components/utilities/shared/navbar";
import { Footer } from "@/components/pages/landing/footer";
import { BuyMeACoffee } from "@/components/utilities/shared/buymecoffee";
import { ProductsPageSection } from "@/components/pages/products/products";

export default function ProductsPage() {
    return (
        <>
            <NavBar />

            <div className="min-h-screen bg-background/50 backdrop-blur-sm" style={{
                color: 'var(--foreground)',
                fontFamily: 'Arial, Helvetica, sans-serif'
            }}>
                <ProductsPageSection />
            </div>

            <BuyMeACoffee />
            <Footer />
        </>
    );
}