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

const globalForAccounts = global as unknown as { ACCOUNTS: Account[] };

export let ACCOUNTS: Account[] = globalForAccounts.ACCOUNTS || [
  {
    username: 'admin',
    displayName: 'Quản trị viên',
    password: 'admin',
    role: 'admin',
  },
  // ── CÁC ĐƠN VỊ CẤP XÃ/PHƯỜNG ─────────────────────────
  { username: 'ytephuong',   displayName: 'Trạm y tế phường ABC',   password: '118ldl', role: 'unit' },
  { username: 'haichau1',    displayName: 'Phường Hải Châu I',      password: '118ldl', role: 'unit' },
  { username: 'haichau2',    displayName: 'Phường Hải Châu II',     password: '118ldl', role: 'unit' },
  { username: 'thachthang',  displayName: 'Phường Thạch Thang',     password: '118ldl', role: 'unit' },
  { username: 'thuanphuoc',  displayName: 'Phường Thuận Phước',     password: '118ldl', role: 'unit' },
  { username: 'hoathuan',    displayName: 'Phường Hòa Thuận Đông',  password: '118ldl', role: 'unit' },
  { username: 'hoathuante',  displayName: 'Phường Hòa Thuận Tây',   password: '118ldl', role: 'unit' },
  { username: 'phuocninh',   displayName: 'Phường Phước Ninh',      password: '118ldl', role: 'unit' },
  { username: 'namduong',    displayName: 'Phường Nam Dương',       password: '118ldl', role: 'unit' },
  { username: 'binhhien',    displayName: 'Phường Bình Hiên',       password: '118ldl', role: 'unit' },
  { username: 'binhthuan',   displayName: 'Phường Bình Thuận',      password: '118ldl', role: 'unit' },
  { username: 'hoacuongnam', displayName: 'Phường Hòa Cường Nam',   password: '118ldl', role: 'unit' },
  { username: 'hoacuongbac', displayName: 'Phường Hòa Cường Bắc',   password: '118ldl', role: 'unit' },
  { username: 'vinhthung',   displayName: 'Phường Vĩnh Trung',      password: '118ldl', role: 'unit' },
  { username: 'tanchinh',    displayName: 'Phường Tân Chính',       password: '118ldl', role: 'unit' },
  { username: 'thacdian',    displayName: 'Phường Thạc Gián',       password: '118ldl', role: 'unit' },
  { username: 'chinhgian',   displayName: 'Phường Chính Gián',      password: '118ldl', role: 'unit' },
  { username: 'tamthuan',    displayName: 'Phường Tam Thuận',       password: '118ldl', role: 'unit' },
  { username: 'xuandha',     displayName: 'Phường Xuân Hà',         password: '118ldl', role: 'unit' },
  { username: 'ankhe',       displayName: 'Phường An Khê',          password: '118ldl', role: 'unit' },
  { username: 'hoakhe',      displayName: 'Phường Hòa Khê',         password: '118ldl', role: 'unit' },
  { username: 'thanhkheDong',displayName: 'Phường Thanh Khê Đông',  password: '118ldl', role: 'unit' },
  { username: 'thanhkheTay', displayName: 'Phường Thanh Khê Tây',   password: '118ldl', role: 'unit' },
  { username: 'khuetrung',   displayName: 'Phường Khuê Trung',      password: '118ldl', role: 'unit' },
  { username: 'hoathoDong',  displayName: 'Phường Hòa Thọ Đông',    password: '118ldl', role: 'unit' },
  { username: 'hoathoTay',   displayName: 'Phường Hòa Thọ Tây',     password: '118ldl', role: 'unit' },
  { username: 'hoaan',       displayName: 'Phường Hòa An',          password: '118ldl', role: 'unit' },
  { username: 'hoaphat',     displayName: 'Phường Hòa Phát',        password: '118ldl', role: 'unit' },
  { username: 'hoaxuan',     displayName: 'Phường Hòa Xuân',        password: '118ldl', role: 'unit' },
  { username: 'anHaiBac',    displayName: 'Phường An Hải Bắc',      password: '118ldl', role: 'unit' },
  { username: 'anHaiTay',    displayName: 'Phường An Hải Tây',      password: '118ldl', role: 'unit' },
  { username: 'anHaiDong',   displayName: 'Phường An Hải Đông',     password: '118ldl', role: 'unit' },
  { username: 'naihienDong', displayName: 'Phường Nại Hiên Đông',   password: '118ldl', role: 'unit' },
  { username: 'thoQuang',    displayName: 'Phường Thọ Quang',       password: '118ldl', role: 'unit' },
  { username: 'phuocMy',     displayName: 'Phường Phước Mỹ',        password: '118ldl', role: 'unit' },
  { username: 'manThai',     displayName: 'Phường Mân Thái',        password: '118ldl', role: 'unit' },
  { username: 'hoaminh',     displayName: 'Phường Hòa Minh',        password: '118ldl', role: 'unit' },
  { username: 'hoakhanhnam', displayName: 'Phường Hòa Khánh Nam',   password: '118ldl', role: 'unit' },
  { username: 'hoakhanhbac', displayName: 'Phường Hòa Khánh Bắc',   password: '118ldl', role: 'unit' },
  { username: 'hoahiepnam',  displayName: 'Phường Hòa Hiệp Nam',    password: '118ldl', role: 'unit' },
  { username: 'hoahiepbac',  displayName: 'Phường Hòa Hiệp Bắc',    password: '118ldl', role: 'unit' },
  { username: 'myank',       displayName: 'Phường Mỹ An',           password: '118ldl', role: 'unit' },
  { username: 'khuemy',      displayName: 'Phường Khuê Mỹ',         password: '118ldl', role: 'unit' },
  { username: 'hoaquy',      displayName: 'Phường Hòa Quý',         password: '118ldl', role: 'unit' },
  { username: 'hoahai',      displayName: 'Phường Hòa Hải',         password: '118ldl', role: 'unit' },
  { username: 'hoabac',      displayName: 'Xã Hòa Bắc',             password: '118ldl', role: 'unit' },
  { username: 'hoalien',     displayName: 'Xã Hòa Liên',            password: '118ldl', role: 'unit' },
  { username: 'hoaninh',     displayName: 'Xã Hòa Ninh',            password: '118ldl', role: 'unit' },
  { username: 'hoason',      displayName: 'Xã Hòa Sơn',             password: '118ldl', role: 'unit' },
  { username: 'hoaphong',    displayName: 'Xã Hòa Phong',           password: '118ldl', role: 'unit' },
  { username: 'hoaphu',      displayName: 'Xã Hòa Phú',             password: '118ldl', role: 'unit' },
  { username: 'hoakhuong',   displayName: 'Xã Hòa Khương',          password: '118ldl', role: 'unit' },
  { username: 'hoachau',     displayName: 'Xã Hòa Châu',            password: '118ldl', role: 'unit' },
  { username: 'hoatien',     displayName: 'Xã Hòa Tiến',            password: '118ldl', role: 'unit' },
];

if (process.env.NODE_ENV !== 'production') globalForAccounts.ACCOUNTS = ACCOUNTS;

// Helper: tìm account theo username
export function findAccountByUsername(username: string): Account | undefined {
  return ACCOUNTS.find(
    (a) => a.username.toLowerCase() === username.toLowerCase()
  );
}

// Helper: cập nhật mật khẩu
export function updateAccountPassword(username: string, newPassword: string): boolean {
  const account = findAccountByUsername(username);
  if (account) {
    account.password = newPassword;
    return true;
  }
  return false;
}

// Lấy tất cả tài khoản
export function getAccounts(): Account[] {
  return ACCOUNTS;
}

// Thêm tài khoản
export function addAccount(account: Account): Account {
  ACCOUNTS.push(account);
  return account;
}

// Cập nhật thông tin tài khoản (vai trò, tên, v.v.)
export function updateAccount(username: string, updates: Partial<Account>): Account | undefined {
  const index = ACCOUNTS.findIndex((a) => a.username === username);
  if (index !== -1) {
    ACCOUNTS[index] = { ...ACCOUNTS[index], ...updates };
    return ACCOUNTS[index];
  }
  return undefined;
}

// Xóa tài khoản
export function deleteAccount(username: string): boolean {
  const initialLength = ACCOUNTS.length;
  ACCOUNTS = ACCOUNTS.filter((a) => a.username !== username);
  return ACCOUNTS.length !== initialLength;
}
