import process from "node:process";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { Client } from "pg";

function loadEnvironmentFiles() {
  const candidates = [".env.local", ".env"];

  for (const candidate of candidates) {
    const envPath = path.resolve(process.cwd(), candidate);

    if (fs.existsSync(envPath)) {
      process.loadEnvFile?.(envPath);
    }
  }
}

loadEnvironmentFiles();

function printUsage() {
  console.log("Usage: npm run db:init");
  console.log("       npm run db:migrate:deploy");
  console.log("       npm run db:push");
}

function requireEnv(name) {
  const value = process.env[name]?.trim();

  if (!value) {
    console.error(`${name} is required. Add it to your environment or .env file.`);
    process.exit(1);
  }

  return value;
}

function runPrismaCommand(args) {
  const command = process.platform === "win32" ? "npx.cmd" : "npx";
  const result = spawnSync(command, ["prisma", ...args], {
    stdio: "inherit",
    shell: false
  });

  if (result.status !== 0) {
    process.exit(result.status ?? 1);
  }
}

function getConnectionHint(message) {
  if (
    message.includes("ETIMEDOUT") ||
    message.includes("ENETUNREACH") ||
    message.includes("ECONNREFUSED")
  ) {
    return "Supabase could not be reached from this machine. If your current DATABASE_URL or DIRECT_URL points to the direct host and your network cannot use IPv6, use the pooled Supabase URL for DATABASE_URL and the Session Pooler string on port 5432 for DIRECT_URL, then retry.";
  }

  return null;
}

async function verifyConnection(name, connectionString) {
  const normalizedUrl = new URL(connectionString);
  const sslMode = normalizedUrl.searchParams.get("sslmode");

  if (sslMode) {
    normalizedUrl.searchParams.delete("sslmode");
  }

  const client = new Client({
    connectionString: normalizedUrl.toString(),
    ssl: sslMode
      ? {
          rejectUnauthorized: false
        }
      : undefined
  });

  try {
    await client.connect();
    await client.query("select 1");
    console.log(`${name} connection OK.`);
  } catch (error) {
    const message =
      error instanceof Error && error.message ? error.message : String(error);
    const hint = getConnectionHint(message);

    console.error(`${name} connection failed: ${message}`);

    if (hint) {
      console.error(hint);
    }

    process.exit(1);
  } finally {
    await client.end().catch(() => {});
  }
}

const args = new Set(process.argv.slice(2));

if (args.has("--help") || args.has("-h")) {
  printUsage();
  process.exit(0);
}

const databaseUrl = requireEnv("DATABASE_URL");
const directUrl = requireEnv("DIRECT_URL");

await verifyConnection("DATABASE_URL", databaseUrl);
await verifyConnection("DIRECT_URL", directUrl);

if (args.has("--push")) {
  console.log("Pushing Prisma schema to the configured PostgreSQL database...");
  runPrismaCommand(["db", "push", "--skip-generate"]);
} else {
  console.log("Applying Prisma migrations to the configured PostgreSQL database...");
  runPrismaCommand(["migrate", "deploy"]);
}

console.log("Generating Prisma Client...");
runPrismaCommand(["generate"]);
