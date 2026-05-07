import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

await prisma.consumption.deleteMany({
  where: {
    id: {
      in: [3087, 3088, 3089, 3090, 3091, 3092, 3093, 3094, 3095],
    },
  },
});

console.log("Consumptions deleted");