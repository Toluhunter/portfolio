import Icon from "@/components/utilities/shared/icon";
import { Title } from "@/components/utilities/shared/title";
import {
    DiJavascript1,
    DiReact,
    DiNodejs,
    DiPython,
    DiGit,
} from "react-icons/di";
import { FaAws, FaDocker, FaInfinity, } from "react-icons/fa";
import { SiGooglecloud, SiTypescript, SiNextdotjs, SiTensorflow, SiScikitlearn, SiNumpy, SiKeras, SiPandas } from "react-icons/si";

export const skillsData = [
    { id: 'skill1', name: 'AWS', icon: FaAws },
    { id: 'skill2', name: 'GCP', icon: SiGooglecloud },
    { id: 'skill3', name: 'Docker', icon: FaDocker },
    { id: 'skill13', name: 'TensorFlow', icon: SiTensorflow },
    { id: 'skill14', name: 'Scikit-Learn', icon: SiScikitlearn },
    { id: 'skill5', name: 'Next.js', icon: SiNextdotjs },
    { id: 'skill6', name: 'Node.js', icon: DiNodejs },
    { id: 'skill7', name: 'Python', icon: DiPython },
    { id: 'skill8', name: 'Git', icon: DiGit },
    { id: 'skill9', name: 'React', icon: DiReact }, // Reusing Webhook for React
    { id: 'skill17', name: 'Pandas', icon: SiPandas },
    { id: 'skill10', name: 'JavaScript', icon: DiJavascript1 },
    { id: 'skill11', name: 'TypeScript', icon: SiTypescript },
    { id: 'skill12', name: 'CI/CD', icon: FaInfinity }, // Reusing GitBranch for CI/CD
    { id: 'skill15', name: 'NumPy', icon: SiNumpy },
    { id: 'skill16', name: 'Keras', icon: SiKeras },
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
                            className="flex flex-col items-center justify-center p-8 bg-background rounded-xl shadow-xl border border-gray-700 hover:border-callout transition-all duration-300 transform hover:scale-105 group"
                        >
                            {skill.icon && (
                                <div className="mb-4 text-callout group-hover:text-white transition-colors duration-300">

                                    <skill.icon size={80} />


                                </div>
                            )}
                            <span className="font-bold text-xl text-foreground group-hover:text-white transition-colors duration-300">{skill.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
