import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.POSTGRES_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  // Kiểm tra tài khoản admin
  const admin = await prisma.account.findUnique({ where: { username: 'admin' } });
  console.log('Admin account:', JSON.stringify(admin, null, 2));

  // Đếm tổng số tài khoản
  const total = await prisma.account.count();
  console.log('\nTổng tài khoản:', total);

  // List 5 tài khoản đầu tiên
  const accounts = await prisma.account.findMany({ take: 5 });
  console.log('\n5 tài khoản đầu tiên:');
  accounts.forEach(a => console.log(` - ${a.username} | ${a.displayName} | role: ${a.role} | password: "${a.password}"`));
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
