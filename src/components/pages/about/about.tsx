"use client";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import Link from 'next/link';
import { useState } from 'react';

export const AboutSection = () => {
  const [activeSection, setActiveSection] = useState('Experience');
  const sections = ['Experience', 'Education', 'Skills', 'Hobbies'];

  const renderContent = () => {
    switch (activeSection) {
      case 'Experience':
        return <div>Experience Content Goes Here</div>;
      case 'Education':
        return <div>Education Content Goes Here</div>;
      case 'Skills':
        return <div>Skills Content Goes Here</div>;
      case 'Hobbies':
        return <div>Hobbies Content Goes Here</div>;
      default:
        return null;
    }
  };

  return (
    <section className="min-h-screen pt-25 w-full container mx-auto flex flex-col items-center px-8 pb-10">
      <h1 className="flex w-full justify-center font-bold text-6xl">About Me</h1>

      <div className="flex flex-col lg:flex-row gap-5">

        {/* Experience Section - Always Visible */}
        <div className="w-full pt-10">
          <p className="text-md md:text-xl w-full">
            Heya, yup that’s me 👀. I’m Tolulope Fakoya a cloud engineer with 3+ years of experience building and designing cloud setups (AWS is my main playground, but I’ve explored others too). I also work as a freelance full-stack developer and spend part of my free time geeking out as a pentester. This site itself runs on some of the same tech I enjoy working with. At the end of the day, I just love taking an idea and making it real because like the quote says, “Engineers turn ideas into reality.” That’s exactly what I aim to do.
          </p>
          <div className="flex flex-col md:flex-row gap-5 items-center mt-10">
            <FaGithub /> <Link href="https://github.com/toluhunter" target="_blank"><span className="text-lg">Github</span></Link>
            <FaLinkedin /> <Link href="https://www.linkedin.com/in/tolulope-fakoya/" target="_blank"> <span className="text-lg">linkedin</span></Link>
          </div>
        </div>

        {/* Video/3D Model Placeholder */}
        <div className="flex w-full h-[300px] bg-gray-200 dark:bg-gray-800 mt-10 rounded-lg">
          {/* Placeholder for future content like a 3D model or image */}
        </div>
      </div>

      <div id="blog-detail" className="flex flex-col lg:flex-row mx-auto items-center justify-center w-full gap-8 pt-10">

        {/* Sidebar / Horizontal Bar */}
        <div className="w-full lg:w-auto">
          <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
            {sections.map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`p-2 px-4 text-center rounded-lg border border-callout text-callout transition-colors duration-300 ${activeSection === section
                    ? 'bg-callout text-white'
                    : 'bg-transparent hover:bg-callout/20'
                  }`}
              >
                {section}
              </button>
            ))}
          </div>
        </div>

        {/* Vertical Separator */}
        <div className="hidden lg:block w-px bg-callout self-stretch"></div>

        {/* Content Section */}
        <div className="w-full lg:flex-1">
          {renderContent()}
        </div>
      </div>
    </section>
  );
};

