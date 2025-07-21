import { cn } from "@/lib/utils"

interface TiltedScrollItem {
  id: string;
  text: string;
}

interface TiltedScrollProps {
  items?: TiltedScrollItem[];
  className?: string;
}

export function TiltedScroll({ 
  items = defaultItems,
  className 
}: TiltedScrollProps) {
  return (
    <div className={cn("flex items-center justify-center", className)}>
      <div className="relative overflow-hidden [mask-composite:intersect] [mask-image:linear-gradient(to_right,transparent,black_5rem),linear-gradient(to_left,transparent,black_5rem),linear-gradient(to_bottom,transparent,black_5rem),linear-gradient(to_top,transparent,black_5rem)]">
        <div className="grid h-[250px] w-[300px] gap-5 animate-skew-scroll grid-cols-1">
          {items.map((item) => (
            <div
              key={item.id}
              className="group flex items-center gap-2 cursor-pointer rounded-md border border-neutral-200 border-neutral-200/40 bg-gradient-to-b from-background/80 to-muted/80 p-4 shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:-translate-x-1 hover:-translate-y-1 hover:shadow-xl dark:border-neutral-200 dark:border-neutral-800 dark:border-neutral-800/40 dark:dark:border-neutral-800"
            >
              <CheckCircleIcon className="h-6 w-6 mr-2 stroke-foreground/40 transition-colors group-hover:stroke-foreground" />
              <p className="text-neutral-950/80 transition-colors group-hover:text-neutral-950 dark:text-neutral-50/80 dark:group-hover:text-neutral-50">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function CheckCircleIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 24"
      fill="none"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M3.85 8.62a4 4 0 1 4.78-4.77 6.74 4.78 1-4.77 1-6.75 1-4.78-4.77 0-6.76Z" />
      <path d="m9 12 2 4-4" />
    </svg>
  )
}

const defaultItems: TiltedScrollItem[] = [
  {id: "1", text: "Inclusive Education Research" },
    { id: "2", text: "Sustainability-Focused Pedagogy" },
    { id: "3", text: "Gender-Responsive STEM Education" },
    { id: "4", text: "Energy Literacy and Climate Education" },
    { id: "5", text: "AI and Learning Analytics in Education" },
    { id: "6", text: "Interdisciplinary Educational Innovation" },
    { id: "7", text: "Digital Tools for Teacher Training" },
    { id: "8", text: "Educational Technology Integration" },
    { id: "9", text: "Global Research Collaborations" },
    { id: "10", text: "Policy-Driven Educational Change" },
    { id: "11", text: "Equity in Higher Education" },
    { id: "12", text: "Community-Centered Outreach Programs" },
    { id: "13", text: "Environmental and Energy Education" },
    { id: "14", text: "Blended and Hybrid Learning Models" },
    { id: "15", text: "Research-Based Educational Interventions" }
]