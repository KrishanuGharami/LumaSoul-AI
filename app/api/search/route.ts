import { NextRequest, NextResponse } from "next/server";
import { searchQlooEntities } from "@/lib/qloo/entity-search";
import { CulturalCategory } from "@/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query") || searchParams.get("q") || "";
    const category = searchParams.get("category") as CulturalCategory | null;
    const take = parseInt(searchParams.get("take") || "8", 10);

    if (!query.trim()) {
      return NextResponse.json({
        success: true,
        query: "",
        provenance: "curated_catalog",
        entities: [],
        durationMs: 0,
      });
    }

    const result = await searchQlooEntities({
      query,
      category: category || undefined,
      take: isNaN(take) ? 8 : take,
    });

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Failed to search entities",
        entities: [],
      },
      { status: 500 }
    );
  }
}
