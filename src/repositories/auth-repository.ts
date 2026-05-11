import { prisma } from "../lib/prisma";
import { RegisterDTO } from "../schemas/auth-schema";

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  })
}

export async function createUser(data: RegisterDTO & { password: string }) {
  return prisma.user.create({
    data,
  })
}