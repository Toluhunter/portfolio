"use client";
import { useEffect, useState } from "react";
import { SectionHeading, btnSecondary } from "@/components/utilities/shared/ui"
import { ProjectListing, Project } from "@/components/utilities/landingpage/project/project-listing-landing"
import { FaGithub } from "react-icons/fa"
import { ProjectListingSkeleton } from "@/components/utilities/shared/skeletons"
import type { ApiProduct, ProductsResponse } from "@/types/api"

export const ProjectSection = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/products`);
                const data: ProductsResponse = await res.json();
                const fetched = data.products || [];
                setProjects(fetched.map((p: ApiProduct) => ({
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
        <section id="projects" className="relative bg-background bg-[url('https://assets.toluhunter.com/landing/backgrounds/project.webp')] bg-cover bg-center py-24 md:py-32">
            <div className="absolute inset-x-0 top-0 h-24 md:h-32 bg-gradient-to-b from-background to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-24 md:h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
            <div className="relative container mx-auto px-5 md:px-8">
                <SectionHeading title="Things I built and shipped" link="/products" linkLabel="All products" />

                <div className="flex flex-col divide-y divide-foreground/10">
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

                <div id="projects-github-cta" className="mt-12">
                    <a
                        href="https://github.com/Toluhunter"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={btnSecondary}
                    >
                        <FaGithub className="w-5 h-5" aria-hidden />
                        More on GitHub
                    </a>
                </div>
            </div>
        </section>
    );
};
