const fs = require('fs');
const mapping = {
  'BV Việt - Hàn Đà Nẵng': [
    'Xã Núi Thành',
    'Xã Tam Mỹ',
    'Xã Tam Anh',
    'Xã Đức Phú',
    'Xã Tam Xuân',
    'Xã Tam Hải'
  ],
  'TTYT khu vực Tam Kỳ': [
    'Phường Tam Kỳ',
    'Phường Quảng Phú',
    'Phường Hương Trà',
    'Phường Bàn Thạch'
  ],
  'TTYT khu vực Phú Ninh': [
    'Xã Tây Hồ',
    'Xã Chiên Đàn',
    'Xã Phú Ninh'
  ],
  'TTYT khu vực Tiên Phước': [
    'Xã Lãnh Ngọc',
    'Xã Tiên Phước',
    'Xã Thạnh Bình',
    'Xã Sơn Cẩm Hà'
  ],
  'TTYT khu vực Bắc Trà My': [
    'Xã Trà Liên',
    'Xã Trà Giáp',
    'Xã Trà Tân',
    'Xã Trà Đốc',
    'Xã Trà My'
  ],
  'TTYT khu vực Nam Trà My': [
    'Xã Nam Trà My',
    'Xã Trà Tập',
    'Xã Trà Vân',
    'Xã Trà Linh',
    'Xã Trà Leng'
  ],
  'TTYT khu vực Thăng Bình': [
    'Xã Thăng Bình',
    'Xã Thăng An',
    'Xã Thăng Trường',
    'Xã Thăng Điền',
    'Xã Thăng Phú',
    'Xã Đồng Dương'
  ],
  'TTYT khu vực Quế Sơn': [
    'Xã Quế Sơn Trung',
    'Xã Quế Sơn',
    'Xã Xuân Phú'
  ],
  'TTYT khu vực Nông Sơn': [
    'Xã Nông Sơn',
    'Xã Quế Phước'
  ],
  'TTYT khu vực Duy Xuyên': [
    'Xã Duy Nghĩa',
    'Xã Nam Phước',
    'Xã Duy Xuyên',
    'Xã Thu Bồn'
  ],
  'BV Đa khoa khu vực Quảng Nam': [
    'Phường Điện Bàn',
    'Phường Điện Bàn Đông',
    'Phường An Thắng',
    'Phường Điện Bàn Bắc',
    'Xã Điện Bàn Tây',
    'Xã Gò Nổi'
  ],
  'TTYT khu vực Hội An': [
    'Phường Hội An',
    'Phường Hội An Đông',
    'Phường Hội An Tây',
    'Xã Tân Hiệp'
  ],
  'BV Đa khoa khu vực miền núi phía Bắc Quảng Nam': [
    'Xã Đại Lộc',
    'Xã Hà Nha',
    'Xã Thượng Đức',
    'Xã Vu Gia',
    'Xã Phú Thuận'
  ],
  'TTYT khu vực Nam Giang': [
    'Xã Thạnh Mỹ',
    'Xã Bến Giằng',
    'Xã Nam Giang',
    'Xã Đắc Pring',
    'Xã La Dêê',
    'Xã La Êê'
  ],
  'TTYT khu vực Đông Giang': [
    'Xã Sông Vàng',
    'Xã Sông Kôn',
    'Xã Đông Giang',
    'Xã Bến Hiên'
  ],
  'TTYT khu vực Tây Giang': [
    'Xã Avương',
    'Xã Tây Giang',
    'Xã Hùng Sơn'
  ],
  'TTYT khu vực Hiệp Đức': [
    'Xã Hiệp Đức',
    'Xã Việt An'
  ],
  'TTYT khu vực Phước Sơn': [
    'Xã Phước Trà',
    'Xã Khâm Đức',
    'Xã Phước Năng',
    'Xã Phước Chánh',
    'Xã Phước Thành',
    'Xã Phước Hiệp'
  ],
  'TTYT khu vực Hải Châu': [
    'Phường Hải Châu',
    'Phường Hòa Cường'
  ],
  'TTYT khu vực Sơn Trà': [
    'Phường An Hải',
    'Phường Sơn Trà'
  ],
  'TTYT khu vực Thanh Khê': [
    'Phường Thanh Khê',
    'Phường An Khê'
  ],
  'TTYT khu vực Cẩm Lệ': [
    'Phường Hòa Xuân',
    'Phường Cẩm Lệ'
  ],
  'TTYT khu vực Ngũ Hành Sơn': [
    'Phường Ngũ Hành Sơn'
  ],
  'TTYT khu vực Liên Chiểu': [
    'Phường Hải Vân',
    'Phường Hòa Khánh',
    'Phường Liên Chiểu'
  ],
  'TTYT khu vực Hòa Vang': [
    'Xã Bà Nà',
    'Xã Hòa Vang',
    'Xã Hòa Tiến'
  ]
};

// Check if we have all 93 units mapped
const allUnits = [];
Object.values(mapping).forEach(list => {
  allUnits.push(...list);
});

console.log("Total units mapped:", allUnits.length);

// Generate facility list
const facilities = Object.keys(mapping).sort();
console.log("Distinct facilities count:", facilities.length);

// Let's create the unitToFacility mapping dictionary in JS
const unitToFacility = {};
for (const [facility, units] of Object.entries(mapping)) {
  for (const unit of units) {
    unitToFacility[unit] = facility;
  }
}

// Write the mapping structure to a JSON representation we can include in our code
const data = {
  facilities,
  unitToFacility
};

fs.writeFileSync('d:/CDC/web/health-report-app/scratch/dropdown_data.json', JSON.stringify(data, null, 2));
console.log("Saved dropdown data to scratch/dropdown_data.json");
