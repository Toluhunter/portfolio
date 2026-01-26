'use client';

import { SafeImage } from './SafeImage';

interface CommentAuthorImageProps {
    src: string;
    alt: string;
}

export const CommentAuthorImage = ({ src, alt }: CommentAuthorImageProps) => {
    return <SafeImage src={src} alt={alt} className="w-8 h-8 rounded-full object-cover" fallbackSrc="/favicon.ico" />;
};
