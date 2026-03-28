import { prisma } from "../config/prisma";
import { User } from "../generated/prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export interface CreateUserInput {
  email: string;
  name?: string;
  password: string;
}

export async function getUsers() {
  return prisma.user.findMany();
}

export async function getUser(id: number) {
  const user = await prisma.user.findUnique({
    where: { id: id },
  });
  if (!user) {
    throw new Error("User not found");
  }
  return user;
}

export async function createUser(
  data: CreateUserInput,
): Promise<Omit<User, "passwordHash">> {
  const existingUser = await prisma.user.findUnique({
    where: { email: data.email },
  });

  if (existingUser) {
    throw new Error("Email is already in use");
  }

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(data.password, saltRounds);

  const newUser = await prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      passwordHash,
    },
  });

  const { passwordHash: _, ...userWithoutPassword } = newUser;
  return userWithoutPassword;
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

export async function loginUser(data: CreateUserInput) {
  const user = await prisma.user.findUnique({
    where: { email: data.email },
  });

  // Make sure to not specify which was invalid
  if (!user) {
    throw new Error("Invalid email or password");
  }

  // Compare the passwords
  const isPasswordValid = await bcrypt.compare(
    data.password,
    user.passwordHash,
  );

  if (!isPasswordValid) {
    throw new Error("Invalid email or password");
  }

  // We embed their database ID inside the token so we know exactly who they are later
  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET as string,
    { expiresIn: "24h" }, // The token expires in 1 day
  );

  const { passwordHash: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
}
