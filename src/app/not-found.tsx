'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function NotFound() {
    const pathname = usePathname();

    return (
        <main className="min-h-screen flex flex-col items-center justify-center px-5">
            <div className="flex flex-col gap-3 font-fira-code">
                <p className="text-lg text-foreground">
                    <span className="text-callout">toluhunter</span>
                    <span className="text-foreground/60">@site</span>
                    <span className="text-foreground/60">:</span>
                    <span className="text-callout">~</span>
                    <span className="text-foreground">$ </span>
                    cd {pathname}
                </p>
                <p className="text-lg text-foreground/60">
                    bash: cd: {pathname}: No such file or directory
                </p>
                <p className="text-lg text-foreground">
                    <span className="text-callout">toluhunter</span>
                    <span className="text-foreground/60">@site</span>
                    <span className="text-foreground/60">:</span>
                    <span className="text-callout">~</span>
                    <span className="text-foreground">$ _</span>
                </p>

                <p className="text-sm text-foreground/50 mt-4">
                    The page you are looking for does not exist.
                </p>

                <Link
                    href="/"
                    className="mt-2 px-5 py-2 text-base border-2 border-callout rounded-md hover:bg-callout hover:text-on-callout transition-colors duration-300 text-foreground w-fit"
                >
                    Go home
                </Link>
            </div>
        </main>
    );
}