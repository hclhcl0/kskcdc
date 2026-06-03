// lib/accounts.ts
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
  { username: 'tammy',       displayName: 'Xã Tam Mỹ',              password: '118ldl', role: 'unit' },
  { username: 'tamanh',      displayName: 'Xã Tam Anh',             password: '118ldl', role: 'unit' },
  { username: 'ducphu',      displayName: 'Xã Đức Phú',             password: '118ldl', role: 'unit' },
  { username: 'tamxuan',     displayName: 'Xã Tam Xuân',            password: '118ldl', role: 'unit' },
  { username: 'tamhai',      displayName: 'Xã Tam Hải',             password: '118ldl', role: 'unit' },
  { username: 'tamky',       displayName: 'Phường Tam Kỳ',          password: '118ldl', role: 'unit' },
  { username: 'quangphu',    displayName: 'Phường Quảng Phú',       password: '118ldl', role: 'unit' },
  { username: 'huongtra',    displayName: 'Phường Hương Trà',       password: '118ldl', role: 'unit' },
  { username: 'banthach',    displayName: 'Phường Bàn Thạch',       password: '118ldl', role: 'unit' },
  { username: 'tayho',       displayName: 'Xã Tây Hồ',              password: '118ldl', role: 'unit' },
  { username: 'chiendan',    displayName: 'Xã Chiên Đàn',           password: '118ldl', role: 'unit' },
  { username: 'phuninh',     displayName: 'Xã Phú Ninh',            password: '118ldl', role: 'unit' },
  { username: 'lanhngoc',    displayName: 'Xã Lãnh Ngọc',           password: '118ldl', role: 'unit' },
  { username: 'tienphuoc',   displayName: 'Xã Tiên Phước',          password: '118ldl', role: 'unit' },
  { username: 'thanhbinh',   displayName: 'Xã Thạnh Bình',          password: '118ldl', role: 'unit' },
  { username: 'soncamha',    displayName: 'Xã Sơn Cẩm Hà',          password: '118ldl', role: 'unit' },
  { username: 'tralien',     displayName: 'Xã Trà Liên',            password: '118ldl', role: 'unit' },
  { username: 'tragiap',     displayName: 'Xã Trà Giáp',            password: '118ldl', role: 'unit' },
  { username: 'tratan',      displayName: 'Xã Trà Tân',             password: '118ldl', role: 'unit' },
  { username: 'tradoc',      displayName: 'Xã Trà Đốc',             password: '118ldl', role: 'unit' },
  { username: 'tramy',       displayName: 'Xã Trà My',              password: '118ldl', role: 'unit' },
  { username: 'namtramy',    displayName: 'Xã Nam Trà My',          password: '118ldl', role: 'unit' },
  { username: 'tratap',      displayName: 'Xã Trà Tập',             password: '118ldl', role: 'unit' },
  { username: 'travan',      displayName: 'Xã Trà Vân',             password: '118ldl', role: 'unit' },
  { username: 'tralinh',     displayName: 'Xã Trà Linh',            password: '118ldl', role: 'unit' },
  { username: 'traleng',     displayName: 'Xã Trà Leng',            password: '118ldl', role: 'unit' },
  { username: 'thangbinh',   displayName: 'Xã Thăng Bình',          password: '118ldl', role: 'unit' },
  { username: 'thangan',     displayName: 'Xã Thăng An',            password: '118ldl', role: 'unit' },
  { username: 'thangtruong', displayName: 'Xã Thăng Trường',        password: '118ldl', role: 'unit' },
  { username: 'thangdien',   displayName: 'Xã Thăng Điền',          password: '118ldl', role: 'unit' },
  { username: 'thangphu',    displayName: 'Xã Thăng Phú',           password: '118ldl', role: 'unit' },
  { username: 'dongduong',   displayName: 'Xã Đồng Dương',          password: '118ldl', role: 'unit' },
  { username: 'quesontrung', displayName: 'Xã Quế Sơn Trung',       password: '118ldl', role: 'unit' },
  { username: 'queson',      displayName: 'Xã Quế Sơn',             password: '118ldl', role: 'unit' },
  { username: 'xuanphu',     displayName: 'Xã Xuân Phú',            password: '118ldl', role: 'unit' },
  { username: 'nongson',     displayName: 'Xã Nông Sơn',            password: '118ldl', role: 'unit' },
  { username: 'quephuoc',    displayName: 'Xã Quế Phước',           password: '118ldl', role: 'unit' },
  { username: 'duynghia',    displayName: 'Xã Duy Nghĩa',           password: '118ldl', role: 'unit' },
  { username: 'namphuoc',    displayName: 'Xã Nam Phước',           password: '118ldl', role: 'unit' },
  { username: 'duyxuyen',    displayName: 'Xã Duy Xuyên',           password: '118ldl', role: 'unit' },
  { username: 'thubon',      displayName: 'Xã Thu Bồn',             password: '118ldl', role: 'unit' },
  { username: 'dienban',     displayName: 'Phường Điện Bàn',        password: '118ldl', role: 'unit' },
  { username: 'dienbandong', displayName: 'Phường Điện Bàn Đông',   password: '118ldl', role: 'unit' },
  { username: 'anthang',     displayName: 'Phường An Thắng',        password: '118ldl', role: 'unit' },
  { username: 'dienbanbac',  displayName: 'Phường Điện Bàn Bắc',    password: '118ldl', role: 'unit' },
  { username: 'dienbantay',  displayName: 'Xã Điện Bàn Tây',        password: '118ldl', role: 'unit' },
  { username: 'gonoi',       displayName: 'Xã Gò Nổi',              password: '118ldl', role: 'unit' },
  { username: 'hoian',       displayName: 'Phường Hội An',          password: '118ldl', role: 'unit' },
  { username: 'hoiandong',   displayName: 'Phường Hội An Đông',     password: '118ldl', role: 'unit' },
  { username: 'hoiantay',    displayName: 'Phường Hội An Tây',      password: '118ldl', role: 'unit' },
  { username: 'tanhiep',     displayName: 'Xã Tân Hiệp',            password: '118ldl', role: 'unit' },
  { username: 'nuithanh',    displayName: 'Xã Núi Thành',           password: '118ldl', role: 'unit' },
  { username: 'dailoc',      displayName: 'Xã Đại Lộc',             password: '118ldl', role: 'unit' },
  { username: 'hanha',       displayName: 'Xã Hà Nha',              password: '118ldl', role: 'unit' },
  { username: 'thuongduc',   displayName: 'Xã Thượng Đức',          password: '118ldl', role: 'unit' },
  { username: 'vugia',       displayName: 'Xã Vu Gia',              password: '118ldl', role: 'unit' },
  { username: 'phuthuan',    displayName: 'Xã Phú Thuận',           password: '118ldl', role: 'unit' },
  { username: 'thanhmy',     displayName: 'Xã Thạnh Mỹ',            password: '118ldl', role: 'unit' },
  { username: 'bengiang',    displayName: 'Xã Bến Giằng',           password: '118ldl', role: 'unit' },
  { username: 'namgiang',    displayName: 'Xã Nam Giang',           password: '118ldl', role: 'unit' },
  { username: 'dacpring',    displayName: 'Xã Đắc Pring',           password: '118ldl', role: 'unit' },
  { username: 'ladee',       displayName: 'Xã La Dêê',              password: '118ldl', role: 'unit' },
  { username: 'laee',        displayName: 'Xã La Êê',               password: '118ldl', role: 'unit' },
  { username: 'songvang',    displayName: 'Xã Sông Vàng',           password: '118ldl', role: 'unit' },
  { username: 'songkon',     displayName: 'Xã Sông Kôn',            password: '118ldl', role: 'unit' },
  { username: 'donggiang',   displayName: 'Xã Đông Giang',          password: '118ldl', role: 'unit' },
  { username: 'benhien',     displayName: 'Xã Bến Hiên',            password: '118ldl', role: 'unit' },
  { username: 'avuong',      displayName: 'Xã Avương',              password: '118ldl', role: 'unit' },
  { username: 'taygiang',    displayName: 'Xã Tây Giang',           password: '118ldl', role: 'unit' },
  { username: 'hungson',     displayName: 'Xã Hùng Sơn',            password: '118ldl', role: 'unit' },
  { username: 'hiepduc',     displayName: 'Xã Hiệp Đức',            password: '118ldl', role: 'unit' },
  { username: 'vietan',      displayName: 'Xã Việt An',             password: '118ldl', role: 'unit' },
  { username: 'phuoctra',    displayName: 'Xã Phước Trà',           password: '118ldl', role: 'unit' },
  { username: 'khamduc',     displayName: 'Xã Khâm Đức',            password: '118ldl', role: 'unit' },
  { username: 'phuocnang',   displayName: 'Xã Phước Năng',          password: '118ldl', role: 'unit' },
  { username: 'phuocchanh',  displayName: 'Xã Phước Chánh',         password: '118ldl', role: 'unit' },
  { username: 'phuocthanh',  displayName: 'Xã Phước Thành',         password: '118ldl', role: 'unit' },
  { username: 'phuochiep',   displayName: 'Xã Phước Hiệp',          password: '118ldl', role: 'unit' },
  { username: 'haichau',     displayName: 'Phường Hải Châu',        password: '118ldl', role: 'unit' },
  { username: 'hoacuong',    displayName: 'Phường Hòa Cường',       password: '118ldl', role: 'unit' },
  { username: 'anhai',       displayName: 'Phường An Hải',          password: '118ldl', role: 'unit' },
  { username: 'sontra',      displayName: 'Phường Sơn Trà',         password: '118ldl', role: 'unit' },
  { username: 'thanhkhe',    displayName: 'Phường Thanh Khê',       password: '118ldl', role: 'unit' },
  { username: 'ankhe',       displayName: 'Phường An Khê',          password: '118ldl', role: 'unit' },
  { username: 'hoaxuan',     displayName: 'Phường Hòa Xuân',        password: '118ldl', role: 'unit' },
  { username: 'camle',       displayName: 'Phường Cẩm Lệ',          password: '118ldl', role: 'unit' },
  { username: 'nguhanhson',  displayName: 'Phường Ngũ Hành Sơn',    password: '118ldl', role: 'unit' },
  { username: 'haivan',      displayName: 'Phường Hải Vân',         password: '118ldl', role: 'unit' },
  { username: 'hoakhanh',    displayName: 'Phường Hòa Khánh',       password: '118ldl', role: 'unit' },
  { username: 'lienchieu',   displayName: 'Phường Liên Chiểu',      password: '118ldl', role: 'unit' },
  { username: 'bana',        displayName: 'Xã Bà Nà',               password: '118ldl', role: 'unit' },
  { username: 'hoavang',     displayName: 'Xã Hòa Vang',            password: '118ldl', role: 'unit' },
  { username: 'hoatien',     displayName: 'Xã Hòa Tiến',            password: '118ldl', role: 'unit' },
];

// Helper: tìm account theo username
export function findAccountByUsername(username: string): Account | undefined {
  return ACCOUNTS.find(
    (a) => a.username.toLowerCase() === username.toLowerCase()
  );
}
