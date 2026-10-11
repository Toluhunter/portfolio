import Link from "next/link";
import Image from "next/image";
import { Eyebrow } from "@/components/utilities/shared/ui";

interface FeaturedArticleCardProps {
    title: string;
    link: string;
    coverImage: string;
    description: string;
}

export const FeaturedArticleCard = ({ title, link, coverImage, description }: FeaturedArticleCardProps) => {
    return (
        <Link href={link} className="block group">
            <article className="rounded-2xl border border-foreground/10 group-hover:border-foreground/25 transition-colors duration-300 overflow-hidden bg-panel flex flex-col lg:flex-row">
                <div className="relative w-full lg:w-[50%] shrink-0 overflow-hidden bg-foreground/5">
                    <Image
                        src={coverImage}
                        alt=""
                        width={0}
                        height={0}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        style={{ width: "100%", height: "auto" }}
                        className="transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    />
                </div>
                <div className="p-6 lg:p-10 flex flex-col justify-center gap-4">
                    <Eyebrow>featured</Eyebrow>
                    <h2 className="text-2xl lg:text-4xl font-bold tracking-tight text-foreground group-hover:text-callout transition-colors duration-200 line-clamp-3">
                        {title}
                    </h2>
                    <p className="text-muted leading-relaxed line-clamp-4 prose-measure">
                        {description}
                    </p>
                    <span className="mt-2 font-semibold text-callout w-fit">
                        Read article &rarr;
                    </span>
                </div>
            </article>
        </Link>
    );
};
