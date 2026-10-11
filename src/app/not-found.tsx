'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { btnPrimary } from '@/components/utilities/shared/ui';

export default function NotFound() {
    const pathname = usePathname();

    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-5">
            <div className="flex flex-col gap-3 font-fira-code">
                <p className="text-lg text-foreground">
                    <span className="text-callout">toluhunter</span>
                    <span className="text-faint">@site:</span>
                    <span className="text-callout">~</span>
                    <span className="text-foreground">$ </span>
                    cd {pathname}
                </p>
                <p className="text-lg text-muted">
                    bash: cd: {pathname}: No such file or directory
                </p>
                <p className="text-lg text-foreground">
                    <span className="text-callout">toluhunter</span>
                    <span className="text-faint">@site:</span>
                    <span className="text-callout">~</span>
                    <span className="text-foreground">$ _</span>
                </p>

                <p className="text-base text-muted mt-4">
                    The page you are looking for does not exist.
                </p>

                <Link
                    href="/"
                    className={`${btnPrimary} mt-2`}
                >
                    Go home
                </Link>
            </div>
        </main>
    );
}