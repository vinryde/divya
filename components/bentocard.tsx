"use client";

import { Users,LaptopMinimalCheck, Lock, Search, Settings, Sparkles,UserSearch,BookOpenCheck } from "lucide-react";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Container from "./Container";

export function GlowingEffectDemo() {
  return (
    <section className="py-20">
      {/* Section Heading */}
      <div className="mb-12 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Explore Our Journey</h2>
        <p className="text-base text-muted-foreground">
          Through research, outreach, and innovation, Senan Education Lab
          advances educational equity, fosters interdisciplinary collaboration,
          and builds tools that connect communities to learning. These focus areas
          are at the heart of our mission to inspire, inform, and impact.
        </p>
      </div>
    <ul className="grid grid-cols-1 grid-rows-none gap-4 md:grid-cols-12 md:grid-rows-3 lg:gap-4 xl:max-h-[34rem] xl:grid-rows-2 mb-6 mx-4">

      <GridItem
        area="md:[grid-area:1/1/2/7] xl:[grid-area:1/1/2/5]"
        icon={<UserSearch className="h-4 w-4" />}
        title="Research that Shapes Tomorrow"
        description="Our research advances AI in education, energy literacy, STEM equity, and climate education through globally funded, interdisciplinary, technology-driven collaborations."
        href= "/projects"
      />
  
    
      <GridItem
        area="md:[grid-area:1/7/2/13] xl:[grid-area:2/1/3/5]"
        icon={<Users className="h-4 w-4" />}
        title="Meet the Minds Behind the Mission"
        description="Click to discover our multidisciplinary team of researchers who bring expertise in robotics, sustainability, blended learning, and child development to support cross-cultural, impact-driven educational innovation."
        href= "/team"
      />
      <GridItem
        area="md:[grid-area:2/1/3/7] xl:[grid-area:1/5/3/8]"
        icon={<BookOpenCheck className="h-4 w-4" />}
        title="Where Knowledge Meets Community"
        description="Our outreach bridges academia and society through programs on cyber safety, menstrual health, climate resilience, and science literacy. We actively engage women, students, and educators through fieldwork, workshops, and interactive learning tools."
        href="/outreach"
      />
      <GridItem
        area="md:[grid-area:2/7/3/13] xl:[grid-area:1/8/2/13]"
        icon={<Sparkles className="h-4 w-4" />}
        title="Knowledge that Travels"
        description="Senan Education Lab’s contributions span  journals, policy chapters, international conference proceedings, etc, advancing theory and practice in energy education, learning engineering, and inclusive curriculum design."
        href="/"
      />
      <GridItem
        area="md:[grid-area:3/1/4/13] xl:[grid-area:2/8/3/13]"
        icon={<LaptopMinimalCheck className="h-4 w-4" />}
        title="Innovation & Tools"
        description="The lab has developed educational apps like PEERA, instructional multimedia packages like OptoQuest, and tools for blended learning, all built on evidence-based practices to foster curiosity, creativity, and critical thinking."
        href="/"
      />
    </ul>
    </section>
  );
}

interface GridItemProps {
  area: string;
  icon: React.ReactNode;
  title: string;
  description: React.ReactNode;
  href: string;
}

const GridItem = ({ area, icon, title, description, href }: GridItemProps) => {
  return (
    <li className={cn("min-h-[14rem] list-none", area)}>
        <Link href ={href}>
        <div className="relative h-full rounded-[1.25rem] border-[0.75px] border-border p-2 md:rounded-[1.5rem] md:p-3 hover:shadow-md transition-all">
          <GlowingEffect
            spread={40}
            glow={true}
            disabled={false}
            proximity={64}
            inactiveZone={0.01}
            borderWidth={3}
          />
          <div className="relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl border-[0.75px] bg-background p-6 shadow-sm dark:shadow-[0px_0px_27px_0px_rgba(45,45,45,0.3)] md:p-6">
            <div className="relative flex flex-1 flex-col justify-between gap-3">
              <div className="w-fit rounded-lg border-[0.75px] border-border bg-muted p-2">
                {icon}
              </div>
              <div className="space-y-3">
                <h3 className="pt-0.5 text-xl leading-[1.375rem] font-semibold font-sans tracking-[-0.04em] md:text-2xl md:leading-[1.875rem] text-balance text-foreground">
                  {title}
                </h3>
                <h2 className="[&_b]:md:font-semibold [&_strong]:md:font-semibold font-sans text-sm leading-[1.125rem] md:text-base md:leading-[1.375rem] text-muted-foreground">
                  {description}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
};
