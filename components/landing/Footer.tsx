import React from "react";
import { Sparkles, ShieldAlert, Cpu } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-charcoal-800/80 bg-charcoal-950 py-12 text-xs text-ivory-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amberGold-400 to-amberGold-600 flex items-center justify-center text-charcoal-950">
              <Sparkles className="w-4 h-4 fill-current" />
            </div>
            <div>
              <span className="font-serif text-sm font-bold text-ivory-100 tracking-wide">
                LumaSoul AI
              </span>
              <p className="text-[10px] text-ivory-500 uppercase tracking-wider">
                Your Taste. Your Space. Your Light.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6 text-ivory-400">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-amberGold-400" />
              <span>Powered by Qloo Cultural Intelligence</span>
            </span>
            <span className="text-charcoal-700">•</span>
            <span>Next.js 15 App Router</span>
          </div>
        </div>

        {/* Electrical Safety Disclaimer */}
        <div className="p-4 rounded-xl bg-charcoal-900/60 border border-charcoal-800/80 text-[11px] leading-relaxed text-ivory-400">
          <div className="flex items-center gap-2 text-amberGold-400 font-semibold mb-1">
            <ShieldAlert className="w-4 h-4" />
            <span>Electrical Safety & Installation Notice</span>
          </div>
          <p>
            LumaSoul AI produces conceptual architectural lighting specifications, photometric zoning, and atmosphere guidelines based on cultural intelligence evidence. These recommendations do not replace engineered electrical construction documents. All wiring runs, circuit breaker capacities, driver heat sink ratings, and ceiling structural weight tolerances must be evaluated and signed off by a licensed electrical contractor in adherence with applicable National Electrical Code (NEC) regulations.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-charcoal-900 text-ivory-500">
          <p>© {new Date().getFullYear()} LumaSoul AI. Architectural cultural lighting architect.</p>
          <p className="text-[10px] text-ivory-500">Qloo LLM Hackathon Project</p>
        </div>
      </div>
    </footer>
  );
}
