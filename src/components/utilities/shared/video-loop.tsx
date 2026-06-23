interface VideoLoopProps {
    src: string
}

export function VideoLoop({ src }: VideoLoopProps) {
    return (
        <div className="my-6 overflow-hidden rounded-lg">
            <video
                src={src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full"
            />
        </div>
    )
}
