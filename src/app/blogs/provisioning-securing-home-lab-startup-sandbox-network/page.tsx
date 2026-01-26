
"use client";

import { useMDXComponents } from "../../../../mdx-components";
import Content, { tableOfContents } from "./content.mdx";
import { NavBar } from "@/components/utilities/shared/navbar";
import { Footer } from "@/components/pages/landing/footer";
import { BuyMeACoffee } from "@/components/utilities/shared/buymecoffee";
import { TOC } from "@/components/utilities/shared/toc";


export default function MDXPage({
    children,
}: {
    children: React.ReactNode;
}) {
    const components = {
        NavBar,
        Footer,
        BuyMeACoffee,
    };

    return (
        <div className="mdx-page grid md:grid-cols-4 gap-8">
            <aside className="hidden md:block md:col-span-1">
                <TOC toc={tableOfContents} />
            </aside>
            <main className="prose md:col-span-3">
                <Content components={useMDXComponents(components)} />
            </main>
        </div>
    );
}
