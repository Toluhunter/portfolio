'use client'
import Image from "next/image";
import Icon from "@/components/utilities/shared/icon";
import Slider from "@/components/utilities/landingpage/hero/slider";
import Type from "@/components/utilities/landingpage/hero/type";


export const Herosection = () => {

    return (

        <>
            <section className="w-full relative min-h-screen flex flex-col pt-25 justify-end items-center overflow-hidden">
                <Slider />

                <div className="flex h-9/10 flex-col md:flex-row md:gap-10 xl:gap-100 container max-md:justify-between z-20 relative">
                    <div className="hidden md:flex w-[620px]">
                        <Image className="hidden md:max-2xl:block" src="https://assets.toluhunter.com/landing/profilePic.webp" width={400} height={300} alt="Tolulope Fakoya" />
                        <Image className="hidden 2xl:block w-full h-full object-contain" src="https://assets.toluhunter.com/landing/profilePic.webp" width={501} height={500} alt="Tolulope Fakoya" />
                    </div>

                    <div className="text-xl h-1/3 md:text-2xl lg:text-4xl flex text-left flex-col gap-10 justify-between items-center md:items-start">

                        <p className="text-white">
                            toluhunter:~<span className="text-callout">$</span> whoami <br />
                            <span className="text-callout">Tolulope Fakoya</span>
                        </p>
                        <div className="inline text-white">
                            toluhunter:~<span className="text-callout">$</span><span className="text-callout"> ./</span>whatido <br />
                            <span className="text-callout">
                                <Type />

                            </span>
                        </div>
                        <p className="text-sm hidden md:block md:text-lg md:w-100 text-center md:text-left text-[#ABB2BF] font-fira-code">
                            <i>He builds secure, scalable systems where cloud engineering meets innovation.</i>
                        </p>

                        <button className="px-5 py-2 text-base md:text-xl border-2 border-callout hover:bg-callout hover:text-white">
                            <a
                                href="mailto:toluhunterdev@gmail.com"
                            >
                                Contact Me
                            </a>

                        </button>
                        <div className="bg-neutral-700 border-2 border-white w-1/2 md:w-full py-1 px-5 text-sm md:text-lg text-center">
                            <div className="bg-callout w-3 h-3 inline-block"></div> Currently Working on BeemBridge
                        </div>


                    </div>

                    <div className="md:hidden flex justify-center">
                        <Image
                            src="https://assets.toluhunter.com/landing/profilePic.webp"
                            width={270}
                            height={270}
                            alt="Tolulope Fakoya"
                        />
                    </div>
                    <Icon name="mouse-scroll" classes="absolute z-50 w-20 h-20 bottom-0 left-1/2 -translate-x-1/2 animate-bounce-scroll" color="white" />

                </div>


            </section>
        </>
    )
}
