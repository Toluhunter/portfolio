'use client'

export function BookCall() {
    return (
        <div className="my-8 rounded-2xl border border-foreground/10 bg-panel p-6 flex flex-col gap-3">
            <p className="font-bold text-lg text-foreground">
                Got something in mind?
            </p>
            <p className="text-sm text-muted leading-relaxed">
                I work with teams and founders building systems that need to be built right. Scalable, reliable, maintainable. If that sounds like your situation, let&apos;s talk.
            </p>
            <a
                href="/book"
                className="self-start rounded-md bg-callout-fill text-on-callout font-semibold px-5 py-2.5 hover:opacity-90 transition-opacity"
            >
                Let&apos;s talk
            </a>
        </div>
    )
}
