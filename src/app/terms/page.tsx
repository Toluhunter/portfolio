import { LegalLayout, LegalSection, LegalList, LegalItem, legalLink } from "@/components/pages/legal/legal-layout";

export const metadata = {
    title: "Terms of Service: Spiral",
    description:
        "Terms of service for Spiral, a personal automation assistant operated by Tolulope Fakoya for his own use.",
};

export default function TermsPage() {
    return (
        <LegalLayout
            title="Terms of Service"
            lede={
                <>
                    Spiral is a personal automation assistant built and operated by Tolulope Fakoya
                    (Toluhunter) for his own use on his own hardware. It is not a public product and has no
                    other users.
                </>
            }
            updated="11 October 2026"
            other={{ href: "/privacy", label: "Privacy Policy" }}
        >
            <LegalSection title="Acceptance">
                <p>
                    Use of Spiral is limited to its owner. By connecting a Google account to Spiral, the
                    owner accepts these terms.
                </p>
            </LegalSection>

            <LegalSection title="Scope of use">
                <LegalList>
                    <LegalItem>Spiral is used only with accounts owned by the owner.</LegalItem>
                    <LegalItem>
                        It performs actions on the owner&apos;s instruction, and sends email only when the
                        owner explicitly approves that specific message.
                    </LegalItem>
                    <LegalItem>
                        It is not intended for, and must not be used for, bulk messaging, advertising, or any
                        purpose that violates Google&apos;s APIs Terms of Service or applicable law.
                    </LegalItem>
                </LegalList>
            </LegalSection>

            <LegalSection title="No warranty">
                <p>
                    Spiral is provided as-is, without warranty of any kind. The owner is responsible for
                    reviewing any output, draft, or action before it is relied upon or sent.
                </p>
            </LegalSection>

            <LegalSection title="Limitation of liability">
                <p>
                    To the extent permitted by law, the owner of Spiral is not liable for any loss arising
                    from use of the tool, including missed messages, incorrect summaries, or actions taken on
                    stale information.
                </p>
            </LegalSection>

            <LegalSection title="Changes">
                <p>
                    These terms may be updated at any time; the current version is always the one published
                    at this URL.
                </p>
            </LegalSection>

            <LegalSection title="Contact">
                <p>
                    Questions about these terms:{" "}
                    <a className={legalLink} href="mailto:toluhunterdev@gmail.com">toluhunterdev@gmail.com</a>
                </p>
            </LegalSection>
        </LegalLayout>
    );
}
