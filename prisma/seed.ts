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
    { activityId: 1, year: 2024, factorValue: 0.42 },
    { activityId: 2, year: 2024, factorValue: 1.89 },
    { activityId: 3, year: 2024, factorValue: 2.6 },
  ];

  for (const ef of emissionFactors) {
    const existing = await prisma.emissionFactor.findFirst({
      where: { activityId: ef.activityId, year: ef.year },
    });
    if (!existing) {
      await prisma.emissionFactor.create({ data: ef });
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


const factors = [
  // Electricity (activity_id: 1) - varies each year
  { activityId: 1, year: 2020, factorValue: 0.4507 },
  { activityId: 1, year: 2021, factorValue: 0.4200 },
  { activityId: 1, year: 2022, factorValue: 0.3900 },
  { activityId: 1, year: 2023, factorValue: 0.3800 },
  // Gas (activity_id: 2) - stable
  { activityId: 2, year: 2020, factorValue: 2.04 },
  { activityId: 2, year: 2021, factorValue: 2.04 },
  { activityId: 2, year: 2022, factorValue: 2.04 },
  { activityId: 2, year: 2023, factorValue: 2.04 },
  // Fuel (activity_id: 3) - stable
  { activityId: 3, year: 2020, factorValue: 2.62 },
  { activityId: 3, year: 2021, factorValue: 2.62 },
  { activityId: 3, year: 2022, factorValue: 2.62 },
  { activityId: 3, year: 2023, factorValue: 2.62 },
];

for (const factor of factors) {
  await prisma.emissionFactor.create({
    data: factor,
  });
}
