import { getOutreachEventBySlug } from "@/sanity/queries";
import { PortableText } from "@portabletext/react";
import { CalendarDays, MapPin, Users2, FolderKanban } from "lucide-react";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { image } from "@/sanity/image";

export default async function EventPage({ params }: { params: { slug: string } }) {
  const event = await getOutreachEventBySlug(params.slug);
  if (!event) return notFound();

  return (
    <section className="max-w-6xl mx-auto py-16 px-4 space-y-6">
      <h1 className="text-3xl font-bold max-w-3xl">{event.title}</h1>

      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt={event.title}
          className="rounded-md border border-black w-[399px] object-cover justify-self-center"
        />
      )}

      <div className="space-y-2 text-sm text-gray-700 mt-4 font-semibold">
        {event.date && (
          <p className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-darkOrange" />
            From: {event.date}
          </p>
        )}
        {event.dateto && (
          <p className="flex items-center gap-2">
            <CalendarDays className="w-4 h-4 text-darkOrange" />
            To: {event.dateto}
          </p>
        )}
        {event.venue && (
          <p className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-darkOrange" />
            Venue: {event.venue}
          </p>
        )}
        {event.fundedBy && (
          <p className="flex items-center gap-2">
            <FolderKanban className="w-4 h-4 text-darkOrange" />
            Funded by: {event.fundedBy}
          </p>
        )}
        {event.collaboration && (
          <p className="flex items-center gap-2">
            <Users2 className="w-4 h-4 text-darkOrange" />
            Collaboration: {event.collaboration}
          </p>
        )}
      </div>


      <div className="mt-6 prose max-w-none text-gray-800 text-lg">
      <PortableText
          value={event.description}
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
                  className="w-full rounded-2xl  "
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
    </section>
  );
}
