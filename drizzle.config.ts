import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "mysql",
  schema: "./src/schema/index.ts",
  out: "./drizzle",
  dbCredentials: {
    user: "hoangphan",
    password: "hoangphan",
    host: "localhost",
    port: 3306,
    database: "drizzle-orm",
  },
  strict: true,
  verbose: true,
});