"use client";

const LACE_COLOR = "rgba(0,0,0,0.4)";
const LACE_LIGHT = "rgba(0,0,0,0.25)";
const LACE_DOT = "rgba(0,0,0,0.3)";

/** Horizontal lace strip SVG (scallops pointing down) */
function HorizontalLace({ flip }: { flip?: boolean }) {
  return (
    <svg
      className="w-full"
      style={{
        height: 20,
        display: "block",
        transform: flip ? "scaleY(-1)" : undefined,
      }}
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id={flip ? "lhF" : "lhN"} x="0" y="0" width="32" height="20" patternUnits="userSpaceOnUse">
          {/* Main scallop */}
          <path d="M0,0 Q8,18 16,0 Q24,18 32,0" fill="none" stroke={LACE_COLOR} strokeWidth="0.8" />
          {/* Inner arcs */}
          <path d="M3,2 Q8,14 13,2" fill="none" stroke={LACE_LIGHT} strokeWidth="0.5" />
          <path d="M19,2 Q24,14 29,2" fill="none" stroke={LACE_LIGHT} strokeWidth="0.5" />
          {/* Dot accents */}
          <circle cx="8" cy="8" r="1" fill="none" stroke={LACE_DOT} strokeWidth="0.5" />
          <circle cx="24" cy="8" r="1" fill="none" stroke={LACE_DOT} strokeWidth="0.5" />
          {/* Junction dots */}
          <circle cx="0" cy="0" r="0.7" fill={LACE_DOT} />
          <circle cx="16" cy="0" r="0.7" fill={LACE_DOT} />
          <circle cx="32" cy="0" r="0.7" fill={LACE_DOT} />
          {/* Tiny diamond */}
          <path d="M16,5 L17.2,7 L16,9 L14.8,7 Z" fill="none" stroke={LACE_LIGHT} strokeWidth="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="20" fill={`url(#${flip ? "lhF" : "lhN"})`} />
    </svg>
  );
}

/** Vertical lace strip SVG (scallops pointing right) */
function VerticalLace({ flip }: { flip?: boolean }) {
  return (
    <svg
      className="h-full"
      style={{
        width: 20,
        display: "block",
        transform: flip ? "scaleX(-1)" : undefined,
      }}
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id={flip ? "lvF" : "lvN"} x="0" y="0" width="20" height="32" patternUnits="userSpaceOnUse">
          {/* Main scallop */}
          <path d="M0,0 Q18,8 0,16 Q18,24 0,32" fill="none" stroke={LACE_COLOR} strokeWidth="0.8" />
          {/* Inner arcs */}
          <path d="M2,3 Q14,8 2,13" fill="none" stroke={LACE_LIGHT} strokeWidth="0.5" />
          <path d="M2,19 Q14,24 2,29" fill="none" stroke={LACE_LIGHT} strokeWidth="0.5" />
          {/* Dot accents */}
          <circle cx="8" cy="8" r="1" fill="none" stroke={LACE_DOT} strokeWidth="0.5" />
          <circle cx="8" cy="24" r="1" fill="none" stroke={LACE_DOT} strokeWidth="0.5" />
          {/* Junction dots */}
          <circle cx="0" cy="0" r="0.7" fill={LACE_DOT} />
          <circle cx="0" cy="16" r="0.7" fill={LACE_DOT} />
          <circle cx="0" cy="32" r="0.7" fill={LACE_DOT} />
          {/* Tiny diamond */}
          <path d="M5,16 L7,17.2 L5,18.4 L3,17.2 Z" fill="none" stroke={LACE_LIGHT} strokeWidth="0.3" />
        </pattern>
      </defs>
      <rect width="20" height="100%" fill={`url(#${flip ? "lvF" : "lvN"})`} />
    </svg>
  );
}

export default function LaceBorder() {
  return (
    <>
      {/* Top */}
      <div className="absolute top-0 left-0 right-0 z-10 pointer-events-none">
        <HorizontalLace />
      </div>
      {/* Bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <HorizontalLace flip />
      </div>
      {/* Left */}
      <div className="absolute top-0 bottom-0 left-0 z-10 pointer-events-none">
        <VerticalLace />
      </div>
      {/* Right */}
      <div className="absolute top-0 bottom-0 right-0 z-10 pointer-events-none">
        <VerticalLace flip />
      </div>
    </>
  );
}
