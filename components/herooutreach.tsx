"use client"

import { HeroSection } from "@/components/hero-section"
import { Icons } from "@/components/ui/icons"

export function HeroSectionOutreach() {
  return (
  
    <HeroSection
      badge={{
        text: "Follow our latest updates ",
        action: {
          text: "Learn more",
          href: "/",
        },
      }}
      title="OUTREACH"
      description="Our outreach bridges academia and society. Through workshops, awareness programs, and community initiatives, we bring research to real-world settings—empowering learners, educators, and communities across diverse social landscapes."
      actions={[
        {
          text: "Contact",
          href: "/",
          variant: "default",
        },
        {
          text: "Projects",
          href: "/projects",
          variant: "glow",
        },
      ]}
      
    />
  
  )
}
