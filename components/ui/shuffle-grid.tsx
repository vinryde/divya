"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { getShuffleImages } from "@/sanity/queries";
import type { ShuffleImage } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image"; // Make sure you have this utility
import { LiquidButton } from "../liquid-glass-button";

export const ShuffleHero = () => {
  return (
    <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      <div>
        
        <h3 className="text-4xl md:text-6xl font-semibold text-foreground">
         Research, Reach, and Reflection
        </h3>
        <p className="text-base md:text-lg text-muted-foreground my-4 md:my-6">
         Through purposeful research, wide-reaching collaboration, and critical reflection, we strive to transform education. These moments highlight our ongoing commitment to inclusive practices, global dialogue, and meaningful educational change.
        </p>
        
       
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = <T,>(array: T[]): T[] => {
  let currentIndex = array.length;
  let randomIndex: number;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }
  return array;
};

const ShuffleGrid = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const [images, setImages] = useState<ShuffleImage[]>([]);
  const [squares, setSquares] = useState<React.ReactElement[]>([]);


  useEffect(() => {
    const loadImages = async () => {
      const data = await getShuffleImages();
      setImages(data);
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      shuffleSquares();
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [images]);

  const shuffleSquares = () => {
    const shuffled = shuffle(images).slice(0, 16); // Cap to 16 for the grid
    const newSquares = shuffled.map((img, i) => (
      <motion.div
        key={img._id}
        layout
        transition={{ duration: 1.5, type: "spring" }}
        className="w-full h-full rounded-md overflow-hidden bg-muted"
        style={{
          backgroundImage: `url(${urlFor(img.image).url()})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        aria-label={img.image.alt || `Shuffle image ${i + 1}`}
      />
    ));
    setSquares(newSquares);

    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-3 grid-rows-3 md:h-[450px] sm:h-[350px]  gap-1">
      {squares}
    </div>
  );
};
