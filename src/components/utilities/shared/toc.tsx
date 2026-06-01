"use client";

import { useState, useEffect } from "react";

type TocItem = {
    value: string;
    depth: number;
    id?: string;
    children?: TocItem[];
};

function TocLink({ item, activeId }: { item: TocItem; activeId: string }) {
    const isActive = item.id === activeId;
    const indent = Math.max(0, item.depth - 2);

    return (
        <li>
            <a
                href={`#${item.id ?? ""}`}
                style={{ paddingLeft: `${indent * 14}px` }}
                className={`
                    block py-1 pr-2 text-sm leading-5 border-l-2 pl-3 transition-all duration-150
                    ${isActive
                        ? "border-[var(--callout)] text-[var(--callout)] font-medium"
                        : "border-transparent text-[var(--foreground)]/50 hover:text-[var(--foreground)] hover:border-[var(--foreground)]/30"
                    }
                `}
            >
                {item.value}
            </a>
            {item.children && item.children.length > 0 && (
                <ul>
                    {item.children.map((child) => (
                        <TocLink key={child.id ?? child.value} item={child} activeId={activeId} />
                    ))}
                </ul>
            )}
        </li>
    );
}

export function TOC({ toc }: { toc?: TocItem[] }) {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const headings = document.querySelectorAll(
            "h1[id], h2[id], h3[id], h4[id], h5[id], h6[id]"
        );

        const observer = new IntersectionObserver(
            (entries) => {
                for (const entry of entries) {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                }
            },
            { rootMargin: "-80px 0px -70% 0px" }
        );

        headings.forEach((h) => observer.observe(h));
        return () => observer.disconnect();
    }, [toc]);

    if (!toc || toc.length === 0) return null;

    return (
        <nav
            aria-label="Table of contents"
            className="sticky top-24 max-h-[calc(100vh-6rem)] overflow-y-auto"
        >
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--foreground)]/40 mb-4">
                On this page
            </p>
            <ul className="space-y-0.5">
                {toc.map((item) => (
                    <TocLink key={item.id ?? item.value} item={item} activeId={activeId} />
                ))}
            </ul>
        </nav>
    );
}
