import { Title } from "@/components/utilities/shared/title";
import Link from "next/link";
import services from "@/data/services.json";
import { serviceIcons, Service } from "@/components/utilities/shared/service-icon";

const ServiceTile = ({ service }: { service: Service }) => {
    const IconComponent = serviceIcons[service.icon];

    return (
        <Link
            href={`/services#${service.id}`}
            className="flex flex-col items-center gap-4 p-6 border border-foreground/20 rounded-xl text-center hover:border-callout transition-colors duration-300"
        >
            <div className="flex items-center justify-center w-14 h-14 rounded-lg border border-foreground/30 text-callout">
                <IconComponent size={26} />
            </div>
            <span className="font-bold text-foreground">{service.name}</span>
        </Link>
    );
};

export const ServicesSection = () => {
    return (
        <section
            id="services"
            className="flex flex-col items-center w-full py-12"
        >
            <div className="relative w-full container mx-auto px-4">
                <Title text="Services" link="/services" hasMore={true} />
                <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl mx-auto">
                    {(services as Service[]).map((service) => (
                        <ServiceTile key={service.id} service={service} />
                    ))}
                </div>
                <div className="flex justify-center mt-10">
                    <Link
                        href="/book"
                        className="px-8 py-3 border-2 border-callout text-foreground font-bold rounded-lg hover:bg-callout hover:text-on-callout transition-all duration-300 ease-in-out"
                    >
                        Book a Call
                    </Link>
                </div>
            </div>
        </section>
    );
};
