import React from "react";
import { Sparkles, Compass, ShieldCheck } from "lucide-react";
import { CrossDomainAffinityInsight, QlooInsightEntity, TastePreference } from "@/types";

interface CulturalProfileProps {
  tastes: TastePreference[];
  culturalInsights: QlooInsightEntity[];
  crossDomainAffinities: CrossDomainAffinityInsight[];
  provenance: {
    mode: "live_qloo" | "curated_demo";
    apiEndpointUsed: string;
    statusNote: string;
  };
}

export function CulturalProfile({
  tastes,
  culturalInsights,
  crossDomainAffinities,
  provenance,
}: CulturalProfileProps) {
  const isLive = provenance.mode === "live_qloo";

  return (
    <div className="space-y-6">
      {/* Header and Provenance Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-charcoal-800">
        <div>
          <h4 className="font-serif text-lg text-ivory-50 tracking-wide flex items-center gap-2">
            <Compass className="w-4 h-4 text-amberGold-400" />
            <span>Cultural Intelligence Profile & Qloo Evidence</span>
          </h4>
          <p className="text-xs text-ivory-400 mt-0.5">
            Cross-domain affinities retrieved from cultural taste graph
          </p>
        </div>

        {/* Provenance Badge */}
        <div
          className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-mono font-medium border ${
            isLive
              ? "bg-emerald-950/80 text-emerald-400 border-emerald-500/40 shadow-[0_0_12px_rgba(16,185,129,0.2)]"
              : "bg-amber-950/80 text-amber-300 border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.2)]"
          }`}
        >
          <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
          <span>{isLive ? "PROVENANCE: Live Qloo API (/v2/insights)" : "PROVENANCE: Curated Cultural Graph (Demo)"}</span>
        </div>
      </div>

      {/* Selected Cultural Anchors */}
      <div className="space-y-2">
        <span className="text-[11px] font-mono uppercase tracking-wider text-ivory-400">
          User Cultural Inputs ({tastes.length} Preferences)
        </span>
        <div className="flex flex-wrap gap-2">
          {tastes.map((taste) => (
            <div
              key={taste.id}
              className="px-3 py-1 rounded-lg bg-charcoal-900 border border-charcoal-700 text-xs font-medium text-ivory-200 flex items-center gap-2"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-amberGold-400" />
              <span>{taste.name}</span>
              <span className="text-[10px] text-ivory-500 font-mono">({taste.category})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Qloo Cross-Domain Affinities */}
      <div className="space-y-3">
        <span className="text-[11px] font-mono uppercase tracking-wider text-ivory-400">
          Retrieved Cross-Domain Cultural Affinities & Aesthetic Signals
        </span>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {crossDomainAffinities.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-charcoal-900 border border-charcoal-800 space-y-2 hover:border-charcoal-700 transition-all"
            >
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-ivory-100 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-amberGold-400" />
                  <span>{item.target}</span>
                </span>
                <span className="font-mono text-amberGold-400 font-bold">
                  {Math.round(item.affinityScore * 100)}% Affinity
                </span>
              </div>

              {/* Affinity progress bar */}
              <div className="h-1.5 w-full bg-charcoal-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amberGold-600 to-amberGold-400 rounded-full transition-all duration-700"
                  style={{ width: `${Math.round(item.affinityScore * 100)}%` }}
                />
              </div>

              <p className="text-[11px] text-ivory-400 leading-relaxed">
                {item.rationale}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Provenance status note */}
      <div className="p-3 rounded-lg bg-charcoal-950/70 border border-charcoal-800/80 text-[11px] text-ivory-400 font-mono">
        ℹ️ {provenance.statusNote}
      </div>
    </div>
  );
}
