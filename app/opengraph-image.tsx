import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "LumaSoul AI: Your Taste. Your Space. Your Light.";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#070709",
          backgroundImage:
            "radial-gradient(circle at 50% 30%, rgba(229, 169, 60, 0.15), transparent 70%), radial-gradient(circle at 80% 80%, rgba(229, 169, 60, 0.08), transparent 50%)",
          fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
          color: "#fbfaf7",
          padding: "60px 80px",
          position: "relative",
        }}
      >
        {/* Subtle border glow frame */}
        <div
          style={{
            position: "absolute",
            inset: "24px",
            border: "1px solid rgba(229, 169, 60, 0.25)",
            borderRadius: "20px",
            display: "flex",
          }}
        />

        {/* Top Eyebrow */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: "24px",
            padding: "8px 20px",
            borderRadius: "9999px",
            backgroundColor: "rgba(229, 169, 60, 0.1)",
            border: "1px solid rgba(229, 169, 60, 0.3)",
          }}
        >
          <div
            style={{
              width: "10px",
              height: "10px",
              borderRadius: "50%",
              backgroundColor: "#e5a93c",
              boxShadow: "0 0 12px #e5a93c",
            }}
          />
          <span
            style={{
              fontSize: "16px",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#e5a93c",
              fontWeight: 600,
            }}
          >
            Qloo Cultural Intelligence • Architectural Lighting
          </span>
        </div>

        {/* Hero Title */}
        <div
          style={{
            fontSize: "64px",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            textAlign: "center",
            background: "linear-gradient(180deg, #ffffff 0%, #e6e1d5 100%)",
            backgroundClip: "text",
            color: "transparent",
            marginBottom: "16px",
          }}
        >
          LumaSoul AI
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: "30px",
            color: "#e5a93c",
            fontWeight: 500,
            letterSpacing: "0.05em",
            marginBottom: "28px",
          }}
        >
          Your Taste. Your Space. Your Light.
        </div>

        {/* Description */}
        <div
          style={{
            fontSize: "20px",
            color: "#9e9684",
            textAlign: "center",
            maxWidth: "780px",
            lineHeight: 1.5,
          }}
        >
          Translating cultural affinities across cinema, music, fashion, and travel into
          bespoke residential architectural lighting blueprints.
        </div>

        {/* Bottom Feature Pill Row */}
        <div
          style={{
            display: "flex",
            gap: "18px",
            marginTop: "44px",
          }}
        >
          {["5-Stage Agentic Pipeline", "Kelvin & CRI Engineering", "SVG Elevation Visualizer", "Contractor-Ready Specs"].map(
            (label, i) => (
              <div
                key={i}
                style={{
                  padding: "6px 16px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(39, 39, 50, 0.6)",
                  border: "1px solid rgba(56, 56, 71, 0.8)",
                  fontSize: "14px",
                  color: "#c7c0b0",
                }}
              >
                {label}
              </div>
            )
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
