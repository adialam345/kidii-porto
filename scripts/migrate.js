import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'portofolio',
  password: process.env.DB_PASSWORD || 'abcd5678',
  database: process.env.DB_NAME || 'portofolio',
  waitForConnections: true,
  connectionLimit: 5,
});

const projectsData = [
  {
    title: 'PONPES MIFTAHUL HUDA | WEBSITE',
    description: 'Pondok Pesantren Miftahul Huda: Sebuah sistem informasi berbasis web menggunakan Laravel untuk manajemen lembaga pendidikan. Fitur utama meliputi autentikasi berbasis peran, manajemen konten dinamis, pendaftaran siswa online, antarmuka responsif, dan arsitektur database yang efisien.',
    tags: JSON.stringify(['Laravel', 'Tailwind CSS', 'PHP', 'MySQL']),
    image: '/ponpes.png',
    link: 'https://github.com/adialam345/ponpes_miftahulhuda',
    is_featured: 1
  },
  {
    title: 'SISTOK GUDANG | MOBILE',
    description: 'Sisitok Gudang: Adalah aplikasi Android untuk memantau dan mengelola inventaris gudang secara real-time. Fitur utama mencakup pencatatan barang masuk/keluar, manajemen pemasok, autentikasi pengguna, dan sinkronisasi data melalui API dengan arsitektur MVVM dan basis data lokal.',
    tags: JSON.stringify(['Kotlin', 'Android SDK', 'SQLite', 'REST API']),
    image: '/apkgudang.png',
    link: 'https://github.com/adialam345/sistok_gudang',
    is_featured: 0
  },
  {
    title: 'MONITORING SENSOR | MOBILE',
    description: 'Monitoring Sensor: Sebuah aplikasi Android untuk memantau data sensor secara real-time menggunakan teknologi Internet of Things (IoT) dan Firebase Realtime Database. Fitur utama meliputi integrasi layanan Google dan antarmuka modern berbasis Material Design untuk tampilan yang intuitif dan responsif.',
    tags: JSON.stringify(['Kotlin', 'Firebase', 'IOT', 'Android']),
    image: '/sensoriot.png',
    link: 'https://github.com/adialam345/aplikasi-monitoring-sensor-IOT',
    is_featured: 0
  },
  {
    title: 'IOT SMART LAMP | WEBSITE',
    description: 'IoT Smart Lamp Monitoring & Control: Sebuah sistem IoT berbasis web untuk memantau dan mengontrol lampu secara real-time menggunakan Firebase Realtime Database. Fitur utama meliputi pemantauan status perangkat, mode otomatis dan manual, deteksi gerakan dengan sensor PIR, serta antarmuka web responsif untuk kendali lampu.',
    tags: JSON.stringify(['IOT', 'Firebase', 'JavaScript', 'HTML/CSS']),
    image: '/iotlampu.png',
    link: 'https://github.com/adialam345/iot-lampu',
    is_featured: 0
  },
  {
    title: 'ABSENSI PROJECT | WEBSITE',
    description: 'Sistem Absensi Digital: Sebuah aplikasi web untuk manajemen absensi karyawan dengan fitur canggih seperti deteksi lokasi dengan radius, foto selfie untuk verifikasi kehadiran, dan dashboard real-time. Dibangun menggunakan Laravel dan Tailwind CSS dengan fitur keamanan tinggi dan antarmuka yang user-friendly.',
    tags: JSON.stringify(['Laravel', 'Tailwind CSS', 'GPS', 'Camera API']),
    image: '/absensi.png',
    link: 'https://github.com/adialam345/absensi-notepro',
    is_featured: 0
  },
  {
    title: 'LAUNDRY SYSTEM | WEBSITE',
    description: 'Sistem Manajemen Laundry: Sebuah aplikasi web untuk pengelolaan transaksi laundry, manajemen pelanggan, pelacakan status cucian (proses, cuci, setrika, selesai), cetak nota/struk, dan laporan keuangan. Dibangun menggunakan Laravel dan Tailwind CSS dengan antarmuka yang responsif dan efisien.',
    tags: JSON.stringify(['Laravel', 'Tailwind CSS', 'MySQL', 'PHP']),
    image: '/laundry.png',
    link: 'https://github.com/adialam345/laundry',
    is_featured: 0
  }
];

const profileData = {
  id: 1,
  name: 'Adi Alam Sami Aji',
  role1: "I'm a",
  role2: 'FULL-STACK',
  role3: 'DEVELOPER & SOFTWARE ENGINEER',
  hero_bio: 'I am a student at Polytechnic State Madiun, majoring in Information Technology. I am currently learning to become a full-stack developer and software engineer, with skills in internet networking.',
  about_headline1: 'where',
  about_headline2: 'EXPERIENCE BUILDS CHARACTER',
  about_bio: 'I am an Information Technology student at Politeknik Negeri Madiun with experience in Laravel, PHP, JavaScript, React, Kotlin, Python, as well as interests in IoT and cybersecurity. I aim to become a skilled full-stack developer and software engineer while deepening my knowledge of networking, IoT, and secure system design. Through various projects, I’ve integrated Laravel with React and JavaScript, explored mobile app development with Kotlin, and built IoT-based solutions. My passion for technology drives me to keep learning and contribute to creating innovative and secure solutions.',
  profile_image: '/profile.jpg',
  cv_url: '/CV_Adi_Alam_Sami_Aji_1.pdf',
  github_url: 'https://github.com/adialam345',
  linkedin_url: 'https://www.linkedin.com/in/adi-alam-sami-aji-a62234334/',
  instagram_url: 'https://www.instagram.com/kidiepie_/',
  email: 'adialam347@gmail.com'
};

async function runMigration() {
  console.log('🚀 Starting MySQL Database Migration...');

  try {
    const connection = await pool.getConnection();

    // 1. Re-create projects table
    await connection.query(`DROP TABLE IF EXISTS projects`);
    await connection.query(`
      CREATE TABLE projects (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT NOT NULL,
        tags JSON,
        image VARCHAR(512) NOT NULL,
        link VARCHAR(512),
        is_featured TINYINT(1) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
    `);
    console.log('✅ Created table "projects"');

    // 2. Re-create profile table
    await connection.query(`DROP TABLE IF EXISTS profile`);
    await connection.query(`
      CREATE TABLE profile (
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
    console.log('✅ Created table "profile"');

    // 3. Insert Profile Data
    await connection.query(
      `INSERT INTO profile (
        id, name, role1, role2, role3, hero_bio, 
        about_headline1, about_headline2, about_bio, 
        profile_image, cv_url, github_url, linkedin_url, instagram_url, email
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        profileData.id, profileData.name, profileData.role1, profileData.role2, profileData.role3,
        profileData.hero_bio, profileData.about_headline1, profileData.about_headline2,
        profileData.about_bio, profileData.profile_image, profileData.cv_url,
        profileData.github_url, profileData.linkedin_url, profileData.instagram_url, profileData.email
      ]
    );
    console.log('✅ Inserted Profile Data into MySQL');

    // 4. Insert All Projects
    for (const p of projectsData) {
      await connection.query(
        `INSERT INTO projects (title, description, tags, image, link, is_featured) VALUES (?, ?, ?, ?, ?, ?)`,
        [p.title, p.description, p.tags, p.image, p.link, p.is_featured]
      );
      console.log(`  ➕ Migrated project: ${p.title}`);
    }

    connection.release();
    console.log('🎉 Migration completed successfully! All data is now live in MySQL.');
    process.exit(0);
  } catch (err) {
    console.error('❌ Migration failed:', err);
    process.exit(1);
  }
}

runMigration();
