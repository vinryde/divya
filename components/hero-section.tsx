"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRightIcon } from "lucide-react";
import { Mockup, MockupFrame } from "@/components/ui/mockup";
import { Glow } from "@/components/ui/glow";
import Image from "next/image";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

interface HeroAction {
  text: string;
  href: string;
  icon?: React.ReactNode;
  variant?: "default" | "glow";
}

interface HeroProps {
  badge?: {
    text: string;
    action: {
      text: string;
      href: string;
    };
  };
  title: string;
  description: string;
  actions: HeroAction[];
  image?: {
    light: string;
    dark: string;
    alt: string;
  };
}

export function HeroSection({
  badge,
  title,
  description,
  actions,
  image,
}: HeroProps) {
  const { resolvedTheme } = useTheme();
  const imageSrc = image
  ? resolvedTheme === "light"
    ? image.light
    : image.dark
  : undefined;


  return (
    <section
      className={cn(
        "bg-white text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50",
        "py-12 sm:py-24 md:py-32 px-4",
        "fade-bottom overflow-hidden pb-0"
      )}
    >
      <div className="mx-auto flex max-w-container flex-col gap-12 pt-16 sm:gap-24">
        <div className="flex flex-col items-center gap-6 text-center sm:gap-6">
          {/* Badge */}
          {badge && (
            <Badge variant="outline" className="animate-appear gap-2">
              <span className="text-neutral-500 dark:text-neutral-400">{badge.text}</span>
              <a href={badge.action.href} className="flex items-center gap-1">
                {badge.action.text}
                <ArrowRightIcon className="h-3 w-3" />
              </a>
            </Badge>
          )}

          {/* Title */}
          <h1 className="relative z-10 inline-block animate-appear bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-4xl font-semibold leading-tight drop-shadow-2xl sm:text-4xl sm:leading-tight md:text-8xl md:leading-tight text-slate-800">
            {title}
          </h1>

          {/* Description */}
          <p className="lg:text-lg relative z-10 max-w-[550px] animate-appear font-medium text-neutral-500  sm:text-sm">
            {description}
          </p>

          {/* Actions */}
          <div className="relative z-10 flex animate-appear justify-center gap-4  delay-300">
            <div className="relative z-10 flex animate-appear justify-center gap-4  delay-300">
              {actions.map((action, index) => (
                <Button key={index} size="lg" asChild>
                  <a href={action.href} className="flex items-center gap-2">
                    {action.icon}
                    {action.text}
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Image with Glow */}
         {/* Image with Glow */}
{image ? (
  <div className="relative pt-12">
    <MockupFrame className="animate-appear delay-700" size="small">
      <Mockup type="responsive">
        <Image
          src={imageSrc || ""}
          alt={image.alt || ""}
          width={1248}
          height={765}
          priority
        />
      </Mockup>
    </MockupFrame>
    <Glow variant="top" className="animate-appear-zoom" />
  </div>
) : (
  <div className="relative pt-12  min-w-[600px]">
    {/* Empty placeholder to maintain height */}
    <div className="w-full h-full" />
    <Glow variant="top" className="animate-appear-zoom" />
  </div>
)}

        </div>
      </div>
    </section>
  );
}
