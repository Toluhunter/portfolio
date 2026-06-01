import type { MDXComponents } from 'mdx/types'
import Image, { ImageProps } from 'next/image'
import { CodeBlockWrapper } from '@/components/utilities/shared/code-block'
import YouTube from '@/components/utilities/markdown/Youtube'
import { AuthProvider } from '@/components/utilities/shared/AuthContext'
import CommentSection from '@/components/utilities/shared/CommentSection'

export function getArticleComponents(overrides: MDXComponents = {}): MDXComponents {
    return {
        wrapper: ({ children }) => (
            <div className="container overflow-x-hidden max-w-sm md:max-w-4xl mx-auto px-4 py-8">{children}</div>
        ),
        h1: ({ children, ...props }) => (
            <h1 {...props} className="mt-15 scroll-m-20 text-4xl font-bold tracking-tight text-[var(--foreground)]">
                {children}
            </h1>
        ),
        h2: ({ children, ...props }) => (
            <h2 {...props} className="mt-10 scroll-m-20 border-b border-b-slate-200 pb-2 text-3xl font-semibold tracking-tight text-[var(--foreground)] first:mt-0 dark:border-b-slate-700">
                {children}
            </h2>
        ),
        h3: ({ children, ...props }) => (
            <h3 {...props} className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight text-[var(--foreground)]">
                {children}
            </h3>
        ),
        h4: ({ children, ...props }) => (
            <h4 {...props} className="mt-8 scroll-m-20 text-xl font-semibold tracking-tight text-[var(--foreground)]">
                {children}
            </h4>
        ),
        h5: ({ children, ...props }) => (
            <h5 {...props} className="mt-8 scroll-m-20 text-lg font-semibold tracking-tight text-[var(--foreground)]">
                {children}
            </h5>
        ),
        h6: ({ children, ...props }) => (
            <h6 {...props} className="mt-8 scroll-m-20 text-base font-semibold tracking-tight text-[var(--foreground)]">
                {children}
            </h6>
        ),
        a: ({ children, href }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-[var(--callout)] underline underline-offset-4">
                {children}
            </a>
        ),
        p: ({ children }) => (
            <p className="leading-7 text-[var(--foreground)] [&:not(:first-child)]:mt-6">{children}</p>
        ),
        ul: ({ children }) => (
            <ul className="my-6 ml-6 list-disc text-[var(--foreground)]">{children}</ul>
        ),
        ol: ({ children }) => (
            <ol className="my-6 ml-6 list-decimal text-[var(--foreground)]">{children}</ol>
        ),
        li: ({ children }) => (
            <li className="mt-2 text-[var(--foreground)]">{children}</li>
        ),
        blockquote: ({ children }) => (
            <blockquote className="mt-6 border-l-2 border-slate-300 pl-6 italic text-slate-800 dark:border-slate-600 dark:text-slate-200">
                {children}
            </blockquote>
        ),
        img: (props) => (
            <span className="my-6 flex justify-center">
                <Image
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                    width={props.width || 300}
                    height={props.height || 150}
                    {...(props as ImageProps)}
                    alt={props.alt || ''}
                    unoptimized
                />
            </span>
        ),
        hr: () => <hr className="my-4 border-slate-200 dark:border-slate-700 md:my-8" />,
        table: ({ children }) => (
            <div className="my-6 w-full overflow-x-auto max-w-full">
                <table className="w-full">{children}</table>
            </div>
        ),
        tr: ({ children }) => (
            <tr className="m-0 border-t border-slate-300 p-0 even:bg-slate-100 dark:border-slate-700 dark:even:bg-slate-800">
                {children}
            </tr>
        ),
        th: ({ children }) => (
            <th className="border border-slate-200 px-4 py-2 text-left font-bold dark:border-slate-700 [&[align=center]]:text-center [&[align=right]]:text-right">
                {children}
            </th>
        ),
        td: ({ children }) => (
            <td className="border border-slate-200 px-4 py-2 text-left dark:border-slate-700 [&[align=center]]:text-center [&[align=right]]:text-right">
                {children}
            </td>
        ),
        YouTube,
        AuthProvider,
        CommentSection,
        pre: (props) => <CodeBlockWrapper {...props} />,
        code: ({ children, className, ...props }) => {
            if (className?.startsWith('language-')) {
                return <code className={className} {...props}>{children}</code>
            }
            return (
                <code className="relative rounded bg-slate-200 py-[0.2rem] px-[0.3rem] font-mono text-sm font-semibold text-slate-900 dark:bg-slate-700 dark:text-slate-50">
                    {children}
                </code>
            )
        },
        ...overrides,
    }
}
