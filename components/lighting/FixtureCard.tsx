import React from "react";
import { Lightbulb, CheckCircle2, Shield } from "lucide-react";
import { LightingFixture } from "@/types";

interface FixtureCardProps {
  fixtures: LightingFixture[];
}

export function FixtureCard({ fixtures }: FixtureCardProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="font-serif text-lg text-ivory-50 tracking-wide flex items-center gap-2">
          <Lightbulb className="w-4 h-4 text-amberGold-400" />
          <span>Recommended Architectural Luminaires & Material Finishes</span>
        </h4>
        <span className="text-xs font-mono text-ivory-400">
          {fixtures.length} Specified Fixtures
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {fixtures.map((fixture) => (
          <div
            key={fixture.id}
            className="p-4 rounded-xl bg-charcoal-900 border border-charcoal-700/80 space-y-3 hover:border-amberGold-500/30 transition-all flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-amberGold-400 bg-amberGold-500/10 px-2 py-0.5 rounded border border-amberGold-500/20">
                  {fixture.category.replace("_", " ")}
                </span>
                <span className="text-[10px] font-mono text-ivory-400">
                  {fixture.dimmingProtocol}
                </span>
              </div>

              <h5 className="text-sm font-semibold text-ivory-100">{fixture.name}</h5>

              <p className="text-xs text-amberGold-300 font-medium">
                Finish: <span className="text-ivory-200 font-normal">{fixture.finish}</span>
              </p>

              <p className="text-xs text-ivory-400 leading-relaxed">
                {fixture.architecturalIntent}
              </p>
            </div>

            <div className="pt-2 border-t border-charcoal-800 space-y-1.5 text-[11px] font-mono text-ivory-400">
              <div className="flex justify-between">
                <span>Output:</span>
                <span className="text-ivory-200">{fixture.suggestedLumens} Lumens</span>
              </div>
              <div className="flex justify-between">
                <span>Color Quality:</span>
                <span className="text-amberGold-400">CRI {fixture.cri}</span>
              </div>
              <div className="text-[10px] text-ivory-500 pt-1 leading-tight">
                Location: {fixture.suggestedLocation}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
