import { prisma } from "../src/config/prisma";

async function main() {
  console.log("Starting database seed...");

  await prisma.cafe.deleteMany();
  console.log("Cleared existing cafes.");

  const mockCafes = [
    { name: "The Roasted Bean", latitude: 47.6062, longitude: -122.3321 },
    { name: "Syntax Coffee", latitude: 47.6101, longitude: -122.3421 },
    { name: "Byte & Brew", latitude: 49.2827, longitude: -123.1207 },
    { name: "The Component Cafe", latitude: 49.285, longitude: -123.1162 },
    { name: "Full Stack Roastery", latitude: 37.7749, longitude: -122.4194 },
    { name: "Midnight Async", latitude: 37.7849, longitude: -122.4094 },
  ];

  const createdCafes = await prisma.cafe.createMany({
    data: mockCafes,
    skipDuplicates: true,
  });

  console.log(`Successfully seeded ${createdCafes.count} curated cafes.`);
}

main()
  .catch((e) => {
    console.error("Seeding failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
