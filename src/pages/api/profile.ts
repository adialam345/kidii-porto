import type { APIRoute } from 'astro';
import pool, { initDatabase } from '@/lib/db';

export const GET: APIRoute = async () => {
  try {
    await initDatabase();
    const [rows]: any = await pool.query('SELECT * FROM profile WHERE id = 1');
    const r = rows[0] || {};

    const profile = {
      name: r.name || 'Adi Alam Sami Aji',
      role1: r.role1 || 'Teknik Informatika Student',
      role2: r.role2 || 'FULL-STACK DEVELOPER',
      role3: r.role3 || '& SOFTWARE ENGINEER',
      heroBio: r.hero_bio || '',
      aboutHeadline1: r.about_headline1 || 'where',
      aboutHeadline2: r.about_headline2 || 'EXPERIENCE BUILDS CHARACTER',
      aboutBio: r.about_bio || '',
      profileImage: r.profile_image || '/profile.jpg',
      cvUrl: r.cv_url || '/CV_Adi_Alam_Sami_Aji_1.pdf',
      githubUrl: r.github_url || 'https://github.com/adialam345',
      linkedinUrl: r.linkedin_url || 'https://www.linkedin.com/in/adi-alam-sami-aji-a62234334/',
      instagramUrl: r.instagram_url || 'https://www.instagram.com/kidiepie_/',
      email: r.email || 'adialam347@gmail.com'
    };

    return new Response(JSON.stringify(profile), {
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

export const PUT: APIRoute = async ({ request }) => {
  try {
    await initDatabase();
    const body = await request.json();
    const {
      name, role1, role2, role3, heroBio,
      aboutHeadline1, aboutHeadline2, aboutBio,
      profileImage, cvUrl, githubUrl, linkedinUrl, instagramUrl, email
    } = body;

    await pool.query(
      `UPDATE profile SET 
        name = ?, role1 = ?, role2 = ?, role3 = ?, hero_bio = ?,
        about_headline1 = ?, about_headline2 = ?, about_bio = ?,
        profile_image = ?, cv_url = ?, github_url = ?, linkedin_url = ?,
        instagram_url = ?, email = ?
       WHERE id = 1`,
      [
        name || 'Adi Alam Sami Aji',
        role1, role2, role3, heroBio,
        aboutHeadline1, aboutHeadline2, aboutBio,
        profileImage, cvUrl, githubUrl, linkedinUrl, instagramUrl, email
      ]
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
