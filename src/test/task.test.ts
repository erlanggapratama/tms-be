import { testApp } from "../app.js";
import { beforeAll, describe, expect, it } from "vitest";

let app: ReturnType<typeof testApp>;
let taskId: string;
let token: string;

describe("Task API", () => {
  beforeAll(async () => {
    app = testApp();

    const register = await app.inject({
      method: "POST",
      url: "/register",
      payload: {
        name: "Testing123",
        phoneNumber: "+6212345679120",
      },
    });

    const body = JSON.parse(register.body);
    token = body.token;
  });

  it("POST /create-task", async () => {
    const res = await app.inject({
      method: "POST",
      url: "/create-task",
      headers: {
        authorization: "Bearer " + token,
      },
      payload: {
        title: "Lari Pagi",
      },
    });

    expect(res.statusCode).toBe(201);

    const body = JSON.parse(res.body);
    expect(body.title).toBe("Lari Pagi");

    taskId = body.id;
  });

  it("PUT /task/:id", async () => {
    const res = await app.inject({
      method: "PUT",
      url: `/task/${taskId}`,
      headers: {
        authorization: "Bearer " + token,
      },
      payload: {
        completed: true,
      },
    });

    expect(res.statusCode).toBe(200);

    const body = JSON.parse(res.body);
    expect(body.count).toBe(1);
  });

  it("DELETE /task/:id", async () => {
    const res = await app.inject({
      method: "DELETE",
      url: `/task/${taskId}`,
      headers: {
        authorization: "Bearer " + token,
      },
    });

    expect(res.statusCode).toBe(200);

    const body = JSON.parse(res.body);
    expect(body.message).toBe("Task deleted");
  });
});
