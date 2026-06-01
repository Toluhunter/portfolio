import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Products',
    description: 'Tools and products built by Tolulope Fakoya.',
    openGraph: {
        title: 'Products | Tolulope Fakoya',
        description: 'Tools and products built by Tolulope Fakoya.',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}