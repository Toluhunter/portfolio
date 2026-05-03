import { Title } from "@/components/utilities/shared/title"
import { ProjectListing } from "@/components/utilities/landingpage/project/project-listing-landing"
import { FaGithub } from "react-icons/fa"
import { useState, useEffect, useRef } from "react"
import projects from "@/data/projects.json";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";


export const ProjectSection = () => {
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
    const [direction, setDirection] = useState<'left' | 'right' | null>(null);
    const [hasEntered, setHasEntered] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setHasEntered(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1 }
        );
        if (sectionRef.current) observer.observe(sectionRef.current);
        return () => observer.disconnect();
    }, []);

    const handlePrevProjectClick = () => {
        setDirection('left');
        setCurrentProjectIndex((prevIndex) =>
            prevIndex === 0 ? projects.length - 1 : prevIndex - 1
        );
    };

    const handleNextProjectClick = () => {
        setDirection('right');
        setCurrentProjectIndex((prevIndex) =>
            prevIndex === projects.length - 1 ? 0 : prevIndex + 1
        );
    };

    const slideClass = !hasEntered
        ? 'opacity-0'
        : direction === 'right'
        ? 'animate-slide-from-right'
        : direction === 'left'
        ? 'animate-slide-from-left'
        : 'animate-slide-from-top';

    return (
        <section ref={sectionRef} id="projects" className="relative flex flex-col items-center min-h-screen bg-[url('https://assets.toluhunter.com/landing/backgrounds/project.webp')] bg-cover bg-center py-7">
            <div className="absolute inset-x-0 top-0 h-24 md:h-32 bg-gradient-to-b from-background to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-24 md:h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
            <div className="relative flex flex-col flex-1 container px-4 md:px-8">
                <Title text="Projects" link="/projects" hasMore={true} />

                <div className="flex flex-col flex-1 justify-center gap-4">

                    <div id="project-carousel" className="flex items-center w-full gap-4 xl:gap-8 2xl:gap-10">
                        <button
                            onClick={handlePrevProjectClick}
                            className={`hidden lg:flex flex-shrink-0 text-foreground focus:outline-none cursor-pointer ${currentProjectIndex === 0 ? 'invisible' : ''}`}
                            aria-label="Previous project"
                            disabled={currentProjectIndex === 0}
                        >
                            <MdOutlineKeyboardArrowLeft size={48} className="animate-nudge-left" />
                        </button>

                        <div id="project-card" key={currentProjectIndex} className={`flex-1 lg:min-h-[33rem] ${slideClass}`}>
                            <ProjectListing project={projects[currentProjectIndex]} />
                        </div>

                        <button
                            onClick={handleNextProjectClick}
                            className={`hidden lg:flex flex-shrink-0 text-foreground focus:outline-none cursor-pointer ${currentProjectIndex === projects.length - 1 ? 'invisible' : ''}`}
                            aria-label="Next project"
                            disabled={currentProjectIndex === projects.length - 1}
                        >
                            <MdOutlineKeyboardArrowRight size={48} className="animate-nudge-right" />
                        </button>
                    </div>

                    {/* Mobile-only: prev / counter / next row, no nudge, no background */}
                    <div id="project-nav-mobile" className="flex lg:hidden items-center justify-center gap-6 mt-6">
                        <button
                            onClick={handlePrevProjectClick}
                            disabled={currentProjectIndex === 0}
                            className="text-foreground focus:outline-none disabled:opacity-30 cursor-pointer"
                            aria-label="Previous project"
                        >
                            <MdOutlineKeyboardArrowLeft size={48} />
                        </button>
                        <span className="text-foreground font-semibold text-lg">
                            {currentProjectIndex + 1} / {projects.length}
                        </span>
                        <button
                            onClick={handleNextProjectClick}
                            disabled={currentProjectIndex === projects.length - 1}
                            className="text-foreground focus:outline-none disabled:opacity-30 cursor-pointer"
                            aria-label="Next project"
                        >
                            <MdOutlineKeyboardArrowRight size={48} />
                        </button>
                    </div>

                    <div id="projects-github-cta" className="flex justify-center w-full my-5">
                        <a
                            href="https://github.com/Toluhunter"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center justify-center bg-transparent text-foreground border-2 border-foreground py-3 px-8 rounded-lg shadow-lg hover:bg-foreground hover:text-background hover:border-transparent transition-colors duration-300 ease-in-out font-bold text-lg"
                        >
                            <FaGithub className="w-6 h-6" />
                            <span className="ml-3">Check other repositories</span>
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};
