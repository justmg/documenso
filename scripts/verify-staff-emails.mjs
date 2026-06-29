/**
 * Auto-verify staff accounts on allowed signup domains (no Resend required).
 * Runs on container start after migrations.
 */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const allowedDomains = (process.env.NEXT_PRIVATE_ALLOWED_SIGNUP_DOMAINS || 'pvdairport.com')
  .split(',')
  .map((domain) => domain.trim().toLowerCase())
  .filter(Boolean);

async function main() {
  const unverifiedUsers = await prisma.user.findMany({
    where: {
      emailVerified: null,
    },
    select: {
      id: true,
      email: true,
    },
  });

  const toVerify = unverifiedUsers.filter((user) => {
    const domain = user.email.split('@')[1]?.toLowerCase();
    return domain && allowedDomains.includes(domain);
  });

  if (toVerify.length === 0) {
    console.log('No unverified staff accounts to verify.');
    return;
  }

  const now = new Date();

  for (const user of toVerify) {
    await prisma.user.update({
      where: { id: user.id },
      data: { emailVerified: now },
    });
    console.log(`Verified staff account: ${user.email}`);
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
