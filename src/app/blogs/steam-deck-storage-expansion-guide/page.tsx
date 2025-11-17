"use client";

import { useMDXComponents } from "../../../../mdx-components";
import Content from "./content.mdx";
import YouTube from '@/components/utilities/markdown/Youtube';
import { NavBar } from "@/components/utilities/shared/navbar";
import { Footer } from "@/components/pages/landing/footer";
import { BuyMeACoffee } from "@/components/utilities/shared/buymecoffee";
import type { Metadata } from 'next';

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

export default function MDXPage() {
  const components = {
    YouTube,
    NavBar,
    Footer,
    BuyMeACoffee,
  };

  return <Content components={useMDXComponents(components)} />;
}
