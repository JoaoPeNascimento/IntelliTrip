import { z } from "zod";

// 🔹 Schema para convites
export const inviteSchema = z.object({
  id: z.string(),
  email: z.email(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

// 🔹 Schema para atividades
export const activitySchema = z.object({
  id: z.string(),
  name: z.string(),
  date: z.string(),
  description: z.string(),
  createdAt: z.string(),
});

// 🔹 Schema principal da viagem com detalhes
export const travelWithDetailsSchema = z.object({
  id: z.string(),
  destination: z.string(),
  startDate: z.string(),
  endDate: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
  ownerId: z.string(),
  invites: z.array(inviteSchema),
  activities: z.array(activitySchema),
});

// 🔹 Tipos inferidos
export type Invite = z.infer<typeof inviteSchema>;
export type Activity = z.infer<typeof activitySchema>;
export type TravelWithDetails = z.infer<typeof travelWithDetailsSchema>;
