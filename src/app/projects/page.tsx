'use client';
import { NavBar } from "@/components/utilities/shared/navbar";
import { Footer } from "@/components/pages/landing/footer";
import { BuyMeACoffee } from "@/components/utilities/shared/buymecoffee";
import { Title } from "@/components/utilities/shared/title";
import { useState } from "react";
import Icon from "@/components/utilities/shared/icon";
import { FaChevronLeft as ChevronLeft, FaChevronRight as ChevronRight } from "react-icons/fa";
import Image from "next/image";

export interface Project {
    name: string;
    status: string;
    description: string;
    images: string[];
    websiteLink?: string;
    technologies?: string[];
}

// ProjectCard Component
const ProjectCard = ({ project }: { project: Project }) => {
    const [showTechnologies, setShowTechnologies] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const placeholderImage = 'https://placehold.co/800x500/CCCCCC/333333.png?text=Image+Not+Available';

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

    return (
        // Added group class for group-hover effects, subtle scale, and border on hover
        <div className="group flex flex-col gap-5 p-6 rounded-xl shadow-2xl animate-fade-in h-full
                        transition-all duration-300 ease-in-out transform hover:scale-[1.01]
                        border-2 border-gray-700 group-hover:border-callout-custom relative z-10
                        bg-gray-900">
            {/* Project Status */}
            <span className="flex gap-3 items-center text-gray-400 text-sm">
                <Icon name="check-circle" classes="w-5 h-5 text-green-500" />
                <div className="w-[1px] h-4 bg-white" />
                {project.status}
            </span>

            {/* Project Name and Description */}
            <div className="flex flex-col gap-3 text-center lg:text-left">
                <h3 className="text-white text-3xl font-bold font-fira-code">{project.name}</h3>
                <div
                    className="text-gray-300 text-base flex-grow [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:mb-4 [&>p]:mb-3 [&>ul]:list-disc [&>ul]:list-inside [&>ul]:pl-4 [&>ul]:mb-3"
                    dangerouslySetInnerHTML={{ __html: project.description }}
                />
            </div>

            {/* Image Carousel - Increased min-height for prominence */}
            <div className="relative flex items-center justify-center w-full min-h-[300px] md:min-h-[400px] rounded-lg overflow-hidden
                        bg-gray-900">
                {project.images.length > 0 && (
                    <button
                        onClick={handlePrevClick}
                        className="absolute left-2 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full focus:outline-none hover:bg-opacity-75 transition-colors duration-200"
                        aria-label="Previous image"
                    >
                        <ChevronLeft size={20} />
                    </button>
                )}
                <Image
                    className="w-full h-full object-contain rounded-lg shadow-lg"
                    src={project.images[currentImageIndex] || placeholderImage}
                    alt={`${project.name} screenshot ${currentImageIndex + 1}`}
                    width={400}
                    height={200}
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = placeholderImage; }}
                />
                {project.images.length > 0 && (
                    <button
                        onClick={handleNextClick}
                        className="absolute right-2 z-10 p-2 bg-black bg-opacity-50 text-white rounded-full focus:outline-none hover:bg-opacity-75 transition-colors duration-200"
                        aria-label="Next image"
                    >
                        <ChevronRight size={20} />
                    </button>
                )}
            </div>

            {/* Website Link Button - Adjusted width and alignment */}
            {project.websiteLink && (
                <a href={project.websiteLink} target="_blank" rel="noopener noreferrer" className="self-end w-fit"> {/* Changed self-center to self-end and w-full to w-fit */}
                    <button className="bg-callout-custom text-white py-2 px-7 rounded-md hover:bg-purple-700 transition-colors duration-300 border-2 border-callout-custom font-bold">
                        VISIT APP WEBSITE
                    </button>
                </a>
            )}

            {/* More Info / Technologies Toggle */}
            {project.technologies && project.technologies.length > 0 && (
                <>
                    <div
                        className="flex h-fit items-center text-white cursor-pointer text-md hover:text-gray-300 transition-colors duration-200 self-center
                                    mt-4 p-2 rounded-md border border-transparent hover:border-gray-600 hover:bg-gray-800"
                        onClick={() => setShowTechnologies(!showTechnologies)}
                    >
                        <span className="mr-3">more info</span>
                        {showTechnologies ? <Icon color="currentColor" name="uparrow" classes="w-4 h-4" /> : <Icon color="currentColor" name="downarrow" classes="w-4 h-4" />}
                    </div>

                    {showTechnologies && (
                        <div className="w-full mt-2 p-4 rounded-lg text-white shadow-md animate-fade-in
                                    bg-gray-900">
                            <h4 className="font-bold text-base mb-2 border-b border-gray-700 pb-1">Technologies Used:</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm">
                                {project.technologies.map((tech, index) => (
                                    <li key={index}>{tech}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default function Home() {
    const projects: Project[] = [
        {
            name: "BeemBridge",
            description: `
            <h2>Redefining Seamless File Transfer</h2>

    <p><strong>Tired of the tangled mess of cables, the agonizing wait of slow transfers, or the constant fear of corrupted drives?</strong> Imagine a world where sharing files between your PCs is as intuitive as a thought. Welcome to <strong>BeemBridge</strong>, your ultimate solution for <strong>effortless, lightning-fast, and secure PC-to-PC file transfer.</strong></p>

    <p>BeemBridge liberates you from the archaic frustrations of traditional file sharing. Forget the endless search for a flash drive, the clunky setup of hotspot settings, or the precarious dance with shaky cables and unreliable ports. Built as a robust <strong>Electron.js desktop application</strong>, BeemBridge intelligently handles the complexities of your Wi-Fi and network connections. This means:</p>

    <ul>
        <li><strong>No more fussing with IP addresses or network configurations.</strong> BeemBridge just works, automatically detecting and connecting your devices on the same network.</li>
        <li><strong>Blazing-fast transfers that leave HTTP and physical media in the dust.</strong> Experience speeds that make large media files and extensive project folders move in a blink.</li>
        <li><strong>Unwavering reliability:</strong> Bid farewell to the anxiety of corrupted storage media or the physical vulnerabilities of USB drives. Your data flows directly and securely.</li>
        <li><strong>Pure convenience:</strong> No adapters, no external hardware, no software quirks, just a smooth, direct, and hassle-free transfer experience.</li>
    </ul>

    <p><strong>BeemBridge isn't just an app; it's a paradigm shift in how you move data.</strong> Simply launch, select, and transfer. It's that simple, and that revolutionary. Get ready to just transfer and go!</p>
            `,
            status: "In Progress",
            images: [
                "https://assets.toluhunter.com/projects/beembridge.svg",
                "https://placehold.co/800x500/FF0000/FFFFFF.png?text=BeemBridge+Screenshot+2",
                "https://placehold.co/800x500/00FF00/000000.png?text=BeemBridge+Screenshot+3"
            ],
            websiteLink: "#",
            technologies: [
                "React.js: Frontend UI",
                "Node.js: Backend services",
                "Electron: Desktop application framework",
                "TCP & UDP Socket: Peer-to-peer communication",
                "Tailwind CSS: Styling and responsiveness",
            ]
        },
    ];
    return (
        <>
            <NavBar />

            <div className="min-h-screen" style={{
                background: 'var(--background)',
                color: 'var(--foreground)',
                fontFamily: 'Arial, Helvetica, sans-serif'
            }}>

                <NavBar />

                <main className="pt-24 pb-16 px-4 md:px-8 lg:px-16 container mx-auto relative main-content-pattern">
                    <Title text="My Projects" hasMore={false} />

                    <div className="grid grid-cols-1 gap-8 mt-12">
                        {projects.map((project, index) => (
                            <ProjectCard key={index} project={project} />
                        ))}
                    </div>
                </main>
            </div>

            <BuyMeACoffee />
            <Footer />
        </>
    );
}
