import { SectionHeading, card, cardHover } from "@/components/utilities/shared/ui";
import {
    DiNodejs,
    DiPython,
    DiGit,
} from "react-icons/di";
import { FaAws, FaDocker, FaInfinity } from "react-icons/fa";
import { SiGooglecloud, SiTypescript, SiNextdotjs, SiTensorflow, SiScikitlearn, SiTerraform, SiKubernetes, SiGo } from "react-icons/si";

export const skillsData = [
    { id: 'skill1', name: 'AWS', icon: FaAws },
    { id: 'skill2', name: 'Terraform', icon: SiTerraform },
    { id: 'skill3', name: 'Docker', icon: FaDocker },
    { id: 'skill4', name: 'CI/CD', icon: FaInfinity },
    { id: 'skill5', name: 'GCP', icon: SiGooglecloud },
    { id: 'skill6', name: 'Kubernetes', icon: SiKubernetes },
    { id: 'skill7', name: 'TensorFlow', icon: SiTensorflow },
    { id: 'skill8', name: 'Scikit-Learn', icon: SiScikitlearn },
    { id: 'skill9', name: 'Python', icon: DiPython },
    { id: 'skill10', name: 'Go', icon: SiGo },
    { id: 'skill11', name: 'TypeScript', icon: SiTypescript },
    { id: 'skill12', name: 'Next.js', icon: SiNextdotjs },
    { id: 'skill13', name: 'Node.js', icon: DiNodejs },
    { id: 'skill16', name: 'Git', icon: DiGit },
];

export const SkillSection = () => {
    return (
        <section id="skills" className="py-20 md:py-28">
            <div className="container mx-auto px-5 md:px-8">
                <SectionHeading eyebrow="toolbox" title="What I build with" />
                <ul className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-7 gap-3">
                    {skillsData.map((skill) => (
                        <li
                            key={skill.id}
                            className={`${card} ${cardHover} flex items-center gap-3 px-4 py-4`}
                        >
                            <skill.icon size={24} aria-hidden className="flex-shrink-0 text-foreground" />
                            <span className="font-semibold text-foreground">{skill.name}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}
