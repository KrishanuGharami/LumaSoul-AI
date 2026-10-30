import { NextRequest, NextResponse } from "next/server";
import { executeArchitectWorkflow } from "@/lib/agent/orchestrator";
import { RoomConfig, TastePreference } from "@/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { tastes, roomConfig } = body as {
      tastes: TastePreference[];
      roomConfig: RoomConfig;
    };

    if (!Array.isArray(tastes) || tastes.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "At least one cultural taste preference must be provided.",
        },
        { status: 400 }
      );
    }

    if (!roomConfig || !roomConfig.roomType) {
      return NextResponse.json(
        {
          success: false,
          error: "A valid room configuration must be specified.",
        },
        { status: 400 }
      );
    }

    const workflowOutput = await executeArchitectWorkflow({
      tastes,
      roomConfig,
    });

    return NextResponse.json(workflowOutput);
  } catch (err: any) {
    return NextResponse.json(
      {
        success: false,
        error: err.message || "Failed to execute architectural lighting agent workflow",
      },
      { status: 500 }
    );
  }
}
