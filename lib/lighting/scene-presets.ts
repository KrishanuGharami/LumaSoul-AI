import { ScenePreset } from "@/types";

export function generateScenePresets(baseKelvin: number): ScenePreset[] {
  return [
    {
      id: "preset_cinematic_evening",
      name: "Cinematic Evening",
      tagline: "High-contrast drama with deep linear shadows and amber warmth",
      description:
        "Ceiling ambient downlights recede to 20%; vertical art grazers pop at 85% with warm perimeter cove backlight creating depth.",
      icon: "Film",
      overallKelvin: Math.max(1900, baseKelvin - 400),
      zoneDimming: {
        zone_perimeter_cove: 40,
        zone_center_focal: 25,
        zone_vertical_accent: 90,
        zone_low_level: 60,
      },
    },
    {
      id: "preset_warm_retreat",
      name: "Warm Retreat",
      tagline: "Ultra-cozy decompression inspired by candlelit evening glow",
      description:
        "All high-angle glare extinguished. Perimeter and low-level step lights create an intimate cocoon of gentle amber illumination.",
      icon: "Flame",
      overallKelvin: Math.max(1800, baseKelvin - 500),
      zoneDimming: {
        zone_perimeter_cove: 30,
        zone_center_focal: 15,
        zone_vertical_accent: 30,
        zone_low_level: 70,
      },
    },
    {
      id: "preset_creative_focus",
      name: "Creative Focus",
      tagline: "High-acuity task illumination balanced by soft indirect diffusion",
      description:
        "Raises color temperature to 3200K+ with 85% task layer and balanced ceiling wash to prevent eye strain during deep cognitive work.",
      icon: "Lightbulb",
      overallKelvin: Math.min(3800, baseKelvin + 600),
      zoneDimming: {
        zone_perimeter_cove: 80,
        zone_center_focal: 90,
        zone_vertical_accent: 60,
        zone_low_level: 20,
      },
    },
    {
      id: "preset_social_gathering",
      name: "Social Gathering",
      tagline: "Flattering, convivial illumination designed for conversation",
      description:
        "Balanced multi-layered lighting that flatters facial features, illuminates glassware, and establishes welcoming spatial flow.",
      icon: "Users",
      overallKelvin: baseKelvin,
      zoneDimming: {
        zone_perimeter_cove: 65,
        zone_center_focal: 70,
        zone_vertical_accent: 75,
        zone_low_level: 40,
      },
    },
    {
      id: "preset_midnight_calm",
      name: "Midnight Calm",
      tagline: "Low-circadian night navigation without melatonin disruption",
      description:
        "Ceiling layers completely off. Ultra-low 1800K baseboard skimming light guides movement safely while preserving nocturnal rest.",
      icon: "Moon",
      overallKelvin: 1800,
      zoneDimming: {
        zone_perimeter_cove: 0,
        zone_center_focal: 0,
        zone_vertical_accent: 0,
        zone_low_level: 25,
      },
    },
  ];
}
