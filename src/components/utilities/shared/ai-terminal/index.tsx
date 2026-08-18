'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useAIChat, type ConnectionStatus } from './use-ai-chat'
import { AIMarkdown } from './ai-markdown'

const PANEL_HEIGHT = 'min(var(--terminal-height, 45vh), 520px)'
const BUBBLE_COOLDOWN_MS = 30 * 60 * 1000 // 30 minutes
const SEEN_KEY = 'ai-bubble-seen-at'
const THINKING_WORDS = [
    "hunting",
    "discombobulating",
    "compiling",
    "terraforming",
    "debugging",
    "recursing",
    "vectorizing",
    "hallucinating",
    "tokenizing",
    "beembridging",
    "containerizing",
    "deploying",
    "cogitating",
    "refactoring",
    "backpropagating",
    "git blaming",
    "inferencing",
    "lambdaing",
    "quantizing",
    "exmachinating",
    "ruminating",
    "dockerizing",
    "fine-tuning",
    "overthinking",
    "scouting",
    "reticulating splines",
    "extrapolating",
    "cloudforming",
    "synapsing",
    "defragmenting",
    "overclocking",
    "wrangling tensors",
    "git bisecting",
    "hypervectorizing",
    "kubectl apply -f brain.yaml",
]

const PHRASES = [
    "I know Hunter better than his CV does.",
    "I've read his resume so you don't have to.",
    "Ask me anything. I mean it.",
    "I know things about Hunter that LinkedIn doesn't.",
    "What exactly does Hunter do? Ask me.",
    "I know every project. Every job. Every skill.",
    "Hire him? I can make the case.",
    "The only AI that's actually met Hunter.",
    "Hunter briefed me personally on everything.",
    "Don't scroll. Just ask me.",
    "Go on, I dare you to ask.",
    "Still reading the page? Just ask me instead.",
    "I'm faster than reading this whole site.",
    "One question. That's all it takes.",
    "Psst. Click me.",
    "I've been waiting to talk to someone.",
    "Your recruiter will thank you for this.",
    "I don't sleep. I just wait for questions.",
    "Unlike Hunter, I respond immediately. 😅",
    "Hunter takes days. I take seconds.",
    "I answer faster than Hunter checks his emails.",
    "No waiting 3 business days for a reply.",
    "Hunter's response time: days. Mine: instant.",
    "I don't have meetings. I just answer.",
    "You're curious. I can tell.",
    "Honest answers. No buzzword bingo.",
    "Ask me something his resume doesn't cover.",
    "I don't guess. I know.",
    "Hunter may be busy. I'm not.",
    "Unlike Hunter, I'm always available.",
    "I won't leave you on read.",
    "First question is free 😏",
    "Been here the whole time. Just saying.",
    "I know him better than his mum thinks she does.",
    "Ask me. I dare you.",
]

const BAR_LEN = 8

function ThinkingAnimation() {
    const [word] = useState(
        () => THINKING_WORDS[Math.floor(Math.random() * THINKING_WORDS.length)]
    )
    const [tick, setTick] = useState(0)

    useEffect(() => {
        const t = setInterval(() => setTick(n => n + 1), 100)
        return () => clearInterval(t)
    }, [])

    const filled = (tick % BAR_LEN) + 1
    const bar = '#'.repeat(filled) + ' '.repeat(BAR_LEN - filled)

    return (
        <p className="font-mono text-sm whitespace-pre" style={{ color: 'var(--callout)' }}>
            {word} [{bar}]
        </p>
    )
}

function StatusDot({ status }: { status: ConnectionStatus }) {
    const colour =
        status === 'connected'
            ? 'bg-[var(--callout)]'
            : status === 'thinking' || status === 'connecting'
                ? 'bg-yellow-400 animate-pulse'
                : status === 'error' || status === 'terminated'
                    ? 'bg-red-400'
                    : status === 'rate_limited'
                        ? 'bg-amber-400'
                        : 'bg-gray-600'

    return <span className={`inline-block w-1.5 h-3 align-middle rounded-sm ${colour}`} />
}

function statusLabel(status: ConnectionStatus): string {
    if (status === 'connecting') return 'connecting...'
    if (status === 'thinking') return 'thinking...'
    if (status === 'connected') return 'connected'
    if (status === 'error') return 'connection error'
    if (status === 'rate_limited') return 'rate limited'
    if (status === 'terminated') return 'session ended'
    return ''
}

export function AITerminal() {
    const [open, setOpen] = useState(false)
    const [input, setInput] = useState('')
    const [phrase, setPhrase] = useState<string | null>(null)
    const [showBubble, setShowBubble] = useState(false)
    const [showDot, setShowDot] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLTextAreaElement>(null)

    const { messages, status, sessionId, send } = useAIChat(open)

    useEffect(() => {
        const lastSeen = localStorage.getItem(SEEN_KEY)
        const now = Date.now()
        if (lastSeen && now - parseInt(lastSeen) < BUBBLE_COOLDOWN_MS) return

        const random = PHRASES[Math.floor(Math.random() * PHRASES.length)]
        setPhrase(random)

        const show = setTimeout(() => setShowBubble(true), 2500)
        const hide = setTimeout(() => { setShowBubble(false); setShowDot(true) }, 8000)
        return () => { clearTimeout(show); clearTimeout(hide) }
    }, [])

    const handleOpen = () => {
        setShowBubble(false)
        setShowDot(false)
        localStorage.setItem(SEEN_KEY, Date.now().toString())
        setOpen((o) => !o)
    }

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, status])

    useEffect(() => {
        if (open && status === 'connected') {
            inputRef.current?.focus()
        }
    }, [open, status])

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && open) setOpen(false)
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [open])

    const handleSubmit = useCallback(
        (e?: React.FormEvent | React.KeyboardEvent) => {
            e?.preventDefault()
            const trimmed = input.trim()
            if (!trimmed || status === 'thinking' || status === 'connecting') return
            send(trimmed)
            setInput('')
        },
        [input, status, send]
    )

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            handleSubmit(e)
        }
    }

    const canType = status === 'connected'

    return (
        <>
            {/* Floating trigger — app icon style: icon on top, label below */}
            <div
                className="fixed right-10 z-[9999] transition-all duration-300 ease-in-out flex flex-col items-center gap-1"
                style={{ bottom: open ? `calc(${PANEL_HEIGHT} + 16px)` : '56px' }}
            >
                {/* Speech bubble popup */}
                {showBubble && phrase && !open && (
                    <div
                        className="absolute bottom-full right-0 mb-3 max-w-[220px] w-max"
                        style={{ animation: 'fadeSlideUp 0.3s ease-out' }}
                    >
                        <div className="relative px-3 py-2 rounded-xl text-xs font-mono text-foreground bg-background border-2 border-foreground/20 shadow-lg">
                            {phrase}
                            <span className="absolute -bottom-[7px] right-4 w-3 h-3 bg-background border-b-2 border-r-2 border-foreground/20 rotate-45" />
                        </div>
                    </div>
                )}

                {/* Icon button */}
                <button
                    onClick={handleOpen}
                    aria-label={open ? 'Close AI terminal' : 'Open AI terminal'}
                    className="relative cursor-pointer flex items-center justify-center p-3 rounded-xl bg-background border-2 border-foreground/25 shadow-md transition-all duration-200 hover:border-[var(--callout)] hover:shadow-lg"
                >
                    {/* Pulse ring */}
                    {!open && (
                        <span
                            className="absolute inset-0 rounded-xl border-2 animate-ping"
                            style={{ borderColor: 'color-mix(in srgb, var(--callout) 75%, transparent)' }}
                        />
                    )}
                    {/* Notification dot */}
                    {showDot && !open && (
                        <span
                            className="absolute -top-1 bg-callout -right-1 w-3 h-3 rounded-full border-2 border-background animate-pulse"
                        />
                    )}
                    <span
                        className="w-6 h-6 text-callout flex items-center justify-center font-mono text-sm select-none leading-none"
                    >
                        {open ? '×' : '>_'}
                    </span>
                </button>

                {/* App icon label */}
                <span
                    className="text-xs text-foreground font-mono font-semibold select-none whitespace-nowrap"
                >
                    {open ? 'close' : "Hunter's AI"}
                </span>
            </div>

            {/* Panel */}
            <div
                className={`fixed bottom-0 left-0 right-0 z-[9998] flex flex-col bg-background border-t-2 border-x-2 border-foreground/25 shadow-[0_-4px_24px_rgba(0,0,0,0.15)] rounded-t-xl transition-transform duration-300 ease-in-out ${open ? 'translate-y-0' : 'translate-y-full'
                    }`}
                style={{ height: PANEL_HEIGHT }}
                aria-hidden={!open}
            >
                {/* Header */}
                <div className="flex items-center gap-3 px-4 py-2 border-b border-foreground/10 bg-foreground/5 shrink-0 rounded-t-xl">
                    <div className="flex gap-1.5 items-center">
                        <button
                            onClick={() => setOpen(false)}
                            className="w-3 h-3 rounded-full bg-[#ff5f57] hover:brightness-110 transition-all"
                            aria-label="Close"
                        />
                        <div className="w-3 h-3 rounded-full bg-foreground/15" />
                        <div className="w-3 h-3 rounded-full bg-foreground/15" />
                    </div>

                    <span className="font-mono text-xs text-foreground/60 flex-1 flex items-center gap-1.5">
                        hunter@ai:~$&nbsp;
                        <StatusDot status={status} />
                    </span>

                    <span className="font-mono text-[10px] text-foreground/40">
                        {statusLabel(status)}
                    </span>

                    {sessionId && (
                        <span className="font-mono text-[10px] text-foreground/25 hidden sm:block">
                            &nbsp;·&nbsp;{sessionId.slice(0, 8)}
                        </span>
                    )}
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3 font-mono text-sm">
                    {messages.length === 0 && status === 'connecting' && (
                        <p className="text-foreground/40 animate-pulse">establishing connection...</p>
                    )}

                    {messages.map((msg, i) => {
                        if (msg.role === 'system') {
                            return (
                                <p key={i} className="text-foreground/35 text-xs">
                                    # {msg.content}
                                </p>
                            )
                        }
                        if (msg.role === 'user') {
                            return (
                                <div key={i} className="whitespace-pre-wrap wrap-anywhere">
                                    <span style={{ color: 'var(--callout)' }}>you</span>
                                    <span className="text-foreground/40">@terminal:~$&nbsp;</span>
                                    <span className="text-foreground">{msg.content}</span>
                                </div>
                            )
                        }
                        if (msg.role === 'ai') {
                            return (
                                <div
                                    key={i}
                                    className="text-foreground/80 wrap-anywhere leading-relaxed pl-3"
                                    style={{
                                        borderLeft: '2px solid color-mix(in srgb, var(--callout) 40%, transparent)',
                                    }}
                                >
                                    <AIMarkdown content={msg.content} />
                                </div>
                            )
                        }
                        if (msg.role === 'error') {
                            return (
                                <p key={i} className="text-red-500">
                                    error: {msg.content}
                                </p>
                            )
                        }
                        return null
                    })}

                    {status === 'thinking' && <ThinkingAnimation />}

                    <div ref={messagesEndRef} />
                </div>

                {/* Input */}
                <form
                    onSubmit={handleSubmit}
                    className="shrink-0 flex items-start gap-2 px-4 py-3 border-t border-foreground/10"
                >
                    <span className="font-mono text-sm shrink-0 mt-0.5" style={{ color: 'var(--callout)' }}>
                        {'>'}
                    </span>
                    <div className="relative flex-1 min-w-0 font-mono text-sm min-h-[1.25rem] flex items-start pt-0.5">
                        <div className="whitespace-pre-wrap wrap-anywhere pointer-events-none select-none w-full">
                            <span className="text-foreground">{input}</span>
                            {!input && !canType && (
                                <span className="text-foreground/30">
                                    {status === 'connecting'
                                        ? 'connecting...'
                                        : status === 'thinking'
                                            ? 'waiting for response...'
                                            : status === 'error'
                                                ? 'connection failed — refresh to retry'
                                                : status === 'rate_limited'
                                                    ? 'rate limit reached — close and reopen to continue'
                                                    : status === 'terminated'
                                                        ? 'this session has ended'
                                                        : ''}
                                </span>
                            )}
                            {!input && canType && (
                                <span className="text-foreground/30">ask me anything...</span>
                            )}
                            {canType && (
                                <span
                                    className="inline-block w-[0.55em] h-[1.15em] align-middle -mt-0.5 ml-px shrink-0"
                                    style={{
                                        backgroundColor: 'var(--callout)',
                                        animation: 'termBlink 1s step-end infinite',
                                    }}
                                />
                            )}
                            <span className="invisible select-none">{"\u00A0"}</span>
                        </div>
                        <textarea
                            ref={inputRef}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={!canType}
                            rows={1}
                            className="absolute inset-0 w-full h-full bg-transparent text-transparent outline-none disabled:opacity-0 resize-none overflow-hidden"
                            style={{ caretColor: 'transparent', whiteSpace: 'pre-wrap' }}
                            autoComplete="off"
                            autoCorrect="off"
                            spellCheck={false}
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={!input.trim() || !canType}
                        className="font-mono text-xs text-foreground/40 disabled:opacity-20 transition-colors shrink-0 hover:text-foreground/70 mt-1"
                    >
                        [enter]
                    </button>
                </form>
            </div>

            {/* Mobile backdrop */}
            {open && (
                <div
                    className="fixed inset-0 z-[9997] bg-black/30 sm:hidden"
                    onClick={() => setOpen(false)}
                />
            )}

            <style>{`
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(6px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes termBlink {
                    0%, 100% { opacity: 1; }
                    50%       { opacity: 0; }
                }
                @media (max-width: 640px) {
                    :root {
                        --terminal-height: 70vh;
                    }
                }
            `}</style>
        </>
    )
}
