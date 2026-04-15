"use client";

const C = "rgba(0,0,0,0.4)";
const L = "rgba(0,0,0,0.22)";
const D = "rgba(0,0,0,0.28)";

function HorizontalLace({ flip }: { flip?: boolean }) {
  return (
    <svg
      className="w-full"
      style={{
        height: 40,
        display: "block",
        transform: flip ? "scaleY(-1)" : undefined,
      }}
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id={flip ? "lhF" : "lhN"} x="0" y="0" width="48" height="40" patternUnits="userSpaceOnUse">
          {/* Outer scallop */}
          <path d="M0,0 Q12,28 24,0 Q36,28 48,0" fill="none" stroke={C} strokeWidth="0.8" />
          {/* Second scallop layer */}
          <path d="M0,4 Q12,24 24,4 Q36,24 48,4" fill="none" stroke={L} strokeWidth="0.5" />
          {/* Inner arcs */}
          <path d="M4,3 Q12,20 20,3" fill="none" stroke={L} strokeWidth="0.5" />
          <path d="M28,3 Q36,20 44,3" fill="none" stroke={L} strokeWidth="0.5" />
          {/* Deeper inner arcs */}
          <path d="M7,4 Q12,15 17,4" fill="none" stroke={D} strokeWidth="0.4" />
          <path d="M31,4 Q36,15 41,4" fill="none" stroke={D} strokeWidth="0.4" />
          {/* Teardrop shapes */}
          <path d="M12,8 Q10,14 12,18 Q14,14 12,8" fill="none" stroke={L} strokeWidth="0.4" />
          <path d="M36,8 Q34,14 36,18 Q38,14 36,8" fill="none" stroke={L} strokeWidth="0.4" />
          {/* Circle accents */}
          <circle cx="12" cy="12" r="2" fill="none" stroke={D} strokeWidth="0.5" />
          <circle cx="36" cy="12" r="2" fill="none" stroke={D} strokeWidth="0.5" />
          {/* Small dots inside circles */}
          <circle cx="12" cy="12" r="0.6" fill={D} />
          <circle cx="36" cy="12" r="0.6" fill={D} />
          {/* Junction dots */}
          <circle cx="0" cy="0" r="1" fill={D} />
          <circle cx="24" cy="0" r="1" fill={D} />
          <circle cx="48" cy="0" r="1" fill={D} />
          {/* Diamond at center bottom */}
          <path d="M24,10 L26,14 L24,18 L22,14 Z" fill="none" stroke={L} strokeWidth="0.4" />
          {/* Tiny fan lines at peaks */}
          <path d="M0,2 L2,6 M0,2 L-1,6" fill="none" stroke={L} strokeWidth="0.3" />
          <path d="M24,2 L26,6 M24,2 L22,6" fill="none" stroke={L} strokeWidth="0.3" />
          <path d="M48,2 L50,6 M48,2 L46,6" fill="none" stroke={L} strokeWidth="0.3" />
          {/* Bottom mesh dots */}
          <circle cx="6" cy="20" r="0.5" fill={L} />
          <circle cx="18" cy="20" r="0.5" fill={L} />
          <circle cx="30" cy="20" r="0.5" fill={L} />
          <circle cx="42" cy="20" r="0.5" fill={L} />
          {/* Bottom connecting line */}
          <path d="M0,22 L48,22" stroke={L} strokeWidth="0.3" />
        </pattern>
      </defs>
      <rect width="100%" height="40" fill={`url(#${flip ? "lhF" : "lhN"})`} />
    </svg>
  );
}

function VerticalLace({ flip }: { flip?: boolean }) {
  return (
    <svg
      className="h-full"
      style={{
        width: 40,
        display: "block",
        transform: flip ? "scaleX(-1)" : undefined,
      }}
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id={flip ? "lvF" : "lvN"} x="0" y="0" width="40" height="48" patternUnits="userSpaceOnUse">
          {/* Outer scallop */}
          <path d="M0,0 Q28,12 0,24 Q28,36 0,48" fill="none" stroke={C} strokeWidth="0.8" />
          {/* Second layer */}
          <path d="M4,0 Q24,12 4,24 Q24,36 4,48" fill="none" stroke={L} strokeWidth="0.5" />
          {/* Inner arcs */}
          <path d="M3,4 Q20,12 3,20" fill="none" stroke={L} strokeWidth="0.5" />
          <path d="M3,28 Q20,36 3,44" fill="none" stroke={L} strokeWidth="0.5" />
          {/* Deeper arcs */}
          <path d="M4,7 Q15,12 4,17" fill="none" stroke={D} strokeWidth="0.4" />
          <path d="M4,31 Q15,36 4,41" fill="none" stroke={D} strokeWidth="0.4" />
          {/* Teardrops */}
          <path d="M8,12 Q14,10 18,12 Q14,14 8,12" fill="none" stroke={L} strokeWidth="0.4" />
          <path d="M8,36 Q14,34 18,36 Q14,38 8,36" fill="none" stroke={L} strokeWidth="0.4" />
          {/* Circles */}
          <circle cx="12" cy="12" r="2" fill="none" stroke={D} strokeWidth="0.5" />
          <circle cx="12" cy="36" r="2" fill="none" stroke={D} strokeWidth="0.5" />
          <circle cx="12" cy="12" r="0.6" fill={D} />
          <circle cx="12" cy="36" r="0.6" fill={D} />
          {/* Junction dots */}
          <circle cx="0" cy="0" r="1" fill={D} />
          <circle cx="0" cy="24" r="1" fill={D} />
          <circle cx="0" cy="48" r="1" fill={D} />
          {/* Diamond */}
          <path d="M10,24 L14,26 L10,28 L6,26 Z" fill="none" stroke={L} strokeWidth="0.4" />
          {/* Mesh dots */}
          <circle cx="20" cy="6" r="0.5" fill={L} />
          <circle cx="20" cy="18" r="0.5" fill={L} />
          <circle cx="20" cy="30" r="0.5" fill={L} />
          <circle cx="20" cy="42" r="0.5" fill={L} />
          {/* Connecting line */}
          <path d="M22,0 L22,48" stroke={L} strokeWidth="0.3" />
        </pattern>
      </defs>
      <rect width="40" height="100%" fill={`url(#${flip ? "lvF" : "lvN"})`} />
    </svg>
  );
}

export default function LaceBorder() {
  return (
    <>
      <div className="absolute top-0 left-0 right-0 z-10 pointer-events-none">
        <HorizontalLace />
      </div>
      <div className="absolute bottom-0 left-0 right-0 z-10 pointer-events-none">
        <HorizontalLace flip />
      </div>
      <div className="absolute top-0 bottom-0 left-0 z-10 pointer-events-none">
        <VerticalLace />
      </div>
      <div className="absolute top-0 bottom-0 right-0 z-10 pointer-events-none">
        <VerticalLace flip />
      </div>
    </>
  );
}
