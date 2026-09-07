type PRMarkProps = {
  size?: number;
  variant?: "tile" | "circle" | "outline";
  className?: string;
};

export function PRMark({ size = 32, variant = "outline", className }: PRMarkProps) {
  const id = `pr-grad-${variant}`;

  if (variant === "outline") {
    const w = Math.round(size * (280 / 240));
    return (
      <svg
        width={w}
        height={size}
        viewBox="0 0 280 240"
        className={className}
        aria-label="PartyRank"
      >
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="240" y2="240" gradientUnits="userSpaceOnUse">
            <stop offset="0" stopColor="#c084fc" />
            <stop offset="0.5" stopColor="#f472b6" />
            <stop offset="1" stopColor="#fb923c" />
          </linearGradient>
        </defs>
        <text
          x="20"
          y="195"
          fontFamily='"Inter", system-ui, sans-serif'
          fontWeight={700}
          fontSize={220}
          letterSpacing={-12}
          fill="none"
          stroke="#fafafa"
          strokeWidth={3}
        >
          p
        </text>
        <text
          x="120"
          y="200"
          fontFamily='"Instrument Serif", Georgia, serif'
          fontStyle="italic"
          fontSize={240}
          fill={`url(#${id})`}
        >
          r
        </text>
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 240 240"
      className={className}
      aria-label="PartyRank"
    >
      <defs>
        <linearGradient id={id} x1="0" y1="0" x2="240" y2="240" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#c084fc" />
          <stop offset="0.5" stopColor="#f472b6" />
          <stop offset="1" stopColor="#fb923c" />
        </linearGradient>
      </defs>
      {variant === "tile" ? (
        <rect width="240" height="240" rx={56} fill={`url(#${id})`} />
      ) : (
        <circle cx="120" cy="120" r="116" fill={`url(#${id})`} />
      )}
      <text
        x="78"
        y="172"
        textAnchor="middle"
        fontFamily='"Inter", system-ui, sans-serif'
        fontWeight={700}
        fontSize={170}
        letterSpacing={-8}
        fill="white"
      >
        p
      </text>
      <text
        x="168"
        y="172"
        textAnchor="middle"
        fontFamily='"Instrument Serif", Georgia, serif'
        fontStyle="italic"
        fontSize={170}
        fill="white"
      >
        r
      </text>
    </svg>
  );
}
