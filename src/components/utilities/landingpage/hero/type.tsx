'use client'
import React from "react";
import { useState, useEffect, useCallback } from "react";

const Type = () => {
    const [text, setText] = useState(''); // The actual, correct text being built/deleted
    const [displayContent, setDisplayContent] = useState(''); // What is actually rendered (can be glitched)
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150); // Base typing speed

    const professions = React.useMemo(() => [
        "Cloud Engineer",
        "Freelancer",
        "Bug Bounty Hunter",
        "DevOps Engineer",
        "AI/ML Engineer",
    ], []);

    // Helper function to generate a random glitched character
    const generateGlitchedChar = () => {
        const chars = "!@#$%^&🧑‍💻*()_+=-[]🤞{}|;:',.🕵️<>/?`~"; // Common special characters
        return chars[Math.floor(Math.random() * chars.length)];
    };

    // Helper function to generate a glitched version of a string
    const generateGlitchedString = useCallback((baseString: string) => {
        let glitched = '';
        for (let i = 0; i < baseString.length; i++) {
            // 40% chance to replace a character with a glitch character
            if (Math.random() < 0.4) {
                glitched += generateGlitchedChar();
            } else {
                glitched += baseString[i];
            }
        }
        return glitched;
    }, []);

    // Main logic for typing and deleting characters
    const tick = useCallback(() => {
        const i = loopNum % professions.length;
        const fullText = professions[i];

        if (isDeleting) {
            // If deleting, reduce the text length by one character
            const updatedText = fullText.substring(0, text.length - 1);
            setText(updatedText);

            if (updatedText === '') {
                // If the word is fully deleted, switch to typing the next word
                setIsDeleting(false);
                setLoopNum(prevLoopNum => (prevLoopNum + 1) % professions.length); // Move to next word in the array
                setTypingSpeed(500); // Pause briefly before starting the next word
            } else {
                setTypingSpeed(70); // Speed for deleting characters
            }
        } else {
            // If typing, increase the text length by one character
            const updatedText = fullText.substring(0, text.length + 1);
            setText(updatedText);

            if (updatedText === fullText) {
                // If the word is fully typed, switch to deleting
                setIsDeleting(true);
                setTypingSpeed(1000); // Pause after typing a word
            } else {
                setTypingSpeed(150); // Speed for typing characters
            }
        }
    }, [text, isDeleting, loopNum, professions]);

    // Effect to manage the typing/deleting interval
    // This useEffect schedules the 'tick' function based on 'typingSpeed'
    useEffect(() => {
        const ticker = setTimeout(() => {
            tick();
        }, typingSpeed);

        return () => clearTimeout(ticker); // Cleanup function to clear timeout on unmount or re-render
    }, [tick, typingSpeed]); // Dependencies ensure it re-runs when tick or typingSpeed changes

    // Effect for applying the visual glitch to the displayed content
    // This runs whenever the 'text' state (the correct typed string) changes
    useEffect(() => {
        let glitchTimer: NodeJS.Timeout;
        if (text.length > 0) {
            // Apply glitch effect with a 70% probability when text updates
            if (Math.random() < 0.7) {
                const glitchedVersion = generateGlitchedString(text);
                setDisplayContent(glitchedVersion); // Show the glitched version
                glitchTimer = setTimeout(() => {
                    setDisplayContent(text); // Revert to the correct text after a short delay
                }, 80); // Glitch duration (80 milliseconds)
            } else {
                setDisplayContent(text); // If no glitch, just show the correct text
            }
        } else {
            // When text is empty, set displayContent to an empty string.
            // The visibility will be handled by the className on the span.
            setDisplayContent('');
        }

        return () => clearTimeout(glitchTimer); // Cleanup function for the glitch timer
    }, [text, generateGlitchedString]); // Re-run this effect whenever the 'text' state or generateGlitchedString changes

    return (
        // Conditionally apply 'invisible' class when text is empty.
        // Render a non-breaking space (\u00A0) if displayContent is empty,
        // ensuring the element always occupies space.
        <span className={`min-h-[1.5em] inline-block ${text.length === 0 ? 'invisible' : ''}`}>
            {displayContent || '\u00A0'} {/* Render non-breaking space if displayContent is empty */}
        </span>
    );
};

export default Type;