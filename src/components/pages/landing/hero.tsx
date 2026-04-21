'use client'
import Image from "next/image";
import Icon from "@/components/utilities/shared/icon";
import Slider from "@/components/utilities/landingpage/hero/slider";
import Type from "@/components/utilities/landingpage/hero/type";
import { useState } from "react";


export const Herosection = () => {
    const [imageLoaded, setImageLoaded] = useState(false);

    return (

        <>
            <section id="hero-section" className="relative w-full flex flex-col items-stretch pt-25 overflow-hidden 2xl:h-screen max-h-[1600px]">
                <Slider />

                <div id="content-container" className="container mx-auto flex flex-col md:flex-row md:gap-10 xl:gap-20 md:items-center md:justify-center z-20">
                    <div id="image-column" className="flex justify-center items-center py-8 md:py-0 md:w-[34.75rem] relative">
                        {!imageLoaded && (
                            <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg" />
                        )}
                        <Image
                            className="border border-callout rounded-lg object-cover object-top w-[270px] md:w-[500px] md:h-[400px]"
                            src="https://assets.toluhunter.com/landing/profilePic.png"
                            width={500}
                            height={400}
                            alt="Tolulope Fakoya"
                            onLoad={() => setImageLoaded(true)}
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
                        <div id="status-bar" className="bg-background text-foreground border-2 border-white w-full py-1 px-5 text-sm md:text-lg text-center">
                            <div className="bg-callout w-3 h-3 inline-block"></div> Currently Working on BeemBridge
                        </div>


                    </div>


                </div>
                <div className="h-20"></div>
                <Icon name="mouse-scroll" classes="hidden md:block absolute z-50 w-20 h-20 bottom-0 left-1/2 animate-bounce-scroll" color="var(--foreground)" />
                <Icon name="scroll" classes="md:hidden absolute z-50 w-20 h-20 bottom-0 left-1/2 animate-bounce-scroll" color="var(--foreground)" />
            </section>
        </>
    )
}
