import React from "react";
import { Compass, Sparkles, Lightbulb, Sliders, ShieldCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "../ui/Card";

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      name: "Taste Research Agent",
      icon: Compass,
      description:
        "Collects and validates your multi-dimensional cultural preferences across cinema, music, fashion brands, and architectural travel.",
    },
    {
      step: "02",
      name: "Cultural Intelligence Agent",
      icon: Sparkles,
      description:
        "Submits real entity identifiers to Qloo's cultural API, analyzing cross-domain affinities and aggregate taste correlations without guessing.",
    },
    {
      step: "03",
      name: "Design Reasoning Agent",
      icon: Lightbulb,
      description:
        "Translates cultural aesthetics (e.g. Neo-Noir shadow contrast, Nordic hygge, Wabi-Sabi textures) into an explainable architectural direction.",
    },
    {
      step: "04",
      name: "Photometric Engineering Agent",
      icon: Sliders,
      description:
        "Computes exact Kelvin color temperatures, high-CRI 90+ targets, architectural lighting zones, beam angles, and scene presets.",
    },
    {
      step: "05",
      name: "Blueprint Validation Agent",
      icon: ShieldCheck,
      description:
        "Audits every photometric parameter against room constraints, validates electrical safety disclosures, and prepares a contractor-ready masterplan.",
    },
  ];

  return (
    <section id="architecture" className="py-20 bg-charcoal-950/60 border-t border-charcoal-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs font-mono uppercase tracking-widest text-amberGold-400 mb-2">
            The Agentic Engine
          </h2>
          <p className="font-serif text-3xl sm:text-4xl text-ivory-50 tracking-tight">
            How Cultural Taste Becomes Architectural Light
          </p>
          <p className="text-sm sm:text-base text-ivory-300 mt-4 leading-relaxed">
            Unlike superficial AI chatbots, LumaSoul AI deploys an observable 5-stage deterministic agent pipeline backed by Qloo&apos;s cultural intelligence graph.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {steps.map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.step} variant="glass" hoverEffect className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-mono font-bold text-amberGold-500/80 bg-amberGold-500/10 px-2 py-0.5 rounded border border-amberGold-500/20">
                      STAGE {s.step}
                    </span>
                    <div className="w-8 h-8 rounded-lg bg-charcoal-800 flex items-center justify-center text-amberGold-400">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>
                  <CardHeader className="p-0 mb-3">
                    <CardTitle className="text-base text-ivory-100">{s.name}</CardTitle>
                  </CardHeader>
                  <CardDescription className="text-xs text-ivory-400 leading-relaxed">
                    {s.description}
                  </CardDescription>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
