/**
 * One-time script to configure PVD Sign organisation branding in the database.
 * Run locally: npm run with:env -- node scripts/setup-pvd-org-branding.mjs
 * Runs automatically on container start after migrations.
 */
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { base64 } from '@scure/base';
import { PrismaClient } from '@prisma/client';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = process.env.PVD_REPO_ROOT || path.join(__dirname, '..');

const prisma = new PrismaClient();

const brandColors = JSON.parse(
  fs.readFileSync(path.join(rootDir, 'packages/assets/images/pvd/brand-colors.json'), 'utf8'),
);

const logoPath = path.join(rootDir, 'packages/assets/images/pvd/logo-horizontal.png');
const logoBytes = fs.readFileSync(logoPath);
const brandingLogo = JSON.stringify({
  type: 'BYTES_64',
  data: base64.encode(logoBytes),
});

const brandingCompanyDetails = `Rhode Island T. F. Green International Airport
Rhode Island Airport Corporation
One Airport Road, Warwick, RI 02886`;

async function main() {
  const organisations = await prisma.organisation.findMany({
    include: { organisationGlobalSettings: true },
  });

  if (organisations.length === 0) {
    console.error('No organisations found.');
    process.exit(1);
  }

  for (const org of organisations) {
    await prisma.organisationGlobalSettings.update({
      where: { id: org.organisationGlobalSettingsId },
      data: {
        brandingEnabled: true,
        brandingLogo,
        brandingUrl: 'https://www.pvdairport.com',
        brandingCompanyDetails,
        brandingColors: {
          background: brandColors.background,
          foreground: brandColors.foreground,
          muted: brandColors.muted,
          mutedForeground: brandColors.mutedForeground,
          primary: brandColors.primary,
          primaryForeground: brandColors.primaryForeground,
          secondary: brandColors.secondary,
          secondaryForeground: brandColors.secondaryForeground,
          accent: brandColors.accent,
          accentForeground: brandColors.accentForeground,
          border: brandColors.border,
          ring: brandColors.ring,
          card: brandColors.card,
          cardBorder: brandColors.cardBorder,
          cardForeground: brandColors.cardForeground,
        },
      },
    });

    console.log(`Updated branding for organisation: ${org.name} (${org.url})`);
  }

  console.log('PVD organisation branding configured.');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
