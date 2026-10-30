"use client";

import React, { useState } from "react";
import { CheckCircle2, Clock, ChevronDown, ChevronUp, Cpu, Activity, AlertCircle } from "lucide-react";
import { AgentStepTrace } from "@/types";

interface AgentActivityProps {
  traces: AgentStepTrace[];
  executionTimeMs: number;
}

export function AgentActivity({ traces, executionTimeMs }: AgentActivityProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="rounded-xl bg-charcoal-900 border border-charcoal-800 overflow-hidden">
      {/* Header bar */}
      <div
        onClick={() => setIsExpanded(!isExpanded)}
        className="px-5 py-4 flex items-center justify-between cursor-pointer hover:bg-charcoal-850/60 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-amberGold-500/10 border border-amberGold-500/30 flex items-center justify-center text-amberGold-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-semibold text-ivory-100">
                Agentic Workflow Execution Trace
              </h4>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                5 Stages Completed
              </span>
            </div>
            <p className="text-xs text-ivory-400 flex items-center gap-2 mt-0.5">
              <Clock className="w-3 h-3" />
              <span>Total execution latency: {executionTimeMs}ms</span>
            </p>
          </div>
        </div>

        <button className="text-ivory-400 hover:text-ivory-100 p-1">
          {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
        </button>
      </div>

      {/* Trace Pipeline Details */}
      {isExpanded && (
        <div className="px-5 pb-5 pt-2 border-t border-charcoal-800/80 space-y-3 animate-fade-in">
          {traces.map((trace, idx) => {
            const isCompleted = trace.status === "completed";
            return (
              <div
                key={trace.id}
                className="p-3.5 rounded-xl bg-charcoal-950/70 border border-charcoal-800/80 space-y-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-charcoal-800 font-mono text-[10px] font-bold text-amberGold-400 flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <span className="text-xs font-semibold text-ivory-100 font-serif">
                      {trace.agentName}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {isCompleted ? (
                      <span className="flex items-center gap-1 text-[11px] text-emerald-400 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Completed</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-[11px] text-amber-400 font-mono">
                        <AlertCircle className="w-3.5 h-3.5" />
                        <span>{trace.status}</span>
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-xs text-ivory-200 font-medium">{trace.title}</p>
                <p className="text-[11px] text-ivory-400 leading-relaxed">{trace.detail}</p>

                {trace.outputSummary && (
                  <div className="pt-1.5 border-t border-charcoal-800/60 text-[10px] font-mono text-amberGold-300">
                    Output: {trace.outputSummary}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
