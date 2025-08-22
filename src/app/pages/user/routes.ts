import { route } from "rwsdk/router";
import { Login } from "./Login";
import { auth } from "@/app/lib/auth";

export const userRoutes = [
  route("/login", [Login]),
  route("/logout", async function ({ request }) {
    const headers = new Headers();
    
    // Call Better Auth's signOut API
    await auth.api.signOut({
      headers: request.headers,
    });
    
    // Redirect to home page after logout
    headers.set("Location", "/");
    
    return new Response(null, {
      status: 302,
      headers,
    });
  }),
];
