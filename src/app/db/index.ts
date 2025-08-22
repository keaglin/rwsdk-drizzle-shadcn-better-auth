import { drizzle } from "drizzle-orm/d1";
import { env } from "cloudflare:workers";
import * as appSchema from "./schema";
import * as authSchema from "./auth-schema";

export const schema = {
  ...appSchema,
  ...authSchema,
};

export const db = drizzle(env.DB, { schema });

export type Database = ReturnType<typeof drizzle<typeof schema>>;

export type User = typeof schema.user.$inferSelect;
export type Session = typeof schema.session.$inferSelect;
export type Account = typeof schema.account.$inferSelect;

export type NewUser = typeof schema.user.$inferInsert;
export type NewSession = typeof schema.session.$inferInsert;
export type NewAccount = typeof schema.account.$inferInsert;