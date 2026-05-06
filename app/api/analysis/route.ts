import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/analysis?institutionId=1&yearFrom=2021&yearTo=2023&activityIds=1,2,3
export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const institutionId = Number(searchParams.get("institutionId"));
  const yearFrom = Number(searchParams.get("yearFrom"));
  const yearTo = Number(searchParams.get("yearTo"));
  const activityIds = (searchParams.get("activityIds") ?? "")
    .split(",")
    .map(Number)
    .filter(Boolean);

  if (!institutionId || !yearFrom || !yearTo || activityIds.length === 0) {
    return NextResponse.json(
      { error: "Missing or invalid parameters" },
      { status: 400 }
    );
  }

  try {
    const [consumptions, factors, institution] = await Promise.all([
      prisma.consumption.findMany({
        where: {
          institutionId,
          activityId: { in: activityIds },
          year: { gte: yearFrom, lte: yearTo },
        },
        include: { activity: true },
      }),
      prisma.emissionFactor.findMany({
        where: {
          activityId: { in: activityIds },
          year: { gte: yearFrom, lte: yearTo },
        },
      }),
      prisma.institution.findUnique({ where: { id: institutionId } }),
    ]);

    // Index factors by activityId+year for O(1) lookup
    const factorMap = new Map<string, number>();
    for (const f of factors) {
      factorMap.set(`${f.activityId}-${f.year}`, f.factorValue);
    }

    // Aggregate CO2e by year and activity
    // byYear: { [year]: { [activityId]: { name, unit, co2e } } }
    const byYear: Record<number, Record<number, { name: string; unit: string; co2e: number }>> = {};

    for (const c of consumptions) {
      const factor = factorMap.get(`${c.activityId}-${c.year}`);
      if (factor === undefined) continue;

      const co2e = c.consumption * factor;

      if (!byYear[c.year]) byYear[c.year] = {};
      if (!byYear[c.year][c.activityId]) {
        byYear[c.year][c.activityId] = { name: c.activity.name, unit: c.activity.unit, co2e: 0 };
      }
      byYear[c.year][c.activityId].co2e += co2e;
    }

    // Build rows sorted by year
    const rows = Object.entries(byYear)
      .sort(([a], [b]) => Number(a) - Number(b))
      .map(([year, activities]) => ({
        year: Number(year),
        activities: Object.entries(activities).map(([activityId, data]) => ({
          activityId: Number(activityId),
          name: data.name,
          unit: data.unit,
          co2e: Math.round(data.co2e * 100) / 100,
        })),
        total: Math.round(Object.values(activities).reduce((sum, a) => sum + a.co2e, 0) * 100) / 100,
      }));

    // Totals per activity across all years
    const totalByActivity: Record<number, { name: string; co2e: number }> = {};
    for (const row of rows) {
      for (const a of row.activities) {
        if (!totalByActivity[a.activityId]) {
          totalByActivity[a.activityId] = { name: a.name, co2e: 0 };
        }
        totalByActivity[a.activityId].co2e += a.co2e;
      }
    }

    const grandTotal = Math.round(
      Object.values(totalByActivity).reduce((sum, a) => sum + a.co2e, 0) * 100
    ) / 100;

    const breakdown = Object.entries(totalByActivity).map(([activityId, data]) => ({
      activityId: Number(activityId),
      name: data.name,
      co2e: Math.round(data.co2e * 100) / 100,
      percentage: grandTotal > 0 ? Math.round((data.co2e / grandTotal) * 100) : 0,
    }));

    return NextResponse.json({
      data: {
        institution: { id: institutionId, name: institution?.name ?? "" },
        period: { yearFrom, yearTo },
        totalCo2e: grandTotal,
        breakdown,
        rows,
      },
    });
  } catch (error) {
    console.error("Error running analysis:", error);
    return NextResponse.json({ error: "Failed to run analysis" }, { status: 500 });
  }
}
