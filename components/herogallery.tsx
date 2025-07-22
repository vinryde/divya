"use client"

import { HeroSection } from "@/components/hero-section"
import { Icons } from "@/components/ui/icons"

export function HeroSectionGallery() {
  return (
  
    <HeroSection
      badge={{
        text: "Follow our latest updates ",
        action: {
          text: "Learn more",
          href: "/#formone",
        },
      }}
      title="GALLERY"
      description="From fieldwork snapshots to vibrant classroom innovations and global collaborations, our gallery captures the people, projects, and passion behind every educational impact."
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
