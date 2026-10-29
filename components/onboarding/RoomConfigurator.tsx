"use client";

import React from "react";
import {
  CeilingHeight,
  DesiredAtmosphere,
  MainUse,
  RoomConfig,
  RoomSize,
  RoomType,
} from "@/types";
import { Home, Bed, Briefcase, Tv, Utensils, Maximize2, ArrowUp, Sun, Sparkles } from "lucide-react";

interface RoomConfiguratorProps {
  config: RoomConfig;
  onChange: (updated: Partial<RoomConfig>) => void;
}

const ROOM_TYPES: { id: RoomType; label: string; icon: React.ElementType }[] = [
  { id: "living_room", label: "Living Room", icon: Home },
  { id: "bedroom", label: "Bedroom", icon: Bed },
  { id: "home_office", label: "Home Office", icon: Briefcase },
  { id: "entertainment_room", label: "Entertainment Room", icon: Tv },
  { id: "dining_room", label: "Dining Room", icon: Utensils },
];

const ROOM_SIZES: { id: RoomSize; label: string; detail: string }[] = [
  { id: "small", label: "Small", detail: "~140 sq ft (Compact Studio)" },
  { id: "medium", label: "Medium", detail: "~260 sq ft (Standard Room)" },
  { id: "large", label: "Large", detail: "~450+ sq ft (Open Concept)" },
];

const CEILING_HEIGHTS: { id: CeilingHeight; label: string; detail: string }[] = [
  { id: "standard", label: "Standard", detail: "8' – 9' Flat Ceiling" },
  { id: "high", label: "High / Vaulted", detail: "10'+ Double-Height / Cathedral" },
];

const ATMOSPHERES: { id: DesiredAtmosphere; label: string; desc: string }[] = [
  { id: "cinematic", label: "Cinematic", desc: "High-contrast drama, deep shadows & amber glow" },
  { id: "serene", label: "Serene", desc: "Quiet decompression, soft indirect washes" },
  { id: "luxurious", label: "Luxurious", desc: "Opulent warm layers & tactile metal accents" },
  { id: "minimalist", label: "Minimalist", desc: "Clean gallery neutral, zero ceiling clutter" },
  { id: "vibrant", label: "Vibrant", desc: "High-acuity dynamic illumination & social energy" },
];

const MAIN_USES: { id: MainUse; label: string }[] = [
  { id: "relaxation", label: "Relaxation & Rest" },
  { id: "hosting", label: "Hosting & Socializing" },
  { id: "work", label: "Deep Cognitive Work" },
  { id: "entertainment", label: "Cinema & Media" },
];

export function RoomConfigurator({ config, onChange }: RoomConfiguratorProps) {
  return (
    <div className="space-y-6">
      {/* 1. Room Type */}
      <div className="space-y-2">
        <label className="block text-xs font-mono uppercase tracking-wider text-ivory-300">
          1. Select Room Architecture
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5">
          {ROOM_TYPES.map((rt) => {
            const Icon = rt.icon;
            const isSelected = config.roomType === rt.id;
            return (
              <button
                key={rt.id}
                type="button"
                onClick={() => onChange({ roomType: rt.id })}
                className={`p-3 rounded-xl border text-center transition-all flex flex-col items-center gap-2 ${
                  isSelected
                    ? "bg-amberGold-500/15 border-amberGold-500 text-amberGold-300 shadow-glow-amber"
                    : "bg-charcoal-900 border-charcoal-800 text-ivory-300 hover:border-charcoal-700 hover:text-ivory-100"
                }`}
              >
                <Icon className={`w-5 h-5 ${isSelected ? "text-amberGold-400" : "text-ivory-400"}`} />
                <span className="text-xs font-medium">{rt.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Room Size & Ceiling Height (2 columns) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Size */}
        <div className="space-y-2">
          <label className="block text-xs font-mono uppercase tracking-wider text-ivory-300 flex items-center gap-1.5">
            <Maximize2 className="w-3.5 h-3.5 text-amberGold-400" />
            <span>2. Room Scale</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {ROOM_SIZES.map((sz) => {
              const isSelected = config.roomSize === sz.id;
              return (
                <button
                  key={sz.id}
                  type="button"
                  onClick={() => onChange({ roomSize: sz.id })}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? "bg-amberGold-500/15 border-amberGold-500 text-amberGold-300"
                      : "bg-charcoal-900 border-charcoal-800 text-ivory-300 hover:border-charcoal-700 hover:text-ivory-100"
                  }`}
                >
                  <p className="text-xs font-bold text-ivory-100">{sz.label}</p>
                  <p className="text-[10px] text-ivory-400 mt-0.5">{sz.detail.split(" ")[0]}</p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Ceiling Height */}
        <div className="space-y-2">
          <label className="block text-xs font-mono uppercase tracking-wider text-ivory-300 flex items-center gap-1.5">
            <ArrowUp className="w-3.5 h-3.5 text-amberGold-400" />
            <span>3. Ceiling Height</span>
          </label>
          <div className="grid grid-cols-2 gap-2">
            {CEILING_HEIGHTS.map((ch) => {
              const isSelected = config.ceilingHeight === ch.id;
              return (
                <button
                  key={ch.id}
                  type="button"
                  onClick={() => onChange({ ceilingHeight: ch.id })}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    isSelected
                      ? "bg-amberGold-500/15 border-amberGold-500 text-amberGold-300"
                      : "bg-charcoal-900 border-charcoal-800 text-ivory-300 hover:border-charcoal-700 hover:text-ivory-100"
                  }`}
                >
                  <p className="text-xs font-bold text-ivory-100">{ch.label}</p>
                  <p className="text-[10px] text-ivory-400 mt-0.5">{ch.detail}</p>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. Desired Atmosphere */}
      <div className="space-y-2">
        <label className="block text-xs font-mono uppercase tracking-wider text-ivory-300 flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amberGold-400" />
          <span>4. Desired Emotional Atmosphere</span>
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {ATMOSPHERES.map((atm) => {
            const isSelected = config.atmosphere === atm.id;
            return (
              <button
                key={atm.id}
                type="button"
                onClick={() => onChange({ atmosphere: atm.id })}
                className={`p-3.5 rounded-xl border text-left transition-all ${
                  isSelected
                    ? "bg-amberGold-500/15 border-amberGold-500 text-amberGold-300 shadow-glow-amber"
                    : "bg-charcoal-900 border-charcoal-800 text-ivory-300 hover:border-charcoal-700 hover:text-ivory-100"
                }`}
              >
                <p className="text-xs font-bold text-ivory-100">{atm.label}</p>
                <p className="text-[11px] text-ivory-400 mt-1 leading-snug">{atm.desc}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Main Use */}
      <div className="space-y-2">
        <label className="block text-xs font-mono uppercase tracking-wider text-ivory-300 flex items-center gap-1.5">
          <Sun className="w-3.5 h-3.5 text-amberGold-400" />
          <span>5. Primary Daily Use</span>
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {MAIN_USES.map((mu) => {
            const isSelected = config.mainUse === mu.id;
            return (
              <button
                key={mu.id}
                type="button"
                onClick={() => onChange({ mainUse: mu.id })}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  isSelected
                    ? "bg-amberGold-500/20 border-amberGold-500 text-amberGold-300 font-semibold"
                    : "bg-charcoal-900 border-charcoal-800 text-ivory-300 hover:border-charcoal-700 hover:text-ivory-100"
                }`}
              >
                <span className="text-xs">{mu.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
