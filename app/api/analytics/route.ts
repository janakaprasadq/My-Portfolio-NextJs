import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

const MAX_PATH_LENGTH = 200;

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const rawPath = body?.path;

    if (!rawPath || typeof rawPath !== "string") {
      return NextResponse.json({ error: "Invalid path provided." }, { status: 400 });
    }

    const path = rawPath.trim().slice(0, MAX_PATH_LENGTH);

    // Only allow valid relative application paths
    if (!path.startsWith("/") || path.startsWith("//")) {
      return NextResponse.json({ error: "Malformed path." }, { status: 400 });
    }

    // Skip tracking for admin and api routes to avoid inflating or polluting analytics
    if (path.startsWith("/admin") || path.startsWith("/api")) {
      return NextResponse.json({ success: true, ignored: true });
    }

    // Extract and truncate location headers from Vercel edge
    const country = (request.headers.get("x-vercel-ip-country") || "Unknown").slice(0, 60);
    const city = (request.headers.get("x-vercel-ip-city") || "Unknown").slice(0, 80);

    await prisma.pageView.create({
      data: {
        path,
        country,
        city,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics Error:", error);
    return NextResponse.json({ success: false, error: "Failed to record view." }, { status: 200 });
  }
}
