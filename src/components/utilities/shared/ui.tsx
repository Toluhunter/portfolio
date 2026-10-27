import Link from "next/link";
import { ReactNode } from "react";
import type { CaseStudyStat } from "./beat";

// Shared building blocks: one heading scale, one pair of buttons, one CTA label.
// Monda carries display and body text; Fira Code is the utility face for labels, numbers and the terminal.
// Eyebrows are rationed: page headers only, never above every section.

// Every booking button on the site uses this one label, the same as the nav.
export const BOOK_LABEL = "Book a Call";

// Every email action uses this one label and this one address, subject included.
export const EMAIL_LABEL = "Send an email";
export const EMAIL_HREF = "mailto:toluhunterdev@gmail.com?subject=Project%20enquiry%20via%20toluhunter.com";

export const btnPrimary =
    "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-callout-fill text-on-callout font-semibold hover:opacity-90 active:scale-[0.98] transition duration-200 cursor-pointer w-fit whitespace-nowrap";

export const btnSecondary =
    "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-foreground/25 text-foreground font-semibold hover:border-callout hover:text-callout active:scale-[0.98] transition duration-200 cursor-pointer w-fit whitespace-nowrap";

export const textLink = "text-foreground hover:text-callout transition-colors duration-200";

export const card = "rounded-2xl bg-panel border border-foreground/10";

export const cardHover = "hover:border-foreground/25 transition-colors duration-300";

export const Eyebrow = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
    <span className={`font-fira-code text-sm text-callout ${className}`}>
        <span aria-hidden>{"// "}</span>
        {children}
    </span>
);

// Page header on a 12-column grid. The right column carries real content for the page
// (steps, buttons, contents), so the header uses the full width instead of hugging the left.
export const PageHeader = ({
    eyebrow,
    title,
    lede,
    children,
    aside,
}: {
    eyebrow: string;
    title: ReactNode;
    lede?: ReactNode;
    children?: ReactNode;
    aside?: ReactNode;
}) => (
    <header className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-end mb-16 md:mb-24">
        <div className={`flex flex-col gap-5 ${aside ? "lg:col-span-7" : "lg:col-span-9"}`}>
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold text-foreground tracking-tight leading-[1.02]">{title}</h1>
            {lede && <p className="text-lg text-muted leading-relaxed max-w-[60ch]">{lede}</p>}
            {children}
        </div>
        {aside && <div className="lg:col-span-5">{aside}</div>}
    </header>
);

export const SectionHeading = ({
    title,
    lede,
    link,
    linkLabel = "View all",
    id,
}: {
    title: ReactNode;
    lede?: ReactNode;
    link?: string;
    linkLabel?: string;
    id?: string;
}) => (
    <div className="flex flex-col gap-4 mb-10 md:mb-14">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
            <h2 id={id} className="text-3xl md:text-5xl font-bold text-foreground tracking-tight max-w-[22ch]">{title}</h2>
            {link && (
                <Link href={link} className={`${textLink} font-semibold whitespace-nowrap`}>
                    {linkLabel} &rarr;
                </Link>
            )}
        </div>
        {lede && <p className="text-lg text-muted leading-relaxed max-w-[60ch]">{lede}</p>}
    </div>
);

export const StatList = ({ stats }: { stats: CaseStudyStat[] }) => (
    <dl className="flex flex-wrap gap-x-10 gap-y-4">
        {stats.map((stat) => (
            <div key={stat.label} className="flex flex-col gap-1">
                <dt className="order-2 text-sm text-muted max-w-[14rem]">{stat.label}</dt>
                <dd className="order-1 font-fira-code text-3xl font-bold text-callout">{stat.value}</dd>
            </div>
        ))}
    </dl>
);

export const CtaPanel = ({
    title,
    note,
    body,
    action = { href: "/book", label: BOOK_LABEL },
    secondary,
}: {
    title: ReactNode;
    note?: ReactNode;
    body?: ReactNode;
    action?: { href: string; label: string };
    secondary?: ReactNode;
}) => (
    <div className={`${card} flex flex-col md:flex-row md:items-end md:justify-between gap-8 p-8 md:p-12`}>
        <div className="flex flex-col gap-3 max-w-2xl">
            {note && <p className="text-sm italic text-muted">{note}</p>}
            <h2 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">{title}</h2>
            {body && <p className="text-muted leading-relaxed">{body}</p>}
        </div>
        <div className="flex flex-col gap-3 flex-shrink-0">
            <Link href={action.href} className={btnPrimary}>
                {action.label}
            </Link>
            {secondary}
        </div>
    </div>
);
