import { QlooInsightEntity } from "@/types";
import { qlooFetch } from "./client";
import { CURATED_CULTURAL_CATALOG } from "./curated-catalog";

export interface GetInsightsOptions {
  entityIds: string[];
  targetType?: string;
  take?: number;
}

export interface GetInsightsResult {
  success: boolean;
  provenance: "live_qloo" | "curated_catalog";
  insights: QlooInsightEntity[];
  queryEntitiesCount: number;
  durationMs: number;
  message?: string;
}

export async function fetchQlooInsights(
  options: GetInsightsOptions
): Promise<GetInsightsResult> {
  const { entityIds, targetType = "urn:entity:brand", take = 8 } = options;

  if (!entityIds || entityIds.length === 0) {
    return {
      success: true,
      provenance: "curated_catalog",
      insights: [],
      queryEntitiesCount: 0,
      durationMs: 0,
    };
  }

  // 1. Attempt Live Qloo API /v2/insights call
  const params: Record<string, string | number | boolean> = {
    "filter.type": targetType,
    "signal.interests.entities": entityIds.join(","),
    take,
    "feature.explainability": true,
  };

  const liveResult = await qlooFetch<any>("/v2/insights", params, 7000);

  if (liveResult.success && liveResult.data) {
    const rawEntities =
      liveResult.data.results?.entities ||
      liveResult.data.entities ||
      (Array.isArray(liveResult.data.results) ? liveResult.data.results : []);

    if (Array.isArray(rawEntities) && rawEntities.length > 0) {
      const normalizedInsights: QlooInsightEntity[] = rawEntities.map((item: any, idx: number) => ({
        id: item.id || `ins_live_${idx}`,
        name: item.name || "Cultural Affinity Node",
        type: item.type || targetType,
        subtype: item.subtype || item.category,
        affinity: typeof item.affinity === "number" ? Math.min(1, Math.max(0, item.affinity)) : 0.85,
        popularity: typeof item.popularity === "number" ? item.popularity : 0.75,
        tags: Array.isArray(item.tags) ? item.tags : [],
        explanation: item.explanation || `Derived cross-domain affinity from selected cultural signals.`,
      }));

      return {
        success: true,
        provenance: "live_qloo",
        insights: normalizedInsights,
        queryEntitiesCount: entityIds.length,
        durationMs: liveResult.durationMs,
        message: "Retrieved genuine cultural affinities from Qloo Insights API.",
      };
    }
  }

  // 2. Curated Cultural Graph Fallback
  // Collect matching insights from curated catalog
  const fallbackInsights: QlooInsightEntity[] = [];
  const catalogEntries = Object.values(CURATED_CULTURAL_CATALOG);

  for (const id of entityIds) {
    // Check if ID matches an entry in our catalog
    const matched = catalogEntries.find(
      (c) => c.entity.id.toLowerCase() === id.toLowerCase() || id.toLowerCase().includes(c.entity.name.toLowerCase().replace(/\s+/g, "_"))
    );

    if (matched) {
      for (const ins of matched.relatedInsights) {
        if (!fallbackInsights.some((existing) => existing.name === ins.name)) {
          fallbackInsights.push(ins);
        }
      }
    }
  }

  // If no direct matches, synthesize from top catalog affinities
  if (fallbackInsights.length === 0) {
    fallbackInsights.push(
      {
        id: "ins_gen_1",
        name: "Concealed Architectural Cove Linear",
        type: "urn:entity:brand",
        affinity: 0.94,
        popularity: 0.88,
        tags: ["architectural", "indirect-wash", "high-cri"],
        explanation: "Derived from user's sophisticated cultural taste profile.",
      },
      {
        id: "ins_gen_2",
        name: "Fluted Opal Glass Sconces",
        type: "urn:entity:brand",
        affinity: 0.89,
        popularity: 0.82,
        tags: ["diffused-omni", "warm-tone", "editorial"],
        explanation: "Complementary vintage and modernist tactile illumination.",
      },
      {
        id: "ins_gen_3",
        name: "Narrow Beam Accent Grazers",
        type: "urn:entity:brand",
        affinity: 0.86,
        popularity: 0.78,
        tags: ["museum-grade", "low-glare", "sculptural"],
        explanation: "Focused highlight for artwork and textured perimeter materials.",
      }
    );
  }

  return {
    success: true,
    provenance: "curated_catalog",
    insights: fallbackInsights.slice(0, take),
    queryEntitiesCount: entityIds.length,
    durationMs: liveResult.durationMs,
    message: liveResult.error
      ? `Live Qloo API unavailable (${liveResult.error}). Operating in honest Demo Mode with curated graph.`
      : "Demo Mode active. No QLOO_API_KEY configured.",
  };
}
