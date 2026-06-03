const fs = require('fs');

const pdfText = fs.readFileSync('d:/CDC/web/health-report-app/scratch/pdf_text.txt', 'utf8');
const lines = pdfText.split('\n');
let active = false;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i].trim();
  if (line.includes('STT Xã, phường') || line.includes('STT Xã, Phường')) {
    active = true;
    console.log(`--- TABLE START (line ${i+1}) ---`);
  }
  if (active && line.includes('Các đơn vị được phân công chủ động thu thập')) {
    active = false;
    console.log(`--- TABLE END (line ${i+1}) ---`);
    break;
  }
  
  if (active) {
    console.log(lines[i]);
  }
}
