'use client'
import Icon from "@/components/utilities/shared/icon";
import Slider from "@/components/utilities/landingpage/hero/slider";
import Type from "@/components/utilities/landingpage/hero/type";
import { useState } from "react";


export const Herosection = () => {
    const [videoLoaded, setVideoLoaded] = useState(false);

    return (

        <>
            <section id="hero-section" className="relative w-full flex flex-col items-stretch justify-center pt-25 pb-20 overflow-hidden min-h-screen max-h-[1600px]">
                <Slider />

                <div id="status-bar" className="absolute top-15 left-0 right-0 bg-black/60 backdrop-blur-sm text-white border-b border-white/20 py-1 px-5 text-sm md:text-lg text-center z-[51] md:z-30">
                    <span className="relative inline-flex items-center justify-center w-3 h-3 mr-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-callout opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-callout"></span>
                    </span>Currently Working on BeemBridge
                </div>

                <div id="content-container" className="container mx-auto flex flex-col md:flex-row md:gap-10 xl:gap-20 md:items-center md:justify-center z-20">
                    <div id="image-column" className="flex justify-center items-center py-8 md:py-0 md:w-[34.75rem] relative">
                        {!videoLoaded && (
                            <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg" />
                        )}
                        <video
                            className="border border-callout rounded-lg object-cover w-full aspect-video md:w-[500px]"
                            src="https://assets.toluhunter.com/landing/intro-video.mp4"
                            poster="https://assets.toluhunter.com/landing/profilePic.png"
                            autoPlay
                            muted
                            loop
                            playsInline
                            onLoadedData={() => setVideoLoaded(true)}
                        />
                    </div>

                    <div id="content-column" className="flex flex-col gap-8 items-center md:items-start text-center md:text-left md:max-w-[28rem] xl:max-w-[36rem] text-xl md:text-2xl lg:text-4xl xl:text-5xl">

                        <p id="whoami-line">
                            toluhunter:~<span className="text-callout">$</span> whoami <br />
                            <span className="text-callout">Tolulope Fakoya</span>
                        </p>
                        <div id="whatido-line" className="w-full">
                            toluhunter:~<span className="text-callout">$</span><span className="text-callout"> ./</span>whatido <br />
                            <div className="text-callout">
                                <Type />
                            </div>
                        </div>
                        <p id="tagline" className="text-sm md:text-lg text-foreground font-fira-code">
                            <i>He builds secure, scalable systems where cloud engineering meets innovation.</i>
                        </p>

                        <button id="contact-button" className="px-5 py-2 text-base md:text-xl border-2 border-callout hover:bg-callout hover:text-white">
                            <a
                                href="mailto:toluhunterdev@gmail.com"
                            >
                                Contact Me
                            </a>

                        </button>


                    </div>


                </div>
                <Icon name="mouse-scroll" classes="hidden md:block absolute z-50 w-20 h-20 bottom-0 left-1/2 animate-bounce-scroll" color="var(--foreground)" />
                <Icon name="scroll" classes="md:hidden absolute z-50 w-20 h-20 bottom-0 left-1/2 animate-bounce-scroll" color="var(--foreground)" />
            </section>
        </>
    )
}
