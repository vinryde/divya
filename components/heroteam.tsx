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
          href: "/docs",
        },
      }}
      title="TEAM"
      description="Meet the diverse minds driving our mission. From researchers to collaborators and alumni, the Senan Lab team brings expertise, passion, and purpose to every project."
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
