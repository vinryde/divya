import { TiltedScroll } from "@/components/ui/tilted-scroll"
import { LiquidButton } from "./liquid-glass-button";
import Link from "next/link";

export function TiltedScrollDemo() {
  const customItems = [
    { id: "1", text: "Inclusive Education Research" },
    { id: "2", text: "Sustainability-Focused Pedagogy" },
    { id: "3", text: "Gender-Responsive STEM Education" },
    { id: "4", text: "Energy Literacy and Climate Education" },
    { id: "5", text: "AI and Learning Analytics in Education" },
    { id: "6", text: "Interdisciplinary Educational Innovation" },
    { id: "7", text: "Digital Tools for Teacher Training" },
    { id: "8", text: "Educational Technology Integration" },
    { id: "9", text: "Global Research Collaborations" },
    { id: "10", text: "Policy-Driven Educational Change" },
    { id: "11", text: "Equity in Higher Education" },
    { id: "12", text: "Community-Centered Outreach Programs" },
    { id: "13", text: "Environmental and Energy Education" },
    { id: "14", text: "Blended and Hybrid Learning Models" },
    { id: "15", text: "Research-Based Educational Interventions" }
  ];
  

  return (
    <div className="flex sm:flex-col-reverse lg:flex-row gap-2  items-center mt-10 mb-10">
    <div className="space-y-8 lg:ml-auto sm:mx-0">
      <TiltedScroll 
        items={customItems}
        className="mt-8"
      />
    </div>
    <div className="max-w-2xl mx-auto">
        <h2 className="max-w-xl text-2xl font-bold lg:text-left mb-4 sm:text-center sm:px-4 lg:px-0">Pedagogy, Policy, and Practice; Aligned for Educational Impact </h2>
        <p className="text-md lg:text-left lg:max-w-xl sm:px-7 sm:text-center lg:px-0">We integrate evidence-based pedagogy, responsive policy frameworks, and hands-on practice to create meaningful, scalable change in education across diverse learning contexts.</p>
        <Link href="/projects">
        <LiquidButton size={"sm"} className="mt-5">
          Explore Our Projects
        </LiquidButton>
        </Link>
    </div>
    </div>
  )
}