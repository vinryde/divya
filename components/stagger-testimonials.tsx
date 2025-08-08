"use client";

import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, MailIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { getAllAlumni } from "@/sanity/queries";
import type { AlumniMember } from "@/sanity/types";

const SQRT_5000 = Math.sqrt(5000);

interface Testimonial {
  tempId: number;
  testimonial: string;
  by: string;
  imgSrc: string;
  email?: string;
}

interface TestimonialCardProps {
  position: number;
  testimonial: Testimonial;
  handleMove: (steps: number) => void;
  cardSize: number;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  position,
  testimonial,
  handleMove,
  cardSize,
}) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-6 transition-all duration-500 ease-in-out flex flex-col",
        isCenter
          ? "z-10 bg-neutral-900 text-neutral-50 border-neutral-900 dark:bg-neutral-50 dark:text-neutral-900 dark:border-neutral-50"
          : "z-0 bg-white text-neutral-950 border-neutral-200 hover:border-neutral-900/50 dark:bg-neutral-950 dark:text-neutral-50 dark:border-neutral-800 dark:hover:border-neutral-50/50"
      )}
      style={{
        width: cardSize,
        minHeight: 360, // prevents very short cards
        maxWidth: "90vw", // mobile safe
        clipPath:
          "polygon(50px 0%, calc(100% - 50px) 0%, 100% 50px, 100% 100%, calc(100% - 50px) 100%, 50px 100%, 0 100%, 0 0)",
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
        `,
        boxShadow: isCenter ? "0px 8px 4px hsl(var(--border))" : "0px transparent",
      }}
    >
      {/* Side tab decoration */}
      <span
        className="absolute block origin-top-right rotate-45 bg-neutral-200 dark:bg-neutral-800"
        style={{
          right: -2,
          top: 48,
          width: SQRT_5000,
          height: 2,
        }}
      />

      {/* Image */}
      <img
        src={testimonial.imgSrc}
        alt={testimonial.by}
        className="mb-4 h-28 w-28 mx-auto rounded-full bg-neutral-100 object-cover object-top dark:bg-neutral-800"
      />

      {/* Email Button */}
      {testimonial.email && (
        <a
          href={`mailto:${testimonial.email}`}
          onClick={(e) => e.stopPropagation()}
          className="mb-3 inline-flex self-center items-center gap-2 rounded-full bg-black px-3 py-1 text-xs font-medium text-white transition hover:bg-neutral-300 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700"
        >
          <MailIcon size={14} />
          Email
        </a>
      )}

      {/* Description */}
      <h3
        className={cn(
          "text-sm md:text-md font-medium flex-grow text-center leading-relaxed",
          isCenter ? "text-neutral-50 dark:text-neutral-900" : "text-neutral-950 dark:text-neutral-50"
        )}
      >
        {testimonial.testimonial}
      </h3>

      {/* Author */}
      <p
        className={cn(
          "mt-4 text-xs md:text-sm italic text-center",
          isCenter ? "text-neutral-50/80 dark:text-neutral-900/80" : "text-neutral-500 dark:text-neutral-400"
        )}
      >
        - {testimonial.by}
      </p>
    </div>
  );
};

export const AlumniTestimonials: React.FC = () => {
  const [cardSize, setCardSize] = useState(365);
  const [testimonialsList, setTestimonialsList] = useState<Testimonial[]>([]);

  const handleMove = (steps: number) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      if (window.innerWidth < 640) {
        setCardSize(280); // smaller for phones
      } else if (window.innerWidth < 1024) {
        setCardSize(320); // tablets
      } else {
        setCardSize(365); // desktops
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const alumni: AlumniMember[] = await getAllAlumni();

      const formatted = alumni.map((person, index) => ({
        tempId: index,
        testimonial: person.description || "No description provided.",
        by: `${person.name}${person.designation ? ", " + person.designation : ""}`,
        imgSrc: person.imageUrl || "/placeholder.jpg",
        email: person.email || "",
      }));

      setTestimonialsList(formatted);
    };

    fetchData();
  }, []);

  return (
    <div
      className="relative w-full overflow-hidden bg-neutral-100/30 dark:bg-neutral-800/30"
      style={{ height: 600 }}
    >
      {testimonialsList.map((testimonial, index) => {
        const position =
          testimonialsList.length % 2
            ? index - (testimonialsList.length + 1) / 2
            : index - testimonialsList.length / 2;

        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}

      {/* Navigation */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
        <button
          onClick={() => handleMove(-1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-white border-2 border-neutral-200 hover:bg-neutral-900 hover:text-neutral-50 dark:bg-neutral-950 dark:border-neutral-800 dark:hover:bg-neutral-50 dark:hover:text-neutral-900",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 dark:focus-visible:ring-neutral-300"
          )}
        >
          <ChevronLeft />
        </button>
        <button
          onClick={() => handleMove(1)}
          className={cn(
            "flex h-14 w-14 items-center justify-center text-2xl transition-colors",
            "bg-white border-2 border-neutral-200 hover:bg-neutral-900 hover:text-neutral-50 dark:bg-neutral-950 dark:border-neutral-800 dark:hover:bg-neutral-50 dark:hover:text-neutral-900",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 dark:focus-visible:ring-neutral-300"
          )}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
};
