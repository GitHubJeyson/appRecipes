import { z } from "zod";

export const registerSchema = z.object({
    username: z.string({
        required_error: "Usuario es requerido",
      })
      .min(4, { message: "El nombre de usuario debe tener al menos 4 caracteres" }),

    email: z.string({
      required_error: "Correo es requerido",
    })
      .email({ message: "Correo es requerido" }),

    password: z.string({
      required_error: "Contraseña es requerida",
    })
    .min(8, { message: "La contraseña debe tener almenos 8 caracteres" })
    .regex(/[A-Z]/, { message: "La contraseña debe contener al menos una letra mayúscula"})
    .regex(/[a-z]/, { message: "La contraseña debe tener al menos una letra minúscula"})
    .regex(/[0-9]/, { message: "La contraseña debe tener al menos un número"}),

    confirmPassword: z.string(),
    
    role: z.enum(["user", "admin"], {
      errorMap: () => {
        return { message: "El rol debe ser 'usuario' o 'administrador'" };
      },
    })
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

  export const loginSchema = z.object({
    username: z.string({
      required_error: "Usuario es requerido",
    }),
    password: z.string({
      required_error: "Contraseña es requerida",
    }),
  });