"use client";

import React from "react";
import { LightingZone, RoomConfig, ScenePreset } from "@/types";

interface RoomVisualizerProps {
  roomConfig: RoomConfig;
  zones: LightingZone[];
  activePreset?: ScenePreset;
  currentKelvin: number;
  zoneDimmingOverrides?: Record<string, number>;
  onZoneDimmingChange?: (zoneId: string, dimming: number) => void;
}

export function RoomVisualizer({
  roomConfig,
  zones,
  activePreset,
  currentKelvin,
  zoneDimmingOverrides = {},
  onZoneDimmingChange,
}: RoomVisualizerProps) {
  // Helper to determine dimming % for a zone (from override or preset or default)
  const getZoneDimming = (zoneId: string, defaultVal: number): number => {
    if (zoneDimmingOverrides[zoneId] !== undefined) {
      return zoneDimmingOverrides[zoneId];
    }
    if (activePreset?.zoneDimming?.[zoneId] !== undefined) {
      return activePreset.zoneDimming[zoneId];
    }
    return defaultVal;
  };

  const coveDimming = getZoneDimming("zone_perimeter_cove", 70);
  const focalDimming = getZoneDimming("zone_center_focal", 60);
  const accentDimming = getZoneDimming("zone_vertical_accent", 85);
  const floorDimming = getZoneDimming("zone_low_level", 35);

  // Derive light color based on Kelvin
  const getKelvinColor = (kelvin: number): string => {
    if (kelvin <= 2000) return "#f59e0b"; // candle amber
    if (kelvin <= 2400) return "#fbbf24"; // sunset amber
    if (kelvin <= 2800) return "#fef08a"; // soft residential warm
    if (kelvin <= 3200) return "#fef9c3"; // gallery neutral
    return "#e0f2fe"; // crisp daylight
  };

  const kelvinHex = getKelvinColor(currentKelvin);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between text-xs">
        <span className="font-mono text-ivory-300 flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-amberGold-400 animate-pulse" />
          <span>Interactive Photometric Room Elevation</span>
        </span>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-amberGold-400 bg-amberGold-500/10 px-2 py-0.5 rounded border border-amberGold-500/20">
            {currentKelvin}K Kelvin
          </span>
          {activePreset && (
            <span className="text-xs text-ivory-300 font-medium">
              Preset: <strong className="text-ivory-100">{activePreset.name}</strong>
            </span>
          )}
        </div>
      </div>

      {/* Main Room Elevation Stage */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-charcoal-950 rounded-2xl overflow-hidden border border-charcoal-700/80 shadow-2xl transition-all duration-500">
        <svg
          viewBox="0 0 800 450"
          className="w-full h-full select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Ambient Cove Glow */}
            <linearGradient id="liveCoveGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={kelvinHex} stopOpacity={(coveDimming / 100) * 0.9} />
              <stop offset="50%" stopColor={kelvinHex} stopOpacity={(coveDimming / 100) * 0.3} />
              <stop offset="100%" stopColor="#070709" stopOpacity="0" />
            </linearGradient>

            {/* Focal Downlight Cone */}
            <linearGradient id="liveFocalCone" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity={(focalDimming / 100) * 0.95} />
              <stop offset="30%" stopColor={kelvinHex} stopOpacity={(focalDimming / 100) * 0.65} />
              <stop offset="100%" stopColor="#070709" stopOpacity="0" />
            </linearGradient>

            {/* Accent Art Grazer Cone */}
            <linearGradient id="liveAccentCone" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity={(accentDimming / 100) * 0.9} />
              <stop offset="50%" stopColor={kelvinHex} stopOpacity={(accentDimming / 100) * 0.5} />
              <stop offset="100%" stopColor="#070709" stopOpacity="0" />
            </linearGradient>

            {/* Floor Horizon Wash */}
            <linearGradient id="liveFloorGlow" x1="0" y1="1" x2="0" y2="0">
              <stop offset="0%" stopColor={kelvinHex} stopOpacity={(floorDimming / 100) * 0.6} />
              <stop offset="100%" stopColor="#070709" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Deep Architectural Background Wall */}
          <rect x="0" y="0" width="800" height="450" fill="#08080b" />

          {/* Back Wall Plane with subtle texture */}
          <rect x="50" y="40" width="700" height="340" fill="#0e0e14" />
          <line x1="280" y1="40" x2="280" y2="380" stroke="#171720" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="520" y1="40" x2="520" y2="380" stroke="#171720" strokeWidth="1" strokeDasharray="3 3" />

          {/* ZONE 1: Perimeter Cove (Volumetric Ambient Wash) */}
          <rect
            x="40"
            y="40"
            width="720"
            height="140"
            fill="url(#liveCoveGlow)"
            className="transition-all duration-500"
          />

          {/* Artwork on Focal Wall (Zone 3 Target) */}
          <rect
            x="110"
            y="110"
            width="140"
            height="130"
            fill="#151520"
            stroke="#2e2e3e"
            strokeWidth="1.5"
            rx="3"
          />
          <circle cx="180" cy="175" r="35" fill="#1e1e2b" />
          <line x1="130" y1="210" x2="230" y2="210" stroke="#3b3b4f" strokeWidth="1" />

          {/* Sculptural Shelving / Architectural Niches */}
          <rect x="550" y="90" width="160" height="180" fill="#121219" stroke="#252535" strokeWidth="1" rx="2" />
          <line x1="550" y1="150" x2="710" y2="150" stroke="#252535" strokeWidth="1.5" />
          <line x1="550" y1="210" x2="710" y2="210" stroke="#252535" strokeWidth="1.5" />

          {/* ZONE 3: Vertical Art Grazer Beam (18° Narrow Spot) */}
          <polygon
            points="180,40 70,260 290,260"
            fill="url(#liveAccentCone)"
            className="transition-all duration-500"
          />
          <circle cx="180" cy="40" r="5" fill="#ffffff" opacity={accentDimming > 10 ? 0.9 : 0.2} />

          {/* Right Niche Grazer */}
          <polygon
            points="630,40 530,270 730,270"
            fill="url(#liveAccentCone)"
            opacity={(accentDimming / 100) * 0.4}
            className="transition-all duration-500"
          />
          <circle cx="630" cy="40" r="4.5" fill="#ffffff" opacity={accentDimming > 10 ? 0.7 : 0.2} />

          {/* ZONE 2: Primary Gathering Focal Downlights */}
          <polygon
            points="400,40 260,370 540,370"
            fill="url(#liveFocalCone)"
            className="transition-all duration-500"
          />
          <circle cx="400" cy="40" r="6" fill="#ffffff" opacity={focalDimming > 10 ? 0.95 : 0.2} />

          {/* Sculptural Centerpiece Luminaire (Pendant or Modern Flush) */}
          <line x1="400" y1="40" x2="400" y2="160" stroke="#2c2c3a" strokeWidth="2" />
          <ellipse
            cx="400"
            cy="165"
            rx="32"
            ry="12"
            fill="#1c1c28"
            stroke={kelvinHex}
            strokeWidth={focalDimming > 10 ? 2 : 0.5}
            className="transition-all duration-500"
          />
          {focalDimming > 10 && (
            <ellipse
              cx="400"
              cy="165"
              rx="24"
              ry="8"
              fill={kelvinHex}
              opacity={(focalDimming / 100) * 0.8}
              className="blur-xs"
            />
          )}

          {/* Seating Island / Table */}
          <rect
            x="320"
            y="310"
            width="160"
            height="45"
            fill="#14141e"
            stroke="#2a2a3b"
            strokeWidth="1.5"
            rx="4"
          />

          {/* ZONE 4: Floor Horizon Wash (Grounding Calm) */}
          <rect
            x="0"
            y="330"
            width="800"
            height="50"
            fill="url(#liveFloorGlow)"
            className="transition-all duration-500"
          />

          {/* Architectural Floor Plane */}
          <rect x="0" y="380" width="800" height="70" fill="#07070a" />
          <line x1="0" y1="380" x2="800" y2="380" stroke="#1f1f2b" strokeWidth="2" />

          {/* Baseboard Step Light Fixtures */}
          <rect x="70" y="365" width="8" height="12" fill="#181822" rx="1" />
          <circle cx="74" cy="371" r="2.5" fill={kelvinHex} opacity={floorDimming > 5 ? 0.9 : 0.1} />

          <rect x="720" y="365" width="8" height="12" fill="#181822" rx="1" />
          <circle cx="724" cy="371" r="2.5" fill={kelvinHex} opacity={floorDimming > 5 ? 0.9 : 0.1} />

          {/* Floating Credenza */}
          <rect x="80" y="335" width="140" height="35" fill="#161622" stroke="#2b2b3d" strokeWidth="1" rx="2" />
          {/* Under-cabinet LED strip */}
          <line
            x1="85"
            y1="370"
            x2="215"
            y2="370"
            stroke={kelvinHex}
            strokeWidth="2.5"
            opacity={(floorDimming / 100) * 0.9}
          />

          {/* Ceiling Plane & Pocket Annotations */}
          <rect x="0" y="0" width="800" height="40" fill="#111116" />
          <line x1="0" y1="40" x2="800" y2="40" stroke="#252533" strokeWidth="1.5" />

          {/* Live Zone Status Labels directly on the elevation */}
          <text x="50" y="25" fill="#c7c0b0" fontSize="10" fontFamily="monospace">
            Z1 COVE: {coveDimming}%
          </text>
          <text x="350" y="25" fill="#e5a93c" fontSize="10" fontFamily="monospace">
            Z2 FOCAL: {focalDimming}%
          </text>
          <text x="140" y="100" fill="#f4bf53" fontSize="9" fontFamily="monospace">
            Z3 ART: {accentDimming}%
          </text>
          <text x="660" y="415" fill="#c7c0b0" fontSize="10" fontFamily="monospace">
            Z4 FLOOR: {floorDimming}%
          </text>
        </svg>
      </div>

      {/* Live Zone Dimming Modulation Controls */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-charcoal-900/60 p-4 rounded-xl border border-charcoal-800">
        <div>
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-ivory-300">Z1: Perimeter Cove</span>
            <span className="text-amberGold-400 font-mono">{coveDimming}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={coveDimming}
            onChange={(e) => onZoneDimmingChange?.("zone_perimeter_cove", parseInt(e.target.value, 10))}
            className="w-full accent-amberGold-500 h-1 bg-charcoal-700 rounded-lg cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-ivory-300">Z2: Center Focal</span>
            <span className="text-amberGold-400 font-mono">{focalDimming}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={focalDimming}
            onChange={(e) => onZoneDimmingChange?.("zone_center_focal", parseInt(e.target.value, 10))}
            className="w-full accent-amberGold-500 h-1 bg-charcoal-700 rounded-lg cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-ivory-300">Z3: Art Grazer</span>
            <span className="text-amberGold-400 font-mono">{accentDimming}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={accentDimming}
            onChange={(e) => onZoneDimmingChange?.("zone_vertical_accent", parseInt(e.target.value, 10))}
            className="w-full accent-amberGold-500 h-1 bg-charcoal-700 rounded-lg cursor-pointer"
          />
        </div>

        <div>
          <div className="flex justify-between text-[11px] mb-1">
            <span className="text-ivory-300">Z4: Low Plinth</span>
            <span className="text-amberGold-400 font-mono">{floorDimming}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={floorDimming}
            onChange={(e) => onZoneDimmingChange?.("zone_low_level", parseInt(e.target.value, 10))}
            className="w-full accent-amberGold-500 h-1 bg-charcoal-700 rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
