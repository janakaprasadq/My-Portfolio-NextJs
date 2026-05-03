import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { path } = body;

    if (!path) {
      return NextResponse.json({ error: "Path is required" }, { status: 400 });
    }

    // Extract location headers provided automatically by Vercel
    const country = request.headers.get("x-vercel-ip-country") || "Unknown";
    const city = request.headers.get("x-vercel-ip-city") || "Unknown";

    // Skip tracking for admin pages to avoid inflating stats
    if (path.startsWith("/admin")) {
      return NextResponse.json({ success: true, ignored: true });
    }

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
    // Return 200 even on error so we don't break the frontend
    return NextResponse.json({ success: false, error: "Failed to record view" }, { status: 200 });
  }
}
