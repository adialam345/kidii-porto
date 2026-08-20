import type { APIRoute } from 'astro';
import pool from '@/lib/db';

export const POST: APIRoute = async () => {
  try {
    await pool.query('DROP TABLE IF EXISTS projects');
    await pool.query('DROP TABLE IF EXISTS profile');

    return new Response(JSON.stringify({ success: true, message: 'Database reset successfully' }), {
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
