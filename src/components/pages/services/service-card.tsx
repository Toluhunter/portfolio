import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { serviceIcons, Service } from "@/components/utilities/shared/service-icon";

export const ServiceCard = ({ service }: { service: Service }) => {
    const IconComponent = serviceIcons[service.icon];

    return (
        <div id={service.id} className="flex flex-col gap-5 p-6 md:p-8 border border-foreground/20 rounded-xl text-left scroll-mt-28">
            <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-14 h-14 flex-shrink-0 rounded-lg border border-foreground/30 text-callout">
                    <IconComponent size={26} />
                </div>
                <h3 className="text-xl font-bold text-foreground">{service.name}</h3>
            </div>

            <p className="text-foreground/90 italic">{service.hook}</p>

            <ul className="flex flex-col gap-2">
                {service.includes.map((item) => (
                    <li key={item} className="flex gap-3 text-sm text-foreground/80">
                        <span className="text-callout mt-0.5 flex-shrink-0">//</span>
                        <span>{item}</span>
                    </li>
                ))}
            </ul>

            <div className="flex flex-wrap items-center gap-4 mt-auto pt-2">
                <Link
                    href="/book"
                    className="px-6 py-2 border-2 border-callout text-foreground font-bold rounded-lg hover:bg-callout hover:text-on-callout transition-all duration-300 ease-in-out"
                >
                    Book a Call
                </Link>
                {service.caseStudyLink && (
                    <Link
                        href={service.caseStudyLink}
                        className="flex items-center gap-2 text-sm text-foreground/70 hover:text-foreground transition-colors duration-200"
                    >
                        See it in a real case study <FaArrowRight className="w-3 h-3" />
                    </Link>
                )}
            </div>
        </div>
    );
};
