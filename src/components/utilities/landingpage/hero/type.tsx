'use client'
import React from "react";
import { useState, useEffect, useCallback, useRef } from "react";

const Type = () => {
    const [text, setText] = useState(''); // The actual, correct text being built/deleted
    const [displayContent, setDisplayContent] = useState(''); // What is actually rendered (can be glitched)
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(150); // Base typing speed

    const professions = React.useMemo(() => [
        "AI & Cloud Engineer",
        "DevOps & MLOps Engineer",
        "Full Stack Developer"
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

    const glitchTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

    // Sets the correct text and what is displayed for it. With a 70% probability a glitched
    // version shows first and reverts to the correct text after 80 milliseconds.
    const showText = useCallback((nextText: string) => {
        clearTimeout(glitchTimer.current);
        setText(nextText);
        if (nextText.length > 0 && Math.random() < 0.7) {
            setDisplayContent(generateGlitchedString(nextText));
            glitchTimer.current = setTimeout(() => setDisplayContent(nextText), 80);
        } else {
            // When text is empty, displayContent is empty too.
            // The visibility will be handled by the className on the span.
            setDisplayContent(nextText);
        }
    }, [generateGlitchedString]);

    // Clear a pending glitch revert on unmount
    useEffect(() => () => clearTimeout(glitchTimer.current), []);

    // Main logic for typing and deleting characters
    const tick = useCallback(() => {
        const i = loopNum % professions.length;
        const fullText = professions[i];

        if (isDeleting) {
            // If deleting, reduce the text length by one character
            const updatedText = fullText.substring(0, text.length - 1);
            showText(updatedText);

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
            showText(updatedText);

            if (updatedText === fullText) {
                // If the word is fully typed, switch to deleting
                setIsDeleting(true);
                setTypingSpeed(1000); // Pause after typing a word
            } else {
                setTypingSpeed(150); // Speed for typing characters
            }
        }
    }, [text, isDeleting, loopNum, professions, showText]);

    // Effect to manage the typing/deleting interval
    // This useEffect schedules the 'tick' function based on 'typingSpeed'
    useEffect(() => {
        const ticker = setTimeout(() => {
            tick();
        }, typingSpeed);

        return () => clearTimeout(ticker); // Cleanup function to clear timeout on unmount or re-render
    }, [tick, typingSpeed]); // Dependencies ensure it re-runs when tick or typingSpeed changes


    return (
        // Conditionally apply 'invisible' class when text is empty.
        // Render a non-breaking space (\u00A0) if displayContent is empty,
        // ensuring the element always occupies space.
        <span className={`min-h-[2.5em] block break-words ${text.length === 0 ? 'invisible' : ''}`} style={{ fontFamily: 'var(--font-gugi), sans-serif' }}>
            {displayContent || '\u00A0'} {/* Render non-breaking space if displayContent is empty */}
        </span>
    );
};

export default Type;