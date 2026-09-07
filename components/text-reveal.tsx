"use client";

/**
 * Character-by-character reveal using pure CSS animation.
 */
export function TextReveal({
  children,
  className = "",
  delay = 0,
  stagger = 0.025,
}: {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const words = children.split(" ");
  let charIndex = 0;

  return (
    <span className={className} aria-label={children}>
      {words.map((word, wi) => (
        <span
          key={wi}
          className="inline-block whitespace-nowrap align-top"
          style={{ overflow: "hidden", paddingBottom: "0.12em", marginBottom: "-0.12em" }}
          aria-hidden="true"
        >
          <span className="inline-block">
            {word.split("").map((ch, ci) => {
              const i = charIndex++;
              return (
                <span
                  key={ci}
                  className="inline-block"
                  style={{
                    animation: `textReveal 0.9s cubic-bezier(0.22,1,0.36,1) ${delay + i * stagger}s both`,
                    willChange: "transform, opacity",
                  }}
                >
                  {ch}
                </span>
              );
            })}
          </span>
          {wi < words.length - 1 && (
            <span className="inline-block">&nbsp;</span>
          )}
        </span>
      ))}
    </span>
  );
}
