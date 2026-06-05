import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';
import { FACILITIES, UNIT_TO_FACILITY } from '../lib/facilities';

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('Seeding facilities...');
  
  // 1. Insert facilities
  for (const f of FACILITIES) {
    await prisma.facility.upsert({
      where: { name: f },
      update: {},
      create: { name: f },
    });
  }
  console.log('Facilities seeded.');

  // 2. Update accounts
  const accounts = await prisma.account.findMany();
  for (const account of accounts) {
    // Determine facility based on UNIT_TO_FACILITY or leave null
    const mappedFacility = UNIT_TO_FACILITY[account.username] || UNIT_TO_FACILITY[account.displayName];
    if (mappedFacility) {
      await prisma.account.update({
        where: { id: account.id },
        data: { facilityName: mappedFacility },
      });
      console.log(`Updated account ${account.username} with facility ${mappedFacility}`);
    }
  }
  console.log('Accounts updated.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
