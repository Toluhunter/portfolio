import { CtaPanel } from "@/components/utilities/shared/ui";

export const ContactMeSection = () => {
    return (
        <section id="contact" className="py-20 md:py-28">
            <div className="container mx-auto px-5 md:px-8">
                <CtaPanel
                    title="Have a project? Let's talk."
                    body={<>Have a project in mind or not sure where to start? Book a free call and we&apos;ll talk through what you&apos;re building, what problems need solving, and whether I&apos;m the right fit.</>}
                    action={{ href: "/book", label: "Book a Free Call" }}
                    secondary={
                        <a href="mailto:toluhunterdev@gmail.com" className="text-sm text-muted hover:text-callout transition-colors duration-200">
                            or send me an email
                        </a>
                    }
                />
            </div>
        </section>
    );
};
