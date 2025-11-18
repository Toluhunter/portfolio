'use client';
import Icon from "@/components/utilities/shared/icon"
import Image from "next/image"
import { useState, useEffect } from "react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

export interface Project {
    name: string;
    status: string;
    description: string;
    images: string[];
    websiteLink?: string; // Optional, as it might not always be present
    technologies?: string[]; // Optional, as it might not always be present
    subtitle: string;
    roles?: string[]; // Added roles field
}

export const ProjectListing = ({ project }: { project: Project }) => {
    const [showTechnologies, setShowTechnologies] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const [isImageLoading, setIsImageLoading] = useState(true);

    // Using placeholder URLs since local assets are not supported in Canvas
    const images = project.images
    useEffect(() => {
        // Function to check window width
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024);
        };

        // Set initial value
        handleResize();

        // Listen for resize events
        window.addEventListener("resize", handleResize);

        // Cleanup
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handlePrevClick = () => {
        setIsImageLoading(true);
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNextClick = () => {
        setIsImageLoading(true);
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    // Left Arrow for Carousel (reusing Lucide icons for consistency)
    const LeftCarouselArrowIcon = () => <FaChevronLeft size={24} color="currentColor" />;
    // Right Arrow for Carousel (reusing Lucide icons for consistency)
    const RightCarouselArrowIcon = () => <FaChevronRight size={24} color="currentColor" />;


    return (
        <div className="flex flex-col gap-10 mt-10 mb-10 px-4 md:px-0"> {/* Added padding for smaller screens */}
            <span className="flex gap-5 flex-row mt-10 items-center text-foreground">
                <Icon name="check-circle" classes="w-7 h-7 text-callout" /> {/* Added color to check-circle */}
                <div className="w-[1px] h-5 bg-foreground" />
                {project.status}
            </span>
            <div className="flex flex-col lg:flex-row lg:gap-10 items-center lg:items-start"> {/* Added items-center for better alignment on mobile */}
                <div className="flex flex-col gap-5 text-center md:text-left lg:w-1/2"> {/* Added md:w-1/2 for flex distribution */}
                    <h1 className="text-foreground text-4xl lg:text-6xl my-4">{project.name}</h1> {/* Adjusted text size for responsiveness */}
                    <h2 className="text-2xl font-semibold text-gray-400 -mt-4 mb-4">{project.subtitle}</h2>
                    <p className="w-full text-foreground mb-4 md:mb-0"> {/* Ensure description takes full width on mobile */}
                        {project.description}
                    </p>

                    {project.websiteLink && (
                        <a href={project.websiteLink} target="_blank" rel="noopener noreferrer" className="self-center lg:self-start">
                            <button className="bg-callout text-foreground py-2 px-7 rounded-md w-fit hover:bg-callout transition-colors duration-300 border-2 border-callout"> {/* Changed to bg-callout-custom */}
                                VISIT APP WEBSITE
                            </button>
                        </a>
                    )}
                    <div
                        className="flex h-fit items-center text-foreground cursor-pointer mt-4 text-md hover:text-foreground transition-colors duration-200 self-center lg:self-start"
                        onClick={() => setShowTechnologies(!showTechnologies)}
                    >
                        <span className="mr-5">more info</span>
                        {showTechnologies ? <Icon color="currentColor" name="uparrow" classes="w-5 h-5" /> : <Icon color="currentColor" name="downarrow" classes="w-5 h-5" />}
                    </div>

                </div>
                {isMobile && showTechnologies && project.technologies && project.technologies.length > 0 && (
                    <div className="w-full mt-4 p-5 bg-background rounded-lg text-foreground shadow-xl animate-fade-in">
                        <h3 className="font-bold text-lg mb-3 border-b border-foreground pb-2">Technologies Used:</h3>
                        <ul className="list-disc list-inside space-y-1">
                            {project.technologies.map((tech, index) => (
                                <li key={index}>{tech}</li>
                            ))}
                        </ul>
                    </div>
                )}

                <div className="relative flex items-center justify-center w-3/4 max-w-[500px] mx-auto mt-10 md:mt-0 flex-shrink-0">
                    {isImageLoading && (
                        <div className="absolute inset-0 bg-gray-700 rounded-xl animate-pulse"></div>
                    )}
                    {currentImageIndex > 0 && // Show previous button only if there are images to show
                        <button
                            onClick={handlePrevClick}
                            className="absolute left-2 z-10 p-2 bg-background bg-opacity-50 text-foreground rounded-full focus:outline-none hover:bg-opacity-75 transition-colors duration-200"
                            aria-label="Previous image"
                        >
                            <LeftCarouselArrowIcon />
                        </button>
                    }
                    <Image
                        className={`border-4 border-foreground rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 w-full h-auto object-contain transition-opacity duration-300 ${isImageLoading ? 'opacity-0' : 'opacity-100'}`}
                        src={images[currentImageIndex]}
                        alt={`${project.name} screenshot ${currentImageIndex + 1}`}
                        width={400} // Explicit width
                        height={300} // Explicit height
                        onLoadingComplete={() => setIsImageLoading(false)}
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://placehold.co/500x300/CCCCCC/333333?text=Image+Error'; setIsImageLoading(false);}} // Fallback
                    />
                    {currentImageIndex < images.length - 1 && // Show next button only if there are more images to show
                        <button
                            onClick={handleNextClick}
                            className="absolute right-2 z-10 p-2 bg-background bg-opacity-50 text-foreground rounded-full focus:outline-none hover:bg-opacity-75 transition-colors duration-200"
                            aria-label="Next image"
                        >
                            <RightCarouselArrowIcon />
                        </button>
                    }
                </div>

            </div>
            {!isMobile && showTechnologies && project.technologies && project.technologies.length > 0 && (
                <div className="w-full mt-4 p-5 bg-background rounded-lg text-foreground shadow-xl animate-fade-in">
                    <h3 className="font-bold text-lg mb-3 border-b border-foreground pb-2">Technologies Used:</h3>
                    <ul className="list-disc list-inside space-y-1">
                        {project.technologies.map((tech, index) => (
                            <li key={index}>{tech}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
