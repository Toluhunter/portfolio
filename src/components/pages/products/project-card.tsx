'use client';
import { useState } from "react";
import Image from "next/image";
import { FaExternalLinkAlt } from "react-icons/fa";
import Icon from "@/components/utilities/shared/icon";
import { StatusBadge } from "./status-badge";
import { Eyebrow, btnPrimary, btnSecondary } from "@/components/utilities/shared/ui";

export interface Project {
    name: string;
    status: string;
    description: string[];
    images: string[];
    websiteLink?: string;
    technologies?: string[];
    subtitle: string;
    roles?: string[];
}

export const ProjectCard = ({ project }: { project: Project }) => {
    const [showTechnologies, setShowTechnologies] = useState(false);

    const placeholderImage = 'https://placehold.co/800x500/CCCCCC/333333.png?text=Image+Not+Available';

    return (
        <div className="flex flex-col gap-8">
            <StatusBadge status={project.status} />

            <div className="flex flex-col lg:flex-row lg:gap-12 items-start">

                {/* Left column - all text content */}
                <div className="flex flex-col gap-6 lg:w-[55%]">
                    <div className="flex flex-col gap-1">
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">{project.name}</h2>
                        <p className="text-lg md:text-xl text-muted">{project.subtitle}</p>
                    </div>

                    {/* Image shown between subtitle and description on mobile */}
                    <div className="lg:hidden w-full border border-foreground/15 rounded-2xl overflow-hidden bg-foreground/5">
                        <Image
                            src={project.images[0] || placeholderImage}
                            alt={`${project.name} preview`}
                            width={800}
                            height={500}
                            className="w-full h-auto object-contain"
                            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = placeholderImage; }}
                        />
                    </div>

                    <div className="flex flex-col gap-3 prose-measure leading-relaxed">
                        {project.description.map((para, index) => (
                            <p key={index} className={index === 0 ? 'text-foreground text-lg' : 'text-muted'}>
                                {para}
                            </p>
                        ))}
                    </div>

                    {project.roles && project.roles.length > 0 && (
                        <div className="flex flex-col gap-3">
                            <h3><Eyebrow>key contributions</Eyebrow></h3>
                            <ul className="flex flex-col gap-2">
                                {project.roles.map((role, index) => (
                                    <li key={index} className="flex gap-3 text-muted leading-relaxed prose-measure">
                                        <span aria-hidden className="text-callout flex-shrink-0">&rsaquo;</span>
                                        <span>{role}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        {project.websiteLink && (
                            <a href={project.websiteLink} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
                                Try it out
                                <FaExternalLinkAlt className="w-3 h-3" aria-hidden />
                            </a>
                        )}
                        {project.technologies && project.technologies.length > 0 && (
                            <button
                                type="button"
                                className={btnSecondary}
                                aria-expanded={showTechnologies}
                                onClick={() => setShowTechnologies(!showTechnologies)}
                            >
                                <span>Technical details</span>
                                <Icon color="currentColor" name={showTechnologies ? "uparrow" : "downarrow"} classes="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {showTechnologies && project.technologies && (
                        <div className="p-5 rounded-2xl bg-panel border border-foreground/10 animate-fade-in">
                            <h4 className="mb-3"><Eyebrow>stack</Eyebrow></h4>
                            <ul className="flex flex-col gap-2">
                                {project.technologies.map((tech, index) => {
                                    const colonIndex = tech.indexOf(':');
                                    const name = colonIndex !== -1 ? tech.slice(0, colonIndex).trim() : tech;
                                    const detail = colonIndex !== -1 ? tech.slice(colonIndex + 1).trim() : null;
                                    return (
                                        <li key={index} className="text-sm">
                                            <span className="font-semibold text-foreground">{name}</span>
                                            {detail && (
                                                <span className="text-muted"> - {detail}</span>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Right column - image, desktop only, sticky */}
                <div className="hidden lg:block lg:w-[45%] sticky top-28">
                    <div className="w-full border border-foreground/15 rounded-2xl overflow-hidden bg-foreground/5">
                        <Image
                            src={project.images[0] || placeholderImage}
                            alt={`${project.name} preview`}
                            width={800}
                            height={500}
                            className="w-full h-auto object-contain"
                            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = placeholderImage; }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};