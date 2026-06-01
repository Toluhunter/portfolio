import React from 'react'
import { compileMDX } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'
import rehypeSlug from 'rehype-slug'
import { NavBar } from '@/components/utilities/shared/navbar'
import { Footer } from '@/components/pages/landing/footer'
import { TOC } from '@/components/utilities/shared/toc'
import { getArticleComponents } from '@/utils/mdx-components'
import { extractToc } from '@/utils/extract-toc'
import CommentSection from '@/components/utilities/shared/CommentSection'
import { Metadata } from 'next'

const CDN_BASE = 'https://assets.toluhunter.com'

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>
}): Promise<Metadata> {
    const { slug } = await params

    const res = await fetch(`${CDN_BASE}/articles/${slug}/content.mdx`, {
        next: { revalidate: 3600 },
    })

    if (!res.ok) return {}

    const rawMdx = await res.text()

    const titleMatch = rawMdx.match(/^#\s+(.+)$/m)
    const title = titleMatch ? titleMatch[1].trim() : 'Article'

    let description = ''
    for (const line of rawMdx.split('\n')) {
        const t = line.trim()
        if (t && !t.startsWith('#') && !t.startsWith('!') && !t.startsWith('_') && !t.startsWith('-') && t.length > 60) {
            description = t.replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').slice(0, 160)
            break
        }
    }

    return {
        title,
        description: description || title,
        openGraph: {
            title,
            description: description || title,
        },
    }
}

export default async function RemoteArticlePage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    const res = await fetch(`${CDN_BASE}/articles/${slug}/content.mdx`, {
        next: { revalidate: 3600 },
    })

    if (!res.ok) notFound()

    const rawMdx = await res.text()

    const toc = extractToc(rawMdx)

    const components = getArticleComponents({
        wrapper: ({ children }: { children: React.ReactNode }) => <>{children}</>,
        CommentSection: () => <CommentSection articleId={slug} />,
    })

    const { content } = await compileMDX({
        source: rawMdx,
        options: {
            parseFrontmatter: true,
            mdxOptions: {
                rehypePlugins: [rehypeSlug],
            },
        },
        components,
    })

    const titleMatch = rawMdx.match(/^#\s+(.+)$/m)
    const articleTitle = titleMatch ? titleMatch[1].trim() : slug

    const blogPostingSchema = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: articleTitle,
        url: `https://toluhunter.com/articles/${slug}`,
        author: {
            '@type': 'Person',
            name: 'Tolulope Fakoya',
            url: 'https://toluhunter.com',
        },
    }

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingSchema) }}
            />
            <NavBar />
            <div className="max-w-screen-xl mx-auto px-6 pt-20">
                <div className="flex gap-12">
                    <main className="flex-1 min-w-0 max-w-3xl mx-auto py-8">
                        {content}
                    </main>
                    <aside className="hidden xl:block w-56 shrink-0">
                        <TOC toc={toc} />
                    </aside>
                </div>
            </div>
            <Footer />
        </>
    )
}
