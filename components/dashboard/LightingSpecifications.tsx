import React from "react";
import { Sliders, Sun, ShieldCheck, Activity } from "lucide-react";
import { KelvinIndicator } from "../lighting/KelvinIndicator";

interface LightingSpecificationsProps {
  specification: {
    overallConcept: string;
    culturalInspiration: string;
    colorTemperature: {
      kelvin: number;
      label: string;
      explanation: string;
    };
    criTarget: {
      value: number;
      label: string;
      rationale: string;
    };
    lumenGuidance: {
      totalEstimatedLumens: number;
      ambientLumens: number;
      accentLumens: number;
      taskLumens: number;
      roomSquareFootage: number;
      wattsPerSqFtEst: number;
    };
    circadianAdaptation: string;
  };
}

export function LightingSpecifications({ specification }: LightingSpecificationsProps) {
  const { colorTemperature, criTarget, lumenGuidance, circadianAdaptation } = specification;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="font-serif text-lg text-ivory-50 tracking-wide flex items-center gap-2">
          <Sliders className="w-4 h-4 text-amberGold-400" />
          <span>Photometric & Technical Specifications</span>
        </h4>
        <span className="text-xs font-mono text-ivory-400">
          {lumenGuidance.roomSquareFootage} Sq Ft Masterplan
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Kelvin Indicator with visual spectrum */}
        <KelvinIndicator
          kelvin={colorTemperature.kelvin}
          label={colorTemperature.label}
          explanation={colorTemperature.explanation}
        />

        {/* Right: CRI Target & Lumen Calculation Cards */}
        <div className="space-y-4">
          {/* CRI Card */}
          <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700/80 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-ivory-300 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Color Rendering Target</span>
              </span>
              <span className="font-serif text-xl font-bold text-amberGold-400">
                CRI {criTarget.value}+
              </span>
            </div>
            <p className="text-xs font-semibold text-ivory-100">{criTarget.label}</p>
            <p className="text-xs text-ivory-400 leading-relaxed">{criTarget.rationale}</p>
          </div>

          {/* Lumen Breakdown Card */}
          <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700/80 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-ivory-300 flex items-center gap-1.5">
                <Sun className="w-4 h-4 text-amberGold-400" />
                <span>Estimated Spatial Lumens</span>
              </span>
              <span className="font-mono text-base font-bold text-ivory-50">
                {lumenGuidance.totalEstimatedLumens.toLocaleString()} lm
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
              <div className="p-2 rounded-lg bg-charcoal-950/70 border border-charcoal-800">
                <span className="text-[10px] text-ivory-500 block">Ambient (45%)</span>
                <span className="font-bold text-amberGold-400">{lumenGuidance.ambientLumens} lm</span>
              </div>
              <div className="p-2 rounded-lg bg-charcoal-950/70 border border-charcoal-800">
                <span className="text-[10px] text-ivory-500 block">Accent (30%)</span>
                <span className="font-bold text-amberGold-400">{lumenGuidance.accentLumens} lm</span>
              </div>
              <div className="p-2 rounded-lg bg-charcoal-950/70 border border-charcoal-800">
                <span className="text-[10px] text-ivory-500 block">Task (25%)</span>
                <span className="font-bold text-amberGold-400">{lumenGuidance.taskLumens} lm</span>
              </div>
            </div>

            <p className="text-[10px] text-ivory-400 font-mono">
              Density: ~{Math.round(lumenGuidance.totalEstimatedLumens / lumenGuidance.roomSquareFootage)} lm/sq ft ({lumenGuidance.wattsPerSqFtEst} W/sq ft LED estimated).
            </p>
          </div>
        </div>
      </div>

      {/* Circadian Health Note */}
      <div className="p-4 rounded-xl bg-charcoal-950/70 border border-charcoal-800/80 flex items-start gap-3">
        <Activity className="w-4 h-4 text-amberGold-400 shrink-0 mt-0.5" />
        <div className="text-xs text-ivory-300 leading-relaxed">
          <strong className="text-ivory-100 block mb-0.5">Circadian Rhythm & Melatonin Protection:</strong>
          {circadianAdaptation}
        </div>
      </div>
    </div>
  );
}
