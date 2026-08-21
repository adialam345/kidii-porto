import type { APIRoute } from 'astro';
import pool, { initDatabase } from '@/lib/db';

export const GET: APIRoute = async () => {
  try {
    await initDatabase();
    const [rows]: any = await pool.query('SELECT * FROM education ORDER BY id ASC');
    
    const education = rows.map((r: any) => ({
      id: r.id,
      institution: r.institution,
      degree: r.degree,
      period: r.period,
      description: r.description,
      location: r.location,
      skills: typeof r.skills === 'string' ? JSON.parse(r.skills) : (r.skills || [])
    }));

    return new Response(JSON.stringify(education), {
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
    const { institution, degree, period, description, location, skills } = body;

    const skillsJson = JSON.stringify(skills || []);

    const [result]: any = await pool.query(
      'INSERT INTO education (institution, degree, period, description, location, skills) VALUES (?, ?, ?, ?, ?, ?)',
      [institution, degree, period, description || '', location || '', skillsJson]
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
    const { id, institution, degree, period, description, location, skills } = body;

    const skillsJson = JSON.stringify(skills || []);

    await pool.query(
      'UPDATE education SET institution = ?, degree = ?, period = ?, description = ?, location = ?, skills = ? WHERE id = ?',
      [institution, degree, period, description || '', location || '', skillsJson, id]
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

    await pool.query('DELETE FROM education WHERE id = ?', [id]);

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
