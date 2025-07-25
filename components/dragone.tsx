'use client';
import {
  ContainerScrollAnimation,
  ContainerScrollInsetX,
  ContainerScrollScale,
  ContainerScrollTranslate,
} from '@/components/ui/scroll-trigger-animations';
import { useEffect, useState } from 'react';
import { getDragImages } from '@/sanity/queries';
import { DragImage } from '@/sanity/types';
import { urlFor } from "@/sanity/lib/image"; 

export default function DemoOne() {
  const [images, setImages] = useState<DragImage[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data = await getDragImages();
        console.log('Fetched drag images:', data);
        setImages(data);
        console.log('Number of images:', data.length);
      } catch (error) {
        console.error('Error fetching drag images:', error);
      }
    };

    fetchImages();
  }, []);

  // Divide fetched images into 3 roughly equal columns
  const colSize = Math.ceil(images.length / 3);
  const images1 = images.slice(0, colSize);
  const images2 = images.slice(colSize, colSize * 2);
  const images3 = images.slice(colSize * 2);

  return (
    <ContainerScrollAnimation className="overflow-hidden">
      <ContainerScrollTranslate className="h-dvh relative">
        <ContainerScrollInsetX className="h-full relative">
          <ContainerScrollScale className="flex bg-secondary gap-2 overflow-hidden px-6">
            <ContainerScrollTranslate
              yRange={['0%', '-10%']}
              className="flex flex-col gap-2"
            >
              {images1.map((img) => (
                <img
                  key={img._id}
                  src={urlFor(img.image).url()}
                  alt={img.image.alt || 'gallery item'}
                  className="aspect-[4/2.5] inline-block align-middle h-auto max-h-full w-full object-cover"
                />
              ))}
            </ContainerScrollTranslate>

            <ContainerScrollTranslate
              yRange={['-60%', '-10%']}
              className="flex mt-[-20%] relative flex-col gap-2"
            >
              {images2.map((img) => (
                <img
                  key={img._id}
                  src={urlFor(img.image).url()}
                  alt={img.image.alt || 'gallery item'}
                  className="aspect-[4/2.5] inline-block align-middle h-auto max-h-full w-full object-cover"
                />
              ))}
            </ContainerScrollTranslate>

            <ContainerScrollTranslate
              yRange={['0%', '-10%']}
              className="hidden md:flex flex-col gap-2"
            >
              {images3.map((img) => (
                <img
                  key={img._id}
                  src={urlFor(img.image).url()}
                  alt={img.image.alt || 'gallery item'}
                  className="aspect-[4/2.5] inline-block align-middle h-auto max-h-full w-full object-cover"
                />
              ))}
            </ContainerScrollTranslate>
          </ContainerScrollScale>
        </ContainerScrollInsetX>
      </ContainerScrollTranslate>
    </ContainerScrollAnimation>
  );
}
