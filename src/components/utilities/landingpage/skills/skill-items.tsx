interface Skill {
    id: string;
    name: string;
    icon: React.ComponentType<{ size?: number; color?: string }>;
}
export const SkillItem: React.FC<{ skill: Skill }> = ({ skill }) => {
    const IconComponent = skill.icon;
    return (
        <div className="flex items-center gap-4 p-4 bg-gray-800 rounded-lg shadow-md border border-gray-700">
            {IconComponent && <IconComponent size={24} color="#804F94" />} {/* Render the icon with custom color */}
            <span className="font-bold text-lg text-gray-100">{skill.name}</span>
        </div>
    );
};
