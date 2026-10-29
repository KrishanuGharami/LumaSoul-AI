import { QlooEntity, QlooInsightEntity } from "@/types";

export function formatAffinityPercent(affinity: number): string {
  const clamped = Math.max(0, Math.min(1, affinity));
  return `${Math.round(clamped * 100)}%`;
}

export function formatProvenanceBadge(provenance: "live_qloo" | "curated_catalog"): {
  text: string;
  badgeClass: string;
} {
  if (provenance === "live_qloo") {
    return {
      text: "Verified Live Qloo API",
      badgeClass: "bg-emerald-950/80 text-emerald-400 border-emerald-500/30",
    };
  }
  return {
    text: "Demo Cultural Knowledge Graph",
    badgeClass: "bg-amber-950/80 text-amber-300 border-amber-500/30",
  };
}

export function sanitizeEntityList(rawList: any[]): QlooEntity[] {
  if (!Array.isArray(rawList)) return [];

  return rawList.map((item, idx) => ({
    id: String(item.id || item.entity_id || `entity_${idx}`),
    name: String(item.name || item.title || "Unnamed Reference"),
    type: String(item.type || "urn:entity:brand"),
    subtype: item.subtype || item.category || undefined,
    popularity: typeof item.popularity === "number" ? item.popularity : 0.8,
    tags: Array.isArray(item.tags) ? item.tags.map(String) : [],
    description: item.description ? String(item.description) : undefined,
  }));
}
