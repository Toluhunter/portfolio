import { SiBuymeacoffee as BuyMeACoffeeIcon } from "react-icons/si";
import useSound from "use-sound";
import { useAudio } from './audio';

export const BuyMeACoffee = () => {
    const { isSoundOn } = useAudio();
    const [coinshakeplay] = useSound("https://assets.toluhunter.com/sounds/coinshake.mp3", { volume: 0.5, soundEnabled: isSoundOn });
    const [play, { stop }] = useSound("/spare-change.mp3", { volume: 1, soundEnabled: isSoundOn });

    return (
        <div className="fixed bottom-10 right-10 z-50">
            <button
                className="
            bg-callout hover:bg-yellow-600
            text-on-callout font-bold
            p-4 rounded-full shadow-lg
            flex items-center justify-center
            w-16 h-16
            transition-all duration-300 ease-in-out
            transform hover:scale-105
            focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-75
            cursor-pointer group
          "
                aria-label="Buy me a coffee"
                onMouseEnter={() => { coinshakeplay(); play() }}
                onTouchStart={() => play()}
                onMouseLeave={() => stop()}
                onTouchEnd={() => stop()}
            >
                {/* Coffee icon using inline SVG for simplicity and customization */}
                <a
                    href="https://buymeacoffee.com/toluhunter"
                    target="_blank"
                >
                    <BuyMeACoffeeIcon className="w-8 h-8 group-hover:animate-bounce" />
                </a>
            </button>
        </div>

    )
}