import { LegalLayout, LegalSection, LegalList, LegalItem, legalLink } from "@/components/pages/legal/legal-layout";

export const metadata = {
    title: "Privacy Policy: Spiral",
    description:
        "Privacy policy for Spiral, a personal automation assistant operated by Tolulope Fakoya for his own use.",
};

export default function PrivacyPage() {
    return (
        <LegalLayout
            title="Privacy Policy"
            lede={
                <>
                    Spiral is a personal automation assistant built and operated by Tolulope Fakoya
                    (Toluhunter) for his own use. It is not offered as a service to the public and has no
                    other users.
                </>
            }
            updated="11 October 2026"
            other={{ href: "/terms", label: "Terms of Service" }}
        >
            <LegalSection title="What this application is">
                <p>
                    Spiral is a self-hosted tool that runs on the owner&apos;s own hardware. It connects to
                    Google services using OAuth so that it can read and organise the owner&apos;s own mail,
                    calendar, files and contacts, and act on them on his instruction.
                </p>
            </LegalSection>

            <LegalSection title="What data it accesses">
                <p>When the owner grants access, Spiral may use these Google API scopes:</p>
                <LegalList>
                    <LegalItem>
                        <span className="text-foreground font-semibold">Gmail</span>{" "}(read, modify, send): to read the
                        owner&apos;s own mail, draft replies, and send messages only where the owner has
                        explicitly approved the send.
                    </LegalItem>
                    <LegalItem>
                        <span className="text-foreground font-semibold">Google Calendar</span>: to read and create the
                        owner&apos;s own calendar events.
                    </LegalItem>
                    <LegalItem>
                        <span className="text-foreground font-semibold">Google Drive, Docs and Sheets</span>: to read and
                        write files in the owner&apos;s own Drive.
                    </LegalItem>
                    <LegalItem>
                        <span className="text-foreground font-semibold">Contacts (read-only)</span>: to look up people the
                        owner already knows.
                    </LegalItem>
                </LegalList>
            </LegalSection>

            <LegalSection title="How data is handled">
                <LegalList>
                    <LegalItem>Google data is used only to perform the task the owner asked for at that moment.</LegalItem>
                    <LegalItem>Copies of data are stored only on the owner&apos;s own devices, in his own accounts, under his control.</LegalItem>
                    <LegalItem>No Google user data is sold, rented, or shared with any third party.</LegalItem>
                    <LegalItem>No Google user data is used for advertising, profiling, or training machine-learning models.</LegalItem>
                    <LegalItem>
                        OAuth tokens are stored on the owner&apos;s own machine and are never published or
                        transmitted anywhere other than to Google&apos;s own APIs.
                    </LegalItem>
                </LegalList>
            </LegalSection>

            <LegalSection title="Retention and deletion">
                <p>
                    Data lives in the owner&apos;s own accounts and is deleted when he deletes it. Access can
                    be revoked at any time at{" "}
                    <a
                        className={legalLink}
                        href="https://myaccount.google.com/permissions"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        myaccount.google.com/permissions
                    </a>
                    , which immediately ends Spiral&apos;s access; local tokens are then deleted from the machine.
                </p>
            </LegalSection>

            <LegalSection title="Limited Use disclosure">
                <p>
                    Spiral&apos;s use of information received from Google APIs adheres to the{" "}
                    <a
                        className={legalLink}
                        href="https://developers.google.com/terms/api-services-user-data-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Google API Services User Data Policy
                    </a>
                    , including the Limited Use requirements.
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
