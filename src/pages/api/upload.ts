import type { APIRoute } from 'astro';
import fs from 'fs';
import path from 'path';

export const POST: APIRoute = async ({ request }) => {
  try {
    const contentType = request.headers.get('content-type') || '';
    
    let fileName = '';
    let buffer: Buffer;

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      const file = formData.get('file') as File;
      if (!file) {
        return new Response(JSON.stringify({ error: 'No file uploaded' }), { status: 400 });
      }

      const bytes = await file.arrayBuffer();
      buffer = Buffer.from(bytes);
      const ext = path.extname(file.name) || '.png';
      const cleanName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, '_');
      fileName = `${cleanName}_${Date.now()}${ext}`;
    } else {
      const body = await request.json();
      const { data, name } = body;
      if (!data) {
        return new Response(JSON.stringify({ error: 'No data provided' }), { status: 400 });
      }

      const base64Data = data.replace(/^data:.*;base64,/, '');
      buffer = Buffer.from(base64Data, 'base64');
      const ext = path.extname(name || 'file.png') || '.png';
      const cleanName = path.basename(name || 'file', ext).replace(/[^a-zA-Z0-9_-]/g, '_');
      fileName = `${cleanName}_${Date.now()}${ext}`;
    }

    // Save to both public/uploads (permanent source) and dist/client/uploads (runtime serving)
    const publicUploads = path.join(process.cwd(), 'public', 'uploads');
    const distUploads = path.join(process.cwd(), 'dist', 'client', 'uploads');

    if (!fs.existsSync(publicUploads)) {
      fs.mkdirSync(publicUploads, { recursive: true });
    }
    if (!fs.existsSync(distUploads)) {
      fs.mkdirSync(distUploads, { recursive: true });
    }

    fs.writeFileSync(path.join(publicUploads, fileName), buffer);
    fs.writeFileSync(path.join(distUploads, fileName), buffer);

    const publicUrl = `/uploads/${fileName}`;

    return new Response(JSON.stringify({ success: true, url: publicUrl }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
