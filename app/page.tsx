"use client";

import React, { useState } from "react";
import {
  AgentStepTrace,
  AgentWorkflowOutput,
  LightingBlueprint,
  RoomConfig,
  TastePreference,
} from "@/types";
import { Navbar } from "@/components/landing/Navbar";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Footer } from "@/components/landing/Footer";
import { TasteSelector } from "@/components/onboarding/TasteSelector";
import { RoomConfigurator } from "@/components/onboarding/RoomConfigurator";
import { LoadingState } from "@/components/ui/LoadingState";
import { BlueprintDashboard } from "@/components/dashboard/BlueprintDashboard";
import { Button } from "@/components/ui/Button";
import { ArrowLeft, Sparkles, Layers, Sliders, AlertCircle } from "lucide-react";

export default function Home() {
  const [view, setView] = useState<"landing" | "onboarding" | "loading" | "dashboard">("landing");

  // Initial user preferences
  const [tastes, setTastes] = useState<TastePreference[]>([
    {
      id: "taste_init_1",
      name: "Blade Runner 2049",
      category: "cinema",
      qlooType: "urn:entity:movie",
      confidence: 0.95,
      provenance: "curated_catalog",
    },
    {
      id: "taste_init_2",
      name: "Aesop",
      category: "fashion",
      qlooType: "urn:entity:brand",
      confidence: 0.93,
      provenance: "curated_catalog",
    },
    {
      id: "taste_init_3",
      name: "Kyoto",
      category: "travel",
      qlooType: "urn:entity:place",
      confidence: 0.97,
      provenance: "curated_catalog",
    },
  ]);

  // Initial room configuration
  const [roomConfig, setRoomConfig] = useState<RoomConfig>({
    roomType: "living_room",
    roomSize: "medium",
    ceilingHeight: "standard",
    atmosphere: "cinematic",
    mainUse: "relaxation",
  });

  // Results & Agent Traces
  const [blueprint, setBlueprint] = useState<LightingBlueprint | null>(null);
  const [traces, setTraces] = useState<AgentStepTrace[]>([]);
  const [executionTimeMs, setExecutionTimeMs] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Loading animation state
  const [loadingStage, setLoadingStage] = useState<string>("taste_research");
  const [loadingMessage, setLoadingMessage] = useState<string>("Analyzing your cultural taste profile...");

  const handleAddTaste = (taste: TastePreference) => {
    if (!tastes.some((t) => t.name.toLowerCase() === taste.name.toLowerCase())) {
      setTastes([...tastes, taste]);
    }
  };

  const handleRemoveTaste = (id: string) => {
    setTastes(tastes.filter((t) => t.id !== id));
  };

  const handleClearAllTastes = () => {
    setTastes([]);
  };

  const handleUpdateRoomConfig = (updated: Partial<RoomConfig>) => {
    setRoomConfig((prev) => ({ ...prev, ...updated }));
  };

  const handleGenerateBlueprint = async () => {
    if (tastes.length === 0) {
      setErrorMessage("Please select at least one cultural preference (cinema, music, fashion, or travel).");
      return;
    }

    setErrorMessage(null);
    setView("loading");

    // Cycle through stage progress messages to reflect multi-agent workflow
    setLoadingStage("taste_research");
    setLoadingMessage("Stage 1: Taste Research Agent organizing cultural preferences...");

    const t1 = setTimeout(() => {
      setLoadingStage("cultural_intelligence");
      setLoadingMessage("Stage 2: Cultural Intelligence Agent querying Qloo API for cross-domain affinities...");
    }, 600);

    const t2 = setTimeout(() => {
      setLoadingStage("design_reasoning");
      setLoadingMessage("Stage 3: Design Reasoning Agent calculating contrast hierarchy and material finishes...");
    }, 1300);

    const t3 = setTimeout(() => {
      setLoadingStage("lighting_engineering");
      setLoadingMessage("Stage 4: Lighting Engineering Agent computing Kelvin curves, CRI, and 4-zone photometrics...");
    }, 1900);

    const t4 = setTimeout(() => {
      setLoadingStage("blueprint_validation");
      setLoadingMessage("Stage 5: Blueprint Validation Agent auditing NEC guidelines and room constraints...");
    }, 2400);

    try {
      const response = await fetch("/api/design", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tastes, roomConfig }),
      });

      const data = (await response.json()) as AgentWorkflowOutput;

      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);

      if (!response.ok || !data.success || !data.blueprint) {
        throw new Error(data.error || "Failed to generate blueprint");
      }

      setBlueprint(data.blueprint);
      setTraces(data.traces || []);
      setExecutionTimeMs(data.executionTimeMs || 250);
      setView("dashboard");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err: any) {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      setErrorMessage(err.message || "An unexpected error occurred. Please try again.");
      setView("onboarding");
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar
        onStartDesign={() => {
          setView("onboarding");
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        onOpenExplore={() => {
          if (view !== "landing") setView("landing");
          setTimeout(() => {
            const el = document.getElementById("architecture");
            el?.scrollIntoView({ behavior: "smooth" });
          }, 100);
        }}
      />

      <main className="flex-1">
        {/* VIEW 1: LANDING */}
        {view === "landing" && (
          <div className="animate-fade-in">
            <Hero
              onStartDesign={() => {
                setView("onboarding");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              onExploreExperience={() => {
                const el = document.getElementById("architecture");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            />
            <HowItWorks />
          </div>
        )}

        {/* VIEW 2: ONBOARDING */}
        {view === "onboarding" && (
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in space-y-10">
            {/* Header / Back */}
            <div className="flex items-center justify-between pb-6 border-b border-charcoal-800">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setView("landing")}
                  className="text-ivory-400"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Home</span>
                </Button>
                <div className="h-4 w-px bg-charcoal-800" />
                <span className="text-xs font-mono uppercase tracking-wider text-amberGold-400">
                  Architectural Lighting Design Studio
                </span>
              </div>

              <span className="text-xs font-mono text-ivory-400">
                Step 1 of 2: Cultural & Spatial Onboarding
              </span>
            </div>

            {/* Error Message if any */}
            {errorMessage && (
              <div className="p-4 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-3">
                <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Section A: Cultural Taste Profiler */}
            <section className="space-y-4 p-6 sm:p-8 rounded-2xl bg-charcoal-900/70 border border-charcoal-800 shadow-xl">
              <div className="border-b border-charcoal-800 pb-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-amberGold-500/10 text-amberGold-300 font-mono text-xs font-medium mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Step A: Cultural Identity & Tastes</span>
                </div>
                <h2 className="font-serif text-2xl text-ivory-50 tracking-tight">
                  Your Cultural Identity
                </h2>
                <p className="text-xs text-ivory-400 mt-1">
                  Select or search your touchstones across cinema, music, fashion, and architecture. LumaSoul AI resolves them against the Qloo API.
                </p>
              </div>

              <TasteSelector
                tastes={tastes}
                onAddTaste={handleAddTaste}
                onRemoveTaste={handleRemoveTaste}
                onClearAll={handleClearAllTastes}
              />
            </section>

            {/* Section B: Room Configuration */}
            <section className="space-y-4 p-6 sm:p-8 rounded-2xl bg-charcoal-900/70 border border-charcoal-800 shadow-xl">
              <div className="border-b border-charcoal-800 pb-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-amberGold-500/10 text-amberGold-300 font-mono text-xs font-medium mb-1">
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Step B: Spatial Architecture</span>
                </div>
                <h2 className="font-serif text-2xl text-ivory-50 tracking-tight">
                  Room Configuration & Atmosphere
                </h2>
                <p className="text-xs text-ivory-400 mt-1">
                  Specify the spatial parameters and emotional atmosphere for your residential lighting masterplan.
                </p>
              </div>

              <RoomConfigurator config={roomConfig} onChange={handleUpdateRoomConfig} />
            </section>

            {/* Generation CTA Banner */}
            <div className="p-6 rounded-2xl bg-gradient-to-r from-charcoal-900 via-charcoal-850 to-charcoal-900 border border-amberGold-500/40 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-glow-soft">
              <div>
                <h3 className="font-serif text-lg text-ivory-50">
                  Ready to compute your architectural lighting blueprint?
                </h3>
                <p className="text-xs text-ivory-400 mt-1">
                  The 5-stage agent pipeline will query Qloo, calculate photometrics, and engineer your masterplan.
                </p>
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={handleGenerateBlueprint}
                disabled={tastes.length === 0}
                className="w-full sm:w-auto shrink-0 shadow-glow-amber"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Lighting Masterplan</span>
              </Button>
            </div>
          </div>
        )}

        {/* VIEW 3: LOADING AGENT EXECUTION */}
        {view === "loading" && (
          <div className="py-20 animate-fade-in">
            <LoadingState currentStage={loadingStage} stageMessage={loadingMessage} />
          </div>
        )}

        {/* VIEW 4: BLUEPRINT DASHBOARD */}
        {view === "dashboard" && blueprint && (
          <div className="animate-fade-in">
            <BlueprintDashboard
              blueprint={blueprint}
              traces={traces}
              executionTimeMs={executionTimeMs}
              onReconfigure={() => {
                setView("onboarding");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
