import { z } from "zod";

export const travelCreateSchema = z.object({
  destination: z.string().min(1, "O Destino é obrigatório"),
  startDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "Data inválida"),
  endDate: z.string().refine((val) => !isNaN(Date.parse(val)), "Data inválida"),
});

export const travelSchema = travelCreateSchema.extend({
  id: z.cuid("ID inválido"),
});

export const activitySchema = z.object({
  id: z.cuid("ID inválido"),
  title: z.string(),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), "Data inválida"),
  description: z.string().nullable().optional(),
  createdAt: z.string(),
});

export const inviteSchema = z.object({
  id: z.string(),
  recieverEmail: z.email().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const travelWithDetailsSchema = travelSchema.extend({
  activities: z.array(activitySchema),
  invites: z.array(inviteSchema),
});

export const travelUpdateSchema = travelCreateSchema.partial();

export type TravelUpdate = z.infer<typeof travelUpdateSchema>;
export type TravelCreate = z.infer<typeof travelCreateSchema>;
export type Travel = z.infer<typeof travelSchema>;
export type Activity = z.infer<typeof activitySchema>;
export type Invite = z.infer<typeof inviteSchema>;
export type TravelWithDetails = z.infer<typeof travelWithDetailsSchema>;
