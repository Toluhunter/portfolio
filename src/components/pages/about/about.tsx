"use client";
import Image from "next/image";
import Link from "next/link";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { status } from "@/data/content.json";

const principles = [
    "Your constraints are the design. Scale ambitions mean nothing without a budget to match - the best system is the one built for your reality, not someone else's.",
    "An unmonitored system is an open vault. Without logs and alerts, anything can be stolen, modified, or broken in silence - and you will be the last to know.",
    "Security is a live game between attacker and defender. Bolt it on at the end and you have already lost.",
    "Systems fail - that is not the question. The question is whether your system recovers on its own or waits for a phone call at 3am.",
];

const proofPoints = [
    "5+ years",
    "25+ cloud migrations",
    "AI pipelines in production",
    "AWS-certified",
];

export const AboutSection = () => {
    return (
        <section className="min-h-screen pt-25 flex flex-col gap-24 px-5 md:px-8 pb-28 max-w-7xl mx-auto">

            {/* Hero: text + photo */}
            <div className="flex flex-col-reverse lg:flex-row gap-12 lg:gap-16 items-start lg:items-center lg:justify-between">
                <div className="flex flex-col gap-4 max-w-2xl">
                    <span className="text-xs font-semibold uppercase tracking-widest text-foreground/80">Who I Am</span>
                    <h1 className="text-5xl md:text-6xl font-bold font-fira-code text-foreground">About</h1>
                    <p className="text-xl font-semibold text-foreground mt-2">
                        I&apos;m Tolulope Fakoya, a Cloud and AI Engineer.
                    </p>
                    <p className="text-lg text-foreground leading-relaxed">
                        With 5+ years building, securing, and operating cloud-native and AI-powered systems, I have grown fond of the craft that is system architecture. A product does not truly exist until it is in the hands of its users - and architecture is what designs that journey. It can be smooth or jagged, fast or fragile. That is the beauty of it.
                    </p>
                    <p className="text-lg text-foreground leading-relaxed">
                        Planning for capacity as user numbers grow, designing the guardrails and rate limits that hold up against malicious actors, making deliberate trade-offs between cost, reliability, and performance. I have fallen in love with the beauty of it.
                    </p>
                    <p className="text-lg text-foreground leading-relaxed">
                        I have led teams deploying AI-powered workloads on platforms like AWS SageMaker and Google Vertex AI, building pipelines that move cleanly from experiment to production.
                    </p>
                    <p className="text-lg text-foreground leading-relaxed">
                        Whatever your position, I will help you cover the bases - designing a system that fits your needs, budget, and operations. Nothing better than a dashboard full of green.
                    </p>
                    <div className="flex flex-wrap gap-5 items-center mt-2">
                        <Link
                            href="/book"
                            className="px-5 py-2 text-base border-2 border-callout rounded-md hover:bg-callout hover:text-on-callout transition-colors duration-300 text-foreground"
                        >
                            Book a Free Meeting
                        </Link>
                        <div className="flex gap-5 items-center">
                            <Link
                                href="https://github.com/toluhunter"
                                target="_blank"
                                className="flex items-center gap-2 text-foreground hover:text-foreground transition-colors duration-200"
                            >
                                <FaGithub size={20} />
                                <span>GitHub</span>
                            </Link>
                            <Link
                                href="https://www.linkedin.com/in/tolulope-fakoya/"
                                target="_blank"
                                className="flex items-center gap-2 text-foreground hover:text-foreground transition-colors duration-200"
                            >
                                <FaLinkedin size={20} />
                                <span>LinkedIn</span>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-[26rem] lg:flex-shrink-0">
                    <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-foreground/15">
                        <Image
                            src="https://assets.toluhunter.com/about/pic.webp"
                            alt="Tolulope Fakoya"
                            fill
                            sizes="(max-width: 1024px) 100vw, 26rem"
                            priority
                            className="object-cover"
                        />
                    </div>
                </div>
            </div>

            {/* Proof strip */}
            <div className="flex flex-col gap-4">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-lg text-foreground">
                    {proofPoints.map((point, i) => (
                        <span key={point} className="flex items-center gap-x-3">
                            {i > 0 && <span className="text-foreground/80">·</span>}
                            <span className="font-semibold">{point}</span>
                        </span>
                    ))}
                </div>
                <Link href="/experience" className="text-sm text-foreground hover:underline w-fit">
                    See the full background &rarr;
                </Link>
            </div>

            {/* How I work */}
            <div className="flex flex-col gap-8">
                <span className="text-xs font-semibold uppercase tracking-widest text-foreground/80">How I Work</span>
                <ul className="flex flex-col divide-y divide-foreground/10">
                    {principles.map((principle, i) => (
                        <li key={i} className="flex gap-6 py-6 first:pt-0 items-baseline">
                            <span className="text-sm font-fira-code text-foreground/60 flex-shrink-0">
                                {String(i + 1).padStart(2, "0")}
                            </span>
                            <span className="text-2xl md:text-3xl font-bold font-fira-code text-foreground leading-snug">
                                {principle}
                            </span>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Right now */}
            <div className="flex flex-col gap-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-foreground/80">Right Now</span>
                <p className="flex items-center gap-3 text-lg text-foreground">
                    <span className="relative inline-flex items-center justify-center w-3 h-3 flex-shrink-0">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-foreground opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground" />
                    </span>
                    {status.working} &middot; <span className="text-foreground font-semibold">{status.availability}</span>
                </p>
            </div>

            {/* Closing CTA */}
            <div className="flex flex-col gap-6 border-t border-foreground/10 pt-12">
                <p className="text-sm italic text-foreground/80">Always adapting, like Mahoraga, the divine general.</p>
                <h2 className="text-3xl md:text-4xl font-bold font-fira-code text-foreground">Have a project? Let&apos;s talk.</h2>
                <Link
                    href="/book"
                    className="px-6 py-3 text-base border-2 border-callout rounded-md hover:bg-callout hover:text-on-callout transition-colors duration-300 text-foreground w-fit"
                >
                    Book a Free Meeting
                </Link>
            </div>

        </section>
    );
};