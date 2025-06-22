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
        { id: 'skill5', name: 'Next.js', icon: Webhook }, // Using Webhook as a generic icon for frameworks
        { id: 'skill6', name: 'Node.js', icon: Cpu },
        { id: 'skill7', name: 'Python', icon: Code },
        { id: 'skill8', name: 'Git', icon: GitBranch }, // Adding Git as a common skill
    ];
    return (
        <section className="flex flex-col bg-[url(/Skills-BG.png)] items-center h-screen w-full bg-gray-900">
            <div className="relative w-full h-full container">
                <Icon name="background-pattern" classes="absolute top-0 left-0 w-full h-full object-cover opacity-10"></Icon>
                <Title text="Skills" />
                <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                    {skillsData.map((skill) => (
                        <SkillItem key={skill.id} skill={skill} />
                    ))}
                </div>
            </div>
        </section>
    )
}