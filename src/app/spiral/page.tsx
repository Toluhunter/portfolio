import Link from "next/link";
import { LegalLayout, LegalSection, LegalList, LegalItem } from "@/components/pages/legal/legal-layout";
import { btnPrimary, btnSecondary } from "@/components/utilities/shared/ui";

// Homepage for the Spiral OAuth app. Google's consent screen points here, so it describes what the
// app does, why it asks for Google data, and links its own privacy policy and terms.
export const metadata = {
    title: "Spiral",
    description:
        "Spiral is a personal automation assistant built and operated by Tolulope Fakoya for his own Google account.",
};

export default function SpiralPage() {
    return (
        <LegalLayout
            eyebrow="spiral"
            title="Spiral"
            lede={
                <>
                    A personal automation assistant built and operated by Tolulope Fakoya (Toluhunter) on his
                    own hardware, for his own Google account. It is not offered to the public and has no other
                    users.
                </>
            }
            related={[
                { href: "/spiral/privacy", label: "Spiral Privacy Policy" },
                { href: "/spiral/terms", label: "Spiral Terms of Service" },
            ]}
            sections={["What it does", "Why it asks for Google access", "Who can use it", "Policies"]}
        >
            <LegalSection title="What it does">
                <p>
                    Spiral is a self-hosted tool that reads and organises the owner&apos;s own mail, calendar,
                    files and contacts, and acts on them on his instruction:
                </p>
                <LegalList>
                    <LegalItem>Reads the owner&apos;s mail and drafts replies. It sends a message only when the owner has explicitly approved that specific send.</LegalItem>
                    <LegalItem>Reads and creates events on the owner&apos;s calendar.</LegalItem>
                    <LegalItem>Reads and writes files in the owner&apos;s Google Drive, Docs and Sheets.</LegalItem>
                    <LegalItem>Looks up people the owner already knows in his contacts.</LegalItem>
                </LegalList>
            </LegalSection>

            <LegalSection title="Why it asks for Google access">
                <p>
                    Each Google permission Spiral requests maps to one of the tasks above: Gmail to read mail,
                    draft replies and send approved messages; Google Calendar to read and create events; Google
                    Drive, Docs and Sheets to read and write files; and Contacts (read-only) to look people up.
                    Google data is used only to perform the task the owner asked for at that moment.
                </p>
            </LegalSection>

            <LegalSection title="Who can use it">
                <p>
                    Only its owner. Spiral connects only to accounts the owner holds, there is no sign-up, and
                    it is not available as a service to anyone else.
                </p>
            </LegalSection>

            <LegalSection title="Policies">
                <p>
                    How Spiral handles Google user data, including the Limited Use disclosure, is set out in its
                    privacy policy. Use of Spiral is covered by its terms of service.
                </p>
                <div className="flex flex-wrap gap-3 pt-2">
                    <Link href="/spiral/privacy" className={btnPrimary}>Privacy Policy</Link>
                    <Link href="/spiral/terms" className={btnSecondary}>Terms of Service</Link>
                </div>
            </LegalSection>
        </LegalLayout>
    );
}
