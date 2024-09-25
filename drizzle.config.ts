import { defineConfig, type Config } from "drizzle-kit";

export default defineConfig({
  schema: "./server/db/schema/*",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
}) satisfies Config;