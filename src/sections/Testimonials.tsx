import SectionHeader from "@/components/SectionHeader";

import { testimonials } from "@/consts/TestimonialsItems";
import TestimonialsCard from "@/components/TestimonialsCard";

export const TestimonialsSection = () => {
  return (
    <section className="py-16 w-full px-4">
      <div className="container">
        <SectionHeader
          eyebrow="Happy Clients"
          title="What Clients say about Me"
          description=" Dont Just take my word for it . See what my clients hay to say about my
        work ."
        />

        <div className="mt-16 lg:mt-24 flex overflow-x-clip [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
          <div className="flex flex-none gap-8">
            {testimonials.map((testimonial) => (
              <TestimonialsCard
                key={testimonial.name}
                testimonial={testimonial}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
