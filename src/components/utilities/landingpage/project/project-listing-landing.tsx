'use client';
import Icon from "@/components/utilities/shared/icon"
import Image from "next/image"
import { useState, useEffect } from "react"

export interface Project {
    name: string;
    status: string;
    description: string[];
    images: string[];
    websiteLink?: string;
    technologies?: string[];
    subtitle: string;
    roles?: string[];
}

export const ProjectListing = ({ project }: { project: Project }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const images = project.images;

    useEffect(() => {
        setCurrentImageIndex(0);
    }, [project]);

    useEffect(() => {
        if (images.length <= 1 || isHovered) return;
        const interval = setInterval(() => {
            setCurrentImageIndex(prev => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length, isHovered, currentImageIndex]);

    const visitButton = project.websiteLink && (
        <a href={project.websiteLink} target="_blank" rel="noopener noreferrer" className="self-start">
            <button className="bg-callout text-foreground py-2 px-7 rounded-md w-fit hover:bg-callout transition-colors duration-300 border-2 border-callout cursor-pointer">
                VISIT APP WEBSITE
            </button>
        </a>
    );

    const technicalDetailsToggle = (
        <button
            className="flex items-center gap-3 self-start text-sm font-semibold text-foreground border border-foreground/40 rounded-md px-4 py-2 hover:border-foreground hover:bg-foreground/10 transition-all duration-200 cursor-pointer"
            onClick={() => setShowDetails(!showDetails)}
        >
            <span>Technical Details</span>
            {showDetails
                ? <Icon color="currentColor" name="uparrow" classes="w-4 h-4" />
                : <Icon color="currentColor" name="downarrow" classes="w-4 h-4" />}
        </button>
    );

    const detailsPanel = showDetails && (
        <div className="w-full p-5 bg-background rounded-lg text-foreground shadow-xl animate-fade-in flex flex-col gap-6">
            {project.technologies && project.technologies.length > 0 && (
                <div>
                    <h3 className="font-bold text-lg mb-3 border-b border-foreground/20 pb-2">Stack</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                        {project.technologies.map((tech, index) => (
                            <li key={index}>{tech}</li>
                        ))}
                    </ul>
                </div>
            )}
            {project.roles && project.roles.length > 0 && (
                <div>
                    <h3 className="font-bold text-lg mb-3 border-b border-foreground/20 pb-2">Key Contributions</h3>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                        {project.roles.map((role, index) => (
                            <li key={index}>{role}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );

    const descriptionParagraphs = (extraClass = "") => project.description.map((para, index) => (
        <p key={index} className={`w-full text-foreground ${extraClass}`}>{para}</p>
    ));

    return (
        <div id="project-listing" className="flex flex-col gap-10 px-4 md:px-0">
            <span id="project-status" className="flex gap-5 flex-row items-center text-foreground">
                <Icon name="check-circle" classes="w-7 h-7 text-callout" />
                <div className="w-[1px] h-5 bg-foreground" />
                {project.status}
            </span>

            <div className="flex flex-col lg:flex-row lg:gap-10 items-start">

                {/* MOBILE: title + subtitle appear first, above the image */}
                <div className="lg:hidden flex flex-col gap-2 w-full">
                    <h1 className="text-foreground text-4xl my-4">{project.name}</h1>
                    <h2 className="text-2xl font-semibold text-gray-400">{project.subtitle}</h2>
                </div>

                {/* DESKTOP: full left column with all text content */}
                <div id="project-info" className="hidden lg:flex flex-col gap-5 text-left lg:w-1/2">
                    <h1 className="text-foreground text-6xl my-4">{project.name}</h1>
                    <h2 className="text-2xl font-semibold text-gray-400 -mt-4 mb-4">{project.subtitle}</h2>
                    <div className="flex flex-col gap-3 mb-4">
                        {descriptionParagraphs()}
                    </div>
                    {visitButton}
                    <div className="mt-4">{technicalDetailsToggle}</div>
                </div>

                {/* Image carousel: second on mobile, right column on desktop */}
                <div
                    id="project-image-carousel"
                    className="w-3/4 max-w-[500px] mx-auto mt-8 lg:mt-0 flex-shrink-0"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    {/* Stacked images with fade crossfade */}
                    <div className="relative w-full aspect-[4/3] border-4 border-foreground rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                        {images.map((src, index) => (
                            <Image
                                key={src}
                                className={`object-contain transition-opacity duration-700 ${index === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
                                src={src}
                                alt={`${project.name} screenshot ${index + 1}`}
                                fill
                                sizes="(max-width: 1024px) 75vw, 400px"
                                onError={(e) => { e.currentTarget.src = 'https://placehold.co/500x300/CCCCCC/333333?text=Image+Error'; }}
                            />
                        ))}
                    </div>

                    {/* Dot indicators - only shown when there are multiple images */}
                    {images.length > 1 && (
                        <div className="flex justify-center gap-2 mt-3">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`rounded-full transition-all duration-300 cursor-pointer ${
                                        index === currentImageIndex
                                            ? 'bg-foreground w-4 h-2'
                                            : 'bg-gray-500 w-2 h-2 hover:bg-gray-300'
                                    }`}
                                    aria-label={`Go to image ${index + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* MOBILE: description, buttons, technical details toggle appear after the image */}
                <div id="project-info-mobile" className="lg:hidden flex flex-col gap-5 text-left w-full mt-6">
                    <div className="flex flex-col gap-3">
                        {descriptionParagraphs()}
                    </div>
                    {visitButton}
                    {technicalDetailsToggle}
                    {detailsPanel}
                </div>

            </div>

            {/* DESKTOP: details panel sits below the two-column row */}
            <div id="project-details" className="hidden lg:block">
                {detailsPanel}
            </div>
        </div>
    );
};
