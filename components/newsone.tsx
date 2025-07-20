"use client";

import { useEffect, useState } from "react";
import { getNews } from "@/sanity/queries";
import { NewsItem } from "@/sanity/types";
import { CardOne } from "@/components/ui/cardone";
import Link from "next/link";

const ITEMS_PER_PAGE = 3;

const NewsSectionOne = () => {
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
        <h2 className="text-3xl font-bold mb-2">Latest News</h2>
        <p className="text-gray-600 mb-10">
          Stay informed with our latest news updates, announcements, and press releases. Explore the highlights and insights shaping our journey and milestones.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:px-14 sm:px-1">
        {visibleNews.map((item) => (
          <CardOne
            key={item._id}
            title={item.headline}
            description={item.subHeading ?? ""}
            featuredImage={item.imageUrl}
            linkUrl={`/news/${item.slug.current}`}
            variant="dots"
          />
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

export default NewsSectionOne;
