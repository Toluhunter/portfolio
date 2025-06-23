import Icon from "@/components/utilities/shared/icon"
import Image from "next/image"
import { useState } from "react"
import { ChevronRight, ChevronLeft } from "lucide-react";

export interface Project {
    name: string;
    description: string;
    images: string[];
    websiteLink?: string; // Optional, as it might not always be present
    technologies?: string[]; // Optional, as it might not always be present
}

export const ProjectListing = ({ project }: { project: Project }) => {
    const [showTechnologies, setShowTechnologies] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Using placeholder URLs since local assets are not supported in Canvas
    const images = project.images.map(img => {
        // Simple check to use placeholder if it's a local path
        if (img.startsWith('/')) {
            // Provide a generic placeholder if original doesn't specify size, or use a default
            return `https://placehold.co/500x300/CCCCCC/333333.png?text=${project.name}`;
        }
        return img;
    });

    const handlePrevClick = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNextClick = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    // Left Arrow for Carousel (reusing Lucide icons for consistency)
    const LeftCarouselArrowIcon = () => <ChevronLeft size={24} color="currentColor" />;
    // Right Arrow for Carousel (reusing Lucide icons for consistency)
    const RightCarouselArrowIcon = () => <ChevronRight size={24} color="currentColor" />;


    return (
        <div className="flex flex-col gap-10 mt-10 mb-10 px-4 md:px-0"> {/* Added padding for smaller screens */}
            <span className="flex gap-5 flex-row mt-10 items-center text-gray-400">
                <Icon name="check-circle" classes="w-7 h-7 text-green-500" /> {/* Added color to check-circle */}
                <div className="w-[1px] h-5 bg-white" />
                Finished
            </span>
            <div className="flex flex-col md:flex-row md:gap-10 items-center md:items-start"> {/* Added items-center for better alignment on mobile */}
                <div className="flex flex-col gap-5 text-center md:text-left md:w-1/2"> {/* Added md:w-1/2 for flex distribution */}
                    <h1 className="text-white text-4xl md:text-6xl my-4">{project.name}</h1> {/* Adjusted text size for responsiveness */}
                    <p className="w-full text-gray-300 mb-4 md:mb-0"> {/* Ensure description takes full width on mobile */}
                        {project.description}
                    </p>

                    {project.websiteLink && (
                        <a href={project.websiteLink} target="_blank" rel="noopener noreferrer" className="self-center md:self-start">
                            <button className="bg-callout-custom text-white py-2 px-7 rounded-md w-fit hover:bg-purple-700 transition-colors duration-300"> {/* Changed to bg-callout-custom */}
                                VISIT APP WEBSITE
                            </button>
                        </a>
                    )}
                    <div
                        className="flex h-fit items-center text-white cursor-pointer mt-4 text-md hover:text-gray-300 transition-colors duration-200 self-center md:self-start"
                        onClick={() => setShowTechnologies(!showTechnologies)}
                    >
                        <span className="mr-5">more info</span>
                        {showTechnologies ? <Icon color="currentColor" name="uparrow" classes="w-5 h-5" /> : <Icon color="currentColor" name="downarrow" classes="w-5 h-5" />}
                    </div>

                </div>

                <div className="relative flex items-center justify-center w-full max-w-[500px] mx-auto mt-10 md:mt-0 flex-shrink-0">
                    <button
                        onClick={handlePrevClick}
                        className="absolute left-2 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full focus:outline-none hover:bg-opacity-75 transition-colors duration-200"
                        aria-label="Previous image"
                    >
                        <LeftCarouselArrowIcon />
                    </button>
                    <Image // Changed from Image to img
                        className="border-4 border-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 w-full h-auto object-contain"
                        src={images[currentImageIndex]}
                        alt={`${project.name} screenshot ${currentImageIndex + 1}`}
                        width={500} // Explicit width
                        height={300} // Explicit height
                        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://placehold.co/500x300/CCCCCC/333333?text=Image+Error'; }} // Fallback
                    />
                    <button
                        onClick={handleNextClick}
                        className="absolute right-2 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full focus:outline-none hover:bg-opacity-75 transition-colors duration-200"
                        aria-label="Next image"
                    >
                        <RightCarouselArrowIcon />
                    </button>
                </div>

            </div>
            {showTechnologies && project.technologies && project.technologies.length > 0 && (
                <div className="w-full mt-4 p-5 bg-gray-800 rounded-lg text-white shadow-xl animate-fade-in">
                    <h3 className="font-bold text-lg mb-3 border-b border-gray-700 pb-2">Technologies Used:</h3>
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