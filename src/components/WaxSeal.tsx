"use client";

import { motion } from "framer-motion";

export default function WaxSeal({ onClick }: { onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      className="relative w-24 h-24 cursor-pointer focus:outline-none"
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Apri l'invito"
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-full"
        style={{ filter: "drop-shadow(0 6px 16px rgba(0,0,0,0.5))" }}
      >
        <defs>
          {/* Main wax gradient */}
          <radialGradient id="waxBase" cx="38%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#e0c872" />
            <stop offset="25%" stopColor="#d4b85c" />
            <stop offset="50%" stopColor="#c9a84c" />
            <stop offset="75%" stopColor="#b09040" />
            <stop offset="100%" stopColor="#8a7030" />
          </radialGradient>

          {/* Specular highlight */}
          <radialGradient id="highlight" cx="35%" cy="28%" r="30%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
            <stop offset="60%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>

          {/* Edge shadow */}
          <radialGradient id="edgeShadow" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="rgba(0,0,0,0)" />
            <stop offset="90%" stopColor="rgba(0,0,0,0.12)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.25)" />
          </radialGradient>

          {/* Clip path for the wax shape */}
          <clipPath id="waxClip">
            <path d="M100,10 C118,8 134,13 148,22 C158,17 167,23 172,32
               C182,40 189,54 191,70 C195,77 197,87 195,100
               C197,112 195,123 189,133 C191,143 185,154 175,162
               C169,172 157,180 145,184 C137,190 125,194 113,194
               C101,196 89,194 79,190 C67,192 56,186 46,178
               C36,172 28,162 22,150 C16,140 12,128 10,116
               C6,106 6,94 8,82 C8,70 12,58 20,48
               C24,38 32,28 44,22 C54,14 68,10 82,10 Z" />
          </clipPath>
        </defs>

        {/* Wax body — irregular shape */}
        <path
          d="M100,10 C118,8 134,13 148,22 C158,17 167,23 172,32
             C182,40 189,54 191,70 C195,77 197,87 195,100
             C197,112 195,123 189,133 C191,143 185,154 175,162
             C169,172 157,180 145,184 C137,190 125,194 113,194
             C101,196 89,194 79,190 C67,192 56,186 46,178
             C36,172 28,162 22,150 C16,140 12,128 10,116
             C6,106 6,94 8,82 C8,70 12,58 20,48
             C24,38 32,28 44,22 C54,14 68,10 82,10 Z"
          fill="url(#waxBase)"
        />

        {/* Subtle surface variation — clipped to shape */}
        <g clipPath="url(#waxClip)">
          <ellipse cx="70" cy="70" rx="45" ry="40" fill="rgba(255,255,255,0.06)" />
          <ellipse cx="140" cy="140" rx="35" ry="30" fill="rgba(0,0,0,0.06)" />
          <ellipse cx="60" cy="150" rx="25" ry="20" fill="rgba(255,255,255,0.03)" />
          <ellipse cx="150" cy="60" rx="20" ry="25" fill="rgba(0,0,0,0.04)" />
        </g>

        {/* Highlight */}
        <path
          d="M100,10 C118,8 134,13 148,22 C158,17 167,23 172,32
             C182,40 189,54 191,70 C195,77 197,87 195,100
             C197,112 195,123 189,133 C191,143 185,154 175,162
             C169,172 157,180 145,184 C137,190 125,194 113,194
             C101,196 89,194 79,190 C67,192 56,186 46,178
             C36,172 28,162 22,150 C16,140 12,128 10,116
             C6,106 6,94 8,82 C8,70 12,58 20,48
             C24,38 32,28 44,22 C54,14 68,10 82,10 Z"
          fill="url(#highlight)"
        />

        {/* Edge darkening */}
        <path
          d="M100,10 C118,8 134,13 148,22 C158,17 167,23 172,32
             C182,40 189,54 191,70 C195,77 197,87 195,100
             C197,112 195,123 189,133 C191,143 185,154 175,162
             C169,172 157,180 145,184 C137,190 125,194 113,194
             C101,196 89,194 79,190 C67,192 56,186 46,178
             C36,172 28,162 22,150 C16,140 12,128 10,116
             C6,106 6,94 8,82 C8,70 12,58 20,48
             C24,38 32,28 44,22 C54,14 68,10 82,10 Z"
          fill="url(#edgeShadow)"
        />

        {/* Pressed rim — outer */}
        <circle
          cx="100" cy="100" r="62"
          fill="none"
          stroke="rgba(0,0,0,0.18)"
          strokeWidth="1.5"
        />
        {/* Pressed rim — inner highlight */}
        <circle
          cx="100" cy="100" r="63"
          fill="none"
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="0.8"
        />

        {/* Inner pressed area — slightly darker */}
        <circle
          cx="100" cy="100" r="60"
          fill="rgba(0,0,0,0.04)"
        />

        {/* Monogram — embossed look via layered text */}
        {/* Shadow layer */}
        <text
          x="101" y="110"
          textAnchor="middle"
          fontFamily="var(--font-script), cursive"
          fontSize="36"
          fill="rgba(0,0,0,0.3)"
        >
          S &amp; T
        </text>
        {/* Highlight layer */}
        <text
          x="99" y="108"
          textAnchor="middle"
          fontFamily="var(--font-script), cursive"
          fontSize="36"
          fill="rgba(255,255,255,0.5)"
        >
          S &amp; T
        </text>
        {/* Main text */}
        <text
          x="100" y="109"
          textAnchor="middle"
          fontFamily="var(--font-script), cursive"
          fontSize="36"
          fill="rgba(250,245,230,0.75)"
        >
          S &amp; T
        </text>
      </svg>
    </motion.button>
  );
}
