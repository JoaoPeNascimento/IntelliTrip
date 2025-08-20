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

export const travelUpdateSchema = travelCreateSchema.partial();

export type TravelUpdate = z.infer<typeof travelUpdateSchema>;
export type TravelCreate = z.infer<typeof travelCreateSchema>;
export type Travel = z.infer<typeof travelSchema>;
