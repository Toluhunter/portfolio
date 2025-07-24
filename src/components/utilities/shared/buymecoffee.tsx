import { SiBuymeacoffee as BuyMeACoffeeIcon } from "react-icons/si";

export const BuyMeACoffee = () => {
    return (
        <div className="fixed bottom-10 right-10 z-50">
            <button
                className="
            bg-callout hover:bg-yellow-600
            text-white font-bold
            p-4 rounded-full shadow-lg
            flex items-center justify-center
            w-16 h-16
            transition-all duration-300 ease-in-out
            transform hover:scale-105
            focus:outline-none focus:ring-4 focus:ring-yellow-300 focus:ring-opacity-75
            group
          "
                aria-label="Buy me a coffee"
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