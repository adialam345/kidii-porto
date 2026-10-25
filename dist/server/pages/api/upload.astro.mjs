import fs from 'fs';
import path from 'path';
export { renderers } from '../../renderers.mjs';

const POST = async ({ request }) => {
  try {
    const contentType = request.headers.get("content-type") || "";
    let fileName = "";
    let buffer;
    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file");
      if (!file) {
        return new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400 });
      }
      const bytes = await file.arrayBuffer();
      buffer = Buffer.from(bytes);
      const ext = path.extname(file.name) || ".png";
      const cleanName = path.basename(file.name, ext).replace(/[^a-zA-Z0-9_-]/g, "_");
      fileName = `${cleanName}_${Date.now()}${ext}`;
    } else {
      const body = await request.json();
      const { data, name } = body;
      if (!data) {
        return new Response(JSON.stringify({ error: "No data provided" }), { status: 400 });
      }
      const base64Data = data.replace(/^data:.*;base64,/, "");
      buffer = Buffer.from(base64Data, "base64");
      const ext = path.extname(name || "file.png") || ".png";
      const cleanName = path.basename(name || "file", ext).replace(/[^a-zA-Z0-9_-]/g, "_");
      fileName = `${cleanName}_${Date.now()}${ext}`;
    }
    const isDev = process.env.NODE_ENV === "development";
    const uploadsDir = isDev ? path.join(process.cwd(), "public", "uploads") : path.join(process.cwd(), "dist", "client", "uploads");
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    const filePath = path.join(uploadsDir, fileName);
    fs.writeFileSync(filePath, buffer);
    const publicUrl = `/uploads/${fileName}`;
    return new Response(JSON.stringify({ success: true, url: publicUrl }), {
      status: 200,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
