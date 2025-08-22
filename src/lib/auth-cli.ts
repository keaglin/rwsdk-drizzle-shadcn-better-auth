import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, username, anonymous } from "better-auth/plugins";
import * as schema from "@/app/db/schema";

export const auth = betterAuth({
    baseURL: "http://localhost:5173",
    database: drizzleAdapter({} as any, {
      provider: "sqlite",
      schema,
    }),
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: {
      discord: {
        clientId: "dummy_client_id",
        clientSecret: "dummy_client_secret",
      },
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7, // 7 days
      updateAge: 60 * 60 * 24, // 1 day
    },
    plugins: [
      admin(),
      username(),
      anonymous()
    ],
  });