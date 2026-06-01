import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About',
    description: '5+ years building, securing, and operating cloud-native and AI-powered systems. Architecture is a craft - and every system is unique to the constraints that shape it.',
    openGraph: {
        title: 'About | Tolulope Fakoya',
        description: '5+ years building, securing, and operating cloud-native and AI-powered systems. Architecture is a craft - and every system is unique to the constraints that shape it.',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}