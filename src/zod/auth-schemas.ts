import { z } from "zod";

export const RegisterFormSchema = z.object({
  email: z.string().email(),
  username: z.string().min(3),
  password: z.string().min(5),
  confirmPassword: z.string().min(5)
});

export const LoginFormSchema = z.object({
    email: z.string().email(),
    username: z.string().min(3),
    password: z.string().min(5)
});

export const LoginResponseSchema = z.object({
    message: z.string(),
    access_token: z.string()
});

export const RegisterResponseSchema = z.object({
    message: z.string()
});

export type RegisterFormInterface = z.infer<typeof RegisterFormSchema>;
export type LoginFormInterface = z.infer<typeof LoginFormSchema>;
export type LoginResponseInterface = z.infer<typeof LoginResponseSchema>;
export type RegisterResponseInterface = z.infer<typeof RegisterResponseSchema>;