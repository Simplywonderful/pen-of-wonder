import { applyD1Migrations, env } from "cloudflare:test";

// Every test file starts from the same schema the live database gets.
await applyD1Migrations(env.DB, env.TEST_MIGRATIONS);
