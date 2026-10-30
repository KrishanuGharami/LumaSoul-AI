import { LightingZone, RoomConfig, TastePreference } from "@/types";

export function generateLightingZones(
  roomConfig: RoomConfig,
  tastes: TastePreference[],
  targetKelvin: number
): LightingZone[] {
  const zones: LightingZone[] = [];

  // Zone 1: Perimeter Architectural Cove (Indirect Ambient)
  zones.push({
    id: "zone_perimeter_cove",
    name: "Architectural Perimeter Cove",
    purpose: "cove",
    fixtureType: "Concealed 24V High-CRI Linear LED Strip in Plaster Channel",
    dimmingPercent: 70,
    kelvin: targetKelvin,
    luxTarget: roomConfig.roomType === "bedroom" ? 100 : 180,
    beamAngle: "120° Diffuse Asymmetric Graze",
    placementGuidance:
      "Recessed inside ceiling pocket or drop bulkhead around perimeter walls; indirect bounce prevents direct diode sightlines.",
    controlChannel: "CH-01 (0-10V / DALI)",
  });

  // Zone 2: Focal Area / Centerpiece (Decorative or Pendant)
  let focalFixture = "Architectural Low-Glare Downlights with Deep Baffle";
  let focalLux = 250;
  if (roomConfig.roomType === "dining_room") {
    focalFixture = "Low-Suspended Warm Brass & Fluted Glass Statement Pendant";
    focalLux = 300;
  } else if (roomConfig.roomType === "living_room") {
    focalFixture = "Architectural Triplex Opal Diffused Statement Chandelier";
    focalLux = 220;
  } else if (roomConfig.roomType === "home_office") {
    focalFixture = "Direct/Indirect Micro-Prismatic Linear Task Luminaire";
    focalLux = 400;
  } else if (roomConfig.roomType === "bedroom") {
    focalFixture = "Asymmetric Bedside Drop Pendants & Recessed Reading Beams";
    focalLux = 150;
  }

  zones.push({
    id: "zone_center_focal",
    name: "Primary Gathering Focal Layer",
    purpose: "ambient",
    fixtureType: focalFixture,
    dimmingPercent: 60,
    kelvin: targetKelvin,
    luxTarget: focalLux,
    beamAngle: roomConfig.ceilingHeight === "high" ? "35° Narrow Flood" : "50° Medium Flood",
    placementGuidance:
      "Centered over primary spatial island (seating zone, dining table, or executive desk) maintaining 6'6\" minimum clearance.",
    controlChannel: "CH-02 (Phase / DALI)",
  });

  // Zone 3: Vertical Surface Grazer / Art Accent
  zones.push({
    id: "zone_vertical_accent",
    name: "Vertical Art & Material Grazer",
    purpose: "accent",
    fixtureType: "Adjustable Gimbal Spotlights with Honeycomb Louver",
    dimmingPercent: 85,
    kelvin: Math.min(3200, targetKelvin + 200), // Slightly crisper accent pop
    luxTarget: 350,
    beamAngle: "18° Spot with Hexcell Anti-Glare Louver",
    placementGuidance:
      "Positioned 24\"-30\" from focal wall plane, angled at 30° to emphasize textured finishes and wall-mounted art without reflections.",
    controlChannel: "CH-03 (DALI-2 / Wireless)",
  });

  // Zone 4: Low-Level Plinth / Step / Nighttime Calm
  zones.push({
    id: "zone_low_level",
    name: "Low-Level Floor Horizon Wash",
    purpose: "ambient",
    fixtureType: "Flush Baseboard Asymmetric Step Luminaires & Floating Plinth LEDs",
    dimmingPercent: 30,
    kelvin: Math.max(1800, targetKelvin - 300), // Deep warm glow
    luxTarget: 40,
    beamAngle: "Asymmetric Forward Throw",
    placementGuidance:
      "Installed 10\" above finished floor or beneath floating joinery/credenza to ground the room with warm shadow relief.",
    controlChannel: "CH-04 (Low Voltage 24V)",
  });

  return zones;
}
