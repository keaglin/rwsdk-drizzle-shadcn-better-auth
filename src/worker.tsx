import { defineApp, ErrorResponse } from "rwsdk/worker";
import { route, render, prefix } from "rwsdk/router";
import { Document } from "@/app/Document";
import { Home } from "@/app/pages/Home";
import { setCommonHeaders } from "@/app/headers";
import { userRoutes } from "@/app/pages/user/routes";
import { auth } from "@/app/lib/auth";
import { requireAuth } from "./app/interruptors";

export interface AppContext {
  user?: {
    id: string;
    name: string;
    email: string;
  };
  session?: {
    id: string;
    userId: string;
    expiresAt: Date;
    token: string;
  };
}


export default defineApp([
  setCommonHeaders(),
  // Session middleware - loads the current user session using Better Auth
  // async ({ ctx, request }) => {
  //   try {
  //     console.log('Session middleware: checking for session');
  //     console.log('Request headers:', Object.fromEntries(request.headers.entries()));
      
  //     const sessionData = await auth.api.getSession({
  //       headers: request.headers,
  //     });
      
  //     console.log('Session data retrieved:', sessionData);
      
  //     if (sessionData?.session && sessionData?.user) {
  //       ctx.session = {
  //         id: sessionData.session.id,
  //         userId: sessionData.user.id,
  //         expiresAt: new Date(sessionData.session.expiresAt),
  //         token: sessionData.session.token,
  //       };
        
  //       ctx.user = {
  //         id: sessionData.user.id,
  //         name: sessionData.user.name,
  //         email: sessionData.user.email,
  //       };
        
  //       console.log('User set in context:', ctx.user);
  //     } else {
  //       console.log('No session or user data found');
  //     }
  //   } catch (error) {
  //     // Session not found or invalid - user is not authenticated
  //     // This is fine, just continue without setting ctx.user
  //     console.log("Error getting session:", error);
  //   }
  // },
  render(Document, [
    route("/", () => new Response("Hello, World!")),
    route("/protected", [requireAuth, Home]),
    prefix("/user", userRoutes),
  ]),
]);
