import { prisma } from "../config/prisma";

export async function getFavourites(userId: number) {
  return prisma.favorite.findMany({
    where: { userId },
    include: {
      cafe: true,
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function createFavourite(data: {
  userId: number;
  cafeId: number;
}) {
  const { userId, cafeId } = data;

  return prisma.favorite.create({
    data: { userId, cafeId },
  });
}

export async function deleteFavourite(data: {
  userId: number;
  cafeId: number;
}) {
  const { userId, cafeId } = data;

  return prisma.favorite.delete({
    where: {
      userId_cafeId: { userId, cafeId },
    },
  });
}
