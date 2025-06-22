"use client";
import { TypewriterEffect } from "./ui/typewriter-effect";
export function SectionTitle() {
  const words = [
    {
      text: "Academic",
    },
    {
      text: "Foundations",
    },
    {
      text: "For",
    },
    {
      text: "Future",
    },
    {
      text: "Educators",
    },
  ];
  return (
    <div className="flex flex-col items-center justify-center sm:mt-6 ">
      
      <TypewriterEffect words={words} className="sm:text-2xl" />
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base mt-4 text-center max-w-4xl ">
      At Senan Education Lab, academic engagement goes beyond textbooks—
        blending theory, research, and real-world relevance. Our programs are
        designed to empower educators with the knowledge, tools, and critical
        thinking needed to lead transformative learning in diverse educational
        settings.
      </p>
    </div>
  );
}
