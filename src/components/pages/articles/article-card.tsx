import Link from "next/link";
import Image from "next/image";

interface ArticleCardProps {
    title: string;
    link: string;
    coverImage: string;
    description: string;
}

export const ArticleCard = ({ title, link, coverImage, description }: ArticleCardProps) => {
    return (
        <Link href={link} className="block group">
            <div className="rounded-xl border border-gray-200 dark:border-gray-700 shadow-md group-hover:shadow-xl transition-shadow duration-300 overflow-hidden bg-background">
                <div className="relative w-full h-56 overflow-hidden">
                    <Image
                        src={coverImage}
                        alt={title}
                        fill
                        style={{ objectFit: "cover" }}
                        className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                    />
                </div>
                <div className="p-5">
                    <h3 className="text-xl font-semibold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 line-clamp-2">
                        {title}
                    </h3>
                    <p className="mt-2 text-sm line-clamp-3" style={{ color: 'var(--text-secondary)' }}>
                        {description}
                    </p>
                </div>
            </div>
        </Link>
    );
};
