import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || "portofolio",
  password: process.env.DB_PASSWORD || "abcd5678",
  database: process.env.DB_NAME || "portofolio",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});
let initialized = false;
async function initDatabase() {
  if (initialized) return;
  try {
    const connection = await pool.getConnection();
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
    }
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
        whatsapp_url VARCHAR(512),
        email VARCHAR(255)
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    try {
      await connection.query(`ALTER TABLE profile ADD COLUMN whatsapp_url VARCHAR(512) DEFAULT 'https://wa.me/6287823872633';`);
    } catch (e) {
    }
    const [profileRows] = await connection.query("SELECT COUNT(*) as count FROM profile");
    if (profileRows[0]?.count === 0) {
      await connection.query(`
        INSERT INTO profile (
          id, name, role1, role2, role3, hero_bio, 
          about_headline1, about_headline2, about_bio, 
          profile_image, cv_url, github_url, linkedin_url, instagram_url, whatsapp_url, email
        ) VALUES (
          1,
          'Adi Alam Sami Aji',
          'Teknik Informatika Student',
          'FULL-STACK DEVELOPER',
          '& SOFTWARE ENGINEER',
          'Saya adalah mahasiswa Teknik Informatika Politeknik Negeri Madiun yang berfokus menjadi Full-Stack Developer dan Software Engineer, dengan keahlian dalam pengembangan web/mobile, jaringan MikroTik, serta cybersecurity.',
          'where',
          'EXPERIENCE BUILDS CHARACTER',
          'Saya adalah mahasiswa D3 Teknik Informatika di Politeknik Negeri Madiun (2023–2026) dengan fondasi yang kuat dalam pengembangan aplikasi web & mobile (frontend dan backend), jaringan komputer, serta keamanan siber. Berpengalaman kerja sebagai IT & Network Engineer Intern di Amins Project Teknologi Indonesia dan Technical Support Intern di Notepro Teknikatama, mencakup konfigurasi router MikroTik, penataan infrastruktur jaringan, pengawasan sistem CCTV, serta pengembangan aplikasi web modern menggunakan Laravel, Node.js, Next.js, Python, Tailwind CSS, Firebase, dan Kotlin. Didukung oleh sertifikasi BNSP sebagai Junior Web Developer dan Junior Cyber Security, saya berkomitmen untuk menciptakan solusi perangkat lunak yang aman, responsif, dan inovatif.',
          '/profile.jpg',
          '/CV_Adi_Alam_Sami_Aji_1.pdf',
          'https://github.com/adialam345',
          'https://www.linkedin.com/in/adi-alam-sami-aji-a62234334/',
          'https://www.instagram.com/kidiepie_/',
          'https://wa.me/6287823872633',
          'adialam347@gmail.com'
        );
      `);
    }
    const [projectRows] = await connection.query("SELECT COUNT(*) as count FROM projects");
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
    await connection.query(`
      CREATE TABLE IF NOT EXISTS education (
        id INT AUTO_INCREMENT PRIMARY KEY,
        institution VARCHAR(255) NOT NULL,
        degree VARCHAR(255) NOT NULL,
        period VARCHAR(100) NOT NULL,
        description TEXT,
        location VARCHAR(255),
        skills JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    const [eduRows] = await connection.query("SELECT COUNT(*) as count FROM education");
    if (eduRows[0]?.count === 0) {
      await connection.query(
        `INSERT INTO education (institution, degree, period, description, location, skills) VALUES (?, ?, ?, ?, ?, ?)`,
        [
          "Politeknik Negeri Madiun",
          "D3 Teknik Informatika (Information Technology)",
          "2022 - Sekarang",
          "Fokus pada Software Engineering, Full-Stack Web Development (Laravel & React), Mobile App Development (Kotlin), Internet of Things (IoT), serta Computer Networking & Cybersecurity.",
          "Madiun, Jawa Timur",
          JSON.stringify(["Laravel", "React", "Kotlin", "Python", "IoT", "Cybersecurity", "MySQL", "Node.js"])
        ]
      );
    }
    await connection.query(`
      CREATE TABLE IF NOT EXISTS certificates (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        issuer VARCHAR(255) NOT NULL,
        issue_date VARCHAR(100) NOT NULL,
        credential_url VARCHAR(512),
        pdf_url VARCHAR(512),
        image VARCHAR(512),
        skills JSON,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    const [certRows] = await connection.query("SELECT COUNT(*) as count FROM certificates");
    if (certRows[0]?.count === 0) {
      const initialCerts = [
        {
          title: "Junior Web Developer",
          issuer: "Sertifikasi Kompetensi / BNSP",
          issueDate: "2024",
          skills: JSON.stringify(["Laravel", "React", "Node.js", "MySQL", "PHP", "Software Engineering"]),
          credentialUrl: "/junior-web-developer.pdf",
          pdfUrl: "/junior-web-developer.pdf",
          image: "/junior-web-developer.png"
        },
        {
          title: "Junior Cyber Security",
          issuer: "Sertifikasi Kompetensi / BNSP",
          issueDate: "2024",
          skills: JSON.stringify(["Networking", "Cyber Security", "Penetration Testing", "Security Audit"]),
          credentialUrl: "/junior-cyber-security.pdf",
          pdfUrl: "/junior-cyber-security.pdf",
          image: "/junior-cyber-security.png"
        },
        {
          title: "IoT & Mobile Application Development with Kotlin",
          issuer: "Politeknik Negeri Madiun",
          issueDate: "2023",
          skills: JSON.stringify(["Kotlin", "Firebase", "IoT Sensors", "Material Design"]),
          credentialUrl: "https://github.com/adialam345",
          pdfUrl: "",
          image: ""
        }
      ];
      for (const c of initialCerts) {
        await connection.query(
          `INSERT INTO certificates (title, issuer, issue_date, credential_url, pdf_url, image, skills) VALUES (?, ?, ?, ?, ?, ?, ?)`,
          [c.title, c.issuer, c.issueDate, c.credentialUrl, c.pdfUrl, c.image, c.skills]
        );
      }
    }
    connection.release();
    initialized = true;
  } catch (err) {
    console.error("❌ Failed to initialize MySQL Database:", err);
  }
}

export { initDatabase as i, pool as p };
