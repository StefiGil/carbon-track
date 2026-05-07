import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/consumption/years?institutionId=1
export async function GET(req: NextRequest) {
  const institutionId = Number(req.nextUrl.searchParams.get("institutionId"));

  if (!institutionId) {
    return NextResponse.json({ error: "Missing institutionId" }, { status: 400 });
  }

  const rows = await prisma.consumption.findMany({
    where: { institutionId },
    select: { year: true },
    distinct: ["year"],
    orderBy: { year: "asc" },
  });

  return NextResponse.json({ data: rows.map((r) => r.year) });
}
