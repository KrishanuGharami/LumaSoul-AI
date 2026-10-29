import { CulturalCategory, QlooEntity } from "@/types";
import { qlooFetch } from "./client";
import { CURATED_CULTURAL_CATALOG } from "./curated-catalog";

const CATEGORY_TO_QLOO_TYPE: Record<CulturalCategory, string> = {
  cinema: "urn:entity:movie",
  music: "urn:entity:artist",
  fashion: "urn:entity:brand",
  travel: "urn:entity:place",
  design: "urn:entity:brand",
};

export interface SearchEntitiesOptions {
  query: string;
  category?: CulturalCategory;
  take?: number;
}

export interface SearchEntitiesResult {
  success: boolean;
  query: string;
  provenance: "live_qloo" | "curated_catalog";
  entities: QlooEntity[];
  message?: string;
  durationMs: number;
}

export async function searchQlooEntities(
  options: SearchEntitiesOptions
): Promise<SearchEntitiesResult> {
  const { query, category, take = 8 } = options;
  const trimmed = query.trim();

  if (!trimmed) {
    return {
      success: true,
      query: "",
      provenance: "curated_catalog",
      entities: [],
      durationMs: 0,
    };
  }

  const qlooType = category ? CATEGORY_TO_QLOO_TYPE[category] : undefined;

  // 1. Try Live Qloo API
  const params: Record<string, string | number> = {
    query: trimmed,
    take,
  };
  if (qlooType) {
    params.types = qlooType;
  }

  const liveResult = await qlooFetch<{ success: boolean; results: any[] }>(
    "/search",
    params,
    6000
  );

  if (liveResult.success && liveResult.data?.results && liveResult.data.results.length > 0) {
    const entities: QlooEntity[] = liveResult.data.results.map((item: any) => ({
      id: item.id || item.entity_id || `urn:qloo:${item.type || "entity"}:${encodeURIComponent(item.name || "item")}`,
      name: item.name || "Unnamed Entity",
      type: item.type || qlooType || "urn:entity:brand",
      subtype: item.subtype || item.category,
      popularity: typeof item.popularity === "number" ? item.popularity : 0.85,
      tags: Array.isArray(item.tags) ? item.tags : [],
      description: item.description,
    }));

    return {
      success: true,
      query: trimmed,
      provenance: "live_qloo",
      entities,
      durationMs: liveResult.durationMs,
    };
  }

  // 2. Fallback to Curated Cultural Knowledge Graph
  const qLower = trimmed.toLowerCase();
  const catalogEntries = Object.values(CURATED_CULTURAL_CATALOG);

  const matched = catalogEntries.filter((record) => {
    const e = record.entity;
    // Match name, subtype, or tags
    const nameMatch = e.name.toLowerCase().includes(qLower);
    const subtypeMatch = e.subtype?.toLowerCase().includes(qLower);
    const tagMatch = e.tags?.some((t) => t.toLowerCase().includes(qLower));

    // Optional category filter
    let catMatch = true;
    if (category) {
      if (category === "cinema") catMatch = e.type === "urn:entity:movie";
      else if (category === "music") catMatch = e.type === "urn:entity:artist";
      else if (category === "fashion") catMatch = e.type === "urn:entity:brand" && Boolean(e.subtype?.includes("Fashion") || e.subtype?.includes("Design"));
      else if (category === "travel") catMatch = e.type === "urn:entity:place";
      else if (category === "design") catMatch = e.type === "urn:entity:brand" || e.name.toLowerCase().includes("bauhaus") || e.name.toLowerCase().includes("wabi");
    }

    return (nameMatch || subtypeMatch || tagMatch) && catMatch;
  });

  // If no match found, create a cleanly tagged candidate so the user isn't blocked
  if (matched.length === 0) {
    // If the query was at least 2 characters, generate a user-entered entity card
    const fallbackEntity: QlooEntity = {
      id: `ent_custom_${trimmed.toLowerCase().replace(/[^a-z0-9]+/g, "_")}`,
      name: trimmed,
      type: qlooType || "urn:entity:brand",
      subtype: category ? `${category.charAt(0).toUpperCase() + category.slice(1)} Influence` : "Cultural Preference",
      popularity: 0.88,
      tags: [`urn:tag:custom:${trimmed.toLowerCase().replace(/\s+/g, "_")}`],
      description: `Custom cultural reference entered by user for architectural lighting design.`,
    };

    return {
      success: true,
      query: trimmed,
      provenance: "curated_catalog",
      entities: [fallbackEntity],
      message: "No live Qloo match found; created custom cultural signal.",
      durationMs: liveResult.durationMs,
    };
  }

  return {
    success: true,
    query: trimmed,
    provenance: "curated_catalog",
    entities: matched.slice(0, take).map((m) => m.entity),
    message: liveResult.error
      ? `Live search unavailable (${liveResult.error}). Resolved using curated cultural graph.`
      : undefined,
    durationMs: liveResult.durationMs,
  };
}
