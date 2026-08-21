import { i as initDatabase, p as pool } from '../../chunks/db_C69qOCMq.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async () => {
  try {
    await initDatabase();
    const [rows] = await pool.query("SELECT * FROM education ORDER BY id ASC");
    const education = rows.map((r) => ({
      id: r.id,
      institution: r.institution,
      degree: r.degree,
      period: r.period,
      description: r.description,
      location: r.location,
      skills: typeof r.skills === "string" ? JSON.parse(r.skills) : r.skills || []
    }));
    return new Response(JSON.stringify(education), {
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
    const { institution, degree, period, description, location, skills } = body;
    const skillsJson = JSON.stringify(skills || []);
    const [result] = await pool.query(
      "INSERT INTO education (institution, degree, period, description, location, skills) VALUES (?, ?, ?, ?, ?, ?)",
      [institution, degree, period, description || "", location || "", skillsJson]
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
    const { id, institution, degree, period, description, location, skills } = body;
    const skillsJson = JSON.stringify(skills || []);
    await pool.query(
      "UPDATE education SET institution = ?, degree = ?, period = ?, description = ?, location = ?, skills = ? WHERE id = ?",
      [institution, degree, period, description || "", location || "", skillsJson, id]
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
    await pool.query("DELETE FROM education WHERE id = ?", [id]);
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
  DELETE,
  GET,
  POST,
  PUT
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
