const rawNames = [
  'Xã Tam Mỹ', 'Xã Tam Anh', 'Xã Đức Phú', 'Xã Tam Xuân', 'Xã Tam Hải',
  'Phường Tam Kỳ', 'Phường Quảng Phú', 'Phường Hương Trà', 'Phường Bàn Thạch',
  'Xã Tây Hồ', 'Xã Chiên Đàn', 'Xã Phú Ninh', 'Xã Lãnh Ngọc', 'Xã Tiên Phước',
  'Xã Thạnh Bình', 'Xã Sơn Cẩm Hà', 'Xã Trà Liên', 'Xã Trà Giáp', 'Xã Trà Tân',
  'Xã Trà Đốc', 'Xã Trà My', 'Xã Nam Trà My', 'Xã Trà Tập', 'Xã Trà Vân',
  'Xã Trà Linh', 'Xã Trà Leng', 'Xã Thăng Bình', 'Xã Thăng An', 'Xã Thăng Trường',
  'Xã Thăng Điền', 'Xã Thăng Phú', 'Xã Đồng Dương', 'Xã Quế Sơn Trung',
  'Xã Quế Sơn', 'Xã Xuân Phú', 'Xã Nông Sơn', 'Xã Quế Phước', 'Xã Duy Nghĩa',
  'Xã Nam Phước', 'Xã Duy Xuyên', 'Xã Thu Bồn', 'Phường Điện Bàn',
  'Phường Điện Bàn Đông', 'Phường An Thắng', 'Phường Điện Bàn Bắc',
  'Xã Điện Bàn Tây', 'Xã Gò Nổi', 'Phường Hội An', 'Phường Hội An Đông',
  'Phường Hội An Tây', 'Xã Tân Hiệp', 'Xã Núi Thành', 'Xã Đại Lộc',
  'Xã Hà Nha', 'Xã Thượng Đức', 'Xã Vu Gia', 'Xã Phú Thuận', 'Xã Thạnh Mỹ',
  'Xã Bến Giằng', 'Xã Nam Giang', 'Xã Đắc Pring', 'Xã La Dêê', 'Xã La Êê',
  'Xã Sông Vàng', 'Xã Sông Kôn', 'Xã Đông Giang', 'Xã Bến Hiên', 'Xã Avương',
  'Xã Tây Giang', 'Xã Hùng Sơn', 'Xã Hiệp Đức', 'Xã Việt An', 'Xã Phước Trà',
  'Xã Khâm Đức', 'Xã Phước Năng', 'Xã Phước Chánh', 'Xã Phước Thành',
  'Xã Phước Hiệp', 'Phường Hải Châu', 'Phường Hòa Cường', 'Phường An Hải',
  'Phường Sơn Trà', 'Phường Thanh Khê', 'Phường An Khê', 'Phường Hòa Xuân',
  'Phường Cẩm Lệ', 'Phường Ngũ Hành Sơn', 'Phường Hải Vân', 'Phường Hòa Khánh',
  'Phường Liên Chiểu', 'Xã Bà Nà', 'Xã Hòa Vang', 'Xã Hòa Tiến'
];

function removeDiacritics(str) {
  return str
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D');
}

function cleanName(name) {
  let nameWithoutPrefix = name.replace(/^(Xã|Phường)\s+/i, '');
  return removeDiacritics(nameWithoutPrefix).toLowerCase();
}

function getUsername(displayName) {
  let name = cleanName(displayName);
  let username = name.replace(/\s+/g, '');
  username = username.replace(/[^a-z0-9]/g, '');
  return username;
}

const accounts = [];
const seen = new Set();
const dups = [];

rawNames.forEach(raw => {
  let baseUsername = getUsername(raw);
  let username = baseUsername;
  let counter = 1;
  
  while (seen.has(username)) {
    counter++;
    username = `${baseUsername}${counter}`;
  }
  
  accounts.push({ raw, username });
  seen.add(username);
});

// Find the longest username for padding
let maxUserLen = 0;
accounts.forEach(acc => {
  if (acc.username.length > maxUserLen) maxUserLen = acc.username.length;
});

let fileContent = `// lib/accounts.ts
// Danh sách tài khoản cho 93 xã/phường + 1 admin
// Mật khẩu mặc định: 118ldl
// Username: không dấu, bỏ từ Xã/Phường, viết liền không dấu

export type AccountRole = 'admin' | 'unit';

export interface Account {
  username: string;
  displayName: string;
  password: string;
  role: AccountRole;
}

export const ACCOUNTS: Account[] = [
  // ── ADMIN ────────────────────────────────────────────
  {
    username: 'admin',
    displayName: 'Quản trị hệ thống',
    password: '118ldl',
    role: 'admin',
  },

  // ── XÃ / PHƯỜNG ─────────────────────────────────────
`;

accounts.forEach(acc => {
  const userPart = `'${acc.username}',`.padEnd(maxUserLen + 3);
  const displayPart = `'${acc.raw}',`.padEnd(25);
  const line = `  { username: ${userPart} displayName: ${displayPart} password: '118ldl', role: 'unit' },`;
  fileContent += line + '\n';
});

fileContent += `];

// Helper: tìm account theo username
export function findAccountByUsername(username: string): Account | undefined {
  return ACCOUNTS.find(
    (a) => a.username.toLowerCase() === username.toLowerCase()
  );
}
`;

console.log("Total units:", accounts.length);
require('fs').writeFileSync('d:/CDC/web/health-report-app/scratch/accounts_generated.ts', fileContent);
console.log("Generated file written to scratch/accounts_generated.ts");
