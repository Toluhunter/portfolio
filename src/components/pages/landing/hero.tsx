'use client'
import Icon from "@/components/utilities/shared/icon";
import Slider from "@/components/utilities/landingpage/hero/slider";
import Type from "@/components/utilities/landingpage/hero/type";
import { useState, useEffect, useRef } from "react";
import { useAudio } from "@/components/utilities/shared/audio";
import Link from "next/link";
import { status } from "@/data/content.json";


export const Herosection = () => {
    const [videoLoaded, setVideoLoaded] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);
    const { isSoundOn, toggleSound } = useAudio();

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        if (video.readyState >= 2) {
            setVideoLoaded(true);
            return;
        }
        const handler = () => setVideoLoaded(true);
        video.addEventListener('loadeddata', handler);
        return () => video.removeEventListener('loadeddata', handler);
    }, []);

    // AudioContext → video: keep video muted state in sync with the global sound toggle
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        video.muted = !isSoundOn;
    }, [isSoundOn]);

    // video → AudioContext: if the user mutes/unmutes via native controls, update the global button
    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;
        const handleVolumeChange = () => {
            if (video.muted === !isSoundOn) return;
            toggleSound();
        };
        video.addEventListener('volumechange', handleVolumeChange);
        return () => video.removeEventListener('volumechange', handleVolumeChange);
    }, [isSoundOn, toggleSound]);

    return (

        <>
            <section id="hero-section" className="relative w-full flex flex-col items-stretch justify-center pt-25 pb-20 overflow-hidden min-h-screen max-h-[1600px]">
                <Slider />

                <div id="status-bar" className="absolute top-15 left-0 right-0 bg-black/60 backdrop-blur-sm text-white border-b border-white/20 py-1 px-5 text-sm md:text-lg text-center z-[51] md:z-30">
                    <span className="relative inline-flex items-center justify-center w-3 h-3 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground"></span>
                    </span>{status.working} · {status.availability}
                </div>

                <div id="content-container" className="container mx-auto flex flex-col md:flex-row md:gap-10 xl:gap-20 md:items-center md:justify-center px-5 md:px-0 z-20">
                    <div id="content-column" className="flex flex-col gap-8 items-start text-left md:max-w-[28rem] xl:max-w-[36rem] text-2xl lg:text-3xl xl:text-4xl">

                        <p id="whoami-line">
                            <span className="text-callout">toluhunter</span><span className="text-foreground/60">@site</span><span className="text-foreground/60">:</span><span className="text-callout">~</span><span className="text-foreground">$</span> whoami <br />
                            <span className="text-foreground">Tolulope Fakoya</span>
                        </p>
                        <div id="whatido-line" className="w-full">
                            <span className="text-callout">toluhunter</span><span className="text-foreground/60">@site</span><span className="text-foreground/60">:</span><span className="text-callout">~</span><span className="text-foreground">$</span><span className="text-foreground"> ./</span>whatido <br />
                            <div className="text-foreground">
                                <Type />
                            </div>
                        </div>
                        <div id="tagline" className="flex flex-col gap-3">
                            <p className="text-base md:text-xl text-foreground font-fira-code">
                                <i>The limit of what you can build is near your imagination. The limit of what survives production is infrastructure.</i>
                            </p>
                            <p className="text-base md:text-lg text-foreground/80 font-fira-code">
                                <i>I design, monitor, and secure yours so the platform you ship performs as well as the idea that started it.</i>
                            </p>
                        </div>

                        <Link href="/book" className="px-5 py-2 text-base md:text-xl bg-callout text-on-callout border-2 border-callout rounded-md hover:opacity-90 transition-opacity duration-300">
                            Book A Free Meeting
                        </Link>


                    </div>

                    <div id="video-column" className="flex justify-center items-center py-8 md:py-0 md:w-[34.75rem] relative">
                        {!videoLoaded && (
                            <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg" />
                        )}
                        <video
                            ref={videoRef}
                            className="border border-foreground rounded-lg object-cover w-full aspect-video"
                            poster="https://assets.toluhunter.com/landing/profilePic.png"
                            autoPlay
                            muted
                            loop
                            playsInline
                            controls
                        >
                            <source src="https://assets.toluhunter.com/landing/intro-video-web.mp4" type="video/mp4" />
                        </video>
                    </div>

                </div>
                <Icon name="mouse-scroll" classes="hidden md:block absolute z-50 w-20 h-20 bottom-0 left-1/2 animate-bounce-scroll" color="var(--foreground)" />
                <Icon name="scroll" classes="md:hidden absolute z-50 w-20 h-20 bottom-0 left-1/2 animate-bounce-scroll" color="var(--foreground)" />
            </section>
        </>
    )
}
