"use client"

import { HeroSection } from "@/components/hero-section"

export function HeroSectionPubs() {
  return (
  
    <HeroSection
      badge={{
        text: "Follow our latest updates ",
        action: {
          text: "Learn more",
          href: "/#formone",
        },
      }}
      title="PUBLICATIONS"
      description="Explore our publications showcasing research, insights, and innovations that advance education, sustainability, and inclusive learning practices"
      actions={[
        {
          text: "Contact",
          href: "/",
          variant: "default",
        },
        {
          text: "Projects",
          href: "/",
          variant: "glow",
          
        },
      ]}
     
    />
  
  )
}
