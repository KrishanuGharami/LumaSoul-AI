"use client";

import React, { useState, useEffect } from "react";
import { Sparkles, Activity, ShieldCheck, KeyRound } from "lucide-react";
import { Button } from "../ui/Button";
import { Modal } from "../ui/Modal";
import { QlooApiStatus } from "@/types";

interface NavbarProps {
  onStartDesign: () => void;
  onOpenExplore: () => void;
}

export function Navbar({ onStartDesign, onOpenExplore }: NavbarProps) {
  const [status, setStatus] = useState<QlooApiStatus | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("/api/health")
      .then((res) => res.json())
      .then((data) => {
        if (data.qloo) setStatus(data.qloo);
      })
      .catch(() => {
        // Safe fallback status
        setStatus({
          connected: false,
          isDemoMode: true,
          hasServerKey: false,
          message: "Demo Mode active. No QLOO_API_KEY detected in server environment.",
          endpointUrl: "https://api.qloo.com",
        });
      });
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-charcoal-800/80 bg-charcoal-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-amberGold-400 to-amberGold-600 flex items-center justify-center text-charcoal-950 shadow-glow-amber">
              <Sparkles className="w-5 h-5 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold tracking-wide text-ivory-50">
                  LumaSoul <span className="text-amberGold-400 font-sans text-xs tracking-widest font-normal uppercase">AI</span>
                </span>
              </div>
              <p className="text-[10px] text-ivory-400 tracking-wider uppercase font-medium">
                Your Taste. Your Space. Your Light.
              </p>
            </div>
          </div>

          {/* Center / Right controls */}
          <div className="flex items-center gap-3">
            {/* Live Qloo API Connection Badge */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-all duration-200 bg-charcoal-900 hover:border-charcoal-600"
              title="Click to view Qloo API Connection Status"
            >
              <span
                className={`w-2 h-2 rounded-full ${
                  status?.connected
                    ? "bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]"
                    : "bg-amberGold-400 shadow-[0_0_8px_rgba(245,158,11,0.8)]"
                }`}
              />
              <span className="hidden sm:inline text-ivory-300">
                {status?.connected ? "Live Qloo API" : "Demo Mode"}
              </span>
              <Activity className="w-3.5 h-3.5 text-ivory-400" />
            </button>

            <Button variant="ghost" size="sm" onClick={onOpenExplore} className="hidden md:inline-flex">
              The Architecture
            </Button>

            <Button variant="primary" size="sm" onClick={onStartDesign}>
              Design My Space
            </Button>
          </div>
        </div>
      </header>

      {/* API Diagnostics Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Qloo Cultural Intelligence API Status"
      >
        <div className="space-y-4 text-sm">
          <div className="p-4 rounded-xl bg-charcoal-950/70 border border-charcoal-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-ivory-400">Connection State:</span>
              <span
                className={`font-semibold px-2 py-0.5 rounded text-xs ${
                  status?.connected
                    ? "bg-emerald-950 text-emerald-400 border border-emerald-800"
                    : "bg-amber-950 text-amber-300 border border-amber-800"
                }`}
              >
                {status?.connected ? "CONNECTED (Live Qloo API)" : "DEMO MODE (Curated Cultural Graph)"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-ivory-400">Server API Key:</span>
              <span className="text-xs text-ivory-200 font-mono">
                {status?.hasServerKey ? "Configured in Environment" : "None Provided (Using Curated Fallback)"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-ivory-400">Target Base URL:</span>
              <span className="text-xs text-ivory-200 font-mono">
                {status?.endpointUrl || "https://api.qloo.com"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-ivory-400">Authentication Header:</span>
              <span className="text-xs text-ivory-200 font-mono">X-Api-Key</span>
            </div>
          </div>

          <div className="text-xs text-ivory-300 leading-relaxed space-y-2">
            <p className="flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong>Data Provenance Rule:</strong> LumaSoul AI strictly distinguishes verified live Qloo intelligence from curated offline demo data. Every blueprint displays explicit provenance tags.
              </span>
            </p>
            <p className="flex items-start gap-2">
              <KeyRound className="w-4 h-4 text-amberGold-400 shrink-0 mt-0.5" />
              <span>
                To activate live API calls, set <code className="bg-charcoal-800 px-1 py-0.5 rounded">QLOO_API_KEY=your_key</code> in your <code className="bg-charcoal-800 px-1 py-0.5 rounded">.env.local</code> file or Vercel Environment Variables.
              </span>
            </p>
          </div>

          <div className="pt-2 flex justify-end">
            <Button variant="secondary" size="sm" onClick={() => setIsModalOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
