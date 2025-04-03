import { z } from "zod";

export const contentSchema = z.object({
  title: z.string().min(5, { message: "El título debe tener al menos 5 caracteres" }),
  introduction: z.string().min(10, { message: "La introducción debe tener al menos 10 caracteres" })
});
