import { Title } from "@/components/utilities/shared/title"
import { ProjectListing } from "@/components/utilities/landingpage/project/project-listing-landing"
import Icon from "@/components/utilities/shared/icon"
import { useState } from "react"
import { Project } from "@/components/utilities/landingpage/project/project-listing-landing"
import { FaChevronLeft as ChevronLeft, FaChevronRight as ChevronRight } from "react-icons/fa";


export const ProjectSection = () => {
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

    const projects: Project[] = [ // Applied Project interface to the array
        {
            name: "BeemBridge",
            description: "Effortless PC-to-PC File Transfer. Send files directly and seamlessly between your devices. Our app intelligently manages the Wi-Fi and network, so you never fuss with IPs or hotspot settings. Just transfer and go!",
            status: "In Progress",
            images: [
                "https://assets.toluhunter.com/projects/beembridge.svg",
            ],
            websiteLink: "#", // Replace with actual link
            technologies: [
                "React.js: Frontend UI",
                "Node.js: Backend services",
                "Electron: Desktop application framework",
                "TCP & UDP Socket: Peer-to-peer communication",
                "Tailwind CSS: Styling and responsiveness",
            ]
        },

    ];

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

    // Replaced custom SVG arrow components with Lucide React icons directly
    const LeftProjectArrowIcon = () => <ChevronLeft size={32} />;
    const RightProjectArrowIcon = () => <ChevronRight size={32} />;

    return (
        <section className="relative flex overflow-hidden flex-col items-center bg-[url('https://assets.toluhunter.com/landing/backgrounds/project.webp')] bg-cover bg-center py-10"> {/* Removed overflow-hidden from section */}
            <div className="relative flex flex-col container bg-background px-4 md:px-8"> {/* Added padding for small screens */}
                <Title text="Projects" link="#" /> {/* Assuming you want a link here too */}
                <div className="relative flex items-center justify-center w-full mt-10"> {/* Added mt-10 for spacing */}
                    {/* Left Button - positioned absolutely outside the overflow-hidden scrollable area */}
                    {currentProjectIndex > 0 &&
                        <button
                            onClick={handlePrevProjectClick}
                            className="absolute -left-4 sm:-left-8 md:-left-12 z-20 p-3 bg-gray-700 bg-opacity-70 text-white rounded-full focus:outline-none hover:bg-opacity-90 transition-all duration-300 ease-in-out shadow-lg"
                            aria-label="Previous project"
                        >
                            <LeftProjectArrowIcon />
                        </button>
                    }

                    <div className="w-5/6">
                        <ProjectListing project={projects[currentProjectIndex]} />
                    </div>

                    {/* Right Button - positioned absolutely outside the overflow-hidden scrollable area */}
                    {currentProjectIndex < projects.length - 1 &&
                        <button
                            onClick={handleNextProjectClick}
                            className="absolute -right-4 sm:-right-8 md:-right-12 z-20 p-3 bg-gray-700 bg-opacity-70 text-white rounded-full focus:outline-none hover:bg-opacity-90 transition-all duration-300 ease-in-out shadow-lg"
                            aria-label="Next project"
                        >
                            <RightProjectArrowIcon />
                        </button>
                    }
                </div>
                <div className="flex justify-center w-full my-10"> {/* Container to center the button */}
                    <a
                        href="https://github.com/Toluhunter"
                        target="_blank" // Opens the link in a new tab
                        rel="noopener noreferrer" // Recommended for security when using target="_blank"
                        className="flex items-center justify-center bg-white text-black py-3 px-8 rounded-lg shadow-lg hover:bg-gray-200 transition-colors duration-300 ease-in-out font-bold text-lg"
                    >
                        <Icon name="github" classes="w-6 h-6" />
                        <span className="ml-3">Check other repositories</span>
                    </a>
                </div>
            </div>
        </section>
    );
};