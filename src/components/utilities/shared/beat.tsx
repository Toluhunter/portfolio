export interface CaseStudyStat {
    value: string;
    label: string;
}

export interface CaseStudy {
    hook?: string;
    problem: string;
    built: string;
    result: string;
    stats?: CaseStudyStat[];
}

export const Beat = ({ label, text }: { label: string; text: string }) => (
    <div className="flex flex-col gap-2">
        <p className="font-fira-code text-sm text-callout"><span aria-hidden>// </span>{label}</p>
        <p className="text-muted leading-relaxed">{text}</p>
    </div>
);
