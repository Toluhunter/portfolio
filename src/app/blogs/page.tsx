'use client';
import { NavBar } from "@/components/utilities/shared/navbar";
import { Footer } from "@/components/pages/landing/footer";
import { BuyMeACoffee } from "@/components/utilities/shared/buymecoffee";
import { BlogCard } from "@/components/pages/blogs/blog-card";
import { useEffect, useState } from "react";
import { BlogCardSkeleton } from "@/components/pages/blogs/blog-card-skeleton";

interface Blog {
    ID: number;
    title: string;
    link: string;
    coverImage: string;
    description: string;
}

export default function Home() {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/articles`);
                const data = await res.json();
                // API response is likely { articles: [...] }, so we access the articles property
                const fetchedBlogs = data.articles || [];
                const formattedBlogs = fetchedBlogs.map((blog: any) => ({
                    ID: blog.ID,
                    title: blog.title,
                    link: blog.link,
                    description: blog.description,
                    coverImage: blog.cover_image, // Map from snake_case to camelCase
                }));
                setBlogs(formattedBlogs);
            } catch (error) {
                console.error("Failed to fetch blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return (
        <>
            <NavBar />
            <main className="container min-h-screen mx-auto px-4 py-8 pt-20">
                <h1 className="text-4xl font-bold text-center mb-12">My Blog</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {loading ? (
                        Array.from({ length: 3 }).map((_, index) => (
                            <BlogCardSkeleton key={index} />
                        ))
                    ) : (
                        blogs.map((blog) => (
                            <BlogCard
                                key={blog.ID}
                                title={blog.title}
                                description={blog.description}
                                link={blog.link}
                                coverImage={blog.coverImage}
                            />
                        ))
                    )}
                </div>
            </main>
            <BuyMeACoffee />
            <Footer />
        </>
    );
}
