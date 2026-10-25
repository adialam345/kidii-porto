import { i as initDatabase, p as pool } from '../../chunks/db__P03TGyt.mjs';
export { renderers } from '../../renderers.mjs';

const ALL = async () => {
  return new Response("Method Not Allowed", { status: 405 });
};
const GET = async () => {
  try {
    await initDatabase();
    const [rows] = await pool.query("SELECT * FROM projects ORDER BY display_order ASC, id DESC");
    const projects = rows.map((r) => ({
      id: r.id,
      title: r.title,
      description: r.description,
      tags: typeof r.tags === "string" ? JSON.parse(r.tags) : r.tags || [],
      image: r.image,
      link: r.link,
      isFeatured: Boolean(r.is_featured),
      displayOrder: r.display_order ?? 0
    }));
    return new Response(JSON.stringify(projects), {
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
const POST = async ({ request }) => {
  try {
    await initDatabase();
    const body = await request.json();
    const { title, description, tags, image, link, isFeatured, displayOrder } = body;
    const tagsJson = JSON.stringify(tags || []);
    const isFeaturedVal = isFeatured ? 1 : 0;
    if (isFeatured) {
      await pool.query("UPDATE projects SET is_featured = 0");
    }
    const [result] = await pool.query(
      "INSERT INTO projects (title, description, tags, image, link, is_featured, display_order) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [title, description, tagsJson, image || "/ponpes.png", link || "", isFeaturedVal, displayOrder ?? 0]
    );
    return new Response(JSON.stringify({ success: true, id: result.insertId }), {
      status: 201,
      headers: { "Content-Type": "application/json" }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
const PUT = async ({ request }) => {
  try {
    await initDatabase();
    const body = await request.json();
    if (body.reorder && Array.isArray(body.orders)) {
      for (const item of body.orders) {
        await pool.query("UPDATE projects SET display_order = ? WHERE id = ?", [item.displayOrder, item.id]);
      }
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    const { id, title, description, tags, image, link, isFeatured, toggleFeaturedOnly, displayOrder } = body;
    if (toggleFeaturedOnly) {
      await pool.query("UPDATE projects SET is_featured = 0");
      await pool.query("UPDATE projects SET is_featured = 1 WHERE id = ?", [id]);
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }
    if (isFeatured) {
      await pool.query("UPDATE projects SET is_featured = 0");
    }
    const tagsJson = JSON.stringify(tags || []);
    const isFeaturedVal = isFeatured ? 1 : 0;
    await pool.query(
      "UPDATE projects SET title = ?, description = ?, tags = ?, image = ?, link = ?, is_featured = ? WHERE id = ?",
      [title, description, tagsJson, image, link, isFeaturedVal, id]
    );
    return new Response(JSON.stringify({ success: true }), {
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
const DELETE = async ({ request }) => {
  try {
    await initDatabase();
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) {
      return new Response(JSON.stringify({ error: "Missing ID" }), { status: 400 });
    }
    await pool.query("DELETE FROM projects WHERE id = ?", [id]);
    return new Response(JSON.stringify({ success: true }), {
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
  ALL,
  DELETE,
  GET,
  POST,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
