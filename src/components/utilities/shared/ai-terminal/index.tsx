'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { isLive, useAIChat, type ChatMessage, type ConnectionStatus } from './use-ai-chat'
import { AIMarkdown } from './ai-markdown'
import { MAX_NAME_LENGTH, lastUsedLabel, sessionLabel } from './sessions'

const PANEL_HEIGHT = 'min(var(--terminal-height, 45dvh), 520px, calc(100dvh - 96px))'
const BUBBLE_COOLDOWN_MS = 30 * 60 * 1000 // 30 minutes
const SEEN_KEY = 'ai-bubble-seen-at'
const LIGHT_ON = '#28c840'
const LIGHT_OFF = '#ff5f57'
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

/** closed: hidden and disconnected. minimised: hidden but still connected. */
type View = 'closed' | 'open' | 'minimised' | 'maximised'

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

/** Red until the server has given the socket a session, green while it is live. */
function ConnectionLight({ status, className = '' }: { status: ConnectionStatus; className?: string }) {
    const live = isLive(status)
    return (
        <span
            aria-hidden
            // Connected: a slow 5s heartbeat. Thinking: the faster pulse, so a reply is clearly coming.
            className={`inline-block rounded-full motion-reduce:animate-none ${status === 'thinking' ? 'animate-pulse' : status === 'connected' ? 'animate-[lightPulse_5s_ease-in-out_infinite]' : ''} ${className}`}
            style={{ backgroundColor: live ? LIGHT_ON : LIGHT_OFF }}
        />
    )
}

function statusLabel(status: ConnectionStatus): string {
    if (status === 'connecting') return 'connecting...'
    if (status === 'thinking') return 'thinking...'
    if (status === 'connected') return 'connected'
    if (status === 'error') return 'connection error'
    if (status === 'rate_limited') return 'rate limited'
    if (status === 'terminated') return 'session ended'
    return 'not connected'
}

/** One plain line for the minimised bar: the latest exchange without its markdown. */
function lastLine(messages: ChatMessage[]): string {
    const last = [...messages].reverse().find((m) => m.role === 'ai' || m.role === 'user')
    if (!last) return 'ask me anything'
    const plain = last.content.replace(/[*_`#>[\]]|\(https?:[^)]*\)/g, '').replace(/\s+/g, ' ').trim()
    return last.role === 'user' ? `you: ${plain}` : plain
}

type WindowSymbol = 'close' | 'minimize' | 'maximize' | 'restore'

// The marks inside the dots, drawn on a 12px grid like a desktop window's controls.
const SYMBOL_PATHS: Record<WindowSymbol, React.ReactNode> = {
    close: <path d="M3.8 3.8l4.4 4.4M8.2 3.8 3.8 8.2" stroke="currentColor" strokeWidth={1.3} strokeLinecap="round" />,
    minimize: <path d="M3.3 6h5.4" stroke="currentColor" strokeWidth={1.4} strokeLinecap="round" />,
    // Two corners pointing out to grow, pointing in to shrink back.
    maximize: <path d="M3.2 3.2h3.9L3.2 7.1ZM8.8 8.8H4.9l3.9-3.9Z" fill="currentColor" />,
    restore: <path d="M5.6 5.6H2.3l3.3-3.3ZM6.4 6.4h3.3L6.4 9.7Z" fill="currentColor" />,
}

function WindowControl({ colour, label, symbol, onClick }: {
    colour: string
    label: string
    symbol: WindowSymbol
    onClick: () => void
}) {
    // The dot is 12px; the button around it is the full header height so it is easy to tap. The
    // symbols show when the pointer is anywhere over the three controls, the tooltip only for this one.
    return (
        <button
            type="button"
            onClick={onClick}
            aria-label={label}
            className="group relative flex items-center justify-center w-8 min-h-[44px] -my-2"
        >
            <span
                className="w-3 h-3 rounded-full flex items-center justify-center transition-all group-hover:brightness-110 group-focus-visible:ring-2 group-focus-visible:ring-offset-1 group-focus-visible:ring-[var(--callout)]"
                style={{ backgroundColor: colour }}
            >
                <svg
                    aria-hidden
                    viewBox="0 0 12 12"
                    className="w-3 h-3 opacity-0 transition-opacity group-hover/controls:opacity-100 group-focus-within/controls:opacity-100"
                    style={{ color: 'rgba(0, 0, 0, 0.55)' }}
                    fill="none"
                >
                    {SYMBOL_PATHS[symbol]}
                </svg>
            </span>
            <span
                role="tooltip"
                className="pointer-events-none absolute top-full left-1/2 -translate-x-1/2 -mt-1 z-20 whitespace-nowrap rounded px-1.5 py-0.5 font-mono text-[10px] bg-foreground text-background opacity-0 transition-opacity delay-0 group-hover:opacity-100 group-hover:delay-300 group-focus-visible:opacity-100 motion-reduce:transition-none"
            >
                {label}
            </span>
        </button>
    )
}

export function AITerminal() {
    const [view, setView] = useState<View>('closed')
    const [input, setInput] = useState('')
    const [inputFocused, setInputFocused] = useState(false)
    const [phrase, setPhrase] = useState<string | null>(null)
    const [showBubble, setShowBubble] = useState(false)
    const [showDot, setShowDot] = useState(false)
    const [unread, setUnread] = useState(false)
    const [menuOpen, setMenuOpen] = useState(false)
    const [renamingId, setRenamingId] = useState<string | null>(null)
    const [renameDraft, setRenameDraft] = useState('')
    const [renameError, setRenameError] = useState<string | null>(null)
    const [renameSaving, setRenameSaving] = useState(false)
    const messagesEndRef = useRef<HTMLDivElement>(null)
    const inputRef = useRef<HTMLTextAreaElement>(null)
    const iconRef = useRef<HTMLButtonElement>(null)

    const panelShown = view === 'open' || view === 'maximised'
    const {
        messages, status, sessionId, sessions, answerCount,
        send, switchSession, renameSession, deleteSession, refreshSessions,
    } = useAIChat(view !== 'closed')
    const live = isLive(status)

    useEffect(() => {
        const lastSeen = localStorage.getItem(SEEN_KEY)
        const now = Date.now()
        if (lastSeen && now - parseInt(lastSeen) < BUBBLE_COOLDOWN_MS) return

        // The phrase only renders with the bubble, so it is picked when the bubble appears.
        const random = PHRASES[Math.floor(Math.random() * PHRASES.length)]

        const show = setTimeout(() => { setPhrase(random); setShowBubble(true) }, 2500)
        const hide = setTimeout(() => { setShowBubble(false); setShowDot(true) }, 8000)
        return () => { clearTimeout(show); clearTimeout(hide) }
    }, [])

    const changeView = useCallback((next: View) => {
        setMenuOpen(false)
        setRenamingId(null)
        setView(next)
        if (next === 'open' || next === 'maximised') setUnread(false)
        // The panel is about to go inert, so focus goes back to the icon rather than nowhere. It
        // waits a frame because the icon is hidden while maximised and can't take focus yet.
        if (next === 'closed' || next === 'minimised') {
            requestAnimationFrame(() => iconRef.current?.focus())
        }
    }, [])

    const handleIcon = () => {
        setShowBubble(false)
        setShowDot(false)
        localStorage.setItem(SEEN_KEY, Date.now().toString())
        changeView(view === 'open' ? 'closed' : 'open')
    }

    // An answer that lands while minimised lights the dot on the icon.
    const seenAnswers = useRef(0)
    useEffect(() => {
        if (answerCount > seenAnswers.current && view === 'minimised') setUnread(true)
        seenAnswers.current = answerCount
    }, [answerCount, view])

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [messages, status, view])

    useEffect(() => {
        if (panelShown && status === 'connected') {
            inputRef.current?.focus()
        }
    }, [panelShown, view, status])

    // Full screen means the page behind should not scroll.
    useEffect(() => {
        if (view !== 'maximised') return
        const previous = document.body.style.overflow
        document.body.style.overflow = 'hidden'
        return () => { document.body.style.overflow = previous }
    }, [view])

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if (e.key !== 'Escape') return
            if (renamingId) return // the rename field handles its own Escape
            if (menuOpen) setMenuOpen(false)
            else if (view === 'maximised') changeView('open')
            else if (view === 'open') changeView('closed')
        }
        window.addEventListener('keydown', handler)
        return () => window.removeEventListener('keydown', handler)
    }, [view, menuOpen, renamingId, changeView])

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

    const toggleMenu = () => {
        if (!menuOpen) refreshSessions()
        setRenamingId(null)
        setMenuOpen((o) => !o)
    }

    const pickSession = (id: string | null) => {
        setMenuOpen(false)
        if (id !== sessionId) switchSession(id)
    }

    // An unnamed session starts from an empty field (its date-time label is the placeholder),
    // since the slashes and colon in that label are not allowed in a name.
    const startRename = (id: string, serverName: string | undefined) => {
        renameCancelled.current = false
        renameOriginal.current = serverName ?? ''
        setRenameError(null)
        setRenamingId(id)
        setRenameDraft(serverName ?? '')
    }

    // Escape cancels; the field then unmounts, and its blur must not save the draft after all.
    const renameCancelled = useRef(false)
    const renameOriginal = useRef('')
    const finishRename = async (save: boolean) => {
        if (!save) renameCancelled.current = true
        const id = renamingId
        const unchanged = renameDraft.trim() === renameOriginal.current.trim()
        if (!save || !id || renameCancelled.current || unchanged) {
            setRenamingId(null)
            setRenameError(null)
            return
        }
        setRenameSaving(true)
        const error = await renameSession(id, renameDraft)
        setRenameSaving(false)
        if (error && !error.startsWith('This conversation has expired')) {
            setRenameError(error) // stay in the field so the visitor can fix it
            return
        }
        setRenameError(null)
        setRenamingId(null)
    }

    const canType = status === 'connected'
    const canSwitch = status !== 'thinking' && status !== 'connecting'
    const maximised = view === 'maximised'
    const column = maximised ? 'w-full max-w-4xl mx-auto' : ''

    return (
        <>
            {/* Floating trigger, app icon style: icon on top, label below. Hidden behind full screen. */}
            <div
                className={`fixed z-[9999] transition-all duration-300 ease-in-out flex flex-col items-center gap-1 ${maximised ? 'hidden' : ''}`}
                style={{ right: 'var(--ai-trigger-right)', bottom: view === 'open' ? `calc(${PANEL_HEIGHT} + 16px)` : 'var(--ai-trigger-bottom)' }}
            >
                {/* Speech bubble popup */}
                {showBubble && phrase && view === 'closed' && (
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

                {/* Minimised: a slim bar above the icon, still connected, one tap to restore */}
                {view === 'minimised' && (
                    <button
                        type="button"
                        onClick={() => changeView('open')}
                        aria-label={`Restore AI terminal, ${live ? 'connected' : 'not connected'}`}
                        className="absolute bottom-full right-0 mb-3 w-[min(280px,calc(100vw-32px))] flex items-center gap-2 px-3 min-h-[44px] rounded-xl bg-background border-2 border-foreground/20 shadow-lg font-mono text-xs text-left hover:border-[var(--callout)] transition-colors"
                        style={{ animation: 'fadeSlideUp 0.2s ease-out' }}
                    >
                        <ConnectionLight status={status} className="w-2 h-2 shrink-0" />
                        <span className="flex-1 min-w-0 truncate text-foreground/80">
                            {status === 'thinking' ? 'thinking...' : lastLine(messages)}
                        </span>
                        <span className="shrink-0 text-foreground/60">{live ? 'connected' : statusLabel(status)}</span>
                    </button>
                )}

                {/* Icon button */}
                <button
                    ref={iconRef}
                    onClick={handleIcon}
                    aria-label={`${view === 'open' ? 'Close' : 'Open'} AI terminal, ${live ? 'connected' : 'not connected'}`}
                    className="relative cursor-pointer flex items-center justify-center min-w-[44px] min-h-[44px] p-3 rounded-xl bg-background border-2 border-foreground/25 shadow-md transition-all duration-200 hover:border-[var(--callout)] hover:shadow-lg"
                >
                    {/* Pulse ring */}
                    {view === 'closed' && (
                        <span
                            className="absolute inset-0 rounded-xl border-2 animate-ping motion-reduce:animate-none"
                            style={{ borderColor: 'color-mix(in srgb, var(--callout) 75%, transparent)' }}
                        />
                    )}
                    {/* Connection light */}
                    <ConnectionLight
                        status={status}
                        className="absolute -top-1 -left-1 w-3 h-3 border-2 border-background"
                    />
                    {/* Notification dot: the intro bubble, or an answer that arrived while minimised */}
                    {((showDot && view === 'closed') || unread) && (
                        <span
                            className="absolute -top-1 bg-callout -right-1 w-3 h-3 rounded-full border-2 border-background animate-pulse motion-reduce:animate-none"
                        />
                    )}
                    <span
                        className="w-6 h-6 text-callout flex items-center justify-center font-mono text-sm select-none leading-none"
                    >
                        {view === 'open' ? '×' : '>_'}
                    </span>
                </button>

                {/* App icon label */}
                <span
                    className="text-xs text-foreground font-mono font-semibold select-none whitespace-nowrap"
                >
                    {view === 'open' ? 'close' : "Hunter's AI"}
                </span>
            </div>

            {/* Panel. Closed or minimised, it is invisible and inert, so it can't take focus or taps. */}
            <div
                className={`fixed bottom-0 left-0 right-0 flex flex-col bg-background transition-[transform,visibility,height] duration-300 ease-in-out motion-reduce:transition-none ${maximised
                    ? 'z-[10000] top-0'
                    : 'z-[9998] border-t-2 border-x-2 border-foreground/25 shadow-[0_-4px_24px_rgba(0,0,0,0.15)] rounded-t-xl'
                    } ${panelShown ? 'visible translate-y-0' : 'invisible translate-y-full'}`}
                style={{
                    height: maximised ? '100dvh' : PANEL_HEIGHT,
                    paddingBottom: 'env(safe-area-inset-bottom)',
                    paddingTop: maximised ? 'env(safe-area-inset-top)' : undefined,
                }}
                aria-hidden={!panelShown}
                inert={!panelShown}
                role={maximised ? 'dialog' : undefined}
                aria-modal={maximised || undefined}
                aria-label="Hunter's AI terminal"
            >
                {/* Header */}
                <div className={`relative flex items-center gap-3 px-4 py-2 border-b border-foreground/10 bg-foreground/5 shrink-0 ${maximised ? '' : 'rounded-t-xl'}`}>
                    <div className="group/controls flex items-center -ml-2">
                        <WindowControl colour="#ff5f57" label="Close" symbol="close" onClick={() => changeView('closed')} />
                        <WindowControl colour="#febc2e" label="Minimize" symbol="minimize" onClick={() => changeView('minimised')} />
                        <WindowControl
                            colour="#28c840"
                            label={maximised ? 'Restore' : 'Maximize'}
                            symbol={maximised ? 'restore' : 'maximize'}
                            onClick={() => changeView(maximised ? 'open' : 'maximised')}
                        />
                    </div>

                    <span className="font-mono text-xs text-foreground/60 flex-1 min-w-0 flex items-center gap-1.5">
                        hunter@ai:~$&nbsp;
                        <ConnectionLight status={status} className="w-2 h-2 shrink-0" />
                    </span>

                    <span className="font-mono text-[10px] text-foreground/60 sr-only sm:not-sr-only" aria-live="polite">
                        {statusLabel(status)}
                    </span>

                    {sessionId && (
                        <span className="font-mono text-[10px] text-foreground/60 hidden sm:block">
                            {sessionId.slice(0, 8)}
                        </span>
                    )}

                    {/* Outlined like a button so it reads as one, with a bold chevron that flips when open.
                        The visible pill is small; the button around it is the full 44px tap height. */}
                    <button
                        type="button"
                        onClick={toggleMenu}
                        aria-expanded={menuOpen}
                        aria-haspopup="true"
                        className="group min-h-[44px] -my-2 -mr-1 flex items-center"
                    >
                        <span
                            className={`flex items-center gap-1.5 pl-2.5 pr-2 py-1 rounded-md border-[1.5px] font-mono text-[11px] font-semibold transition-colors group-focus-visible:ring-2 group-focus-visible:ring-offset-1 group-focus-visible:ring-[var(--callout)] ${menuOpen
                                ? 'bg-[var(--callout)] text-background border-[var(--callout)]'
                                : 'text-[var(--callout)] border-[var(--callout)] group-hover:bg-[color-mix(in_srgb,var(--callout)_12%,transparent)]'
                                }`}
                        >
                            sessions
                            {sessions.length > 0 && (
                                <span className={`text-[10px] font-normal ${menuOpen ? 'text-background/80' : 'text-foreground/60'}`}>
                                    {sessions.length}
                                </span>
                            )}
                            <svg
                                aria-hidden
                                viewBox="0 0 12 12"
                                className={`w-3 h-3 transition-transform duration-200 motion-reduce:transition-none ${menuOpen ? 'rotate-180' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={2.5}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="M2.5 4.5 6 8l3.5-3.5" />
                            </svg>
                        </span>
                    </button>

                    {/* Sessions: only the ones this browser started, from the last 24 hours */}
                    {menuOpen && (
                        <div className="absolute top-full right-2 mt-1 z-10 w-[min(380px,calc(100vw-16px))] rounded-lg border-2 border-foreground/20 bg-background shadow-lg font-mono text-xs overflow-hidden">
                            <button
                                type="button"
                                onClick={() => pickSession(null)}
                                disabled={!canSwitch}
                                className="w-full text-left px-3 min-h-[44px] flex items-center gap-2 border-b border-foreground/10 hover:bg-foreground/5 disabled:opacity-40"
                                style={{ color: 'var(--callout)' }}
                            >
                                + new session
                            </button>
                            {sessions.length === 0 && (
                                <p className="px-3 py-3 text-foreground/60">no other sessions in the last 24 hours</p>
                            )}
                            <ul>
                                {sessions.map((s) => {
                                    const current = s.id === sessionId
                                    const label = sessionLabel(s)
                                    if (renamingId === s.id) {
                                        return (
                                            <li key={s.id} className="px-3 py-2">
                                                <input
                                                    autoFocus
                                                    value={renameDraft}
                                                    placeholder={label}
                                                    maxLength={MAX_NAME_LENGTH}
                                                    disabled={renameSaving}
                                                    onChange={(e) => { setRenameDraft(e.target.value); setRenameError(null) }}
                                                    onKeyDown={(e) => {
                                                        if (e.key === 'Enter') finishRename(true)
                                                        if (e.key === 'Escape') { e.stopPropagation(); finishRename(false) }
                                                    }}
                                                    onBlur={() => { if (!renameError) finishRename(true) }}
                                                    aria-label="Session name"
                                                    aria-invalid={!!renameError}
                                                    aria-describedby={renameError ? 'rename-error' : undefined}
                                                    className={`w-full bg-transparent border-b outline-none text-foreground py-1 placeholder:text-foreground/40 disabled:opacity-60 ${renameError ? 'border-[#ff3b30]' : 'border-foreground/30'}`}
                                                />
                                                {renameError && (
                                                    <p id="rename-error" role="alert" className="mt-1 text-[10px] text-[#ff3b30]">
                                                        {renameError}
                                                    </p>
                                                )}
                                            </li>
                                        )
                                    }
                                    return (
                                        <li key={s.id} className="flex items-stretch border-b border-foreground/5 last:border-b-0">
                                            <button
                                                type="button"
                                                onClick={() => pickSession(s.id)}
                                                disabled={!canSwitch && !current}
                                                aria-current={current || undefined}
                                                className="flex-1 min-w-0 text-left px-3 min-h-[44px] flex items-center gap-2 hover:bg-foreground/5 disabled:opacity-40"
                                            >
                                                <span className="w-2 shrink-0" style={{ color: 'var(--callout)' }}>{current ? '>' : ''}</span>
                                                <span className={`flex-1 min-w-0 truncate ${current ? 'text-foreground' : 'text-foreground/80'}`}>{label}</span>
                                                <span className="shrink-0 text-[10px] text-foreground/50">{lastUsedLabel(s)}</span>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => startRename(s.id, s.name)}
                                                aria-label={`Rename ${label}`}
                                                title="Rename"
                                                className="shrink-0 w-9 min-h-[44px] flex items-center justify-center text-foreground/50 hover:text-[#b8962e] focus-visible:text-[#b8962e] transition-colors"
                                            >
                                                <svg aria-hidden viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M11.2 2.3a1.6 1.6 0 0 1 2.3 2.3L5.2 12.9 2 14l1.1-3.2 8.1-8.5Z" />
                                                    <path d="M9.8 3.8l2.4 2.4" />
                                                </svg>
                                            </button>
                                            <button
                                                type="button"
                                                onClick={() => deleteSession(s.id)}
                                                disabled={current && !canSwitch}
                                                aria-label={`Delete ${label}`}
                                                title="Delete"
                                                className="shrink-0 w-9 mr-1 min-h-[44px] flex items-center justify-center text-foreground/50 hover:text-[#ff3b30] focus-visible:text-[#ff3b30] disabled:opacity-40 transition-colors"
                                            >
                                                <svg aria-hidden viewBox="0 0 16 16" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round">
                                                    <path d="M2.5 4h11" />
                                                    <path d="M6 4V2.5h4V4" />
                                                    <path d="M3.8 4l.7 9.5h7l.7-9.5" />
                                                    <path d="M6.8 7v4M9.2 7v4" />
                                                </svg>
                                            </button>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    )}
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto px-4 py-3 font-mono text-sm" onClick={() => setMenuOpen(false)}>
                    <div className={`space-y-3 ${column}`}>
                        {messages.length === 0 && status === 'connecting' && (
                            <p className="text-foreground/60 animate-pulse">establishing connection...</p>
                        )}

                        {messages.map((msg, i) => {
                            if (msg.role === 'system') {
                                return (
                                    <p key={i} className="text-foreground/60 text-xs">
                                        # {msg.content}
                                    </p>
                                )
                            }
                            if (msg.role === 'user') {
                                return (
                                    <div key={i} className="whitespace-pre-wrap wrap-anywhere">
                                        <span style={{ color: 'var(--callout)' }}>you</span>
                                        <span className="text-foreground/60">@terminal:~$&nbsp;</span>
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
                </div>

                {/* Input */}
                <div className="shrink-0 border-t border-foreground/10">
                    <form
                        onSubmit={handleSubmit}
                        className={`flex items-start gap-2 px-4 py-3 ${column}`}
                    >
                        <span className="font-mono text-sm shrink-0 mt-0.5" style={{ color: 'var(--callout)' }}>
                            {'>'}
                        </span>
                        <div className="relative flex-1 min-w-0 font-mono text-sm min-h-[1.25rem] flex items-start pt-0.5">
                            <div className="whitespace-pre-wrap wrap-anywhere pointer-events-none select-none w-full">
                                <span className="text-foreground">{input}</span>
                                {/* The cursor sits where the next letter goes, so it only shows while typing is possible */}
                                {canType && inputFocused && (
                                    <span
                                        className="inline-block w-[0.55em] h-[1.15em] align-middle -mt-0.5 ml-px shrink-0"
                                        style={{
                                            backgroundColor: 'var(--callout)',
                                            animation: 'termBlink 1s step-end infinite',
                                        }}
                                    />
                                )}
                                {!input && !canType && (
                                    <span className="text-foreground/60">
                                        {status === 'connecting'
                                            ? 'connecting...'
                                            : status === 'thinking'
                                                ? 'waiting for response...'
                                                : status === 'error'
                                                    ? 'connection failed: refresh to retry'
                                                    : status === 'rate_limited'
                                                        ? 'rate limit reached: close and reopen to continue'
                                                        : status === 'terminated'
                                                            ? 'this session has ended: start a new one from sessions'
                                                            : ''}
                                    </span>
                                )}
                                {/* Like a normal placeholder: gone as soon as the input has focus */}
                                {!input && canType && !inputFocused && (
                                    <span className="text-foreground/60">ask me anything...</span>
                                )}
                                <span className="invisible select-none">{" "}</span>
                            </div>
                            <textarea
                                ref={inputRef}
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={handleKeyDown}
                                onFocus={() => setInputFocused(true)}
                                onBlur={() => setInputFocused(false)}
                                disabled={!canType}
                                rows={1}
                                aria-label="Ask Hunter's AI"
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
                            className="font-mono text-xs text-foreground/60 disabled:opacity-20 transition-colors shrink-0 hover:text-foreground/70 min-h-[44px] min-w-[44px] -my-3 flex items-center justify-center"
                        >
                            [enter]
                        </button>
                    </form>
                </div>
            </div>

            {/* Mobile backdrop */}
            {view === 'open' && (
                <div
                    className="fixed inset-0 z-[9997] bg-black/30 sm:hidden"
                    onClick={() => changeView('closed')}
                />
            )}

            <style>{`
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(6px); }
                    to   { opacity: 1; transform: translateY(0); }
                }
                @keyframes lightPulse {
                    0%, 100% { opacity: 1; box-shadow: 0 0 0 0 rgba(40, 200, 64, 0); }
                    50%      { opacity: 0.45; box-shadow: 0 0 0 3px rgba(40, 200, 64, 0.25); }
                }
                @keyframes termBlink {
                    0%, 100% { opacity: 1; }
                    50%       { opacity: 0; }
                }
                @media (max-width: 640px) {
                    :root {
                        --terminal-height: 70dvh;
                    }
                }
            `}</style>
        </>
    )
}
