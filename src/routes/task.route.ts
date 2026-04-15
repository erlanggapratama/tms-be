import type { FastifyInstance } from "fastify";
import { createTaskSchema, updateTaskSchema } from "../schemas/task.schema.js";
import { TaskController } from "../controllers/task.controller.js";

export async function TaskRoute(app: FastifyInstance) {
  app.addHook("onRequest", async (request, reply) => {
    try {
      await request.jwtVerify();
    } catch (err) {
      reply.send(err);
    }
  });

  app.post(
    "/create-task",
    { schema: { body: createTaskSchema }, attachValidation: true },
    TaskController.createTask,
  );

  app.get("/task", TaskController.getTask);
  app.get("/task/:id", TaskController.getTaskById);
  app.put(
    "/task/:id",
    { schema: { body: updateTaskSchema } },
    TaskController.updateTask,
  );
  app.delete("/task/:id", TaskController.deleteTask);
}
