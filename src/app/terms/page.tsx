import Link from "next/link";
import { LegalLayout, LegalSection, LegalList, LegalItem, legalLink } from "@/components/pages/legal/legal-layout";

export const metadata = {
    title: "Terms of Use",
    description: "Terms for using toluhunter.com and how client engagements with Tolulope Fakoya are governed.",
};

export default function TermsPage() {
    return (
        <LegalLayout
            title="Terms of Use"
            lede={
                <>
                    The terms for using toluhunter.com and how client work is agreed. Spiral, my personal
                    automation assistant, has <Link href="/spiral/terms" className={legalLink}>its own terms</Link>.
                </>
            }
            updated="11 October 2026"
            related={[
                { href: "/privacy", label: "Privacy Policy" },
                { href: "/spiral/terms", label: "Spiral Terms of Service" },
            ]}
            sections={[
                "Using this site",
                "Content",
                "Comments",
                "The AI terminal",
                "Client work",
                "No warranty",
                "Limitation of liability",
                "Other services",
                "Governing law",
                "Changes",
                "Contact",
            ]}
        >
            <LegalSection title="Using this site">
                <p>
                    By using toluhunter.com you agree to these terms. Use the site lawfully, and don&apos;t try
                    to disrupt it, break its security, or overload it with automated requests.
                </p>
            </LegalSection>

            <LegalSection title="Content">
                <p>
                    Articles, images and other content on this site belong to me unless stated otherwise. You
                    are welcome to quote and link to it with attribution. Where a license is given alongside
                    a piece of content or code, that license applies instead.
                </p>
            </LegalSection>

            <LegalSection title="Comments">
                <p>
                    You are responsible for what you post. Keep it respectful and on topic. I may remove
                    comments that are abusive, spam, or unlawful.
                </p>
            </LegalSection>

            <LegalSection title="The AI terminal">
                <p>
                    Answers from the on-site assistant are generated automatically and can be wrong. They are
                    general information, not professional advice for your situation.
                </p>
            </LegalSection>

            <LegalSection title="Client work">
                <LegalList>
                    <LegalItem>A discovery call is free and creates no obligation on either side.</LegalItem>
                    <LegalItem>
                        Every engagement starts with a written scope and quote that we both agree before work
                        begins. That agreement, together with any NDA or contract we sign, governs the work.
                    </LegalItem>
                    <LegalItem>
                        If anything in these terms conflicts with our signed agreement, the signed agreement wins.
                    </LegalItem>
                </LegalList>
            </LegalSection>

            <LegalSection title="No warranty">
                <p>
                    The site and its content are provided as-is. Articles share general information and
                    opinion; check anything you rely on against your own situation.
                </p>
            </LegalSection>

            <LegalSection title="Limitation of liability">
                <p>
                    To the extent permitted by law, I am not liable for any loss arising from use of this site
                    or its content. Liability for client work is set by our signed agreement.
                </p>
            </LegalSection>

            <LegalSection title="Other services">
                <p>
                    The site links to and embeds services run by others, such as Cal.com, GitHub and Buy Me a
                    Coffee. Their own terms and privacy policies apply when you use them.
                </p>
            </LegalSection>

            <LegalSection title="Governing law">
                <p>These terms are governed by the laws of Ontario and the federal laws of Canada that apply there.</p>
            </LegalSection>

            <LegalSection title="Changes">
                <p>
                    I may update these terms at any time. The current version is always the one published at
                    this URL, with its date at the top.
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
