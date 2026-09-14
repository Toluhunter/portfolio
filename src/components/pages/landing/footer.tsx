import { FaGithub as Github, FaTwitter as Twitter, FaLinkedin as Linkedin } from "react-icons/fa";
import Link from "next/link";

export const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-background py-1 text-center text-foreground text-[10px] md:text-xs border-t border-gray-700 absolute bottom-0 left-0">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                <p>&copy; {new Date().getFullYear()} Tolulope Fakoya (Toluhunter). All rights reserved.</p>
                <div className="flex items-center space-x-4">
                    <Link href="/products" className="text-foreground hover:text-foreground transition-colors duration-300">
                        Products
                    </Link>
                    <Link href="/articles" className="text-foreground hover:text-foreground transition-colors duration-300">
                        Articles
                    </Link>
                    <Link href="/cv" className="text-foreground hover:text-foreground transition-colors duration-300">
                        CV
                    </Link>
                    <a href="https://github.com/Toluhunter" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-foreground transition-colors duration-300">
                        <Github size={15} />
                    </a>
                    <a href="https://x.com/tolu_hunter" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-foreground transition-colors duration-300">
                        <Twitter size={15} />
                    </a>
                    <a href="https://www.linkedin.com/in/tolulope-fakoya/" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-foreground transition-colors duration-300">
                        <Linkedin size={15} />
                    </a>
                </div>
            </div>
        </footer>
    );
};