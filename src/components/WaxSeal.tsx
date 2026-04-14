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
        className="w-full h-full drop-shadow-[0_6px_20px_rgba(0,0,0,0.6)]"
      >
        <defs>
          {/* Wax base gradient */}
          <radialGradient id="waxBase" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#dcc16e" />
            <stop offset="30%" stopColor="#c9a84c" />
            <stop offset="60%" stopColor="#b5923e" />
            <stop offset="85%" stopColor="#9a7a32" />
            <stop offset="100%" stopColor="#7d6228" />
          </radialGradient>

          {/* Highlight shimmer */}
          <radialGradient id="waxHighlight" cx="35%" cy="30%" r="40%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.35)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.08)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>

          {/* Bottom shadow */}
          <radialGradient id="waxShadow" cx="55%" cy="65%" r="50%">
            <stop offset="0%" stopColor="rgba(0,0,0,0)" />
            <stop offset="60%" stopColor="rgba(0,0,0,0.05)" />
            <stop offset="100%" stopColor="rgba(0,0,0,0.25)" />
          </radialGradient>

          {/* Emboss filter for monogram */}
          <filter id="emboss" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur in="SourceAlpha" stdDeviation="1.5" result="blur" />
            <feOffset in="blur" dx="1" dy="1.5" result="shadowOuter" />
            <feFlood floodColor="rgba(0,0,0,0.4)" result="shadowColor" />
            <feComposite in="shadowColor" in2="shadowOuter" operator="in" result="shadow" />
            <feOffset in="blur" dx="-0.5" dy="-0.8" result="lightOuter" />
            <feFlood floodColor="rgba(255,255,255,0.5)" result="lightColor" />
            <feComposite in="lightColor" in2="lightOuter" operator="in" result="light" />
            <feMerge>
              <feMergeNode in="shadow" />
              <feMergeNode in="light" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Noise texture */}
          <filter id="waxNoise">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.7"
              numOctaves="4"
              seed="3"
              result="noise"
            />
            <feColorMatrix
              in="noise"
              type="saturate"
              values="0"
              result="grayNoise"
            />
            <feBlend in="SourceGraphic" in2="grayNoise" mode="soft-light" />
          </filter>
        </defs>

        {/* Irregular wax shape — hand-poured look */}
        <path
          d="M100,8 C120,6 138,12 152,22 C162,18 170,24 174,34
             C184,42 190,56 192,72 C196,78 198,88 196,100
             C198,112 196,124 190,134 C192,144 186,156 176,164
             C170,174 158,182 146,186 C138,192 126,196 112,196
             C100,198 88,196 78,192 C66,194 54,188 44,180
             C34,174 26,164 20,152 C14,142 10,130 8,118
             C4,108 4,96 6,84 C6,72 10,60 18,50
             C22,40 30,30 42,24 C52,16 66,10 80,8 Z"
          fill="url(#waxBase)"
          filter="url(#waxNoise)"
        />

        {/* Highlight layer */}
        <path
          d="M100,8 C120,6 138,12 152,22 C162,18 170,24 174,34
             C184,42 190,56 192,72 C196,78 198,88 196,100
             C198,112 196,124 190,134 C192,144 186,156 176,164
             C170,174 158,182 146,186 C138,192 126,196 112,196
             C100,198 88,196 78,192 C66,194 54,188 44,180
             C34,174 26,164 20,152 C14,142 10,130 8,118
             C4,108 4,96 6,84 C6,72 10,60 18,50
             C22,40 30,30 42,24 C52,16 66,10 80,8 Z"
          fill="url(#waxHighlight)"
        />

        {/* Shadow layer */}
        <path
          d="M100,8 C120,6 138,12 152,22 C162,18 170,24 174,34
             C184,42 190,56 192,72 C196,78 198,88 196,100
             C198,112 196,124 190,134 C192,144 186,156 176,164
             C170,174 158,182 146,186 C138,192 126,196 112,196
             C100,198 88,196 78,192 C66,194 54,188 44,180
             C34,174 26,164 20,152 C14,142 10,130 8,118
             C4,108 4,96 6,84 C6,72 10,60 18,50
             C22,40 30,30 42,24 C52,16 66,10 80,8 Z"
          fill="url(#waxShadow)"
        />

        {/* Inner rim — pressed ring */}
        <circle
          cx="100"
          cy="100"
          r="62"
          fill="none"
          stroke="rgba(255,255,255,0.15)"
          strokeWidth="1.5"
        />
        <circle
          cx="100"
          cy="100"
          r="60"
          fill="none"
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="1"
        />

        {/* Monogram — embossed into the wax */}
        <text
          x="100"
          y="108"
          textAnchor="middle"
          fontFamily="var(--font-script), cursive"
          fontSize="36"
          fill="rgba(250,248,245,0.85)"
          filter="url(#emboss)"
        >
          S &amp; T
        </text>
      </svg>
    </motion.button>
  );
}
