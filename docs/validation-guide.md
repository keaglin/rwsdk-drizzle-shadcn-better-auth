# Validation Guide

This project uses [Zod](https://zod.dev/) for runtime validation of user input and data schemas.

## Quick Start

### Define a Schema

```typescript
// src/lib/validation/user.ts
import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  age: z.number().min(18).optional(),
  role: z.enum(['user', 'admin']).default('user'),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
```

### Use in Server Actions

```typescript
// src/app/pages/user/functions.ts
"use server";
import { createUserSchema } from '@/lib/validation/user';
import { validate } from '@/lib/validation';

export async function createUser(data: unknown) {
  // Validate input
  const validation = validate(createUserSchema, data);
  
  if (!validation.success) {
    return {
      success: false,
      errors: validation.errors, // Field-specific errors
      error: validation.message   // First error message
    };
  }

  // Use validated data - fully typed!
  const { name, email, age, role } = validation.data;
  
  // ... your logic here
}
```

### Display Errors in UI

```tsx
// In your component
const [errors, setErrors] = useState<Record<string, string>>({});

const handleSubmit = async (data) => {
  const result = await createUser(data);
  
  if (!result.success) {
    setErrors(result.errors || {});
    setError(result.error); // General error message
  }
};

// Show field-specific errors
{errors.email && (
  <span className="text-red-500">{errors.email}</span>
)}
```

## Common Patterns

### Email Validation
```typescript
z.string().email().toLowerCase().trim()
```

### Password with Confirmation
```typescript
const schema = z.object({
  password: z.string().min(8),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword']
});
```

### Optional Fields with Defaults
```typescript
z.object({
  name: z.string(),
  bio: z.string().optional(),              // undefined if not provided
  role: z.string().default('user'),        // 'user' if not provided
  tags: z.array(z.string()).default([]),   // empty array if not provided
});
```

### Date Validation
```typescript
z.object({
  birthDate: z.string().datetime(),        // ISO string
  // or
  birthDate: z.date(),                     // Date object
  // with constraints
  eventDate: z.date().min(new Date()),     // Future dates only
});
```

### Nested Objects
```typescript
const addressSchema = z.object({
  street: z.string(),
  city: z.string(),
  zip: z.string().regex(/^\d{5}$/)
});

const userSchema = z.object({
  name: z.string(),
  address: addressSchema,
  // or inline
  contact: z.object({
    email: z.string().email(),
    phone: z.string().optional()
  })
});
```

### Arrays with Constraints
```typescript
z.object({
  tags: z.array(z.string()).min(1).max(5),
  scores: z.array(z.number()).length(3),   // Exactly 3 scores
});
```

### Custom Validation
```typescript
const usernameSchema = z
  .string()
  .min(3)
  .max(20)
  .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores')
  .refine(async (username) => {
    // Check if username is available
    const exists = await checkUsernameExists(username);
    return !exists;
  }, 'Username is already taken');
```

### Transform Data
```typescript
const schema = z.object({
  email: z.string().email().transform(v => v.toLowerCase()),
  price: z.string().transform(v => parseFloat(v)),
  tags: z.string().transform(v => v.split(',').map(t => t.trim())),
});
```

## Helper Functions

The project provides these helpers in `src/lib/validation/index.ts`:

- `validate(schema, data)` - Validate and return formatted result
- `formatZodErrors(error)` - Convert ZodError to field:message object
- `getFirstError(error)` - Get the first error message

## Best Practices

1. **Define schemas near usage** - Keep validation close to where it's used
2. **Reuse common schemas** - Extract common patterns (email, password, etc.)
3. **Validate at boundaries** - Server actions, API routes, external data
4. **Don't over-validate** - Trust TypeScript for internal function calls
5. **Provide good error messages** - Customize messages for better UX

## Testing Validation

```typescript
import { expect, test } from 'vitest';
import { createUserSchema } from '@/lib/validation/user';

test('validates user input', () => {
  // Valid input
  const valid = createUserSchema.safeParse({
    name: 'John',
    email: 'john@example.com',
  });
  expect(valid.success).toBe(true);
  
  // Invalid input
  const invalid = createUserSchema.safeParse({
    name: 'J',  // Too short
    email: 'not-an-email',
  });
  expect(invalid.success).toBe(false);
  expect(invalid.error.issues).toHaveLength(2);
});
```

## Resources

- [Zod Documentation](https://zod.dev/)
- [Zod Error Handling](https://zod.dev/ERROR_HANDLING)
- [TypeScript Integration](https://zod.dev/TYPESCRIPT)