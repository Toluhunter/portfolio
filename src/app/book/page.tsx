'use client'

import { NavBar } from "@/components/utilities/shared/navbar";
import { Footer } from "@/components/pages/landing/footer";
import { BookingSection } from "@/components/pages/book/booking";

export default function BookPage() {
    return (
        <>
            <NavBar />
            <BookingSection />
            <Footer />
        </>
    );
}
