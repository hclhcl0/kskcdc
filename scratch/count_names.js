const text = `Xã Tam Mỹ
Xã Tam Anh
Xã Đức Phú
Xã Tam Xuân
Xã Tam Hải
Phường Tam Kỳ
Phường Quảng Phú
Phường Hương Trà
Phường Bàn Thạch
Xã Tây Hồ
Xã Chiên Đàn
Xã Phú Ninh
Xã Thạnh Bình
Xã Tiên Phước
Xã Thạnh Bình
Xã Sơn Cẩm Hà
Xã Trà Liên
Xã Trà Giáp
Xã Trà Tân
Xã Trà Đốc
Xã Trà My
Xã Nam Trà My
Xã Trà Tập
Xã Trà Vân
Xã Trà Linh
Xã Trà Leng
Xã Thăng Bình
Xã Thăng An
Xã Thăng Trường
Xã Thăng Điền
Xã Thăng Phú
Xã Đồng Dương
Xã Quế Sơn Trung
Xã Quế Sơn
Xã Xuân Phú
Xã Nông Sơn
Xã Quế Phước
Xã Duy Nghĩa
Xã Nam Phước
Xã Duy Xuyên
Xã Thu Bồn
Phường Điện Bàn
Phường Điện Bàn Đông
Phường An Thắng
Phường Điện Bàn Bắc
Xã Điện Bàn Tây
Xã Gò Nổi
Phường Hội An
Phường Hội An Đông
Phường Hội An Tây
Xã Tân Hiệp
Xã Núi Thành
Xã Đại Lộc
Xã Hà Nha
Xã Thượng Đức
Xã Vu Gia
Xã Phú Thuận
Xã Thạnh Mỹ
Xã Bến Giằng
Xã Nam Giang
Xã Đắc Pring
Xã La Dêê
Xã La Êê
Xã Sông Vàng
Xã Sông Kôn
Xã Đông Giang
Xã Bến Hiên
Xã Avương
Xã Tây Giang
Xã Hùng Sơn
Xã Hiệp Đức
Xã Việt An
Xã Phước Trà
Xã Khâm Đức
Xã Phước Năng
Xã Phước Chánh
Xã Phước Thành
Xã Phước Hiệp
Phường Hải Châu
Phường Hòa Cường
Phường An Hải
Phường Sơn Trà
Phường Thanh Khê
Phường An Khê
Phường Hòa Xuân
Phường Cẩm Lệ
Phường Ngũ Hành Sơn
Phường Hải Vân
Phường Hòa Khánh
Phường Liên Chiểu
Xã Bà Nà
Xã Hòa Vang
Xã Hòa Tiến`;

const lines = text.split('\n').map(l => l.trim()).filter(Boolean);
console.log("Lines in text:", lines.length);

// Let's count duplicate display names
const counts = {};
lines.forEach(l => {
  counts[l] = (counts[l] || 0) + 1;
});

console.log("Duplicate display names in text:");
Object.keys(counts).forEach(k => {
  if (counts[k] > 1) {
    console.log(`- ${k}: ${counts[k]} times`);
  }
});
