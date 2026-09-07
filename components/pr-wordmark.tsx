import { cn } from "@/lib/utils";

type PRWordmarkProps = {
  className?: string;
  /**
   * Controls the visual size. `inline` matches the surrounding text; `lg`/`xl`
   * are tuned for hero-style placements.
   */
  size?: "inline" | "md" | "lg" | "xl";
};

const sizeClasses: Record<NonNullable<PRWordmarkProps["size"]>, string> = {
  inline: "text-lg",
  md: "text-3xl md:text-4xl",
  lg: "text-5xl md:text-6xl",
  xl: "text-6xl md:text-8xl",
};

export function PRWordmark({ className, size = "inline" }: PRWordmarkProps) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline font-semibold leading-none tracking-[-0.05em]",
        sizeClasses[size],
        className,
      )}
    >
      <span>party</span>
      <span className="font-serif font-normal italic gradient-text">rank</span>
    </span>
  );
}
