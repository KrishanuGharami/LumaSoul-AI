import React from "react";
import { BookOpen, Layers, CheckCircle, Sliders } from "lucide-react";
import { EvidenceChainItem } from "@/types";

interface DesignRationaleProps {
  rationale: {
    cinematicInfluence: string;
    musicalRhythmLighting: string;
    materialityAndFinishes: string;
    architecturalIntegration: string;
    evidenceChain: EvidenceChainItem[];
  };
  controlRecommendations: {
    systemProtocol: string;
    dimmingProtocol: string;
    wallKeypadConfig: string;
    automationTriggers: string[];
  };
}

export function DesignRationale({
  rationale,
  controlRecommendations,
}: DesignRationaleProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h4 className="font-serif text-lg text-ivory-50 tracking-wide flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amberGold-400" />
          <span>Architectural Design Rationale & Evidence Chain</span>
        </h4>
        <span className="text-xs font-mono text-ivory-400">
          Cultural Translation Logic
        </span>
      </div>

      {/* Narrative Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-800 space-y-2">
          <h5 className="text-xs font-mono uppercase tracking-wider text-amberGold-400">
            Cinematic & Contrast Hierarchy
          </h5>
          <p className="text-xs text-ivory-300 leading-relaxed">
            {rationale.cinematicInfluence}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-800 space-y-2">
          <h5 className="text-xs font-mono uppercase tracking-wider text-amberGold-400">
            Musical Tempo & Dynamic Modulation
          </h5>
          <p className="text-xs text-ivory-300 leading-relaxed">
            {rationale.musicalRhythmLighting}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-800 space-y-2">
          <h5 className="text-xs font-mono uppercase tracking-wider text-amberGold-400">
            Materiality & Tactile Finishes
          </h5>
          <p className="text-xs text-ivory-300 leading-relaxed">
            {rationale.materialityAndFinishes}
          </p>
        </div>

        <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-800 space-y-2">
          <h5 className="text-xs font-mono uppercase tracking-wider text-amberGold-400">
            Seamless Architectural Integration
          </h5>
          <p className="text-xs text-ivory-300 leading-relaxed">
            {rationale.architecturalIntegration}
          </p>
        </div>
      </div>

      {/* Traceable Evidence Chain */}
      <div className="space-y-3">
        <span className="text-[11px] font-mono uppercase tracking-wider text-ivory-400">
          Traceable Evidence Chain (Cultural Input ➔ Photometric Translation)
        </span>

        <div className="space-y-2">
          {rationale.evidenceChain.map((item, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-charcoal-950/70 border border-charcoal-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="flex items-center gap-2.5">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-charcoal-800 text-amberGold-400 border border-charcoal-700">
                  {item.entityType}
                </span>
                <span className="font-semibold text-ivory-100">{item.entityName}</span>
              </div>

              <div className="text-xs text-ivory-300 flex-1 sm:px-4">
                {item.designTranslation}
              </div>

              <span className="font-mono text-[10px] text-emerald-400 self-end sm:self-auto shrink-0">
                Confidence: {Math.round(item.confidence * 100)}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Control Recommendations */}
      <div className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-800 space-y-3">
        <h5 className="text-xs font-mono uppercase tracking-wider text-amberGold-400 flex items-center gap-2">
          <Sliders className="w-3.5 h-3.5" />
          <span>Smart Lighting Control & Protocol Guidelines</span>
        </h5>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 rounded-lg bg-charcoal-950/60 border border-charcoal-800/80">
            <span className="text-[10px] font-mono text-ivory-500 block mb-1">Architecture</span>
            <span className="text-ivory-200 font-medium">{controlRecommendations.systemProtocol}</span>
          </div>
          <div className="p-3 rounded-lg bg-charcoal-950/60 border border-charcoal-800/80">
            <span className="text-[10px] font-mono text-ivory-500 block mb-1">Dimming Curve</span>
            <span className="text-ivory-200 font-medium">{controlRecommendations.dimmingProtocol}</span>
          </div>
          <div className="p-3 rounded-lg bg-charcoal-950/60 border border-charcoal-800/80">
            <span className="text-[10px] font-mono text-ivory-500 block mb-1">Keypad Engraving</span>
            <span className="text-ivory-200 font-medium">{controlRecommendations.wallKeypadConfig}</span>
          </div>
        </div>

        <div className="pt-2 border-t border-charcoal-800">
          <span className="text-[10px] font-mono uppercase tracking-wider text-ivory-400 block mb-1.5">
            Automated Circadian Triggers:
          </span>
          <ul className="space-y-1 text-xs text-ivory-300">
            {controlRecommendations.automationTriggers.map((trig, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <CheckCircle className="w-3 h-3 text-amberGold-400 shrink-0" />
                <span>{trig}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
