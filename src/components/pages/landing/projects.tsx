import { Title } from "@/components/utilities/shared/title"
import { ProjectListing } from "@/components/utilities/landingpage/project/project-listing-landing"
import Icon from "@/components/utilities/shared/icon"
import { useState } from "react"
import { Project } from "@/components/utilities/landingpage/project/project-listing-landing"
import { ChevronRight, ChevronLeft } from "lucide-react";

export const ProjectSection = () => {
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

    const projects: Project[] = [ // Applied Project interface to the array
        {
            name: "BeemBridge",
            description: "Effortless PC-to-PC File Transfer. Send files directly and seamlessly between your devices. Our app intelligently manages the Wi-Fi and network, so you never fuss with IPs or hotspot settings. Just transfer and go!",
            images: [
                "/projects/beembridge.png",
                "https://placehold.co/500x300/007bff/ffffff.png?text=BeemBridge+Screenshot+1",
                "https://placehold.co/500x300/8A2BE2/ffffff.png?text=BeemBridge+Screenshot+2",
            ],
            websiteLink: "#", // Replace with actual link
            technologies: [
                "React.js: Frontend UI",
                "Node.js: Backend services",
                "Electron: Desktop application framework",
                "WebRTC: Peer-to-peer communication",
                "Tailwind CSS: Styling and responsiveness",
                "Firebase: (Example) Authentication/Signaling"
            ]
        },
        {
            name: "Project Alpha",
            description: "A cutting-edge web application designed for seamless task management and team collaboration. Boost your productivity with intuitive features and a clean interface.",
            images: [
                "https://placehold.co/500x300/FF5733/ffffff.png?text=Alpha+Shot+1",
                "https://placehold.co/500x300/33FF57/ffffff.png?text=Alpha+Shot+2",
                "https://placehold.co/500x300/3357FF/ffffff.png?text=Alpha+Shot+3",
            ],
            websiteLink: "#",
            technologies: [
                "Vue.js: Progressive Frontend",
                "Express.js: REST API",
                "MongoDB: NoSQL Database",
                "Socket.IO: Real-time communication",
                "Material-UI: Component Library",
            ]
        },
        {
            name: "Gaming Hub",
            description: "An immersive platform for discovering, playing, and sharing indie games. Connect with fellow gamers and explore a curated collection of unique titles.",
            images: [
                "https://placehold.co/500x300/FFBD33/000000.png?text=GamingHub+Preview+1",
                "https://placehold.co/500x300/33FFBD/000000.png?text=GamingHub+Preview+2",
            ],
            websiteLink: "#",
            technologies: [
                "Next.js: Full-stack React Framework",
                "GraphQL: API Query Language",
                "PostgreSQL: Relational Database",
                "Stripe API: Payment Processing",
                "Styled Components: CSS-in-JS"
            ]
        }
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
        <section className="relative flex flex-col items-center bg-[url('/Project-BG.png')] bg-cover bg-center py-10"> {/* Removed overflow-hidden from section */}
            <div className="relative z-10 flex flex-col container px-4 md:px-8"> {/* Added padding for small screens */}
                <Title text="Projects" link="#" /> {/* Assuming you want a link here too */}
                <div className="relative flex items-center justify-center w-full mt-10"> {/* Added mt-10 for spacing */}
                    {/* Left Button - positioned absolutely outside the overflow-hidden scrollable area */}
                    <button
                        onClick={handlePrevProjectClick}
                        className="absolute -left-4 sm:-left-8 md:-left-12 z-20 p-3 bg-gray-700 bg-opacity-70 text-white rounded-full focus:outline-none hover:bg-opacity-90 transition-all duration-300 ease-in-out shadow-lg"
                        aria-label="Previous project"
                    >
                        <LeftProjectArrowIcon />
                    </button>

                    <div className="w-5/6">
                        <ProjectListing project={projects[currentProjectIndex]} />
                    </div>

                    {/* Right Button - positioned absolutely outside the overflow-hidden scrollable area */}
                    <button
                        onClick={handleNextProjectClick}
                        className="absolute -right-4 sm:-right-8 md:-right-12 z-20 p-3 bg-gray-700 bg-opacity-70 text-white rounded-full focus:outline-none hover:bg-opacity-90 transition-all duration-300 ease-in-out shadow-lg"
                        aria-label="Next project"
                    >
                        <RightProjectArrowIcon />
                    </button>
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