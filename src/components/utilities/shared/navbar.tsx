'use client'

import Icon from "@/components/utilities/shared/icon"
import Link from 'next/link';
import useSound from "use-sound";
import { useAudio } from "./audio";
import { useState, useEffect } from "react";

const NavLinks = ({ className }: { className?: string }) => {
    return (
        <ul className={className}>
            <li><Link href="/" className="py-2 px-4 hover:text-[var(--calcout-dark)] transition-colors duration-300">Home</Link></li>
            <li><Link href="/about" className="py-2 px-4 hover:text-[var(--calcout-dark)] transition-colors duration-300">About</Link></li>
            <li><Link href="/projects" className="py-2 px-4 hover:text-[var(--calcout-dark)] transition-colors duration-300">Projects</Link></li>
            <li><Link href="/services" className="py-2 px-4 hover:text-[var(--calcout-dark)] transition-colors duration-300">Services</Link></li>
            <li><Link href="/blogs" className="py-2 px-4 hover:text-[var(--calcout-dark)] transition-colors duration-300">Blogs</Link></li>
            <li><Link href="/labs" className="py-2 px-4 hover:text-[var(--calcout-dark)] transition-colors duration-300">Labs</Link></li>
            <li><Link href="/cv" className="py-2 px-4 hover:text-[var(--calcout-dark)] transition-colors duration-300">CV</Link></li>
            <li><Link href="/book" className="py-2 px-4 border-2 border-callout rounded-md hover:bg-callout hover:text-white transition-colors duration-300">Book a Call</Link></li>
        </ul>
    )
}

import { useLightbulb } from '@/components/utilities/shared/useLightbulb';

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
            <nav className={`px-5 fixed top-0 left-0 mx-auto w-full z-50 flex justify-center transition-all duration-300 ${scrolled || isOpen ? 'bg-background opacity-75 backdrop-blur-sm' : 'bg-transparent'}`}>
                <div className="container flex-wrap flex items-center justify-between relative">
                    <Link href="/">
                        <Icon name={isLightOn ? "logo-black" : "logo"} classes="w-16 h-15" />
                    </Link>
                    <Icon
                        name={isLightOn ? 'light-bulb-on' : 'light-bulb'}
                        classes="absolute top-0 left-1/2 -translate-x-1/2 w-[160px] md:left-1/9 md:translate-x-0 h-[150px] md:w-[170px] md:h-[160px] lg:w-[210px] lg:h-[190px] cursor-pointer"
                        onClick={() => { toggleLight(); play() }}
                    />
                    <NavLinks className="hidden lg:flex lg:flex-row lg:gap-7 font-bold" />

                    <Icon name={isOpen ? 'menu-close' : 'menu'} classes={`w-10 h-10 lg:hidden cursor-pointer`} color="var(--foreground-dark)" onClick={toggleMenu} />


                    {isOpen &&
                        <NavLinks className="flex lg:hidden flex-col mt-7 w-full gap-5 items-center font-bold z-100" />
                    }
                </div>

            </nav>

        </>
    )
}