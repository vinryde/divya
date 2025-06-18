import { getNewsBySlug } from "@/sanity/queries";
import { PortableText } from "@portabletext/react";
import { image } from "@/sanity/image";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function NewsPage({ params }: { params: { slug: string } }) {
  const news = await getNewsBySlug(params.slug);
  if (!news) return notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 py-20 space-y-6">
      <h1 className="text-3xl font-bold">{news.headline}</h1>
      {news.subHeading && <h2 className="text-md text-gray-600">{news.subHeading}</h2>}
      {news.date && <p className="text-sm text-gray-500">{news.date}</p>}

      {news.imageUrl && (
        <img
          src={news.imageUrl}
          alt={news.headline}
          className="rounded-xl border w-full h-auto max-h-[500px] object-cover"
        />
      )}

      <div className="prose prose-gray mt-6">
        <PortableText
          value={news.description}
          components={{
            block: {
              normal: ({ children }) => (
                <p className="my-3 text-base/8 first:mt-0 last:mb-0">{children}</p>
              ),
              h2: ({ children }) => (
                <h2 className="mb-2 mt-4 text-2xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
                  {children}
                </h2>
              ),
              h3: ({ children }) => (
                <h3 className="mb-10 mt-12 text-xl/8 font-medium tracking-tight text-gray-950 first:mt-0 last:mb-0">
                  {children}
                </h3>
              ),
              blockquote: ({ children }) => (
                <blockquote className="my-10 border-l-2 border-l-gray-300 pl-6 text-base/8 text-gray-950 first:mt-0 last:mb-0">
                  {children}
                </blockquote>
              ),
            },
            types: {
              image: ({ value }) => (
                <Image
                  alt={value.alt || ""}
                  src={image(value).width(2000).url()}
                  className="w-full rounded-2xl"
                  width={1400}
                  height={1000}
                />
              ),
              separator: ({ value }) => {
                switch (value.style) {
                  case "line":
                    return <hr className="my-4 border-t border-gray-200" />;
                  case "space":
                    return <div className="my-4" />;
                  default:
                    return null;
                }
              },
            },
            list: {
              bullet: ({ children }) => (
                <ul className="list-disc pl-4 text-base/8 marker:text-gray-400">{children}</ul>
              ),
              number: ({ children }) => (
                <ol className="list-decimal pl-4 text-base/8 marker:text-gray-400">{children}</ol>
              ),
            },
            listItem: {
              bullet: ({ children }) => (
                <li className="my-2 pl-2 has-[br]:mb-8">{children}</li>
              ),
              number: ({ children }) => (
                <li className="my-2 pl-2 has-[br]:mb-8">{children}</li>
              ),
            },
            marks: {
              strong: ({ children }) => (
                <strong className="font-semibold text-gray-950">{children}</strong>
              ),
              code: ({ children }) => (
                <>
                  <span aria-hidden>`</span>
                  <code className="text-[15px]/8 font-semibold text-gray-950">{children}</code>
                  <span aria-hidden>`</span>
                </>
              ),
              link: ({ value, children }) => (
                <Link
                  href={value.href}
                  className="font-medium text-gray-950 underline decoration-gray-400 underline-offset-4 data-[hover]:decoration-gray-600"
                >
                  {children}
                </Link>
              ),
            },
          }}
        />
      </div>

      {news.link && (
        <a
          href={news.link}
          className="inline-block mt-6 px-6 py-2 bg-orange-600 text-white rounded-full text-sm"
          target="_blank"
          rel="noopener noreferrer"
        >
          External Link
        </a>
      )}
    </main>
  );
}
