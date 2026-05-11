'use client'

import { useEffect, useRef } from 'react';

interface LightPullCordProps {
    onToggle: () => void;
    className?: string;
}

const SEGMENTS = 6;
const SEGMENT_LENGTH = 16;
const TOTAL_LENGTH = SEGMENTS * SEGMENT_LENGTH;
const MAX_PULL = 120;
const MAX_TOTAL = TOTAL_LENGTH + MAX_PULL;
const PULL_THRESHOLD_OFFSET = 60;

const GRAVITY = 0.55;
const FRICTION = 0.985;
const CONSTRAINT_ITERATIONS = 6;

const TOGGLE_WIDTH = 14;
const TOGGLE_HEIGHT = 26;

const SVG_WIDTH = 100;
const SVG_HEIGHT = 260;
const ANCHOR_X = SVG_WIDTH / 2;
const ANCHOR_Y = 0;

interface Point {
    x: number;
    y: number;
    px: number;
    py: number;
}

export const LightPullCord = ({ onToggle, className = '' }: LightPullCordProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const toggleRef = useRef<HTMLDivElement>(null);

    const pointsRef = useRef<Point[]>([]);
    const isDraggingRef = useRef(false);
    const dragTargetRef = useRef({ x: ANCHOR_X, y: TOTAL_LENGTH });
    const dragOffsetRef = useRef({ x: 0, y: 0 });

    const lastScrollYRef = useRef(0);
    const scrollImpulseRef = useRef(0);

    useEffect(() => {
        const points: Point[] = [];
        for (let i = 0; i <= SEGMENTS; i++) {
            const y = ANCHOR_Y + i * SEGMENT_LENGTH;
            points.push({ x: ANCHOR_X, y, px: ANCHOR_X, py: y });
        }
        pointsRef.current = points;
        lastScrollYRef.current = window.scrollY;

        const handleScroll = () => {
            const current = window.scrollY;
            const delta = current - lastScrollYRef.current;
            lastScrollYRef.current = current;

            const randomScale = 0.3 + Math.random() * 1.0;
            const randomFlip = Math.random() < 0.25 ? -1 : 1;

            scrollImpulseRef.current += delta * 0.03 * randomScale * randomFlip;
            if (scrollImpulseRef.current > 1.5) scrollImpulseRef.current = 1.5;
            if (scrollImpulseRef.current < -1.5) scrollImpulseRef.current = -1.5;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        let frameId = 0;
        const tick = () => {
            const pts = pointsRef.current;
            const lastIdx = pts.length - 1;

            const impulse = scrollImpulseRef.current;
            scrollImpulseRef.current *= 0.72;

            for (let i = 1; i < pts.length; i++) {
                if (i === lastIdx && isDraggingRef.current) continue;
                const p = pts[i];
                const vx = (p.x - p.px) * FRICTION;
                const vy = (p.y - p.py) * FRICTION;
                p.px = p.x;
                p.py = p.y;

                const factor = Math.pow(i / lastIdx, 1.4) * 0.2;
                p.x += vx + impulse * factor;
                p.y += vy + GRAVITY;

                if (p.y < 0) p.y = 0;
            }

            pts[0].x = ANCHOR_X;
            pts[0].y = ANCHOR_Y;
            pts[0].px = ANCHOR_X;
            pts[0].py = ANCHOR_Y;

            if (isDraggingRef.current) {
                pts[lastIdx].x = dragTargetRef.current.x;
                pts[lastIdx].y = dragTargetRef.current.y;
                pts[lastIdx].px = dragTargetRef.current.x;
                pts[lastIdx].py = dragTargetRef.current.y;
            }

            for (let iter = 0; iter < CONSTRAINT_ITERATIONS; iter++) {
                for (let i = 0; i < pts.length - 1; i++) {
                    const a = pts[i];
                    const b = pts[i + 1];
                    const dx = b.x - a.x;
                    const dy = b.y - a.y;
                    const dist = Math.sqrt(dx * dx + dy * dy) || 0.0001;
                    const diff = (dist - SEGMENT_LENGTH) / dist;
                    const ox = dx * diff;
                    const oy = dy * diff;

                    const aFixed = i === 0;
                    const bFixed = (i + 1) === lastIdx && isDraggingRef.current;

                    if (aFixed && bFixed) {
                        // both pinned, nothing to relax
                    } else if (aFixed) {
                        b.x -= ox;
                        b.y -= oy;
                    } else if (bFixed) {
                        a.x += ox;
                        a.y += oy;
                    } else {
                        a.x += ox * 0.5;
                        a.y += oy * 0.5;
                        b.x -= ox * 0.5;
                        b.y -= oy * 0.5;
                    }
                }
            }

            if (pathRef.current) {
                let d = `M ${pts[0].x.toFixed(2)} ${pts[0].y.toFixed(2)}`;
                for (let i = 1; i < pts.length - 1; i++) {
                    const mx = (pts[i].x + pts[i + 1].x) / 2;
                    const my = (pts[i].y + pts[i + 1].y) / 2;
                    d += ` Q ${pts[i].x.toFixed(2)} ${pts[i].y.toFixed(2)} ${mx.toFixed(2)} ${my.toFixed(2)}`;
                }
                d += ` L ${pts[lastIdx].x.toFixed(2)} ${pts[lastIdx].y.toFixed(2)}`;
                pathRef.current.setAttribute('d', d);
            }

            if (toggleRef.current) {
                const last = pts[lastIdx];
                const prev = pts[lastIdx - 1];
                const angle = Math.atan2(last.x - prev.x, last.y - prev.y) * 180 / Math.PI;
                toggleRef.current.style.transform =
                    `translate(${(last.x - TOGGLE_WIDTH / 2).toFixed(2)}px, ${last.y.toFixed(2)}px) rotate(${angle.toFixed(2)}deg)`;
            }

            frameId = requestAnimationFrame(tick);
        };
        frameId = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    useEffect(() => {
        const container = containerRef.current;
        const toggle = toggleRef.current;
        if (!container || !toggle) return;

        const getRel = (cx: number, cy: number) => {
            const r = container.getBoundingClientRect();
            return { x: cx - r.left, y: cy - r.top };
        };

        const constrain = (x: number, y: number) => {
            const dx = x - ANCHOR_X;
            const dy = Math.max(0, y - ANCHOR_Y);
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist > MAX_TOTAL) {
                const s = MAX_TOTAL / dist;
                return { x: ANCHOR_X + dx * s, y: ANCHOR_Y + dy * s };
            }
            return { x: ANCHOR_X + dx, y: ANCHOR_Y + dy };
        };

        const start = (cx: number, cy: number) => {
            const pos = getRel(cx, cy);
            const last = pointsRef.current[pointsRef.current.length - 1];
            isDraggingRef.current = true;
            document.body.style.cursor = 'grabbing';
            document.body.style.userSelect = 'none';
            dragOffsetRef.current = { x: pos.x - last.x, y: pos.y - last.y };
            dragTargetRef.current = constrain(pos.x - dragOffsetRef.current.x, pos.y - dragOffsetRef.current.y);
        };

        const move = (cx: number, cy: number) => {
            if (!isDraggingRef.current) return;
            const pos = getRel(cx, cy);
            dragTargetRef.current = constrain(pos.x - dragOffsetRef.current.x, pos.y - dragOffsetRef.current.y);
        };

        const end = () => {
            if (!isDraggingRef.current) return;
            isDraggingRef.current = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
            const pull = dragTargetRef.current.y - TOTAL_LENGTH;
            if (pull > PULL_THRESHOLD_OFFSET) onToggle();
        };

        const onMouseDown = (e: MouseEvent) => { e.preventDefault(); start(e.clientX, e.clientY); };
        const onMouseMove = (e: MouseEvent) => move(e.clientX, e.clientY);
        const onMouseUp = () => end();

        const onTouchStart = (e: TouchEvent) => { const t = e.touches[0]; start(t.clientX, t.clientY); };
        const onTouchMove = (e: TouchEvent) => {
            if (isDraggingRef.current) e.preventDefault();
            const t = e.touches[0];
            move(t.clientX, t.clientY);
        };
        const onTouchEnd = () => end();

        toggle.addEventListener('mousedown', onMouseDown);
        toggle.addEventListener('touchstart', onTouchStart, { passive: true });
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('touchmove', onTouchMove, { passive: false });
        document.addEventListener('touchend', onTouchEnd);

        return () => {
            toggle.removeEventListener('mousedown', onMouseDown);
            toggle.removeEventListener('touchstart', onTouchStart);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('touchend', onTouchEnd);
        };
    }, [onToggle]);

    return (
        <div
            ref={containerRef}
            className={`pointer-events-none ${className}`}
            style={{ width: SVG_WIDTH, height: SVG_HEIGHT }}
        >
            <svg
                width={SVG_WIDTH}
                height={SVG_HEIGHT}
                style={{ overflow: 'visible', position: 'absolute', top: 0, left: 0 }}
            >
                <path
                    ref={pathRef}
                    stroke="var(--foreground)"
                    strokeWidth={1.5}
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <div
                ref={toggleRef}
                className="absolute pointer-events-auto cursor-grab"
                style={{
                    top: 0,
                    left: 0,
                    width: TOGGLE_WIDTH,
                    height: TOGGLE_HEIGHT,
                    borderRadius: 6,
                    background: 'var(--foreground)',
                    boxShadow: '0 2px 4px rgba(0,0,0,0.18)',
                    transformOrigin: 'top center',
                    willChange: 'transform',
                    touchAction: 'none',
                }}
            />
        </div>
    );
};
