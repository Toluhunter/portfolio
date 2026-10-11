import Link from "next/link";
import { ReactNode } from "react";
import { NavBar } from "@/components/utilities/shared/navbar";
import { Footer } from "@/components/pages/landing/footer";
import { PageHeader, textLink } from "@/components/utilities/shared/ui";

// Shared shell for the legal pages and the Spiral app pages: page header, then the text at reading
// width on the left and a sticky contents column on the right, so the page uses its full width.

const slug = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export const LegalLayout = ({
    eyebrow = "legal",
    title,
    lede,
    updated,
    related,
    sections,
    children,
}: {
    eyebrow?: string;
    title: string;
    lede: ReactNode;
    updated?: string;
    related: { href: string; label: string }[];
    sections: string[];
    children: ReactNode;
}) => (
    <>
        <NavBar />
        <main className="min-h-screen bg-background/50 backdrop-blur-sm">
            <div className="container mx-auto px-5 md:px-8 pt-32 pb-28">
                <PageHeader eyebrow={eyebrow} title={title} lede={lede}>
                    {updated && <p className="font-fira-code text-sm text-faint">Last updated: {updated}</p>}
                </PageHeader>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
                    <article className="lg:col-span-8 max-w-[68ch] flex flex-col gap-12 text-muted leading-relaxed">
                        {children}
                    </article>

                    <aside className="lg:col-span-4 order-first lg:order-none">
                        <div className="lg:sticky lg:top-28 flex flex-col gap-8">
                            <nav aria-label="On this page" className="flex flex-col gap-3">
                                <p className="font-bold text-foreground">On this page</p>
                                <ul className="flex flex-col border-l border-foreground/10">
                                    {sections.map((title) => (
                                        <li key={title}>
                                            <a href={`#${slug(title)}`} className="block pl-4 py-1.5 -ml-px border-l border-transparent text-muted hover:text-callout hover:border-callout transition-colors duration-200">
                                                {title}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                            <div className="flex flex-col gap-2 pt-6 border-t border-foreground/10 text-muted">
                                <p>Questions about this page?</p>
                                <a href="mailto:toluhunterdev@gmail.com" className={`${textLink} font-semibold`}>toluhunterdev@gmail.com</a>
                                <div className="flex flex-col gap-2 mt-4">
                                    {related.map(({ href, label }) => (
                                        <Link key={href} href={href} className={textLink}>{label} &rarr;</Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </main>
        <Footer />
    </>
);

export const LegalSection = ({ title, children }: { title: string; children: ReactNode }) => (
    <section id={slug(title)} className="flex flex-col gap-4 scroll-mt-28">
        <h2 className="text-2xl font-bold tracking-tight text-foreground">{title}</h2>
        {children}
    </section>
);

export const LegalList = ({ children }: { children: ReactNode }) => (
    <ul className="flex flex-col gap-3">{children}</ul>
);

export const LegalItem = ({ children }: { children: ReactNode }) => (
    <li className="flex gap-3">
        <span aria-hidden className="text-callout flex-shrink-0">&rsaquo;</span>
        <span>{children}</span>
    </li>
);

export const legalLink = "text-foreground underline underline-offset-4 hover:text-callout transition-colors duration-200";
