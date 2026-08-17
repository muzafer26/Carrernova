import fs from "node:fs";
import path from "node:path";

const srcDir = "D:\\OrbitAvayana\\design\\Stickers";
const destDir = path.resolve(process.cwd(), "src/assets/stickers");

if (!fs.existsSync(destDir)) {
  fs.mkdirSync(destDir, { recursive: true });
}

if (fs.existsSync(srcDir)) {
  const files = fs.readdirSync(srcDir);
  files.forEach((file) => {
    const srcFile = path.join(srcDir, file);
    const destFile = path.join(destDir, file);
    fs.copyFileSync(srcFile, destFile);
    console.log(`Copied ${file}`);
  });
  console.log("Sticker copy complete.");
} else {
  console.log("Source sticker directory not found, checking existing destination assets.");
}
