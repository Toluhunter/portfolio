'use client';
import { NavBar } from "@/components/utilities/shared/navbar";
import { Footer } from "@/components/pages/landing/footer";
import { ArticleCard } from "@/components/pages/articles/article-card";
import { FeaturedArticleCard } from "@/components/pages/articles/featured-article-card";
import { ArticleCardSkeleton, FeaturedArticleCardSkeleton } from "@/components/pages/articles/article-card-skeleton";
import { useEffect, useState } from "react";
import { PageHeader } from "@/components/utilities/shared/ui";
import type { ApiArticle, ArticlesResponse } from "@/types/api";

interface Article {
    id: string;
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
                const data: ArticlesResponse = await res.json();
                const fetchedArticles = data.articles || [];
                const formattedArticles = fetchedArticles.map((article: ApiArticle) => ({
                    id: article.id,
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
            <div className="min-h-screen bg-background/50 md:backdrop-blur-sm">
            <main className="container mx-auto px-5 md:px-8 pt-32 pb-28">
                <PageHeader
                    eyebrow="writing"
                    title="Articles"
                    lede="Thoughts on cloud architecture, engineering, and the things I build."
                />
                {loading ? (
                    <div className="space-y-6">
                        <FeaturedArticleCardSkeleton />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <ArticleCardSkeleton />
                            <ArticleCardSkeleton />
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        {featured && (
                            <FeaturedArticleCard
                                title={featured.title}
                                description={featured.description}
                                link={featured.link}
                                coverImage={featured.coverImage}
                            />
                        )}
                        {rest.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {rest.map((article) => (
                                    <ArticleCard
                                        key={article.id}
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
            <Footer />
        </>
    );
}
