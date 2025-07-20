"use client";

import { useEffect, useState } from "react";
import { getNews } from "@/sanity/queries";
import { NewsItem } from "@/sanity/types";
import Link from "next/link";
import { CalendarDays } from "lucide-react";

const ITEMS_PER_PAGE = 3;

const NewsSection = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    getNews().then(setNewsItems);
  }, []);

  const visibleNews = newsItems.slice(0, visibleCount);
  const hasMore = visibleCount < newsItems.length;

  const loadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <section className="py-16 px-6 sm:px-4">
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-2 text-center">Latest News</h2>
        <p className="text-gray-600 mb-10 max-w-2xl text-center">
          Stay informed with our latest news updates, announcements, and press releases. Explore the highlights and insights shaping our journey and milestones.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {visibleNews.map((item) => (
          <div key={item._id} className="border rounded-lg p-6 shadow-sm max-w-2xl w-full">
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.headline}
                className="rounded-lg mb-4 w-full object-contain max-h-96"
              />
            )}

            {item.date && (
              <div className="flex items-center gap-2 text-darkOrange font-semibold text-lg mb-2">
                <CalendarDays className="w-4 h-4" />
                {new Date(item.date).toLocaleDateString()}
              </div>
            )}

            <hr className="rounded-full bg-white shadow-md border border-gray-200 mb-4 w-full" />

            <h3 className="text-xl font-semibold">{item.headline}</h3>
            {item.subHeading && (
              <p className="text-sm text-gray-600">{item.subHeading}</p>
            )}

            <div className="mt-4 flex gap-4 justify-self-stretch">
              <Link
                href={`/news/${item.slug.current}`}
                className="text-sm px-6 py-2 rounded-md shadow border text-gray-800 hover:bg-gray-100 transition duration-300 w-full text-center font-semibold"
              >
                Read More
              </Link>

              {item.link && (
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 border border-orange-500 text-orange-600 rounded-full text-sm hover:bg-orange-50"
                >
                  External
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {hasMore && (
        <div className="text-center mt-10">
          <button
            onClick={loadMore}
            className="px-6 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-100"
          >
            Load More News
          </button>
        </div>
      )}
    </section>
  );
};

export default NewsSection;
