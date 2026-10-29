export type CulturalCategory =
  | "cinema"
  | "music"
  | "fashion"
  | "travel"
  | "design";

export interface TastePreference {
  id: string;
  name: string;
  category: CulturalCategory;
  qlooEntityId?: string;
  qlooType?: string;
  confidence?: number;
  provenance: "live_qloo" | "curated_catalog" | "user_defined";
}

export type RoomType =
  | "living_room"
  | "bedroom"
  | "home_office"
  | "entertainment_room"
  | "dining_room";

export type RoomSize = "small" | "medium" | "large";
export type CeilingHeight = "standard" | "high";
export type DesiredAtmosphere =
  | "cinematic"
  | "minimalist"
  | "vibrant"
  | "serene"
  | "luxurious";

export type MainUse = "relaxation" | "work" | "entertainment" | "hosting";

export interface RoomConfig {
  roomType: RoomType;
  roomSize: RoomSize;
  ceilingHeight: CeilingHeight;
  atmosphere: DesiredAtmosphere;
  mainUse: MainUse;
}
