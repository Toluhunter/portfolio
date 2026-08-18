'use client'

import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

// Renders AI chat responses as markdown. No rehype-raw plugin is used, so raw
// HTML in the response (from a user's input or the model itself) is treated
// as inert text rather than executable markup.
export function AIMarkdown({ content }: { content: string }) {
    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
                p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                a: ({ children, href }) => (
                    <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline underline-offset-2"
                        style={{ color: 'var(--callout)' }}
                    >
                        {children}
                    </a>
                ),
                ul: ({ children }) => <ul className="mb-2 ml-4 list-disc last:mb-0">{children}</ul>,
                ol: ({ children }) => <ol className="mb-2 ml-4 list-decimal last:mb-0">{children}</ol>,
                li: ({ children }) => <li className="mb-0.5">{children}</li>,
                blockquote: ({ children }) => (
                    <blockquote
                        className="mb-2 pl-3 italic text-foreground/70 last:mb-0"
                        style={{ borderLeft: '2px solid color-mix(in srgb, var(--callout) 40%, transparent)' }}
                    >
                        {children}
                    </blockquote>
                ),
                table: ({ children }) => (
                    <div className="mb-2 overflow-x-auto last:mb-0">
                        <table className="w-full text-xs">{children}</table>
                    </div>
                ),
                th: ({ children }) => (
                    <th className="border border-foreground/20 px-2 py-1 text-left">{children}</th>
                ),
                td: ({ children }) => (
                    <td className="border border-foreground/20 px-2 py-1 text-left">{children}</td>
                ),
                pre: ({ children }) => <>{children}</>,
                code({ className, children }) {
                    const match = /language-(\w+)/.exec(className || '')
                    if (match) {
                        return (
                            <SyntaxHighlighter
                                language={match[1]}
                                style={vscDarkPlus}
                                PreTag="div"
                                customStyle={{
                                    margin: '0.5rem 0',
                                    padding: '0.75rem',
                                    borderRadius: '0.375rem',
                                    fontSize: '0.8em',
                                }}
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        )
                    }
                    return (
                        <code className="rounded bg-foreground/10 px-1 py-0.5 font-mono text-[0.9em]">
                            {children}
                        </code>
                    )
                },
            }}
        >
            {content}
        </ReactMarkdown>
    )
}
