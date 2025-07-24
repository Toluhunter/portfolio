import "./globals.css";
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Tolulope Fakoya - Portfolio',
  description: 'Welcome to my portfolio! Explore my projects, skills, and experiences in software development.',
  icons: {
    icon: '/logo.svg', // Path relative to the public directory
    // You can add other icon formats here for better compatibility
    // icon: [
    //   { url: '/favicon.ico' }, // For traditional support
    //   { url: '/icon.png', type: 'image/png' }, // For fallback
    // ],
    // apple: '/apple-icon.png', // For iOS devices
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="p-0 m-0 relative"
      >

        {children}
      </body>
    </html>
  );
}
