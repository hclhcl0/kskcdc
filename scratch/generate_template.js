const XLSX = require('xlsx');
const fs = require('fs');

const data = [
  ['STT', 'Tên xã/phường', 'Trẻ em dưới 6 tuổi', 'Người cao tuổi', 'Người có công', 'Người khuyết tật', 'Hộ nghèo', 'Hộ cận nghèo', 'Vùng khó khăn/DTTS'],
  [1, 'Phường Hòa Cường Bắc', 500, 1200, 50, 100, 20, 40, 0],
  [2, 'Phường Hải Châu I', 300, 800, 30, 80, 10, 25, 0],
];

const ws = XLSX.utils.aoa_to_sheet(data);

// Define column widths for better UX
ws['!cols'] = [
  { wch: 5 }, // STT
  { wch: 25 }, // Tên xã/phường
  { wch: 20 },
  { wch: 15 },
  { wch: 15 },
  { wch: 15 },
  { wch: 10 },
  { wch: 15 },
  { wch: 20 },
];

const wb = XLSX.utils.book_new();
XLSX.utils.book_append_sheet(wb, ws, "Chi Tieu");

XLSX.writeFile(wb, 'd:/CDC/web/health-report-app/public/templates/mau_chi_tieu.xlsx');
console.log('Done!');
