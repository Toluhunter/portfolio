import Icon from "@/components/utilities/shared/icon";
import { Title } from "@/components/utilities/shared/title";
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
    // Skills Data (JSON structure)

    return (
        <section
            id="skills"
            className="flex flex-col items-center min-h-[1080px] w-full overflow-hidden relative py-20"
        >
            <div className="relative w-full h-full container mx-auto px-4">
                {/* Background pattern icon. If you want this to show over the gradient, ensure its opacity is low enough. */}
                <Icon name="background-pattern" classes="absolute top-0 left-0 w-full h-full object-cover opacity-10 pointer-events-none"></Icon>
                <Title text="Skills" link="#all-skills" />
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">

                    {skillsData.map((skill) => (
                        <div
                            key={skill.id}
                            className="flex flex-col items-center justify-center p-8 bg-background rounded-xl shadow-xl border border-gray-700 hover:border-foreground transition-all duration-300 transform hover:scale-105 group"
                        >
                            {skill.icon && (
                                <div className="mb-4 text-foreground">

                                    <skill.icon size={80} />


                                </div>
                            )}
                            <span className="font-bold text-xl text-foreground">{skill.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
