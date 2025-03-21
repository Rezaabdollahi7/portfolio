import React from "react";
import Image from "next/image";

import { TestimonialsType } from "@/types/TestimonialType";

interface TestimonialsCardProps {
  testimonial: TestimonialsType;
}

const TestimonialsCard: React.FC<TestimonialsCardProps> = ({ testimonial }) => {
  return (
    <div
      key={testimonial.name}
      className="bg-gray-800 max-w-xs rounded-3xl p-6 relative overflow-hidden z-0 border border-white/20"
    >
      {/* FIX */}
      {/* <div
                className="absolute inset-0 opacity-10 -z-10"
                style={{ backgroundImage: `url(${Myimg.src})` }}
              ></div> */}
      <div className="flex gap-4 items-center">
        <div className="img-wrapper size-14 bg-gray-700 inline-flex items-center justify-center rounded-full">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            className="max-h-full "
          />
        </div>
        <div className="detsils">
          <p className="font-semibold">{testimonial.name}</p>
          <p className="text-sm text-white/40">{testimonial.position}</p>
        </div>
      </div>
      <p className="mt-4 text-sm">{testimonial.text}</p>
    </div>
  );
};

export default TestimonialsCard;
