"use client";

import React from "react";
import { TypewriterEffect } from "./ui/typewriter-effect";

type SectionTitleProps = {
  words: { text: string }[];
  description: string;
  className?: string;
};

export function SectionIntro({ words, description, className = "" }: SectionTitleProps) {
  return (
    <div className={`flex flex-col items-center justify-center my-4 sm:mt-6 ${className}`}>
      <TypewriterEffect words={words} className="sm:text-2xl" />
      <p className="text-neutral-600 dark:text-neutral-200 text-xs sm:text-base mt-4 text-center max-w-4xl">
        {description}
      </p>
    </div>
  );
}
