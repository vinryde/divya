"use client"

import { HeroSection } from "@/components/hero-section"
import { Icons } from "@/components/ui/icons"


export function HeroSectionDemo() {
  return (
  
    <HeroSection
      badge={{
        text: "Follow our latest updates ",
        action: {
          text: "Learn more",
          href: "/#formone",
        },
      }}
      title="SENAN EDUCATION LAB"
      description="Senan Education Lab pioneers inclusive, tech-driven, and sustainability-focused educational research, outreach, and innovation through global collaboration and community impact."
      actions={[
        {
          text: "Contact",
          href: "/",
          variant: "default",
        },
        {
          text: "Projects",
          href: "/",
          variant: "default",
          
        },
      ]}
      image={{
        light: "https://upload.wikimedia.org/wikipedia/commons/5/5f/University_of_Kerala.jpg",
        dark: "https://upload.wikimedia.org/wikipedia/commons/5/5f/University_of_Kerala.jpg",
        alt: "UI Components Preview",
      }}
    />
  
  )
}
