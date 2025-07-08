"use client"

import { HeroSection } from "@/components/hero-section"

export function HeroSectionPubs() {
  return (
  
    <HeroSection
      badge={{
        text: "Follow our latest updates ",
        action: {
          text: "Learn more",
          href: "/",
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
      image={{
        light: "https://www.keralauniversity.ac.in/images/2000x700_senate_house.jpg",
        dark: "https://upload.wikimedia.org/wikipedia/commons/5/5f/University_of_Kerala.jpg",
        alt: "University of Kerala",
      }}
    />
  
  )
}
