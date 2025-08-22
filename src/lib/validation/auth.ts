import { z } from 'zod';

/**
 * Base email schema with validation
 */
export const emailSchema = z
  .email('Please enter a valid email address')
  .min(1, 'Email is required')
  .toLowerCase()
  .trim();

/**
 * Base password schema with validation rules
 */
export const passwordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .max(128, 'Password must be less than 128 characters');

/**
 * Sign in form validation
 */
export const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
});

export type SignInInput = z.infer<typeof signInSchema>;

/**
 * Sign up form validation
 */
export const signUpSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters')
    .trim(),
  confirmPassword: z.string().optional(),
}).refine(
  (data) => !data.confirmPassword || data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  }
);

export type SignUpInput = z.infer<typeof signUpSchema>;

/**
 * Sign out doesn't need validation, but including for completeness
 */
export const signOutSchema = z.object({}).optional();

/**
 * Password reset request schema
 */
export const resetPasswordRequestSchema = z.object({
  email: emailSchema,
});

export type ResetPasswordRequestInput = z.infer<typeof resetPasswordRequestSchema>;

/**
 * Password reset confirmation schema
 */
export const resetPasswordSchema = z.object({
  token: z.string().min(1, 'Reset token is required'),
  password: passwordSchema,
  confirmPassword: z.string(),
}).refine(
  (data) => data.password === data.confirmPassword,
  {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  }
);

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;