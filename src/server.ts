import fastify from "fastify";
import dotenv from "dotenv";
import { TaskRoute } from "./routes/task.route.js";
import JWT from "@fastify/jwt";
import { UserRoute } from "./routes/user.route.js";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";

dotenv.config();

const app = fastify({
  logger: true,
});

app.register(swagger, {
  swagger: {
    info: {
      title: "API Documentation",
      description: "API documentation for the application",
      version: "1.0.0",
    },
  },
});

app.register(swaggerUI, {
  routePrefix: "/docs",
  uiConfig: {
    docExpansion: "full",
    deepLinking: false,
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
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
