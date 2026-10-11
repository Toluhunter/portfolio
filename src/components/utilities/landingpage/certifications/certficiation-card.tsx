import Image from "next/image";
import { MdOutlineOpenInNew } from "react-icons/md";

export interface Certification {
    picture: string;
    title: string;
    date: string;
    expiring: string;
    institution: string;
    verifyLink: string;
}

const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

export const CertificationCard: React.FC<{ cert: Certification }> = ({ cert }) => {
    return (
        <div className="flex-shrink-0 w-64 md:w-72 p-6 mx-2 bg-panel rounded-2xl flex flex-col items-center gap-4 border border-foreground/10 hover:border-foreground/25 transition-colors duration-300">
            <Image
                src={cert.picture}
                alt=""
                width={112}
                height={112}
                className="w-24 h-24 object-contain"
                onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://placehold.co/200x100/CCCCCC/333333.png?text=Cert";
                }}
            />

            <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-base font-bold text-foreground leading-snug">{cert.title}</h3>
                <p className="text-sm text-muted">{cert.institution}</p>
            </div>

            <p className="font-fira-code text-xs text-faint">
                {formatDate(cert.date)} to {formatDate(cert.expiring)}
            </p>

            <a
                href={cert.verifyLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-callout hover:underline"
            >
                Verify Credential
                <MdOutlineOpenInNew size={14} aria-hidden />
            </a>
        </div>
    );
};
