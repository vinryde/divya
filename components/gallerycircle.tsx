'use client';

import { useEffect, useState } from 'react';
import { getDragImages } from '@/sanity/queries';
import { DragImage } from '@/sanity/types';
import { urlFor } from '@/sanity/lib/image';
import Component from '@/components/ui/circular-gallery';

const GalleryOne = () => {
  const [items, setItems] = useState<{ image: string }[]>([]);

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const data: DragImage[] = await getDragImages();
        const formattedItems = data.map((img) => ({
          image: urlFor(img.image).url(),
        }));
        setItems(formattedItems);
      } catch (error) {
        console.error('Error fetching drag images:', error);
      }
    };

    fetchImages();
  }, []);

  return (
    <section>
         <div className="flex flex-col text-center space-y-4 mb-2 ">
          <p className="text-sm font-medium tracking-widest text-muted-foreground mx-auto">
          From Research Rooms to Real-World Reach
          </p>
          <h2 className="lg:text-[3.5rem] sm:text-2xl font-bold tracking-tight leading-none mx-auto">
          Snapshots of Our Shared Impact
          </h2>
        </div>
    <div className="flex w-full h-screen justify-center items-center">
      <div className="w-full max-w-screen-xl mx-auto h-[80vh] overflow-hidden relative border-none shadow-none">
        <Component
          items={items}
          bend={3}
          textColor="#ffffff"
          borderRadius={0.05}
        />
      </div>
    </div>
    
  </section>
  );
};

export { GalleryOne };
