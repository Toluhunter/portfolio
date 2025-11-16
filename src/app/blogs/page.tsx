'use client';
import { NavBar } from "@/components/utilities/shared/navbar";
import { Footer } from "@/components/pages/landing/footer";
import { BuyMeACoffee } from "@/components/utilities/shared/buymecoffee";
import { BlogCard } from "@/components/pages/blogs/blog-card";
import blogs from "@/data/blogs.json";

export default function Home() {
    return (
        <>
            <NavBar />
            <main className="container min-h-screen mx-auto px-4 py-8 pt-20">
                <h1 className="text-4xl font-bold text-center mb-12">My Blog</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogs.map((blog, index) => (
                        <BlogCard
                            key={index}
                            title={blog.title}
                            description={blog.description}
                            link={blog.link}
                            coverImage={blog.coverImage}
                        />
                    ))}
                </div>
            </main>
            <BuyMeACoffee />
            <Footer />
        </>
    );
}
