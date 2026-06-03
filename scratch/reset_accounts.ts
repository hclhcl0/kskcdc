import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.POSTGRES_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

function toUsername(donVi: string): string {
  return donVi
    .replace(/^(Xã|Phường)\s+/i, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/gi, 'd')
    .replace(/\s+/g, '')
    .toLowerCase();
}

// Đúng 93 đơn vị theo benchmarks.ts
const DON_VI_LIST = [
  // Núi Thành / BV Việt - Hàn
  'Xã Núi Thành', 'Xã Tam Mỹ', 'Xã Tam Anh', 'Xã Đức Phú', 'Xã Tam Xuân', 'Xã Tam Hải',
  // Tam Kỳ / TTYT Tam Kỳ
  'Phường Tam Kỳ', 'Phường Quảng Phú', 'Phường Hương Trà', 'Phường Bàn Thạch',
  // Phú Ninh / TTYT Phú Ninh
  'Xã Tây Hồ', 'Xã Chiên Đàn', 'Xã Phú Ninh',
  // Tiên Phước / TTYT Tiên Phước
  'Xã Lãnh Ngọc', 'Xã Tiên Phước', 'Xã Thạnh Bình', 'Xã Sơn Cẩm Hà',
  // Bắc Trà My / TTYT Bắc Trà My
  'Xã Trà Liên', 'Xã Trà Giáp', 'Xã Trà Tân', 'Xã Trà Đốc', 'Xã Trà My',
  // Nam Trà My / TTYT Nam Trà My
  'Xã Nam Trà My', 'Xã Trà Tập', 'Xã Trà Vân', 'Xã Trà Linh', 'Xã Trà Leng',
  // Thăng Bình / TTYT Thăng Bình
  'Xã Thăng Bình', 'Xã Thăng An', 'Xã Thăng Trường', 'Xã Thăng Điền', 'Xã Thăng Phú', 'Xã Đồng Dương',
  // Quế Sơn / TTYT Quế Sơn
  'Xã Quế Sơn Trung', 'Xã Quế Sơn', 'Xã Xuân Phú',
  // Nông Sơn / TTYT Nông Sơn
  'Xã Nông Sơn', 'Xã Quế Phước',
  // Duy Xuyên / TTYT Duy Xuyên
  'Xã Duy Nghĩa', 'Xã Nam Phước', 'Xã Duy Xuyên', 'Xã Thu Bồn',
  // Điện Bàn / BV Đa khoa Quảng Nam
  'Phường Điện Bàn', 'Phường Điện Bàn Đông', 'Phường An Thắng', 'Phường Điện Bàn Bắc', 'Xã Điện Bàn Tây', 'Xã Gò Nổi',
  // Hội An / TTYT Hội An
  'Phường Hội An', 'Phường Hội An Đông', 'Phường Hội An Tây', 'Xã Tân Hiệp',
  // Đại Lộc / BV ĐK miền núi phía Bắc
  'Xã Đại Lộc', 'Xã Hà Nha', 'Xã Thượng Đức', 'Xã Vu Gia', 'Xã Phú Thuận',
  // Nam Giang / TTYT Nam Giang
  'Xã Thạnh Mỹ', 'Xã Bến Giằng', 'Xã Nam Giang', 'Xã Đắc Pring', 'Xã La Dêê', 'Xã La Êê',
  // Đông Giang / TTYT Đông Giang
  'Xã Sông Vàng', 'Xã Sông Kôn', 'Xã Đông Giang', 'Xã Bến Hiên',
  // Tây Giang / TTYT Tây Giang
  'Xã Avương', 'Xã Tây Giang', 'Xã Hùng Sơn',
  // Hiệp Đức / TTYT Hiệp Đức
  'Xã Hiệp Đức', 'Xã Việt An',
  // Phước Sơn / TTYT Phước Sơn
  'Xã Phước Trà', 'Xã Khâm Đức', 'Xã Phước Năng', 'Xã Phước Chánh', 'Xã Phước Thành', 'Xã Phước Hiệp',
  // Hải Châu / TTYT Hải Châu
  'Phường Hải Châu', 'Phường Hòa Cường',
  // Sơn Trà / TTYT Sơn Trà
  'Phường An Hải', 'Phường Sơn Trà',
  // Thanh Khê / TTYT Thanh Khê
  'Phường Thanh Khê', 'Phường An Khê',
  // Cẩm Lệ / TTYT Cẩm Lệ
  'Phường Hòa Xuân', 'Phường Cẩm Lệ',
  // Ngũ Hành Sơn / TTYT Ngũ Hành Sơn
  'Phường Ngũ Hành Sơn',
  // Liên Chiểu / TTYT Liên Chiểu
  'Phường Hải Vân', 'Phường Hòa Khánh', 'Phường Liên Chiểu',
  // Hòa Vang / TTYT Hòa Vang
  'Xã Bà Nà', 'Xã Hòa Vang', 'Xã Hòa Tiến',
];

async function main() {
  console.log(`📋 Danh sách đơn vị: ${DON_VI_LIST.length} đơn vị\n`);

  // BƯỚC 1: Xóa toàn bộ tài khoản cũ
  const deleted = await prisma.account.deleteMany({});
  console.log(`🗑️  Đã xóa ${deleted.count} tài khoản cũ\n`);

  // BƯỚC 2: Tạo tài khoản admin
  await prisma.account.create({
    data: {
      username: 'admin',
      displayName: 'Quản trị viên CDC',
      password: '118ldl',
      role: 'admin',
    }
  });
  console.log('✅ Tạo admin: admin / 118ldl\n');

  // BƯỚC 3: Tạo 93 tài khoản đơn vị
  let count = 0;
  for (const donVi of DON_VI_LIST) {
    const username = toUsername(donVi);
    await prisma.account.create({
      data: {
        username,
        displayName: donVi,
        password: '118ldl',
        role: 'unit',
      }
    });
    count++;
    console.log(`${count.toString().padStart(2)}. ${donVi.padEnd(30)} → ${username}`);
  }

  const total = await prisma.account.count();
  console.log(`\n🎉 Hoàn thành! Tổng tài khoản: ${total} (1 admin + ${count} đơn vị)`);
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
