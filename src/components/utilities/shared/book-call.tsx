'use client'

export function BookCall() {
    return (
        <div className="my-8 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 p-6 flex flex-col gap-3">
            <p className="font-semibold text-lg text-[var(--foreground)]">
                Got something in mind?
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                I work with teams and founders building systems that need to be built right. Scalable, reliable, maintainable. If that sounds like your situation, let&apos;s talk.
            </p>
            <a
                href="/book"
                className="self-start rounded-lg bg-[var(--callout)] text-white text-sm font-medium px-4 py-2 hover:opacity-90 transition-opacity"
            >
                Let&apos;s talk
            </a>
        </div>
    )
}
