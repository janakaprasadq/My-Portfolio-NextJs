import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import crypto from "crypto";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const cronSecret = process.env.CRON_SECRET;

  // Fail-closed: reject if secret is unconfigured or dangerously short
  if (!cronSecret || cronSecret.length < 16) {
    return new NextResponse("Unauthorized: Cron secret not configured.", { status: 401 });
  }

  const authHeader = request.headers.get("authorization") || "";
  const expectedHeader = `Bearer ${cronSecret}`;

  const authBuffer = Buffer.from(authHeader);
  const expectedBuffer = Buffer.from(expectedHeader);

  // Timing-safe comparison to prevent timing attacks
  if (
    authBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(authBuffer, expectedBuffer)
  ) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  try {
    // Query database to keep pool active
    await prisma.profile.findFirst({ select: { id: true } });
    return NextResponse.json({
      success: true,
      message: "Database kept alive",
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Keep-alive error:", error);
    return NextResponse.json({
      success: false,
      message: "Database ping failed",
    }, { status: 500 });
  }
}
