"use client";

import React, { useEffect, useState } from "react";
import { CircularTestimonials } from "@/components/circular-testimonials";
import { getAspireScholars } from "@/sanity/queries";
import type { TeamMember } from "@/sanity/types";

export const TeamAspireScholars = () => {
  const [memberDetails, setMemberDetails] = useState<
    {
      quote: string;
      name: string;
      designation: string;
      src: string;
      email: string;
    }[]
  >([]);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const members: TeamMember[] = await getAspireScholars();
        console.log("🔍 Raw Sanity data (Aspire Scholars):", members);

        const formatted = members.map((member, i) => {
          const data = {
            quote: member.description || "No description provided.",
            name: member.name,
            designation: member.designation || "",
            src: member.imageUrl || "/placeholder.jpg",
            email: member.email || "",
          };
          console.log(`✅ Mapped [${i}]:`, data);
          return data;
        });

        setMemberDetails(formatted);
      } catch (error) {
        console.error("❌ Error fetching Aspire Scholars data:", error);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <section>
      <div className="bg-[#ffffff] p-10 rounded-lg min-h-[200px] flex flex-wrap gap-6 items-center justify-center relative">
        <div
          className="items-center justify-center relative flex"
          style={{ maxWidth: "1456px" }}
        >
          {memberDetails.length > 0 ? (
            <CircularTestimonials
              testimonials={memberDetails}
              autoplay={true}
              colors={{
                name: "#0a0a0a",
                designation: "#454545",
                testimony: "#171717",
                arrowBackground: "#141414",
                arrowForeground: "#f1f1f7",
                arrowHoverBackground: "#00A6FB",
              }}
              fontSizes={{
                name: "28px",
                designation: "20px",
                quote: "18px",
              }}
            />
          ) : (
            <p className="text-sm text-gray-500 text-center">
              Loading Aspire Scholars…
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
