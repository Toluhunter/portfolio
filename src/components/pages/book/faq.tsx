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
];

export const FAQSection = () => {
    return (
        <div className="w-full max-w-3xl mx-auto mt-20">
            <h2 className="text-2xl font-bold font-fira-code text-foreground text-center mb-10">
                Frequently Asked Questions
            </h2>
            <ul className="flex flex-col divide-y divide-foreground/10">
                {faqs.map((faq) => (
                    <li key={faq.question} className="flex flex-col gap-2 py-6 first:pt-0">
                        <span className="text-lg font-bold text-foreground">{faq.question}</span>
                        <span className="text-foreground/80">{faq.answer}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};
