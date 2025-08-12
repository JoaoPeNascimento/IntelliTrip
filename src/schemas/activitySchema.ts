import { z } from "zod";

export const activityCreateSchema = z.object({
  name: z.string().min(1, "O nome é obrigatório"),
  description: z.string().min(1, "A descrição é obrigatória"),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), "Data inválida"),
});

export const activitySchema = activityCreateSchema.extend({
  id: z.cuid("ID inválido"),
});

export type ActivityCreate = z.infer<typeof activityCreateSchema>;
export type Activity = z.infer<typeof activitySchema>;
