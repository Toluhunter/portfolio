import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Book a Call',
    description: "Let's design something that fits your needs, budget, and operations. Book a free consultation call.",
    openGraph: {
        title: 'Book a Call | Tolulope Fakoya',
        description: "Let's design something that fits your needs, budget, and operations. Book a free consultation call.",
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}