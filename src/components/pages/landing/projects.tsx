import { Title } from "@/components/utilities/shared/title"
import { ProjectListing } from "@/components/utilities/landingpage/project/project-listing-landing"
import { FaGithub } from "react-icons/fa"
import { useState } from "react"
import projects from "@/data/projects.json";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";


export const ProjectSection = () => {
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

    const handlePrevProjectClick = () => {
        setCurrentProjectIndex((prevIndex) =>
            prevIndex === 0 ? projects.length - 1 : prevIndex - 1
        );
    };

    const handleNextProjectClick = () => {
        setCurrentProjectIndex((prevIndex) =>
            prevIndex === projects.length - 1 ? 0 : prevIndex + 1
        );
    };

    return (
        <section id="projects" className="relative flex flex-col items-center min-h-screen bg-[url('https://assets.toluhunter.com/landing/backgrounds/project.webp')] bg-cover bg-center py-7">
            <div className="relative flex flex-col flex-1 container px-4 md:px-8">
                <Title text="Projects" link="/projects" hasMore={true} />

                <div className="flex flex-col flex-1 justify-center gap-4">

                    <div id="project-carousel" className="relative flex items-center justify-center w-full">
                        {/* Desktop-only: absolute left arrow with nudge */}
                        {currentProjectIndex > 0 &&
                            <button
                                onClick={handlePrevProjectClick}
                                className="hidden lg:flex absolute -left-12 z-20 text-foreground focus:outline-none cursor-pointer"
                                aria-label="Previous project"
                            >
                                <MdOutlineKeyboardArrowLeft size={48} className="animate-nudge-left" />
                            </button>
                        }

                        <div id="project-card" className="w-full lg:w-5/6 lg:min-h-[33rem]">
                            <ProjectListing project={projects[currentProjectIndex]} />
                        </div>

                        {/* Desktop-only: absolute right arrow with nudge */}
                        {currentProjectIndex < projects.length - 1 &&
                            <button
                                onClick={handleNextProjectClick}
                                className="hidden lg:flex absolute -right-12 z-20 text-foreground focus:outline-none cursor-pointer"
                                aria-label="Next project"
                            >
                                <MdOutlineKeyboardArrowRight size={48} className="animate-nudge-right" />
                            </button>
                        }
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
