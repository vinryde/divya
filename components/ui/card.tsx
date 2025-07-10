// Card.tsx
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { LiquidButton } from "@/components/liquid-glass-button";

const cardVariants = cva("w-full relative", {
  variants: {
    variant: {
      default: [
        "border rounded-lg",
        "border-zinc-200 dark:border-zinc-800",
        "bg-white dark:bg-zinc-950",
      ],
      dots: [
        "relative mx-auto w-full",
        "rounded-lg border border-dashed",
        "border-zinc-300 dark:border-zinc-800",
        "px-4 sm:px-6 md:px-8",
      ],
      gradient: ["relative mx-auto w-full", "px-4 sm:px-6 md:px-8"],
      plus: [
        "border border-dashed",
        "border-zinc-400 dark:border-zinc-700",
        "relative",
      ],
      neubrutalism: [
        "border-[0.5px]",
        "border-zinc-400 dark:border-white/70",
        "relative",
        "shadow-[4px_4px_0px_0px_rgba(0,0,0)]",
        "dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.7)]",
      ],
      inner: [
        "border-[0.5px] rounded-sm p-2",
        "border-zinc-300 dark:border-zinc-800",
      ],
      lifted: [
        "border rounded-xl",
        "border-zinc-400 dark:border-zinc-700",
        "relative",
        "shadow-[0px_5px_0px_0px_rgba(0,0,0,0.7)]",
        "dark:shadow-[0px_4px_0px_0px_rgba(255,255,255,0.5)]",
        "bg-zinc-50 dark:bg-zinc-900/50",
      ],
      corners: [
        "border-2 rounded-md",
        "border-zinc-100 dark:border-zinc-700",
        "relative",
      ],
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface CardProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof cardVariants> {
  title?: string;
  subHeading?: string;
  description?: string;
  sanctionedBudget?: number;
  fundedBy?: string;
  yearsActive?: string;
  linkUrl?: string;
}

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6", className)} {...props}>
    {props.children}
  </div>
));
CardContent.displayName = "CardContent";

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant,
      title,
      subHeading,
      description,
      sanctionedBudget,
      fundedBy,
      yearsActive,
      linkUrl,
      children,
      ...props
    },
    ref
  ) => {
    const DotsPattern = () => {
      const sharedClasses =
        "rounded-full outline outline-8 dark:outline-gray-950 sm:my-6 md:my-8 size-1 my-4 outline-gray-50 bg-green-400";

      return (
        <>
          <div className="absolute left-0 top-4 -z-0 h-px w-full bg-zinc-400 dark:bg-zinc-700 sm:top-6 md:top-8" />
          <div className="absolute bottom-4 left-0 z-0 h-px w-full bg-zinc-400 dark:bg-zinc-700 sm:bottom-6 md:bottom-8" />
          <div className="relative w-full border-x border-zinc-400 dark:border-zinc-700">
            <div className="absolute z-0 grid h-full w-full items-center">
              <section className="absolute z-0 grid h-full w-full grid-cols-2 place-content-between">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className={`${sharedClasses} ${
                      i % 2 === 0
                        ? "-translate-x-[2.5px]"
                        : "translate-x-[2.5px] place-self-end"
                    }`}
                  />
                ))}
              </section>
            </div>
            <div className="relative z-20 mx-auto py-8">{mainContent}</div>
          </div>
        </>
      );
    };

    const GradientLines = () => (
      <>
        <div className="absolute left-0 top-4 -z-0 h-px w-full bg-gradient-to-l from-zinc-200 via-zinc-400 to-zinc-600 dark:from-zinc-900 dark:via-zinc-700 dark:to-zinc-500 sm:top-6 md:top-8" />
        <div className="absolute bottom-4 left-0 z-0 h-px w-full bg-gradient-to-r from-zinc-200 via-zinc-400 to-zinc-600 dark:from-zinc-900 dark:via-zinc-700 dark:to-zinc-500 sm:bottom-6 md:bottom-8" />
        <div className="relative w-full border-x border-gradient-x">
          <div className="absolute inset-y-0 left-0 w-px bg-gradient-to-t from-zinc-200 via-zinc-400 to-zinc-600 dark:from-zinc-900 dark:via-zinc-700 dark:to-zinc-500" />
          <div className="absolute inset-y-0 right-0 w-px bg-gradient-to-t from-zinc-200 via-zinc-400 to-zinc-600 dark:from-zinc-900 dark:via-zinc-700 dark:to-zinc-500" />
          <div className="relative z-20 mx-auto py-8">{mainContent}</div>
        </div>
      </>
    );

    const PlusIcons = () => (
      <>
        {["-top-3 -left-3", "-top-3 -right-3", "-bottom-3 -left-3", "-bottom-3 -right-3"].map((pos, i) => (
          <svg
            key={i}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            width={24}
            height={24}
            strokeWidth="1"
            stroke="currentColor"
            className={`dark:text-white text-black size-6 absolute ${pos}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
          </svg>
        ))}
      </>
    );

    const CornerBorders = () => (
      <>
        {[
          "-top-0.5 -left-0.5 border-l-2 border-t-2 rounded-tl-md",
          "-top-0.5 -right-0.5 border-r-2 border-t-2 rounded-tr-md",
          "-bottom-0.5 -left-0.5 border-l-2 border-b-2 rounded-bl-md",
          "-bottom-0.5 -right-0.5 border-r-2 border-b-2 rounded-br-md",
        ].map((pos, i) => (
          <div
            key={i}
            className={`dark:border-zinc-200 border-zinc-700 size-6 absolute ${pos}`}
          />
        ))}
      </>
    );

    const mainContent = (
      <CardContent>
        {title && (
          <h3 className="text-lg font-bold mb-1 text-gray-900 dark:text-gray-100">{title}</h3>
        )}
        {subHeading && (
          <p className="text-sm font-medium text-gray-500 dark:text-gray-300 mb-2">
            {subHeading}
          </p>
        )}
        {description && (
          <p className="text-gray-500 text-sm dark:text-gray-300 mb-3">{description}</p>
        )}
        {(sanctionedBudget || fundedBy || yearsActive) && (
          <div className="space-y-1 mb-4">
            {sanctionedBudget !== undefined && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Sanctioned Budget:</strong> ₹{sanctionedBudget.toLocaleString()}
              </p>
            )}
            {fundedBy && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Funded By:</strong> {fundedBy}
              </p>
            )}
            {yearsActive && (
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Years Active:</strong> {yearsActive}
              </p>
            )}
          </div>
        )}
        {linkUrl && (
          <Link href={linkUrl}>
            <LiquidButton className=" text-xs font-normal py-4 px-4" size={"sm"}>
              Learn More
            </LiquidButton>
          </Link>
        )}
        {children}
      </CardContent>
    );

    // Main render logic
    if (variant === "dots") {
      return (
        <div ref={ref} className={cn(cardVariants({ variant, className }))} {...props}>
          <DotsPattern />
        </div>
      );
    }
    if (variant === "gradient") {
      return (
        <div ref={ref} className={cn(cardVariants({ variant, className }))} {...props}>
          <GradientLines />
        </div>
      );
    }
    if (variant === "inner") {
      return (
        <div ref={ref} className={cn(cardVariants({ variant, className }))} {...props}>
          <div className="border rounded-sm bg-gradient-to-br from-white to-zinc-200/60 border-zinc-300 shadow-[2px_0_8px_rgba(0,_0,_0,_0.15)] dark:from-zinc-950 dark:to-zinc-900/60 dark:border-zinc-900/50 dark:shadow-inner sm:w-full">
            {mainContent}
          </div>
        </div>
      );
    }

    return (
      <div ref={ref} className={cn(cardVariants({ variant, className }))} {...props}>
        {variant === "plus" && <PlusIcons />}
        {variant === "corners" && <CornerBorders />}
        {mainContent}
      </div>
    );
  }
);
Card.displayName = "Card";

export { Card, CardContent, cardVariants };
