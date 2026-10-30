import { DesiredAtmosphere, RoomConfig, TastePreference } from "@/types";
import { CURATED_CULTURAL_CATALOG } from "../qloo/curated-catalog";

export interface KelvinTargetResult {
  kelvin: number;
  label: string;
  explanation: string;
  minKelvin: number;
  maxKelvin: number;
}

export function calculateArchitecturalKelvin(
  roomConfig: RoomConfig,
  tastes: TastePreference[]
): KelvinTargetResult {
  // Base Kelvin based on atmosphere
  let baseKelvin = 2700;
  switch (roomConfig.atmosphere) {
    case "cinematic":
      baseKelvin = 2200; // Warm sodium vapor / tungsten
      break;
    case "serene":
      baseKelvin = 2400; // Soft tranquil sunset
      break;
    case "luxurious":
      baseKelvin = 2500; // Deep opulent candle-to-amber
      break;
    case "minimalist":
      baseKelvin = 2900; // Clean gallery neutral
      break;
    case "vibrant":
      baseKelvin = 3200; // Dynamic energizing
      break;
  }

  // Room type adjustments
  if (roomConfig.roomType === "bedroom") {
    baseKelvin -= 200;
  } else if (roomConfig.roomType === "home_office") {
    baseKelvin += 400;
  } else if (roomConfig.roomType === "entertainment_room") {
    baseKelvin -= 300;
  }

  // Cultural taste biases
  let culturalDelta = 0;
  for (const taste of tastes) {
    const slug = taste.name.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const catalogEntry = CURATED_CULTURAL_CATALOG[slug];
    if (catalogEntry?.lightingProfile?.kelvinBias) {
      culturalDelta += catalogEntry.lightingProfile.kelvinBias;
    } else {
      // General heuristics
      if (taste.category === "cinema") culturalDelta -= 100;
      if (taste.category === "travel" && taste.name.toLowerCase().includes("kyoto")) culturalDelta -= 300;
      if (taste.category === "design" && taste.name.toLowerCase().includes("bauhaus")) culturalDelta += 200;
    }
  }

  if (tastes.length > 0) {
    culturalDelta = Math.round(culturalDelta / Math.max(1, tastes.length));
  }

  const finalKelvin = Math.max(2000, Math.min(4000, Math.round((baseKelvin + culturalDelta) / 50) * 50));

  let label = "Warm Amber Filament";
  let explanation = "Intimate, relaxing warmth evoking twilight and candle illumination.";

  if (finalKelvin <= 2200) {
    label = "Ultra-Warm Candlelit Glow";
    explanation = "Deep cinematic amber (2000K-2200K) inspired by classic cinema cinematography and shadow architecture.";
  } else if (finalKelvin <= 2500) {
    label = "Sunset Amber Tungsten";
    explanation = "Rich golden warmth (2400K-2500K) accentuating natural wood, travertine, and textiles without visual fatigue.";
  } else if (finalKelvin <= 2800) {
    label = "Soft Architectural White";
    explanation = "Refined residential standard (2700K) providing high-fidelity visual comfort and elegant evening relaxation.";
  } else if (finalKelvin <= 3200) {
    label = "Crisp Gallery Neutral";
    explanation = "Neutral architectural white (3000K-3200K) designed for high visual acuity, art curation, and mindful daytime focus.";
  } else {
    label = "Dynamic Circadian Focus";
    explanation = "Energizing daylight-balanced illumination (3500K-4000K) calibrated for productive modern tasks.";
  }

  return {
    kelvin: finalKelvin,
    label,
    explanation,
    minKelvin: 1800,
    maxKelvin: 4000,
  };
}

export function calculateCriTarget(tastes: TastePreference[]): {
  value: number;
  label: string;
  rationale: string;
} {
  // Higher priority for fashion and cinema lovers where color fidelity (R9 saturated red) is vital
  const hasFashionOrArt = tastes.some(
    (t) => t.category === "fashion" || t.category === "cinema" || t.category === "design"
  );

  if (hasFashionOrArt) {
    return {
      value: 98,
      label: "Museum-Grade CRI 98 (R9 > 90)",
      rationale:
        "High-fidelity spectrum rendering ensures authentic skin tones, fabric weave saturation, and architectural material richness without color drift.",
    };
  }

  return {
    value: 93,
    label: "Architectural Premium CRI 93+",
    rationale:
      "Far exceeds commercial LED grade (CRI 80), rendering interior spaces with depth, clarity, and true color representation.",
  };
}
