import SectionHeader from "@/components/SectionHeader";
import bookImage from "@/assets/images/book-cover.png";
import Image from "next/image";
import toolboxItems from "@/consts/ToolboxItems";
import mapImg from "@/assets/images/map.png";
import smileEmoji from "@/assets/images/memoji-smile.png";
import { Hobbits } from "@/consts/Hobbits";
import AboutCardHeader from "@/components/AboutCardHeader";
import ToolboxItems from "@/components/ToolboxItems";

export const AboutSection = () => {
  return (
    <section className="py-20 px-4">
      <SectionHeader
        description="Learn More Who I am , what I do , and what inspires Me ."
        eyebrow="About Me"
        title="A Glimpse Into My World"
      />
      <div>
        {/* books */}
        <div className="card mt-20 flex flex-col h-[320px] bg-gray-800   rounded-3xl p-6 relative overflow-hidden z-0 border border-white/20">
          <AboutCardHeader
            title="My Reads"
            desc="Explore the Books shaping my perspectives."
          />
          <div className="w-40 mx-auto mt-8">
            <Image src={bookImage} alt="Atomic-habit-book" />
          </div>
        </div>

        {/* toolbox */}
        <div className="card h-[320px] bg-gray-800  rounded-3xl p-6 relative overflow-hidden z-0 border border-white/20">
          <AboutCardHeader
            title="My Toolbox"
            desc=" Explore the Technologies and tools i use to craft expectional
              digital experiences ."
          />
          <div className="items-wrapper">
        <ToolboxItems items={toolboxItems}/>
          </div>
        </div>
        {/*  Beyond the Code */}
        <div className="card bg-gray-800  rounded-3xl p-6 relative overflow-hidden z-0 border border-white/20">
      
          <AboutCardHeader
            title="Beyond the Code"
            desc="Explore my interest and hobbies beyond the digital realm"
          />
          <div className="hobbits">
            {Hobbits.map((hobbit) => (
              <div key={hobbit.id}>
                <span>{hobbit.title}</span>
                <span>{hobbit.emoji}</span>
              </div>
            ))}
          </div>
        </div>

        {/* map */}
        <div className="card">
          <Image src={mapImg} alt="map" />
          <Image src={smileEmoji} alt="smile-emoji" />
        </div>
      </div>
    </section>
  );
};
