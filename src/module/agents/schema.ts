import z from "zod";

export const agentsInsertSchema = z.object({
  name: z.string().min(3, {
    message: "name is required and must be at least 3 characters long",
  }),
  instructions: z.string().min(3, { message: "instructions is required " }),
});

export const agentsUpdateSchema = agentsInsertSchema.extend({
  id: z.string().min(1, { message: "id is required" }),
});
