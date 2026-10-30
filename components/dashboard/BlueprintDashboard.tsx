"use client";

import React, { useState } from "react";
import {
  Printer,
  RotateCcw,
  Sparkles,
  Share2,
  Check,
  ShieldAlert,
  Sliders,
  Layers,
  BookOpen,
  Calendar,
} from "lucide-react";
import { AgentStepTrace, LightingBlueprint, ScenePreset } from "@/types";
import { Button } from "../ui/Button";
import { RoomVisualizer } from "../lighting/RoomVisualizer";
import { SceneSelector } from "../lighting/SceneSelector";
import { LightingZones } from "../lighting/LightingZones";
import { FixtureCard } from "../lighting/FixtureCard";
import { CulturalProfile } from "./CulturalProfile";
import { LightingSpecifications } from "./LightingSpecifications";
import { DesignRationale } from "./DesignRationale";
import { AgentActivity } from "./AgentActivity";

interface BlueprintDashboardProps {
  blueprint: LightingBlueprint;
  traces: AgentStepTrace[];
  executionTimeMs: number;
  onReconfigure: () => void;
}

export function BlueprintDashboard({
  blueprint,
  traces,
  executionTimeMs,
  onReconfigure,
}: BlueprintDashboardProps) {
  // Manage active scene preset
  const [activePreset, setActivePreset] = useState<ScenePreset>(
    blueprint.scenePresets[0] || {
      id: "preset_cinematic_evening",
      name: "Cinematic Evening",
      tagline: "High contrast drama",
      description: "Default scene",
      icon: "Film",
      overallKelvin: blueprint.lightingSpecification.colorTemperature.kelvin,
      zoneDimming: {},
    }
  );

  // Manage individual zone dimming overrides
  const [zoneDimmingOverrides, setZoneDimmingOverrides] = useState<Record<string, number>>(
    activePreset.zoneDimming || {}
  );

  const [copiedLink, setCopiedLink] = useState(false);

  const handleSelectPreset = (preset: ScenePreset) => {
    setActivePreset(preset);
    setZoneDimmingOverrides(preset.zoneDimming || {});
  };

  const handleZoneDimmingChange = (zoneId: string, dimming: number) => {
    setZoneDimmingOverrides((prev) => ({
      ...prev,
      [zoneId]: dimming,
    }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  const currentKelvin = activePreset.overallKelvin || blueprint.lightingSpecification.colorTemperature.kelvin;

  return (
    <div className="space-y-10 py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Top Action Bar (Print / Edit / Share) */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-charcoal-800 print:hidden">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amberGold-500/10 border border-amberGold-500/30 text-amberGold-300 text-xs font-mono font-medium mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Certified Architectural Lighting Masterplan</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-ivory-50 tracking-tight">
            {blueprint.title}
          </h1>
          <p className="text-sm text-ivory-300 mt-1 max-w-2xl leading-relaxed">
            {blueprint.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Button variant="outline" size="sm" onClick={onReconfigure}>
            <RotateCcw className="w-4 h-4" />
            <span>Reconfigure Space</span>
          </Button>

          <Button variant="secondary" size="sm" onClick={handleShare}>
            {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            <span>{copiedLink ? "Link Copied" : "Share"}</span>
          </Button>

          <Button variant="primary" size="sm" onClick={handlePrint}>
            <Printer className="w-4 h-4" />
            <span>Export Blueprint</span>
          </Button>
        </div>
      </div>

      {/* Printable Document Header (Appears only during Print / PDF generation) */}
      <div className="hidden print:block text-black mb-8 border-b-2 border-black pb-4">
        <h1 className="text-2xl font-bold font-serif">{blueprint.title}</h1>
        <p className="text-sm text-gray-700">{blueprint.subtitle}</p>
        <div className="flex justify-between text-xs font-mono text-gray-600 mt-2">
          <span>Masterplan ID: {blueprint.id}</span>
          <span>Date: {new Date(blueprint.timestamp).toLocaleDateString()}</span>
          <span>Engineered via LumaSoul AI & Qloo API</span>
        </div>
      </div>

      {/* Section 1: Interactive Scene Presets & Room Elevation Visualizer */}
      <section className="space-y-6">
        <SceneSelector
          presets={blueprint.scenePresets}
          activePresetId={activePreset.id}
          onSelectPreset={handleSelectPreset}
        />

        <RoomVisualizer
          roomConfig={blueprint.roomConfig}
          zones={blueprint.zones}
          activePreset={activePreset}
          currentKelvin={currentKelvin}
          zoneDimmingOverrides={zoneDimmingOverrides}
          onZoneDimmingChange={handleZoneDimmingChange}
        />
      </section>

      {/* Section 2: Cultural Profile & Qloo Evidence */}
      <section className="p-6 rounded-2xl bg-charcoal-900/60 border border-charcoal-800">
        <CulturalProfile
          tastes={blueprint.culturalProfile.tastes}
          culturalInsights={blueprint.culturalProfile.culturalInsights}
          crossDomainAffinities={blueprint.culturalProfile.crossDomainAffinities}
          provenance={blueprint.dataProvenance}
        />
      </section>

      {/* Section 3: Technical Specifications & Photometrics */}
      <section className="p-6 rounded-2xl bg-charcoal-900/60 border border-charcoal-800">
        <LightingSpecifications specification={blueprint.lightingSpecification} />
      </section>

      {/* Section 4: Architectural Lighting Zones */}
      <section className="p-6 rounded-2xl bg-charcoal-900/60 border border-charcoal-800">
        <LightingZones zones={blueprint.zones} activeDimmingOverrides={zoneDimmingOverrides} />
      </section>

      {/* Section 5: Specified Luminaires & Finishes */}
      <section className="p-6 rounded-2xl bg-charcoal-900/60 border border-charcoal-800">
        <FixtureCard fixtures={blueprint.fixtures} />
      </section>

      {/* Section 6: Design Rationale & Traceable Evidence */}
      <section className="p-6 rounded-2xl bg-charcoal-900/60 border border-charcoal-800">
        <DesignRationale
          rationale={blueprint.designRationale}
          controlRecommendations={blueprint.controlRecommendations}
        />
      </section>

      {/* Section 7: Agent Execution Activity Trace */}
      <section className="print:hidden">
        <AgentActivity traces={traces} executionTimeMs={executionTimeMs} />
      </section>

      {/* Section 8: Electrical Contractor Safety Disclaimer */}
      <section className="p-5 rounded-xl bg-charcoal-950 border border-amberGold-500/30 text-xs text-ivory-400 space-y-2">
        <div className="flex items-center gap-2 text-amberGold-400 font-semibold text-sm">
          <ShieldAlert className="w-5 h-5 shrink-0" />
          <span>Electrical Engineering & Installation Disclaimer</span>
        </div>
        <p className="leading-relaxed">{blueprint.safetyDisclaimer}</p>
      </section>
    </div>
  );
}
