'use client'

import { SiBuymeacoffee as BuyMeACoffeeIcon } from "react-icons/si";
import useSound from "use-sound";
import { useAudio } from './audio';

export const BuyMeACoffee = () => {
    const { isSoundOn } = useAudio();
    const [coinshakeplay] = useSound("https://assets.toluhunter.com/sounds/coinshake.mp3", { volume: 0.5, soundEnabled: isSoundOn });
    const [play, { stop }] = useSound("/spare-change.mp3", { volume: 1, soundEnabled: isSoundOn });

    // In the page flow on About only: a closing note, not a floating button.
    return (
        <div className="flex items-center justify-center gap-4">
            <p className="text-sm text-muted" style={{ fontFamily: 'var(--font-lobster), cursive' }}>
                Buy me a coffee
            </p>
            <a
                href="https://buymeacoffee.com/toluhunter"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Buy me a coffee"
                onMouseEnter={() => { coinshakeplay(); play() }}
                onTouchStart={() => play()}
                onMouseLeave={() => stop()}
                onTouchEnd={() => stop()}
                className="group inline-flex items-center justify-center min-w-[52px] min-h-[52px] rounded-full bg-callout-fill text-on-callout shadow-lg transition-transform duration-300 hover:scale-105"
            >
                <BuyMeACoffeeIcon className="w-7 h-7 group-hover:animate-bounce" aria-hidden />
            </a>
        </div>
    )
}