"use client"

import { HeroSection } from "@/components/hero-section"
import { Icons } from "@/components/ui/icons"

export function HeroSectionAcademics() {
  return (
  
    <HeroSection
      badge={{
        text: "Follow our latest updates ",
        action: {
          text: "Learn more",
          href: "/#formone",
        },
      }}
      title="ACADEMICS"
      description="Senan Education Lab designs transformative, research-driven academic programs that integrate sustainability, innovation, and inclusive practices in teacher education."
      actions={[
        {
          text: "Contact",
          href: "/",
          variant: "default",
        },
        {
          text: "Team",
          href: "/team",
          variant: "glow",
          
        },
      ]}
      
    />
  
  )
}
