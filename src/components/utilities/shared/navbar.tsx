'use client'

import Icon from "@/components/utilities/shared/icon"
import { FaBars, FaTimes } from "react-icons/fa";
import Link from 'next/link';
import useSound from "use-sound";
import { useAudio } from "./audio";
import { useState, useEffect } from "react";

const NavLinks = ({ className }: { className?: string }) => {
    return (
        <ul className={className}>
            <li><Link href="/services" className="py-2 px-4 hover:text-callout transition-colors duration-300">Services</Link></li>
            <li><Link href="/products" className="py-2 px-4 hover:text-callout transition-colors duration-300">Products</Link></li>
            <li><Link href="/about" className="py-2 px-4 hover:text-callout transition-colors duration-300">About</Link></li>
            <li><Link href="/experience" className="py-2 px-4 hover:text-callout transition-colors duration-300">Experience</Link></li>
            <li><Link href="/articles" className="py-2 px-4 hover:text-callout transition-colors duration-300">Articles</Link></li>
            <li><Link href="/cv" className="py-2 px-4 hover:text-callout transition-colors duration-300">CV</Link></li>
            <li><Link href="/book" className="py-2 px-4 border-2 border-callout rounded-md hover:bg-callout hover:text-on-callout transition-colors duration-300">Book a Call</Link></li>
        </ul>
    )
}

import { useLightbulb } from '@/components/utilities/shared/useLightbulb';
import { LightPullCord } from '@/components/utilities/shared/lightPullCord';

export const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { isLightOn, toggleLight } = useLightbulb();
    const { isSoundOn } = useAudio();
    const [play] = useSound("https://assets.toluhunter.com/sounds/light-switch.mp3", { volume: 1, soundEnabled: isSoundOn });

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        handleScroll(); // Check scroll position on initial load

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <nav className={`px-5 fixed top-0 left-0 mx-auto w-full z-50 flex justify-center transition-all duration-300 bg-background ${scrolled ? 'shadow-sm' : ''} ${isOpen ? 'pb-6' : ''}`}>
                <div className="container flex-wrap flex items-center justify-between relative">
                    <Link href="/">
                        <Icon name={isLightOn ? "logo-black" : "logo"} classes="w-16 h-15" />
                    </Link>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 md:left-1/9 md:translate-x-0 w-[160px] h-[150px] md:w-[170px] md:h-[160px] lg:w-[210px] lg:h-[190px]">
                        <Icon
                            name={isLightOn ? 'light-bulb-on' : 'light-bulb'}
                            classes="w-full h-full"
                        />
                        <LightPullCord
                            onToggle={() => { toggleLight(); play() }}
                            className="absolute top-0 left-[68%] -translate-x-1/2"
                        />
                    </div>
                    <NavLinks className="hidden lg:flex lg:flex-row lg:gap-7 font-bold" />

                    <button onClick={toggleMenu} className="lg:hidden cursor-pointer text-foreground relative w-8 h-8">
                        <FaBars size={22} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0 scale-50 rotate-45' : 'opacity-100 scale-100 rotate-0'}`} />
                        <FaTimes size={22} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-45'}`} />
                    </button>


                    {isOpen &&
                        <NavLinks className="flex lg:hidden flex-col mt-7 w-full gap-5 items-center font-bold z-100" />
                    }
                </div>

            </nav>

        </>
    )
}