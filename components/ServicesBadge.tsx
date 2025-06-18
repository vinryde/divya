import React from "react";
import Container from "./Container";
import { cn } from "@/lib/utils";

const badgeArray = [
  {
    title: "Women in STEM Leadership",
    label:
      "Advocates for gender equity in science education through targeted STEM training, research, and mentorship of women scholars and teachers.",
    href: "/",
  },
  {
    title: "Cross-Cultural Collaborations",
    label:
      "Drives impactful research with global partners in the USA, UK, and beyond—connecting energy literacy and educational technology across continents.",
    href: "/",
  },
  {
    title: "Energy Education Advocacy",
    label:
      "Promotes climate-conscious citizenship through curriculum design, community workshops, and global research on sustainable development goals.",
    href: "/",
  },
];

const ServicesBadge = ({ className }: { className?: string }) => {
  return (
    <div className={cn("py-20 md:py-24", className)}>
      <Container>
        {/* SECTION TITLE + DESCRIPTION */}
        <div className="mb-12 text-left">
          <h2 className="text-3xl font-bold mb-4">What Drives Our Work</h2>
          <p className="text-base text-primary/80">
            At Senan Education Lab, we advance inclusive, sustainability-driven education through
            collaborative research, gender-responsive STEM leadership, and energy literacy advocacy.
            Our work bridges local communities and global academic networks to drive meaningful
            impact across classrooms, policies, and lives.
          </p>
        </div>

        {/* BADGE GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {badgeArray?.map(({ title, label }) => (
            <div key={title} className="space-y-3">
              <h2 className="text-2xl font-bold">{title}</h2>
              <p className="text-base font-normal text-primary/80 my-5 md:my-8">{label}</p>
              <button className="pr-4 text-sm font-bold border-r-primary hover:text-darkOrange hoverEffect after:w-[2px] after:h-[60%] after:bg-primary after:absolute relative after:-right-1.5 after:top-0 hover:after:-rotate-45 before:w-[2px] before:h-[60%] before:bg-primary before:absolute before:-right-1.5 before:bottom-0 hover:before:rotate-45 hover:after:inline-block after:transition-all before:transition-all transform-rotate duration-500">
                Read More
              </button>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ServicesBadge;
