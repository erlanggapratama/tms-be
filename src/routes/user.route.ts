import type { FastifyInstance } from "fastify";
import { createUserSchema } from "../schemas/user.schema.js";
import { UserController } from "../controllers/user.controller.js";

export async function UserRoute(app: FastifyInstance) {
  app.post(
    "/register",
    { schema: { body: createUserSchema } },
    UserController.createUser,
  );
}
