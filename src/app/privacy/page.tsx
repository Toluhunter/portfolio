import Link from "next/link";
import { LegalLayout, LegalSection, LegalList, LegalItem, legalLink } from "@/components/pages/legal/legal-layout";

export const metadata = {
    title: "Privacy Policy",
    description:
        "How toluhunter.com and Tolulope Fakoya's client engagements collect, use and protect your information.",
};

export default function PrivacyPage() {
    return (
        <LegalLayout
            title="Privacy Policy"
            lede={
                <>
                    How toluhunter.com and my client work handle your information. Spiral, my personal
                    automation assistant, has <Link href="/spiral/privacy" className={legalLink}>its own privacy policy</Link>.
                </>
            }
            updated="11 October 2026"
            related={[
                { href: "/terms", label: "Terms of Use" },
                { href: "/spiral/privacy", label: "Spiral Privacy Policy" },
            ]}
            sections={[
                "Who I am",
                "What this site collects",
                "Client engagements",
                "How I use information",
                "Who I share it with",
                "How long I keep it",
                "Your choices",
                "Spiral",
                "Changes",
                "Contact",
            ]}
        >
            <LegalSection title="Who I am">
                <p>
                    I&apos;m Tolulope Fakoya (Toluhunter), an independent Cloud and AI engineer based in Ontario,
                    Canada. I run toluhunter.com and I&apos;m responsible for the information described here.
                </p>
            </LegalSection>

            <LegalSection title="What this site collects">
                <LegalList>
                    <LegalItem>
                        <span className="text-foreground font-semibold">Analytics.</span> Google Analytics uses
                        cookies to record which pages are visited, roughly where visitors are, and what device and
                        browser they use. I see this in aggregate, not as named individuals.
                    </LegalItem>
                    <LegalItem>
                        <span className="text-foreground font-semibold">Booking a call.</span> Scheduling runs on
                        Cal.com. The name, email address and notes you enter are shared with Cal.com and with me so
                        we can hold the call.
                    </LegalItem>
                    <LegalItem>
                        <span className="text-foreground font-semibold">Signing in to comment.</span> If you sign in
                        with Google to comment on an article, I receive your name, email address and profile
                        picture. Your name and picture appear next to your comments. Sign-in tokens are kept in
                        cookies in your browser.
                    </LegalItem>
                    <LegalItem>
                        <span className="text-foreground font-semibold">The AI terminal.</span> Messages you type
                        into the on-site assistant are sent to my server to generate a reply, and a session cookie
                        lets a conversation resume. Please don&apos;t share sensitive information there.
                    </LegalItem>
                    <LegalItem>
                        <span className="text-foreground font-semibold">Email.</span> If you email me, I receive
                        your address and whatever you choose to send.
                    </LegalItem>
                    <LegalItem>
                        <span className="text-foreground font-semibold">Preferences.</span> Your theme and sound
                        choices are stored in your own browser and are never sent to me.
                    </LegalItem>
                </LegalList>
            </LegalSection>

            <LegalSection title="Client engagements">
                <p>
                    When we work together, you may share details about your business, your systems, and access
                    to your cloud accounts or code. I use this only to deliver the work we agreed in writing,
                    keep it confidential, and follow any NDA or contract we sign. When an engagement ends, I ask
                    you to revoke any access you granted, and I return or delete your material as our agreement
                    sets out.
                </p>
            </LegalSection>

            <LegalSection title="How I use information">
                <p>
                    To run and improve this site, reply to you, schedule and hold calls, show your comments, and
                    deliver client work. I don&apos;t sell personal information and I don&apos;t use it for
                    advertising.
                </p>
            </LegalSection>

            <LegalSection title="Who I share it with">
                <p>
                    Only the services that run this site and my work: Google (analytics and sign-in), Cal.com
                    (scheduling), the cloud provider that hosts the site and its data, and the AI service that
                    powers the on-site assistant. I may also disclose information where the law requires it.
                </p>
            </LegalSection>

            <LegalSection title="How long I keep it">
                <p>
                    For as long as it&apos;s needed for the reason it was collected. Comments stay up until you
                    ask me to remove them, and client material is kept or deleted as our agreement sets out.
                </p>
            </LegalSection>

            <LegalSection title="Your choices">
                <p>
                    You can block analytics cookies in your browser or with{" "}
                    <a className={legalLink} href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">
                        Google&apos;s opt-out add-on
                    </a>
                    , sign out at any time, and email me to see, correct or delete the information I hold about
                    you. Depending on where you live, privacy law may give you further rights, and I&apos;ll
                    honour them.
                </p>
            </LegalSection>

            <LegalSection title="Spiral">
                <p>
                    Spiral is a separate, personal tool that I use with my own Google account. Its handling of
                    Google user data is covered only by the{" "}
                    <Link href="/spiral/privacy" className={legalLink}>Spiral Privacy Policy</Link>, and nothing
                    in this policy applies to that data.
                </p>
            </LegalSection>

            <LegalSection title="Changes">
                <p>
                    I may update this policy as the site changes. The current version is always the one
                    published at this URL, with its date at the top.
                </p>
            </LegalSection>

            <LegalSection title="Contact">
                <p>
                    Questions about this policy:{" "}
                    <a className={legalLink} href="mailto:toluhunterdev@gmail.com">toluhunterdev@gmail.com</a>
                </p>
            </LegalSection>
        </LegalLayout>
    );
}
