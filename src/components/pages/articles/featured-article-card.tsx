import Link from "next/link";
import Image from "next/image";

interface FeaturedArticleCardProps {
    title: string;
    link: string;
    coverImage: string;
    description: string;
}

export const FeaturedArticleCard = ({ title, link, coverImage, description }: FeaturedArticleCardProps) => {
    return (
        <Link href={link} className="block group">
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 shadow-md group-hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-background flex flex-col lg:flex-row">
                <div className="relative w-full lg:w-[45%] shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <Image
                        src={coverImage}
                        alt={title}
                        width={0}
                        height={0}
                        sizes="(max-width: 1024px) 100vw, 45vw"
                        style={{ width: "100%", height: "auto" }}
                        className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                </div>
                <div className="p-6 lg:p-10 flex flex-col justify-center">
                    <span className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: 'var(--text-secondary)' }}>
                        Featured
                    </span>
                    <h2 className="text-2xl lg:text-3xl font-bold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-3">
                        {title}
                    </h2>
                    <p className="mt-4 text-sm lg:text-base line-clamp-4" style={{ color: 'var(--text-secondary)' }}>
                        {description}
                    </p>
                    <span className="mt-6 text-sm font-semibold text-blue-600 dark:text-blue-400 group-hover:underline w-fit">
                        Read Article →
                    </span>
                </div>
            </div>
        </Link>
    );
};
