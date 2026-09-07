"use client";

/**
 * Mobile-only CSS-painted background. Recreates the night/disco mood of the
 * desktop WebGL scene with three big radial-gradient blobs that drift slowly,
 * plus a vignette to anchor it. Way cheaper than Three.js, but keeps the
 * "festa em SP" vibe instead of going flat black.
 */
export function MobileBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden md:hidden"
    >
      {/* base */}
      <div className="absolute inset-0 bg-[#0B0B14]" />

      {/* drifting violet blob (top-left) */}
      <div
        className="absolute h-[60vw] w-[60vw] rounded-full opacity-60 blur-[80px]"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.55) 0%, rgba(139,92,246,0) 70%)",
          top: "-15vw",
          left: "-20vw",
          animation: "pr-drift-a 18s ease-in-out infinite",
        }}
      />

      {/* drifting pink blob (mid-right) */}
      <div
        className="absolute h-[70vw] w-[70vw] rounded-full opacity-55 blur-[90px]"
        style={{
          background:
            "radial-gradient(circle, rgba(236,72,153,0.55) 0%, rgba(236,72,153,0) 70%)",
          top: "30vh",
          right: "-25vw",
          animation: "pr-drift-b 22s ease-in-out infinite",
        }}
      />

      {/* drifting orange blob (bottom-left) */}
      <div
        className="absolute h-[55vw] w-[55vw] rounded-full opacity-40 blur-[80px]"
        style={{
          background:
            "radial-gradient(circle, rgba(251,146,60,0.5) 0%, rgba(251,146,60,0) 70%)",
          bottom: "-10vw",
          left: "-15vw",
          animation: "pr-drift-c 26s ease-in-out infinite",
        }}
      />

      {/* fine grain overlay so the gradient doesn't look plasticky */}
      <div
        className="absolute inset-0 opacity-[0.07] mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.6) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
        }}
      />

      {/* vignette so the content always has contrast at the edges */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 35%, rgba(11,11,20,0.7) 100%)",
        }}
      />

      <style jsx>{`
        @keyframes pr-drift-a {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50%      { transform: translate3d(8vw, 12vh, 0) scale(1.15); }
        }
        @keyframes pr-drift-b {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50%      { transform: translate3d(-10vw, -8vh, 0) scale(1.1); }
        }
        @keyframes pr-drift-c {
          0%, 100% { transform: translate3d(0, 0, 0) scale(1); }
          50%      { transform: translate3d(12vw, -10vh, 0) scale(1.2); }
        }
        @media (prefers-reduced-motion: reduce) {
          div { animation: none !important; }
        }
      `}</style>
    </div>
  );
}
