import { z } from 'zod';

export const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z
        .string()
        .min(6, { message: 'Password must be at least 6 characters long' }),
});

export const registerSchema = loginSchema;

export const forgotPasswordSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;
