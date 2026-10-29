import { NextResponse } from "next/server";
import { checkQlooStatus } from "@/lib/qloo/client";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET() {
  try {
    const qlooStatus = await checkQlooStatus();

    return NextResponse.json({
      status: "ok",
      service: "LumaSoul AI Engine",
      version: "1.0.0",
      timestamp: new Date().toISOString(),
      qloo: qlooStatus,
    });
  } catch (err: any) {
    return NextResponse.json(
      {
        status: "error",
        error: err.message || "Failed to inspect system status",
      },
      { status: 500 }
    );
  }
}
