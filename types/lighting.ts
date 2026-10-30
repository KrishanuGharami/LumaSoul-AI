import { QlooInsightEntity } from "./qloo";
import { RoomConfig, TastePreference } from "./taste";

export interface LightingZone {
  id: string;
  name: string;
  purpose: "ambient" | "accent" | "task" | "cove" | "perimeter" | "decorative";
  fixtureType: string;
  dimmingPercent: number;
  kelvin: number;
  luxTarget: number;
  beamAngle: string;
  placementGuidance: string;
  controlChannel: string;
}

export interface ScenePreset {
  id: string;
  name: string;
  tagline: string;
  description: string;
  icon: string;
  overallKelvin: number;
  zoneDimming: Record<string, number>; // zoneId -> percent
}

export interface LightingFixture {
  id: string;
  name: string;
  category: "recessed" | "linear_pendant" | "cove_led" | "spotlight" | "sconce" | "floor_lamp";
  finish: string;
  suggestedLumens: number;
  cri: number;
  dimmingProtocol: "0-10V" | "DALI-2" | "Phase" | "Wireless BLE";
  suggestedLocation: string;
  architecturalIntent: string;
}

export interface CrossDomainAffinityInsight {
  category: string;
  target: string;
  affinityScore: number;
  rationale: string;
}

export interface EvidenceChainItem {
  entityName: string;
  entityType: string;
  designTranslation: string;
  confidence: number;
}

export interface LightingBlueprint {
  id: string;
  timestamp: string;
  title: string;
  subtitle: string;
  roomConfig: RoomConfig;
  culturalProfile: {
    dominantMotifs: string[];
    tastes: TastePreference[];
    culturalInsights: QlooInsightEntity[];
    crossDomainAffinities: CrossDomainAffinityInsight[];
  };
  lightingSpecification: {
    overallConcept: string;
    culturalInspiration: string;
    colorTemperature: {
      kelvin: number;
      label: string;
      explanation: string;
    };
    criTarget: {
      value: number;
      label: string;
      rationale: string;
    };
    lumenGuidance: {
      totalEstimatedLumens: number;
      ambientLumens: number;
      accentLumens: number;
      taskLumens: number;
      roomSquareFootage: number;
      wattsPerSqFtEst: number;
    };
    circadianAdaptation: string;
  };
  zones: LightingZone[];
  fixtures: LightingFixture[];
  scenePresets: ScenePreset[];
  designRationale: {
    cinematicInfluence: string;
    musicalRhythmLighting: string;
    materialityAndFinishes: string;
    architecturalIntegration: string;
    evidenceChain: EvidenceChainItem[];
  };
  controlRecommendations: {
    systemProtocol: string;
    dimmingProtocol: string;
    wallKeypadConfig: string;
    automationTriggers: string[];
  };
  safetyDisclaimer: string;
  dataProvenance: {
    mode: "live_qloo" | "curated_demo";
    apiEndpointUsed: string;
    queryEntitiesCount: number;
    retrievedInsightsCount: number;
    timestamp: string;
    statusNote: string;
  };
}
