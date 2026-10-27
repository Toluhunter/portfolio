'use client';
import Icon from "@/components/utilities/shared/icon"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import { FaExternalLinkAlt } from "react-icons/fa"
import type { CaseStudy } from "@/components/utilities/shared/beat"
import { StatList, btnPrimary, btnSecondary } from "@/components/utilities/shared/ui"
import { StatusBadge } from "@/components/pages/products/status-badge"

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
        <a href={project.websiteLink} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
            Try it out
            <FaExternalLinkAlt className="w-3 h-3" aria-hidden />
        </a>
    );

    const technicalDetailsToggle = project.technologies && project.technologies.length > 0 && (
        <button
            type="button"
            className={btnSecondary}
            aria-expanded={showDetails}
            onClick={() => setShowDetails(!showDetails)}
        >
            <span>Technical details</span>
            {showDetails
                ? <Icon color="currentColor" name="uparrow" classes="w-4 h-4" />
                : <Icon color="currentColor" name="downarrow" classes="w-4 h-4" />}
        </button>
    );

    const statsRow = caseStudy.stats && caseStudy.stats.length > 0 && (
        <StatList stats={caseStudy.stats} />
    );

    const activeRatio = project.imageAspectRatios?.[activeImage] ?? DEFAULT_ASPECT_RATIO;

    const imageBox = (wrapperClassName: string) => (
        <div className={wrapperClassName}>
            <div
                className="relative w-full border border-foreground/15 rounded-2xl overflow-hidden bg-black transition-[aspect-ratio] duration-500"
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
        <div id="project-listing" className="flex flex-col gap-8">
            <StatusBadge status={project.status} />

            <div className={`flex flex-col lg:flex-row lg:gap-14 items-start ${reverse ? 'lg:flex-row-reverse' : ''}`}>
                {/* Text column: full narrative */}
                <div className="flex flex-col gap-6 text-left lg:w-[55%]">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-foreground text-3xl md:text-5xl font-bold tracking-tight">{project.name}</h3>
                        <p className="text-lg md:text-xl text-muted">{project.subtitle}</p>
                    </div>

                    <p className="text-foreground text-lg md:text-xl leading-relaxed prose-measure">{caseStudy.hook}</p>

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
                                <p className="font-fira-code text-sm text-callout"><span aria-hidden>{"// "}</span>{label}</p>
                                <p className="text-muted text-base md:text-lg leading-relaxed prose-measure">{beats[i]}</p>
                            </div>
                        ))}
                    </div>

                    {statsRow}

                    <div className="flex flex-wrap items-center gap-3">
                        {visitButton}
                        {technicalDetailsToggle}
                    </div>

                    {showDetails && project.technologies && (
                        <div className="w-full p-5 bg-panel border border-foreground/10 rounded-2xl animate-fade-in">
                            <h4 className="font-fira-code text-sm text-callout mb-3"><span aria-hidden>{"// "}</span>stack</h4>
                            <ul className="list-disc list-inside space-y-1 text-sm text-muted">
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
