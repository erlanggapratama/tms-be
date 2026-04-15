import fastify from "fastify";
import JWT from "@fastify/jwt";
import { UserRoute } from "./routes/user.route.js";
import { TaskRoute } from "./routes/task.route.js";

export function testApp() {
  const app = fastify();
  app.register(JWT, { secret: process.env.JWT_SECRET ?? "" });
  app.register(UserRoute);
  app.register(TaskRoute);

  return app;
}
