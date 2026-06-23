'use client'

import { useState } from 'react'

interface DefinitionProps {
    term: string
    children: React.ReactNode
}

export function Definition({ term, children }: DefinitionProps) {
    const [open, setOpen] = useState(false)

    return (
        <div className="my-6 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
            >
                <div className="flex items-center gap-3">
                    <span className="text-xs font-semibold uppercase tracking-widest text-[var(--callout)]">Definition</span>
                    <span className="font-medium text-[var(--foreground)]">{term}</span>
                </div>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-4 w-4 text-slate-400 transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            {open && (
                <div className="px-4 py-4 border-t border-slate-200 dark:border-slate-700 text-[var(--foreground)] text-sm leading-relaxed">
                    {children}
                </div>
            )}
        </div>
    )
}
