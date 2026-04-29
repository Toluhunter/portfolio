import { FaArrowRight as ArrowRight } from "react-icons/fa";

export const Title = ({ text, link, hasMore }: { text: string; link?: string, hasMore?: boolean }) => {
    return (
        <div className="flex w-full text-xl md:text-4xl px-5 gap-5 mt-4 mb-8 md:mb-10 flex-row items-center justify-center text-foreground"> {/* Using text-gray-100 for foreground */}
            <span className="whitespace-nowrap"><span className="text-callout">#</span>{text}</span> {/* Using custom class for callout, added whitespace-nowrap */}
            <div className="flex w-full flex-row gap-10 md:gap-30 xl:gap-40 items-center">
                <div className="flex w-full h-1 bg-callout"></div> {/* Using direct hex for bg-callout */}
                {hasMore && (
                    link ? (
                        <a href={link} className="flex no-wrap flex-row text-xl items-center text-foreground hover:text-callout transition-colors duration-300">
                            <span className="w-full whitespace-nowrap mr-2">View all</span><ArrowRight size={20} className="ml-2" />
                        </a>
                    ) : (
                        <span className="flex flex-row text-base md:text-xl">View all</span>
                    )
                )}
            </div>
        </div>
    )
}
