import { i as initDatabase, p as pool } from '../../chunks/db__P03TGyt.mjs';
export { renderers } from '../../renderers.mjs';

const GET = async () => {
  try {
    await initDatabase();
    const [rows] = await pool.query("SELECT * FROM certificates ORDER BY id ASC");
    const certificates = rows.map((r) => ({
      id: r.id,
      title: r.title,
      issuer: r.issuer,
      issueDate: r.issue_date,
      credentialUrl: r.credential_url,
      pdfUrl: r.pdf_url,
      image: r.image,
      skills: typeof r.skills === "string" ? JSON.parse(r.skills) : r.skills || []
    }));
    return new Response(JSON.stringify(certificates), {
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
    const { title, issuer, issueDate, credentialUrl, pdfUrl, image, skills } = body;
    const skillsJson = JSON.stringify(skills || []);
    const [result] = await pool.query(
      "INSERT INTO certificates (title, issuer, issue_date, credential_url, pdf_url, image, skills) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [title, issuer, issueDate, credentialUrl || "", pdfUrl || "", image || "", skillsJson]
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
    const { id, title, issuer, issueDate, credentialUrl, pdfUrl, image, skills } = body;
    const skillsJson = JSON.stringify(skills || []);
    await pool.query(
      "UPDATE certificates SET title = ?, issuer = ?, issue_date = ?, credential_url = ?, pdf_url = ?, image = ?, skills = ? WHERE id = ?",
      [title, issuer, issueDate, credentialUrl || "", pdfUrl || "", image || "", skillsJson, id]
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
    await pool.query("DELETE FROM certificates WHERE id = ?", [id]);
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
