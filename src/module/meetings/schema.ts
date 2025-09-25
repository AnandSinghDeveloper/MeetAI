import z from "zod";

export const meetingsInsertSchema = z.object({
  name: z.string().min(3, {
    message: "name is required and must be at least 3 characters long",
  }),
  agentId: z.string().min(3, { message: "Agent is required " }),
});

export const meetingsUpdateSchema = meetingsInsertSchema.extend({
  id: z.string().min(1, { message: "id is required" }),
});
