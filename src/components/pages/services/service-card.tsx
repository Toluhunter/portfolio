import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { serviceIcons, Service } from "@/components/utilities/shared/service-icon";
import { btnSecondary, card } from "@/components/utilities/shared/ui";

export const ServiceCard = ({ service }: { service: Service }) => {
    const IconComponent = serviceIcons[service.icon];

    return (
        <div id={service.id} className={`${card} flex flex-col gap-5 p-6 md:p-8 text-left scroll-mt-28`}>
            <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-12 h-12 flex-shrink-0 rounded-xl bg-callout/10 text-callout">
                    <IconComponent size={22} aria-hidden />
                </div>
                <h3 className="text-xl font-bold text-foreground">{service.name}</h3>
            </div>

            <p className="text-foreground text-lg leading-relaxed">{service.hook}</p>

            <ul className="flex flex-col gap-2">
                {service.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-muted leading-relaxed">
                        <span aria-hidden className="text-callout flex-shrink-0">&rsaquo;</span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>

            <div className="flex flex-wrap items-center gap-4 mt-auto pt-2">
                <Link
                    href="/book"
                    className={btnSecondary}
                >
                    Book a Call
                </Link>
                {service.caseStudyLink && (
                    <Link
                        href={service.caseStudyLink}
                        className="flex items-center gap-2 text-sm text-muted hover:text-callout transition-colors duration-200"
                    >
                        See it in a real case study <FaArrowRight className="w-3 h-3" aria-hidden />
                    </Link>
                )}
            </div>
        </div>
    );
};
