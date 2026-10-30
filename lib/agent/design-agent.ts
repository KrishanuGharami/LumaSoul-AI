import { AgentStepTrace, QlooInsightEntity, RoomConfig, TastePreference } from "@/types";

export interface DesignReasoningOutput {
  designConcept: string;
  lightingLayersStrategy: string[];
  contrastRatio: string;
  recommendedFinishes: string[];
  trace: AgentStepTrace;
}

export function runDesignReasoningAgent(
  tastes: TastePreference[],
  roomConfig: RoomConfig,
  qlooInsights: QlooInsightEntity[]
): DesignReasoningOutput {
  const startTime = Date.now();

  const primaryTaste = tastes[0]?.name || "Modern Architecture";
  const insightNames = qlooInsights.map((i) => i.name).slice(0, 2).join(" & ");

  const designConcept = `Harmonizing the visual ethos of ${primaryTaste} with ${insightNames || "subtle indirect illumination"}. Sculpting the room with intentional shadow hierarchy rather than indiscriminate floodlighting.`;

  const lightingLayersStrategy = [
    "Concealed perimeter cove creates indirect, floating ceiling illumination.",
    "Low-glare micro-aperture downlights cast intimate pools over conversational zones.",
    "Directional wall grazers reveal natural textures and art surfaces at 30° angles.",
    "Floor-level horizon luminaires ground the space with soothing nocturnal tranquility.",
  ];

  let contrastRatio = "Balanced Residential 3:1";
  if (roomConfig.atmosphere === "cinematic") contrastRatio = "Dramatic Cinematic 6:1";
  else if (roomConfig.atmosphere === "minimalist") contrastRatio = "Subtle Uniformity 2:1";
  else if (roomConfig.atmosphere === "luxurious") contrastRatio = "Rich Layered 4:1";

  const recommendedFinishes = [
    "Patinated Hand-Finished Brass",
    "Anodized Matte Basalt Aluminum",
    "Acid-Etched Fluted Opal Glass",
    "Plaster-in Trimless Seamless Drywall Flanges",
  ];

  const trace: AgentStepTrace = {
    id: `trace_stage_3_${Date.now()}`,
    stage: "design_reasoning",
    agentName: "Design Reasoning Agent",
    status: "completed",
    title: "Synthesized Architectural Lighting Philosophy",
    detail: `Converted cross-domain evidence into a ${contrastRatio} contrast hierarchy. Established 4 architectural photometric layers balancing illumination depth with human visual comfort.`,
    timestamp: startTime,
    outputSummary: `Direction: ${designConcept.slice(0, 120)}...`,
    metadata: {
      contrastRatio,
      layersCount: lightingLayersStrategy.length,
      finishesCount: recommendedFinishes.length,
    },
  };

  return {
    designConcept,
    lightingLayersStrategy,
    contrastRatio,
    recommendedFinishes,
    trace,
  };
}
