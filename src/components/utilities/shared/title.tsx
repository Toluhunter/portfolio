import { ArrowRight } from 'lucide-react'

export const Title = ({ text, link, hasMore }: { text: string; link?: string, hasMore?: boolean }) => {
    return (
        <div className="flex text-xl md:text-4xl px-5 gap-5 mt-10 flex-row items-center justify-center text-gray-100"> {/* Using text-gray-100 for foreground */}
            <span className="whitespace-nowrap"><span className="text-callout">#</span>{text}</span> {/* Using custom class for callout, added whitespace-nowrap */}
            <div className="flex w-full flex-row gap-10 md:gap-30 xl:gap-40 items-center">
                <div className="flex w-5/6 h-1 bg-[#804F94]"></div> {/* Using direct hex for bg-callout */}
                {hasMore && (
                    link ? (
                        <a href={link} className="flex flex-row text-xl items-center text-gray-100 hover:text-[#804F94] transition-colors duration-300">
                            View all <ArrowRight size={20} className="ml-2" />
                        </a>
                    ) : (
                        <span className="flex w-1/6 flex-row text-base md:text-xl">View all</span>
                    )
                )}
            </div>
        </div>
    )
}
