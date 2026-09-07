"use client";

const unis = [
  "USP", "FGV", "Insper", "Mackenzie", "PUC-SP", "FAAP", "FEI",
  "UNIFESP", "ESPM", "Audio Club", "D-Edge", "Warung",
  "Cine Joia", "Villa Mix", "Allianz Parque",
];

export function Marquee() {
  const items = [...unis, ...unis]; // duplicate for seamless loop

  return (
    <section className="relative overflow-hidden border-y border-white/5 bg-white/[0.01] py-10">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-32 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-32 bg-gradient-to-l from-background to-transparent" />

      <div className="mb-6 text-center text-xs font-medium uppercase tracking-widest text-white/40">
        as casas que fazem a noite acontecer
      </div>

      <div className="flex">
        <div className="flex shrink-0 animate-marquee items-center gap-12 pr-12">
          {items.map((name, i) => (
            <div
              key={i}
              className="whitespace-nowrap font-display text-3xl font-semibold tracking-tight text-white/35 transition-colors hover:text-white/80 md:text-4xl"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
