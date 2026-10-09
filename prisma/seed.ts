import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { activities, emissionFactors } from "./data/emission-factors.ts";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const activityIds = new Map<string, number>();

  for (const activity of activities) {
    const existing = await prisma.activity.findFirst({
      where: { columnKey: activity.columnKey },
    });
    const saved = existing
      ? await prisma.activity.update({ where: { id: existing.id }, data: activity })
      : await prisma.activity.create({ data: activity });
    activityIds.set(activity.name, saved.id);
  }

  // Factors not listed in the data file are removed so the table always
  // matches the versioned data.
  const keep = emissionFactors.map((f) => ({
    activityId: activityIds.get(f.activity)!,
    year: f.year,
  }));
  await prisma.emissionFactor.deleteMany({
    where: { NOT: { OR: keep } },
  });

  for (const factor of emissionFactors) {
    const activityId = activityIds.get(factor.activity)!;
    const data = {
      factorValue: factor.factorValue,
      source: factor.source,
      sourceUrl: factor.sourceUrl,
    };
    await prisma.emissionFactor.upsert({
      where: { activityId_year: { activityId, year: factor.year } },
      update: data,
      create: { activityId, year: factor.year, ...data },
    });
  }

  console.log(
    `Seeded ${activities.length} activities and ${emissionFactors.length} emission factors`
  );
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
