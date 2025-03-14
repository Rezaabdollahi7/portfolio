import memojiImg from "@/assets/images/memoji-computer.png";
import Image from "next/image";
import grainImg from "@/assets/images/grain.jpg";
import { BsStars } from "react-icons/bs";
import HeroOrbet from "@/components/HeroOrbet";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { PiStarFourFill } from "react-icons/pi";
import { WiStars } from "react-icons/wi";
export const HeroSection = () => {
  return (
    <div className="py-32 md:py-48 lg:py-60 relative z-0  w-full overflow-x-clip">
      <div className="absolute inset-0 -z-10 ">
        <div
          className="absolute inset-0 -z-30 opacity-5"
          style={{ backgroundImage: `url(${grainImg.src})` }}
        ></div>
        <div className="size-[720px] hero-ring"></div>
        <div className="size-[920px] hero-ring"></div>
        <div className="size-[1120px] hero-ring"></div>
        <div className="size-[1320px] hero-ring"></div>
        <div className="wrapper hidden md:block">
          <HeroOrbet size={850} rotation={-85}>
            <BsStars className="size-28 text-emerald-300 rotate-[-4deg]" />
          </HeroOrbet>
          <HeroOrbet size={250} rotation={50}>
            <WiStars className="size-12 text-emerald-300 rotate-45" />
          </HeroOrbet>
          <HeroOrbet size={790} rotation={130}>
            <PiStarFourFill className="size-6 text-yellow-300  rotate-[47deg]" />
          </HeroOrbet>
          <HeroOrbet size={700} rotation={180}>
            <BsStars className="size-10 text-emerald-300/50" />
          </HeroOrbet>
        </div>
      </div>

      <div className="container px-4 md:px-0 ">
        <div className="flex flex-col items-center">
          <Image
            src={memojiImg}
            className="size-[100px]"
            alt="person behing laptop "
          />
          <div className="bg-gray-950 border mt-2 border-gray-900 px-4 py-1.5 items-center gap-4 rounded-lg  inline-flex">
            <div className="bg-green-500 size-2.5 rounded-full"></div>
            <div className="text-sm font-semibold">
              Available For New Projects
            </div>
          </div>
          <div className="max-w-lg mx-auto">
            <h1 className="font-serif text-3xl md:text-5xl text-center mt-8 tracking-wide ">
              Bulding Exceptional User Experiences
            </h1>
            <p className="mt-4 text-center text-white/60 md:text-lg ">
              I Specialize in tranformaing designs into functional ٬
              high-performing web applications. Lets discuss your next project.
            </p>
          </div>
          <div>
            <div className="flex flex-col items-center mt-8 gap-4 md:flex-row justify-center">
              <button className="inline-flex items-center gap-2 border border-white/15 px-6 h-12 rounded-xl">
                <span className="font-semibold">Explore My Work</span>
                <MdKeyboardDoubleArrowDown className="size-5 animate-bounce  [animation-duration:1.5s]" />
              </button>
              <button className="inline-flex items-center gap-2 border border-white/15 bg-white px-6 h-12 rounded-xl  text-gray-900">
                <span>👋</span>
                <span className="font-semibold">Lets Connect</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
