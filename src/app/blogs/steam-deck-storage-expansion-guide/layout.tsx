
import type { Metadata } from 'next';
import MDXPage from './page';

export const metadata: Metadata = {
    title: 'How to Expand Steam Deck Storage with an SD Card: The Ultimate Guide for Game & Desktop Mode',
    description: 'Running out of space on your Steam Deck? You’re not alone. Between AAA titles and system updates, even the 512 GB model can fill up quickly. Thankfully, expanding your Deck’s storage is simple, all you need is a good SD card.',
    openGraph: {
        title: 'How to Expand Steam Deck Storage with an SD Card: The Ultimate Guide for Game & Desktop Mode',
        description: 'Running out of space on your Steam Deck? You’re not alone. Between AAA titles and system updates, even the 512 GB model can fill up quickly. Thankfully, expanding your Deck’s storage is simple, all you need is a good SD card.',
        images: [
            {
                url: 'https://assets.toluhunter.com/blogs/steam-deck-storage-expansion-guide/steam-deck.jpg',
                width: 1200,
                height: 630,
                alt: 'Steam Deck with SD Card',
            },
        ],
        type: 'article',
        url: 'https://toluhunter.com/blogs/steam-deck-storage-expansion-guide',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'How to Expand Steam Deck Storage with an SD Card: The Ultimate Guide for Game & Desktop Mode',
        description: 'Running out of space on your Steam Deck? You’re not alone. Between AAA titles and system updates, even the 512 GB model can fill up quickly. Thankfully, expanding your Deck’s storage is simple, all you need is a good SD card.',
        images: ['https://assets.toluhunter.com/blogs/steam-deck-storage-expansion-guide/steam-deck.jpg'],
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <MDXPage>{children}</MDXPage>;
}