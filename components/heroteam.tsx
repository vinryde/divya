"use client"

import { HeroSection } from "@/components/hero-section"
import { Icons } from "@/components/ui/icons"

export function HeroSectionTeam() {
  return (
  
    <HeroSection
      badge={{
        text: "Follow our latest updates ",
        action: {
          text: "Learn more",
          href: "/",
        },
      }}
      title="TEAM"
      description="Meet the diverse minds driving our mission. From researchers to collaborators and alumni, the Senan Lab team brings expertise, passion, and purpose to every project."
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
