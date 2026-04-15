import fastify from "fastify";
import dotenv from "dotenv";
import { TaskRoute } from "./routes/task.route.js";
import JWT from "@fastify/jwt";
import { UserRoute } from "./routes/user.route.js";

dotenv.config();

const app = fastify({
  logger: true,
});

app.register(JWT, { secret: process.env.JWT_SECRET ?? "" });
app.get("/", (req, reply) => reply.send("Hello"));
app.register(UserRoute);
app.register(TaskRoute);

const start = async () => {
  try {
    await app.listen({
      port: Number(process.env.PORT) || 3000,
      host: "0.0.0.0",
    });
    console.log("Server running");
  } catch (e) {
    app.log.error(e);
  }
};

start();
