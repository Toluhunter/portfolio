import { EMAIL_HREF, SectionHeading, textLink } from "@/components/utilities/shared/ui";

const faqs = [
    {
        question: "What timezone are you in?",
        answer: "I'm based in Ontario, Canada (Eastern Time), but I work with clients across time zones. Calls and async updates happen whenever overlaps best for you.",
    },
    {
        question: "Do you sign NDAs or contracts?",
        answer: "Yes, I'll sign an NDA before any detailed discussion if you need one, and every engagement starts with a written scope and fixed quote before work begins.",
    },
    {
        question: "Do I need existing infrastructure, or can you start from scratch?",
        answer: "Either. Most of my clients are small teams without a platform team yet, so I can build from zero or work with whatever you already have running.",
    },
    {
        question: "How fast can you start?",
        answer: "Usually within a week or two of the scope call, depending on what's already in my pipeline. If it's urgent, say so on the call.",
    },
    {
        question: "Do you only take on big projects?",
        answer: "No. Audits and smaller fixed scope fixes are just as common as full migrations. Not everything needs to be a big engagement.",
    },
    {
        question: "Can I just email instead of booking a call?",
        answer: <>Yes. If you would rather write it down first, <a href={EMAIL_HREF} className={`${textLink} font-semibold`}>email me</a> with what you are building, roughly what stage it is at, and any deadline. If a call would help after that, we can set one up.</>,
    },
];

export const FAQSection = () => {
    return (
        <div className="w-full mt-24 md:mt-32">
            <SectionHeading title="Frequently asked questions" />
            <dl className="flex flex-col divide-y divide-foreground/10 border-y border-foreground/10">
                {faqs.map((faq) => (
                    <div key={faq.question} className="grid md:grid-cols-[1fr_1.4fr] gap-2 md:gap-10 py-6">
                        <dt className="text-lg font-bold text-foreground">{faq.question}</dt>
                        <dd className="text-muted leading-relaxed prose-measure">{faq.answer}</dd>
                    </div>
                ))}
            </dl>
        </div>
    );
};
