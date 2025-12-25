"use client";

import React from "react";

type TocItem = {
    value: string;
    depth: number;
    id?: string;
    children?: TocItem[];
};

function TocItemView({ item }: { item: TocItem }) {
    return (
        <li className="py-0.5">
            <a
                href={`#${item.id ?? ""}`}
                className="hover:underline block px-2 py-1 rounded-sm hover:bg-white/5"
            >
                {item.value}
            </a>
            {item.children && item.children.length > 0 && (
                <ul className="pl-6 ml-1">
                    {item.children.map((c) => (
                        <TocItemView key={c.id ?? c.value} item={c} />
                    ))}
                </ul>
            )}
        </li>
    );
}

export function TOC({ toc }: { toc?: TocItem[] }) {
    if (!toc || toc.length === 0) return null;
    return (
        <nav
            aria-label="Table of contents"
            className="text-sm bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-4 shadow-lg sticky top-25 mt-5 ml-4  max-h-[calc(100vh-5rem)] overflow-auto"
        >
            <strong className="block mb-3 text-xl font-semibold">On this page</strong>
            <ul className="space-y-2">
                {toc.map((item) => (
                    <TocItemView key={item.id ?? item.value} item={item} />
                ))}
            </ul>
        </nav>
    );
}
