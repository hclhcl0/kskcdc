const rawNames = [
  'Xã Tam Mỹ', 'Xã Tam Anh', 'Xã Đức Phú', 'Xã Tam Xuân', 'Xã Tam Hải',
  'Phường Tam Kỳ', 'Phường Quảng Phú', 'Phường Hương Trà', 'Phường Bàn Thạch',
  'Xã Tây Hồ', 'Xã Chiên Đàn', 'Xã Phú Ninh', 'Xã Thạnh Bình', 'Xã Tiên Phước',
  'Xã Sơn Cẩm Hà', 'Xã Trà Liên', 'Xã Trà Giáp', 'Xã Trà Tân', 'Xã Trà Đốc',
  'Xã Trà My', 'Xã Nam Trà My', 'Xã Trà Tập', 'Xã Trà Vân', 'Xã Trà Linh',
  'Xã Trà Leng', 'Xã Thăng Bình', 'Xã Thăng An', 'Xã Thăng Trường',
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
  'Phường Sơn Trà', 'Phường Thanh Khê', 'Phường An Kê', 'Phường Hòa Xuân',
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
  // Remove "Xã " or "Phường " (case insensitive, at start)
  let nameWithoutPrefix = name.replace(/^(Xã|Phường)\s+/i, '');
  return removeDiacritics(nameWithoutPrefix).toLowerCase();
}

console.log("=== Options for usernames ===");

// Let's test a few options for creating a 6-character username
// Option 1: Just remove spaces and take the first 6 chars
// Option 2: Remove spaces, if length is < 6, leave it or pad it? (User says "viết tắt 6ký tự" - usually means max 6 chars or exactly 6 chars)
// Option 3: Take initials? E.g. "dien_ban_dong" -> "dbdong" or similar?
// Option 4: Replace spaces with nothing, take first 6 chars.

const results = rawNames.map(name => {
  const cleaned = cleanName(name); // e.g. "tam my", "tam xuan", "dien ban dong"
  // Remove spaces
  const noSpaces = cleaned.replace(/\s+/g, '');
  // Option A: exact 6 chars or truncated to 6 chars
  const optA = noSpaces.substring(0, 6);
  // Option B: replace spaces with _ and truncate to 6 chars
  const withUnderscore = cleaned.replace(/\s+/g, '_');
  const optB = withUnderscore.substring(0, 6).replace(/_$/, ''); // remove trailing underscore if any

  return { name, cleaned, noSpaces, optA, optB };
});

// Check duplicates for optA
const dupsA = {};
results.forEach(r => {
  dupsA[r.optA] = (dupsA[r.optA] || 0) + 1;
});

// Check duplicates for optB
const dupsB = {};
results.forEach(r => {
  dupsB[r.optB] = (dupsB[r.optB] || 0) + 1;
});

console.log("--- OPTION A (no spaces, max 6 chars) ---");
results.forEach(r => {
  console.log(`${r.name.padEnd(25)} -> ${r.optA.padEnd(10)} (len: ${r.optA.length}) ${dupsA[r.optA] > 1 ? 'DUPLICATE!' : ''}`);
});

console.log("\n--- OPTION B (with underscores, max 6 chars) ---");
results.forEach(r => {
  console.log(`${r.name.padEnd(25)} -> ${r.optB.padEnd(10)} (len: ${r.optB.length}) ${dupsB[r.optB] > 1 ? 'DUPLICATE!' : ''}`);
});

console.log("\n--- DUPLICATES REPORT A ---");
Object.keys(dupsA).forEach(k => {
  if (dupsA[k] > 1) {
    console.log(`${k}: ${dupsA[k]} occurrences`);
    console.log(results.filter(r => r.optA === k).map(r => r.name).join(', '));
  }
});

console.log("\n--- DUPLICATES REPORT B ---");
Object.keys(dupsB).forEach(k => {
  if (dupsB[k] > 1) {
    console.log(`${k}: ${dupsB[k]} occurrences`);
    console.log(results.filter(r => r.optB === k).map(r => r.name).join(', '));
  }
});
