import { SectionHeading } from "@/components/utilities/shared/ui";
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

// Grouped by what the tools are for, so the section reads as a stack rather than a wall of logos.
const skillGroups = [
    { label: "Cloud and infrastructure", ids: ["skill1", "skill5", "skill2", "skill3", "skill6", "skill4"] },
    { label: "Machine learning", ids: ["skill7", "skill8"] },
    { label: "Languages and tools", ids: ["skill9", "skill10", "skill11", "skill12", "skill13", "skill16"] },
];

export const SkillSection = () => {
    return (
        <section id="skills" className="py-24 md:py-32">
            <div className="container mx-auto px-5 md:px-8">
                <SectionHeading title="What I build with" />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-10">
                    {skillGroups.map((group) => (
                        <div key={group.label} className="flex flex-col gap-5 pt-6 border-t border-foreground/10">
                            <h3 className="font-bold text-foreground">{group.label}</h3>
                            <ul className="grid grid-cols-2 gap-x-6 gap-y-4">
                                {group.ids.map((id) => {
                                    const skill = skillsData.find((s) => s.id === id)!;
                                    return (
                                        <li key={id} className="flex items-center gap-3 text-muted">
                                            <skill.icon size={22} aria-hidden className="flex-shrink-0 text-foreground" />
                                            <span>{skill.name}</span>
                                        </li>
                                    );
                                })}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
