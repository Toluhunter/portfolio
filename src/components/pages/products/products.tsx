'use client';
import { useEffect, useState } from "react";
import { ProjectCard, Project } from "./project-card";

export const ProductsPageSection = () => {
    const [projects, setProjects] = useState<Project[]>([]);

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
                    websiteLink: p.website_link,
                    technologies: p.technologies,
                    subtitle: p.subtitle,
                    roles: p.roles,
                })));
            } catch (error) {
                console.error("Failed to fetch products:", error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <main className="pt-24 pb-16 px-4 md:px-8 lg:px-16 container mx-auto relative">
            <div className="flex flex-col gap-2 mb-16">
                <span className="text-xs font-semibold uppercase tracking-widest text-foreground/80">Portfolio</span>
                <h1 className="text-5xl md:text-6xl font-bold font-fira-code text-foreground">My Products</h1>
                <p className="text-lg text-foreground/80 mt-1">Independently built, architected, and taken to production.</p>
            </div>

            <div className="flex flex-col gap-20">
                {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                ))}
            </div>
        </main>
    );
};