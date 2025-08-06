import { z } from "zod";

export const registroSchema = z.object({
  nome: z.string().min(3, "Nome deve ter ao menos 3 caracteres"),
  email: z.email("Email inválido"),
  senha: z.string().min(8, "A senha deve ter pelo menos 8 caracteres"),
});

export type RegistroSchema = z.infer<typeof registroSchema>;
