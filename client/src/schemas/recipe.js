import { z } from "zod";

export const recipeSchema = z.object({
  title: z.string({
    required_error: "El titulo es requerido",
  })
  .min(1, { message: "El titulo no puede estar vacío" }),

  description: z.string({
    required_error: "La descripcion es requerida",
  })
  .min(1, { message: "La descricion no puede estar vacía" }),

  imageUrl: z.string({
    required_error: "La Url es requerida",
  })
  .url("La URL de la imagen debe ser válida")
  .min(1, { message: "La Url no puede estar vacía" }),

  ingredients: z.array(z.object({
    name: z.string().min(1, "El nombre del ingrediente es obligatorio"),
    quantity: z.string().min(1, "La cantidad del ingrediente es obligatoria"),
  }))
  .min(1, { message: "Debe haber al menos un ingrediente" }),

  instructions: z.string({
    required_error: "Las Instrucciónes son requeridas",
  })
  .min(1, { message: "Las instrucciónes no pueden estar vacías" }),

  cookingtime: z.object({
    hour: z.number().int().min(0, { message: "Las horas no pueden ser negativas" }),
    minute: z.number().int()
    .min(0, { message: "Los minutos no pueden ser negativos" })
    .default(0),
  }).refine((data) => data.minute < 60, {
    message: "Los minutos deben estar entre 0 y 59",
    path: ["minute"],
  }),
  
});
