import React, { useState, useEffect } from 'react';
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
            {/* Dark overlay for visual effect */}
            <div className="absolute inset-0 bg-[#000000ca] z-10"></div>
            {/* Another dark overlay, slightly lighter */}
            <div className="absolute inset-0 bg-[#000000b0] z-0"></div>

            {/* Image container */}
            <div className="absolute inset-0 w-full h-full">
                {images.map((image, index) => (
                    <Image
                        key={image} // Unique key for each image
                        src={image} // Image source URL
                        alt={`Slide ${index + 1}`} // Alt text for accessibility
                        width="1920" // Set a default width for the image
                        height="1080" // Set a default height for the image
                        // Tailwind classes for styling:
                        // absolute: Position absolutely within the parent
                        // inset-0: Top, right, bottom, left to 0 (covers parent)
                        // w-full h-full: Full width and height (these will override the fixed width/height for display)
                        // object-cover: Crop image to cover the container while maintaining aspect ratio
                        // transition-opacity duration-1000 ease-in-out: Smooth opacity transition over 1 second
                        // opacity-0 or opacity-100: Hide or show based on currentSlide
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1500 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
                            }`}
                    />
                ))}
            </div>
        </div>
    );
}

export default Slider;