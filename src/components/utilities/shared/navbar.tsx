'use client'

import Icon from "@/components/utilities/shared/icon"
import { useState } from "react";
import { useMediaQuery } from 'react-responsive'
import { motion } from 'framer-motion';

const NavLinks = ({ className }: { className?: string }) => {
    return (
        <ul className={className}>
            <li><a href="#" className="text-white py-2 px-4">About</a></li>
            <li><a href="#" className="text-white py-2 px-4">Blogs</a></li>
            <li><a href="#" className="text-white py-2 px-4">Projects</a></li>
            <li><a href="#" className="text-white py-2 px-4">Labs</a></li>
            <li><a href="#" className="text-white py-2 px-4">Skills</a></li>
            <li><a href="#" className="text-white py-2 px-4">CV</a></li>
            <li><a href="#" className="text-white py-2 px-4">Contact</a></li>
        </ul>
    )
}

export const NavBar = () => {

    const isMobile = useMediaQuery({ query: '(max-width: 768px)' })
    const isTable = useMediaQuery({ query: '(max-width: 1024px)' })
    const isDesktop = useMediaQuery({ query: '(min-width: 1024px)' })


    const [isOpen, setIsOpen] = useState(false);
    const toggleMenu = () => {
        setIsOpen(!isOpen);
    }

    return (
        <>
            <nav className="px-5 fixed bg-[rgba(255, 255, 255, 0.47)] top-0 left-0 mx-auto w-full z-100 flex justify-center">
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