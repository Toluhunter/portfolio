import Image from "next/image";

export interface Certification {
    picture: string; // URL for the certification image/logo
    title: string;
    date: string;
    expiring: string;
    institution: string;
    verifyLink: string; // URL to verify the certification
}

export const CertificationCard: React.FC<{ cert: Certification }> = ({ cert }) => {
    return (
        // Added 'border border-white' for the white border
        <div className="flex-shrink-0 w-64 md:w-72 p-6 mx-4 bg-background rounded-xl shadow-lg flex flex-col items-center justify-between snap-center transform transition-transform duration-300 hover:scale-105 border border-foreground">
            <Image
                src={cert.picture}
                alt={cert.title}
                width={120}
                height={200}
                className="w-24 h-24 rounded-full mb-4 object-cover" // Using direct hex for border-callout
                onError={(e) => {
                    e.currentTarget.onerror = null; // Prevent infinite loop
                    e.currentTarget.src = 'https://placehold.co/200x100/CCCCCC/333333.png?text=Cert'; // Fallback image
                }}
            />
            <h3 className="text-xl md:text-2xl font-semibold text-foreground text-center mb-2 leading-tight">{cert.title}</h3> {/* Using text-gray-100 for foreground */}
            <p className="text-sm md:text-base text-foreground text-center mb-4">{cert.institution}</p>

            <p className="text-sm md:text-base text-foreground text-center">Date Issued: {cert.date}</p>
            <p className="text-sm md:text-base text-foreground text-center mb-4">Date Expiring: {cert.expiring}</p>
            <a
                href={cert.verifyLink}
                target="_blank"
                rel="noopener noreferrer"
                // Changed to 'rounded-md', 'bg-white', 'text-black' and updated hover state
                className="inline-flex items-center justify-center px-6 py-2 bg-foreground text-background font-semibold rounded-md shadow-md hover:bg-foreground transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-callout focus:ring-opacity-75"
            >
                Verify
            </a>
        </div>
    );
};
