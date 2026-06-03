import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.POSTGRES_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const NEW_PASSWORD = '118ldl';

async function main() {
  console.log('🔧 Cập nhật mật khẩu admin...');

  // Cập nhật admin
  await prisma.account.update({
    where: { username: 'admin' },
    data: {
      password: NEW_PASSWORD,
      displayName: 'Quản trị viên CDC',
    }
  });
  console.log(`✅ Admin password đã cập nhật thành: "${NEW_PASSWORD}"`);

  // Cập nhật tất cả tài khoản unit về đúng mật khẩu
  const updated = await prisma.account.updateMany({
    where: { role: 'unit' },
    data: { password: NEW_PASSWORD }
  });
  console.log(`✅ Cập nhật ${updated.count} tài khoản unit về mật khẩu: "${NEW_PASSWORD}"`);

  // Kiểm tra lại admin
  const admin = await prisma.account.findUnique({ where: { username: 'admin' } });
  console.log('\nKiểm tra admin:', JSON.stringify({ username: admin?.username, password: admin?.password, role: admin?.role }, null, 2));

  // Tổng kết
  const total = await prisma.account.count();
  console.log('\nTổng tài khoản trong DB:', total);
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
