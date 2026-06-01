'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { FiDownload, FiZoomIn, FiZoomOut } from 'react-icons/fi';

pdfjs.GlobalWorkerOptions.workerSrc =
    `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const CV_URL = 'https://assets.toluhunter.com/CV/Tolulope-Fakoya.pdf';
const CV_DOWNLOAD_URL = CV_URL;
const CV_FILENAME = 'Tolulope-Fakoya-CV.pdf';
const EDGE_THRESHOLD = 60;
const FLIP_DURATION = 400;

type FlipDir = 'next' | 'prev' | null;

export const PdfView = () => {
    const [numPages, setNumPages] = useState(0);
    const [page, setPage] = useState(1);
    const [scale, setScale] = useState(1.5);
    const [flipDir, setFlipDir] = useState<FlipDir>(null);
    const [flipping, setFlipping] = useState(false);

    const scrollRef = useRef<HTMLDivElement>(null);
    const accumRef = useRef(0);
    const touchStartRef = useRef(0);
    const touchScrollTopRef = useRef(0);

    const onLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
        setNumPages(numPages);
    }, []);

    const flip = useCallback((dir: FlipDir) => {
        if (flipping || !dir) return;
        if (dir === 'next' && page >= numPages) return;
        if (dir === 'prev' && page <= 1) return;

        setFlipDir(dir);
        setFlipping(true);

        setTimeout(() => {
            setPage(p => dir === 'next' ? p + 1 : p - 1);
            setFlipDir(null);
        }, FLIP_DURATION / 2);

        setTimeout(() => {
            setFlipping(false);
            if (scrollRef.current) {
                scrollRef.current.scrollTop = dir === 'next' ? 0 : scrollRef.current.scrollHeight;
            }
        }, FLIP_DURATION);
    }, [flipping, page, numPages]);

    // Wheel: scroll within page, flip at edges
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        const onWheel = (e: WheelEvent) => {
            const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 4;
            const atTop = el.scrollTop <= 0;

            if (atBottom && e.deltaY > 0) {
                e.preventDefault();
                accumRef.current += e.deltaY;
                if (accumRef.current > EDGE_THRESHOLD) { accumRef.current = 0; flip('next'); }
            } else if (atTop && e.deltaY < 0) {
                e.preventDefault();
                accumRef.current += e.deltaY;
                if (accumRef.current < -EDGE_THRESHOLD) { accumRef.current = 0; flip('prev'); }
            } else {
                accumRef.current = 0;
            }
        };
        el.addEventListener('wheel', onWheel, { passive: false });
        return () => el.removeEventListener('wheel', onWheel);
    }, [flip]);

    // Touch swipe
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        const onTouchStart = (e: TouchEvent) => {
            touchStartRef.current = e.touches[0].clientY;
            touchScrollTopRef.current = el.scrollTop;
        };
        const onTouchEnd = (e: TouchEvent) => {
            const delta = touchStartRef.current - e.changedTouches[0].clientY;
            const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 4;
            const atTop = el.scrollTop <= 0;
            const didNotScroll = Math.abs(el.scrollTop - touchScrollTopRef.current) < 4;
            if (delta > 40 && (atBottom || didNotScroll)) flip('next');
            else if (delta < -40 && (atTop || didNotScroll)) flip('prev');
        };
        el.addEventListener('touchstart', onTouchStart, { passive: true });
        el.addEventListener('touchend', onTouchEnd, { passive: true });
        return () => {
            el.removeEventListener('touchstart', onTouchStart);
            el.removeEventListener('touchend', onTouchEnd);
        };
    }, [flip]);

    // Keyboard
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight' || e.key === 'PageDown') flip('next');
            if (e.key === 'ArrowLeft' || e.key === 'PageUp') flip('prev');
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [flip]);

    const zoomIn = () => setScale(s => Math.min(2.5, parseFloat((s + 0.2).toFixed(1))));
    const zoomOut = () => setScale(s => Math.max(0.5, parseFloat((s - 0.2).toFixed(1))));

    const pagesToPrerender = [page - 1, page + 1].filter(p => p >= 1 && p <= numPages);

    const flipClass = !flipDir ? '' :
        flipDir === 'next' ? 'animate-cv-flip-out-next' : 'animate-cv-flip-out-prev';

    return (
        <section className="min-h-screen pt-24 pb-8 flex flex-col items-center px-4">

            {/* Viewer + rail */}
            <div className="flex gap-4 w-full max-w-4xl" style={{ height: '82vh' }}>

                {/* Scrollable page */}
                <div
                    className="flex-1 overflow-hidden rounded-xl border border-foreground/15 shadow-lg bg-foreground/5"
                    style={{ perspective: '1200px' }}
                >
                    <div
                        ref={scrollRef}
                        className={`w-full h-full overflow-y-auto overflow-x-auto ${flipClass}`}
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        <Document
                            file={CV_URL}
                            onLoadSuccess={onLoadSuccess}
                            loading={
                                <div className="flex items-center justify-center h-full min-h-[60vh]">
                                    <span className="text-foreground/50 font-mono animate-pulse">Loading CV...</span>
                                </div>
                            }
                            error={
                                <div className="flex flex-col items-center justify-center min-h-[40vh] gap-4">
                                    <p className="text-foreground/60">Could not load CV.</p>
                                    <a href={CV_DOWNLOAD_URL} download={CV_FILENAME} className="text-callout underline">Download directly</a>
                                </div>
                            }
                        >
                            <div aria-hidden className="sr-only">
                                {pagesToPrerender.map(p => (
                                    <Page key={p} pageNumber={p} scale={scale} renderTextLayer={false} renderAnnotationLayer={false} />
                                ))}
                            </div>
                            <Page pageNumber={page} scale={scale} renderTextLayer renderAnnotationLayer />
                        </Document>
                    </div>
                </div>

                {/* Vertical rail */}
                {numPages > 1 && (
                    <div className="hidden sm:flex flex-col items-center w-4 py-2">
                        <div className="relative flex-1 w-[2px] bg-foreground/15 rounded-full">
                            <div
                                className="absolute top-0 left-0 w-full rounded-full transition-all duration-500 ease-out"
                                style={{
                                    height: `${((page - 1) / Math.max(numPages - 1, 1)) * 100}%`,
                                    background: 'var(--callout)',
                                    boxShadow: '0 0 8px 2px var(--callout)',
                                }}
                            />
                            <div
                                className="absolute -left-[5px] w-3 h-3 rounded-full border-2 border-background transition-all duration-500 ease-out"
                                style={{
                                    top: `calc(${((page - 1) / Math.max(numPages - 1, 1)) * 100}% - 6px)`,
                                    background: 'var(--callout)',
                                    boxShadow: '0 0 10px 3px var(--callout)',
                                }}
                            />
                            {Array.from({ length: numPages }, (_, i) => (
                                <button
                                    key={i}
                                    onClick={() => { accumRef.current = 0; setPage(i + 1); }}
                                    className="absolute -left-[3px] w-2 h-[2px] rounded-full cursor-pointer transition-all duration-300"
                                    style={{
                                        top: `${(i / Math.max(numPages - 1, 1)) * 100}%`,
                                        background: 'var(--callout)',
                                        opacity: i + 1 <= page ? 1 : 0.2,
                                    }}
                                    aria-label={`Go to page ${i + 1}`}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Toolbar */}
            <div className="w-full max-w-4xl flex items-center justify-between gap-4 mt-4 flex-wrap">
                <div className="flex items-center gap-2">
                    <button onClick={zoomOut} disabled={scale <= 0.5}
                        className="p-2 rounded-lg border border-foreground/20 hover:border-foreground/50 disabled:opacity-30 transition-all cursor-pointer">
                        <FiZoomOut className="w-5 h-5 text-foreground" />
                    </button>
                    <span className="text-sm font-mono text-foreground/70 w-14 text-center">
                        {Math.round(scale * 100)}%
                    </span>
                    <button onClick={zoomIn} disabled={scale >= 2.5}
                        className="p-2 rounded-lg border border-foreground/20 hover:border-foreground/50 disabled:opacity-30 transition-all cursor-pointer">
                        <FiZoomIn className="w-5 h-5 text-foreground" />
                    </button>
                </div>

                <span className="text-sm font-mono text-foreground/60">
                    {numPages > 0 ? `${page} / ${numPages}` : '—'}
                </span>

                <a href={CV_DOWNLOAD_URL} download={CV_FILENAME}
                    className="flex items-center gap-2 px-5 py-2 bg-callout text-on-callout rounded-lg font-semibold hover:opacity-90 transition-opacity">
                    <FiDownload className="w-4 h-4" />
                    Download
                </a>
            </div>

            <style>{`
                @keyframes cvFlipOutNext {
                    0%   { transform: rotateX(0deg);  opacity: 1; }
                    100% { transform: rotateX(-75deg); opacity: 0; }
                }
                @keyframes cvFlipOutPrev {
                    0%   { transform: rotateX(0deg); opacity: 1; }
                    100% { transform: rotateX(75deg); opacity: 0; }
                }
                .animate-cv-flip-out-next {
                    animation: cvFlipOutNext ${FLIP_DURATION / 2}ms ease-in forwards;
                }
                .animate-cv-flip-out-prev {
                    animation: cvFlipOutPrev ${FLIP_DURATION / 2}ms ease-in forwards;
                }
            `}</style>
        </section>
    );
};