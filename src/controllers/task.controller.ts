import type { FastifyReply, FastifyRequest } from "fastify";
import { TaskService } from "../services/task.service.js";

export const TaskController = {
  async createTask(
    request: FastifyRequest<{
      Body: { title: string; description: string };
    }>,
    reply: FastifyReply,
  ) {
    if (request.validationError) {
      return reply.status(400).send({ error: "Invalid request body" });
    }

    const { title, description } = request.body;
    const { id } = request.user;

    try {
      const task = await TaskService.createTask({
        title,
        description,
        userId: id,
      });
      return reply.status(201).send(task);
    } catch {
      return reply.status(500).send({ error: "Failed to create task" });
    }
  },
  async getTask(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.user;
    const task = await TaskService.getTasks(id);
    return reply.send(task);
  },
  async getTaskById(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params;
    const { id: userId } = request.user;
    const task = await TaskService.getTaskById(id, userId);
    return reply.send(task);
  },
  async updateTask(
    request: FastifyRequest<{
      Params: { id: string };
      Body: { title: string; description: string; completed: boolean };
    }>,
    reply: FastifyReply,
  ) {
    if (request.validationError) {
      return reply.status(400).send({ error: "Invalid request body" });
    }
    const body = request.body;
    const { id } = request.params;
    const { id: userId } = request.user;
    const task = await TaskService.updateTask(id, { ...body, userId });
    return reply.send(task);
  },
  async deleteTask(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply,
  ) {
    const { id } = request.params;
    const { id: userId } = request.user;
    await TaskService.deleteTask(id, userId);
    return reply.send({ message: "Task deleted" });
  },
};
