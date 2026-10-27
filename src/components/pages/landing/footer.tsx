import { FaGithub as Github, FaTwitter as Twitter, FaLinkedin as Linkedin } from "react-icons/fa";
import Link from "next/link";

const pages = [
    { href: "/services", label: "Services" },
    { href: "/products", label: "Products" },
    { href: "/articles", label: "Articles" },
    { href: "/experience", label: "Experience" },
    { href: "/cv", label: "CV" },
];

const legal = [
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
];

const socials = [
    { href: "https://github.com/Toluhunter", label: "GitHub", Icon: Github },
    { href: "https://x.com/tolu_hunter", label: "X (Twitter)", Icon: Twitter },
    { href: "https://www.linkedin.com/in/tolulope-fakoya/", label: "LinkedIn", Icon: Linkedin },
];

export const Footer: React.FC = () => {
    // pb-[var(--ai-band)]: the footer grows so the end of the page clears the pinned AI terminal trigger.
    return (
        <footer className="relative w-full border-t border-foreground/10 bg-background text-sm pb-[var(--ai-band)]">
            <div className="container mx-auto px-5 md:px-8 py-8 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted">
                    <p>&copy; {new Date().getFullYear()} Tolulope Fakoya (Toluhunter)</p>
                    {legal.map(({ href, label }) => (
                        <Link key={href} href={href} className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] md:min-w-0 md:min-h-0 hover:text-callout transition-colors duration-200">
                            {label}
                        </Link>
                    ))}
                </div>
                <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-5 gap-y-2">
                    {pages.map(({ href, label }) => (
                        <Link key={href} href={href} className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] md:min-w-0 md:min-h-0 text-muted hover:text-callout transition-colors duration-200">
                            {label}
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center gap-1 md:gap-4">
                    {socials.map(({ href, label, Icon }) => (
                        <a
                            key={href}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={label}
                            className="inline-flex items-center justify-center min-w-[44px] min-h-[44px] md:min-w-0 md:min-h-0 text-muted hover:text-callout transition-colors duration-200"
                        >
                            <Icon size={18} />
                        </a>
                    ))}
                </div>
            </div>
        </footer>
    );
};
