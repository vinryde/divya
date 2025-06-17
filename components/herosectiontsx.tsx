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
          href: "/docs",
        },
      }}
      title="SENAN EDUCATION LAB"
      description="Senan Education Lab pioneers inclusive, tech-driven, and sustainability-focused educational research, outreach, and innovation through global collaboration and community impact."
      actions={[
        {
          text: "Contact",
          href: "/docs/getting-started",
          variant: "default",
        },
        {
          text: "Projects",
          href: "https://github.com/your-repo",
          variant: "glow",
          icon: <Icons.gitHub className="h-5 w-5" />,
        },
      ]}
      image={{
        light: "https://www.keralauniversity.ac.in/images/2000x700_senate_house.jpg",
        dark: "https://upload.wikimedia.org/wikipedia/commons/5/5f/University_of_Kerala.jpg",
        alt: "UI Components Preview",
      }}
    />
  )
}
