import { Github, Twitter, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
    return (
        <footer className="w-full bg-gray-900 py-1 mt-20 text-center text-gray-400 text-[10px] md:text-xs border-t border-gray-700">
            <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
                <p>&copy; {new Date().getFullYear()} Tolulope Fakoya (Toluhunter). All rights reserved.</p>
                <div className="flex space-x-4">
                    <a href="https://github.com/Toluhunter" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#804F94] transition-colors duration-300">
                        <Github size={15} />
                    </a>
                    <a href="https://x.com/tolu_hunter" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#804F94] transition-colors duration-300">
                        <Twitter size={15} />
                    </a>
                    <a href="https://www.linkedin.com/in/tolulope-fakoya/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-[#804F94] transition-colors duration-300">
                        <Linkedin size={15} />
                    </a>
                </div>
            </div>
        </footer>
    );
};