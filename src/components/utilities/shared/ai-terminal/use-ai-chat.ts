'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

const WS_URL = `${process.env.NEXT_PUBLIC_AI_WS_URL}`
const COOKIE_NAME = 'ai_session_id'
const COOKIE_TTL_DAYS = 1

function getSessionCookie(): string | null {
    if (typeof document === 'undefined') return null
    const match = document.cookie.match(
        new RegExp('(?:^|; )' + COOKIE_NAME + '=([^;]*)')
    )
    return match ? decodeURIComponent(match[1]) : null
}

function setSessionCookie(id: string): void {
    const expires = new Date(
        Date.now() + COOKIE_TTL_DAYS * 24 * 60 * 60 * 1000
    ).toUTCString()
    document.cookie = `${COOKIE_NAME}=${encodeURIComponent(id)}; expires=${expires}; path=/; SameSite=Lax`
}

function deleteSessionCookie(): void {
    document.cookie = `${COOKIE_NAME}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax`
}

export type MessageRole = 'user' | 'ai' | 'error' | 'system'

export interface ChatMessage {
    role: MessageRole
    content: string
}

export type ConnectionStatus = 'idle' | 'connecting' | 'connected' | 'thinking' | 'error' | 'rate_limited' | 'terminated'

export function useAIChat(enabled: boolean) {
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [status, setStatus] = useState<ConnectionStatus>('idle')
    const [sessionId, setSessionId] = useState<string | null>(null)
    const wsRef = useRef<WebSocket | null>(null)
    const pendingRef = useRef(false)

    const connect = useCallback(() => {
        if (wsRef.current?.readyState === WebSocket.OPEN) return

        setStatus('connecting')
        const storedId = getSessionCookie()
        const url = storedId ? `${WS_URL}?session_id=${storedId}` : WS_URL

        const ws = new WebSocket(url)
        wsRef.current = ws

        ws.onmessage = (event) => {
            const data = JSON.parse(event.data as string)

            if (data.type === 'session') {
                const sid = data.session_id as string
                setSessionId(sid)
                setSessionCookie(sid)
                setStatus('connected')
                setMessages((prev) =>
                    prev.length === 0
                        ? [{ role: 'system', content: `session ${sid.slice(0, 8)} resumed` }]
                        : prev
                )
            } else if (data.type === 'token') {
                pendingRef.current = false
                setStatus('connected')
                setMessages((prev) => [...prev, { role: 'ai', content: data.content }])
            } else if (data.type === 'done') {
                setStatus('connected')
            } else if (data.type === 'error') {
                pendingRef.current = false
                setStatus('connected')
                setMessages((prev) => [...prev, { role: 'error', content: data.message }])
            } else if (data.type === 'rate_limited') {
                pendingRef.current = false
                setMessages((prev) => [...prev, { role: 'system', content: 'rate limit reached' }])
            }
        }

        ws.onerror = () => setStatus('error')

        ws.onclose = (event) => {
            if (event.code === 4403) {
                deleteSessionCookie()
                setMessages((prev) => [...prev, { role: 'system', content: 'session ended' }])
                setStatus('terminated')
            } else if (event.code === 4029) {
                setStatus('rate_limited')
            } else {
                if (pendingRef.current) setStatus('error')
                else setStatus('idle')
            }
            pendingRef.current = false
        }
    }, [])

    useEffect(() => {
        if (!enabled) return
        connect()
        return () => {
            wsRef.current?.close()
            wsRef.current = null
        }
    }, [enabled, connect])

    const send = useCallback((text: string) => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return
        setMessages((prev) => [...prev, { role: 'user', content: text }])
        setStatus('thinking')
        pendingRef.current = true
        wsRef.current.send(text)
    }, [])

    return { messages, status, sessionId, send }
}
