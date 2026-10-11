import Link from "next/link";
import { ReactNode } from "react";
import { NavBar } from "@/components/utilities/shared/navbar";
import { Footer } from "@/components/pages/landing/footer";
import { PageHeader, textLink } from "@/components/utilities/shared/ui";

// Shared shell for /privacy and /terms: the redesign's page header, then a single reading column.
export const LegalLayout = ({
    title,
    lede,
    updated,
    other,
    children,
}: {
    title: string;
    lede: ReactNode;
    updated: string;
    other: { href: string; label: string };
    children: ReactNode;
}) => (
    <>
        <NavBar />
        <main className="min-h-screen bg-background/50 backdrop-blur-sm">
            <div className="container mx-auto px-5 md:px-8 pt-32 pb-28">
                <PageHeader eyebrow="legal" title={title} lede={lede}>
                    <p className="font-fira-code text-sm text-faint">Last updated: {updated}</p>
                </PageHeader>

                <article className="max-w-3xl flex flex-col gap-12 text-muted leading-relaxed">
                    {children}
                </article>

                <p className="max-w-3xl mt-16 pt-8 border-t border-foreground/10 text-muted">
                    See also the <Link href={other.href} className={`${textLink} underline underline-offset-4`}>{other.label}</Link>.
                </p>
            </div>
        </main>
        <Footer />
    </>
);

export const LegalSection = ({ title, children }: { title: string; children: ReactNode }) => (
    <section className="flex flex-col gap-4">
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
