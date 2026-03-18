import { prisma } from "../config/prisma";

export async function getReviews() {
  return prisma.review.findMany();
}

export async function getReview(id: number) {
  return prisma.review.findUnique({
    where: { id: id },
  });
}

export async function createReview(data: {
  text?: string;
  rating: number;
  wifiRating?: number;
  hasOutlets?: string;
  noiseLevel?: string;
  cafeId: number;
}) {
  return prisma.review.create({
    data: data,
  });
}

export async function updateReview(
  id: number,
  data: {
    text?: string;
    rating?: number;
    wifiRating?: number;
    hasOutlets?: string;
    noiseLevel?: string;
  },
) {
  return prisma.review.update({
    where: { id: id },
    data: data,
  });
}

export async function deleteReview(id: number) {
  return prisma.review.delete({ where: { id: id } });
}
