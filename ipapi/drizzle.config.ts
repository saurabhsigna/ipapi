//drizzle.config.ts
import { config } from "dotenv";
import type { Config } from "drizzle-kit";

config({ path: ".dev.vars" });
export default {
  schema: "./src/db/schema/**",

  out: "./drizzle",
  driver: "mysql2",
  dbCredentials: {
    uri: process.env.DATABASE_URL as string,
  },
} satisfies Config;
