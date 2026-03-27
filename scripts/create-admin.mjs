import process from "node:process";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

process.loadEnvFile?.();

const prisma = new PrismaClient();

async function main() {
  const [rawEmail, password] = process.argv.slice(2);
  const email = rawEmail?.trim().toLowerCase();

  if (!process.env.DATABASE_URL?.trim()) {
    console.error("DATABASE_URL is required. Add it to your environment or .env file.");
    process.exit(1);
  }

  if (!email || !password) {
    console.error("Usage: npm run admin:create -- <email> <password>");
    process.exit(1);
  }

  if (password.length < 8) {
    console.error("Password must be at least 8 characters long.");
    process.exit(1);
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.adminUser.upsert({
    where: {
      email
    },
    update: {
      passwordHash,
      role: "ADMIN"
    },
    create: {
      email,
      passwordHash,
      role: "ADMIN"
    }
  });

  console.log(`Admin user ready: ${email}`);
}

main()
  .catch((error) => {
    console.error(
      "Failed to create the admin user. Make sure the Supabase database is reachable and run `npm run db:init` first."
    );
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
