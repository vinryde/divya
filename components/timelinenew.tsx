"use client";

import React from "react";
import { Timeline } from "@/components/ui/timeline";

export function TimelineDemo() {
  const data = [
    {
      title: "2000",
      content: (
        <div>
          <h2 className="text-sm md:text-base font-semibold mb-1">Gold Medallist</h2>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
            1st Rank, Masters in Physics, Mahatma Gandhi University, Kerala, India.
          </p>
        </div>
      ),
    },
    {
      title: "2004",
      content: (
        <div>
          <h2 className="text-sm md:text-base font-semibold mb-1">Silver Medallist</h2>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
            2nd Rank, Masters in Education, Mahatma Gandhi University, Kerala, India.
          </p>
        </div>
      ),
    },
    {
      title: "2007",
      content: (
        <div>
          <h2 className="text-sm md:text-base font-semibold mb-1">Assistant Professor</h2>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
            Appointed at Sree Narayana Training College, Nedunganda.
          </p>
        </div>
      ),
    },
    {
      title: "2012",
      content: (
        <div>
          <h2 className="text-sm md:text-base font-semibold mb-1">Ph.D in Education</h2>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
            Earned from University of Kerala.
          </p>
        </div>
      ),
    },
    {
      title: "2014",
      content: (
        <div>
          <h2 className="text-sm md:text-base font-semibold mb-1">UGC Raman Post-Doctoral Fellow</h2>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
            Research Fellowship at University of Alabama in Huntsville, USA.
          </p>
        </div>
      ),
    },
    {
      title: "2016",
      content: (
        <div>
          <h2 className="text-sm md:text-base font-semibold mb-1">Best Paper Award</h2>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
            20th World Conference on Systemics, Cybernetics, and Informatics, Orlando, Florida.
          </p>
        </div>
      ),
    },
    {
      title: "2017",
      content: (
        <div>
          <h2 className="text-sm md:text-base font-semibold mb-1">Fulbright-Nehru Fellow & Appointment</h2>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
            Post-Doctoral Fellow at University of Alabama; Appointed Assistant Professor at University of Kerala.
          </p>
        </div>
      ),
    },
    {
      title: "2018",
      content: (
        <div>
          <h2 className="text-sm md:text-base font-semibold mb-1">Precourt Fellowships</h2>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
             Precourt Fellowship at Stanford University, USA.
          </p>
        </div>
      ),
    },
    {
      title: "2018",
      content: (
        <div>
          <h2 className="text-sm md:text-base font-semibold mb-1">Outreach & Precourt Fellowships</h2>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
            Lecturing Fund Award (IIE, NY) 
          </p>
        </div>
      ),
    },
    {
      title: "2019",
      content: (
        <div>
          <h2 className="text-sm md:text-base font-semibold mb-1">BECC Fellowship</h2>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
            BECC Fellowship from Morris S. Smith Foundation, USA.
          </p>
        </div>
      ),
    },
    {
      title: "2019",
      content: (
        <div>
          <h2 className="text-sm md:text-base font-semibold mb-1">Travel Award</h2>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
            Travel Award (IIE, NY) 
          </p>
        </div>
      ),
    },
    {
      title: "2020",
      content: (
        <div>
          <h2 className="text-sm md:text-base font-semibold mb-1">Best Teacher Educator National Award</h2>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
           Best Teacher Educator National Award (NCTE, MHRD, India) 
          </p>
        </div>
      ),
    },
    {
      title: "2020",
      content: (
        <div>
          <h2 className="text-sm md:text-base font-semibold mb-1">MS2 Level Scholarship</h2>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
           MS2 Level Scholarship (NIIT University)
          </p>
        </div>
      ),
    },
    {
      title: "2021",
      content: (
        <div>
          <h2 className="text-sm md:text-base font-semibold mb-1">Chanakya Award</h2>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
            Best Teacher Educator Award by Indian Institute of Teacher Education (IITE), Govt. of Gujarat.
          </p>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div>
          <h2 className="text-sm md:text-base font-semibold mb-1">Visiting Professor</h2>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
            Appointed at University of Southampton, UK.
          </p>
        </div>
      ),
    },
    {
      title: "2025",
      content: (
        <div>
          <h2 className="text-sm md:text-base font-semibold mb-1">Highest Research Grant Award</h2>
          <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm">
            Conferred by University of Kerala.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen max-w-5xl flex mx-auto">
      <div className="w-full">
        <Timeline data={data} />
      </div>
    </div>
  );
}
