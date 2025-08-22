import { z, ZodError } from 'zod';

export * from './auth';

/**
 * Format Zod errors for form display
 * Converts Zod error array to a key-value object for easy form integration
 */
export function formatZodErrors(error: ZodError): Record<string, string> {
  return error.issues.reduce((acc, curr) => {
    const path = curr.path.join('.');
    if (!acc[path]) {
      acc[path] = curr.message;
    }
    return acc;
  }, {} as Record<string, string>);
}

/**
 * Get first error message from Zod error
 */
export function getFirstError(error: ZodError): string {
  return error.issues[0]?.message || 'Validation failed';
}

/**
 * Type-safe validation result
 */
export type ValidationResult<T> = 
  | { success: true; data: T }
  | { success: false; errors: Record<string, string>; message: string };

/**
 * Validate data against a schema and return formatted result
 */
export function validate<T>(
  schema: z.ZodSchema<T>,
  data: unknown
): ValidationResult<T> {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  }
  
  return {
    success: false,
    errors: formatZodErrors(result.error),
    message: getFirstError(result.error),
  };
}