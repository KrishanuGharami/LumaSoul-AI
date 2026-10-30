import {
  CrossDomainAffinityInsight,
  EvidenceChainItem,
  LightingBlueprint,
  QlooInsightEntity,
  RoomConfig,
  TastePreference,
} from "@/types";
import { selectArchitecturalFixtures } from "./fixture-rules";
import { calculateArchitecturalKelvin, calculateCriTarget } from "./kelvin-mapping";
import { generateScenePresets } from "./scene-presets";
import { generateLightingZones } from "./zone-generator";

export interface LightingEngineInput {
  roomConfig: RoomConfig;
  tastes: TastePreference[];
  qlooInsights: QlooInsightEntity[];
  provenance: "live_qloo" | "curated_demo";
  apiEndpointUsed?: string;
}

export function generateLightingBlueprint(input: LightingEngineInput): LightingBlueprint {
  const { roomConfig, tastes, qlooInsights, provenance, apiEndpointUsed = "/v2/insights" } = input;

  // 1. Calculations: Kelvin, CRI, Square Footage, Lumens
  const kelvinResult = calculateArchitecturalKelvin(roomConfig, tastes);
  const criResult = calculateCriTarget(tastes);

  let sqFt = 260; // medium
  if (roomConfig.roomSize === "small") sqFt = 140;
  if (roomConfig.roomSize === "large") sqFt = 450;

  // Lumens per sq ft based on room and atmosphere
  let targetLmPerSqFt = 45;
  if (roomConfig.atmosphere === "cinematic" || roomConfig.atmosphere === "serene") targetLmPerSqFt = 35;
  if (roomConfig.atmosphere === "vibrant" || roomConfig.roomType === "home_office") targetLmPerSqFt = 55;

  const totalLumens = sqFt * targetLmPerSqFt;
  const ambientLumens = Math.round(totalLumens * 0.45);
  const accentLumens = Math.round(totalLumens * 0.3);
  const taskLumens = Math.round(totalLumens * 0.25);
  const wattsPerSqFt = Number((targetLmPerSqFt / 85).toFixed(2)); // assuming ~85 lm/W efficacy

  // 2. Zones, Fixtures & Presets
  const zones = generateLightingZones(roomConfig, tastes, kelvinResult.kelvin);
  const fixtures = selectArchitecturalFixtures(roomConfig, tastes, criResult.value);
  const scenePresets = generateScenePresets(kelvinResult.kelvin);

  // 3. Cultural Synthesis & Evidence Chain
  const tasteNames = tastes.map((t) => t.name).join(", ");
  const dominantMotifs = [
    `${roomConfig.atmosphere.charAt(0).toUpperCase() + roomConfig.atmosphere.slice(1)} Ambiance`,
    `${kelvinResult.kelvin}K Color Temperature`,
    `${criResult.label.split(" ")[0]} Color Fidelity`,
    `${zones.length} Architectural Control Zones`,
  ];

  // Build cross-domain affinities from Qloo insights
  const crossDomainAffinities: CrossDomainAffinityInsight[] = qlooInsights.slice(0, 4).map((ins) => ({
    category: ins.subtype || "Design Philosophy",
    target: ins.name,
    affinityScore: ins.affinity,
    rationale: ins.explanation || `Derived cross-cultural connection from user preference profile.`,
  }));

  // Build evidence chain
  const evidenceChain: EvidenceChainItem[] = [];

  for (const taste of tastes) {
    let translation = `Influenced architectural color temperature (${kelvinResult.kelvin}K) and finish selection.`;
    if (taste.category === "cinema") {
      translation = `Informed high-contrast silhouette ratios (5:1) and warm perimeter cove grazing.`;
    } else if (taste.category === "music") {
      translation = `Dictated multi-channel dimming curve flexibility and circadian rhythm transitions.`;
    } else if (taste.category === "fashion") {
      translation = `Established museum-grade CRI ${criResult.value} target for true textile and surface saturation.`;
    } else if (taste.category === "travel") {
      translation = `Inspired indirect floor-level horizontal wash and natural materials integration.`;
    } else if (taste.category === "design") {
      translation = `Guided fixture silhouette choices toward clean architectural integration without visual noise.`;
    }

    evidenceChain.push({
      entityName: taste.name,
      entityType: taste.category.toUpperCase(),
      designTranslation: translation,
      confidence: taste.confidence || 0.92,
    });
  }

  // 4. Personalized Title & Concepts
  const roomTypeName = roomConfig.roomType
    .split("_")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");

  const title = `${tastes[0]?.name ? tastes[0].name + " Inspired " : ""}${roomTypeName} Lighting Masterplan`;
  const subtitle = `Tailored for ${roomConfig.atmosphere} atmosphere with ${kelvinResult.label}`;

  const overallConcept = `A bespoke architectural illumination strategy synthesizing your cultural appreciation for ${
    tasteNames || "modern aesthetics"
  }. Rather than generic uniform floodlighting, the space is sculpted using four distinct photometric layers: concealed indirect perimeter coves, low-glare focal pools, vertical material grazers, and grounding low-level horizon illumination.`;

  return {
    id: `bp_${Date.now().toString(36)}_${Math.random().toString(36).substring(2, 6)}`,
    timestamp: new Date().toISOString(),
    title,
    subtitle,
    roomConfig,
    culturalProfile: {
      dominantMotifs,
      tastes,
      culturalInsights: qlooInsights,
      crossDomainAffinities,
    },
    lightingSpecification: {
      overallConcept,
      culturalInspiration: `Cross-domain affinities spanning ${tastes.map((t) => t.category).join(", ")} translated into photometric design.`,
      colorTemperature: {
        kelvin: kelvinResult.kelvin,
        label: kelvinResult.label,
        explanation: kelvinResult.explanation,
      },
      criTarget: criResult,
      lumenGuidance: {
        totalEstimatedLumens: totalLumens,
        ambientLumens,
        accentLumens,
        taskLumens,
        roomSquareFootage: sqFt,
        wattsPerSqFtEst: wattsPerSqFt,
      },
      circadianAdaptation:
        "Automated sunset warm-dim curve smoothly transitions color temperature from 3000K daytime focus down to 2000K evening retreat, suppressing blue light to support natural melatonin synthesis.",
    },
    zones,
    fixtures,
    scenePresets,
    designRationale: {
      cinematicInfluence: `High contrast lighting with 4:1 to 6:1 luminance ratios provides dramatic visual depth without causing ocular fatigue.`,
      musicalRhythmLighting: `Independent multi-zone dimming controls allow the user to modulate spatial tempo from intimate solo calm to dynamic hosting vibrancy.`,
      materialityAndFinishes: `Luminaires feature ${fixtures[2]?.finish || "architectural finishes"} to harmonize with tactile stone, timber, and matte surfaces.`,
      architecturalIntegration: `Trimless plaster-in downlights and concealed cove details ensure the light source remains hidden, celebrating illuminated surfaces rather than ceiling clutter.`,
      evidenceChain,
    },
    controlRecommendations: {
      systemProtocol: "Lutron Caséta / RadioRA3 or DALI-2 Open Standard Architecture",
      dimmingProtocol: "Continuous Flicker-Free 0.1% Warm-Dimming (IEEE 1789 Compliant)",
      wallKeypadConfig: "4-Button Custom Backlit Metallic Keypad (Evening / Retreat / Focus / Off)",
      automationTriggers: [
        "Astronomical Sunset: Automatically engages Warm Retreat preset at dusk",
        "Late Night: Activates Midnight Calm floor grazers upon motion sensing",
        "Focus Mode: Raises kelvin to 3200K during calendar focus blocks",
      ],
    },
    safetyDisclaimer:
      "SAFETY & INSTALLATION NOTICE: This architectural lighting blueprint provides conceptual lighting design, spatial zoning, and photometric guidance. It is not an engineered electrical permit set. All branch circuit sizing, driver load calculations, junction box placements, and fixture mountings must be verified by a licensed electrical contractor in compliance with local National Electrical Code (NEC / CEC) standards.",
    dataProvenance: {
      mode: provenance,
      apiEndpointUsed,
      queryEntitiesCount: tastes.length,
      retrievedInsightsCount: qlooInsights.length,
      timestamp: new Date().toISOString(),
      statusNote:
        provenance === "live_qloo"
          ? "Calculated from live Qloo Cultural Intelligence API signals."
          : "Calculated using curated high-fidelity cultural knowledge graph (Demo Mode).",
    },
  };
}
