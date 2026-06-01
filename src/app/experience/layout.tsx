import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Experience',
    description: 'A track record across cloud architecture, MLOps, and security-first infrastructure. 25+ migrations, AI pipelines in production, and a dashboard that stays green.',
    openGraph: {
        title: 'Experience | Tolulope Fakoya',
        description: 'A track record across cloud architecture, MLOps, and security-first infrastructure. 25+ migrations, AI pipelines in production, and a dashboard that stays green.',
    },
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}