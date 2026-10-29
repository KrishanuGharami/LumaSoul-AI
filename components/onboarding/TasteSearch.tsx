"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, Plus, Sparkles, Loader2, Check } from "lucide-react";
import { CulturalCategory, QlooEntity, TastePreference } from "@/types";

interface TasteSearchProps {
  category: CulturalCategory;
  onSelectEntity: (entity: QlooEntity, category: CulturalCategory) => void;
  selectedIds: string[];
}

export function TasteSearch({ category, onSelectEntity, selectedIds }: TasteSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<QlooEntity[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [provenance, setProvenance] = useState<"live_qloo" | "curated_catalog">("curated_catalog");
  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    if (debounceTimer.current) clearTimeout(debounceTimer.current);

    debounceTimer.current = setTimeout(async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `/api/search?q=${encodeURIComponent(query)}&category=${category}&take=6`
        );
        const data = await res.json();
        if (data.entities) {
          setResults(data.entities);
          setProvenance(data.provenance || "curated_catalog");
        }
      } catch (err) {
        console.error("Search failed:", err);
      } finally {
        setIsLoading(false);
      }
    }, 280);

    return () => {
      if (debounceTimer.current) clearTimeout(debounceTimer.current);
    };
  }, [query, category]);

  const handleCustomAdd = () => {
    if (!query.trim()) return;
    const customEntity: QlooEntity = {
      id: `ent_custom_${Date.now()}`,
      name: query.trim(),
      type: "urn:entity:brand",
      subtype: `${category.charAt(0).toUpperCase() + category.slice(1)} Inspiration`,
      popularity: 0.9,
    };
    onSelectEntity(customEntity, category);
    setQuery("");
    setResults([]);
  };

  return (
    <div className="space-y-4">
      {/* Search Input Bar */}
      <div className="relative">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ivory-400" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={`Search ${category} (e.g. Blade Runner 2049, Radiohead, Aesop, Kyoto, Bauhaus)...`}
          className="w-full pl-10 pr-10 py-3 rounded-xl bg-charcoal-900 border border-charcoal-700/80 text-ivory-100 placeholder-ivory-500 text-sm focus:outline-none focus:border-amberGold-500/60 focus:ring-1 focus:ring-amberGold-500/40 transition-all"
        />
        {isLoading && (
          <Loader2 className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-amberGold-400 animate-spin" />
        )}
      </div>

      {/* Results Dropdown / Grid */}
      {results.length > 0 && (
        <div className="p-2 rounded-xl bg-charcoal-900/95 border border-charcoal-700/80 shadow-2xl space-y-1.5 animate-fade-in">
          <div className="px-3 py-1.5 flex items-center justify-between text-[11px] text-ivory-400 border-b border-charcoal-800">
            <span className="font-mono">Entities Found:</span>
            <span
              className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                provenance === "live_qloo"
                  ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                  : "bg-amber-950 text-amber-300 border border-amber-800"
              }`}
            >
              {provenance === "live_qloo" ? "Live Qloo /search" : "Curated Cultural Catalog"}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 max-h-60 overflow-y-auto p-1">
            {results.map((entity) => {
              const isSelected = selectedIds.includes(entity.id) || selectedIds.includes(entity.name);
              return (
                <div
                  key={entity.id}
                  onClick={() => {
                    if (!isSelected) {
                      onSelectEntity(entity, category);
                      setQuery("");
                      setResults([]);
                    }
                  }}
                  className={`p-2.5 rounded-lg border text-left cursor-pointer transition-all flex items-center justify-between gap-3 ${
                    isSelected
                      ? "bg-charcoal-800/80 border-amberGold-500/50 text-amberGold-300"
                      : "bg-charcoal-950/60 border-charcoal-800 hover:border-charcoal-600 hover:bg-charcoal-800/40 text-ivory-100"
                  }`}
                >
                  <div className="min-w-0">
                    <p className="text-xs font-medium truncate text-ivory-100">{entity.name}</p>
                    <p className="text-[10px] text-ivory-400 truncate">
                      {entity.subtype || entity.type.replace("urn:entity:", "")}
                    </p>
                  </div>

                  <div className="shrink-0">
                    {isSelected ? (
                      <span className="w-6 h-6 rounded-full bg-amberGold-500/20 text-amberGold-400 flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" />
                      </span>
                    ) : (
                      <span className="w-6 h-6 rounded-full bg-charcoal-800 text-ivory-300 hover:bg-amberGold-500 hover:text-charcoal-950 flex items-center justify-center transition-colors">
                        <Plus className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Zero results write-in fallback */}
      {!isLoading && query.trim().length > 1 && results.length === 0 && (
        <div className="p-3 rounded-xl bg-charcoal-900 border border-charcoal-800 flex items-center justify-between text-xs">
          <span className="text-ivory-300">
            No exact catalog match for &ldquo;{query}&rdquo;. Add as custom {category} preference?
          </span>
          <button
            onClick={handleCustomAdd}
            className="px-3 py-1 rounded bg-amberGold-500 text-charcoal-950 font-semibold hover:bg-amberGold-400 transition-colors"
          >
            Add &ldquo;{query}&rdquo;
          </button>
        </div>
      )}
    </div>
  );
}
