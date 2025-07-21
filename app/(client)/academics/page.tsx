import Container from "@/components/Container";
import Projects from "@/components/Projects";
import ServicesBadge from "@/components/ServicesBadge";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import React from "react";
import { HeroSectionAcademics } from "@/components/heroacademics";
import { EvervaultCardDemo } from "@/components/cardnew";
import { EvervaultCardTwo } from "@/components/cardtwo";
import { EvervaultCardThree } from "@/components/cardthree";
import { SectionTitle } from "@/components/sectionheder";
import { Partners } from "@/components/partners";
import { LogoCarouselBasic } from "@/components/partnernew";

const ServicesPage = () => {
  return (
    <div>
      
      <HeroSectionAcademics/>
      <LogoCarouselBasic />
      <Partners />
      <SectionTitle/>
      <EvervaultCardDemo />
      <EvervaultCardTwo />
      <EvervaultCardThree />
    </div>
  );
};

export default ServicesPage;
