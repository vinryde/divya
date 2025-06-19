import Container from "@/components/Container";
import Projects from "@/components/Projects";
import ServicesBadge from "@/components/ServicesBadge";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import React from "react";
import { HeroSectionAcademics } from "@/components/heroacademics";

const ServicesPage = () => {
  return (
    <div>
      <HeroSectionAcademics/>
      <ServicesBadge />
      <Projects className="pt-0 md:pt-0" />
    </div>
  );
};

export default ServicesPage;
