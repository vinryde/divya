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
          href: "/docs",
        },
      }}
      title="ACADEMICS"
      description="Senan Education Lab designs transformative, research-driven academic programs that integrate sustainability, innovation, and inclusive practices in teacher education."
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
        alt: "University of Kerala",
      }}
    />
  
  )
}
