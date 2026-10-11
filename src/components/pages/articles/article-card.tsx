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
        <Link href={link} className="block group h-full">
            <article className="h-full flex flex-col rounded-2xl border border-foreground/10 group-hover:border-foreground/25 transition-colors duration-300 overflow-hidden bg-panel">
                <div className="w-full overflow-hidden bg-foreground/5">
                    <Image
                        src={coverImage}
                        alt=""
                        width={0}
                        height={0}
                        sizes="(max-width: 768px) 100vw, 50vw"
                        style={{ width: "100%", height: "auto" }}
                        className="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                </div>
                <div className="p-6 flex flex-col gap-2">
                    <h3 className="text-xl font-bold text-foreground group-hover:text-callout transition-colors duration-200 line-clamp-2">
                        {title}
                    </h3>
                    <p className="text-muted leading-relaxed line-clamp-3">
                        {description}
                    </p>
                </div>
            </article>
        </Link>
    );
};
