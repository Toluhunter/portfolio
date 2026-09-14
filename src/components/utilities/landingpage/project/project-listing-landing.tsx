'use client';
import Icon from "@/components/utilities/shared/icon"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { FaExternalLinkAlt } from "react-icons/fa"
import type { CaseStudy } from "@/components/utilities/shared/beat"

export interface Project {
    name: string;
    status: string;
    description: string[];
    images: string[];
    imageAspectRatios?: number[];
    websiteLink?: string;
    technologies?: string[];
    subtitle: string;
    roles?: string[];
    caseStudy: CaseStudy;
}

const DEFAULT_ASPECT_RATIO = 16 / 9;

const beatOrder = ["the problem", "what i built", "the result"] as const;

export const ProjectListing = ({ project, reverse = false }: { project: Project; reverse?: boolean }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [activeImage, setActiveImage] = useState(0);
    const beatRefs = useRef<(HTMLDivElement | null)[]>([]);
    const { caseStudy } = project;

    const placeholderImage = 'https://placehold.co/800x500/CCCCCC/333333.png?text=Image+Not+Available';
    const images = project.images.length > 0 ? project.images : [placeholderImage];
    const scrollLinked = images.length > 1;

    useEffect(() => {
        if (!scrollLinked) return;
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const idx = Number((entry.target as HTMLElement).dataset.imageIndex);
                        setActiveImage(idx);
                    }
                });
            },
            { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
        );
        beatRefs.current.forEach((el) => el && observer.observe(el));
        return () => observer.disconnect();
    }, [scrollLinked]);

    const visitButton = project.websiteLink && (
        <a href={project.websiteLink} target="_blank" rel="noopener noreferrer">
            <button className="text-foreground py-2 px-7 rounded-md w-fit border-2 border-callout hover:bg-callout hover:text-on-callout transition-colors duration-300 flex items-center gap-2 cursor-pointer">
                Try it out
                <FaExternalLinkAlt className="w-3 h-3" />
            </button>
        </a>
    );

    const technicalDetailsToggle = project.technologies && project.technologies.length > 0 && (
        <button
            className="flex items-center gap-3 text-sm font-semibold text-foreground border border-foreground/40 rounded-md px-4 py-2 hover:border-foreground hover:bg-foreground/10 transition-all duration-200 cursor-pointer"
            onClick={() => setShowDetails(!showDetails)}
        >
            <span>Technical Details</span>
            {showDetails
                ? <Icon color="currentColor" name="uparrow" classes="w-4 h-4" />
                : <Icon color="currentColor" name="downarrow" classes="w-4 h-4" />}
        </button>
    );

    const statsRow = caseStudy.stats && caseStudy.stats.length > 0 && (
        <div className="flex flex-wrap gap-4">
            {caseStudy.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col gap-1 px-5 py-3 border border-foreground/20 rounded-lg">
                    <span className="font-fira-code text-2xl font-bold text-callout">{stat.value}</span>
                    <span className="text-xs text-foreground/60 uppercase tracking-wide">{stat.label}</span>
                </div>
            ))}
        </div>
    );

    const activeRatio = project.imageAspectRatios?.[activeImage] ?? DEFAULT_ASPECT_RATIO;

    const imageBox = (wrapperClassName: string) => (
        <div className={wrapperClassName}>
            <div
                className="relative w-full border border-foreground/30 rounded-xl overflow-hidden bg-black transition-[aspect-ratio] duration-500"
                style={{ aspectRatio: activeRatio }}
            >
                {images.map((src, i) => (
                    <Image
                        key={src}
                        className={`object-cover transition-opacity duration-500 ${i === activeImage ? 'opacity-100' : 'opacity-0'}`}
                        src={src}
                        alt={`${project.name} screenshot ${i + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 45vw"
                        onError={(e) => { e.currentTarget.src = placeholderImage; }}
                    />
                ))}
            </div>
        </div>
    );

    const beats = [caseStudy.problem, caseStudy.built, caseStudy.result];

    return (
        <div id="project-listing" className="flex flex-col gap-8 px-4 md:px-0">
            <span id="project-status" className="flex gap-5 flex-row items-center text-foreground">
                <Icon name="check-circle" classes="w-7 h-7 text-foreground" />
                <div className="w-[1px] h-5 bg-foreground" />
                {project.status}
            </span>

            <div className={`flex flex-col lg:flex-row lg:gap-14 items-start ${reverse ? 'lg:flex-row-reverse' : ''}`}>
                {/* Text column: full narrative */}
                <div className="flex flex-col gap-6 text-left lg:w-[55%]">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-foreground text-3xl md:text-5xl">{project.name}</h3>
                        <p className="text-lg md:text-2xl font-semibold text-gray-400">{project.subtitle}</p>
                    </div>

                    <p className="text-foreground text-lg md:text-xl italic">{caseStudy.hook}</p>

                    {/* Image sits inline here on mobile, where there's no side column for it */}
                    {imageBox('lg:hidden w-full')}

                    <div className="flex flex-col gap-10 md:gap-14">
                        {beatOrder.map((label, i) => (
                            <div
                                key={label}
                                ref={(el) => { beatRefs.current[i] = el; }}
                                data-image-index={i}
                                className="flex flex-col gap-2"
                            >
                                <p className="font-fira-code text-sm md:text-base text-callout">// {label}</p>
                                <p className="text-foreground/90 text-base md:text-lg">{beats[i]}</p>
                            </div>
                        ))}
                    </div>

                    {statsRow}

                    <div className="flex flex-wrap items-center gap-3">
                        {visitButton}
                        {technicalDetailsToggle}
                    </div>

                    {showDetails && project.technologies && (
                        <div className="w-full p-5 bg-foreground/5 border border-foreground/10 rounded-lg animate-fade-in">
                            <h4 className="font-bold text-sm uppercase tracking-widest text-foreground/80 mb-3">Stack</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm text-foreground/90">
                                {project.technologies.map((tech) => (
                                    <li key={tech}>{tech}</li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Image column: desktop only, sticky while the narrative scrolls past */}
                {imageBox('hidden lg:block lg:w-[45%] lg:sticky lg:top-28')}
            </div>
        </div>
    );
};
