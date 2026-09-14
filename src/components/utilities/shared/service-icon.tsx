import { FaCloudUploadAlt, FaDollarSign, FaShieldAlt, FaBrain, FaCubes, FaChartBar, FaServer } from "react-icons/fa";

export const serviceIcons = {
    "cloud-upload": FaCloudUploadAlt,
    "dollar": FaDollarSign,
    "shield": FaShieldAlt,
    "brain": FaBrain,
    "cubes": FaCubes,
    "chart": FaChartBar,
    "server": FaServer,
} as const;

export type ServiceIconKey = keyof typeof serviceIcons;

export interface Service {
    id: string;
    name: string;
    icon: ServiceIconKey;
    hook: string;
    includes: string[];
    caseStudyLink?: string;
}
