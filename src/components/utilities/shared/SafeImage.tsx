'use client';

import { useEffect, useState } from 'react';

interface SafeImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackSrc?: string;
}

export const SafeImage: React.FC<SafeImageProps> = ({ src, fallbackSrc = "/favicon.ico", alt, ...props }) => {
    const [objectUrl, setObjectUrl] = useState<string | null>(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!src) {
            setError(true);
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(false);
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
                        setObjectUrl(createdUrl);
                    }
                } else {
                    // Assuming src is a Blob
                    createdUrl = URL.createObjectURL(src);
                    setObjectUrl(createdUrl);
                }
            } catch (err) {
                if ((err as Error).name !== 'AbortError') {
                    console.error("Failed to fetch image:", err);
                    if (isMounted) {
                        setError(true);
                    }
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
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

    if (!finalSrc) {
        return <img src={fallbackSrc} alt={alt} {...props} />;
    }

    return <img src={finalSrc} alt={alt} {...props} />;
};
