const fs = require('fs');
const path = require('path');

const srcDir = 'D:\\OrbitAvayana\\design\\Stickers';
const destDir = 'D:\\OrbitAvayana\\carrer nova\\CareerNova-AI-main\\src\\assets\\stickers';

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

const files = fs.readdirSync(srcDir);
files.forEach(file => {
  const srcFile = path.join(srcDir, file);
  const destFile = path.join(destDir, file);
  fs.copyFileSync(srcFile, destFile);
  console.log(`Copied ${file}`);
});
console.log('Sticker copy complete.');
