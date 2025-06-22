'use client'

import Icon from "@/components/utilities/shared/icon"
import { useState, useEffect } from "react";

const NavLinks = ({ className }: { className?: string }) => {
    return (
        <ul className={className}>
            <ul className={className}>
                <li><a href="#" className="text-white py-2 px-4 hover:text-[#804F94] transition-colors duration-300">About</a></li>
                <li><a href="#" className="text-white py-2 px-4 hover:text-[#804F94] transition-colors duration-300">Blogs</a></li>
                <li><a href="#" className="text-white py-2 px-4 hover:text-[#804F94] transition-colors duration-300">Projects</a></li>
                <li><a href="#" className="text-white py-2 px-4 hover:text-[#804F94] transition-colors duration-300">Labs</a></li>
                <li><a href="#" className="text-white py-2 px-4 hover:text-[#804F94] transition-colors duration-300">Skills</a></li>
                <li><a href="#" className="text-white py-2 px-4 hover:text-[#804F94] transition-colors duration-300">CV</a></li>
                <li><a href="#" className="text-white py-2 px-4 hover:text-[#804F94] transition-colors duration-300">Contact</a></li>
            </ul>
        </ul>
    )
}

export const NavBar = () => {

    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

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

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <nav className={`px-5 fixed top-0 left-0 mx-auto w-full z-50 flex justify-center transition-all duration-300 ${scrolled ? 'bg-[rgba(17,24,39,0.7)] backdrop-blur-sm' : 'bg-transparent'}`}>
                <div className="container flex-wrap flex items-center justify-between relative">
                    <Icon name="logo" classes="w-16 h-15" />
                    <Icon
                        name="light-bulb"
                        classes="absolute top-0 left-1/2 -translate-x-1/2 w-[160px] md:left-1/9 md:translate-x-0 h-[150px] md:w-[170px] md:h-[160px] lg:w-[210px] lg:h-[190px]"
                    />
                    <NavLinks className="hidden md:flex md:flex-row lg:gap-10 font-bold" />

                    <Icon name={isOpen ? 'menu-close' : 'menu'} classes={`w-10 h-10 md:hidden`} color="white" onClick={toggleMenu} />


                    {isOpen &&
                        <NavLinks className="flex md:hidden flex-col w-full gap-5 items-center font-bold z-100" />
                    }
                </div>

            </nav>

        </>
    )
}