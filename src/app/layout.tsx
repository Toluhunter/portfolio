import "./globals.css";
import type { Metadata } from 'next';
import { Monda } from 'next/font/google';
import ThemeWrapper from '@/components/utilities/shared/ThemeWrapper';
import { AudioProvider } from "@/components/utilities/shared/audio";
import { AITerminal } from "@/components/utilities/shared/ai-terminal";
import { BuyMeACoffee } from "@/components/utilities/shared/buymecoffee";
import Script from "next/script";

const monda = Monda({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-monda',
  display: 'swap',
});

import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  metadataBase: new URL('https://toluhunter.com'),
  title: {
    default: 'Tolulope Fakoya',
    template: '%s | Tolulope Fakoya',
  },
  description: 'Cloud and AI Engineer who believes a product does not truly exist until it is in the hands of its users. I design the infrastructure that gets it there.',
  icons: {
    icon: '/logo.svg',
  },
  openGraph: {
    type: 'website',
    siteName: 'Tolulope Fakoya',
    images: [{ url: 'https://assets.toluhunter.com/meta/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['https://assets.toluhunter.com/meta/og-image.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <head>

        <Script async src="https://www.googletagmanager.com/gtag/js?id=G-6WMS15MTQ9"></Script>
        <Script id="google-analytics">
          {`window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-6WMS15MTQ9');`}
        </Script>

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              {
                '@context': 'https://schema.org',
                '@type': 'Person',
                name: 'Tolulope Fakoya',
                url: 'https://toluhunter.com',
                image: 'https://assets.toluhunter.com/about/pic.webp',
                jobTitle: 'Cloud and AI Engineer',
                description: 'Cloud and AI Engineer specializing in AWS architecture, MLOps, and security-first infrastructure.',
                sameAs: [
                  'https://github.com/toluhunter',
                  'https://www.linkedin.com/in/tolulope-fakoya/',
                ],
                knowsAbout: [
                  'AWS Architecture',
                  'MLOps',
                  'Cloud Security',
                  'Infrastructure as Code',
                  'Solution Architecture',
                  'Terraform',
                  'AI/ML Systems',
                  'DevOps',
                ],
              },
              {
                '@context': 'https://schema.org',
                '@type': 'WebSite',
                name: 'Tolulope Fakoya',
                url: 'https://toluhunter.com',
              },
            ]),
          }}
        />

      </head>
      <body
        className={`${monda.variable} p-0 m-0 relative`}
        style={{ fontFamily: 'var(--font-monda), sans-serif' }}
      >
        <AudioProvider>
          <ThemeWrapper>
            <div className="lava-container" aria-hidden="true">
              <div className="lava-blob lava-blob-1" />
              <div className="lava-blob lava-blob-2" />
              <div className="lava-blob lava-blob-3" />
            </div>
            <Toaster />
            <div className="relative z-[1]">
              {children}
            </div>
            <BuyMeACoffee />
            <AITerminal />
          </ThemeWrapper>
        </AudioProvider>
      </body>
    </html>
  );
}