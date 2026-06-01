import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'CV',
    description: 'The full background of Tolulope Fakoya - Cloud and AI Engineer, AWS certified, MLOps practitioner.',
    openGraph: {
        title: 'CV | Tolulope Fakoya',
        description: 'The full background of Tolulope Fakoya - Cloud and AI Engineer, AWS certified, MLOps practitioner.',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}