"use client";
import Image from "next/image";

const HobbiesSection = () => {
    const hobbies = [
        {
            name: "Anime",
            image: "https://assets.toluhunter.com/about/anime.jpg",
        },
        {
            name: "Gaming",
            image: "https://assets.toluhunter.com/about/Gamer.jpg",
        },
        {
            name: "Home Labbing",
            image: "https://assets.toluhunter.com/about/homelab.jpg",
        },
        {
            name: "CTF/Hacking",
            image: "https://assets.toluhunter.com/about/CTF.jpg",
        },
    ];

    return (
        <>
            <h1 className="flex w-full justify-center text-foreground font-bold text-3xl">My Hobbies</h1>
            <div className="w-full pt-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                {hobbies.map((hobby) => (
                    <div key={hobby.name} className="flex flex-col items-center">
                        <div className="w-full h-96 relative rounded-lg overflow-hidden">
                            <Image
                                src={hobby.image}
                                alt={hobby.name}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                        <h2 className="text-foreground font-semibold text-xl mt-4">{hobby.name}</h2>
                    </div>
                ))}
            </div>
        </>
    )
};

export default HobbiesSection;
