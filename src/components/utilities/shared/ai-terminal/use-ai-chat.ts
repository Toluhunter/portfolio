'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import {
    type ChatMessage,
    type StoredSession,
    getActiveSessionId,
    loadSessions,
    migrateLegacyCookie,
    removeSession,
    renameSession as renameStoredSession,
    saveTranscript,
    setActiveSessionId,
    touchSession,
} from './sessions'

export type { ChatMessage, MessageRole } from './sessions'

const WS_URL = `${process.env.NEXT_PUBLIC_AI_WS_URL}`

export type ConnectionStatus = 'idle' | 'connecting' | 'connected' | 'thinking' | 'error' | 'rate_limited' | 'terminated'

/** Live means the socket is open and the server has given it a session: the green light. */
export function isLive(status: ConnectionStatus): boolean {
    return status === 'connected' || status === 'thinking'
}

export function useAIChat(enabled: boolean) {
    const [messages, setMessages] = useState<ChatMessage[]>([])
    const [status, setStatus] = useState<ConnectionStatus>('idle')
    const [sessionId, setSessionId] = useState<string | null>(null)
    const [sessions, setSessions] = useState<StoredSession[]>([])
    // Goes up by one for every answer, so the terminal can tell one arrived while minimised.
    const [answerCount, setAnswerCount] = useState(0)
    const wsRef = useRef<WebSocket | null>(null)
    const pendingRef = useRef(false)

    const disconnect = useCallback(() => {
        const ws = wsRef.current
        wsRef.current = null // its handlers check this, so a closing socket changes nothing
        ws?.close()
        pendingRef.current = false
    }, [])

    /** Open a socket for the given session, or for a new one when id is null. */
    const connect = useCallback((requestedId: string | null) => {
        disconnect()
        setStatus('connecting')
        const url = requestedId ? `${WS_URL}?session_id=${encodeURIComponent(requestedId)}` : WS_URL
        const ws = new WebSocket(url)
        wsRef.current = ws
        let liveId: string | null = null

        ws.onmessage = (event) => {
            if (wsRef.current !== ws) return
            const data = JSON.parse(event.data as string)

            if (data.type === 'session') {
                const sid = data.session_id as string
                liveId = sid
                // The server only starts a fresh session when it no longer knows the old one.
                if (requestedId && requestedId !== sid) removeSession(requestedId)
                const list = touchSession(sid)
                setActiveSessionId(sid)
                setSessions(list)
                const stored = list.find((s) => s.id === sid)?.messages ?? []
                setMessages(
                    stored.length > 0
                        ? stored
                        : [{
                            role: 'system',
                            content: requestedId === sid
                                ? `session ${sid.slice(0, 8)} resumed`
                                : `session ${sid.slice(0, 8)} started`,
                        }]
                )
                setSessionId(sid)
                setStatus('connected')
            } else if (data.type === 'token') {
                pendingRef.current = false
                setStatus('connected')
                setMessages((prev) => [...prev, { role: 'ai', content: data.content }])
                setAnswerCount((n) => n + 1)
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

        ws.onerror = () => {
            if (wsRef.current === ws) setStatus('error')
        }

        ws.onclose = (event) => {
            if (wsRef.current !== ws) return
            wsRef.current = null
            if (event.code === 4403) {
                // The server closed it for repeated injection attempts; it is gone, so drop it.
                const ended = liveId ?? requestedId
                if (ended) setSessions(removeSession(ended))
                setActiveSessionId(null)
                setMessages((prev) => [...prev, { role: 'system', content: 'session ended' }])
                setStatus('terminated')
            } else if (event.code === 4029) {
                setStatus('rate_limited')
            } else {
                setStatus(pendingRef.current ? 'error' : 'idle')
            }
            pendingRef.current = false
        }
    }, [disconnect])

    useEffect(() => {
        if (!enabled) return
        migrateLegacyCookie()
        // Opening the socket is the external system this effect syncs with; 'connecting' is part of it.
        // eslint-disable-next-line react-hooks/set-state-in-effect
        connect(getActiveSessionId())
        return () => {
            disconnect()
            setStatus('idle')
        }
    }, [enabled, connect, disconnect])

    // Keep this browser's copy of the conversation, so switching back shows it.
    useEffect(() => {
        if (sessionId) saveTranscript(sessionId, messages)
    }, [sessionId, messages])

    const send = useCallback((text: string) => {
        if (!wsRef.current || wsRef.current.readyState !== WebSocket.OPEN) return
        setMessages((prev) => [...prev, { role: 'user', content: text }])
        setStatus('thinking')
        pendingRef.current = true
        wsRef.current.send(text)
        if (sessionId) setSessions(touchSession(sessionId))
    }, [sessionId])

    const switchSession = useCallback((id: string | null) => {
        // Cleared first, so the old transcript is never saved under the new session.
        setSessionId(null)
        setMessages([])
        setActiveSessionId(id)
        connect(id)
    }, [connect])

    const renameSession = useCallback((id: string, name: string) => {
        setSessions(renameStoredSession(id, name))
    }, [])

    /** Forget a session in this browser. Deleting the one in use starts a fresh session. */
    const deleteSession = useCallback((id: string) => {
        setSessions(removeSession(id))
        if (id === sessionId) switchSession(null)
    }, [sessionId, switchSession])

    const refreshSessions = useCallback(() => setSessions(loadSessions()), [])

    return {
        messages,
        status,
        sessionId,
        sessions,
        answerCount,
        send,
        switchSession,
        renameSession,
        deleteSession,
        refreshSessions,
    }
}
