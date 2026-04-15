import { prisma } from "../lib/prisma.js";

export const UserService = {
  createUser: async (data: { name: string; phoneNumber?: string }) => {
    return prisma.user.create({
      data,
    });
  },
  getUsers: async () => {
    return prisma.user.findMany();
  },
  getUserById: async (id: string) => {
    return prisma.user.findUnique({
      where: { id },
    });
  },
};
