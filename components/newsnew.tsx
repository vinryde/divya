'use client';

import { useEffect, useState } from 'react';
import { getNews } from '@/sanity/queries';
import { NewsItem } from '@/sanity/types';
import CircularGallerytwo from '@/components/ui/circularcards';

const NewsCarousel = () => {
  const [items, setItems] = useState<{ image: string; text: string; slug: string }[]>([]);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const data: NewsItem[] = await getNews();
        const formattedItems = data.map((news) => ({
          image: news.imageUrl || '',
          text: news.headline,
          slug: news.slug.current,
        }));
        setItems(formattedItems);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  return (
    <section className='py-16 px-6 sm:px-4'>
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-center">Latest News</h2>
        <p className="text-gray-600 mb-10 max-w-2xl text-center">
          Stay informed with our latest news updates, announcements, and press releases. Explore the highlights and insights shaping our journey and milestones.
        </p>
      </div>

      <div className="flex w-full h-[80vh] justify-center items-center">
        <div className="w-full max-w-screen-xl mx-auto h-[80vh] overflow-hidden relative border-none shadow-none">
          <CircularGallerytwo
            items={items}
            bend={3}
            textColor="#000000"
            borderRadius={0.05}
          />
        </div>
      </div>
    </section>
  );
};

export default NewsCarousel;
