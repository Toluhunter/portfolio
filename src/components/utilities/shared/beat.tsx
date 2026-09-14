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
        <p className="font-fira-code text-sm md:text-base text-callout">// {label}</p>
        <p className="text-foreground/90 text-base md:text-lg">{text}</p>
    </div>
);
