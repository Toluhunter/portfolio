import { useRef } from "react";
import { CertificationCard, Certification } from "./certficiation-card";

export const CertificationsCarousel: React.FC<{ certifications: Certification[] }> = ({ certifications }) => {
    const carouselRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (carouselRef.current) {
            const scrollAmount = direction === 'left' ? -350 : 350; // Adjust scroll amount as needed
            carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    return (
        <div className="flex flex-row w-full h-full justify-center items-center mx-auto py-8">

            {/* Navigation Buttons */}
            <button
                onClick={() => scroll('left')}
                className="bg-gray-700 bg-opacity-70 text-white p-3 rounded-full shadow-lg hover:bg-opacity-100 transition duration-300 z-10 hidden md:block"
                aria-label="Scroll left"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
            </button>
            <div
                ref={carouselRef}
                className="flex overflow-x-scroll no-scrollbar snap-x snap-mandatory pb-6"
            >
                {certifications.map((cert, id) => (
                    <CertificationCard key={id} cert={cert} />
                ))}
            </div>
            <button
                onClick={() => scroll('right')}
                className="bg-gray-700 bg-opacity-70 text-white p-3 rounded-full shadow-lg hover:bg-opacity-100 transition duration-300 z-10 hidden md:block"
                aria-label="Scroll right"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
            </button>
        </div>
    );
};