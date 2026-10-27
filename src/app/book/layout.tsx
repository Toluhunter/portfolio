import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact',
    description: "Book a free 30 minute call or send an email about the system you are building.",
    openGraph: {
        title: 'Contact | Tolulope Fakoya',
        description: "Book a free 30 minute call or send an email about the system you are building.",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}