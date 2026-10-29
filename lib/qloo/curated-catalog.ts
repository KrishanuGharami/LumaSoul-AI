import { QlooEntity, QlooInsightEntity } from "@/types";

export interface CuratedEntityRecord {
  entity: QlooEntity;
  relatedInsights: QlooInsightEntity[];
  lightingProfile: {
    kelvinBias: number; // e.g. -400 for warm, +300 for neutral/cool
    atmosphere: string;
    dominantMaterials: string[];
    contrastRatio: string; // e.g. "High Drama 8:1", "Soft Ambient 2:1"
    criPriority: number; // e.g. 95
  };
}

export const CURATED_CULTURAL_CATALOG: Record<string, CuratedEntityRecord> = {
  "blade-runner-2049": {
    entity: {
      id: "ent_film_br2049",
      name: "Blade Runner 2049",
      type: "urn:entity:movie",
      subtype: "Sci-Fi / Neo-Noir",
      popularity: 0.94,
      tags: ["urn:tag:cinematography:roger_deakins", "urn:tag:aesthetic:neo_noir", "urn:tag:mood:atmospheric_dusk"],
      description: "Visual masterpiece with amber haze, high-contrast silhouette backlighting, and deep linear shadows.",
    },
    relatedInsights: [
      {
        id: "ins_film_br2049_1",
        name: "Neo-Brutalist Architecture",
        type: "urn:entity:brand",
        affinity: 0.92,
        popularity: 0.81,
        tags: ["monolithic", "geometric", "concrete-wash"],
      },
      {
        id: "ins_film_br2049_2",
        name: "Amber Vapor Aesthetics",
        type: "urn:entity:brand",
        affinity: 0.89,
        popularity: 0.77,
        tags: ["sodium-vapor", "2200K", "diffuse"],
      },
    ],
    lightingProfile: {
      kelvinBias: -500, // 2200K amber
      atmosphere: "Cinematic Neo-Noir",
      dominantMaterials: ["matte dark steel", "tinted bronze glass", "cast concrete"],
      contrastRatio: "High Drama (6:1)",
      criPriority: 95,
    },
  },
  "in-the-mood-for-love": {
    entity: {
      id: "ent_film_itmfl",
      name: "In the Mood for Love",
      type: "urn:entity:movie",
      subtype: "Romance / Art House",
      popularity: 0.91,
      tags: ["urn:tag:director:wong_kar_wai", "urn:tag:mood:melancholy", "urn:tag:palette:crimson_amber"],
      description: "Sensory, dreamlike elegance defined by warm vintage lamps, narrow aperture beams, and slow temporal rhythms.",
    },
    relatedInsights: [
      {
        id: "ins_itmfl_1",
        name: "Vintage Fluted Glass & Brass",
        type: "urn:entity:brand",
        affinity: 0.95,
        popularity: 0.79,
        tags: ["mid-century-hong-kong", "filament-glow"],
      },
      {
        id: "ins_itmfl_2",
        name: "Intimate Accent Pendants",
        type: "urn:entity:brand",
        affinity: 0.88,
        popularity: 0.84,
        tags: ["low-glare", "warm-dimming"],
      },
    ],
    lightingProfile: {
      kelvinBias: -700, // 2000K candlelit
      atmosphere: "Poetic & Intimate",
      dominantMaterials: ["aged brushed brass", "fluted amber glass", "dark walnut"],
      contrastRatio: "Deep Shadows (5:1)",
      criPriority: 97,
    },
  },
  "radiohead": {
    entity: {
      id: "ent_mus_radiohead",
      name: "Radiohead",
      type: "urn:entity:artist",
      subtype: "Art Rock / Electronic",
      popularity: 0.96,
      tags: ["urn:tag:genre:experimental", "urn:tag:texture:textural_soundscapes", "urn:tag:tone:contemplative"],
      description: "Complex emotional landscapes combining organic acoustic warmth with razor-sharp electronic precision.",
    },
    relatedInsights: [
      {
        id: "ins_rad_1",
        name: "Linear LED Concealed Coves",
        type: "urn:entity:brand",
        affinity: 0.91,
        popularity: 0.86,
        tags: ["architectural-integration", "dynamic-frequencies"],
      },
      {
        id: "ins_rad_2",
        name: "Monochromatic Precision Fixtures",
        type: "urn:entity:brand",
        affinity: 0.87,
        popularity: 0.75,
        tags: ["minimalist", "anti-glare"],
      },
    ],
    lightingProfile: {
      kelvinBias: 0, // 2700K - 3000K crisp
      atmosphere: "Atmospheric & Contemplative",
      dominantMaterials: ["anodized black aluminum", "frosted micro-prism acrylic", "raw basalt"],
      contrastRatio: "Dynamic Gradient (4:1)",
      criPriority: 93,
    },
  },
  "miles-davis": {
    entity: {
      id: "ent_mus_miles_davis",
      name: "Miles Davis",
      type: "urn:entity:artist",
      subtype: "Modal Jazz / Cool Jazz",
      popularity: 0.95,
      tags: ["urn:tag:genre:cool_jazz", "urn:tag:mood:late_night", "urn:tag:album:kind_of_blue"],
      description: "Spacious, blue-hour cool notes with soft golden acoustic highlights and acoustic breathing room.",
    },
    relatedInsights: [
      {
        id: "ins_miles_1",
        name: "Low-Glare Grazing Spotlights",
        type: "urn:entity:brand",
        affinity: 0.94,
        popularity: 0.82,
        tags: ["velvet-darkness", "sculptural-focus"],
      },
    ],
    lightingProfile: {
      kelvinBias: -400,
      atmosphere: "Late Night Sanctuary",
      dominantMaterials: ["patinated bronze", "acoustic velvet", "ebonized oak"],
      contrastRatio: "Sculptural Pool Lighting (6:1)",
      criPriority: 95,
    },
  },
  "aesop": {
    entity: {
      id: "ent_brd_aesop",
      name: "Aesop",
      type: "urn:entity:brand",
      subtype: "Sensory Design & Apothecary",
      popularity: 0.93,
      tags: ["urn:tag:design:contextual_retail", "urn:tag:materiality:raw_tactile", "urn:tag:tone:understated_luxury"],
      description: "Quiet architectural reverence for raw natural stone, concealed amber cove lighting, and zero harsh direct glare.",
    },
    relatedInsights: [
      {
        id: "ins_aesop_1",
        name: "Concealed Plaster Perimeter Washes",
        type: "urn:entity:brand",
        affinity: 0.96,
        popularity: 0.85,
        tags: ["seamless-trimless", "architectural-cove"],
      },
      {
        id: "ins_aesop_2",
        name: "Warm Tactile Sconces",
        type: "urn:entity:brand",
        affinity: 0.93,
        popularity: 0.80,
        tags: ["cast-brass", "earthen-ceramics"],
      },
    ],
    lightingProfile: {
      kelvinBias: -300, // 2400K - 2700K
      atmosphere: "Quiet Luxury & Tactile Calm",
      dominantMaterials: ["lime plaster", "honed travertine", "hand-cast brass", "raw cedar"],
      contrastRatio: "Soft Wash (2.5:1)",
      criPriority: 98,
    },
  },
  "the-row": {
    entity: {
      id: "ent_brd_the_row",
      name: "The Row",
      type: "urn:entity:brand",
      subtype: "Quiet Luxury / Minimalist Fashion",
      popularity: 0.90,
      tags: ["urn:tag:aesthetic:pure_lines", "urn:tag:fabric:cashmere_silk", "urn:tag:philosophy:uncompromising_craft"],
      description: "Severe discipline, ultra-refined silhouettes, perfectly balanced diffused ambient luminescence.",
    },
    relatedInsights: [
      {
        id: "ins_the_row_1",
        name: "High-CRI 98+ Museum Grade Downlights",
        type: "urn:entity:brand",
        affinity: 0.95,
        popularity: 0.84,
        tags: ["museum-spec", "true-color-rendering"],
      },
    ],
    lightingProfile: {
      kelvinBias: -100, // 2700K - 3000K pure museum white
      atmosphere: "Architectural Serenity",
      dominantMaterials: ["unlacquered brass", "natural cashmere", "bleached ash"],
      contrastRatio: "Balanced Editorial (3:1)",
      criPriority: 98,
    },
  },
  "kyoto": {
    entity: {
      id: "ent_plc_kyoto",
      name: "Kyoto",
      type: "urn:entity:place",
      subtype: "Cultural Capital / Zen Architecture",
      popularity: 0.96,
      tags: ["urn:tag:philosophy:wabi_sabi", "urn:tag:material:shoji_hinoki", "urn:tag:nature:shadow_appreciation"],
      description: "Junichiro Tanizaki's 'In Praise of Shadows' manifest: deep eaves, indirect floor-level washes, paper lantern diffusion.",
    },
    relatedInsights: [
      {
        id: "ins_kyoto_1",
        name: "Washi Paper Diffused Luminaires",
        type: "urn:entity:brand",
        affinity: 0.97,
        popularity: 0.88,
        tags: ["indirect-bounce", "floor-skimming"],
      },
      {
        id: "ins_kyoto_2",
        name: "Low-Level Step & Baseboard Grazers",
        type: "urn:entity:brand",
        affinity: 0.92,
        popularity: 0.79,
        tags: ["horizontal-light", "zero-ceiling-clutter"],
      },
    ],
    lightingProfile: {
      kelvinBias: -600, // 2100K - 2400K
      atmosphere: "Zen Sanctuary & Sacred Shadow",
      dominantMaterials: ["hinoki cypress", "handcrafted washi paper", "blackened steel", "tatami weave"],
      contrastRatio: "Deep Shadows (6:1)",
      criPriority: 96,
    },
  },
  "copenhagen": {
    entity: {
      id: "ent_plc_copenhagen",
      name: "Copenhagen",
      type: "urn:entity:place",
      subtype: "Nordic Design & Hygge",
      popularity: 0.94,
      tags: ["urn:tag:design:poul_henningsen", "urn:tag:light:anti_glare", "urn:tag:lifestyle:hygge"],
      description: "Multi-layered shade pendants that eliminate direct bulb glare while casting warm pools on gathering tables.",
    },
    relatedInsights: [
      {
        id: "ins_cph_1",
        name: "Three-Shade Architectural Pendants",
        type: "urn:entity:brand",
        affinity: 0.96,
        popularity: 0.89,
        tags: ["louis-poulsen-tradition", "soft-downlight"],
      },
    ],
    lightingProfile: {
      kelvinBias: -400, // 2400K - 2700K
      atmosphere: "Nordic Warmth & Shared Hygge",
      dominantMaterials: ["spun matte aluminum", "smoked oak", "bouclé textile"],
      contrastRatio: "Layered Pools (3.5:1)",
      criPriority: 95,
    },
  },
  "bauhaus": {
    entity: {
      id: "ent_dsg_bauhaus",
      name: "Bauhaus",
      type: "urn:entity:brand",
      subtype: "Modernist Movement / Functionalism",
      popularity: 0.95,
      tags: ["urn:tag:philosophy:form_follows_function", "urn:tag:geometry:primary_shapes", "urn:tag:school:weimar_dessau"],
      description: "Honest geometric fixtures, tubular steel framing, opal glass globes, and uncompromising functional honesty.",
    },
    relatedInsights: [
      {
        id: "ins_bauhaus_1",
        name: "Opal Sphere Glass Sconces",
        type: "urn:entity:brand",
        affinity: 0.97,
        popularity: 0.91,
        tags: ["diffused-omni", "pure-geometry"],
      },
      {
        id: "ins_bauhaus_2",
        name: "Directional Articulated Task Lamps",
        type: "urn:entity:brand",
        affinity: 0.94,
        popularity: 0.83,
        tags: ["functionalist", "precise-worklight"],
      },
    ],
    lightingProfile: {
      kelvinBias: 200, // 3000K - 3500K functional clean light
      atmosphere: "Functionalist Clarity",
      dominantMaterials: ["chrome tubular steel", "triplex opal glass", "primary pigment accents"],
      contrastRatio: "Clean Uniformity (2:1)",
      criPriority: 94,
    },
  },
  "wabi-sabi": {
    entity: {
      id: "ent_dsg_wabi_sabi",
      name: "Wabi-Sabi",
      type: "urn:entity:brand",
      subtype: "Philosophy of Imperfection & Nature",
      popularity: 0.93,
      tags: ["urn:tag:material:organic_imperfection", "urn:tag:rhythm:natural_decay", "urn:tag:palette:earth"],
      description: "Asymmetrical luminaire placements, earthen textured ceramics, soft candle-like dimming at floor levels.",
    },
    relatedInsights: [
      {
        id: "ins_wabi_1",
        name: "Rough-Hewn Ceramic Wall Sconces",
        type: "urn:entity:brand",
        affinity: 0.95,
        popularity: 0.82,
        tags: ["organic-texture", "grazed-shadows"],
      },
    ],
    lightingProfile: {
      kelvinBias: -600, // 2000K - 2200K
      atmosphere: "Organic Imperfection & Earthen Peace",
      dominantMaterials: ["stoneware ceramic", "reclaimed timber", "textured linen", "raw iron"],
      contrastRatio: "Shadow-Dominant (5:1)",
      criPriority: 96,
    },
  },
};
