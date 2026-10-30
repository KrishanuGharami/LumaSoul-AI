import { LightingFixture, RoomConfig, TastePreference } from "@/types";

export function selectArchitecturalFixtures(
  roomConfig: RoomConfig,
  tastes: TastePreference[],
  criValue: number
): LightingFixture[] {
  // Determine finish based on cultural tastes
  let primaryFinish = "Matte Architectural Bronze & Ebonized Walnut";
  const namesStr = tastes.map((t) => t.name.toLowerCase()).join(" ");

  if (namesStr.includes("aesop") || namesStr.includes("wabi") || namesStr.includes("kyoto")) {
    primaryFinish = "Hand-Cast Unlacquered Brass, Sand-Cast Bronze, & Travertine";
  } else if (namesStr.includes("bauhaus") || namesStr.includes("radiohead")) {
    primaryFinish = "Precision Anodized Black Aluminum & Micro-Prism Glass";
  } else if (namesStr.includes("the row") || namesStr.includes("copenhagen")) {
    primaryFinish = "Brushed Satin Champagne Brass & Acid-Etched Opal Glass";
  } else if (namesStr.includes("blade runner")) {
    primaryFinish = "Patinated Raw Steel, Tinted Smoke Quartz, & Gunmetal";
  }

  return [
    {
      id: "fix_recessed_trimless",
      name: "Solas Micro-Aperture Trimless Downlight",
      category: "recessed",
      finish: "Plaster-in Matte Black Baffle",
      suggestedLumens: 850,
      cri: criValue,
      dimmingProtocol: "0-10V",
      suggestedLocation: "Recessed flush into ceiling drywall; ceiling aperture under 2 inches.",
      architecturalIntent: "Disappears into the ceiling plane, providing glare-free illumination pools.",
    },
    {
      id: "fix_cove_linear",
      name: "Aura concealed Architectural Linear Grazer",
      category: "cove_led",
      finish: "Concealed Aluminum Extrusion with Opal Diffuser",
      suggestedLumens: 1200,
      cri: criValue,
      dimmingProtocol: "DALI-2",
      suggestedLocation: "Hidden inside architectural ceiling reveals and drop ceiling perimeters.",
      architecturalIntent: "Creates floating ceiling sensation and indirect soft volumetric brightness.",
    },
    {
      id: "fix_statement_pendant",
      name: "Vesper Sculptural Multi-Tier Pendant",
      category: "linear_pendant",
      finish: primaryFinish,
      suggestedLumens: 1600,
      cri: criValue,
      dimmingProtocol: "Phase",
      suggestedLocation: "Suspended centrally over conversational seating or dining focus.",
      architecturalIntent: "Acts as the physical centerpiece and cultural touchstone of the room.",
    },
    {
      id: "fix_wall_sconce",
      name: "Komorebi Cast Tactile Wall Luminaire",
      category: "sconce",
      finish: primaryFinish,
      suggestedLumens: 450,
      cri: criValue,
      dimmingProtocol: "Wireless BLE",
      suggestedLocation: "Mounted at 62\" AFF on perimeter accent columns or beside entry portals.",
      architecturalIntent: "Adds horizontal eye-level warmth and artistic shadow silhouettes.",
    },
    {
      id: "fix_floor_horizon",
      name: "Oblique Low-Profile Plinth Grazer",
      category: "floor_lamp",
      finish: "Anodized Dark Basalt",
      suggestedLumens: 300,
      cri: criValue,
      dimmingProtocol: "0-10V",
      suggestedLocation: "Floor-level perimeter grazing along architectural joinery and hearth.",
      architecturalIntent: "Provides grounding contrast and midnight tranquility.",
    },
  ];
}
