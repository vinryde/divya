"use client";

import { LogoCarousel } from "@/components/ui/logo-carousel";
import { Card, CardContent } from "@/components/ui/card";

const demoLogos = [
  { id: 1, name: "Dub", src: "https://www.prismui.tech/logo/dub.svg" },
  { id: 2, name: "Supabase", src: "https://www.prismui.tech/logo/supabase.svg" },
  { id: 3, name: "Vercel", src: "https://www.prismui.tech/logo/vercel.svg" },
  { id: 4, name: "Resend", src: "https://www.prismui.tech/logo/resend.svg" },
  { id: 5, name: "Shadcn", src: "https://www.prismui.tech/logo/shadcn.svg" },
];

function LogoCarouselBasic() {
  return (
    <Card variant={"dots"}>
      <CardContent className="pt-6">
        <div className="text-center space-y-4 mb-12">
          <p className="text-sm font-medium tracking-widest text-muted-foreground">
            TRUSTED BY TEAMS FROM AROUND THE WORLD
          </p>
          <h2 className="text-[3.5rem] font-bold tracking-tight leading-none">
            The best are already here
          </h2>
        </div>
        <LogoCarousel logos={demoLogos} />
      </CardContent>
    </Card>
  );
}

export { LogoCarouselBasic };
