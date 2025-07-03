"use client";

import React, { useEffect, useState } from "react";
import { getOutreachEvents } from "@/sanity/queries";
import type { OutreachEvent } from "@/sanity/types";
import { ShineBorder } from "@/components/magicui/shine-border";
import Link from "next/link";

const EventSection = () => {
  const [events, setEvents] = useState<OutreachEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const data = await getOutreachEvents();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  return (
    <section className="py-16 px-6 flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold">Outreach Events</h1>
      <p className="max-w-3xl text-center">
      Outreach initiatives designed to uplift communities through targeted education on sustainability, technology use, and social well-being.
          </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-7xl">
        
        {events.length === 0 ? (
          <p className="text-gray-500">No events available.</p>
        ) : (
          events.map((event) => (
            <div
              key={event._id}
              className="bg-white rounded-md shadow border p-6 max-w-2xl w-full"
            >
              
              <h2 className="text-xl font-semibold text-gray-900">
                {event.title}
              </h2>

              <p className="text-sm text-gray-700 mt-1">
                <strong>Funded By:</strong> {event.fundedBy || "N/A"}
                {event.collaboration && (
                  <>
                    {" "}
                    • <strong>Collab:</strong> {event.collaboration}
                  </>
                )}
              </p>

              <p className="text-sm text-gray-600 mt-1">
                <strong>Date:</strong>{" "}
                {event.date || "TBD"}
                {event.dateto && ` to ${event.dateto}`} •{" "}
                <strong>Venue:</strong> {event.venue || "TBD"}
              </p>

              {event.imageUrl && (
  <div
    className="mt-4 rounded-md shadow border p-1"
    style={{
      borderRadius: "10px",
      width: "100%",
      height: "300px",
      overflow: "hidden", // Ensure cropped image doesn't overflow
    }}
  >
    <img
      src={event.imageUrl}
      alt={event.title}
      className="w-full h-full object-cover rounded-[8px]"
    />
  </div>
)}

<div className="flex justify-self-stretch mt-4">
<Link
  href={`/events/${event.slug.current}`}
  className="text-sm px-6 py-2 rounded-md shadow border text-gray-800 hover:bg-gray-100 transition duration-300 w-full text-center"
  style={{ borderRadius: "20px" }}>
    Outreach
  </Link>
</div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default EventSection;
