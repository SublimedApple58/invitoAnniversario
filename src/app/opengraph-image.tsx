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
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1a1a1a",
          fontFamily: "serif",
        }}
      >
        {/* Cream card */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#faf8f5",
            borderRadius: 8,
            padding: "60px 80px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          }}
        >
          <div
            style={{
              fontSize: 28,
              color: "#4a4a4a",
              letterSpacing: "0.2em",
              textTransform: "uppercase" as const,
              marginBottom: 12,
            }}
          >
            Sei invitato
          </div>
          <div
            style={{
              fontSize: 64,
              color: "#2c2c2c",
              fontStyle: "italic",
              marginBottom: 16,
            }}
          >
            Serena &amp; Tiziano
          </div>
          <div
            style={{
              fontSize: 24,
              color: "#4a4a4a",
              letterSpacing: "0.15em",
              textTransform: "uppercase" as const,
              marginBottom: 24,
            }}
          >
            1° Anniversario di Matrimonio
          </div>
          <div
            style={{
              width: 60,
              height: 1,
              backgroundColor: "#c9a84c",
              marginBottom: 24,
            }}
          />
          <div
            style={{
              fontSize: 32,
              color: "#c9a84c",
              letterSpacing: "0.1em",
            }}
          >
            30 Maggio 2026
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
