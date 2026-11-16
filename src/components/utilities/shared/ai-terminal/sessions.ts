'use client'

// The conversations this browser has had with the assistant, kept in localStorage. The server
// keeps each session for 24 hours (sliding), so the list keeps the same window. Nothing here is
// sent to the server except the session id itself, which already travels in the socket URL.

export type MessageRole = 'user' | 'ai' | 'error' | 'system'

export interface ChatMessage {
    role: MessageRole
    content: string
}

export interface StoredSession {
    id: string
    name?: string // from the server (SITE-34), once it names the session
    customName?: string // the visitor's own rename; local only and wins over name
    createdAt: number
    lastUsed: number
    messages: ChatMessage[]
}

const SESSIONS_KEY = 'ai-sessions'
const ACTIVE_KEY = 'ai-active-session'
const LEGACY_COOKIE = 'ai_session_id'
const SESSION_TTL_MS = 24 * 60 * 60 * 1000
export const MAX_SESSIONS = 5
const MAX_STORED_MESSAGES = 60
export const MAX_NAME_LENGTH = 40

function isStoredSession(value: unknown): value is StoredSession {
    const s = value as StoredSession
    return (
        typeof s === 'object' && s !== null &&
        typeof s.id === 'string' &&
        typeof s.createdAt === 'number' &&
        typeof s.lastUsed === 'number' &&
        Array.isArray(s.messages)
    )
}

function readRaw(): StoredSession[] {
    try {
        const parsed = JSON.parse(localStorage.getItem(SESSIONS_KEY) ?? '[]')
        return Array.isArray(parsed) ? parsed.filter(isStoredSession) : []
    } catch {
        return []
    }
}

function write(sessions: StoredSession[]): void {
    try {
        localStorage.setItem(SESSIONS_KEY, JSON.stringify(sessions))
    } catch {
        // Storage full or blocked: the chat still works, it just will not be listed.
    }
}

/** Most recent first, without anything past the server's 24 hour window. */
export function loadSessions(): StoredSession[] {
    const now = Date.now()
    const all = readRaw()
    const live = all
        .filter((s) => now - s.lastUsed < SESSION_TTL_MS)
        .sort((a, b) => b.lastUsed - a.lastUsed)
        .slice(0, MAX_SESSIONS)
    if (live.length !== all.length) write(live)
    return live
}

export function getActiveSessionId(): string | null {
    const active = localStorage.getItem(ACTIVE_KEY)
    if (active && loadSessions().some((s) => s.id === active)) return active
    return null
}

export function setActiveSessionId(id: string | null): void {
    if (id) localStorage.setItem(ACTIVE_KEY, id)
    else localStorage.removeItem(ACTIVE_KEY)
}

/** Add the session or mark it used, keeping only the five most recent. */
export function touchSession(id: string): StoredSession[] {
    const now = Date.now()
    const sessions = loadSessions()
    const existing = sessions.find((s) => s.id === id)
    const updated = existing
        ? sessions.map((s) => (s.id === id ? { ...s, lastUsed: now } : s))
        : [{ id, createdAt: now, lastUsed: now, messages: [] }, ...sessions]
    const kept = updated.sort((a, b) => b.lastUsed - a.lastUsed).slice(0, MAX_SESSIONS)
    write(kept)
    return kept
}

export function saveTranscript(id: string, messages: ChatMessage[]): void {
    const sessions = loadSessions()
    if (!sessions.some((s) => s.id === id)) return
    const kept = messages.filter((m) => m.role !== 'error').slice(-MAX_STORED_MESSAGES)
    write(sessions.map((s) => (s.id === id ? { ...s, messages: kept } : s)))
}

export function renameSession(id: string, name: string): StoredSession[] {
    const trimmed = name.trim().slice(0, MAX_NAME_LENGTH)
    const sessions = loadSessions().map((s) =>
        s.id === id ? { ...s, customName: trimmed || undefined } : s
    )
    write(sessions)
    return sessions
}

export function removeSession(id: string): StoredSession[] {
    const sessions = loadSessions().filter((s) => s.id !== id)
    write(sessions)
    if (localStorage.getItem(ACTIVE_KEY) === id) setActiveSessionId(null)
    return sessions
}

/** The name shown in the selector: the visitor's rename, then the server's, then the start time. */
export function sessionLabel(session: StoredSession): string {
    if (session.customName) return session.customName
    if (session.name) return session.name
    const started = new Date(session.createdAt)
    return `Chat from ${started.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}`
}

export function lastUsedLabel(session: StoredSession, now = Date.now()): string {
    const minutes = Math.floor((now - session.lastUsed) / 60000)
    if (minutes < 1) return 'just now'
    if (minutes < 60) return `${minutes}m ago`
    return `${Math.floor(minutes / 60)}h ago`
}

/** The old single-session cookie becomes the first entry in the list, once, then goes away. */
export function migrateLegacyCookie(): void {
    const match = document.cookie.match(new RegExp('(?:^|; )' + LEGACY_COOKIE + '=([^;]*)'))
    if (!match) return
    const id = decodeURIComponent(match[1])
    if (id && !loadSessions().some((s) => s.id === id)) {
        touchSession(id)
        if (!localStorage.getItem(ACTIVE_KEY)) setActiveSessionId(id)
    }
    document.cookie = `${LEGACY_COOKIE}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`
}
