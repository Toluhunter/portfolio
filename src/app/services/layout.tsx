import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Services',
    description: 'From capacity planning to rate limits and security guardrails - I help you design a system that fits your reality, not someone else\'s.',
    openGraph: {
        title: 'Services | Tolulope Fakoya',
        description: 'From capacity planning to rate limits and security guardrails - I help you design a system that fits your reality, not someone else\'s.',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}