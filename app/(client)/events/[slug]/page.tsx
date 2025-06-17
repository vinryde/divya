import { getOutreachEventBySlug } from "@/sanity/queries";
import { PortableText } from "@portabletext/react";
import { CalendarDays, MapPin, Users2, FolderKanban } from "lucide-react";
import { notFound } from "next/navigation";

export default async function EventPage({ params }: { params: { slug: string } }) {
  const event = await getOutreachEventBySlug(params.slug);
  if (!event) return notFound();

  return (
    <section className="max-w-3xl mx-auto py-16 px-4 space-y-6">
      <h1 className="text-3xl font-bold">{event.title}</h1>

      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt={event.title}
          className="rounded-md border border-black w-[399px] object-cover"
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
        <PortableText value={event.description} />
      </div>
    </section>
  );
}
