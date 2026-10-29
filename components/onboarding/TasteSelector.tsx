"use client";

import React, { useState } from "react";
import { Film, Music, Shirt, Compass, PenTool, Sparkles } from "lucide-react";
import { CulturalCategory, QlooEntity, TastePreference } from "@/types";
import { TasteSearch } from "./TasteSearch";
import { SelectedTastes } from "./SelectedTastes";

interface TasteSelectorProps {
  tastes: TastePreference[];
  onAddTaste: (taste: TastePreference) => void;
  onRemoveTaste: (id: string) => void;
  onClearAll: () => void;
}

const CATEGORIES: { id: CulturalCategory; label: string; icon: React.ElementType }[] = [
  { id: "cinema", label: "Cinema & Directors", icon: Film },
  { id: "music", label: "Music & Artists", icon: Music },
  { id: "fashion", label: "Fashion & Brands", icon: Shirt },
  { id: "travel", label: "Travel & Places", icon: Compass },
  { id: "design", label: "Design Movements", icon: PenTool },
];

// Sample suggestions explicitly labeled as curated discovery suggestions, NOT live API results
const DISCOVERY_SUGGESTIONS: Record<CulturalCategory, { name: string; tag: string }[]> = {
  cinema: [
    { name: "Blade Runner 2049", tag: "Neo-Noir Amber" },
    { name: "In the Mood for Love", tag: "Warm Crimson Tungsten" },
    { name: "Grand Budapest Hotel", tag: "Symmetric Pastel Warmth" },
    { name: "2001: A Space Odyssey", tag: "Clean Minimalist White" },
  ],
  music: [
    { name: "Radiohead", tag: "Atmospheric & Contemplative" },
    { name: "Miles Davis", tag: "Late Night Sanctuary" },
    { name: "Brian Eno", tag: "Ambient Soundscapes" },
    { name: "Nils Frahm", tag: "Acoustic Warmth" },
  ],
  fashion: [
    { name: "Aesop", tag: "Tactile Travertine & Brass" },
    { name: "The Row", tag: "Quiet Architectural Luxury" },
    { name: "Issey Miyake", tag: "Pleated Geometric Form" },
    { name: "Loro Piana", tag: "Natural Texture & Earth" },
  ],
  travel: [
    { name: "Kyoto", tag: "Zen Indirect Shadow" },
    { name: "Copenhagen", tag: "Nordic Glare-Free Hygge" },
    { name: "Amalfi Coast", tag: "Golden Hour Glow" },
    { name: "Reykjavik", tag: "Cool Circadian Contrast" },
  ],
  design: [
    { name: "Bauhaus", tag: "Geometric Clarity" },
    { name: "Wabi-Sabi", tag: "Earthen Imperfection" },
    { name: "Mid-Century Modern", tag: "Warm Wood & Opal" },
    { name: "Japandi", tag: "Minimal Warmth" },
  ],
};

export function TasteSelector({
  tastes,
  onAddTaste,
  onRemoveTaste,
  onClearAll,
}: TasteSelectorProps) {
  const [activeCategory, setActiveCategory] = useState<CulturalCategory>("cinema");

  const handleSelectEntity = (entity: QlooEntity, category: CulturalCategory) => {
    const newTaste: TastePreference = {
      id: `taste_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
      name: entity.name,
      category,
      qlooEntityId: entity.id,
      qlooType: entity.type,
      confidence: 0.95,
      provenance: entity.id.startsWith("ent_custom_") ? "user_defined" : "live_qloo",
    };
    onAddTaste(newTaste);
  };

  const handleSuggestionClick = (name: string, category: CulturalCategory) => {
    // Check if already selected
    if (tastes.some((t) => t.name.toLowerCase() === name.toLowerCase())) return;

    const newTaste: TastePreference = {
      id: `taste_${Date.now()}_${Math.random().toString(36).substring(2, 5)}`,
      name,
      category,
      confidence: 0.94,
      provenance: "curated_catalog",
    };
    onAddTaste(newTaste);
  };

  const selectedNames = tastes.map((t) => t.name.toLowerCase());

  return (
    <div className="space-y-6">
      {/* Selected Taste Summary */}
      <SelectedTastes tastes={tastes} onRemoveTaste={onRemoveTaste} onClearAll={onClearAll} />

      {/* Category Tabs */}
      <div className="border-b border-charcoal-800 pb-2">
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            const countForCat = tastes.filter((t) => t.category === cat.id).length;

            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                  isActive
                    ? "bg-amberGold-500 text-charcoal-950 font-semibold shadow-glow-amber"
                    : "bg-charcoal-900/80 text-ivory-300 border border-charcoal-800 hover:border-charcoal-700 hover:text-ivory-100"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
                {countForCat > 0 && (
                  <span
                    className={`ml-1 px-1.5 py-0.2 rounded-full text-[10px] ${
                      isActive
                        ? "bg-charcoal-950 text-amberGold-400 font-mono font-bold"
                        : "bg-charcoal-800 text-ivory-200"
                    }`}
                  >
                    {countForCat}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Real-Time Qloo Search */}
      <TasteSearch
        category={activeCategory}
        onSelectEntity={handleSelectEntity}
        selectedIds={tastes.map((t) => t.qlooEntityId || t.name)}
      />

      {/* Curated Discovery Suggestions (Sensible sample discovery, strictly labeled as curated suggestions) */}
      <div className="space-y-2 pt-2">
        <div className="flex items-center justify-between text-xs text-ivory-400">
          <span className="font-mono text-[11px] uppercase tracking-wider text-ivory-400">
            Curated Discovery Suggestions ({activeCategory})
          </span>
          <span className="text-[10px] text-ivory-500">Click to add to your profile</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {DISCOVERY_SUGGESTIONS[activeCategory].map((sug) => {
            const isAdded = selectedNames.includes(sug.name.toLowerCase());
            return (
              <button
                key={sug.name}
                onClick={() => handleSuggestionClick(sug.name, activeCategory)}
                disabled={isAdded}
                className={`group px-3 py-1.5 rounded-lg border text-xs text-left transition-all flex items-center gap-2 ${
                  isAdded
                    ? "bg-charcoal-800 border-charcoal-700 text-ivory-500 cursor-default"
                    : "bg-charcoal-900/80 border-charcoal-700/80 hover:border-amberGold-500/50 hover:bg-charcoal-850 text-ivory-200"
                }`}
              >
                <Sparkles className="w-3 h-3 text-amberGold-400 opacity-70 group-hover:opacity-100" />
                <span className="font-medium text-ivory-100">{sug.name}</span>
                <span className="text-[10px] text-ivory-400">· {sug.tag}</span>
                {isAdded && <span className="text-[10px] text-emerald-400 font-mono">✓</span>}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
