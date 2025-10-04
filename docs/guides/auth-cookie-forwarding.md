---
created: 2025-08-22
updated: 2025-08-22
---

# Authentication Cookie Forwarding in RWSDK

## Problem
When using Better Auth with RWSDK server actions (`"use server"`), authentication cookies are not automatically forwarded to the browser after login, causing sessions to not persist.

## Root Cause
RWSDK server actions cannot return Response objects to the client. When a server action returns a Response, it gets converted to `null` (see `actionResult instanceof Response ? null : actionResult` in rwsdk runtime).

## Solution
Use `requestInfo.response.headers` to set cookies instead of returning a Response object:

### ❌ Incorrect Approach
```typescript
// This will NOT work - Response objects become null on client
export async function signIn(data) {
  const result = await auth.api.signInEmail({ ... });
  const setCookieHeader = result.headers.get('set-cookie');
  
  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Set-Cookie': setCookieHeader }
  });
}
```

### ✅ Correct Approach
```typescript
"use server";
import { requestInfo } from "rwsdk/worker";

export async function signIn(data) {
  const { request, response } = requestInfo;
  
  const result = await auth.api.signInEmail({
    headers: request.headers,
    body: data,
    asResponse: true, // Get full response with headers
  });
  
  // Forward the cookie using requestInfo.response.headers
  const setCookieHeader = result.headers.get('set-cookie');
  if (setCookieHeader) {
    response.headers.set('Set-Cookie', setCookieHeader);
  }
  
  // Return plain JSON object (not Response)
  return { success: true, user: await result.json() };
}
```

## Key Points
1. **Server actions must return plain objects**, not Response objects
2. **Use `requestInfo.response.headers`** to set HTTP response headers
3. **Always use `asResponse: true`** when calling Better Auth APIs to access headers
4. **Forward cookies explicitly** - they don't transfer automatically from server-to-server calls

## Additional Notes
- This applies to any authentication library, not just Better Auth
- Alternative approach: Call auth endpoints directly from client using `fetch()` with `credentials: 'include'`
- The `/api/auth/*` route handler can return Response objects normally since it's not a server action