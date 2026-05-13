'use client';
import { useState } from "react";
import Image from "next/image";
import { FaExternalLinkAlt } from "react-icons/fa";
import Icon from "@/components/utilities/shared/icon";
import { StatusBadge } from "./status-badge";

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
                        <h2 className="text-5xl font-bold font-fira-code text-foreground">{project.name}</h2>
                        <p className="text-xl text-foreground/80">{project.subtitle}</p>
                    </div>

                    {/* Image shown between subtitle and description on mobile */}
                    <div className="lg:hidden w-full border border-foreground/20 rounded-xl overflow-hidden bg-foreground/5">
                        <Image
                            src={project.images[0] || placeholderImage}
                            alt={`${project.name} preview`}
                            width={800}
                            height={500}
                            className="w-full h-auto object-contain"
                            onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = placeholderImage; }}
                        />
                    </div>

                    <div className="flex flex-col gap-3">
                        {project.description.map((para, index) => (
                            <p key={index} className={index === 0 ? 'text-foreground' : 'text-foreground/80'}>
                                {para}
                            </p>
                        ))}
                    </div>

                    {project.roles && project.roles.length > 0 && (
                        <div className="flex flex-col gap-3">
                            <h3 className="text-sm font-semibold uppercase tracking-widest text-foreground/80">
                                Key Contributions
                            </h3>
                            <ul className="flex flex-col gap-2">
                                {project.roles.map((role, index) => (
                                    <li key={index} className="flex gap-3 text-sm text-foreground/80">
                                        <span className="text-foreground/80 mt-0.5 flex-shrink-0">•</span>
                                        <span>{role}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    <div className="flex flex-wrap items-center gap-3 mt-2">
                        {project.websiteLink && (
                            <a href={project.websiteLink} target="_blank" rel="noopener noreferrer">
                                <button className="text-foreground py-2 px-6 rounded-md border-2 border-callout-custom hover:bg-callout-custom hover:text-white transition-colors duration-300 flex items-center gap-2 font-bold cursor-pointer">
                                    Try it out
                                    <FaExternalLinkAlt className="w-3 h-3" />
                                </button>
                            </a>
                        )}
                        {project.technologies && project.technologies.length > 0 && (
                            <button
                                className="flex items-center gap-2 text-sm font-semibold text-foreground border border-foreground/40 rounded-md px-4 py-2 hover:border-foreground hover:bg-foreground/10 transition-all duration-200 cursor-pointer"
                                onClick={() => setShowTechnologies(!showTechnologies)}
                            >
                                <span>Technical Details</span>
                                <Icon color="currentColor" name={showTechnologies ? "uparrow" : "downarrow"} classes="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {showTechnologies && project.technologies && (
                        <div className="p-5 rounded-lg bg-foreground/5 border border-foreground/10 animate-fade-in">
                            <h4 className="text-sm font-semibold uppercase tracking-widest text-foreground/80 mb-3">Stack</h4>
                            <ul className="flex flex-col gap-2">
                                {project.technologies.map((tech, index) => {
                                    const colonIndex = tech.indexOf(':');
                                    const name = colonIndex !== -1 ? tech.slice(0, colonIndex).trim() : tech;
                                    const detail = colonIndex !== -1 ? tech.slice(colonIndex + 1).trim() : null;
                                    return (
                                        <li key={index} className="text-sm">
                                            <span className="font-semibold text-foreground">{name}</span>
                                            {detail && (
                                                <span className="text-foreground/80"> - {detail}</span>
                                            )}
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Right column - image, desktop only, sticky */}
                <div className="hidden lg:block lg:w-[45%] sticky top-8">
                    <div className="w-full border border-foreground/20 rounded-xl overflow-hidden bg-foreground/5 shadow-lg">
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