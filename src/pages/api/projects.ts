import type { APIRoute } from 'astro';
import pool, { initDatabase } from '@/lib/db';

export const ALL: APIRoute = async () => {
  return new Response('Method Not Allowed', { status: 405 });
};

export const GET: APIRoute = async () => {
  try {
    await initDatabase();
    const [rows]: any = await pool.query('SELECT * FROM projects ORDER BY is_featured DESC, id DESC');
    
    const projects = rows.map((r: any) => ({
      id: r.id,
      title: r.title,
      description: r.description,
      tags: typeof r.tags === 'string' ? JSON.parse(r.tags) : (r.tags || []),
      image: r.image,
      link: r.link,
      isFeatured: Boolean(r.is_featured)
    }));

    return new Response(JSON.stringify(projects), {
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
    const { title, description, tags, image, link, isFeatured } = body;

    const tagsJson = JSON.stringify(tags || []);
    const isFeaturedVal = isFeatured ? 1 : 0;

    if (isFeatured) {
      await pool.query('UPDATE projects SET is_featured = 0');
    }

    const [result]: any = await pool.query(
      'INSERT INTO projects (title, description, tags, image, link, is_featured) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, tagsJson, image || '/ponpes.png', link || '', isFeaturedVal]
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
    const { id, title, description, tags, image, link, isFeatured, toggleFeaturedOnly } = body;

    if (toggleFeaturedOnly) {
      await pool.query('UPDATE projects SET is_featured = 0');
      await pool.query('UPDATE projects SET is_featured = 1 WHERE id = ?', [id]);
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (isFeatured) {
      await pool.query('UPDATE projects SET is_featured = 0');
    }

    const tagsJson = JSON.stringify(tags || []);
    const isFeaturedVal = isFeatured ? 1 : 0;

    await pool.query(
      'UPDATE projects SET title = ?, description = ?, tags = ?, image = ?, link = ?, is_featured = ? WHERE id = ?',
      [title, description, tagsJson, image, link, isFeaturedVal, id]
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

    await pool.query('DELETE FROM projects WHERE id = ?', [id]);

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
