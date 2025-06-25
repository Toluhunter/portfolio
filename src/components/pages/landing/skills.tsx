import { SkillItem } from "@/components/utilities/landingpage/skills/skill-items";
import Icon from "@/components/utilities/shared/icon";
import { Title } from "@/components/utilities/shared/title";
import { Code, Cloud, Box, Brain, Webhook, Cpu, GitBranch } from 'lucide-react';

export const SkillSection = () => {
    // Skills Data (JSON structure)
    const skillsData = [
        { id: 'skill1', name: 'AWS', icon: Cloud },
        { id: 'skill2', name: 'GCP', icon: Cloud },
        { id: 'skill3', name: 'Docker', icon: Box },
        { id: 'skill4', name: 'Machine Learning', icon: Brain },
        { id: 'skill5', name: 'Next.js', icon: Webhook },
        { id: 'skill6', name: 'Node.js', icon: Cpu },
        { id: 'skill7', name: 'Python', icon: Code },
        { id: 'skill8', name: 'Git', icon: GitBranch },
        { id: 'skill9', name: 'React', icon: Webhook }, // Reusing Webhook for React
        { id: 'skill10', name: 'JavaScript', icon: Code },
        { id: 'skill11', name: 'TypeScript', icon: Code },
        { id: 'skill12', name: 'CI/CD', icon: GitBranch }, // Reusing GitBranch for CI/CD
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
                        <SkillItem key={skill.id} skill={skill} />
                    ))}
                </div>
            </div>
        </section>
    )
}