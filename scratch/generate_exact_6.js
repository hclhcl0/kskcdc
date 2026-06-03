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

// Generates username of exactly 6 characters
function generateUsername(displayName) {
  // 1. Remove prefix
  let name = displayName.replace(/^(Xã|Phường)\s+/i, '');
  // 2. Remove diacritics and lowercase
  name = removeDiacritics(name).toLowerCase();
  
  // 3. Split into words
  const words = name.split(/\s+/).filter(Boolean);
  
  let username = '';
  if (words.length === 1) {
    username = words[0];
  } else if (words.length === 2) {
    // e.g. "tam my" -> "tam" + "my"
    username = words[0] + words[1];
  } else if (words.length === 3) {
    // e.g. "nam tra my" -> "nam" + "t" + "m" -> "namtm" ? Or "nam" + "tra" + "my" -> "ntramy" ?
    // Let's try: first word + first letters of subsequent words
    username = words[0] + words.slice(1).map(w => w[0]).join('');
  } else {
    username = words.map(w => w[0]).join('');
  }
  
  // Clean non-alphanumeric just in case
  username = username.replace(/[^a-z0-9]/g, '');
  
  // Now ensure it is exactly 6 characters
  if (username.length > 6) {
    username = username.substring(0, 6);
  } else if (username.length < 6) {
    // If it's less than 6 characters, let's pad it or do something else?
    // Wait, is it OK if it is less than 6 chars? E.g. "tammy" is 5 chars. If it has to be exactly 6, we could add a suffix or pad.
    // But usually "viết tắt 6ký tự" means "abbreviated to at most 6 characters", or maybe they just mean 6 characters max.
    // Let's check how many are less than 6: "tammy", "tamky", "tayho", "traan", etc.
  }
  
  return username;
}

// Let's see the generated usernames
const accounts = [];
const seen = new Set();
const dups = [];

rawNames.forEach(raw => {
  let username = generateUsername(raw);
  
  // If it's less than 6 characters, let's see. If they want exactly 6 chars, we can check.
  accounts.push({ raw, username });
  if (seen.has(username)) {
    dups.push(username);
  }
  seen.add(username);
});

console.log("Generated usernames:");
accounts.forEach(a => {
  console.log(`${a.raw.padEnd(25)} -> ${a.username.padEnd(10)} (len: ${a.username.length})`);
});

console.log("\nDuplicates:", dups);
