import { Github, Twitter, Linkedin } from 'lucide-react';
import { Title } from '@/components/utilities/shared/title';

export const ContactMeSection = () => {
    return (
        <section className="relative flex flex-col items-center overflow-hidden">
            <div className="flex flex-col w-full container mx-auto ">
                <Title text="Contact Me" />

                <div className="mt-10 p-8 bg-black text-white rounded-lg shadow-xl border border-gray-700 md:flex md:justify-between md:items-start gap-8">
                    {/* Contact Form */}
                    <form className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-1">
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-300">First Name</label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                className="mt-1 block w-full p-3 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white"
                                placeholder="John"
                            />
                        </div>
                        <div className="md:col-span-1">
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-300">Last Name</label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                className="mt-1 block w-full p-3 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white"
                                placeholder="Doe"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                className="mt-1 block w-full p-3 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white"
                                placeholder="john.doe@example.com"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
                            <textarea
                                id="message"
                                name="message"
                                rows={6}
                                className="mt-1 block w-full p-3 bg-gray-800 border border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white"
                                placeholder="Your message here..."
                            ></textarea>
                        </div>
                        <div className="md:col-span-2 flex flex-col items-end space-y-4"> {/* Adjusted for vertical stacking */}
                            <button
                                type="submit"
                                className="px-6 py-3 bg-[#804F94] text-white font-semibold rounded-md shadow-md hover:bg-purple-700 transition duration-300 ease-in-out"
                            >
                                Send Message
                            </button>
                            {/* Social Media Icons moved here */}
                            <div className="flex space-x-6 mt-4">
                                <a href="https://github.com/Toluhunter" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#804F94] transition-colors duration-300">
                                    <Github size={24} /> {/* Smaller icon size */}
                                </a>
                                <a href="https://x.com/tolu_hunter" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#804F94] transition-colors duration-300">
                                    <Twitter size={24} /> {/* Smaller icon size */}
                                </a>
                                <a href="https://www.linkedin.com/in/tolulope-fakoya/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-[#804F94] transition-colors duration-300">
                                    <Linkedin size={24} /> {/* Smaller icon size */}
                                </a>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};
