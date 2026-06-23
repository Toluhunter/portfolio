'use client'

import { useEffect, useId, useRef } from 'react'

interface MermaidProps {
    chart: string
}

export function Mermaid({ chart }: MermaidProps) {
    const id = useId().replace(/:/g, '')
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
        import('mermaid').then((m) => {
            m.default.initialize({ startOnLoad: false, theme: 'neutral', securityLevel: 'loose' })
            m.default.render(`mermaid-${id}`, chart.trim()).then(({ svg }) => {
                if (ref.current) ref.current.innerHTML = svg
            })
        })
    }, [chart, id])

    return <div ref={ref} className="my-6 flex justify-center overflow-x-auto" />
}
