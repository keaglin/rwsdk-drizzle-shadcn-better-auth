import { auth } from "@/lib/auth";
import type { User } from "@/db";
import { AppContext } from "@/worker";

// Authentication interruptor - adds user session to context
export async function requireAuth({ request, ctx }: { request: Request; ctx: AppContext }) {
  console.log('[requireAuth] ctx:', ctx);
  try {
    // console.log('[requireAuth] Request headers:', Object.fromEntries(request.headers.entries()));
    console.log('[requireAuth] Cookies:', request.headers.get('cookie'));
    
    const session = await auth.api.getSession({ headers: request.headers });
    console.log('[requireAuth] session data', session)

    if (!session?.user) {
      return new Response(null, {
        status: 302,
        headers: { Location: "/user/login" },
      });
    }

    // Add user to context for use in route handlers
    ctx.user = session.user as User;
    console.log('[requireAuth] ctx.user after assignment:', ctx);

  } catch (error) {
    console.error("Auth interruptor error:", error);
    return new Response(null, {
      status: 302,
      headers: { Location: "/user/login" },
    });
  }
}

// Optional auth interruptor - adds user if present, doesn't redirect if not
export async function optionalAuth({ request, ctx }: { request: Request; ctx: AppContext }) {
  try {
    const session = await auth.api.getSession({ headers: request.headers });

    console.log('[optionalAuth] session data', session)
    console.log('[optionalAuth] session.user image:', session?.user?.image)

    if (session?.user) {
      ctx.user = session.user as User;
      console.log('[optionalAuth] ctx.user after assignment:', ctx.user);
      console.log('[optionalAuth] ctx.user.image after assignment:', ctx.user?.image);
    }


  } catch (error) {
    // Silently fail for optional auth
    console.log("Optional auth failed:", error instanceof Error ? error.message : String(error));

  }
}

// Role-based interruptors
export function hasRole(allowedRoles: string[]) {
  return async function hasRoleInterruptor({ request, ctx }: { request: Request; ctx: AppContext }) {
    // First ensure user is authenticated
    const authResult = await requireAuth({ request, ctx });
    if (authResult instanceof Response) {
      return authResult; // Return redirect response
    }

    // After requireAuth, ctx.user should be populated
    if (!ctx.user?.role || !allowedRoles.includes(ctx.user.role)) {
      return new Response("Forbidden", { status: 403 });
    }
  };
}

export const isAdmin = hasRole(["admin"]);
export const isHost = hasRole(["admin", "host"]);
export const isPlayer = hasRole(["admin", "host", "player", "user"]); // Most permissive