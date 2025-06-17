"use client";
import { Feature1 } from "@/components/feature-1";
import { senan } from "@/assets/image";

const AemoOne = () => {
  return (
    <Feature1   
      title="Prof. Divya C. Senan"
      description="Dr. Divya C. Senan is Associate Professor at the University of Kerala and Honorary Director of the Centre for Learning Engineering & Sustainability Education. A Fulbright-Nehru and UGC-Raman Postdoctoral Fellow, she has over 18 years of experience in educational research, focusing on technology integration, energy literacy, and inclusive pedagogy. Her work reflects global collaboration, policy contribution, and a deep commitment to transformative education. "
      imageSrc= {senan.src}
      imageAlt="placeholder hero"
      buttonPrimary={{
        label: "Contact",
        href: "https://shadcnblocks.com"
      }}
      buttonSecondary={{
        label: "Projects",
        href: "https://shadcnblocks.com"
      }}
    />
  );
};

export { AemoOne };
