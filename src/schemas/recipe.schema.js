import { z } from "zod";

export const createRecipeSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  })
  .min(1, { message: "The title cannot be empty" }),

  description: z.string({
    required_error: "Description is required",
  })
  .min(1, { message: "The description cannot be empty" }),

  imageUrl: z.string({
    required_error: "Url is required",
  })
  .url("Image URL must be valid")
  .min(1, { message: "The Url cannot be empty" }),

  ingredients: z.array(z.object({
    name: z.string().min(1, "Ingredient name is required"),
    quantity: z.string().min(1, "The quantity of the ingredient is mandatory"),
  }))
  .min(1, { message: "The ingredients cannot be empty" }),

  instructions: z.string({
    required_error: "Instructions is required",
  })
  .min(1, { message: "The instructions cannot be empty" }),

  cookingtime: z.object({
    hour: z.number().int().min(0, { message: "Hours cannot be negative" }),
    minute: z.number().int()
    .min(0, { message: "Minutes cannot be negative" })
    .default(0),
  }).refine((data) => data.minute < 60, {
    message: "The minutes must be between 0 and 59.",
    path: ["minute"],
  }),

});
