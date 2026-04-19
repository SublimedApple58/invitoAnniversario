import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Serena & Tiziano — 1° Anniversario";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1a1a1a",
        }}
      >
        <svg
          width="320"
          height="320"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <radialGradient id="w" cx="38%" cy="32%" r="65%">
              <stop offset="0%" stopColor="#e0c872" />
              <stop offset="25%" stopColor="#d4b85c" />
              <stop offset="50%" stopColor="#c9a84c" />
              <stop offset="75%" stopColor="#b09040" />
              <stop offset="100%" stopColor="#8a7030" />
            </radialGradient>
            <radialGradient id="h" cx="35%" cy="28%" r="30%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
              <stop offset="60%" stopColor="rgba(255,255,255,0.08)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
            <radialGradient id="s" cx="50%" cy="50%" r="50%">
              <stop offset="70%" stopColor="rgba(0,0,0,0)" />
              <stop offset="90%" stopColor="rgba(0,0,0,0.12)" />
              <stop offset="100%" stopColor="rgba(0,0,0,0.25)" />
            </radialGradient>
          </defs>
          <path
            d="M100,10 C118,8 134,13 148,22 C158,17 167,23 172,32 C182,40 189,54 191,70 C195,77 197,87 195,100 C197,112 195,123 189,133 C191,143 185,154 175,162 C169,172 157,180 145,184 C137,190 125,194 113,194 C101,196 89,194 79,190 C67,192 56,186 46,178 C36,172 28,162 22,150 C16,140 12,128 10,116 C6,106 6,94 8,82 C8,70 12,58 20,48 C24,38 32,28 44,22 C54,14 68,10 82,10 Z"
            fill="url(#w)"
          />
          <path
            d="M100,10 C118,8 134,13 148,22 C158,17 167,23 172,32 C182,40 189,54 191,70 C195,77 197,87 195,100 C197,112 195,123 189,133 C191,143 185,154 175,162 C169,172 157,180 145,184 C137,190 125,194 113,194 C101,196 89,194 79,190 C67,192 56,186 46,178 C36,172 28,162 22,150 C16,140 12,128 10,116 C6,106 6,94 8,82 C8,70 12,58 20,48 C24,38 32,28 44,22 C54,14 68,10 82,10 Z"
            fill="url(#h)"
          />
          <path
            d="M100,10 C118,8 134,13 148,22 C158,17 167,23 172,32 C182,40 189,54 191,70 C195,77 197,87 195,100 C197,112 195,123 189,133 C191,143 185,154 175,162 C169,172 157,180 145,184 C137,190 125,194 113,194 C101,196 89,194 79,190 C67,192 56,186 46,178 C36,172 28,162 22,150 C16,140 12,128 10,116 C6,106 6,94 8,82 C8,70 12,58 20,48 C24,38 32,28 44,22 C54,14 68,10 82,10 Z"
            fill="url(#s)"
          />
          <circle cx="100" cy="100" r="62" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="1.5" />
          <circle cx="100" cy="100" r="63" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="0.8" />
          <text x="101" y="110" textAnchor="middle" fontFamily="serif" fontSize="36" fill="rgba(0,0,0,0.3)">S &amp; T</text>
          <text x="99" y="108" textAnchor="middle" fontFamily="serif" fontSize="36" fill="rgba(255,255,255,0.5)">S &amp; T</text>
          <text x="100" y="109" textAnchor="middle" fontFamily="serif" fontSize="36" fill="rgba(250,245,230,0.75)">S &amp; T</text>
        </svg>
      </div>
    ),
    { ...size }
  );
}
