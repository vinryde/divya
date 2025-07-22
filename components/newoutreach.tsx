"use client";

import { useEffect, useState } from "react";
import { getOutreachEvents } from "@/sanity/queries";
import { OutreachEvent } from "@/sanity/types";
import { FlippingCard } from "@/components/ui/flipping-card";
import { LiquidButton } from "./liquid-glass-button";
import Link from "next/link";

const ITEMS_PER_PAGE = 6;

export default function OutreachFlippingCards() {
  const [events, setEvents] = useState<OutreachEvent[]>([]);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getOutreachEvents();
      setEvents(data);
    };
    fetchData();
  }, []);

  const visibleEvents = events.slice(0, visibleCount);
  const hasMore = visibleCount < events.length;

  const loadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <section className="py-16 px-6 flex flex-col items-center gap-4">
      <h2 className="text-3xl font-semibold mb-2">Outreach Events</h2>
      <p className="text-lg text-gray-600 mb-8 max-w-3xl text-center">
        Outreach initiatives designed to uplift communities through targeted education on sustainability, technology use, and social well-being.
      </p>

      <div className="flex gap-4 flex-wrap justify-center p-8">
        {visibleEvents.map((event) => (
          <FlippingCard
            key={event._id}
            width={400}
            frontContent={<OutreachCardFront event={event} />}
            backContent={<OutreachCardBack event={event} />}
            className="lg:mx-0 sm:mx-4 sm:w-[350px] lg:w-[400px]"
          />
        ))}
      </div>

      {hasMore && (
        <button
          onClick={loadMore}
          className="mt-6 px-6 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-100"
        >
          Load More Events
        </button>
      )}
    </section>
  );
}

interface OutreachCardFrontProps {
  event: OutreachEvent;
}

function OutreachCardFront({ event }: OutreachCardFrontProps) {
  return (
    <div className="flex flex-col h-full w-full p-4">
      {event.imageUrl && (
        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-auto object-cover flex-grow min-h-0 rounded-md"
        />
      )}
      <div className="p-2">
        <h3 className="text-base font-semibold mt-2">{event.title}</h3>
        <hr className="w-full bg-black-" />

        {event.fundedBy && (
          <p className="text-[11.5px] text-muted-foreground mt-3">
            <strong>Funded By:</strong> {event.fundedBy}
          </p>
        )}

        {event.collaboration && (
          <p className="text-[11.5px] text-muted-foreground">
            <strong>Collaboration:</strong> {event.collaboration}
          </p>
        )}

        {event.venue && (
          <p className="text-[11.5px] text-muted-foreground">
            <strong>Venue:</strong> {event.venue}
          </p>
        )}

        {event.date && (
          <p className="text-[11.5px] text-muted-foreground">
            <strong>Date:</strong> {event.date}
            {event.dateto && ` to ${event.dateto}`}
          </p>
        )}
      </div>
    </div>
  );
}

interface OutreachCardBackProps {
  event: OutreachEvent;
}

function OutreachCardBack({ event }: OutreachCardBackProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full p-6">
      {event.shortdescription && (
        <p className="text-[13.5px] mt-2 text-muted-foreground text-center">
          {event.shortdescription}
        </p>
      )}
      <Link
        href={`/events/${event.slug.current}`}
        className="mt-6 bg-foreground text-background px-4 py-2 rounded-md text-[13.5px] w-min whitespace-nowrap h-8 flex items-center justify-center"
      >
        <LiquidButton size={"sm"}>View Details</LiquidButton>
      </Link>
    </div>
  );
}
