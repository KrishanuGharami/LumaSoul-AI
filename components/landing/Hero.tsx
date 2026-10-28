"use client";

import React from "react";
import { ArrowRight, Sparkles, Layers, Sliders, Shield } from "lucide-react";
import { Button } from "../ui/Button";

interface HeroProps {
  onStartDesign: () => void;
  onExploreExperience: () => void;
}

export function Hero({ onStartDesign, onExploreExperience }: HeroProps) {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-28">
      {/* Background ambient lighting atmosphere */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[450px] bg-gradient-to-b from-amberGold-500/15 via-amberGold-600/5 to-transparent blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Editorial Headline & Narrative */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-charcoal-900/90 border border-amberGold-500/30 text-amberGold-300 text-xs font-medium shadow-glow-soft">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Qloo Cultural Intelligence Powered Architecture</span>
            </div>

            <div className="space-y-2">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-ivory-50 tracking-tight leading-[1.15]">
                Your Taste. <br />
                Your Space. <br />
                <span className="bg-gradient-to-r from-amberGold-300 via-amberGold-400 to-amberGold-500 bg-clip-text text-transparent">
                  Your Light.
                </span>
              </h1>
            </div>

            <p className="text-lg sm:text-xl text-ivory-200 font-serif italic max-w-xl mx-auto lg:mx-0">
              &ldquo;Your cultural identity deserves more than a default lighting preset.&rdquo;
            </p>

            <p className="text-sm sm:text-base text-ivory-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              LumaSoul AI maps your unique affinities across cinema, music, fashion, and architecture into a bespoke, museum-grade residential lighting blueprint. Move beyond generic smart-bulb sliders into evidence-based architectural illumination.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <Button size="lg" variant="primary" onClick={onStartDesign} className="w-full sm:w-auto">
                <span>Design My Space</span>
                <ArrowRight className="w-4 h-4" />
              </Button>

              <Button size="lg" variant="outline" onClick={onExploreExperience} className="w-full sm:w-auto">
                Explore the Experience
              </Button>
            </div>

            {/* Architectural Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-charcoal-800/80 max-w-lg mx-auto lg:mx-0">
              <div className="space-y-0.5">
                <div className="text-amberGold-400 font-serif text-lg font-bold">CRI 95+</div>
                <div className="text-xs text-ivory-400">Museum Color Quality</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-amberGold-400 font-serif text-lg font-bold">1800K–4000K</div>
                <div className="text-xs text-ivory-400">Circadian Spectrum</div>
              </div>
              <div className="space-y-0.5">
                <div className="text-amberGold-400 font-serif text-lg font-bold">4-Zone</div>
                <div className="text-xs text-ivory-400">Layered Control</div>
              </div>
            </div>
          </div>

          {/* Right Column: Architectural Lighting Visualization (Not generic AI robot) */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden bg-charcoal-900 border border-charcoal-700/80 p-6 shadow-2xl">
              {/* Top ambient illumination glow */}
              <div className="absolute top-0 inset-x-0 h-24 bg-gradient-to-b from-amberGold-500/25 via-amberGold-500/5 to-transparent pointer-events-none" />

              {/* Header badge */}
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-amberGold-400 animate-pulse" />
                  <span className="text-xs font-mono uppercase tracking-widest text-ivory-300">
                    Architectural Elevation
                  </span>
                </div>
                <span className="text-xs font-mono text-amberGold-400 bg-amberGold-500/10 px-2 py-0.5 rounded border border-amberGold-500/20">
                  2400K Sunset Tungsten
                </span>
              </div>

              {/* Architectural Cross-Section SVG */}
              <div className="relative w-full aspect-[4/3] bg-charcoal-950 rounded-xl overflow-hidden border border-charcoal-800">
                <svg
                  viewBox="0 0 500 375"
                  className="w-full h-full"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    {/* Perimeter Cove Glow */}
                    <linearGradient id="coveGlow" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.7" />
                      <stop offset="40%" stopColor="#d97706" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#0a0a0c" stopOpacity="0" />
                    </linearGradient>

                    {/* Spotlight Cone */}
                    <linearGradient id="spotCone" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fef3c7" stopOpacity="0.8" />
                      <stop offset="70%" stopColor="#f59e0b" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#0a0a0c" stopOpacity="0" />
                    </linearGradient>

                    {/* Floor Horizon Wash */}
                    <linearGradient id="floorGlow" x1="0" y1="1" x2="0" y2="0">
                      <stop offset="0%" stopColor="#d97706" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#0a0a0c" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Ceiling Plane */}
                  <rect x="0" y="0" width="500" height="35" fill="#121217" />
                  <line x1="0" y1="35" x2="500" y2="35" stroke="#2c2c38" strokeWidth="1.5" />

                  {/* Cove Light Pocket */}
                  <rect x="15" y="32" width="470" height="8" fill="#1c1c24" rx="2" />
                  <rect x="25" y="35" width="450" height="90" fill="url(#coveGlow)" opacity="0.85" />

                  {/* Back Wall Plane */}
                  <rect x="40" y="35" width="420" height="280" fill="#0d0d12" />

                  {/* Art Panel on Wall */}
                  <rect x="190" y="90" width="120" height="110" fill="#171720" stroke="#333342" strokeWidth="1" rx="2" />
                  {/* Subtle Art Texture */}
                  <circle cx="250" cy="140" r="30" fill="#20202c" opacity="0.6" />
                  <line x1="210" y1="170" x2="290" y2="170" stroke="#3d3d4f" strokeWidth="1" />

                  {/* Directional Spotlights from Ceiling */}
                  {/* Spot 1: Focusing Art */}
                  <polygon points="250,35 170,205 330,205" fill="url(#spotCone)" opacity="0.45" />
                  <circle cx="250" cy="35" r="4" fill="#fbbf24" />

                  {/* Left Accent Grazer */}
                  <polygon points="100,35 60,315 150,315" fill="url(#spotCone)" opacity="0.25" />
                  <circle cx="100" cy="35" r="3.5" fill="#f59e0b" />

                  {/* Right Accent Grazer */}
                  <polygon points="400,35 350,315 440,315" fill="url(#spotCone)" opacity="0.25" />
                  <circle cx="400" cy="35" r="3.5" fill="#f59e0b" />

                  {/* Floor Line & Plinth Horizon Wash */}
                  <rect x="0" y="315" width="500" height="60" fill="#09090c" />
                  <line x1="0" y1="315" x2="500" y2="315" stroke="#252530" strokeWidth="1.5" />
                  <rect x="0" y="275" width="500" height="40" fill="url(#floorGlow)" />

                  {/* Low Architectural Bench/Credenza */}
                  <rect x="150" y="280" width="200" height="35" fill="#181822" stroke="#2e2e3e" strokeWidth="1" rx="2" />
                  {/* Under-cabinet LED line */}
                  <line x1="160" y1="314" x2="340" y2="314" stroke="#f59e0b" strokeWidth="2.5" opacity="0.9" />

                  {/* Architectural Dimension Lines & Annotations */}
                  <text x="30" y="22" fill="#9e9684" fontSize="9" fontFamily="monospace">ZONE 1: PERIMETER COVE</text>
                  <text x="210" y="22" fill="#e5a93c" fontSize="9" fontFamily="monospace">ZONE 2: ART GRAZER 18°</text>
                  <text x="360" y="340" fill="#9e9684" fontSize="9" fontFamily="monospace">ZONE 4: LOW PLINTH</text>
                </svg>
              </div>

              {/* Micro specs below visualizer */}
              <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-charcoal-800 text-xs">
                <div>
                  <span className="text-ivory-400 block">Illumination Layers:</span>
                  <span className="text-ivory-100 font-medium">Indirect Cove + Art Graze + Floor</span>
                </div>
                <div>
                  <span className="text-ivory-400 block">Dimming Ratio:</span>
                  <span className="text-amberGold-400 font-mono">1:4 Deep Contrast</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
