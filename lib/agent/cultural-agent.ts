import { AgentStepTrace, QlooInsightEntity, TastePreference } from "@/types";
import { fetchQlooInsights } from "../qloo/insights";

export interface CulturalIntelligenceOutput {
  insights: QlooInsightEntity[];
  provenance: "live_qloo" | "curated_demo";
  endpointUsed: string;
  crossDomainSummary: string;
  trace: AgentStepTrace;
}

export async function runCulturalIntelligenceAgent(
  tastes: TastePreference[]
): Promise<CulturalIntelligenceOutput> {
  const startTime = Date.now();

  const entityIds = tastes
    .map((t) => t.qlooEntityId || `ent_${t.category}_${t.name.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`)
    .filter(Boolean);

  const insightsResult = await fetchQlooInsights({
    entityIds,
    targetType: "urn:entity:brand",
    take: 6,
  });

  const provenance = insightsResult.provenance === "live_qloo" ? "live_qloo" : "curated_demo";
  const endpointUsed = insightsResult.provenance === "live_qloo" ? "/v2/insights" : "Curated Cultural Graph";

  const topAffinities = insightsResult.insights
    .slice(0, 3)
    .map((i) => `${i.name} (${Math.round(i.affinity * 100)}%)`)
    .join(", ");

  const crossDomainSummary = `Discovered high-affinity cultural connections: ${topAffinities || "Architectural lighting & tactile materials"}.`;

  const trace: AgentStepTrace = {
    id: `trace_stage_2_${Date.now()}`,
    stage: "cultural_intelligence",
    agentName: "Cultural Intelligence Agent",
    status: "completed",
    title: `Queried Cultural Affinities (${provenance === "live_qloo" ? "Live Qloo /v2/insights" : "Curated Graph"})`,
    detail: `Submitted ${entityIds.length} cultural entity signals. Retrieved ${insightsResult.insights.length} cross-domain affinity insights. Average correlation score: ${(
      insightsResult.insights.reduce((acc, curr) => acc + curr.affinity, 0) / Math.max(1, insightsResult.insights.length)
    ).toFixed(2)}.`,
    timestamp: startTime,
    outputSummary: crossDomainSummary,
    metadata: {
      provenance,
      insightsCount: insightsResult.insights.length,
      durationMs: insightsResult.durationMs,
      message: insightsResult.message,
    },
  };

  return {
    insights: insightsResult.insights,
    provenance,
    endpointUsed,
    crossDomainSummary,
    trace,
  };
}
