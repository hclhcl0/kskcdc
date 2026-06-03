// lib/benchmarks.ts
// Dữ liệu chỉ tiêu dân số 7 nhóm đối tượng cho 93 xã/phường
// Nguồn: Google Sheets (đã làm sạch: xóa dấu phân cách ngàn)
// null  = chưa cập nhật (admin cần nhập thủ công)
// 0     = chưa xác nhận hoặc thực sự không có đối tượng này
// > 0   = chỉ tiêu hợp lệ

export interface UnitBenchmark {
  don_vi: string;
  nguoi_cao_tuoi: number | null;
  nguoi_khuyet_tat: number | null;
  ho_ngheo: number | null;
  ho_can_ngheo: number | null;
  nguoi_co_cong: number | null;
  vung_kho_khan: number | null;
  tre_em_duoi_6_tuoi: number | null;
}

// Dữ liệu gốc từ Google Sheets (đã làm sạch)
// Thứ tự cột: don_vi, cao_tuoi, khuyet_tat, ho_ngheo, ho_can_ngheo, co_cong, vung_kho, tre_em
const BENCHMARK_SEED: UnitBenchmark[] = [
  // ── Núi Thành / BV Việt - Hàn ──────────────────────────────
  { don_vi: 'Xã Núi Thành',          nguoi_cao_tuoi: 2060,  nguoi_khuyet_tat: 1800, ho_ngheo: 127,  ho_can_ngheo: 146,  nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: 458  },
  { don_vi: 'Xã Tam Mỹ',             nguoi_cao_tuoi: 2914,  nguoi_khuyet_tat: 555,  ho_ngheo: 151,  ho_can_ngheo: 165,  nguoi_co_cong: null,  vung_kho_khan: 1219,  tre_em_duoi_6_tuoi: 103  },
  { don_vi: 'Xã Tam Anh',            nguoi_cao_tuoi: 4604,  nguoi_khuyet_tat: 745,  ho_ngheo: 102,  ho_can_ngheo: 93,   nguoi_co_cong: 345,   vung_kho_khan: null,  tre_em_duoi_6_tuoi: 1515 },
  { don_vi: 'Xã Đức Phú',            nguoi_cao_tuoi: 1583,  nguoi_khuyet_tat: 344,  ho_ngheo: 121,  ho_can_ngheo: 53,   nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: 262  },
  { don_vi: 'Xã Tam Xuân',           nguoi_cao_tuoi: 1530,  nguoi_khuyet_tat: 1857, ho_ngheo: 153,  ho_can_ngheo: 94,   nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: 943  },
  { don_vi: 'Xã Tam Hải',            nguoi_cao_tuoi: null,  nguoi_khuyet_tat: null,  ho_ngheo: null, ho_can_ngheo: null, nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: null },

  // ── Tam Kỳ / TTYT Tam Kỳ ───────────────────────────────────
  { don_vi: 'Phường Tam Kỳ',         nguoi_cao_tuoi: 6811,  nguoi_khuyet_tat: 875,  ho_ngheo: 44,   ho_can_ngheo: 29,   nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: 972  },
  { don_vi: 'Phường Quảng Phú',      nguoi_cao_tuoi: 4217,  nguoi_khuyet_tat: 827,  ho_ngheo: 79,   ho_can_ngheo: 65,   nguoi_co_cong: 369,   vung_kho_khan: null,  tre_em_duoi_6_tuoi: 1127 },
  { don_vi: 'Phường Hương Trà',      nguoi_cao_tuoi: 4197,  nguoi_khuyet_tat: 1027, ho_ngheo: 26,   ho_can_ngheo: 15,   nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: 1226 },
  { don_vi: 'Phường Bàn Thạch',      nguoi_cao_tuoi: 3520,  nguoi_khuyet_tat: 861,  ho_ngheo: 96,   ho_can_ngheo: 52,   nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: 1673 },

  // ── Phú Ninh / TTYT Phú Ninh ───────────────────────────────
  { don_vi: 'Xã Tây Hồ',             nguoi_cao_tuoi: 6349,  nguoi_khuyet_tat: 1093, ho_ngheo: 237,  ho_can_ngheo: 263,  nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: 862  },
  { don_vi: 'Xã Chiên Đàn',          nguoi_cao_tuoi: null,  nguoi_khuyet_tat: null,  ho_ngheo: null, ho_can_ngheo: null, nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: null },
  { don_vi: 'Xã Phú Ninh',           nguoi_cao_tuoi: 4782,  nguoi_khuyet_tat: 752,  ho_ngheo: 138,  ho_can_ngheo: 261,  nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: 1346 },

  // ── Tiên Phước / TTYT Tiên Phước ───────────────────────────
  { don_vi: 'Xã Lãnh Ngọc',          nguoi_cao_tuoi: 3643,  nguoi_khuyet_tat: 1020, ho_ngheo: 335,  ho_can_ngheo: 424,  nguoi_co_cong: null,  vung_kho_khan: 2450,  tre_em_duoi_6_tuoi: 35   },
  { don_vi: 'Xã Tiên Phước',         nguoi_cao_tuoi: 4521,  nguoi_khuyet_tat: 962,  ho_ngheo: 272,  ho_can_ngheo: 274,  nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: 89   },
  { don_vi: 'Xã Thạnh Bình',         nguoi_cao_tuoi: 3643,  nguoi_khuyet_tat: 1020, ho_ngheo: 335,  ho_can_ngheo: 424,  nguoi_co_cong: null,  vung_kho_khan: 2450,  tre_em_duoi_6_tuoi: 35   },
  { don_vi: 'Xã Sơn Cẩm Hà',         nguoi_cao_tuoi: 1029,  nguoi_khuyet_tat: 718,  ho_ngheo: 161,  ho_can_ngheo: 191,  nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: 362  },

  // ── Bắc Trà My / TTYT Bắc Trà My ──────────────────────────
  { don_vi: 'Xã Trà Liên',           nguoi_cao_tuoi: 386,   nguoi_khuyet_tat: 122,  ho_ngheo: 1075, ho_can_ngheo: 164,  nguoi_co_cong: null,  vung_kho_khan: 5321,  tre_em_duoi_6_tuoi: 263  },
  { don_vi: 'Xã Trà Giáp',           nguoi_cao_tuoi: null,  nguoi_khuyet_tat: null,  ho_ngheo: null, ho_can_ngheo: null, nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: null },
  { don_vi: 'Xã Trà Tân',            nguoi_cao_tuoi: 546,   nguoi_khuyet_tat: 120,  ho_ngheo: 2179, ho_can_ngheo: 564,  nguoi_co_cong: null,  vung_kho_khan: 6348,  tre_em_duoi_6_tuoi: 347  },
  { don_vi: 'Xã Trà Đốc',            nguoi_cao_tuoi: 625,   nguoi_khuyet_tat: 127,  ho_ngheo: 4409, ho_can_ngheo: 0,    nguoi_co_cong: null,  vung_kho_khan: 10379, tre_em_duoi_6_tuoi: 607  },
  { don_vi: 'Xã Trà My',             nguoi_cao_tuoi: null,  nguoi_khuyet_tat: null,  ho_ngheo: null, ho_can_ngheo: null, nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: null },

  // ── Nam Trà My / TTYT Nam Trà My ───────────────────────────
  { don_vi: 'Xã Nam Trà My',         nguoi_cao_tuoi: 410,   nguoi_khuyet_tat: 169,  ho_ngheo: 447,  ho_can_ngheo: 342,  nguoi_co_cong: null,  vung_kho_khan: 2448,  tre_em_duoi_6_tuoi: 0    },
  { don_vi: 'Xã Trà Tập',            nguoi_cao_tuoi: null,  nguoi_khuyet_tat: null,  ho_ngheo: null, ho_can_ngheo: null, nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: null },
  { don_vi: 'Xã Trà Vân',            nguoi_cao_tuoi: 378,   nguoi_khuyet_tat: 67,   ho_ngheo: 2064, ho_can_ngheo: 0,    nguoi_co_cong: 54,    vung_kho_khan: 5407,  tre_em_duoi_6_tuoi: 297  },
  { don_vi: 'Xã Trà Linh',           nguoi_cao_tuoi: 784,   nguoi_khuyet_tat: 83,   ho_ngheo: 1158, ho_can_ngheo: null, nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: null },
  { don_vi: 'Xã Trà Leng',           nguoi_cao_tuoi: 218,   nguoi_khuyet_tat: 95,   ho_ngheo: 2398, ho_can_ngheo: 9,    nguoi_co_cong: null,  vung_kho_khan: 6447,  tre_em_duoi_6_tuoi: 392  },

  // ── Thăng Bình / TTYT Thăng Bình ───────────────────────────
  { don_vi: 'Xã Thăng Bình',         nguoi_cao_tuoi: 10431, nguoi_khuyet_tat: 1314, ho_ngheo: null, ho_can_ngheo: null, nguoi_co_cong: null,  vung_kho_khan: 0,     tre_em_duoi_6_tuoi: null },
  { don_vi: 'Xã Thăng An',           nguoi_cao_tuoi: 6970,  nguoi_khuyet_tat: 1081, ho_ngheo: 250,  ho_can_ngheo: 338,  nguoi_co_cong: null,  vung_kho_khan: 0,     tre_em_duoi_6_tuoi: 2630 },
  { don_vi: 'Xã Thăng Trường',       nguoi_cao_tuoi: 4057,  nguoi_khuyet_tat: 780,  ho_ngheo: 206,  ho_can_ngheo: 171,  nguoi_co_cong: null,  vung_kho_khan: 0,     tre_em_duoi_6_tuoi: 1204 },
  { don_vi: 'Xã Thăng Điền',         nguoi_cao_tuoi: null,  nguoi_khuyet_tat: null,  ho_ngheo: null, ho_can_ngheo: null, nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: null },
  { don_vi: 'Xã Thăng Phú',          nguoi_cao_tuoi: 2623,  nguoi_khuyet_tat: 504,  ho_ngheo: 175,  ho_can_ngheo: 188,  nguoi_co_cong: null,  vung_kho_khan: 0,     tre_em_duoi_6_tuoi: 2023 },
  { don_vi: 'Xã Đồng Dương',         nguoi_cao_tuoi: null,  nguoi_khuyet_tat: null,  ho_ngheo: null, ho_can_ngheo: null, nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: null },

  // ── Quế Sơn / TTYT Quế Sơn ─────────────────────────────────
  { don_vi: 'Xã Quế Sơn Trung',      nguoi_cao_tuoi: 5847,  nguoi_khuyet_tat: 1661, ho_ngheo: 495,  ho_can_ngheo: 369,  nguoi_co_cong: 1174,  vung_kho_khan: 0,     tre_em_duoi_6_tuoi: 640  },
  { don_vi: 'Xã Quế Sơn',            nguoi_cao_tuoi: 5115,  nguoi_khuyet_tat: null,  ho_ngheo: 509,  ho_can_ngheo: 573,  nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: 750  },
  { don_vi: 'Xã Xuân Phú',           nguoi_cao_tuoi: 7267,  nguoi_khuyet_tat: 2057, ho_ngheo: 127,  ho_can_ngheo: 143,  nguoi_co_cong: null,  vung_kho_khan: 0,     tre_em_duoi_6_tuoi: 715  },

  // ── Nông Sơn / TTYT Nông Sơn ───────────────────────────────
  { don_vi: 'Xã Nông Sơn',           nguoi_cao_tuoi: 740,   nguoi_khuyet_tat: 768,  ho_ngheo: 423,  ho_can_ngheo: 332,  nguoi_co_cong: 810,   vung_kho_khan: null,  tre_em_duoi_6_tuoi: 438  },
  { don_vi: 'Xã Quế Phước',          nguoi_cao_tuoi: 2375,  nguoi_khuyet_tat: 117,  ho_ngheo: 292,  ho_can_ngheo: 148,  nguoi_co_cong: null,  vung_kho_khan: 0,     tre_em_duoi_6_tuoi: 127  },

  // ── Duy Xuyên / TTYT Duy Xuyên ─────────────────────────────
  { don_vi: 'Xã Duy Nghĩa',          nguoi_cao_tuoi: 4704,  nguoi_khuyet_tat: 1006, ho_ngheo: 220,  ho_can_ngheo: 237,  nguoi_co_cong: null,  vung_kho_khan: 0,     tre_em_duoi_6_tuoi: 1562 },
  { don_vi: 'Xã Nam Phước',          nguoi_cao_tuoi: 7211,  nguoi_khuyet_tat: 1789, ho_ngheo: 276,  ho_can_ngheo: 247,  nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: 915  },
  { don_vi: 'Xã Duy Xuyên',          nguoi_cao_tuoi: 5741,  nguoi_khuyet_tat: 1060, ho_ngheo: 94,   ho_can_ngheo: 40,   nguoi_co_cong: null,  vung_kho_khan: 0,     tre_em_duoi_6_tuoi: 1421 },
  { don_vi: 'Xã Thu Bồn',            nguoi_cao_tuoi: 7262,  nguoi_khuyet_tat: 2332, ho_ngheo: 61,   ho_can_ngheo: 180,  nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: 345  },

  // ── Điện Bàn / BV Đa khoa Quảng Nam ────────────────────────
  { don_vi: 'Phường Điện Bàn',       nguoi_cao_tuoi: null,  nguoi_khuyet_tat: null,  ho_ngheo: null, ho_can_ngheo: null, nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: null },
  { don_vi: 'Phường Điện Bàn Đông',  nguoi_cao_tuoi: 11209, nguoi_khuyet_tat: 1414, ho_ngheo: 54,   ho_can_ngheo: 109,  nguoi_co_cong: null,  vung_kho_khan: 0,     tre_em_duoi_6_tuoi: 4450 },
  { don_vi: 'Phường An Thắng',       nguoi_cao_tuoi: null,  nguoi_khuyet_tat: null,  ho_ngheo: null, ho_can_ngheo: null, nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: null },
  { don_vi: 'Phường Điện Bàn Bắc',   nguoi_cao_tuoi: 6205,  nguoi_khuyet_tat: 858,  ho_ngheo: 51,   ho_can_ngheo: 97,   nguoi_co_cong: null,  vung_kho_khan: 0,     tre_em_duoi_6_tuoi: 300  },
  { don_vi: 'Xã Điện Bàn Tây',       nguoi_cao_tuoi: 1723,  nguoi_khuyet_tat: 1460, ho_ngheo: 105,  ho_can_ngheo: 269,  nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: 750  },
  { don_vi: 'Xã Gò Nổi',             nguoi_cao_tuoi: 1320,  nguoi_khuyet_tat: 900,  ho_ngheo: 84,   ho_can_ngheo: 129,  nguoi_co_cong: 519,   vung_kho_khan: null,  tre_em_duoi_6_tuoi: 2198 },

  // ── Hội An / TTYT Hội An ───────────────────────────────────
  { don_vi: 'Phường Hội An',         nguoi_cao_tuoi: 6811,  nguoi_khuyet_tat: 624,  ho_ngheo: 5,    ho_can_ngheo: 35,   nguoi_co_cong: 872,   vung_kho_khan: 0,     tre_em_duoi_6_tuoi: 1076 },
  { don_vi: 'Phường Hội An Đông',    nguoi_cao_tuoi: 5377,  nguoi_khuyet_tat: 605,  ho_ngheo: 17,   ho_can_ngheo: 25,   nguoi_co_cong: 1203,  vung_kho_khan: 0,     tre_em_duoi_6_tuoi: 1147 },
  { don_vi: 'Phường Hội An Tây',     nguoi_cao_tuoi: null,  nguoi_khuyet_tat: null,  ho_ngheo: null, ho_can_ngheo: null, nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: null },
  { don_vi: 'Xã Tân Hiệp',           nguoi_cao_tuoi: 311,   nguoi_khuyet_tat: 70,   ho_ngheo: 0,    ho_can_ngheo: 0,    nguoi_co_cong: null,  vung_kho_khan: 1956,  tre_em_duoi_6_tuoi: 0    },

  // ── Đại Lộc / BV ĐK miền núi phía Bắc ─────────────────────
  { don_vi: 'Xã Đại Lộc',            nguoi_cao_tuoi: 11869, nguoi_khuyet_tat: 3990, ho_ngheo: 45,   ho_can_ngheo: 124,  nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: 654  },
  { don_vi: 'Xã Hà Nha',             nguoi_cao_tuoi: 6934,  nguoi_khuyet_tat: 1269, ho_ngheo: 69,   ho_can_ngheo: 141,  nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: 489  },
  { don_vi: 'Xã Thượng Đức',         nguoi_cao_tuoi: null,  nguoi_khuyet_tat: null,  ho_ngheo: null, ho_can_ngheo: null, nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: null },
  { don_vi: 'Xã Vu Gia',             nguoi_cao_tuoi: 4917,  nguoi_khuyet_tat: 1047, ho_ngheo: 77,   ho_can_ngheo: 412,  nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: 247  },
  { don_vi: 'Xã Phú Thuận',          nguoi_cao_tuoi: 5206,  nguoi_khuyet_tat: 1160, ho_ngheo: 239,  ho_can_ngheo: 440,  nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: 726  },

  // ── Nam Giang / TTYT Nam Giang ──────────────────────────────
  { don_vi: 'Xã Thạnh Mỹ',           nguoi_cao_tuoi: null,  nguoi_khuyet_tat: null,  ho_ngheo: null, ho_can_ngheo: null, nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: null },
  { don_vi: 'Xã Bến Giằng',          nguoi_cao_tuoi: 659,   nguoi_khuyet_tat: 282,  ho_ngheo: 1992, ho_can_ngheo: 1482, nguoi_co_cong: null,  vung_kho_khan: 8122,  tre_em_duoi_6_tuoi: 225  },
  { don_vi: 'Xã Nam Giang',          nguoi_cao_tuoi: null,  nguoi_khuyet_tat: null,  ho_ngheo: null, ho_can_ngheo: null, nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: null },
  { don_vi: 'Xã Đắc Pring',          nguoi_cao_tuoi: null,  nguoi_khuyet_tat: 118,  ho_ngheo: 229,  ho_can_ngheo: 135,  nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: null },
  { don_vi: 'Xã La Dêê',             nguoi_cao_tuoi: 279,   nguoi_khuyet_tat: 65,   ho_ngheo: 212,  ho_can_ngheo: 210,  nguoi_co_cong: 55,    vung_kho_khan: 2910,  tre_em_duoi_6_tuoi: 80   },
  { don_vi: 'Xã La Êê',              nguoi_cao_tuoi: null,  nguoi_khuyet_tat: null,  ho_ngheo: null, ho_can_ngheo: null, nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: null },

  // ── Đông Giang / TTYT Đông Giang ───────────────────────────
  { don_vi: 'Xã Sông Vàng',          nguoi_cao_tuoi: 759,   nguoi_khuyet_tat: 154,  ho_ngheo: 567,  ho_can_ngheo: 983,  nguoi_co_cong: null,  vung_kho_khan: 2680,  tre_em_duoi_6_tuoi: 217  },
  { don_vi: 'Xã Sông Kôn',           nguoi_cao_tuoi: null,  nguoi_khuyet_tat: null,  ho_ngheo: null, ho_can_ngheo: null, nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: null },
  { don_vi: 'Xã Đông Giang',         nguoi_cao_tuoi: 836,   nguoi_khuyet_tat: 130,  ho_ngheo: 651,  ho_can_ngheo: 251,  nguoi_co_cong: null,  vung_kho_khan: 2593,  tre_em_duoi_6_tuoi: 723  },
  { don_vi: 'Xã Bến Hiên',           nguoi_cao_tuoi: 170,   nguoi_khuyet_tat: 87,   ho_ngheo: 1426, ho_can_ngheo: 549,  nguoi_co_cong: null,  vung_kho_khan: 2213,  tre_em_duoi_6_tuoi: 105  },

  // ── Tây Giang / TTYT Tây Giang ─────────────────────────────
  { don_vi: 'Xã Avương',             nguoi_cao_tuoi: null,  nguoi_khuyet_tat: null,  ho_ngheo: null, ho_can_ngheo: null, nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: null },
  { don_vi: 'Xã Tây Giang',          nguoi_cao_tuoi: null,  nguoi_khuyet_tat: 125,  ho_ngheo: null, ho_can_ngheo: null, nguoi_co_cong: null,  vung_kho_khan: 8780,  tre_em_duoi_6_tuoi: null },
  { don_vi: 'Xã Hùng Sơn',           nguoi_cao_tuoi: 277,   nguoi_khuyet_tat: 153,  ho_ngheo: 4324, ho_can_ngheo: 42,   nguoi_co_cong: null,  vung_kho_khan: 8026,  tre_em_duoi_6_tuoi: 0    },

  // ── Hiệp Đức / TTYT Hiệp Đức ───────────────────────────────
  { don_vi: 'Xã Hiệp Đức',           nguoi_cao_tuoi: 2467,  nguoi_khuyet_tat: 531,  ho_ngheo: 115,  ho_can_ngheo: 40,   nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: 397  },
  { don_vi: 'Xã Việt An',            nguoi_cao_tuoi: 959,   nguoi_khuyet_tat: 985,  ho_ngheo: 502,  ho_can_ngheo: 351,  nguoi_co_cong: 395,   vung_kho_khan: null,  tre_em_duoi_6_tuoi: 598  },

  // ── Phước Sơn / TTYT Phước Sơn ─────────────────────────────
  { don_vi: 'Xã Phước Trà',          nguoi_cao_tuoi: 468,   nguoi_khuyet_tat: 130,  ho_ngheo: 584,  ho_can_ngheo: 884,  nguoi_co_cong: null,  vung_kho_khan: 7010,  tre_em_duoi_6_tuoi: 205  },
  { don_vi: 'Xã Khâm Đức',           nguoi_cao_tuoi: null,  nguoi_khuyet_tat: null,  ho_ngheo: null, ho_can_ngheo: null, nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: null },
  { don_vi: 'Xã Phước Năng',         nguoi_cao_tuoi: 200,   nguoi_khuyet_tat: 0,    ho_ngheo: null, ho_can_ngheo: null, nguoi_co_cong: null,  vung_kho_khan: 6293,  tre_em_duoi_6_tuoi: 0    },
  { don_vi: 'Xã Phước Chánh',        nguoi_cao_tuoi: 203,   nguoi_khuyet_tat: 24,   ho_ngheo: 528,  ho_can_ngheo: 783,  nguoi_co_cong: null,  vung_kho_khan: 1166,  tre_em_duoi_6_tuoi: 102  },
  { don_vi: 'Xã Phước Thành',        nguoi_cao_tuoi: null,  nguoi_khuyet_tat: null,  ho_ngheo: null, ho_can_ngheo: null, nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: null },
  { don_vi: 'Xã Phước Hiệp',         nguoi_cao_tuoi: 345,   nguoi_khuyet_tat: 74,   ho_ngheo: 1116, ho_can_ngheo: 289,  nguoi_co_cong: null,  vung_kho_khan: 2459,  tre_em_duoi_6_tuoi: 251  },

  // ── Hải Châu / TTYT Hải Châu ───────────────────────────────
  { don_vi: 'Phường Hải Châu',       nguoi_cao_tuoi: null,  nguoi_khuyet_tat: null,  ho_ngheo: null, ho_can_ngheo: null, nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: null },
  { don_vi: 'Phường Hòa Cường',      nguoi_cao_tuoi: 13654, nguoi_khuyet_tat: 1586, ho_ngheo: 169,  ho_can_ngheo: 0,    nguoi_co_cong: null,  vung_kho_khan: 0,     tre_em_duoi_6_tuoi: 103  },

  // ── Sơn Trà / TTYT Sơn Trà ─────────────────────────────────
  { don_vi: 'Phường An Hải',         nguoi_cao_tuoi: 1362,  nguoi_khuyet_tat: 904,  ho_ngheo: null, ho_can_ngheo: 1458, nguoi_co_cong: null,  vung_kho_khan: 0,     tre_em_duoi_6_tuoi: 1505 },
  { don_vi: 'Phường Sơn Trà',        nguoi_cao_tuoi: 1264,  nguoi_khuyet_tat: 1200, ho_ngheo: 121,  ho_can_ngheo: 1705, nguoi_co_cong: null,  vung_kho_khan: 0,     tre_em_duoi_6_tuoi: 1860 },

  // ── Thanh Khê / TTYT Thanh Khê ─────────────────────────────
  { don_vi: 'Phường Thanh Khê',      nguoi_cao_tuoi: 2889,  nguoi_khuyet_tat: 4360, ho_ngheo: 1081, ho_can_ngheo: 501,  nguoi_co_cong: null,  vung_kho_khan: 0,     tre_em_duoi_6_tuoi: 946  },
  { don_vi: 'Phường An Khê',         nguoi_cao_tuoi: null,  nguoi_khuyet_tat: null,  ho_ngheo: null, ho_can_ngheo: null, nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: null },

  // ── Cẩm Lệ / TTYT Cẩm Lệ ──────────────────────────────────
  { don_vi: 'Phường Hòa Xuân',       nguoi_cao_tuoi: 11166, nguoi_khuyet_tat: 1146, ho_ngheo: 433,  ho_can_ngheo: 554,  nguoi_co_cong: null,  vung_kho_khan: 0,     tre_em_duoi_6_tuoi: 326  },
  { don_vi: 'Phường Cẩm Lệ',         nguoi_cao_tuoi: 8500,  nguoi_khuyet_tat: 987,  ho_ngheo: 185,  ho_can_ngheo: 254,  nguoi_co_cong: null,  vung_kho_khan: 0,     tre_em_duoi_6_tuoi: 1300 },

  // ── Ngũ Hành Sơn / TTYT Ngũ Hành Sơn ──────────────────────
  { don_vi: 'Phường Ngũ Hành Sơn',   nguoi_cao_tuoi: 12679, nguoi_khuyet_tat: 1471, ho_ngheo: 562,  ho_can_ngheo: 265,  nguoi_co_cong: 2289,  vung_kho_khan: 0,     tre_em_duoi_6_tuoi: 650  },

  // ── Liên Chiểu / TTYT Liên Chiểu ───────────────────────────
  { don_vi: 'Phường Hải Vân',        nguoi_cao_tuoi: null,  nguoi_khuyet_tat: null,  ho_ngheo: null, ho_can_ngheo: null, nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: null },
  { don_vi: 'Phường Hòa Khánh',      nguoi_cao_tuoi: 11529, nguoi_khuyet_tat: 1112, ho_ngheo: 461,  ho_can_ngheo: 404,  nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: null },
  { don_vi: 'Phường Liên Chiểu',     nguoi_cao_tuoi: 3906,  nguoi_khuyet_tat: 1674, ho_ngheo: 197,  ho_can_ngheo: 66,   nguoi_co_cong: null,  vung_kho_khan: 0,     tre_em_duoi_6_tuoi: null },

  // ── Hòa Vang / TTYT Hòa Vang ───────────────────────────────
  { don_vi: 'Xã Bà Nà',              nguoi_cao_tuoi: null,  nguoi_khuyet_tat: null,  ho_ngheo: null, ho_can_ngheo: null, nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: null },
  { don_vi: 'Xã Hòa Vang',           nguoi_cao_tuoi: 4166,  nguoi_khuyet_tat: 515,  ho_ngheo: 294,  ho_can_ngheo: 145,  nguoi_co_cong: null,  vung_kho_khan: 537,   tre_em_duoi_6_tuoi: 358  },
  { don_vi: 'Xã Hòa Tiến',           nguoi_cao_tuoi: 4302,  nguoi_khuyet_tat: 680,  ho_ngheo: 343,  ho_can_ngheo: 274,  nguoi_co_cong: null,  vung_kho_khan: null,  tre_em_duoi_6_tuoi: 377  },
];

// ─── Mutable in-memory store ─────────────────────────────────────────────────
let benchmarksStore: UnitBenchmark[] = BENCHMARK_SEED.map((b) => ({ ...b }));

export function getBenchmarks(): UnitBenchmark[] {
  return [...benchmarksStore];
}

export function getBenchmarkByUnit(don_vi: string): UnitBenchmark | undefined {
  return benchmarksStore.find((b) => b.don_vi === don_vi);
}

export function updateBenchmark(don_vi: string, updates: Partial<Omit<UnitBenchmark, 'don_vi'>>): UnitBenchmark | null {
  const idx = benchmarksStore.findIndex((b) => b.don_vi === don_vi);
  if (idx === -1) return null;
  benchmarksStore[idx] = { ...benchmarksStore[idx], ...updates };
  return benchmarksStore[idx];
}

// Helper: Kiểm tra đơn vị có ít nhất 1 chỉ tiêu hợp lệ không
export function hasBenchmarkData(b: UnitBenchmark): boolean {
  return (
    b.nguoi_cao_tuoi !== null ||
    b.nguoi_khuyet_tat !== null ||
    b.ho_ngheo !== null ||
    b.ho_can_ngheo !== null ||
    b.nguoi_co_cong !== null ||
    b.vung_kho_khan !== null ||
    b.tre_em_duoi_6_tuoi !== null
  );
}
