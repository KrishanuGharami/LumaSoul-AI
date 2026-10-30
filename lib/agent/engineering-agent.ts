import { AgentStepTrace, LightingBlueprint, QlooInsightEntity, RoomConfig, TastePreference } from "@/types";
import { generateLightingBlueprint } from "../lighting/lighting-engine";

export interface LightingEngineeringOutput {
  blueprint: LightingBlueprint;
  trace: AgentStepTrace;
}

export function runLightingEngineeringAgent(
  roomConfig: RoomConfig,
  tastes: TastePreference[],
  qlooInsights: QlooInsightEntity[],
  provenance: "live_qloo" | "curated_demo",
  endpointUsed: string
): LightingEngineeringOutput {
  const startTime = Date.now();

  const blueprint = generateLightingBlueprint({
    roomConfig,
    tastes,
    qlooInsights,
    provenance,
    apiEndpointUsed: endpointUsed,
  });

  const spec = blueprint.lightingSpecification;
  const trace: AgentStepTrace = {
    id: `trace_stage_4_${Date.now()}`,
    stage: "lighting_engineering",
    agentName: "Lighting Engineering Agent",
    status: "completed",
    title: "Computed Photometrics, Zones & Scene Presets",
    detail: `Engineered ${blueprint.zones.length} independent control zones and ${blueprint.fixtures.length} architectural fixture specifications. Calibrated target to ${spec.colorTemperature.kelvin}K with ${spec.criTarget.label} (${spec.lumenGuidance.totalEstimatedLumens} est. total lumens).`,
    timestamp: startTime,
    outputSummary: `Mapped ${blueprint.zones.length} zones @ ${spec.colorTemperature.kelvin}K, ${spec.criTarget.value} CRI, ${blueprint.scenePresets.length} scenes.`,
    metadata: {
      kelvin: spec.colorTemperature.kelvin,
      cri: spec.criTarget.value,
      totalLumens: spec.lumenGuidance.totalEstimatedLumens,
      zoneCount: blueprint.zones.length,
      fixtureCount: blueprint.fixtures.length,
      presetCount: blueprint.scenePresets.length,
    },
  };

  return {
    blueprint,
    trace,
  };
}
