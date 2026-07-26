import { config } from "dotenv";
import { resolve } from "node:path";
import { defineConfig, env } from "prisma/config";

// Root .env (scripts also inject via dotenv-cli).
config({ path: resolve(import.meta.dirname, "../../.env") });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
