"use client";
import { skillsData } from "../landing/skills";

const SkillsSection = () => {
    return (
        <>
            <h1 className="flex w-full justify-center font-bold text-foreground text-3xl">My Skills</h1>
            <div className="w-full py-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full max-w-6xl mx-auto">

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
        </>
    )
};

export default SkillsSection;