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
        <div className="flex-shrink-0 w-64 md:w-72 p-6 mx-4 bg-background rounded-xl shadow-lg flex flex-col items-center gap-3 border border-foreground">
            <Image
                src={cert.picture}
                alt={cert.title}
                width={112}
                height={112}
                className="w-28 h-28 object-contain"
                onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "https://placehold.co/200x100/CCCCCC/333333.png?text=Cert";
                }}
            />

            <div className="flex flex-col items-center gap-1 text-center">
                <h3 className="text-base font-bold text-foreground leading-snug">{cert.title}</h3>
                <p className="text-sm text-foreground opacity-60">{cert.institution}</p>
            </div>

            <p className="text-xs text-foreground opacity-60">
                {formatDate(cert.date)} - {formatDate(cert.expiring)}
            </p>

            <div className="w-full border-t border-foreground/20 pt-3 mt-auto">
                <a
                    href={cert.verifyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full inline-flex items-center gap-2 justify-center px-6 py-2 bg-foreground text-background font-semibold rounded-md shadow-md hover:opacity-80 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-foreground focus:ring-opacity-75"
                >
                    Verify Certificate
                    <MdOutlineOpenInNew size={16} />
                </a>
            </div>
        </div>
    );
};
