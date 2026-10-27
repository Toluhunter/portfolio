'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface SafeImageProps extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'width' | 'height' | 'srcSet'> {
    fallbackSrc?: string;
    // next/image needs a size. The className still sets the rendered size, as it did for <img>.
    width?: number;
    height?: number;
}

// The outcome of loading one src, kept with that src so a new src reads as loading straight away.
interface Loaded {
    src: SafeImageProps['src'];
    objectUrl: string | null;
    error: boolean;
}

export const SafeImage: React.FC<SafeImageProps> = ({ src, fallbackSrc = "/favicon.ico", alt, width = 40, height = 40, loading: imgLoading = "eager", ...props }) => {
    const [loaded, setLoaded] = useState<Loaded | null>(null);
    const current = loaded && loaded.src === src ? loaded : null;
    const objectUrl = current?.objectUrl ?? null;
    const error = !src || (current?.error ?? false);
    const loading = Boolean(src) && !current;

    useEffect(() => {
        if (!src) return;

        let isMounted = true;
        const controller = new AbortController();
        const signal = controller.signal;
        let createdUrl: string | null = null;

        const processSrc = async () => {
            try {
                if (typeof src === 'string') {
                    const response = await fetch(src, { signal, referrerPolicy: 'no-referrer' });
                    if (!response.ok) {
                        throw new Error('Image fetch failed');
                    }
                    const blob = await response.blob();
                    if (isMounted) {
                        createdUrl = URL.createObjectURL(blob);
                        setLoaded({ src, objectUrl: createdUrl, error: false });
                    }
                } else {
                    // Assuming src is a Blob
                    createdUrl = URL.createObjectURL(src);
                    setLoaded({ src, objectUrl: createdUrl, error: false });
                }
            } catch (err) {
                if ((err as Error).name !== 'AbortError') {
                    console.error("Failed to fetch image:", err);
                    if (isMounted) {
                        setLoaded({ src, objectUrl: null, error: true });
                    }
                }
            }
        };

        processSrc();

        return () => {
            isMounted = false;
            controller.abort();
            if (createdUrl) {
                URL.revokeObjectURL(createdUrl);
            }
        };
    }, [src]);

    const finalSrc = error ? fallbackSrc : objectUrl;

    if (loading) {
        // Optional: render a skeleton/placeholder while loading
        return <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />;
    }

    // unoptimized: the src is a blob: URL or an arbitrary external address, so it is used as is.
    return (
        <Image
            src={finalSrc || fallbackSrc}
            alt={alt ?? ""}
            width={width}
            height={height}
            loading={imgLoading}
            unoptimized
            {...props}
        />
    );
};
