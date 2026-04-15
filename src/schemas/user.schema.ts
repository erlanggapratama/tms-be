export const createUserSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    phoneNumber: {
      type: "string",
      pattern: "^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$",
      minLength: 10,
      maxLength: 15,
    },
  },
  required: ["name"],
};
