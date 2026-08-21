import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dirsToScan = [
  path.join(process.cwd(), 'public'),
  path.join(process.cwd(), 'public', 'uploads'),
];

async function compressImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  if (!['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) return;

  const statBefore = fs.statSync(filePath);
  const sizeBeforeMB = (statBefore.size / (1024 * 1024)).toFixed(2);

  try {
    const metadata = await sharp(filePath).metadata();
    let pipeline = sharp(filePath);

    // Resize if width > 1400px
    if (metadata.width && metadata.width > 1400) {
      pipeline = pipeline.resize({ width: 1400, fit: 'inside', withoutEnlargement: true });
    }

    let buffer;
    if (ext === '.png') {
      buffer = await pipeline.png({ quality: 80, compressionLevel: 9, palette: true }).toBuffer();
    } else if (ext === '.jpg' || ext === '.jpeg') {
      buffer = await pipeline.jpeg({ quality: 80, mozjpeg: true }).toBuffer();
    } else if (ext === '.webp') {
      buffer = await pipeline.webp({ quality: 80 }).toBuffer();
    }

    if (buffer && buffer.length < statBefore.size) {
      fs.writeFileSync(filePath, buffer);
      const statAfter = fs.statSync(filePath);
      const sizeAfterKB = (statAfter.size / 1024).toFixed(1);
      console.log(`Compressed: ${path.basename(filePath)} | ${sizeBeforeMB} MB -> ${sizeAfterKB} KB (Saved ${((1 - statAfter.size / statBefore.size) * 100).toFixed(1)}%)`);
    } else {
      console.log(`Skipped (already small): ${path.basename(filePath)}`);
    }
  } catch (err) {
    console.error(`Error compressing ${filePath}:`, err.message);
  }
}

async function run() {
  console.log("Starting image compression...");
  for (const dir of dirsToScan) {
    if (!fs.existsSync(dir)) continue;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fs.statSync(fullPath).isFile()) {
        await compressImage(fullPath);
      }
    }
  }
  console.log("Image compression complete!");
}

run();
