import React from "react";
import { Sliders, Layers, Compass, Eye } from "lucide-react";
import { LightingZone } from "@/types";

interface LightingZonesProps {
  zones: LightingZone[];
  activeDimmingOverrides?: Record<string, number>;
}

export function LightingZones({ zones, activeDimmingOverrides = {} }: LightingZonesProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-serif text-lg text-ivory-50 tracking-wide flex items-center gap-2">
          <Layers className="w-4 h-4 text-amberGold-400" />
          <span>Architectural Lighting Zones & Photometrics</span>
        </h4>
        <span className="text-xs font-mono text-ivory-400">
          {zones.length} Independent Circuits
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {zones.map((zone, idx) => {
          const currentDimming =
            activeDimmingOverrides[zone.id] !== undefined
              ? activeDimmingOverrides[zone.id]
              : zone.dimmingPercent;

          return (
            <div
              key={zone.id}
              className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700/80 space-y-3 hover:border-charcoal-600 transition-all"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-md bg-charcoal-800 border border-charcoal-700 font-mono text-xs flex items-center justify-center text-amberGold-400 font-bold">
                    0{idx + 1}
                  </span>
                  <div>
                    <h5 className="text-sm font-semibold text-ivory-100">{zone.name}</h5>
                    <span className="text-[10px] uppercase font-mono tracking-wider text-amberGold-400">
                      Layer: {zone.purpose}
                    </span>
                  </div>
                </div>

                <span className="px-2 py-0.5 rounded bg-charcoal-800 text-ivory-300 font-mono text-[10px] border border-charcoal-700 shrink-0">
                  {zone.controlChannel}
                </span>
              </div>

              <div className="text-xs text-ivory-300 space-y-1">
                <p className="font-mono text-[11px] text-ivory-400">{zone.fixtureType}</p>
                <p className="text-[11px] text-ivory-400 leading-relaxed italic">
                  &ldquo;{zone.placementGuidance}&rdquo;
                </p>
              </div>

              {/* Photometric Parameters Grid */}
              <div className="grid grid-cols-4 gap-2 pt-2 border-t border-charcoal-800 text-center font-mono">
                <div className="bg-charcoal-950/60 p-2 rounded-lg border border-charcoal-800">
                  <span className="text-[9px] text-ivory-500 uppercase block">Dimming</span>
                  <span className="text-xs font-bold text-amberGold-400">{currentDimming}%</span>
                </div>
                <div className="bg-charcoal-950/60 p-2 rounded-lg border border-charcoal-800">
                  <span className="text-[9px] text-ivory-500 uppercase block">Kelvin</span>
                  <span className="text-xs font-bold text-ivory-200">{zone.kelvin}K</span>
                </div>
                <div className="bg-charcoal-950/60 p-2 rounded-lg border border-charcoal-800">
                  <span className="text-[9px] text-ivory-500 uppercase block">Target Lux</span>
                  <span className="text-xs font-bold text-ivory-200">{zone.luxTarget} lx</span>
                </div>
                <div className="bg-charcoal-950/60 p-2 rounded-lg border border-charcoal-800">
                  <span className="text-[9px] text-ivory-500 uppercase block">Beam</span>
                  <span className="text-xs font-bold text-ivory-200 truncate">{zone.beamAngle.split(" ")[0]}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
