// src/components/AudioProvider.tsx
'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import useSound from 'use-sound';
import { HiOutlineSpeakerWave, HiOutlineSpeakerXMark } from "react-icons/hi2";

// --- 1. Context Setup ---
interface AudioContextType {
    isSoundOn: boolean;
    toggleSound: () => void;
    // This function is for other components to use to see if the context is unlocked
    isAudioContextUnlocked: boolean;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

// Hook to easily consume the context
export const useAudio = () => {
    const context = useContext(AudioContext);
    if (context === undefined) {
        throw new Error('useAudio must be used within an AudioProvider');
    }
    return context;
};

// You will need to create a very short (e.g., 50ms), silent .mp3 file
const SILENT_SFX_PATH = '/sounds/silent.mp3';

// --- 3. Audio Provider Component ---
export function AudioProvider({ children }: { children: React.ReactNode }) {
    const [isSoundOn, setIsSoundOn] = useState(false); // Mute ON by default
    const [isAudioContextUnlocked, setIsAudioContextUnlocked] = useState(false);

    // Setup the silent sound hook
    const [playSilent] = useSound(SILENT_SFX_PATH, { volume: 0 });

    // Function to be called on any initial click to unlock the context
    const unlockAudioContext = () => {
        if (!isAudioContextUnlocked) {
            // 🚀 The key step: attempt to play a silent sound on the first interaction
            playSilent();
            setIsAudioContextUnlocked(true);
            // Since we want the sound OFF by default, we don't change isSoundOn here
        }
    };

    // Attach the global unlocker to the document on mount
    useEffect(() => {
        // Only listen if the context hasn't been unlocked yet
        if (!isAudioContextUnlocked) {
            document.addEventListener('mousedown', unlockAudioContext, { once: true });
            document.addEventListener('touchstart', unlockAudioContext, { once: true });
        }

        return () => {
            document.removeEventListener('mousedown', unlockAudioContext);
            document.removeEventListener('touchstart', unlockAudioContext);
        };
    }, [isAudioContextUnlocked]);


    const toggleSound = () => {
        // If attempting to unmute, make sure the context is unlocked first
        if (!isSoundOn && !isAudioContextUnlocked) {
            unlockAudioContext();
        }
        setIsSoundOn(prev => !prev);
    };

    const value = { isSoundOn, toggleSound, isAudioContextUnlocked };

    return (
        <AudioContext.Provider value={value}>
            {children}
            <AudioToggleButton /> {/* Render the button inside the provider */}
        </AudioContext.Provider>
    );
}

// --- 4. The Toggle Button Component (Absolute Position) ---
const AudioToggleButton = () => {
    const { isSoundOn, toggleSound } = useAudio();

    return (
        <button
            onClick={toggleSound}
            className={`
        fixed bottom-10 left-10 z-50 
        p-3 rounded-full 
        text-white transition-colors duration-200 
        ${isSoundOn ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-700 hover:bg-gray-800'}
        focus:outline-none focus:ring-4 focus:ring-gray-300
      `}
            aria-label={isSoundOn ? "Turn sound off" : "Turn sound on"}
        >
            {/* Mute icon (VolumeX) by default */}
            {isSoundOn ?
                <HiOutlineSpeakerWave className="w-6 h-6" /> :
                <HiOutlineSpeakerXMark className="w-6 h-6" />
            }
        </button>
    );
};