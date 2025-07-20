import { cn } from "@/lib/utils";
import {
  IconBooks,
  IconClipboardSearch,
  IconWorldCheck,
  IconRecycle,
  IconTrendingUp,
  IconBook,
  IconIkosaedr,
  IconSchool,
} from "@tabler/icons-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Education for Impact",
      description:
        "Built for learners, educators, and communities to create real-world educational change through research, training, and advocacy.",
      icon: <IconBooks  />,
    },
    {
      title: "Research that Matters",
      description:
        "From AI to energy education, we tackle real-world problems with interdisciplinary, policy-relevant, and transformative research.",
      icon: <IconClipboardSearch />,
    },
    {
      title: "Global Collaborations",
      description:
        "Partnered with top institutions in India, UK, and USA to foster culturally grounded and globally connected educational practices.",
      icon: <IconWorldCheck />,
    },
    {
      title: "Sustainability-Driven",
      description:
        "Every initiative is rooted in environmental consciousness—empowering learners to drive sustainable futures through energy and climate literacy.",
      icon: <IconRecycle />,
    },
    {
      title: "Inclusive Innovation",
      description:
        "Gender-responsive pedagogy, accessible technology, and inclusive learning designs are at the heart of every solution we build.",
      icon: <IconTrendingUp />,
    },
    {
      title: "Knowledge to Practice",
      description:
        "We bridge the gap between academic theory and ground-level implementation with community workshops, school interventions, and digital tools.",
      icon: <IconBook />,
    },
    {
      title: "Interdisciplinary by Design",
      description:
        "Our team brings together fields from psychology and sociology to data science and design thinking—for smarter educational outcomes.",
      icon: <IconIkosaedr />,
    },
    {
      title: "Future-Ready Scholars",
      description:
        "We mentor doctoral and postdoctoral researchers through rigorous programs aligned with NEP 2020 and global education frameworks.",
      icon: <IconSchool />,
    },
  ];
  
  return (
    <div className="space-y-9">
       <div className="sm:mt-10 lg:mt-0 mb-6 text-center max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">Rooted in Purpose. Powered by People</h2>
        <p className="text-base text-muted-foreground">
        At Senan Education Lab, we blend research, innovation, and global collaboration to create inclusive, sustainable, and real-world educational solutions—led by future-ready scholars and driven by impact.
        </p>
      </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-darkOrange transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
