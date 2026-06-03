const fs = require('fs');
const path = require('path');

function searchInDir(dir, query) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') {
        searchInDir(fullPath, query);
      }
    } else {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes(query)) {
        console.log(`Found "${query}" in: ${fullPath}`);
      }
    }
  }
}

console.log("Searching for old username references...");
const root = 'd:/CDC/web/health-report-app';
searchInDir(path.join(root, 'app'), 'xa_');
searchInDir(path.join(root, 'app'), 'phuong_');
searchInDir(path.join(root, 'components'), 'xa_');
searchInDir(path.join(root, 'components'), 'phuong_');
searchInDir(path.join(root, 'lib'), 'xa_');
searchInDir(path.join(root, 'lib'), 'phuong_');
console.log("Done search.");
