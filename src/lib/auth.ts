import { db } from "@/db";
import { schema } from "@/db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";

let baseURL = process.env.BETTER_AUTH_URL || "http://localhost:5173";
let trustedOrigins = process.env.BA_TRUSTED_ORIGINS?.split(',') || ["http://localhost:5173"];


export const auth = betterAuth({
  baseURL,
  trustedOrigins,
  database: drizzleAdapter(db, {
    provider: "sqlite",
    schema,
  }),
  emailAndPassword: {
    enabled: true,
  },
  cookies: {
    secure: false, // Set to true in production with HTTPS
    sameSite: "lax",
    domain: undefined, // Let it default to current domain
    path: "/", // Ensure cookie is available on all paths
  },
  // socialProviders: {
  //     discord: {
  //         clientId: process.env.DISCORD_CLIENT_ID,
  //         clientSecret: process.env.DISCORD_CLIENT_SECRET,
  //     },
  // },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  advanced: {
    ipAddress: {
      ipAddressHeaders: ["cf-connecting-ip", "x-forwarded-for"], // Cloudflare specific header
    },
  },
  // rateLimit: {
  //   enabled: process.env.NODE_ENV === "production", // Only in production
  //   window: 60, // 60 seconds
  //   max: 100, // 100 requests per window
  //   storage: "database", // Use database for serverless compatibility
  //   customRules: {
  //     "/sign-in/anonymous": {
  //       window: 10, // 10 seconds
  //       max: 5, // 5 attempts per 10 seconds
  //     },
  //     "/sign-in/social": {
  //       window: 10, // 10 seconds  
  //       max: 3, // 3 attempts per 10 seconds
  //     },
  //     "/sign-out": {
  //       window: 10, // 10 seconds
  //       max: 10, // 10 sign-outs per 10 seconds
  //     },
  //   },
  // },
  // plugins: [
  //     admin({
  //         adminRoles: ['admin', 'host'],
  //         defaultRole: 'user',
  //         adminUserIds: ['vQ8sw7rznZ3737sBTMduuBGTCEAzCCcI']
  //     }),
  //     username(),
  //     anonymous({
  //         onLinkAccount: async ({ anonymousUser, newUser }) => {
  //             // TODO: Link any game session data from anonymous user to new user
  //             console.log(`Linking anonymous user ${anonymousUser.user.id} to ${newUser.user.id}`);
  //         }
  //     })
  // ],
  // callbacks: {
  //     signIn: {
  //         after: async ({ user, request }: { user: { role?: string;[key: string]: any }, request: Request }) => {
  //             console.log('🔄 signIn.after callback triggered!');
  //             console.log('👤 User:', user);
  //             console.log('🔗 Request URL:', request.url);

  //             // Redirect hosts and admins to host dashboard after login
  //             if (user.role === 'host' || user.role === 'admin') {
  //                 console.log('🏠 Redirecting admin/host to /host');
  //                 return { redirect: '/host' };
  //             }
  //             // Redirect regular players (including anonymous users) to home page
  //             console.log('🎮 Redirecting player to /player');
  //             return { redirect: '/player' };
  //         }
  //     },
  //     signUp: {
  //         after: async ({ user, request }: { user: { role?: string;[key: string]: any }, request: Request }) => {
  //             console.log('🔄 signUp.after callback triggered!');
  //             console.log('👤 User:', user);
  //             console.log('🔗 Request URL:', request.url);

  //             // Redirect hosts and admins to host dashboard after login
  //             if (user.role === 'host' || user.role === 'admin') {
  //                 console.log('🏠 Redirecting admin/host to /host');
  //                 return { redirect: '/host' };
  //             }
  //             // Redirect regular players (including anonymous users) to home page
  //             console.log('🎮 Redirecting player to /player');
  //             return { redirect: '/player' };
  //         }
  //     },
  //     signOut: {
  //         after: async ({ request }: { request: Request }) => {
  //             // Redirect to home page after sign out
  //             console.log('signOut.after callback triggered!');
  //             return { redirect: '/' };
  //         }
  //     }
  // }
});