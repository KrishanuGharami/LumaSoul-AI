export type QlooEntityType =
  | "urn:entity:movie"
  | "urn:entity:artist"
  | "urn:entity:brand"
  | "urn:entity:place"
  | "urn:entity:book"
  | "urn:entity:person"
  | "urn:entity:tv_show"
  | "urn:entity:videogame"
  | "urn:entity:podcast";

export interface QlooEntity {
  id: string;
  name: string;
  type: string;
  subtype?: string;
  popularity?: number;
  tags?: string[];
  description?: string;
  properties?: Record<string, any>;
}

export interface QlooSearchResult {
  success: boolean;
  duration?: number;
  results: QlooEntity[];
}

export interface QlooInsightEntity {
  id: string;
  name: string;
  type: string;
  subtype?: string;
  affinity: number;
  popularity?: number;
  tags?: string[];
  explanation?: string;
  properties?: Record<string, any>;
}

export interface QlooInsightsResponse {
  success: boolean;
  results?: {
    entities?: QlooInsightEntity[];
    duration?: number;
  };
  duration?: number;
}

export interface QlooApiStatus {
  connected: boolean;
  isDemoMode: boolean;
  message: string;
  hasServerKey: boolean;
  endpointUrl: string;
  rateLimitRemaining?: number;
}
