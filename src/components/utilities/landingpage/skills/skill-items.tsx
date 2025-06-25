interface Skill {
    id: string;
    name: string;
    icon: React.ComponentType<{ size?: number; color?: string }>;
}
export const SkillItem: React.FC<{ skill: Skill }> = ({ skill }) => {
    const IconComponent = skill.icon;
    return (
        <div className="flex flex-col items-center justify-center p-8 bg-gray-800 rounded-xl shadow-xl border border-gray-700 hover:border-[#804F94] transition-all duration-300 transform hover:scale-105 group">
            {IconComponent && (
                <div className="mb-4 text-[#804F94] group-hover:text-white transition-colors duration-300">
                    <IconComponent size={80} /> {/* Increased icon size significantly */}
                </div>
            )}
            <span className="font-bold text-xl text-gray-100 group-hover:text-white transition-colors duration-300">{skill.name}</span>
        </div>
    );
};