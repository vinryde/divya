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
          href: "/#formone",
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
          text: "Outreach",
          href: "/outreach",
          variant: "glow",
          
        },
      ]}
     
    />
  
  )
}
