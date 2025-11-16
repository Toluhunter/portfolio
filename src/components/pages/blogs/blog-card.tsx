import Link from "next/link";
import Image from "next/image";

interface BlogCardProps {
    title: string;
    link: string;
    coverImage: string;
    description: string;
}

export const BlogCard = ({ title, link, coverImage, description }: BlogCardProps) => {
    return (
        <Link href={link} className="block group">
            <div className="relative w-full h-[20rem] overflow-hidden rounded-lg shadow-lg group-hover:shadow-xl transition-shadow duration-300 ease-in-out">
                <Image
                    src={coverImage}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                    className="transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
            </div>
            <h3 className="mt-4 text-xl font-semibold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 ease-in-out">
                {title}
            </h3>
            <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                {description}
            </p>
        </Link>
    );
};
