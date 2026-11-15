'use client';
import { useSyncExternalStore } from "react";
import Image from "next/image";
import { useTheme } from "@/components/utilities/shared/useLightbulb";

export interface ProjectVideoProps {
    name: string;
    video: string;
    poster?: string;
    posterLight?: string;
}

const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

const subscribeToReducedMotion = (onChange: () => void) => {
    const query = window.matchMedia(REDUCED_MOTION);
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
};

// A silent, looping project showcase video. The poster follows the light switch, and visitors who
// prefer reduced motion get the poster as a still instead of the video.
export const ProjectVideo = ({ name, video, poster, posterLight }: ProjectVideoProps) => {
    const { isLightOn } = useTheme();
    const reducedMotion = useSyncExternalStore(
        subscribeToReducedMotion,
        () => window.matchMedia(REDUCED_MOTION).matches,
        () => false
    );
    const still = (isLightOn && posterLight) || poster;

    if (reducedMotion && still) {
        return (
            <Image
                src={still}
                alt={`${name} explainer`}
                width={1920}
                height={1080}
                className="w-full h-full object-cover"
            />
        );
    }

    return (
        <video
            src={video}
            poster={still}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            aria-label={`${name} explainer video`}
            className="w-full h-full object-cover"
        />
    );
};
