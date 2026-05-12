import Link from "next/link";

export const ContactMeSection = () => {
    return (
        <section id="contact" className="relative flex flex-col items-center overflow-hidden py-20">
            <div className="flex flex-col w-full container mx-auto items-center text-center px-4">
                <div className="flex w-full text-xl md:text-4xl px-5 gap-5 mt-10 flex-row items-center justify-center text-foreground">
                    <span className="whitespace-nowrap"><span className="text-foreground">#</span>Get In Touch</span>
                </div>
                <p className="mt-8 text-lg md:text-xl text-foreground max-w-2xl">
                    Have a project in mind or not sure where to start? Book a free call and we&apos;ll talk through
                    what you&apos;re building, what problems need solving, and whether I&apos;m the right fit.
                </p>
                <Link
                    href="/book"
                    className="mt-8 px-8 py-3 border-2 border-callout text-foreground font-bold text-lg rounded-md shadow-lg hover:bg-callout hover:text-on-callout transition-all duration-300 ease-in-out transform hover:scale-105"
                >
                    Book a Free Call
                </Link>
                <a
                    href="mailto:toluhunterdev@gmail.com"
                    className="mt-4 text-sm text-foreground/80 hover:text-foreground transition-colors duration-200"
                >
                    or send me an email
                </a>
            </div>
        </section>
    );
};
