import { NavBar } from "@/components/utilities/shared/navbar";
import { Footer } from "@/components/pages/landing/footer";

export const metadata = {
    title: "Privacy Policy — Spiral",
    description:
        "Privacy policy for Spiral, a personal automation assistant operated by Tolulope Fakoya for his own use.",
};

export default function PrivacyPage() {
    return (
        <>
            <NavBar />
            <main className="min-h-screen bg-background text-foreground">
                <div className="max-w-3xl mx-auto px-6 pt-32 pb-32 space-y-6 text-sm md:text-base leading-relaxed text-foreground/80">
                    <h1 className="text-2xl md:text-3xl font-semibold text-foreground">Privacy Policy — Spiral</h1>
                    <p className="text-foreground/60 text-xs md:text-sm">Last updated: 11 October 2026</p>

                    <p>
                        Spiral is a personal automation assistant built and operated by Tolulope Fakoya
                        (Toluhunter) for his own use. It is not offered as a service to the public and has no
                        other users.
                    </p>

                    <h2 className="text-lg md:text-xl font-semibold text-foreground pt-4">What this application is</h2>
                    <p>
                        Spiral is a self-hosted tool that runs on the owner&apos;s own hardware. It connects to
                        Google services using OAuth so that it can read and organise the owner&apos;s own mail,
                        calendar, files and contacts, and act on them on his instruction.
                    </p>

                    <h2 className="text-lg md:text-xl font-semibold text-foreground pt-4">What data it accesses</h2>
                    <p>When the owner grants access, Spiral may use these Google API scopes:</p>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>
                            <span className="text-foreground">Gmail</span> (read, modify, send) — to read the
                            owner&apos;s own mail, draft replies, and send messages only where the owner has
                            explicitly approved the send.
                        </li>
                        <li>
                            <span className="text-foreground">Google Calendar</span> — to read and create the
                            owner&apos;s own calendar events.
                        </li>
                        <li>
                            <span className="text-foreground">Google Drive, Docs and Sheets</span> — to read and
                            write files in the owner&apos;s own Drive.
                        </li>
                        <li>
                            <span className="text-foreground">Contacts (read-only)</span> — to look up people the
                            owner already knows.
                        </li>
                    </ul>

                    <h2 className="text-lg md:text-xl font-semibold text-foreground pt-4">How data is handled</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Google data is used only to perform the task the owner asked for at that moment.</li>
                        <li>Copies of data are stored only on the owner&apos;s own devices, in his own accounts, under his control.</li>
                        <li>No Google user data is sold, rented, or shared with any third party.</li>
                        <li>No Google user data is used for advertising, profiling, or training machine-learning models.</li>
                        <li>
                            OAuth tokens are stored on the owner&apos;s own machine and are never published or
                            transmitted anywhere other than to Google&apos;s own APIs.
                        </li>
                    </ul>

                    <h2 className="text-lg md:text-xl font-semibold text-foreground pt-4">Retention and deletion</h2>
                    <p>
                        Data lives in the owner&apos;s own accounts and is deleted when he deletes it. Access can
                        be revoked at any time at{" "}
                        <a
                            className="underline hover:text-foreground"
                            href="https://myaccount.google.com/permissions"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            myaccount.google.com/permissions
                        </a>
                        , which immediately ends Spiral&apos;s access; local tokens are then deleted from the machine.
                    </p>

                    <h2 className="text-lg md:text-xl font-semibold text-foreground pt-4">Limited Use disclosure</h2>
                    <p>
                        Spiral&apos;s use of information received from Google APIs adheres to the{" "}
                        <a
                            className="underline hover:text-foreground"
                            href="https://developers.google.com/terms/api-services-user-data-policy"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Google API Services User Data Policy
                        </a>
                        , including the Limited Use requirements.
                    </p>

                    <h2 className="text-lg md:text-xl font-semibold text-foreground pt-4">Contact</h2>
                    <p>Questions about this policy: toluhunterdev@gmail.com</p>
                </div>
            </main>
            <Footer />
        </>
    );
}
