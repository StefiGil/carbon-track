import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
const institutions = [
    { id: 1, name: "Universidad" },
    { id: 2, name: "Campus Universitario" },
    { id: 3, name: "Facultad" },
    { id: 4, name: "Instituto Terciario" },
    { id: 5, name: "Escuela Secundaria" },
    { id: 6, name: "Escuela Primaria" },
  ];

  for (const institution of institutions) {
    await prisma.institution.upsert({
      where: { id: institution.id },
      update: { name: institution.name },
      create: institution,
    });
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