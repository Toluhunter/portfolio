"use client";
import { useEffect, useState } from "react";
import { Title } from "@/components/utilities/shared/title"
import { ProjectListing, Project } from "@/components/utilities/landingpage/project/project-listing-landing"
import { FaGithub } from "react-icons/fa"
import { ProjectListingSkeleton } from "@/components/utilities/shared/skeletons"

export const ProjectSection = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`);
                const data = await res.json();
                const fetched = data.products || [];
                setProjects(fetched.map((p: any) => ({
                    name: p.name,
                    status: p.status,
                    description: p.description,
                    images: p.images,
                    imageAspectRatios: p.image_aspect_ratios,
                    websiteLink: p.website_link,
                    technologies: p.technologies,
                    subtitle: p.subtitle,
                    roles: p.roles,
                    caseStudy: p.case_study,
                })));
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <section id="projects" className="relative flex flex-col items-center bg-background bg-[url('https://assets.toluhunter.com/landing/backgrounds/project.webp')] bg-cover bg-center py-7">
            <div className="absolute inset-x-0 top-0 h-24 md:h-32 bg-gradient-to-b from-background to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-24 md:h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
            <div className="relative flex flex-col container px-4 md:px-8">
                <Title text="Case Studies" link="/products" hasMore={true} />

                <div className="flex flex-col divide-y divide-foreground/15">
                    {loading && [0, 1].map((i) => (
                        <div key={`skeleton-${i}`} className="py-12 first:pt-4">
                            <ProjectListingSkeleton reverse={i % 2 === 1} />
                        </div>
                    ))}
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
