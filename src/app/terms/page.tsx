import { NavBar } from "@/components/utilities/shared/navbar";
import { Footer } from "@/components/pages/landing/footer";

export const metadata = {
    title: "Terms of Service — Spiral",
    description:
        "Terms of service for Spiral, a personal automation assistant operated by Tolulope Fakoya for his own use.",
};

export default function TermsPage() {
    return (
        <>
            <NavBar />
            <main className="min-h-screen bg-background text-foreground">
                <div className="max-w-3xl mx-auto px-6 pt-32 pb-32 space-y-6 text-sm md:text-base leading-relaxed text-foreground/80">
                    <h1 className="text-2xl md:text-3xl font-semibold text-foreground">Terms of Service — Spiral</h1>
                    <p className="text-foreground/60 text-xs md:text-sm">Last updated: 11 October 2026</p>

                    <p>
                        Spiral is a personal automation assistant built and operated by Tolulope Fakoya
                        (Toluhunter) for his own use on his own hardware. It is not a public product and has no
                        other users.
                    </p>

                    <h2 className="text-lg md:text-xl font-semibold text-foreground pt-4">Acceptance</h2>
                    <p>
                        Use of Spiral is limited to its owner. By connecting a Google account to Spiral, the
                        owner accepts these terms.
                    </p>

                    <h2 className="text-lg md:text-xl font-semibold text-foreground pt-4">Scope of use</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Spiral is used only with accounts owned by the owner.</li>
                        <li>
                            It performs actions on the owner&apos;s instruction, and sends email only when the
                            owner explicitly approves that specific message.
                        </li>
                        <li>
                            It is not intended for, and must not be used for, bulk messaging, advertising, or any
                            purpose that violates Google&apos;s APIs Terms of Service or applicable law.
                        </li>
                    </ul>

                    <h2 className="text-lg md:text-xl font-semibold text-foreground pt-4">No warranty</h2>
                    <p>
                        Spiral is provided as-is, without warranty of any kind. The owner is responsible for
                        reviewing any output, draft, or action before it is relied upon or sent.
                    </p>

                    <h2 className="text-lg md:text-xl font-semibold text-foreground pt-4">Limitation of liability</h2>
                    <p>
                        To the extent permitted by law, the owner of Spiral is not liable for any loss arising
                        from use of the tool, including missed messages, incorrect summaries, or actions taken on
                        stale information.
                    </p>

                    <h2 className="text-lg md:text-xl font-semibold text-foreground pt-4">Changes</h2>
                    <p>
                        These terms may be updated at any time; the current version is always the one published
                        at this URL.
                    </p>

                    <h2 className="text-lg md:text-xl font-semibold text-foreground pt-4">Contact</h2>
                    <p>Questions about these terms: toluhunterdev@gmail.com</p>
                </div>
            </main>
            <Footer />
        </>
    );
}
