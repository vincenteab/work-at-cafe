import { prisma } from "../config/prisma";

export async function getCafes() {
  return prisma.cafe.findMany();
}

export async function createCafe(data: {
  name: string;
  latitude: number;
  longitude: number;
}) {
  return prisma.cafe.create({ data });
}
