import { NextRequest, NextResponse } from "next/server";
import * as XLSX from "xlsx";
import { prisma } from "@/lib/prisma";

// POST /api/upload/consumption
// Body: FormData { file: File, institutionId: string }
export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File | null;
  const institutionId = Number(formData.get("institutionId"));

  if (!file || !institutionId) {
    return NextResponse.json(
      { error: "Missing file or institutionId" },
      { status: 400 }
    );
  }

  // Parse Excel file
  const buffer = Buffer.from(await file.arrayBuffer());
  const workbook = XLSX.read(buffer, { type: "buffer" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<Record<string, unknown>>(sheet);

  if (rows.length === 0) {
    return NextResponse.json({ error: "The file has no data" }, { status: 400 });
  }

  // Load activities with their columnKey to map Excel columns → activityId
  const activities = await prisma.activity.findMany();

  // Every expected column must be present in the header row
  const headers = new Set(
    (XLSX.utils.sheet_to_json<unknown[]>(sheet, { header: 1 })[0] ?? []).map((h) => String(h).trim())
  );
  const expectedColumns = ["year", "month", ...activities.map((a) => a.columnKey)];
  const missingColumns = expectedColumns.filter((c) => !headers.has(c));

  if (missingColumns.length > 0) {
    return NextResponse.json(
      {
        error: `Missing columns: ${missingColumns.join(", ")}. Expected columns: ${expectedColumns.join(", ")}.`,
      },
      { status: 400 }
    );
  }

  // Build consumption records from each Excel row
  const records: { institutionId: number; activityId: number; year: number; month: number; consumption: number }[] = [];

  for (const row of rows) {
    const year = Number(row["year"]);
    const month = Number(row["month"]);

    if (!year || !month) continue;

    for (const activity of activities) {
      const value = row[activity.columnKey];
      if (value === undefined || value === null || value === "") continue;
      records.push({
        institutionId,
        activityId: activity.id,
        year,
        month,
        consumption: Number(value),
      });
    }
  }

  if (records.length === 0) {
    return NextResponse.json(
      { error: "No valid data found. Check the column names in your file." },
      { status: 400 }
    );
  }

  // Delete existing records for this institution and the years in the file,
  // then insert the new ones (makes re-uploading safe)
  const years = [...new Set(records.map((r) => r.year))];

  await prisma.consumption.deleteMany({
    where: { institutionId, year: { in: years } },
  });

  await prisma.consumption.createMany({ data: records });

  return NextResponse.json({ data: { inserted: records.length } });
}
