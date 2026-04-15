export const createTaskSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    description: { type: "string" },
  },
  required: ["title"],
};

export const updateTaskSchema = {
  type: "object",
  properties: {
    title: { type: "string" },
    description: { type: "string" },
    completed: { type: "boolean" },
  },
};
