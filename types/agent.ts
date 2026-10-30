import { LightingBlueprint } from "./lighting";
import { RoomConfig, TastePreference } from "./taste";

export type AgentStage =
  | "taste_research"
  | "cultural_intelligence"
  | "design_reasoning"
  | "lighting_engineering"
  | "blueprint_validation";

export interface AgentStepTrace {
  id: string;
  stage: AgentStage;
  agentName: string;
  status: "pending" | "running" | "completed" | "failed";
  title: string;
  detail: string;
  timestamp: number;
  outputSummary?: string;
  metadata?: Record<string, any>;
}

export interface AgentWorkflowInput {
  tastes: TastePreference[];
  roomConfig: RoomConfig;
}

export interface AgentWorkflowOutput {
  success: boolean;
  blueprint: LightingBlueprint;
  traces: AgentStepTrace[];
  executionTimeMs: number;
  error?: string;
}
