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

export async function updateCafe(
  id: number,
  data: {
    name?: string;
    latitude?: number;
    longitude?: number;
  },
) {
  return prisma.cafe.update({
    where: { id },
    data,
  });
}

export async function deleteCafe(id: number) {
  return prisma.cafe.delete({ where: { id: id }, select: { name: true } });
}

export async function getCafe(id: number) {
  return prisma.cafe.findMany({ where: { id: id } });
}
