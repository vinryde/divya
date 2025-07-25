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
          href: "/#formone",
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
      
    />
  
  )
}
