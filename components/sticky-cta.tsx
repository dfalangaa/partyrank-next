"use client";

/**
 * Mobile-only sticky-bottom action bar. Used for primary conversions like
 * "comprar ingresso" on the party page so the CTA never scrolls out of reach.
 * Sits above the bottom tab bar with safe-area padding accounted for.
 */
export function StickyCTA({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* spacer so content doesn't sit under the floating bar */}
      <div aria-hidden className="h-20 md:hidden" />
      <div
        className="fixed inset-x-0 bottom-[88px] z-30 border-t border-white/5 bg-background/95 px-4 py-3 backdrop-blur-xl md:hidden"
        style={{ paddingBottom: "calc(env(safe-area-inset-bottom, 0px) * 0.3)" }}
      >
        {children}
      </div>
    </>
  );
}
