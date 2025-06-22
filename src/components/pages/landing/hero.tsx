'use client'
import { Canvas } from "@react-three/fiber";
import { PerspectiveCamera, Float } from "@react-three/drei";
import { DirectionalLight } from "three";
import Image from "next/image";
import Icon from "@/components/utilities/shared/icon";
import Slider from "@/components/utilities/landingpage/hero/slider";
import { Aws, Python, Screen } from "@/components/utilities/landingpage/hero/models";
import { useMediaQuery } from "react-responsive";
import Type from "@/components/utilities/landingpage/hero/type";
import { Leva, useControls } from "leva";
import { useRef } from "react";


export const Herosection = () => {
    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const isTablet = useMediaQuery({ query: '(max-width: 1024px)' })
    const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })

    // const aws_position = useControls("AWS", {
    //     positionx: { value: -3.2, min: -10, max: 10 },
    //     positiony: { value: 0, min: -10, max: 10 },
    //     positionz: { value: 0, min: -10, max: 10 },
    //     scale: { value: 0.04, min: 0, max: 1 }
    // })

    // const screen_position = useControls("Screen", {
    //     positionx: { value: -4.2, min: -10, max: 10 },
    //     positiony: { value: -1.6, min: -10, max: 10 },
    //     positionz: { value: -2.2, min: -10, max: 10 },
    //     rotationx: { value: 3.142, min: -1, max: 5 },
    //     rotationy: { value: 0, min: -1, max: 10 },
    //     rotationz: { value: 3.142, min: -1, max: 10 },
    //     repeatu: { value: 1, min: -10, max: 10 },
    //     repeatv: { value: 1, min: -10, max: 10 },
    //     offsetu: { value: 0, min: -10, max: 10 },
    //     offsetv: { value: 0, min: -10, max: 10 },
    //     scale: { value: 0.003, min: 0, max: 0.1 }
    // })

    // const python_position = useControls("Python", {
    //     positionx: { value: 3.2, min: -10, max: 10 },
    //     positiony: { value: 0, min: -10, max: 10 },
    //     positionz: { value: 0, min: -10, max: 10 },
    //     scale: { value: 0.01, min: 0, max: 1 }
    // })

    const dir_light = useRef<DirectionalLight>(null)
    return (

        <>
            <section className="w-full relative h-screen flex flex-col pt-25 justify-end items-center overflow-hidden">
                <Slider />
                <div className="absolute w-full h-screen z-50">
                    {/* <Leva />
                    <Canvas className="w-full h-screen fixed z-100">
                        <ambientLight color={"white"} intensity={2} />
                        <directionalLight ref={dir_light} color={"white"} intensity={100} position={[-3.2, 1.5, 0.1]} />
                        {dir_light.current && dir_light.current.isDirectionalLight && <directionalLightHelper args={[dir_light.current]} />}
                        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                        <Screen
                            position={[screen_position.positionx, screen_position.positiony, screen_position.positionz]}
                            rotation={[screen_position.rotationx, screen_position.rotationy, screen_position.rotationz]}
                            scale={screen_position.scale}
                        /> */}
                    {/* <Float>
                            <Aws
                                position={[aws_position.positionx, aws_position.positiony, aws_position.positionz]}
                                scale={aws_position.scale}
                            />
                        </Float>
                        <Float>
                            <Python
                                position={[python_position.positionx, python_position.positiony, python_position.positionz]}
                                scale={python_position.scale}
                            />
                        </Float> */}
                    {/* </Canvas> */}
                </div>

                <div className="flex h-9/10 flex-col md:flex-row md:gap-10 xl:gap-100 container max-md:justify-between">
                    <div className="hidden md:flex w-[620px]">
                        <Image className="hidden md:max-2xl:block" src="/profile-pic.png" width={400} height={300} alt="Tolulope Fakoya" />
                        <Image className="hidden 2xl:block w-full h-full object-contain" src="/profile-pic.png" width={501} height={500} alt="Tolulope Fakoya" />
                    </div>

                    <div className="text-xl h-1/3 md:text-2xl lg:text-4xl flex text-left flex-col xl:gap-10 justify-between items-center md:items-start">

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
                        <p className="text-sm hidden md:block md:text-lg md:w-100 text-center md:text-left text-[#ABB2BF] font-fira-code">
                            <i>He builds secure, scalable systems where cloud engineering meets innovation.</i>
                        </p>

                        <button className="px-5 py-2 text-base md:text-xl border-2 border-callout hover:bg-callout hover:text-white">
                            Contact Me

                        </button>
                        <div className="bg-neutral-700 border-2 border-white w-1/2 md:w-full py-1 px-5 text-base md:text-lg text-left">
                            <div className="bg-callout w-3 h-3 inline-block"></div> Currently Working on Portfolio
                        </div>


                    </div>

                    <div className="md:hidden flex justify-center">
                        <Image src="/profile-pic.png" width={270} height={270} alt="Tolulope Fakoya" />
                    </div>
                    <Icon name="mouse-scroll" classes="absolute z-50 w-20 h-20 bottom-0 left-1/2 -translate-x-1/2" color="white" />

                </div>


            </section>
        </>
    )
}
