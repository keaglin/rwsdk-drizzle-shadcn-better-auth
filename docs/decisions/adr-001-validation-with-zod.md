---
status: accepted
date: 2025-08-22
---

# ADR-001: Using Zod for Runtime Validation

## Context
We need runtime validation for:
- User input (forms, API requests)
- Server action parameters
- Environment variables
- External API responses

Options considered:
1. **Zod** - Schema validation with TypeScript inference
2. **Effect-TS** - Full functional programming toolkit with validation
3. **Yup** - Object schema validation
4. **Manual validation** - Custom validation functions

## Decision
We chose **Zod** for runtime validation.

## Rationale

### Why Zod over Effect-TS
- **Lower learning curve**: Team can be productive immediately
- **Focused scope**: We need validation, not full FP toolkit
- **Bundle size**: ~12kb vs ~50kb+ for Effect
- **Community**: Larger ecosystem, more examples
- **Integration**: Works seamlessly with server actions

### Why Zod over others
- **TypeScript-first**: Types are inferred, not generated
- **Composable**: Schemas can be extended and refined
- **Error messages**: Excellent default messages, customizable
- **Transform support**: Parse and transform in one step

## Consequences

### Positive
- Type-safe validation with minimal boilerplate
- Clear error messages for users
- Consistent validation across client/server
- Easy to test and maintain

### Negative
- Additional dependency (~12kb)
- Team needs to learn Zod API (minimal)
- Not as powerful as Effect for complex workflows

## Implementation

### Basic Usage
```typescript
import { z } from 'zod';

const schema = z.object({
  email: z.string().email(),
  age: z.number().min(18)
});

// In server actions
const validated = schema.parse(data); // Throws on error
// or
const result = schema.safeParse(data); // Returns success/error
```

### Our Pattern
```typescript
// 1. Define schemas in lib/validation/
export const userSchema = z.object({...});

// 2. Use validate helper in server actions
import { validate } from '@/lib/validation';

export async function createUser(data: unknown) {
  const validation = validate(userSchema, data);
  if (!validation.success) {
    return { success: false, errors: validation.errors };
  }
  // validation.data is fully typed
}
```

## Future Considerations
- Consider Effect-TS if we need:
  - Complex async workflows with retries
  - Dependency injection
  - Advanced error handling patterns
- Monitor bundle size impact
- Consider code generation for API schemas