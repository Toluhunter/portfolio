"use client";
import type { MDXComponents } from 'mdx/types';
import Image, { ImageProps } from 'next/image';
import React, { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

// This file allows you to provide custom React components
// to be used in MDX files. You can import and use any
// React component you want, including components from
// other libraries.

// This file is required to use MDX in `app` directory.
interface CodeBlockWrapperProps {
    children: React.ReactElement<{
        className?: string;
        children: string | string[];
    }>;
    [key: string]: any;
}

const CodeBlockWrapper = ({ children, ...props }: CodeBlockWrapperProps) => {
    const [isCopied, setIsCopied] = useState(false);
    const codeElement = React.Children.only(children);
    const language = codeElement.props.className?.replace(/language-/, '') || 'text';
    const codeContent = codeElement.props.children;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(String(codeContent).trim());
            toast.success('Copied to clipboard!');
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } catch (err) {
            toast.error('Failed to copy!');
            console.error('Failed to copy text: ', err);
        }
    };


    return (
        <div className="relative my-6">
            <div className="rounded-lg overflow-hidden">
                <div className="flex items-center px-4 py-2 bg-gray-800 text-gray-400 text-xs font-mono rounded-t-lg">
                    <span className="h-3 w-3 bg-red-500 rounded-full mr-1"></span>
                    <span className="h-3 w-3 bg-yellow-400 rounded-full mr-1"></span>
                    <span className="h-3 w-3 bg-green-500 rounded-full mr-3"></span>
                    <span className="flex-grow">{language}</span>
                </div>
                <SyntaxHighlighter
                    // ref={codeRef}
                    style={vscDarkPlus}
                    language={language}
                    PreTag="div"
                    customStyle={{
                        margin: 0,
                        padding: '1rem',
                        backgroundColor: '#1e1e1e',
                        borderRadius: '0 0 0.5rem 0.5rem',
                        fontSize: '0.875rem',
                        fontFamily: 'monospace',
                    }}
                    codeTagProps={{
                        className: 'font-mono text-sm text-white',
                    }}
                    {...props}
                >
                    {String(codeContent).trim()}
                </SyntaxHighlighter>
            </div>
            <button
                onClick={handleCopy}
                className={`absolute top-2 right-2 px-3 py-1 rounded-md text-xs font-medium text-white transition-colors duration-200 ${isCopied
                    ? 'bg-green-600 hover:bg-green-700'
                    : 'bg-gray-700 hover:bg-gray-600'
                    } focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50`}
                disabled={isCopied}
            >
                {isCopied ? (
                    <span className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Copied!
                    </span>
                ) : (
                    'Copy'
                )}
            </button>
        </div>
    );
};

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        wrapper: ({ children }) => (
            <div className="container mx-auto max-w-4xl px-4 py-8">{children}</div>
        ),
        // Allows customizing built-in components, e.g. to add styling.
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
        a: ({ children, href }) => <a href={href} target="_blank" rel="noopener noreferrer" className="font-medium text-[var(--callout)] underline underline-offset-4">{children}</a>,
        p: ({ children }) => <p className="leading-7 text-[var(--foreground)] [&:not(:first-child)]:mt-6">{children}</p>,
        ul: ({ children }) => <ul className="my-6 ml-6 list-disc text-[var(--foreground)]">{children}</ul>,
        ol: ({ children }) => <ol className="my-6 ml-6 list-decimal text-[var(--foreground)]">{children}</ol>,
        li: ({ children }) => <li className="mt-2 text-[var(--foreground)]">{children}</li>,
        blockquote: ({ children }) => <blockquote className="mt-6 border-l-2 border-slate-300 pl-6 italic text-slate-800 dark:border-slate-600 dark:text-slate-200">{children}</blockquote>,
        img: (props) => (
            <span className="my-6 flex justify-center">
                <Image
                    sizes="100vw"
                    style={{ width: '100%', height: 'auto' }}
                    width={props.width || 300}
                    height={props.height || 150}
                    {...(props as ImageProps)}
                    alt={props.alt || ''}
                />
            </span>
        ),
        hr: () => <hr className="my-4 border-slate-200 dark:border-slate-700 md:my-8" />,
        table: ({ children }) => <div className="my-6 w-full overflow-y-auto"><table className="w-full">{children}</table></div>,
        tr: ({ children }) => <tr className="m-0 border-t border-slate-300 p-0 even:bg-slate-100 dark:border-slate-700 dark:even:bg-slate-800">{children}</tr>,
        th: ({ children }) => <th className="border border-slate-200 px-4 py-2 text-left font-bold dark:border-slate-700 [&[align=center]]:text-center [&[align=right]]:text-right">{children}</th>,
        td: ({ children }) => <td className="border border-slate-200 px-4 py-2 text-left dark:border-slate-700 [&[align=center]]:text-center [&[align=right]]:text-right">{children}</td>,
        pre: (props) => <CodeBlockWrapper {...props} />,
        code: ({ children }) => <code className="relative rounded bg-slate-200 py-[0.2rem] px-[0.3rem] font-mono text-sm font-semibold text-slate-900 dark:bg-slate-700 dark:text-slate-50">{children}</code>,

        ...components,
    };
}