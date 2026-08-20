import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'portofolio',
  password: process.env.DB_PASSWORD || 'abcd5678',
  database: process.env.DB_NAME || 'portofolio',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

let initialized = false;

export async function initDatabase() {
  if (initialized) return;

  try {
    const connection = await pool.getConnection();
    
    // Create projects table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        tags JSON,
        image VARCHAR(512) NOT NULL,
        link VARCHAR(512),
        is_featured TINYINT(1) DEFAULT 0,
        display_order INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    try {
      await connection.query(`ALTER TABLE projects ADD COLUMN display_order INT DEFAULT 0`);
    } catch (e) {
      // Ignore if column already exists
    }

    // Create profile table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS profile (
        id INT PRIMARY KEY DEFAULT 1,
        name VARCHAR(255),
        role1 VARCHAR(255),
        role2 VARCHAR(255),
        role3 VARCHAR(255),
        hero_bio TEXT,
        about_headline1 VARCHAR(255),
        about_headline2 VARCHAR(255),
        about_bio TEXT,
        profile_image VARCHAR(512),
        cv_url VARCHAR(512),
        github_url VARCHAR(512),
        linkedin_url VARCHAR(512),
        instagram_url VARCHAR(512),
        email VARCHAR(255)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);

    // Check if initial profile exists
    const [profileRows]: any = await connection.query('SELECT COUNT(*) as count FROM profile');
    if (profileRows[0]?.count === 0) {
      await connection.query(`
        INSERT INTO profile (
          id, name, role1, role2, role3, hero_bio, 
          about_headline1, about_headline2, about_bio, 
          profile_image, cv_url, github_url, linkedin_url, instagram_url, email
        ) VALUES (
          1,
          'Adi Alam Sami Aji',
          'Teknik Informatika Student',
          'FULL-STACK DEVELOPER',
          '& SOFTWARE ENGINEER',
          'Information Technology student at Politeknik Negeri Madiun with experience in Laravel, PHP, JavaScript, React, Kotlin, Python, and IoT.',
          'where',
          'EXPERIENCE BUILDS CHARACTER',
          'I am an Information Technology student at Politeknik Negeri Madiun with experience in Laravel, PHP, JavaScript, React, Kotlin, Python, as well as interests in IoT and cybersecurity. I aim to become a skilled full-stack developer and software engineer while deepening my knowledge of networking, IoT, and secure system design. Through various projects, I’ve integrated Laravel with React and JavaScript, explored mobile app development with Kotlin, and built IoT-based solutions. My passion for technology drives me to keep learning and contribute to creating innovative and secure solutions.',
          '/profile.jpg',
          '/CV_Adi_Alam_Sami_Aji_1.pdf',
          'https://github.com/adialam345',
          'https://www.linkedin.com/in/adi-alam-sami-aji-a62234334/',
          'https://www.instagram.com/kidiepie_/',
          'adialam347@gmail.com'
        );
      `);
    }

    // Check if initial projects exist
    const [projectRows]: any = await connection.query('SELECT COUNT(*) as count FROM projects');
    if (projectRows[0]?.count === 0) {
      const initialProjects = [
        {
          title: "PONPES MIFTAHUL HUDA | WEBSITE",
          description: "Sebuah sistem informasi berbasis web menggunakan Laravel untuk manajemen lembaga pendidikan. Fitur utama meliputi autentikasi berbasis peran, manajemen konten dinamis, pendaftaran siswa online, antarmuka responsif, dan arsitektur database yang efisien.",
          tags: JSON.stringify(["Laravel", "PHP", "MySQL", "Tailwind CSS", "JavaScript"]),
          image: "/ponpes.png",
          link: "https://miftahulhudadoho.or.id/",
          is_featured: 1
        },
        {
          title: "Absensi NotePro App",
          description: "Aplikasi manajemen absensi dan catatan kehadiran berbasis mobile/web yang memfasilitasi pencatatan kehadiran karyawan dan pembuatan laporan absensi secara real-time.",
          tags: JSON.stringify(["React", "TypeScript", "Tailwind CSS", "Node.js"]),
          image: "/ponpes.png",
          link: "https://github.com/adialam345",
          is_featured: 0
        },
        {
          title: "Manajemen Laundry System",
          description: "Sistem informasi pengelolaan bisnis laundry dengan fitur pelacakan pesanan, cetak struk/invoice otomatis, manajemen pelanggan, dan laporan keuangan harian.",
          tags: JSON.stringify(["Laravel", "Bootstrap", "MySQL", "PHP"]),
          image: "/ponpes.png",
          link: "https://github.com/adialam345",
          is_featured: 0
        }
      ];

      for (const p of initialProjects) {
        await connection.query(
          `INSERT INTO projects (title, description, tags, image, link, is_featured) VALUES (?, ?, ?, ?, ?, ?)`,
          [p.title, p.description, p.tags, p.image, p.link, p.is_featured]
        );
      }
    }

    connection.release();
    initialized = true;
  } catch (err) {
    console.error("❌ Failed to initialize MySQL Database:", err);
  }
}

export default pool;
