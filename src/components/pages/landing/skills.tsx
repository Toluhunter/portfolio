import Icon from "@/components/utilities/shared/icon";
import { Title } from "@/components/utilities/shared/title";
import {
    DiJavascript1,
    DiReact,
    DiNodejs,
    DiPython,
    DiGit,
} from "react-icons/di";
import { FaAws, FaDocker, FaBrain, FaInfinity } from "react-icons/fa";
import { SiGooglecloud, SiTypescript, SiNextdotjs } from "react-icons/si";


export const SkillSection = () => {
    // Skills Data (JSON structure)
    const skillsData = [
        { id: 'skill1', name: 'AWS', icon: FaAws },
        { id: 'skill2', name: 'GCP', icon: SiGooglecloud },
        { id: 'skill3', name: 'Docker', icon: FaDocker },
        { id: 'skill4', name: 'Machine Learning', icon: FaBrain },
        { id: 'skill5', name: 'Next.js', icon: SiNextdotjs },
        { id: 'skill6', name: 'Node.js', icon: DiNodejs },
        { id: 'skill7', name: 'Python', icon: DiPython },
        { id: 'skill8', name: 'Git', icon: DiGit },
        { id: 'skill9', name: 'React', icon: DiReact }, // Reusing Webhook for React
        { id: 'skill10', name: 'JavaScript', icon: DiJavascript1 },
        { id: 'skill11', name: 'TypeScript', icon: SiTypescript },
        { id: 'skill12', name: 'CI/CD', icon: FaInfinity }, // Reusing GitBranch for CI/CD
    ];

    return (
        <section
            id="skills"
            className="flex flex-col items-center min-h-screen w-full overflow-hidden relative py-20"
            style={{ background: 'var(--background)' }} // Set background using the CSS variable
        >
            <div className="relative w-full h-full container mx-auto px-4">
                {/* Background pattern icon. If you want this to show over the gradient, ensure its opacity is low enough. */}
                <Icon name="background-pattern" classes="absolute top-0 left-0 w-full h-full object-cover opacity-10 pointer-events-none"></Icon>
                <Title text="Skills" hasMore={true} link="#all-skills" />
                <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-6xl mx-auto">

                    {skillsData.map((skill) => (
                        <div
                            key={skill.id}
                            className="flex flex-col items-center justify-center p-8 bg-gray-800 rounded-xl shadow-xl border border-gray-700 hover:border-[#804F94] transition-all duration-300 transform hover:scale-105 group"
                        >
                            {skill.icon && (
                                <div className="mb-4 text-[#804F94] group-hover:text-white transition-colors duration-300">

                                    <skill.icon size={80} />


                                </div>
                            )}
                            <span className="font-bold text-xl text-gray-100 group-hover:text-white transition-colors duration-300">{skill.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}