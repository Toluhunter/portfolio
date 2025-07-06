'use client';
import { NavBar } from "@/components/utilities/shared/navbar";
import { InProgress } from "@/components/utilities/shared/inprogress";
import { Footer } from "@/components/pages/landing/footer";


export default function Home() {
    return (
        <>
            <NavBar />
            <InProgress />
            <Footer />
        </>
    );
}
