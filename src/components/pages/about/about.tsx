import { FaGithub, FaLinkedin } from "react-icons/fa"
import Link from 'next/link';
export const AboutSection = () => {

  return (
    <section className="min-h-screen pt-25 w-full container mx-auto flex flex-col items-center overflow-hidden">
      <h1 className="flex w-full justify-center font-bold text-6xl">About Me</h1>
      <div className="flex flex-col lg:flex-row items-center justify-center w-full gap-5 pt-10 px-8 border border-blue-500">

      {/*Details Section*/}
        <div className="flex flex-col w-full gap-10">
        <p className="text-md md:text-xl w-full border border-blue-500">
          Heya, yup that’s me 👀. I’m Tolulope Fakoya a cloud engineer with 3+ years of experience building and designing cloud setups (AWS is my main playground, but I’ve explored others too). I also work as a freelance full-stack developer and spend part of my free time geeking out as a pentester.
This site itself runs on some of the same tech I enjoy working with. At the end of the day, I just love taking an idea and making it real because like the quote says, “Engineers turn ideas into reality.” That’s exactly what I aim to do.
        </p>
 
          <div className="flex flex-col md:flex-row gap-5 items-center">
            <FaGithub/> <Link href="https://github.com/toluhunter" target="_blank"><span className="text-lg">Github</span></Link>
            <FaLinkedin/> <Link href="https://www.linkedin.com/in/tolulope-fakoya/" target="_blank"> <span className="text-lg">linkedin</span></Link>
          </div>

        </div>

      {/*Video Section*/}
        <div className="flex w-[600px] h-[300px] bg-white"></div>
      

      </div>
    </section>
  )

}

