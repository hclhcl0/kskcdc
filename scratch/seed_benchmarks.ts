import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const pool = new Pool({ connectionString: process.env.POSTGRES_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Dữ liệu từ Google Sheets (làm sạch: bỏ dấu phân cách ngàn)
// Thứ tự: don_vi, tre_em_duoi_6_tuoi, nguoi_cao_tuoi, nguoi_co_cong, nguoi_khuyet_tat, ho_ngheo, ho_can_ngheo, vung_kho_khan
const BENCHMARKS = [
  { don_vi: 'Xã Núi Thành',         tre_em_duoi_6_tuoi: 458,   nguoi_cao_tuoi: 2060,  nguoi_co_cong: null, nguoi_khuyet_tat: 1800, ho_ngheo: 127,  ho_can_ngheo: 146,  vung_kho_khan: null  },
  { don_vi: 'Xã Tam Mỹ',            tre_em_duoi_6_tuoi: 103,   nguoi_cao_tuoi: 2914,  nguoi_co_cong: null, nguoi_khuyet_tat: 555,  ho_ngheo: 151,  ho_can_ngheo: 165,  vung_kho_khan: 1219  },
  { don_vi: 'Xã Tam Anh',           tre_em_duoi_6_tuoi: 1515,  nguoi_cao_tuoi: 4604,  nguoi_co_cong: 345,  nguoi_khuyet_tat: 745,  ho_ngheo: 102,  ho_can_ngheo: 93,   vung_kho_khan: null  },
  { don_vi: 'Xã Đức Phú',           tre_em_duoi_6_tuoi: 262,   nguoi_cao_tuoi: 1583,  nguoi_co_cong: null, nguoi_khuyet_tat: 344,  ho_ngheo: 121,  ho_can_ngheo: 53,   vung_kho_khan: null  },
  { don_vi: 'Xã Tam Xuân',          tre_em_duoi_6_tuoi: 943,   nguoi_cao_tuoi: 1530,  nguoi_co_cong: null, nguoi_khuyet_tat: 1857, ho_ngheo: 153,  ho_can_ngheo: 94,   vung_kho_khan: null  },
  { don_vi: 'Xã Tam Hải',           tre_em_duoi_6_tuoi: null,  nguoi_cao_tuoi: null,  nguoi_co_cong: null, nguoi_khuyet_tat: null, ho_ngheo: null, ho_can_ngheo: null, vung_kho_khan: null  },
  { don_vi: 'Phường Tam Kỳ',        tre_em_duoi_6_tuoi: 972,   nguoi_cao_tuoi: 6811,  nguoi_co_cong: null, nguoi_khuyet_tat: 875,  ho_ngheo: 44,   ho_can_ngheo: 29,   vung_kho_khan: null  },
  { don_vi: 'Phường Quảng Phú',     tre_em_duoi_6_tuoi: 1127,  nguoi_cao_tuoi: 4217,  nguoi_co_cong: 369,  nguoi_khuyet_tat: 827,  ho_ngheo: 79,   ho_can_ngheo: 65,   vung_kho_khan: null  },
  { don_vi: 'Phường Hương Trà',     tre_em_duoi_6_tuoi: 1226,  nguoi_cao_tuoi: 4197,  nguoi_co_cong: null, nguoi_khuyet_tat: 1027, ho_ngheo: 26,   ho_can_ngheo: 15,   vung_kho_khan: null  },
  { don_vi: 'Phường Bàn Thạch',     tre_em_duoi_6_tuoi: 1673,  nguoi_cao_tuoi: 3520,  nguoi_co_cong: null, nguoi_khuyet_tat: 861,  ho_ngheo: 96,   ho_can_ngheo: 52,   vung_kho_khan: null  },
  { don_vi: 'Xã Tây Hồ',            tre_em_duoi_6_tuoi: 862,   nguoi_cao_tuoi: 6349,  nguoi_co_cong: null, nguoi_khuyet_tat: 1093, ho_ngheo: 237,  ho_can_ngheo: 263,  vung_kho_khan: null  },
  { don_vi: 'Xã Chiên Đàn',         tre_em_duoi_6_tuoi: null,  nguoi_cao_tuoi: null,  nguoi_co_cong: null, nguoi_khuyet_tat: null, ho_ngheo: null, ho_can_ngheo: null, vung_kho_khan: null  },
  { don_vi: 'Xã Phú Ninh',          tre_em_duoi_6_tuoi: 1346,  nguoi_cao_tuoi: 4782,  nguoi_co_cong: null, nguoi_khuyet_tat: 752,  ho_ngheo: 138,  ho_can_ngheo: 261,  vung_kho_khan: null  },
  { don_vi: 'Xã Lãnh Ngọc',         tre_em_duoi_6_tuoi: 35,    nguoi_cao_tuoi: 3643,  nguoi_co_cong: null, nguoi_khuyet_tat: 1020, ho_ngheo: 335,  ho_can_ngheo: 424,  vung_kho_khan: 2450  },
  { don_vi: 'Xã Tiên Phước',        tre_em_duoi_6_tuoi: 89,    nguoi_cao_tuoi: 4521,  nguoi_co_cong: null, nguoi_khuyet_tat: 962,  ho_ngheo: 272,  ho_can_ngheo: 274,  vung_kho_khan: null  },
  { don_vi: 'Xã Thạnh Bình',        tre_em_duoi_6_tuoi: 35,    nguoi_cao_tuoi: 3643,  nguoi_co_cong: null, nguoi_khuyet_tat: 1020, ho_ngheo: 335,  ho_can_ngheo: 424,  vung_kho_khan: 2450  },
  { don_vi: 'Xã Sơn Cẩm Hà',        tre_em_duoi_6_tuoi: 362,   nguoi_cao_tuoi: 1029,  nguoi_co_cong: null, nguoi_khuyet_tat: 718,  ho_ngheo: 161,  ho_can_ngheo: 191,  vung_kho_khan: null  },
  { don_vi: 'Xã Trà Liên',          tre_em_duoi_6_tuoi: 263,   nguoi_cao_tuoi: 386,   nguoi_co_cong: null, nguoi_khuyet_tat: 122,  ho_ngheo: 1075, ho_can_ngheo: 164,  vung_kho_khan: 5321  },
  { don_vi: 'Xã Trà Giáp',          tre_em_duoi_6_tuoi: null,  nguoi_cao_tuoi: null,  nguoi_co_cong: null, nguoi_khuyet_tat: null, ho_ngheo: null, ho_can_ngheo: null, vung_kho_khan: null  },
  { don_vi: 'Xã Trà Tân',           tre_em_duoi_6_tuoi: 347,   nguoi_cao_tuoi: 546,   nguoi_co_cong: null, nguoi_khuyet_tat: 120,  ho_ngheo: 2179, ho_can_ngheo: 564,  vung_kho_khan: 6348  },
  { don_vi: 'Xã Trà Đốc',           tre_em_duoi_6_tuoi: 607,   nguoi_cao_tuoi: 625,   nguoi_co_cong: null, nguoi_khuyet_tat: 127,  ho_ngheo: 4409, ho_can_ngheo: 0,    vung_kho_khan: 10379 },
  { don_vi: 'Xã Trà My',            tre_em_duoi_6_tuoi: null,  nguoi_cao_tuoi: null,  nguoi_co_cong: null, nguoi_khuyet_tat: null, ho_ngheo: null, ho_can_ngheo: null, vung_kho_khan: null  },
  { don_vi: 'Xã Nam Trà My',        tre_em_duoi_6_tuoi: 0,     nguoi_cao_tuoi: 410,   nguoi_co_cong: null, nguoi_khuyet_tat: 169,  ho_ngheo: 447,  ho_can_ngheo: 342,  vung_kho_khan: 2448  },
  { don_vi: 'Xã Trà Tập',           tre_em_duoi_6_tuoi: null,  nguoi_cao_tuoi: null,  nguoi_co_cong: null, nguoi_khuyet_tat: null, ho_ngheo: null, ho_can_ngheo: null, vung_kho_khan: null  },
  { don_vi: 'Xã Trà Vân',           tre_em_duoi_6_tuoi: 297,   nguoi_cao_tuoi: 378,   nguoi_co_cong: 54,   nguoi_khuyet_tat: 67,   ho_ngheo: 2064, ho_can_ngheo: 0,    vung_kho_khan: 5407  },
  { don_vi: 'Xã Trà Linh',          tre_em_duoi_6_tuoi: null,  nguoi_cao_tuoi: 784,   nguoi_co_cong: null, nguoi_khuyet_tat: 83,   ho_ngheo: 1158, ho_can_ngheo: null, vung_kho_khan: null  },
  { don_vi: 'Xã Trà Leng',          tre_em_duoi_6_tuoi: 392,   nguoi_cao_tuoi: 218,   nguoi_co_cong: null, nguoi_khuyet_tat: 95,   ho_ngheo: 2398, ho_can_ngheo: 9,    vung_kho_khan: 6447  },
  { don_vi: 'Xã Thăng Bình',        tre_em_duoi_6_tuoi: null,  nguoi_cao_tuoi: 10431, nguoi_co_cong: null, nguoi_khuyet_tat: 1314, ho_ngheo: null, ho_can_ngheo: null, vung_kho_khan: 0     },
  { don_vi: 'Xã Thăng An',          tre_em_duoi_6_tuoi: 2630,  nguoi_cao_tuoi: 6970,  nguoi_co_cong: null, nguoi_khuyet_tat: 1081, ho_ngheo: 250,  ho_can_ngheo: 338,  vung_kho_khan: 0     },
  { don_vi: 'Xã Thăng Trường',      tre_em_duoi_6_tuoi: 1204,  nguoi_cao_tuoi: 4057,  nguoi_co_cong: null, nguoi_khuyet_tat: 780,  ho_ngheo: 206,  ho_can_ngheo: 171,  vung_kho_khan: 0     },
  { don_vi: 'Xã Thăng Điền',        tre_em_duoi_6_tuoi: null,  nguoi_cao_tuoi: null,  nguoi_co_cong: null, nguoi_khuyet_tat: null, ho_ngheo: null, ho_can_ngheo: null, vung_kho_khan: null  },
  { don_vi: 'Xã Thăng Phú',         tre_em_duoi_6_tuoi: 2023,  nguoi_cao_tuoi: 2623,  nguoi_co_cong: null, nguoi_khuyet_tat: 504,  ho_ngheo: 175,  ho_can_ngheo: 188,  vung_kho_khan: 0     },
  { don_vi: 'Xã Đồng Dương',        tre_em_duoi_6_tuoi: null,  nguoi_cao_tuoi: null,  nguoi_co_cong: null, nguoi_khuyet_tat: null, ho_ngheo: null, ho_can_ngheo: null, vung_kho_khan: null  },
  { don_vi: 'Xã Quế Sơn Trung',     tre_em_duoi_6_tuoi: 640,   nguoi_cao_tuoi: 5847,  nguoi_co_cong: 1174, nguoi_khuyet_tat: 1661, ho_ngheo: 495,  ho_can_ngheo: 369,  vung_kho_khan: 0     },
  { don_vi: 'Xã Quế Sơn',           tre_em_duoi_6_tuoi: 750,   nguoi_cao_tuoi: 5115,  nguoi_co_cong: null, nguoi_khuyet_tat: null, ho_ngheo: 509,  ho_can_ngheo: 573,  vung_kho_khan: null  },
  { don_vi: 'Xã Xuân Phú',          tre_em_duoi_6_tuoi: 715,   nguoi_cao_tuoi: 7267,  nguoi_co_cong: null, nguoi_khuyet_tat: 2057, ho_ngheo: 127,  ho_can_ngheo: 143,  vung_kho_khan: 0     },
  { don_vi: 'Xã Nông Sơn',          tre_em_duoi_6_tuoi: 438,   nguoi_cao_tuoi: 740,   nguoi_co_cong: 810,  nguoi_khuyet_tat: 768,  ho_ngheo: 423,  ho_can_ngheo: 332,  vung_kho_khan: null  },
  { don_vi: 'Xã Quế Phước',         tre_em_duoi_6_tuoi: 127,   nguoi_cao_tuoi: 2375,  nguoi_co_cong: null, nguoi_khuyet_tat: 117,  ho_ngheo: 292,  ho_can_ngheo: 148,  vung_kho_khan: 0     },
  { don_vi: 'Xã Duy Nghĩa',         tre_em_duoi_6_tuoi: 1562,  nguoi_cao_tuoi: 4704,  nguoi_co_cong: null, nguoi_khuyet_tat: 1006, ho_ngheo: 220,  ho_can_ngheo: 237,  vung_kho_khan: 0     },
  { don_vi: 'Xã Nam Phước',         tre_em_duoi_6_tuoi: 915,   nguoi_cao_tuoi: 7211,  nguoi_co_cong: null, nguoi_khuyet_tat: 1789, ho_ngheo: 276,  ho_can_ngheo: 247,  vung_kho_khan: null  },
  { don_vi: 'Xã Duy Xuyên',         tre_em_duoi_6_tuoi: 1421,  nguoi_cao_tuoi: 5741,  nguoi_co_cong: null, nguoi_khuyet_tat: 1060, ho_ngheo: 94,   ho_can_ngheo: 40,   vung_kho_khan: 0     },
  { don_vi: 'Xã Thu Bồn',           tre_em_duoi_6_tuoi: 345,   nguoi_cao_tuoi: 7262,  nguoi_co_cong: null, nguoi_khuyet_tat: 2332, ho_ngheo: 61,   ho_can_ngheo: 180,  vung_kho_khan: null  },
  { don_vi: 'Phường Điện Bàn',      tre_em_duoi_6_tuoi: null,  nguoi_cao_tuoi: null,  nguoi_co_cong: null, nguoi_khuyet_tat: null, ho_ngheo: null, ho_can_ngheo: null, vung_kho_khan: null  },
  { don_vi: 'Phường Điện Bàn Đông', tre_em_duoi_6_tuoi: 4450,  nguoi_cao_tuoi: 11209, nguoi_co_cong: null, nguoi_khuyet_tat: 1414, ho_ngheo: 54,   ho_can_ngheo: 109,  vung_kho_khan: 0     },
  { don_vi: 'Phường An Thắng',      tre_em_duoi_6_tuoi: null,  nguoi_cao_tuoi: null,  nguoi_co_cong: null, nguoi_khuyet_tat: null, ho_ngheo: null, ho_can_ngheo: null, vung_kho_khan: null  },
  { don_vi: 'Phường Điện Bàn Bắc',  tre_em_duoi_6_tuoi: 300,   nguoi_cao_tuoi: 6205,  nguoi_co_cong: null, nguoi_khuyet_tat: 858,  ho_ngheo: 51,   ho_can_ngheo: 97,   vung_kho_khan: 0     },
  { don_vi: 'Xã Điện Bàn Tây',      tre_em_duoi_6_tuoi: 750,   nguoi_cao_tuoi: 1723,  nguoi_co_cong: null, nguoi_khuyet_tat: 1460, ho_ngheo: 105,  ho_can_ngheo: 269,  vung_kho_khan: null  },
  { don_vi: 'Xã Gò Nổi',            tre_em_duoi_6_tuoi: 2198,  nguoi_cao_tuoi: 1320,  nguoi_co_cong: 519,  nguoi_khuyet_tat: 900,  ho_ngheo: 84,   ho_can_ngheo: 129,  vung_kho_khan: null  },
  { don_vi: 'Phường Hội An',        tre_em_duoi_6_tuoi: 1076,  nguoi_cao_tuoi: 6811,  nguoi_co_cong: 872,  nguoi_khuyet_tat: 624,  ho_ngheo: 5,    ho_can_ngheo: 35,   vung_kho_khan: 0     },
  { don_vi: 'Phường Hội An Đông',   tre_em_duoi_6_tuoi: 1147,  nguoi_cao_tuoi: 5377,  nguoi_co_cong: 1203, nguoi_khuyet_tat: 605,  ho_ngheo: 17,   ho_can_ngheo: 25,   vung_kho_khan: 0     },
  { don_vi: 'Phường Hội An Tây',    tre_em_duoi_6_tuoi: null,  nguoi_cao_tuoi: null,  nguoi_co_cong: null, nguoi_khuyet_tat: null, ho_ngheo: null, ho_can_ngheo: null, vung_kho_khan: null  },
  { don_vi: 'Xã Tân Hiệp',          tre_em_duoi_6_tuoi: 0,     nguoi_cao_tuoi: 311,   nguoi_co_cong: null, nguoi_khuyet_tat: 70,   ho_ngheo: 0,    ho_can_ngheo: 0,    vung_kho_khan: 1956  },
  { don_vi: 'Xã Đại Lộc',           tre_em_duoi_6_tuoi: 654,   nguoi_cao_tuoi: 11869, nguoi_co_cong: null, nguoi_khuyet_tat: 3990, ho_ngheo: 45,   ho_can_ngheo: 124,  vung_kho_khan: null  },
  { don_vi: 'Xã Hà Nha',            tre_em_duoi_6_tuoi: 489,   nguoi_cao_tuoi: 6934,  nguoi_co_cong: null, nguoi_khuyet_tat: 1269, ho_ngheo: 69,   ho_can_ngheo: 141,  vung_kho_khan: null  },
  { don_vi: 'Xã Thượng Đức',        tre_em_duoi_6_tuoi: null,  nguoi_cao_tuoi: null,  nguoi_co_cong: null, nguoi_khuyet_tat: null, ho_ngheo: null, ho_can_ngheo: null, vung_kho_khan: null  },
  { don_vi: 'Xã Vu Gia',            tre_em_duoi_6_tuoi: 247,   nguoi_cao_tuoi: 4917,  nguoi_co_cong: null, nguoi_khuyet_tat: 1047, ho_ngheo: 77,   ho_can_ngheo: 412,  vung_kho_khan: null  },
  { don_vi: 'Xã Phú Thuận',         tre_em_duoi_6_tuoi: 726,   nguoi_cao_tuoi: 5206,  nguoi_co_cong: null, nguoi_khuyet_tat: 1160, ho_ngheo: 239,  ho_can_ngheo: 440,  vung_kho_khan: null  },
  { don_vi: 'Xã Thạnh Mỹ',          tre_em_duoi_6_tuoi: null,  nguoi_cao_tuoi: null,  nguoi_co_cong: null, nguoi_khuyet_tat: null, ho_ngheo: null, ho_can_ngheo: null, vung_kho_khan: null  },
  { don_vi: 'Xã Bến Giằng',         tre_em_duoi_6_tuoi: 225,   nguoi_cao_tuoi: 659,   nguoi_co_cong: null, nguoi_khuyet_tat: 282,  ho_ngheo: 1992, ho_can_ngheo: 1482, vung_kho_khan: 8122  },
  { don_vi: 'Xã Nam Giang',         tre_em_duoi_6_tuoi: null,  nguoi_cao_tuoi: null,  nguoi_co_cong: null, nguoi_khuyet_tat: null, ho_ngheo: null, ho_can_ngheo: null, vung_kho_khan: null  },
  { don_vi: 'Xã Đắc Pring',         tre_em_duoi_6_tuoi: null,  nguoi_cao_tuoi: null,  nguoi_co_cong: null, nguoi_khuyet_tat: 118,  ho_ngheo: 229,  ho_can_ngheo: 135,  vung_kho_khan: null  },
  { don_vi: 'Xã La Dêê',            tre_em_duoi_6_tuoi: 80,    nguoi_cao_tuoi: 279,   nguoi_co_cong: 55,   nguoi_khuyet_tat: 65,   ho_ngheo: 212,  ho_can_ngheo: 210,  vung_kho_khan: 2910  },
  { don_vi: 'Xã La Êê',             tre_em_duoi_6_tuoi: null,  nguoi_cao_tuoi: null,  nguoi_co_cong: null, nguoi_khuyet_tat: null, ho_ngheo: null, ho_can_ngheo: null, vung_kho_khan: null  },
  { don_vi: 'Xã Sông Vàng',         tre_em_duoi_6_tuoi: 217,   nguoi_cao_tuoi: 759,   nguoi_co_cong: null, nguoi_khuyet_tat: 154,  ho_ngheo: 567,  ho_can_ngheo: 983,  vung_kho_khan: 2680  },
  { don_vi: 'Xã Sông Kôn',          tre_em_duoi_6_tuoi: null,  nguoi_cao_tuoi: null,  nguoi_co_cong: null, nguoi_khuyet_tat: null, ho_ngheo: null, ho_can_ngheo: null, vung_kho_khan: null  },
  { don_vi: 'Xã Đông Giang',        tre_em_duoi_6_tuoi: 723,   nguoi_cao_tuoi: 836,   nguoi_co_cong: null, nguoi_khuyet_tat: 130,  ho_ngheo: 651,  ho_can_ngheo: 251,  vung_kho_khan: 2593  },
  { don_vi: 'Xã Bến Hiên',          tre_em_duoi_6_tuoi: 105,   nguoi_cao_tuoi: 170,   nguoi_co_cong: null, nguoi_khuyet_tat: 87,   ho_ngheo: 1426, ho_can_ngheo: 549,  vung_kho_khan: 2213  },
  { don_vi: 'Xã Avương',            tre_em_duoi_6_tuoi: null,  nguoi_cao_tuoi: null,  nguoi_co_cong: null, nguoi_khuyet_tat: null, ho_ngheo: null, ho_can_ngheo: null, vung_kho_khan: null  },
  { don_vi: 'Xã Tây Giang',         tre_em_duoi_6_tuoi: null,  nguoi_cao_tuoi: null,  nguoi_co_cong: null, nguoi_khuyet_tat: 125,  ho_ngheo: null, ho_can_ngheo: null, vung_kho_khan: 8780  },
  { don_vi: 'Xã Hùng Sơn',          tre_em_duoi_6_tuoi: 0,     nguoi_cao_tuoi: 277,   nguoi_co_cong: null, nguoi_khuyet_tat: 153,  ho_ngheo: 4324, ho_can_ngheo: 42,   vung_kho_khan: 8026  },
  { don_vi: 'Xã Hiệp Đức',          tre_em_duoi_6_tuoi: 397,   nguoi_cao_tuoi: 2467,  nguoi_co_cong: null, nguoi_khuyet_tat: 531,  ho_ngheo: 115,  ho_can_ngheo: 40,   vung_kho_khan: null  },
  { don_vi: 'Xã Việt An',           tre_em_duoi_6_tuoi: 598,   nguoi_cao_tuoi: 959,   nguoi_co_cong: 395,  nguoi_khuyet_tat: 985,  ho_ngheo: 502,  ho_can_ngheo: 351,  vung_kho_khan: null  },
  { don_vi: 'Xã Phước Trà',         tre_em_duoi_6_tuoi: 205,   nguoi_cao_tuoi: 468,   nguoi_co_cong: null, nguoi_khuyet_tat: 130,  ho_ngheo: 584,  ho_can_ngheo: 884,  vung_kho_khan: 7010  },
  { don_vi: 'Xã Khâm Đức',          tre_em_duoi_6_tuoi: null,  nguoi_cao_tuoi: null,  nguoi_co_cong: null, nguoi_khuyet_tat: null, ho_ngheo: null, ho_can_ngheo: null, vung_kho_khan: null  },
  { don_vi: 'Xã Phước Năng',        tre_em_duoi_6_tuoi: 0,     nguoi_cao_tuoi: 200,   nguoi_co_cong: null, nguoi_khuyet_tat: 0,    ho_ngheo: null, ho_can_ngheo: null, vung_kho_khan: 6293  },
  { don_vi: 'Xã Phước Chánh',       tre_em_duoi_6_tuoi: 102,   nguoi_cao_tuoi: 203,   nguoi_co_cong: null, nguoi_khuyet_tat: 24,   ho_ngheo: 528,  ho_can_ngheo: 783,  vung_kho_khan: 1166  },
  { don_vi: 'Xã Phước Thành',       tre_em_duoi_6_tuoi: null,  nguoi_cao_tuoi: null,  nguoi_co_cong: null, nguoi_khuyet_tat: null, ho_ngheo: null, ho_can_ngheo: null, vung_kho_khan: null  },
  { don_vi: 'Xã Phước Hiệp',        tre_em_duoi_6_tuoi: 251,   nguoi_cao_tuoi: 345,   nguoi_co_cong: null, nguoi_khuyet_tat: 74,   ho_ngheo: 1116, ho_can_ngheo: 289,  vung_kho_khan: 2459  },
  { don_vi: 'Phường Hải Châu',      tre_em_duoi_6_tuoi: null,  nguoi_cao_tuoi: null,  nguoi_co_cong: null, nguoi_khuyet_tat: null, ho_ngheo: null, ho_can_ngheo: null, vung_kho_khan: null  },
  { don_vi: 'Phường Hòa Cường',     tre_em_duoi_6_tuoi: 103,   nguoi_cao_tuoi: 13654, nguoi_co_cong: null, nguoi_khuyet_tat: 1586, ho_ngheo: 169,  ho_can_ngheo: 0,    vung_kho_khan: 0     },
  { don_vi: 'Phường An Hải',        tre_em_duoi_6_tuoi: 1505,  nguoi_cao_tuoi: 1362,  nguoi_co_cong: null, nguoi_khuyet_tat: 904,  ho_ngheo: null, ho_can_ngheo: 1458, vung_kho_khan: 0     },
  { don_vi: 'Phường Sơn Trà',       tre_em_duoi_6_tuoi: 1860,  nguoi_cao_tuoi: 1264,  nguoi_co_cong: null, nguoi_khuyet_tat: 1200, ho_ngheo: 121,  ho_can_ngheo: 1705, vung_kho_khan: 0     },
  { don_vi: 'Phường Thanh Khê',     tre_em_duoi_6_tuoi: 946,   nguoi_cao_tuoi: 2889,  nguoi_co_cong: null, nguoi_khuyet_tat: 4360, ho_ngheo: 1081, ho_can_ngheo: 501,  vung_kho_khan: 0     },
  { don_vi: 'Phường An Khê',        tre_em_duoi_6_tuoi: null,  nguoi_cao_tuoi: null,  nguoi_co_cong: null, nguoi_khuyet_tat: null, ho_ngheo: null, ho_can_ngheo: null, vung_kho_khan: null  },
  { don_vi: 'Phường Hòa Xuân',      tre_em_duoi_6_tuoi: 326,   nguoi_cao_tuoi: 11166, nguoi_co_cong: null, nguoi_khuyet_tat: 1146, ho_ngheo: 433,  ho_can_ngheo: 554,  vung_kho_khan: 0     },
  { don_vi: 'Phường Cẩm Lệ',        tre_em_duoi_6_tuoi: 1300,  nguoi_cao_tuoi: 8500,  nguoi_co_cong: null, nguoi_khuyet_tat: 987,  ho_ngheo: 185,  ho_can_ngheo: 254,  vung_kho_khan: 0     },
  { don_vi: 'Phường Ngũ Hành Sơn',  tre_em_duoi_6_tuoi: 650,   nguoi_cao_tuoi: 12679, nguoi_co_cong: 2289, nguoi_khuyet_tat: 1471, ho_ngheo: 562,  ho_can_ngheo: 265,  vung_kho_khan: 0     },
  { don_vi: 'Phường Hải Vân',       tre_em_duoi_6_tuoi: null,  nguoi_cao_tuoi: null,  nguoi_co_cong: null, nguoi_khuyet_tat: null, ho_ngheo: null, ho_can_ngheo: null, vung_kho_khan: null  },
  { don_vi: 'Phường Hòa Khánh',     tre_em_duoi_6_tuoi: null,  nguoi_cao_tuoi: 11529, nguoi_co_cong: null, nguoi_khuyet_tat: 1112, ho_ngheo: 461,  ho_can_ngheo: 404,  vung_kho_khan: null  },
  { don_vi: 'Phường Liên Chiểu',    tre_em_duoi_6_tuoi: null,  nguoi_cao_tuoi: 3906,  nguoi_co_cong: null, nguoi_khuyet_tat: 1674, ho_ngheo: 197,  ho_can_ngheo: 66,   vung_kho_khan: 0     },
  { don_vi: 'Xã Bà Nà',             tre_em_duoi_6_tuoi: null,  nguoi_cao_tuoi: null,  nguoi_co_cong: null, nguoi_khuyet_tat: null, ho_ngheo: null, ho_can_ngheo: null, vung_kho_khan: null  },
  { don_vi: 'Xã Hòa Vang',          tre_em_duoi_6_tuoi: 358,   nguoi_cao_tuoi: 4166,  nguoi_co_cong: null, nguoi_khuyet_tat: 515,  ho_ngheo: 294,  ho_can_ngheo: 145,  vung_kho_khan: 537   },
  { don_vi: 'Xã Hòa Tiến',          tre_em_duoi_6_tuoi: 377,   nguoi_cao_tuoi: 4302,  nguoi_co_cong: null, nguoi_khuyet_tat: 680,  ho_ngheo: 343,  ho_can_ngheo: 274,  vung_kho_khan: null  },
];

async function main() {
  console.log('🌱 Seed chỉ tiêu vào database...\n');

  // Xóa toàn bộ benchmarks cũ
  const del = await prisma.benchmark.deleteMany({});
  console.log(`🗑️  Đã xóa ${del.count} chỉ tiêu cũ\n`);

  // Tạo mới
  let count = 0;
  for (const b of BENCHMARKS) {
    await prisma.benchmark.create({ data: b });
    count++;
    console.log(`${count.toString().padStart(2)}. ${b.don_vi}`);
  }

  console.log(`\n🎉 Hoàn thành! Đã seed ${count} chỉ tiêu vào database`);
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
