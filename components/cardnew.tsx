import React from "react";
import { EvervaultCard, Icon } from "@/components/ui/evervault-card";

const cardData = [
  {
    text: "ICT",
    description: "Learn about the digital technologies to enhance pedagogy, learning environments, and educational communication.",
    buttonText: "Learn More",
  },
  {
    text: "Research Methodology",
    description: "Introduces educational research methods, data tools, and academic report writing techniques.",
    buttonText: "Learn More",
  },
  {
    text: "Sociology",
    description: "Examines education’s role in society through cultural, structural, and equity-based lenses.",
    buttonText: "Learn More",
  },
  {
    text: "Higher Education",
    description: "Analyzes higher education policies, institutional frameworks, and emerging academic trends in the world",
    buttonText: "Learn More",
  },
];

export function EvervaultCardDemo() {
  return (
    <section className="py-16 px-6">
      <div className="mb-12 text-center max-w-6xl px-4 mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-left">M.ED Courses</h2>
      <p className="text-gray-600 mb-10 max-w-6xl text-left">
        M.Ed. core courses reflect a progressive curriculum integrating educational technology, research literacy, and social theory—designed to prepare educators for evidence-based, inclusive, and future-ready teaching practice.
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
