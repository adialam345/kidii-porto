import { p as pool } from '../../chunks/db_CsAmH3aQ.mjs';
export { renderers } from '../../renderers.mjs';

const POST = async () => {
  try {
    await pool.query("DROP TABLE IF EXISTS projects");
    await pool.query("DROP TABLE IF EXISTS profile");
    return new Response(JSON.stringify({ success: true, message: "Database reset successfully" }), {
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
