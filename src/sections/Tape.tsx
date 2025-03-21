import { TapeWords } from "@/consts/TapeWords";
import { IoIosStar } from "react-icons/io";
export const TapeSection = () => {
  return (
    <section className="py-16 w-full lg:py-24">
      <div className="bg-gradient-to-r from-emerald-300 to-sky-400 overflow-x-clip -rotate-3  ">
        <div className="flex w-full justify-center [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] ">
          <div className="flex flex-none gap-4 py-3  ">
            {TapeWords.map((word) => (
              <div
                key={word}
                className="inline-flex gap-4 items-center justify-center"
              >
                <span className="text-gray-900 uppercase font-extrabold text-sm">
                  {word}
                </span>
                <IoIosStar className="size-5 text-gray-900 -rotate-6" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
