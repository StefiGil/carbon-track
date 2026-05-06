import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const factors = await prisma.emissionFactor.findMany({
      include: { activity: true },
      orderBy: [{ year: "asc" }, { activityId: "asc" }],
    });
    return NextResponse.json({ data: factors });
  } catch (error) {
    console.error("Error fetching emission factors:", error);
    return NextResponse.json(
      { error: "Failed to fetch emission factors" },
      { status: 500 }
    );
  }
}