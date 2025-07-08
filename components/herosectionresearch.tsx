"use client"

import { HeroSection } from "@/components/hero-section"
import { Icons } from "@/components/ui/icons"

export function HeroSectionResearch() {
  return (
  
    <HeroSection
      badge={{
        text: "Follow our latest updates ",
        action: {
          text: "Learn more",
          href: "/",
        },
      }}
      title="Research"
      description="Discover the lab’s diverse research projects driving innovation in education, sustainability, and technology- shaping meaningful change through evidence-based inquiry."
      actions={[
        {
          text: "Contact",
          href: "/",
          variant: "default",
        },
        {
          text: "Projects",
          href: "/outreach",
          variant: "glow",
          
        },
      ]}
      image={{
        light: "https://www.keralauniversity.ac.in/images/2000x700_senate_house.jpg",
        dark: "https://upload.wikimedia.org/wikipedia/commons/5/5f/University_of_Kerala.jpg",
        alt: "University of Kerala",
      }}
    />
  
  )
}
