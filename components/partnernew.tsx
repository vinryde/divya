"use client";

import { LogoCarousel } from "@/components/ui/logo-carousel";
import { Card, CardContent } from "@/components/ui/card";

const demoLogos = [
    {
      id: 1,
      name: "University of Southampton",
      src: "https://upload.wikimedia.org/wikipedia/commons/a/a7/University_of_Southampton_Logo.svg"
    },
    {
      id: 2,
      name: "Alabama A&M University",
      src: "https://upload.wikimedia.org/wikipedia/commons/1/10/Alternative_Alabama_A%26M_logo.png"
    },
    {
      id: 3,
      name: "Florida Atlantic University",
      src: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Florida_Atlantic_University_logo.svg"
    },
    {
      id: 4,
      name: "University of Alabama Huntsville",
      src: "https://upload.wikimedia.org/wikipedia/commons/1/1e/Alabama-Huntsville_UAH_logo.svg"
    },
    {
      id: 5,
      name: "Nanyang Technological University",
      src: "https://upload.wikimedia.org/wikipedia/en/f/f8/Nanyang_Technological_University_coat_of_arms_vector.svg"
    }
  ];
  

function LogoCarouselBasic() {
  return (
    <Card variant={"gradient"} className="max-w-6xl mb-20">
      <CardContent className="pt-6">
        <div className="text-center space-y-4 mb-12">
          <p className="text-sm font-medium tracking-widest text-muted-foreground">
            TRUSTED BY INSTITUTIONS FROM AROUND THE WORLD
          </p>
          <h2 className="lg:text-[3.5rem] sm:text-2xl font-bold tracking-tight leading-none">
          Backed by Global Academia
          </h2>
        </div>
        <LogoCarousel logos={demoLogos} />
      </CardContent>
    </Card>
  );
}

export { LogoCarouselBasic };
