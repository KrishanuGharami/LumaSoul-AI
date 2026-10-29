import { QlooApiStatus } from "@/types";

export interface QlooConfig {
  apiKey: string;
  baseUrl: string;
}

export function getQlooConfig(): QlooConfig {
  const apiKey = process.env.QLOO_API_KEY?.trim() || "";
  let baseUrl = process.env.QLOO_API_BASE_URL?.trim() || "https://api.qloo.com";

  // Strip trailing slashes
  baseUrl = baseUrl.replace(/\/+$/, "");

  return { apiKey, baseUrl };
}

export async function checkQlooStatus(): Promise<QlooApiStatus> {
  const { apiKey, baseUrl } = getQlooConfig();

  if (!apiKey) {
    return {
      connected: false,
      isDemoMode: true,
      hasServerKey: false,
      message: "Demo Mode Active. No QLOO_API_KEY configured in server environment. Running with curated high-fidelity cultural graph.",
      endpointUrl: baseUrl,
    };
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const testUrl = `${baseUrl}/search?query=test&take=1`;
    const response = await fetch(testUrl, {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      return {
        connected: true,
        isDemoMode: false,
        hasServerKey: true,
        message: "Live connection established to Qloo Cultural Intelligence API.",
        endpointUrl: baseUrl,
      };
    }

    if (response.status === 401 || response.status === 403) {
      return {
        connected: false,
        isDemoMode: true,
        hasServerKey: true,
        message: `Authentication failed (HTTP ${response.status}). Key may be expired or unauthorized. Preserving fallback demo mode.`,
        endpointUrl: baseUrl,
      };
    }

    if (response.status === 429) {
      return {
        connected: false,
        isDemoMode: true,
        hasServerKey: true,
        message: "Qloo API rate limit reached (HTTP 429). Falling back to cached cultural intelligence.",
        endpointUrl: baseUrl,
      };
    }

    return {
      connected: false,
      isDemoMode: true,
      hasServerKey: true,
      message: `Qloo API responded with HTTP ${response.status}. Using robust fallback mode.`,
      endpointUrl: baseUrl,
    };
  } catch (err: any) {
    const errorMsg = err.name === "AbortError" ? "API request timed out (4s)" : err.message || "Network unreachable";
    return {
      connected: false,
      isDemoMode: true,
      hasServerKey: true,
      message: `API check unavailable (${errorMsg}). Running in offline demo mode.`,
      endpointUrl: baseUrl,
    };
  }
}

export interface QlooFetchResult<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  statusCode: number;
  durationMs: number;
  provenance: "live_qloo" | "curated_catalog";
}

export async function qlooFetch<T = any>(
  endpoint: string,
  params: Record<string, string | number | boolean | undefined> = {},
  timeoutMs = 7000
): Promise<QlooFetchResult<T>> {
  const { apiKey, baseUrl } = getQlooConfig();
  const startTime = Date.now();

  if (!apiKey) {
    return {
      success: false,
      statusCode: 401,
      durationMs: 0,
      error: "No QLOO_API_KEY configured",
      provenance: "curated_catalog",
    };
  }

  // Build Query String
  const url = new URL(`${baseUrl}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`);
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.append(key, String(value));
    }
  }

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        "X-Api-Key": apiKey,
        Accept: "application/json",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const durationMs = Date.now() - startTime;

    if (!response.ok) {
      let errDetail = `HTTP ${response.status} ${response.statusText}`;
      try {
        const errJson = await response.json();
        if (errJson.message) errDetail = errJson.message;
        else if (errJson.reason) errDetail = errJson.reason;
      } catch {
        // Ignored
      }

      return {
        success: false,
        statusCode: response.status,
        durationMs,
        error: errDetail,
        provenance: "curated_catalog",
      };
    }

    const data = (await response.json()) as T;
    return {
      success: true,
      data,
      statusCode: response.status,
      durationMs,
      provenance: "live_qloo",
    };
  } catch (err: any) {
    clearTimeout(timeoutId);
    const durationMs = Date.now() - startTime;
    const isTimeout = err.name === "AbortError";

    return {
      success: false,
      statusCode: isTimeout ? 504 : 500,
      durationMs,
      error: isTimeout ? `Request timeout after ${timeoutMs}ms` : err.message || "Network error",
      provenance: "curated_catalog",
    };
  }
}
