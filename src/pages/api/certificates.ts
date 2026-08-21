import type { APIRoute } from 'astro';
import pool, { initDatabase } from '@/lib/db';

export const GET: APIRoute = async () => {
  try {
    await initDatabase();
    const [rows]: any = await pool.query('SELECT * FROM certificates ORDER BY id ASC');
    
    const certificates = rows.map((r: any) => ({
      id: r.id,
      title: r.title,
      issuer: r.issuer,
      issueDate: r.issue_date,
      credentialUrl: r.credential_url,
      pdfUrl: r.pdf_url,
      image: r.image,
      skills: typeof r.skills === 'string' ? JSON.parse(r.skills) : (r.skills || [])
    }));

    return new Response(JSON.stringify(certificates), {
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

export const POST: APIRoute = async ({ request }) => {
  try {
    await initDatabase();
    const body = await request.json();
    const { title, issuer, issueDate, credentialUrl, pdfUrl, image, skills } = body;

    const skillsJson = JSON.stringify(skills || []);

    const [result]: any = await pool.query(
      'INSERT INTO certificates (title, issuer, issue_date, credential_url, pdf_url, image, skills) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [title, issuer, issueDate, credentialUrl || '', pdfUrl || '', image || '', skillsJson]
    );

    return new Response(JSON.stringify({ success: true, id: result.insertId }), {
      status: 201,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

export const PUT: APIRoute = async ({ request }) => {
  try {
    await initDatabase();
    const body = await request.json();
    const { id, title, issuer, issueDate, credentialUrl, pdfUrl, image, skills } = body;

    const skillsJson = JSON.stringify(skills || []);

    await pool.query(
      'UPDATE certificates SET title = ?, issuer = ?, issue_date = ?, credential_url = ?, pdf_url = ?, image = ?, skills = ? WHERE id = ?',
      [title, issuer, issueDate, credentialUrl || '', pdfUrl || '', image || '', skillsJson, id]
    );

    return new Response(JSON.stringify({ success: true }), {
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

export const DELETE: APIRoute = async ({ request }) => {
  try {
    await initDatabase();
    const url = new URL(request.url);
    const id = url.searchParams.get('id');

    if (!id) {
      return new Response(JSON.stringify({ error: 'Missing ID' }), { status: 400 });
    }

    await pool.query('DELETE FROM certificates WHERE id = ?', [id]);

    return new Response(JSON.stringify({ success: true }), {
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
