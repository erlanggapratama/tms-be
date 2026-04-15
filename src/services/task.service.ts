import { prisma } from "../lib/prisma.js";

export const TaskService = {
  createTask: async (data: {
    title: string;
    description?: string;
    userId: string;
  }) => {
    return prisma.task.create({
      data,
    });
  },
  getTasks: async (userId: string) => {
    return prisma.task.findMany({
      where: { userId },
    });
  },
  getTaskById: async (id: string, userId: string) => {
    return prisma.task.findFirst({
      where: { id, userId },
    });
  },
  updateTask: async (
    id: string,
    data: {
      title?: string;
      description?: string;
      completed?: boolean;
      userId: string;
    },
  ) => {
    return prisma.task.updateMany({
      where: { id, userId: data.userId },
      data,
    });
  },
  deleteTask: async (id: string, userId: string) => {
    return prisma.task.deleteMany({
      where: { id, userId },
    });
  },
};
