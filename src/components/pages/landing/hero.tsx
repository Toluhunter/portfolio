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
            <section className="w-full flex relative items-center 2xl:h-screen max-h-[1600px] flex flex-col pt-25 overflow-hidden">
                <Slider />

                <div className="flex h-full flex-col md:flex-row md:gap-5 xl:gap-60 container md:justify-center z-20 ">
                    <div className="md:hidden flex justify-center items-end relative pb-10" id="mobile-profile-pic">
                        <div className="relative">
                            {!imageLoaded && (
                                <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg"></div>
                            )}
                            <Image
                                className="relative object-contain"
                                src="https://assets.toluhunter.com/landing/profilePic.png"
                                width={270}
                                height={270}
                                alt="Tolulope Fakoya"
                                onLoad={() => setImageLoaded(true)}
                            />
                        </div>
                    </div>
                    <div id="profile-pic" className="hidden md:flex w-[34.75rem] flex">
                        <div className="relative w-full h-full">
                            {!imageLoaded && (
                                <div className="absolute inset-0 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-lg"></div>
                            )}
                            {/* <Image className="hidden md:max-2xl:block relative" src="/about/me2.png" width={400} height={300} alt="Tolulope Fakoya" /> */}
                            <Image id="full-screen-image" className="rounded-lg h-3/4 object-contain relative" src="https://assets.toluhunter.com/landing/profilePic.png" width={500} height={400} alt="Tolulope Fakoya" onLoadingComplete={() => setImageLoaded(true)} />
                        </div>
                    </div>

                    <div className="text-xl h-1/3 md:text-2xl lg:text-4xl xl:text-5xl 4xl:text-6xl flex text-left flex flex-col gap-10 justify-between items-center md:items-start">

                        <p>
                            toluhunter:~<span className="text-callout">$</span> whoami <br />
                            <span className="text-callout">Tolulope Fakoya</span>
                        </p>
                        <div className="inline">
                            toluhunter:~<span className="text-callout">$</span><span className="text-callout"> ./</span>whatido <br />
                            <span className="text-callout">
                                <Type />

                            </span>
                        </div>
                        <p className="text-sm hidden md:block md:text-lg md:w-100 text-center md:text-left text-foreground font-fira-code">
                            <i>He builds secure, scalable systems where cloud engineering meets innovation.</i>
                        </p>

                        <button className="px-5 py-2 text-base md:text-xl border-2 border-callout hover:bg-callout hover:text-white">
                            <a
                                href="mailto:toluhunterdev@gmail.com"
                            >
                                Contact Me
                            </a>

                        </button>
                        <div className="bg-background text-foreground border-2 border-white w-1/2 md:w-full py-1 px-5 text-sm md:text-lg text-center">
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
