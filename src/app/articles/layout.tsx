import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Articles',
    description: 'Thoughts on cloud architecture, engineering, and the craft of building systems that hold up.',
    openGraph: {
        title: 'Articles | Tolulope Fakoya',
        description: 'Thoughts on cloud architecture, engineering, and the craft of building systems that hold up.',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}