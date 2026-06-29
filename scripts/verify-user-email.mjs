/**
 * Verify a user email in production (no Resend required).
 * Usage: railway run node scripts/verify-user-email.mjs test@pvdairport.com
 */
import { PrismaClient } from '@prisma/client';

const email = process.argv[2]?.toLowerCase();

if (!email) {
  console.error('Usage: node scripts/verify-user-email.mjs <email>');
  process.exit(1);
}

const prisma = new PrismaClient();

try {
  const user = await prisma.user.update({
    where: { email },
    data: { emailVerified: new Date() },
    select: { id: true, email: true, emailVerified: true, name: true },
  });

  console.log('Verified user:', user);
} catch (error) {
  if (error.code === 'P2025') {
    console.error(`No user found with email: ${email}`);
  } else {
    console.error(error);
  }
  process.exit(1);
} finally {
  await prisma.$disconnect();
}
