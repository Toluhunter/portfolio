'use client'
import { useState, useEffect } from 'react';

export const useLightbulb = () => {
    const [isLightOn, setIsLightOn] = useState(false);

    useEffect(() => {
        const storedState = localStorage.getItem('isLightOn');
        if (storedState) {
            const parsedState = JSON.parse(storedState);
            setIsLightOn(parsedState);
            document.body.classList.toggle('dark', !parsedState);
        } else {
            document.body.classList.add('dark');
        }
    }, []);

    const toggleLight = () => {
        const newState = !isLightOn;
        setIsLightOn(newState);
        localStorage.setItem('isLightOn', JSON.stringify(newState));
        document.body.classList.toggle('dark', !newState);
    };

    return { isLightOn, toggleLight };
};