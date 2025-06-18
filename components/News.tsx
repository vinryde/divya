"use client";

import { useEffect, useState } from "react";
import { getNews } from "@/sanity/queries";
import { NewsItem } from "@/sanity/types";
import Link from "next/link";
import { CalendarDays } from "lucide-react";

const NewsSection = () => {
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);

  useEffect(() => {
    getNews().then(setNewsItems);
  }, []);

  return (
    <section className="py-16 px-6">
      <div className="mb-12 text-center max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold mb-2 text-center">Latest News</h2>
      <p className="text-gray-600 mb-10 max-w-2xl text-center">
        Stay informed with our latest news updates, announcements, and press releases. Explore the highlights and insights shaping our journey and milestones.
      </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {newsItems.map((item) => (
          <div key={item._id} className="border rounded-lg p-4 shadow-sm">
            

            {/* IMAGE */}
            {item.imageUrl && (
              <img
                src={item.imageUrl}
                alt={item.headline}
                className="rounded-md mb-4 w-full object-cover max-h-96"
              />
            )}
            {/* DATE */}
            {item.date && (
              <div className="flex items-center gap-2 text-darkOrange font-semibold text-lg mb-2">
                <CalendarDays className="w-4 h-4" />
                {new Date(item.date).toLocaleDateString()}
              </div>
            )}

            <hr className="rounded-full bg-white shadow-md border border-gray-200  mb-4 w-full" />

            {/* TEXT CONTENT */}
            <h3 className="text-xl font-semibold">{item.headline}</h3>
            {item.subHeading && (
              <p className="text-sm text-gray-600">{item.subHeading}</p>
            )}

            {/* ACTIONS */}
            <div className="mt-4 flex gap-4  justify-self-stretch">
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
    </section>
  );
};

export default NewsSection;
