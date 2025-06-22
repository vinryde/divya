import React from "react";
import { EvervaultCard, Icon } from "@/components/ui/evervault-card";

const cardData = [
  {
    text: "Academic Writing",
    description: "Builds clarity and structure in formal academic writing and research documentation.",
    buttonText: "Learn More",
  },
  {
    text: "Expository Writing",
    description: "Develops skills for logically presenting ideas and arguments in written form.",
    buttonText: "Learn More",
  },
  {
    text: "Promoting Ecofriendly Practices",
    description: "Encourages sustainable thinking and behavior in personal and educational environments.",
    buttonText: "Learn More",
  },
  
];

export function EvervaultCardTwo() {
  return (
    <section className="py-16 px-6">
      <div className="mb-12 text-center max-w-6xl px-4 mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-left">Self Development Courses</h2>
      <p className="text-gray-600 mb-10 max-w-6xl text-left">
      Courses that nurture essential academic and personal skills to help future educators communicate effectively, reflect critically, and promote sustainable practices.
      </p>
      </div>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
      {cardData.map((card, index) => (
        <div
          key={index}
          className="border border-black/[0.2] dark:border-white/[0.2] flex flex-col items-start p-4 relative h-[30rem]"
        >
          {/* Decorative corner icons */}
          <Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
          <Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

          {/* Main interactive card */}
          <EvervaultCard text={card.text} />

          {/* Description */}
          <h2 className="dark:text-white text-black mt-4 text-sm font-light">
            {card.description}
          </h2>

          {/* Button-style tag */}
          <p className="text-sm border font-light dark:border-white/[0.2] border-black/[0.2] rounded-full mt-4 text-black dark:text-white px-2 py-0.5">
            {card.buttonText}
          </p>
        </div>
      ))}
    </div>
    </section>
  );
}
