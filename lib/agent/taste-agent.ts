import { AgentStepTrace, RoomConfig, TastePreference } from "@/types";

export interface TasteResearchOutput {
  validatedTastes: TastePreference[];
  culturalFocusAreas: string[];
  roomRequirements: {
    roomType: string;
    atmosphere: string;
    primaryLightingChallenge: string;
  };
  trace: AgentStepTrace;
}

export function runTasteResearchAgent(
  tastes: TastePreference[],
  roomConfig: RoomConfig
): TasteResearchOutput {
  const startTime = Date.now();

  // Deduplicate and sanitize tastes
  const seen = new Set<string>();
  const validatedTastes: TastePreference[] = [];

  for (const t of tastes) {
    const key = `${t.category}:${t.name.toLowerCase().trim()}`;
    if (!seen.has(key) && t.name.trim().length > 0) {
      seen.add(key);
      validatedTastes.push({
        ...t,
        name: t.name.trim(),
        confidence: t.confidence || 0.95,
      });
    }
  }

  const culturalFocusAreas = Array.from(new Set(validatedTastes.map((t) => t.category)));

  let primaryLightingChallenge = "Balancing architectural drama with everyday visual ergonomics.";
  if (roomConfig.roomType === "bedroom") {
    primaryLightingChallenge = "Minimizing high-angle glare and supporting circadian wind-down with warm-dimming.";
  } else if (roomConfig.roomType === "home_office") {
    primaryLightingChallenge = "Providing high-acuity task illumination without computer monitor specular reflection.";
  } else if (roomConfig.roomType === "dining_room") {
    primaryLightingChallenge = "Illuminating the tabletop intimacy while keeping guest sightlines softly shielded.";
  }

  const trace: AgentStepTrace = {
    id: `trace_stage_1_${Date.now()}`,
    stage: "taste_research",
    agentName: "Taste Research Agent",
    status: "completed",
    title: "Analyzed Cultural Preferences & Spatial Boundary",
    detail: `Validated ${validatedTastes.length} cultural preferences across ${culturalFocusAreas.length} categories (${culturalFocusAreas.join(", ")}). Identified key spatial constraint for ${roomConfig.roomType.replace("_", " ")}.`,
    timestamp: startTime,
    outputSummary: `Organized ${validatedTastes.length} taste nodes. Identified priority: ${primaryLightingChallenge}`,
    metadata: {
      tasteCount: validatedTastes.length,
      categories: culturalFocusAreas,
      roomType: roomConfig.roomType,
      roomSize: roomConfig.roomSize,
    },
  };

  return {
    validatedTastes,
    culturalFocusAreas,
    roomRequirements: {
      roomType: roomConfig.roomType,
      atmosphere: roomConfig.atmosphere,
      primaryLightingChallenge,
    },
    trace,
  };
}
