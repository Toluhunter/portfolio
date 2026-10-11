import { useState, useEffect } from 'react';
import Image from 'next/image';

function Slider() {
    // Array of image URLs for the slider
    const images = [
        "https://assets.toluhunter.com/landing/slider/code.webp",
        "https://assets.toluhunter.com/landing/slider/AI.webp",
        "https://assets.toluhunter.com/landing/slider/security.webp"
    ];

    // State to keep track of the current slide index
    const [currentSlide, setCurrentSlide] = useState(0);

    // Autoplay effect
    useEffect(() => {
        // Set an interval to change the slide every 2500 milliseconds (2.5 seconds)
        // Background artwork holds still for people who prefer reduced motion.
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        const interval = setInterval(() => {
            // Increment the current slide index, looping back to 0 if it exceeds the number of images
            setCurrentSlide((prevSlide) => (prevSlide + 1) % images.length);
        }, 3500);

        // Clear the interval when the component unmounts or the effect re-runs
        return () => clearInterval(interval);
    }, [images.length]); // Re-run the effect if the number of images changes

    return (
        // Changed the main container to be absolute and cover the full width/height of its positioned parent.
        // This ensures it acts as a background that other elements can overlap.
        <div className="absolute inset-0 w-full h-full overflow-hidden">
            {/* One even veil over the whole hero, in the page's own background color, fading into the next section */}
            <div className="absolute inset-0 bg-background/85 z-10" />
            <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background z-10" />

            {/* Image container */}
            <div className="absolute inset-0 w-full h-full">
                {images.map((image, index) => (
                    <Image
                        key={image}
                        src={image}
                        alt=""
                        fill
                        sizes="100vw"
                        className={`object-cover transition-opacity duration-1500 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                    />
                ))}
            </div>
        </div>
    );
}

export default Slider;