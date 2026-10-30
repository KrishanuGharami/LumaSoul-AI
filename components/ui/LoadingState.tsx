import React from "react";
import { Sparkles, Compass, Lightbulb, Sliders, ShieldCheck } from "lucide-react";

interface LoadingStateProps {
  currentStage?: string;
  stageMessage?: string;
}

export function LoadingState({
  currentStage = "cultural_intelligence",
  stageMessage = "Synthesizing cross-domain cultural intelligence...",
}: LoadingStateProps) {
  const stages = [
    { id: "taste_research", label: "Taste Research", icon: Compass },
    { id: "cultural_intelligence", label: "Cultural Intelligence", icon: Sparkles },
    { id: "design_reasoning", label: "Design Reasoning", icon: Lightbulb },
    { id: "lighting_engineering", label: "Photometric Engineering", icon: Sliders },
    { id: "blueprint_validation", label: "Blueprint Validation", icon: ShieldCheck },
  ];

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center max-w-lg mx-auto">
      {/* Pulsing architectural aperture ring */}
      <div className="relative mb-8">
        <div className="w-24 h-24 rounded-full border-2 border-amberGold-500/20 flex items-center justify-center animate-pulse-slow">
          <div className="w-16 h-16 rounded-full border border-amberGold-500/40 flex items-center justify-center shadow-glow-amber">
            <Sparkles className="w-8 h-8 text-amberGold-400 animate-spin" style={{ animationDuration: "6s" }} />
          </div>
        </div>
        <div className="absolute inset-0 rounded-full bg-amberGold-500/10 blur-xl animate-pulse" />
      </div>

      <h3 className="text-xl font-serif text-ivory-50 tracking-wide mb-2">
        Sculpting Your Architectural Masterplan
      </h3>
      <p className="text-sm text-ivory-300 mb-8 max-w-md min-h-[40px]">
        {stageMessage}
      </p>

      {/* Stage pipeline indicator */}
      <div className="w-full space-y-3 bg-charcoal-900/60 p-5 rounded-xl border border-charcoal-800">
        {stages.map((stage, idx) => {
          const Icon = stage.icon;
          const isCurrent = stage.id === currentStage;
          return (
            <div
              key={stage.id}
              className={`flex items-center gap-3 text-xs transition-colors duration-300 ${
                isCurrent
                  ? "text-amberGold-400 font-semibold"
                  : "text-ivory-500"
              }`}
            >
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center border text-[10px] ${
                  isCurrent
                    ? "border-amberGold-500 bg-amberGold-500/20 text-amberGold-300"
                    : "border-charcoal-700 bg-charcoal-800 text-ivory-500"
                }`}
              >
                {idx + 1}
              </div>
              <Icon className="w-4 h-4" />
              <span className="flex-1 text-left">{stage.label}</span>
              {isCurrent && (
                <span className="text-[10px] uppercase tracking-wider text-amberGold-500 font-medium animate-pulse">
                  Processing
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
