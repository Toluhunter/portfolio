import Link from "next/link";
import { ReactNode } from "react";
import type { CaseStudyStat } from "./beat";

// Shared building blocks for the redesign: one eyebrow, one heading scale, one pair of buttons.
// Monda carries display and body text; Fira Code is the utility face for labels, numbers and the terminal.

export const btnPrimary =
    "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-callout-fill text-on-callout font-semibold hover:opacity-90 transition-opacity duration-200 cursor-pointer w-fit";

export const btnSecondary =
    "inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md border border-foreground/25 text-foreground font-semibold hover:border-callout hover:text-callout transition-colors duration-200 cursor-pointer w-fit";

export const textLink = "text-foreground hover:text-callout transition-colors duration-200";

export const card = "rounded-2xl bg-panel border border-foreground/10";

export const cardHover = "hover:border-foreground/25 transition-colors duration-300";

export const Eyebrow = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
    <span className={`font-fira-code text-sm text-callout ${className}`}>
        <span aria-hidden>// </span>
        {children}
    </span>
);

export const PageHeader = ({
    eyebrow,
    title,
    lede,
    children,
}: {
    eyebrow: string;
    title: ReactNode;
    lede?: ReactNode;
    children?: ReactNode;
}) => (
    <header className="flex flex-col gap-5 mb-16 md:mb-20 max-w-3xl">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="text-5xl md:text-6xl font-bold text-foreground tracking-tight leading-[1.05]">{title}</h1>
        {lede && <p className="text-lg text-muted leading-relaxed max-w-2xl">{lede}</p>}
        {children}
    </header>
);

export const SectionHeading = ({
    eyebrow,
    title,
    link,
    linkLabel = "View all",
    id,
}: {
    eyebrow: string;
    title: ReactNode;
    link?: string;
    linkLabel?: string;
    id?: string;
}) => (
    <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3 mb-10 md:mb-12">
        <div className="flex flex-col gap-3">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h2 id={id} className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">{title}</h2>
        </div>
        {link && (
            <Link href={link} className={`${textLink} font-semibold`}>
                {linkLabel} &rarr;
            </Link>
        )}
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
    action = { href: "/book", label: "Book a Free Meeting" },
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
