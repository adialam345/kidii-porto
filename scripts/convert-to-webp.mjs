import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const publicDir = path.join(process.cwd(), 'public');

async function run() {
  console.log("Converting large images to WebP...");
  const files = fs.readdirSync(publicDir);
  for (const file of files) {
    const ext = path.extname(file).toLowerCase();
    if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
      const fullPath = path.join(publicDir, file);
      const webpPath = path.join(publicDir, path.basename(file, ext) + '.webp');
      
      try {
        const metadata = await sharp(fullPath).metadata();
        let pipeline = sharp(fullPath);
        if (metadata.width && metadata.width > 1200) {
          pipeline = pipeline.resize({ width: 1200, fit: 'inside', withoutEnlargement: true });
        }
        const buffer = await pipeline.webp({ quality: 80 }).toBuffer();
        fs.writeFileSync(webpPath, buffer);
        
        const originalKB = (fs.statSync(fullPath).size / 1024).toFixed(1);
        const webpKB = (buffer.length / 1024).toFixed(1);
        console.log(`Converted ${file} -> ${path.basename(webpPath)}: ${originalKB} KB -> ${webpKB} KB`);
      } catch (e) {
        console.error(`Error converting ${file}:`, e.message);
      }
    }
  }
  console.log("WebP conversion complete!");
}

run();
