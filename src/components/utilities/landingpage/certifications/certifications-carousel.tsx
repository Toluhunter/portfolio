"use client";
import { useEffect, useRef } from "react";
import { MdOutlineKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { CertificationCard, Certification } from "./certficiation-card";

const SPEED = 1.2;
const CARD_WIDTH = 320;

export const CertificationsCarousel: React.FC<{ certifications: Certification[] }> = ({ certifications }) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const pausedRef = useRef(false);
    const resumeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const doubled = [...certifications, ...certifications];

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const handleScroll = () => {
            const half = container.scrollWidth / 2;
            if (container.scrollLeft >= half) {
                container.scrollLeft -= half;
            }
        };

        // passive: false required to call preventDefault on wheel
        const handleWheel = (e: WheelEvent) => e.preventDefault();

        container.addEventListener("scroll", handleScroll, { passive: true });
        container.addEventListener("wheel", handleWheel, { passive: false });

        let raf: number;
        const tick = () => {
            if (!pausedRef.current) {
                container.scrollLeft += SPEED;
            }
            raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);

        return () => {
            cancelAnimationFrame(raf);
            container.removeEventListener("scroll", handleScroll);
            container.removeEventListener("wheel", handleWheel);
        };
    }, []);

    const pause = () => {
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
        pausedRef.current = true;
    };

    const resume = (delay = 0) => {
        if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
        resumeTimerRef.current = setTimeout(() => {
            pausedRef.current = false;
        }, delay);
    };

    const nudge = (direction: "left" | "right") => {
        const container = containerRef.current;
        if (!container) return;
        container.scrollLeft += direction === "right" ? CARD_WIDTH : -CARD_WIDTH;
    };

    return (
        <div className="flex flex-row flex-1 items-center w-full gap-4">
            <button
                onClick={() => nudge("left")}
                className="hidden lg:flex flex-shrink-0 text-foreground focus:outline-none cursor-pointer"
                aria-label="Scroll left"
            >
                <MdOutlineKeyboardArrowLeft size={48} className="animate-nudge-left" />
            </button>

            <div
                ref={containerRef}
                className="flex flex-1 overflow-x-scroll no-scrollbar [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
                onMouseEnter={pause}
                onMouseLeave={() => resume()}
                onTouchStart={pause}
                onTouchEnd={() => resume(600)}
            >
                {doubled.map((cert, id) => (
                    <CertificationCard key={id} cert={cert} />
                ))}
            </div>

            <button
                onClick={() => nudge("right")}
                className="hidden lg:flex flex-shrink-0 text-foreground focus:outline-none cursor-pointer"
                aria-label="Scroll right"
            >
                <MdOutlineKeyboardArrowRight size={48} className="animate-nudge-right" />
            </button>
        </div>
    );
};
