"use client";

import React from "react";
import { Film, Flame, Lightbulb, Users, Moon } from "lucide-react";
import { ScenePreset } from "@/types";

interface SceneSelectorProps {
  presets: ScenePreset[];
  activePresetId: string;
  onSelectPreset: (preset: ScenePreset) => void;
}

const PRESET_ICONS: Record<string, React.ElementType> = {
  Film: Film,
  Flame: Flame,
  Lightbulb: Lightbulb,
  Users: Users,
  Moon: Moon,
};

export function SceneSelector({
  presets,
  activePresetId,
  onSelectPreset,
}: SceneSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs">
        <span className="font-mono text-ivory-300 uppercase tracking-wider">
          Architectural Scene Presets
        </span>
        <span className="text-ivory-500 text-[11px]">Select to preview real-time dimming</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {presets.map((preset) => {
          const Icon = PRESET_ICONS[preset.icon] || Lightbulb;
          const isActive = preset.id === activePresetId;

          return (
            <button
              key={preset.id}
              onClick={() => onSelectPreset(preset)}
              className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex flex-col justify-between ${
                isActive
                  ? "bg-amberGold-500/15 border-amberGold-500 shadow-glow-amber text-ivory-50"
                  : "bg-charcoal-900 border-charcoal-800 hover:border-charcoal-700 text-ivory-300 hover:text-ivory-100"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center ${
                      isActive ? "bg-amberGold-500 text-charcoal-950 font-bold" : "bg-charcoal-800 text-ivory-400"
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-[10px] font-mono font-medium text-amberGold-400">
                    {preset.overallKelvin}K
                  </span>
                </div>

                <div>
                  <p className="text-xs font-bold text-ivory-100">{preset.name}</p>
                  <p className="text-[10px] text-ivory-400 line-clamp-2 mt-1 leading-snug">
                    {preset.tagline}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
