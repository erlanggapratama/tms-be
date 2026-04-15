import type { FastifyReply, FastifyRequest } from "fastify";
import { UserService } from "../services/user.service.js";

export const UserController = {
  async createUser(
    request: FastifyRequest<{ Body: { name: string } }>,
    reply: FastifyReply,
  ) {
    if (request.validationError) {
      return reply.status(400).send({ error: "Invalid request body" });
    }

    const { name } = request.body;

    try {
      const user = await UserService.createUser({
        name,
      });
      const token = await reply.jwtSign(user);
      return reply.status(201).send({ name: user.name, token });
    } catch {
      return reply.status(500).send({ error: "Failed to create task" });
    }
  },
};
