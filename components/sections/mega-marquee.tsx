"use client";

/**
 * Lusion-style huge marquee across the width of the screen.
 * Words rotate between normal and serif italic for editorial feel.
 */
export function MegaMarquee() {
  const items = [
    "party",
    "rank",
    "são paulo",
    "universitárias",
    "noite",
    "ranking ao vivo",
  ];
  // duplicate for seamless loop
  const full = [...items, ...items, ...items];

  return (
    <section className="relative overflow-hidden py-24 md:py-40">
      <div className="relative flex whitespace-nowrap">
        <div className="flex shrink-0 animate-marquee items-center gap-12 pr-12">
          {full.map((word, i) => (
            <span
              key={i}
              className={`text-[15vw] font-medium leading-none tracking-[-0.04em] ${
                i % 2 === 1
                  ? "font-serif italic font-normal gradient-text"
                  : "text-white"
              }`}
            >
              {word}
              <span className="ml-12 inline-block align-middle">
                <span className="inline-block h-4 w-4 rounded-full bg-gradient-to-br from-violet-400 to-pink-400 md:h-6 md:w-6" />
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
