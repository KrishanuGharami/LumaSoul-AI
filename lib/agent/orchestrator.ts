import { AgentStepTrace, AgentWorkflowInput, AgentWorkflowOutput } from "@/types";
import { runCulturalIntelligenceAgent } from "./cultural-agent";
import { runDesignReasoningAgent } from "./design-agent";
import { runLightingEngineeringAgent } from "./engineering-agent";
import { runTasteResearchAgent } from "./taste-agent";
import { runBlueprintValidationAgent } from "./validation-agent";

export async function executeArchitectWorkflow(
  input: AgentWorkflowInput
): Promise<AgentWorkflowOutput> {
  const startTime = Date.now();
  const traces: AgentStepTrace[] = [];

  try {
    // Stage 1: Taste Research Agent
    const stage1 = runTasteResearchAgent(input.tastes, input.roomConfig);
    traces.push(stage1.trace);

    // Stage 2: Cultural Intelligence Agent (queries Qloo API)
    const stage2 = await runCulturalIntelligenceAgent(stage1.validatedTastes);
    traces.push(stage2.trace);

    // Stage 3: Design Reasoning Agent
    const stage3 = runDesignReasoningAgent(
      stage1.validatedTastes,
      input.roomConfig,
      stage2.insights
    );
    traces.push(stage3.trace);

    // Stage 4: Lighting Engineering Agent
    const stage4 = runLightingEngineeringAgent(
      input.roomConfig,
      stage1.validatedTastes,
      stage2.insights,
      stage2.provenance,
      stage2.endpointUsed
    );
    traces.push(stage4.trace);

    // Stage 5: Blueprint Validation Agent
    const stage5 = runBlueprintValidationAgent(stage4.blueprint);
    traces.push(stage5.trace);

    const executionTimeMs = Date.now() - startTime;

    return {
      success: true,
      blueprint: stage4.blueprint,
      traces,
      executionTimeMs,
    };
  } catch (err: any) {
    const executionTimeMs = Date.now() - startTime;
    const errorTrace: AgentStepTrace = {
      id: `trace_error_${Date.now()}`,
      stage: "blueprint_validation",
      agentName: "Agent Orchestrator",
      status: "failed",
      title: "Workflow Interrupted",
      detail: err.message || "An unexpected error occurred during blueprint generation.",
      timestamp: Date.now(),
    };
    traces.push(errorTrace);

    throw err;
  }
}
