'use client'
import React from "react";
import Typewriter from "typewriter-effect";

const Type = () => {
    return (
        <Typewriter
            options={{
                strings: [
                    "Cloud Engineer",
                    "Freelancer",
                    "Bug Bounty Hunter",
                    "DevOps Engineer",
                    "AI/ML Engineer",
                ],
                autoStart: true,
                loop: true,
                deleteSpeed: 50,

            }}
        />
    );
}

export default Type;