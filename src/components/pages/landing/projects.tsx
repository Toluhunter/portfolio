import { Title } from "@/components/utilities/shared/title"
import { ProjectListing } from "@/components/utilities/landingpage/project/project-listing-landing"
import { FaGithub } from "react-icons/fa"
import projects from "@/data/projects.json";

export const ProjectSection = () => {
    return (
        <section id="projects" className="relative flex flex-col items-center bg-background bg-[url('https://assets.toluhunter.com/landing/backgrounds/project.webp')] bg-cover bg-center py-7">
            <div className="absolute inset-x-0 top-0 h-24 md:h-32 bg-gradient-to-b from-background to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-24 md:h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
            <div className="relative flex flex-col container px-4 md:px-8">
                <Title text="Case Studies" link="/products" hasMore={true} />

                <div className="flex flex-col divide-y divide-foreground/15">
                    {projects.map((project, index) => (
                        <div key={project.name} className="py-12 first:pt-4">
                            <ProjectListing project={project} reverse={index % 2 === 1} />
                        </div>
                    ))}
                </div>

                <div id="projects-github-cta" className="flex justify-center w-full mt-5 mb-10">
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
        </section>
    );
};
