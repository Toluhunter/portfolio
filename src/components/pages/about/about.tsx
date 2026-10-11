"use client";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Reveal } from "@/components/utilities/shared/reveal";
import { CtaPanel, Eyebrow, btnPrimary, card, textLink } from "@/components/utilities/shared/ui";

const principles = [
    {
        title: "Design for your constraints",
        detail: "The best system is built for your budget and your reality, not someone else's scale.",
    },
    {
        title: "Watch everything",
        detail: "Without logs and alerts, things break or get stolen in silence, and you are the last to know.",
    },
    {
        title: "Security from day one",
        detail: "It is a live game between attacker and defender. Bolt it on at the end and you have already lost.",
    },
    {
        title: "Build systems that heal",
        detail: "Systems will fail. What matters is whether yours recovers on its own or waits for a 3am call.",
    },
];

const stats = [
    { value: "5+", label: "Years in cloud and infrastructure" },
    { value: "25+", label: "Cloud migrations delivered" },
    { value: "~25%", label: "Average cost reduction" },
    { value: "AWS", label: "Certified" },
];

export const AboutSection = () => {
    return (
        <section className="relative min-h-screen pt-32 flex flex-col px-5 md:px-8 pb-28 container mx-auto">

            {/* Hero: text + photo */}
            <div className="grid lg:grid-cols-[1fr_24rem] gap-14 lg:gap-20 items-center">
                <div className="flex flex-col gap-6 order-2 lg:order-1">
                    <Eyebrow>about</Eyebrow>
                    <h1 className="text-4xl md:text-5xl xl:text-6xl font-bold text-foreground leading-[1.08] tracking-tight">
                        I design cloud systems that stay up, stay secure, and stay on budget.
                    </h1>
                    <p className="text-lg text-muted leading-relaxed max-w-xl">
                        I&apos;m Tolulope Fakoya, a Cloud and AI Engineer. For 5+ years I have built, secured, and run
                        cloud-native and AI systems, from startup migrations to ML pipelines on SageMaker and Vertex AI.
                    </p>
                    <div className="flex flex-wrap gap-x-6 gap-y-4 items-center mt-2">
                        <Link
                            href="/book"
                            className={btnPrimary}
                        >
                            Book a Free Meeting
                        </Link>
                        <Link href="/experience" className={textLink}>
                            Full background &rarr;
                        </Link>
                        <Link href="/cv" className={textLink}>
                            CV &rarr;
                        </Link>
                    </div>
                    <div className="flex gap-5 items-center text-muted">
                        <Link
                            href="https://github.com/toluhunter"
                            target="_blank"
                            aria-label="GitHub"
                            className="hover:text-foreground transition-colors duration-200"
                        >
                            <FaGithub size={22} />
                        </Link>
                        <Link
                            href="https://www.linkedin.com/in/tolulope-fakoya/"
                            target="_blank"
                            aria-label="LinkedIn"
                            className="hover:text-foreground transition-colors duration-200"
                        >
                            <FaLinkedin size={22} />
                        </Link>
                    </div>
                </div>

                {/* Photo with offset accent frame */}
                <div className="relative w-full max-w-sm mx-auto lg:max-w-none order-1 lg:order-2">
                    <div aria-hidden className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl border-2 border-callout" />
                    <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-panel">
                        <Image
                            src="https://assets.toluhunter.com/about/profile-pic.webp"
                            alt="Tolulope Fakoya"
                            fill
                            sizes="(max-width: 1024px) 24rem, 24rem"
                            priority
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Stats band */}
            <Reveal className="mt-24 md:mt-32">
                <dl className="grid grid-cols-2 md:grid-cols-4 gap-y-10 border-y border-foreground/10 py-10">
                    {stats.map((stat, i) => (
                        <div
                            key={stat.label}
                            className={`flex flex-col gap-2 px-2 md:px-6 ${i > 0 ? "md:border-l md:border-foreground/10" : ""}`}
                        >
                            <dt className="order-2 text-sm text-muted">{stat.label}</dt>
                            <dd className="order-1 font-fira-code text-4xl md:text-5xl font-bold text-callout">{stat.value}</dd>
                        </div>
                    ))}
                </dl>
            </Reveal>

            {/* How I work */}
            <div className="mt-24 md:mt-32 grid lg:grid-cols-[18rem_1fr] gap-10 lg:gap-16">
                <Reveal className="lg:sticky lg:top-28 self-start flex flex-col gap-4">
                    <Eyebrow>how I work</Eyebrow>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground leading-tight tracking-tight">
                        Four rules I don&apos;t bend.
                    </h2>
                </Reveal>
                <div className="grid sm:grid-cols-2 gap-5">
                    {principles.map((principle, i) => (
                        <Reveal key={principle.title} delay={i * 80}>
                            <div className={`${card} h-full flex flex-col gap-3 p-7`}>
                                <h3 className="text-xl md:text-2xl font-bold text-foreground leading-snug">{principle.title}</h3>
                                <p className="text-muted leading-relaxed">{principle.detail}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>

            {/* Closing CTA */}
            <Reveal className="mt-24 md:mt-32">
                <CtaPanel
                    note="Always adapting, like Mahoraga, the divine general."
                    title="Have a project? Let's talk."
                />
            </Reveal>

        </section>
    );
};
