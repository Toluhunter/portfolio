'use client'

import Icon from "@/components/utilities/shared/icon"
import { FaBars, FaTimes } from "react-icons/fa";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useSound from "use-sound";
import { SoundToggle, useAudio } from "./audio";
import { useState, useEffect, useRef } from "react";

const links = [
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/experience", label: "Experience" },
    { href: "/articles", label: "Articles" },
];

const NavLinks = ({ className, id, hidden, onNavigate }: { className?: string; id?: string; hidden?: boolean; onNavigate?: () => void }) => {
    const pathname = usePathname();
    return (
        <ul id={id} hidden={hidden} className={className}>
            {links.map(({ href, label }) => {
                const active = pathname === href || pathname.startsWith(`${href}/`);
                return (
                    <li key={href}>
                        <Link
                            href={href}
                            onClick={onNavigate}
                            aria-current={active ? "page" : undefined}
                            className={`inline-flex items-center min-h-[44px] py-2 px-4 transition-colors duration-200 hover:text-callout ${active ? "text-callout" : ""}`}
                        >
                            {label}
                        </Link>
                    </li>
                );
            })}
            <li><Link href="/book" onClick={onNavigate} className="inline-flex items-center min-h-[44px] py-2 px-4 rounded-md bg-callout-fill text-on-callout hover:opacity-90 transition-opacity duration-200">Book a Call</Link></li>
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
    const navRef = useRef<HTMLElement>(null);
    const menuButtonRef = useRef<HTMLButtonElement>(null);

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

    // Open menu: Escape and outside taps close it, the page behind stops scrolling,
    // and growing past lg closes it so it never sticks open on desktop.
    useEffect(() => {
        if (!isOpen) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsOpen(false);
                menuButtonRef.current?.focus();
            }
        };
        const onPointer = (e: PointerEvent) => {
            if (!navRef.current?.contains(e.target as Node)) setIsOpen(false);
        };
        const desktop = window.matchMedia('(min-width: 1024px)');
        const onDesktop = (e: MediaQueryListEvent) => {
            if (e.matches) setIsOpen(false);
        };
        const root = document.documentElement;
        const previous = root.style.overflow;
        root.style.overflow = 'hidden';
        document.addEventListener('keydown', onKey);
        document.addEventListener('pointerdown', onPointer);
        desktop.addEventListener('change', onDesktop);
        return () => {
            root.style.overflow = previous;
            document.removeEventListener('keydown', onKey);
            document.removeEventListener('pointerdown', onPointer);
            desktop.removeEventListener('change', onDesktop);
        };
    }, [isOpen]);

    return (
        <>
            <nav ref={navRef} className={`px-5 fixed top-0 left-0 mx-auto w-full z-50 flex justify-center transition-all duration-300 bg-background ${scrolled ? 'shadow-sm' : ''} ${isOpen ? 'pb-6' : ''}`}>
                <div className="container flex-wrap flex items-center justify-between relative">
                    <Link href="/" aria-label="Home" onClick={() => setIsOpen(false)}>
                        <Icon name={isLightOn ? "logo-black" : "logo"} classes="w-16 h-15" />
                    </Link>
                    {/* The bulb and its pull cord exist from lg up. Below lg a plain toggle replaces them. */}
                    <div className="hidden lg:block absolute top-0 left-1/9 w-[210px] h-[190px]">
                        <Icon
                            name={isLightOn ? 'light-bulb-on' : 'light-bulb'}
                            classes="w-full h-full"
                        />
                        <LightPullCord
                            onToggle={() => { toggleLight(); play() }}
                            className="absolute top-0 left-[68%] -translate-x-1/2"
                        />
                    </div>
                    <div className="hidden lg:flex items-center gap-2">
                        <NavLinks className="flex flex-row items-center gap-5 font-bold" />
                        <SoundToggle />
                    </div>

                    <div className="flex items-center gap-1 lg:hidden">
                        <SoundToggle />
                        <button
                            type="button"
                            onClick={() => { toggleLight(); play() }}
                            aria-label={isLightOn ? "Switch to dark theme" : "Switch to light theme"}
                            className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] rounded-md text-foreground hover:text-callout transition-colors duration-200 cursor-pointer"
                        >
                            {isLightOn ? <HiOutlineMoon size={22} aria-hidden /> : <HiOutlineSun size={22} aria-hidden />}
                        </button>
                        <button
                            ref={menuButtonRef}
                            type="button"
                            onClick={toggleMenu}
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isOpen}
                            aria-controls="mobile-menu"
                            className="cursor-pointer text-foreground relative min-w-[44px] min-h-[44px]"
                        >
                            <FaBars size={22} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-0 scale-50 rotate-45' : 'opacity-100 scale-100 rotate-0'}`} />
                            <FaTimes size={22} className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-45'}`} />
                        </button>
                    </div>

                    {/* Always in the DOM so aria-controls resolves; the hidden attribute removes it while closed. */}
                    <NavLinks
                        id="mobile-menu"
                        hidden={!isOpen}
                        onNavigate={() => setIsOpen(false)}
                        className="flex lg:hidden flex-col mt-7 w-full gap-5 items-center font-bold max-h-[calc(100dvh-96px)] overflow-y-auto overscroll-contain"
                    />
                </div>

            </nav>
            {/* Skip-link target: the first thing after the navigation */}
            <span id="main" tabIndex={-1} className="block outline-none" />
        </>
    )
}
