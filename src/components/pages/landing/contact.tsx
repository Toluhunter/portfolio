import { Title } from '@/components/utilities/shared/title';

export const ContactMeSection = () => {
    return (
        <section id="contact" className="relative flex flex-col items-center overflow-hidden py-20">
            <div className="flex flex-col w-full container mx-auto items-center text-center px-4">
                <Title text="Get In Touch" />
                <p className="mt-8 text-lg md:text-xl text-gray-300 max-w-2xl">
                    I&apos;m currently looking for new opportunities, and my inbox is always open.
                    Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
                </p>
                <a
                    href="mailto:toluhunterdev@gmail.com"
                    className="mt-8 px-8 py-3 border-2 border-callout text-white font-bold text-lg rounded-md shadow-lg hover:bg-callout hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                    Let's Talk
                </a>
            </div>
        </section>
    );
};
