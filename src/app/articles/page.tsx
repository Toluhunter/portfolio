'use client';
import { NavBar } from "@/components/utilities/shared/navbar";
import { Footer } from "@/components/pages/landing/footer";
import { BuyMeACoffee } from "@/components/utilities/shared/buymecoffee";
import { ArticleCard } from "@/components/pages/articles/article-card";
import { FeaturedArticleCard } from "@/components/pages/articles/featured-article-card";
import { ArticleCardSkeleton, FeaturedArticleCardSkeleton } from "@/components/pages/articles/article-card-skeleton";
import { useEffect, useState } from "react";

interface Article {
    ID: number;
    title: string;
    link: string;
    coverImage: string;
    description: string;
}

export default function ArticlesPage() {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/articles`);
                const data = await res.json();
                const fetchedArticles = data.articles || [];
                const formattedArticles = fetchedArticles.map((article: any) => ({
                    ID: article.ID,
                    title: article.title,
                    link: article.link,
                    description: article.description,
                    coverImage: article.cover_image,
                }));
                setArticles(formattedArticles);
            } catch (error) {
                console.error("Failed to fetch articles:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    const [featured, ...rest] = articles;

    return (
        <>
            <NavBar />
            <div className="min-h-screen bg-background/50 backdrop-blur-sm">
            <main className="container mx-auto px-4 py-8 pt-20">
                <div className="flex flex-col gap-2 mb-12">
                    <span className="text-xs font-semibold uppercase tracking-widest text-foreground/40">Writing</span>
                    <h1 className="text-5xl md:text-6xl font-bold font-fira-code text-foreground">Articles</h1>
                    <p className="text-lg text-foreground/60 mt-1">Thoughts on cloud architecture, engineering, and the things I build.</p>
                </div>
                {loading ? (
                    <div className="space-y-8">
                        <FeaturedArticleCardSkeleton />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <ArticleCardSkeleton />
                            <ArticleCardSkeleton />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-8">
                        {featured && (
                            <FeaturedArticleCard
                                title={featured.title}
                                description={featured.description}
                                link={featured.link}
                                coverImage={featured.coverImage}
                            />
                        )}
                        {rest.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {rest.map((article) => (
                                    <ArticleCard
                                        key={article.ID}
                                        title={article.title}
                                        description={article.description}
                                        link={article.link}
                                        coverImage={article.coverImage}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </main>
            </div>
            <BuyMeACoffee />
            <Footer />
        </>
    );
}
