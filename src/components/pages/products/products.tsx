'use client';
import projects from '@/data/projects.json';
import { ProjectCard } from "./project-card";

export const ProductsPageSection = () => {
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