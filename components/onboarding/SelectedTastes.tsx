import React from "react";
import { X, Sparkles, Film, Music, Shirt, Compass, PenTool } from "lucide-react";
import { CulturalCategory, TastePreference } from "@/types";

interface SelectedTastesProps {
  tastes: TastePreference[];
  onRemoveTaste: (id: string) => void;
  onClearAll: () => void;
}

const CATEGORY_ICONS: Record<CulturalCategory, React.ElementType> = {
  cinema: Film,
  music: Music,
  fashion: Shirt,
  travel: Compass,
  design: PenTool,
};

const CATEGORY_COLORS: Record<CulturalCategory, string> = {
  cinema: "border-red-500/30 text-red-300 bg-red-950/30",
  music: "border-purple-500/30 text-purple-300 bg-purple-950/30",
  fashion: "border-amber-500/30 text-amber-300 bg-amber-950/30",
  travel: "border-emerald-500/30 text-emerald-300 bg-emerald-950/30",
  design: "border-blue-500/30 text-blue-300 bg-blue-950/30",
};

export function SelectedTastes({ tastes, onRemoveTaste, onClearAll }: SelectedTastesProps) {
  if (tastes.length === 0) {
    return (
      <div className="p-4 rounded-xl border border-dashed border-charcoal-700/80 bg-charcoal-900/40 text-center">
        <p className="text-xs text-ivory-400">
          No cultural preferences selected yet. Search or choose from the curated inspirations below.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-mono text-ivory-300 flex items-center gap-1.5 font-medium">
          <Sparkles className="w-3.5 h-3.5 text-amberGold-400" />
          <span>Selected Cultural Signals ({tastes.length})</span>
        </span>
        <button
          onClick={onClearAll}
          className="text-ivory-500 hover:text-ivory-200 text-[11px] underline transition-colors"
        >
          Clear all
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {tastes.map((taste) => {
          const Icon = CATEGORY_ICONS[taste.category] || Sparkles;
          const colorClass = CATEGORY_COLORS[taste.category] || "border-charcoal-700 text-ivory-300";

          return (
            <div
              key={taste.id}
              className={`inline-flex items-center gap-2 pl-2.5 pr-2 py-1.5 rounded-lg border text-xs font-medium transition-all ${colorClass}`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0 opacity-80" />
              <span className="text-ivory-100">{taste.name}</span>
              <span className="text-[10px] text-ivory-400 uppercase tracking-wider">
                ({taste.category})
              </span>
              <button
                onClick={() => onRemoveTaste(taste.id)}
                className="p-0.5 rounded-full hover:bg-charcoal-800 text-ivory-400 hover:text-ivory-100 transition-colors ml-0.5"
                aria-label={`Remove ${taste.name}`}
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
