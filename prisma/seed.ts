import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const institutions = [
    { id: 1, name: "University" },
    { id: 2, name: "University Campus" },
    { id: 3, name: "Faculty" },
    { id: 4, name: "Tertiary Institute" },
    { id: 5, name: "High School" },
    { id: 6, name: "Primary School" },
  ];

  for (const institution of institutions) {
    await prisma.institution.upsert({
      where: { id: institution.id },
      update: { name: institution.name },
      create: institution,
    });
  }

  const activities = [
    { id: 1, name: "Electricity", unit: "kWh" },
    { id: 2, name: "Gas", unit: "m3" },
    { id: 3, name: "Fuel", unit: "l" },
  ];

  for (const activity of activities) {
    await prisma.activity.upsert({
      where: { id: activity.id },
      update: { name: activity.name, unit: activity.unit },
      create: activity,
    });
  }

  const emissionFactors = [
    // Electricity (activityId: 1)
    { activityId: 1, year: 2020, factorValue: 0.4507 },
    { activityId: 1, year: 2021, factorValue: 0.4200 },
    { activityId: 1, year: 2022, factorValue: 0.3900 },
    { activityId: 1, year: 2023, factorValue: 0.3800 },
    // Gas (activityId: 2)
    { activityId: 2, year: 2020, factorValue: 2.04 },
    { activityId: 2, year: 2021, factorValue: 2.04 },
    { activityId: 2, year: 2022, factorValue: 2.04 },
    { activityId: 2, year: 2023, factorValue: 2.04 },
    // Fuel (activityId: 3)
    { activityId: 3, year: 2020, factorValue: 2.62 },
    { activityId: 3, year: 2021, factorValue: 2.62 },
    { activityId: 3, year: 2022, factorValue: 2.62 },
    { activityId: 3, year: 2023, factorValue: 2.62 },
  ];

  for (const ef of emissionFactors) {
    const existing = await prisma.emissionFactor.findFirst({
      where: { activityId: ef.activityId, year: ef.year },
    });
    if (!existing) {
      await prisma.emissionFactor.create({ data: ef });
    }
  }

  const consumptions = [
    // University - 2022
    { institutionId: 1, activityId: 1, year: 2022, month: 1, consumption: 85000 },
    { institutionId: 1, activityId: 1, year: 2022, month: 2, consumption: 78000 },
    { institutionId: 1, activityId: 1, year: 2022, month: 3, consumption: 72000 },
    { institutionId: 1, activityId: 1, year: 2022, month: 6, consumption: 65000 },
    { institutionId: 1, activityId: 1, year: 2022, month: 7, consumption: 60000 },
    { institutionId: 1, activityId: 1, year: 2022, month: 12, consumption: 80000 },
    { institutionId: 1, activityId: 2, year: 2022, month: 1, consumption: 3200 },
    { institutionId: 1, activityId: 2, year: 2022, month: 2, consumption: 2900 },
    { institutionId: 1, activityId: 2, year: 2022, month: 7, consumption: 400 },
    { institutionId: 1, activityId: 2, year: 2022, month: 12, consumption: 3100 },
    { institutionId: 1, activityId: 3, year: 2022, month: 1, consumption: 450 },
    { institutionId: 1, activityId: 3, year: 2022, month: 6, consumption: 290 },
    // University - 2023
    { institutionId: 1, activityId: 1, year: 2023, month: 1, consumption: 88000 },
    { institutionId: 1, activityId: 1, year: 2023, month: 2, consumption: 80000 },
    { institutionId: 1, activityId: 1, year: 2023, month: 6, consumption: 67000 },
    { institutionId: 1, activityId: 1, year: 2023, month: 12, consumption: 83000 },
    { institutionId: 1, activityId: 2, year: 2023, month: 1, consumption: 3400 },
    { institutionId: 1, activityId: 2, year: 2023, month: 7, consumption: 380 },
    { institutionId: 1, activityId: 3, year: 2023, month: 1, consumption: 480 },
    // Primary School - 2022
    { institutionId: 6, activityId: 1, year: 2022, month: 1, consumption: 4200 },
    { institutionId: 6, activityId: 1, year: 2022, month: 2, consumption: 3900 },
    { institutionId: 6, activityId: 1, year: 2022, month: 7, consumption: 1200 },
    { institutionId: 6, activityId: 1, year: 2022, month: 12, consumption: 4100 },
    { institutionId: 6, activityId: 2, year: 2022, month: 1, consumption: 380 },
    { institutionId: 6, activityId: 2, year: 2022, month: 2, consumption: 340 },
    { institutionId: 6, activityId: 2, year: 2022, month: 12, consumption: 360 },
    // High School - 2023
    { institutionId: 5, activityId: 1, year: 2023, month: 1, consumption: 6500 },
    { institutionId: 5, activityId: 1, year: 2023, month: 2, consumption: 6100 },
    { institutionId: 5, activityId: 1, year: 2023, month: 7, consumption: 2000 },
    { institutionId: 5, activityId: 2, year: 2023, month: 1, consumption: 520 },
    { institutionId: 5, activityId: 2, year: 2023, month: 7, consumption: 80 },
    { institutionId: 5, activityId: 3, year: 2023, month: 1, consumption: 120 },
  ];

  for (const c of consumptions) {
    const existing = await prisma.consumption.findFirst({
      where: {
        institutionId: c.institutionId,
        activityId: c.activityId,
        year: c.year,
        month: c.month,
      },
    });
    if (!existing) {
      await prisma.consumption.create({ data: c });
    }
  }

  console.log("Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
