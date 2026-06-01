'use client'

import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface CodeBlockWrapperProps {
    children: React.ReactElement<{
        className?: string
        children: string | string[]
    }>
}

export const CodeBlockWrapper = ({ children }: CodeBlockWrapperProps) => {
    const [isCopied, setIsCopied] = useState(false)
    const codeElement = React.Children.only(children)
    const language = codeElement.props.className?.replace(/language-/, '') || 'text'
    const codeContent = codeElement.props.children

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(String(codeContent).trim())
            toast.success('Copied to clipboard!')
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 2000)
        } catch (err) {
            toast.error('Failed to copy!')
            console.error('Failed to copy text: ', err)
        }
    }

    return (
        <div className="relative my-6">
            <div className="rounded-lg overflow-x-auto">
                <div className="flex items-center px-4 py-2 bg-gray-800 text-gray-400 text-xs font-mono rounded-t-lg">
                    <span className="h-3 w-3 bg-red-500 rounded-full mr-1"></span>
                    <span className="h-3 w-3 bg-yellow-400 rounded-full mr-1"></span>
                    <span className="h-3 w-3 bg-green-500 rounded-full mr-3"></span>
                    <span className="flex-grow">{language}</span>
                </div>
                <SyntaxHighlighter
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
    )
}