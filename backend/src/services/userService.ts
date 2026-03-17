import { prisma } from "../config/prisma";

export async function getUsers() {
  return prisma.user.findMany();
}

export async function getUser(id: number) {
  return prisma.user.findUnique({
    where: { id: id },
  });
}

export async function createUser(data: { email: string; name?: string }) {
  return prisma.user.create({
    data: data,
  });
}

export async function updateUser(
  id: number,
  data: { email?: string; name?: string },
) {
  return prisma.user.update({
    where: { id: id },
    data: data,
  });
}

export async function deleteUser(id: number) {
  return prisma.user.delete({
    where: { id: id },
  });
}
