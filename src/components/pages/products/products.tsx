'use client';
import { useEffect, useState } from "react";
import { ProjectCard, Project } from "./project-card";
import { ProjectCardSkeleton } from "@/components/utilities/shared/skeletons";
import { PageHeader } from "@/components/utilities/shared/ui";

export const ProductsPageSection = () => {
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
                    websiteLink: p.website_link,
                    technologies: p.technologies,
                    subtitle: p.subtitle,
                    roles: p.roles,
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
        <main className="pt-32 pb-28 px-5 md:px-8 container mx-auto relative">
            <PageHeader
                eyebrow="products"
                title="My Products"
                lede="Independently built, architected, and taken to production."
            />

            <div className="flex flex-col divide-y divide-foreground/10">
                {loading && [0, 1].map((i) => (
                    <div key={`skeleton-${i}`} className="py-16 first:pt-0"><ProjectCardSkeleton /></div>
                ))}
                {projects.map((project, index) => (
                    <div key={index} className="py-16 first:pt-0"><ProjectCard project={project} /></div>
                ))}
            </div>
        </main>
    );
};