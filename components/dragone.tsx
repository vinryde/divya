"use client";

import { useEffect, useState } from "react";
import {
  GridBody,
  DraggableContainer,
  GridItem,
} from "@/components/ui/infinite-drag-scroll";
import { getDragImages } from "@/sanity/queries";
import type { DragImage } from "@/sanity/types";
import { urlFor } from "@/sanity/lib/image";

const DragOne = () => {
  const [images, setImages] = useState<DragImage[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getDragImages();
        console.log("Fetched drag images:", data); 
        setImages(data);
      } catch (error) {
        console.error("Error fetching drag images:", error);
      }
    };

    fetchImages();
  }, []);

  return (
    <DraggableContainer variant="masonry">
      <GridBody>
        {images.map((image, index) => (
          <GridItem
            key={image._id}
            className="relative h-54 w-36 md:h-96 md:w-64"
          >
            <img
              src={urlFor(image.image).toString()}
              alt={image.image.alt || "Sanity Image"}
              className="pointer-events-none absolute h-full w-full object-cover"
            />
          </GridItem>
        ))}
      </GridBody>
    </DraggableContainer>
  );
};

export { DragOne };
