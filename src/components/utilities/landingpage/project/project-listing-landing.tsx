import Icon from "@/components/utilities/shared/icon"
import Image from "next/image"
import { useState } from "react"

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
    const images = [
        "/projects/beembridge.png", // Your original image
        "https://placehold.co/500x300/007bff/ffffff?text=BeemBridge+Screenshot+1",
        "https://placehold.co/500x300/8A2BE2/ffffff?text=BeemBridge+Screenshot+2",
        "https://placehold.co/500x300/DC143C/ffffff?text=BeemBridge+Screenshot+3"
    ];
    const handlePrevClick = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === 0 ? project.images.length - 1 : prevIndex - 1
        );
    };

    const handleNextClick = () => {
        setCurrentImageIndex((prevIndex) =>
            prevIndex === project.images.length - 1 ? 0 : prevIndex + 1
        );
    };
    const LeftCarouselArrowIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z" />
        </svg>
    );

    // Right Arrow for Carousel
    const RightCarouselArrowIcon = () => (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z" />
        </svg>
    );


    return (
        <div className="flex flex-col gap-10 mt-40 mb-10">
            <span className="flex gap-5 flex-row mt-10 items-center">
                <Icon name="check-circle" classes="w-7 h-7" />
                <div className="w-[1px] h-5 bg-white" />
                Finished
            </span>
            <div className="flex flex-col md:flex-row">
                <div className="flex flex-col gap-10 max-sm:justify-center max-sm:items-center">
                    <h1 className="text-white text-6xl my-7">{project.name}</h1>
                    <p className="w-1/2 md:w-1/3">
                        {project.description}
                    </p>

                    <a href={project.websiteLink} target="_blank" rel="noopener noreferrer">
                        <button className="bg-callout text-white py-2 px-7 rounded-md w-fit">
                            VISIT APP WEBSITE
                        </button>
                    </a>
                    <div
                        className="flex h-fit items-center text-white cursor-pointer mt-4 text-md hover:text-gray-300 transition-colors duration-200"
                        onClick={() => setShowTechnologies(!showTechnologies)}
                    >
                        <span className="mr-5">more info</span>
                        {showTechnologies ? <Icon color="currentColor" name="uparrow" classes="w-5 h-5" /> : <Icon color="currentColor" name="downarrow" classes="w-5 h-5" />}
                    </div>

                </div>

                <div className="relative flex items-center justify-center w-full max-w-[500px] mx-auto md:mx-0 mt-10 md:mt-0">
                    <button
                        onClick={handlePrevClick}
                        className="absolute left-0 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full ml-2 focus:outline-none hover:bg-opacity-75 transition-colors duration-200"
                        aria-label="Previous image"
                    >
                        <LeftCarouselArrowIcon />
                    </button>
                    <Image
                        className="border-4 border-white rounded-xl shadow-lg transform hover:scale-105 transition-transform duration-300 w-full h-auto object-contain"
                        src={images[currentImageIndex]}
                        alt={`${project.name} screenshot ${currentImageIndex + 1}`}
                        width={500} // Set explicit width for better layouting, though w-full will scale it
                        height={300} // Adjust height as needed to maintain aspect ratio with 500 width for placeholder
                    />
                    <button
                        onClick={handleNextClick}
                        className="absolute right-0 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full mr-2 focus:outline-none hover:bg-opacity-75 transition-colors duration-200"
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