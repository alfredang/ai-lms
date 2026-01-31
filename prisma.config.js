const { defineConfig } = require("prisma/config");

// Use a placeholder URL during build if DATABASE_URL is not available
// The actual URL is passed to the Prisma Client at runtime via the adapter
const databaseUrl = process.env.DATABASE_URL || "postgresql://user:pass@localhost:5432/db?schema=public";

module.exports = defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: databaseUrl,
  },
});
