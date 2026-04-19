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
        {/* Seal circle */}
        <div
          style={{
            width: 280,
            height: 280,
            borderRadius: "50%",
            background: "radial-gradient(circle at 38% 32%, #e0c872, #c9a84c 50%, #8a7030 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 8px 40px rgba(0,0,0,0.5)",
          }}
        >
          {/* Inner ring */}
          <div
            style={{
              width: 220,
              height: 220,
              borderRadius: "50%",
              border: "2px solid rgba(255,255,255,0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                fontSize: 72,
                color: "rgba(250,245,230,0.85)",
                fontFamily: "serif",
                fontStyle: "italic",
                textShadow: "1px 2px 3px rgba(0,0,0,0.3)",
              }}
            >
              S & T
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
