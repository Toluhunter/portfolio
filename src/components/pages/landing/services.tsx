'use client';

import { Title } from "@/components/utilities/shared/title";
import Image from "next/image";
import { useState } from "react";

const services = [
    {
        id: 'service1',
        name: 'Cloud Consultation',
        description: 'Expert guidance to help you navigate the complexities of the cloud and develop a strategy that aligns with your business goals.',
        imageUrl: 'https://assets.toluhunter.com/services/cloud-consultation.jpg'
    },
    {
        id: 'service2',
        name: 'Cost Optimization of AWS',
        description: 'Analyze your AWS infrastructure to identify savings opportunities and implement strategies to reduce your cloud spending.',
        imageUrl: 'https://assets.toluhunter.com/services/cost-optimization.jpg'
    },
    {
        id: 'service3',
        name: 'Solution Architecture',
        description: 'Design and build scalable, reliable, and secure solutions on the cloud that meet your specific business needs.',
        imageUrl: 'https://assets.toluhunter.com/services/solution-architecture.jpg'
    },
    {
        id: 'service4',
        name: 'Cloud Migration',
        description: 'Seamlessly migrate your applications and data to the cloud with minimal downtime and disruption.',
        imageUrl: 'https://assets.toluhunter.com/services/cloud-migration.jpg'
    },
    {
        id: 'service5',
        name: 'Full Stack Development',
        description: 'End-to-end development of web applications, from front-end user interfaces to back-end services and databases.',
        imageUrl: 'https://assets.toluhunter.com/services/full-stack-development.jpg'
    },
    {
        id: 'service6',
        name: 'Infrastructure Management',
        description: 'Proactive management and monitoring of your cloud infrastructure to ensure optimal performance, security, and reliability.',
        imageUrl: 'https://assets.toluhunter.com/services/infrastructure-management.jpg'
    },
    {
        id: 'service7',
        name: 'AI/ML Consultation',
        description: 'Leverage the power of artificial intelligence and machine learning to build intelligent applications and gain insights from your data.',
        imageUrl: 'https://assets.toluhunter.com/services/ai-consultation.jpg'
    },
];

const ServiceCard = ({ service }: { service: typeof services[0] }) => {
    const [isLoading, setIsLoading] = useState(true);

    return (
        <div
            className="flex flex-col items-center justify-between p-8 bg-background rounded-xl shadow-xl border border-gray-700 hover:border-callout transition-all duration-300 transform hover:scale-105 group"
        >
            <div className="relative w-[18.75rem] h-[12.5rem] mb-4">
                {isLoading && (
                    <div className="absolute inset-0 bg-gray-700 rounded-lg animate-pulse"></div>
                )}
                <Image
                    src={service.imageUrl}
                    alt={service.name}
                    fill
                    className={`rounded-lg object-cover transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                    onLoad={() => setIsLoading(false)}
                />
            </div>
            <span className="font-bold text-xl text-center text-foreground group-hover:text-white transition-colors duration-300 mb-4">{service.name}</span>
            <p className="text-center text-muted-foreground mb-4 flex-grow">{service.description}</p>
            <a
                href="mailto:toluhunterdev@gmail.com"
                className="mt-auto px-6 py-2 border border-callout text-foreground font-bold rounded-lg hover:bg-callout hover:text-white transition-all duration-300 ease-in-out"
            >
                Contact Me
            </a>
        </div>
    );
};

export const ServicesSection = () => {
    return (
        <section
            id="services"
            className="flex flex-col items-center min-h-[64rem] w-full overflow-hidden relative py-5"
        >
            <div className="relative w-full h-full container mx-auto px-4">
                <Title text="Services" />
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
                    {services.map((service) => (
                        <ServiceCard key={service.id} service={service} />
                    ))}
                </div>
            </div>
        </section>
    );
};
