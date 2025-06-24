import Image from "next/image";

export interface Certification {
    id: string;
    picture: string; // URL for the certification image/logo
    title: string;
    date: string;
    institution: string;
    verifyLink: string; // URL to verify the certification
}

export const CertificationCard: React.FC<{ cert: Certification }> = ({ cert }) => {
    return (
        // Added 'border border-white' for the white border
        <div className="flex-shrink-0 w-64 md:w-72 p-6 mx-4 bg-gray-800 rounded-xl shadow-lg flex flex-col items-center justify-between snap-center transform transition-transform duration-300 hover:scale-105 border border-white">
            <Image
                src={cert.picture}
                alt={cert.title}
                width={100}
                height={200}
                className="w-24 h-24 rounded-full mb-4 object-cover border-2 border-[#804F94]" // Using direct hex for border-callout
                onError={(e) => {
                    e.currentTarget.onerror = null; // Prevent infinite loop
                    e.currentTarget.src = 'https://placehold.co/200x100/CCCCCC/333333.png?text=Cert'; // Fallback image
                }}
            />
            <h3 className="text-xl md:text-2xl font-semibold text-gray-100 text-center mb-2 leading-tight">{cert.title}</h3> {/* Using text-gray-100 for foreground */}
            <p className="text-sm md:text-base text-gray-400 text-center mb-1">{cert.institution}</p>
            <p className="text-sm md:text-base text-gray-400 text-center mb-4">{cert.date}</p>
            <a
                href={cert.verifyLink}
                target="_blank"
                rel="noopener noreferrer"
                // Changed to 'rounded-md', 'bg-white', 'text-black' and updated hover state
                className="inline-flex items-center justify-center px-6 py-2 bg-white text-black font-semibold rounded-md shadow-md hover:bg-gray-200 transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75"
            >
                Verify
            </a>
        </div>
    );
};
