'use client'

import Icon from "@/components/utilities/shared/icon"
import { FaBars, FaTimes } from "react-icons/fa";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useSound from "use-sound";
import { useAudio } from "./audio";
import { useState, useEffect } from "react";

const links = [
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/experience", label: "Experience" },
    { href: "/articles", label: "Articles" },
];

const NavLinks = ({ className }: { className?: string }) => {
    const pathname = usePathname();
    return (
        <ul className={className}>
            {links.map(({ href, label }) => {
                const active = pathname === href || pathname.startsWith(`${href}/`);
                return (
                    <li key={href}>
                        <Link
                            href={href}
                            aria-current={active ? "page" : undefined}
                            className={`py-2 px-4 transition-colors duration-200 hover:text-callout ${active ? "text-callout" : ""}`}
                        >
                            {label}
                        </Link>
                    </li>
                );
            })}
            <li><Link href="/book" className="inline-block py-2 px-4 rounded-md bg-callout-fill text-on-callout hover:opacity-90 transition-opacity duration-200">Book a Call</Link></li>
        </ul>
    )
}

import { useLightbulb } from '@/components/utilities/shared/useLightbulb';
import { LightPullCord } from '@/components/utilities/shared/lightPullCord';

export const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { isLightOn, toggleLight, choice, setChoice } = useLightbulb();
    const { isSoundOn } = useAudio();
    const [play] = useSound("https://assets.toluhunter.com/sounds/light-switch.mp3", { volume: 1, soundEnabled: isSoundOn });

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        // A 1px sentinel at the top of the page: once it leaves the viewport, the page has scrolled.
        const sentinel = document.createElement('div');
        sentinel.setAttribute('aria-hidden', 'true');
        sentinel.style.cssText = 'position:absolute;top:0;left:0;width:1px;height:1px;pointer-events:none;';
        document.body.prepend(sentinel);
        const observer = new IntersectionObserver(([entry]) => setScrolled(!entry.isIntersecting));
        observer.observe(sentinel);
        return () => {
            observer.disconnect();
            sentinel.remove();
        };
    }, []);

    return (
        <>
            <nav className={`px-5 fixed top-0 left-0 mx-auto w-full z-50 flex justify-center transition-all duration-300 bg-background ${scrolled ? 'shadow-sm' : ''} ${isOpen ? 'pb-6' : ''}`}>
                <div className="container flex-wrap flex items-center justify-between relative">
                    <Link href="/" aria-label="Home">
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
                        {/* The cord makes an explicit choice. This is the way back to
                            following the device, and it only exists while a choice is set. */}
                        {choice !== 'system' && (
                            <button
                                type="button"
                                onClick={() => setChoice('system')}
                                title="Follow this device's theme again"
                                className="absolute top-4 right-0 whitespace-nowrap font-mono text-[10px] leading-none text-faint underline underline-offset-2 transition-colors hover:text-callout cursor-pointer"
                            >
                                follow device
                            </button>
                        )}
                    </div>
                    <NavLinks className="hidden lg:flex lg:flex-row lg:items-center lg:gap-5 font-bold" />

                    <button
                        type="button"
                        onClick={toggleMenu}
                        aria-label={isOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isOpen}
                        className="lg:hidden cursor-pointer text-foreground relative w-11 h-11"
                    >
                        <FaBars size={22} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0 scale-50 rotate-45' : 'opacity-100 scale-100 rotate-0'}`} />
                        <FaTimes size={22} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-45'}`} />
                    </button>


                    {isOpen &&
                        <NavLinks className="flex lg:hidden flex-col mt-7 w-full gap-5 items-center font-bold z-100" />
                    }
                </div>

            </nav>
            {/* Skip-link target: the first thing after the navigation */}
            <span id="main" tabIndex={-1} className="block outline-none" />
        </>
    )
}