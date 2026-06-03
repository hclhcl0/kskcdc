const fs = require('fs');
const pdfText = fs.readFileSync('d:/CDC/web/health-report-app/scratch/pdf_text.txt', 'utf8');

const lines = pdfText.split('\n');
let active = false;

console.log("Analyzing table lines for facilities mapping:");
for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (line.includes('STT Xã, phường') || line.includes('STT Xã, Phường')) {
    active = true;
    continue;
  }
  if (active && line.includes('Các đơn vị được phân công chủ động thu thập')) {
    active = false;
    break;
  }
  
  if (active) {
    if (line.match(/^\d+/) || line.includes('TTYT') || line.includes('Bệnh viện') || line.includes('BV')) {
      console.log(`${i+1}: ${line}`);
    }
  }
}
