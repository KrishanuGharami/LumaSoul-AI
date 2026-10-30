import React from "react";
import { Thermometer, Sun, Moon } from "lucide-react";

interface KelvinIndicatorProps {
  kelvin: number;
  label: string;
  explanation: string;
}

export function KelvinIndicator({ kelvin, label, explanation }: KelvinIndicatorProps) {
  // Calculate marker position on 1800K - 4000K scale
  const minK = 1800;
  const maxK = 4000;
  const percentage = Math.min(100, Math.max(0, ((kelvin - minK) / (maxK - minK)) * 100));

  return (
    <div className="space-y-4 p-5 rounded-xl bg-charcoal-900 border border-charcoal-700/80">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Thermometer className="w-4 h-4 text-amberGold-400" />
          <span className="text-xs font-mono uppercase tracking-wider text-ivory-300">
            Color Temperature Spectrum
          </span>
        </div>
        <div className="text-right">
          <span className="font-serif text-2xl font-bold text-amberGold-400">
            {kelvin}K
          </span>
        </div>
      </div>

      {/* Visual Spectrum Bar (1800K candle amber -> 2700K warm -> 4000K crisp) */}
      <div className="relative pt-6 pb-2">
        <div
          className="h-3 w-full rounded-full shadow-inner"
          style={{
            background:
              "linear-gradient(to right, #d97706 0%, #f59e0b 25%, #fbbf24 45%, #fef08a 70%, #e0f2fe 100%)",
          }}
        />

        {/* Selected Kelvin Indicator Pin */}
        <div
          className="absolute top-2 -translate-x-1/2 flex flex-col items-center transition-all duration-500"
          style={{ left: `${percentage}%` }}
        >
          <div className="px-2 py-0.5 rounded bg-charcoal-950 border border-amberGold-400 text-[10px] font-mono font-bold text-amberGold-300 shadow-glow-amber whitespace-nowrap">
            {kelvin}K
          </div>
          <div className="w-0.5 h-3 bg-amberGold-400 mt-0.5" />
        </div>
      </div>

      {/* Kelvin Benchmarks */}
      <div className="flex justify-between text-[10px] font-mono text-ivory-500 pt-1">
        <span className="flex items-center gap-1">
          <Moon className="w-3 h-3 text-amberGold-500" /> 1800K (Candle)
        </span>
        <span>2400K (Sunset)</span>
        <span>2700K (Residential)</span>
        <span>3000K (Gallery)</span>
        <span className="flex items-center gap-1">
          <Sun className="w-3 h-3 text-sky-400" /> 4000K (Daylight)
        </span>
      </div>

      <div className="pt-2 border-t border-charcoal-800">
        <p className="text-xs font-medium text-ivory-100">{label}</p>
        <p className="text-xs text-ivory-400 mt-1 leading-relaxed">{explanation}</p>
      </div>
    </div>
  );
}
