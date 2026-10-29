import { NextRequest, NextResponse } from "next/server";
import { fetchQlooInsights } from "@/lib/qloo/insights";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { entityIds, targetType, take } = body;

    if (!Array.isArray(entityIds) || entityIds.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "entityIds array must be specified",
          insights: [],
        },
        { status: 400 }
      );
    }

    const result = await fetchQlooInsights({
      entityIds,
      targetType: targetType || "urn:entity:brand",
      take: typeof take === "number" ? take : 8,
    });

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Failed to fetch cultural insights",
        insights: [],
      },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idsParam = searchParams.get("entityIds") || searchParams.get("ids") || "";
    const targetType = searchParams.get("targetType") || undefined;
    const take = parseInt(searchParams.get("take") || "8", 10);

    const entityIds = idsParam
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    if (entityIds.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "entityIds parameter must be specified",
          insights: [],
        },
        { status: 400 }
      );
    }

    const result = await fetchQlooInsights({
      entityIds,
      targetType,
      take: isNaN(take) ? 8 : take,
    });

    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Failed to fetch cultural insights",
        insights: [],
      },
      { status: 500 }
    );
  }
}
