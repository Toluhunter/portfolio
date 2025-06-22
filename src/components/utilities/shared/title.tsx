export const Title = ({ text }: { text: string }) => {
    return (
        <div className="flex text-4xl gap-5 mt-10 flex-row items-center justify-center">
            <span><span className="text-callout">#</span>{text}</span>
            <div className="flex w-full flex-row gap-10 md:gap-30 xl:gap-40 items-center">
                <div className="flex w-5/6 h-1 bg-callout"></div>
                <span className="flex w-1/6 flex-row text-xl">View all</span>
            </div>
        </div>
    )
}
