import { useEffect, useState } from 'react';
import { projects as initialProjects } from '../components/global-project';

export interface ProjectItem {
  id: number;
  title: string;
  description: string;
  tags: string[];
  image: string;
  link: string;
  isFeatured?: boolean;
}

export interface ProfileData {
  name: string;
  role1: string;
  role2: string;
  role3: string;
  heroBio: string;
  aboutHeadline1: string;
  aboutHeadline2: string;
  aboutBio: string;
  profileImage: string;
  cvUrl: string;
  githubUrl: string;
  linkedinUrl: string;
  instagramUrl: string;
  whatsappUrl?: string;
  email: string;
}

export const initialProfileData: ProfileData = {
  name: "Adi Alam Sami Aji",
  role1: "I'm a",
  role2: "FULL-STACK",
  role3: "DEVELOPER & SOFTWARE ENGINEER",
  heroBio: "Saya adalah mahasiswa Teknik Informatika Politeknik Negeri Madiun yang berfokus menjadi Full-Stack Developer dan Software Engineer, dengan keahlian dalam pengembangan web/mobile, jaringan MikroTik, serta cybersecurity.",
  aboutHeadline1: "where",
  aboutHeadline2: "EXPERIENCE BUILDS CHARACTER",
  aboutBio: "Saya adalah mahasiswa D3 Teknik Informatika di Politeknik Negeri Madiun (2023–2026) dengan fondasi yang kuat dalam pengembangan aplikasi web & mobile (frontend dan backend), jaringan komputer, serta keamanan siber. Berpengalaman kerja sebagai IT & Network Engineer Intern di Amins Project Teknologi Indonesia dan Technical Support Intern di Notepro Teknikatama, mencakup konfigurasi router MikroTik, penataan infrastruktur jaringan, pengawasan sistem CCTV, serta pengembangan aplikasi web modern menggunakan Laravel, Node.js, Next.js, Python, Tailwind CSS, Firebase, dan Kotlin. Didukung oleh sertifikasi BNSP sebagai Junior Web Developer dan Junior Cyber Security, saya berkomitmen untuk menciptakan solusi perangkat lunak yang aman, responsif, dan inovatif.",
  profileImage: "/profile.webp",
  cvUrl: "/CV_Adi_Alam_Sami_Aji_1.pdf",
  githubUrl: "https://github.com/adialam345",
  linkedinUrl: "https://www.linkedin.com/in/adi-alam-sami-aji-a62234334/",
  instagramUrl: "https://www.instagram.com/kidiepie_/",
  whatsappUrl: "https://wa.me/6287823872633",
  email: "adialam347@gmail.com"
};

export interface EducationItem {
  id: number;
  institution: string;
  degree: string;
  period: string;
  description: string;
  location?: string;
  skills?: string[];
}

export interface CertificateItem {
  id: number;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl?: string;
  image?: string;
  pdfUrl?: string;
  skills?: string[];
}

export const initialEducation: EducationItem[] = [
  {
    id: 1,
    institution: "Politeknik Negeri Madiun",
    degree: "D3 Teknik Informatika (Information Technology)",
    period: "2022 - Sekarang",
    description: "Fokus pada Software Engineering, Full-Stack Web Development (Laravel & React), Mobile App Development (Kotlin), Internet of Things (IoT), serta Computer Networking & Cybersecurity.",
    location: "Madiun, Jawa Timur",
    skills: ["Laravel", "React", "Kotlin", "Python", "IoT", "Cybersecurity", "MySQL", "Node.js"]
  }
];

export const initialCertificates: CertificateItem[] = [
  {
    id: 1,
    title: "Junior Web Developer",
    issuer: "Sertifikasi Kompetensi / BNSP",
    issueDate: "2024",
    skills: ["Laravel", "React", "Node.js", "MySQL", "PHP", "Software Engineering"],
    credentialUrl: "/junior-web-developer.pdf",
    pdfUrl: "/junior-web-developer.pdf",
    image: "/junior-web-developer.webp"
  },
  {
    id: 2,
    title: "Junior Cyber Security",
    issuer: "Sertifikasi Kompetensi / BNSP",
    issueDate: "2024",
    skills: ["Networking", "Cyber Security", "Penetration Testing", "Security Audit"],
    credentialUrl: "/junior-cyber-security.pdf",
    pdfUrl: "/junior-cyber-security.pdf",
    image: "/junior-cyber-security.webp"
  },
  {
    id: 3,
    title: "IoT & Mobile Application Development with Kotlin",
    issuer: "Politeknik Negeri Madiun",
    issueDate: "2023",
    skills: ["Kotlin", "Firebase", "IoT Sensors", "Material Design"],
    credentialUrl: "https://github.com/adialam345"
  },
  {
    id: 4,
    title: "MikroTik Certified Network Associate (MTCNA)",
    issuer: "MikroTik Academy / PNM",
    issueDate: "2023",
    skills: ["MikroTik RouterOS", "Routing", "Subnetting", "Bandwidth Management", "Firewall"],
    credentialUrl: "https://github.com/adialam345"
  },
  {
    id: 5,
    title: "IT & Network Technical Support Specialist",
    issuer: "Notepro Teknikatama",
    issueDate: "2023",
    skills: ["Network Infrastructure", "CCTV Surveillance", "Troubleshooting", "Hardware Maintenance"],
    credentialUrl: "https://github.com/adialam345"
  }
];

const PROJECTS_KEY = 'portfolio_projects_data_v1';
const PROFILE_KEY = 'portfolio_profile_data_v1';
const EDUCATION_KEY = 'portfolio_education_data_v1';
const CERTIFICATES_KEY = 'portfolio_certificates_data_v1';
const ADMIN_AUTH_KEY = 'portfolio_admin_auth_v1';

export function getStoredProjects(): ProjectItem[] {
  if (typeof window === 'undefined') return initialProjects;
  try {
    const data = localStorage.getItem(PROJECTS_KEY);
    return data ? JSON.parse(data) : initialProjects;
  } catch (e) {
    return initialProjects;
  }
}

export async function fetchProjectsFromApi(): Promise<ProjectItem[]> {
  try {
    const res = await fetch('/api/projects');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        localStorage.setItem(PROJECTS_KEY, JSON.stringify(data));
        return data;
      }
    }
  } catch (err) {
    console.warn('Using local cache/defaults for projects:', err);
  }
  return getStoredProjects();
}

export function saveProjects(projects: ProjectItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PROJECTS_KEY, JSON.stringify(projects));
  window.dispatchEvent(new Event('portfolio-data-updated'));
}

export function getStoredProfile(): ProfileData {
  if (typeof window === 'undefined') return initialProfileData;
  try {
    const data = localStorage.getItem(PROFILE_KEY);
    return data ? JSON.parse(data) : initialProfileData;
  } catch (e) {
    return initialProfileData;
  }
}

export async function fetchProfileFromApi(): Promise<ProfileData> {
  try {
    const res = await fetch('/api/profile');
    if (res.ok) {
      const data = await res.json();
      if (data && data.role2) {
        localStorage.setItem(PROFILE_KEY, JSON.stringify(data));
        return data;
      }
    }
  } catch (err) {
    console.warn('Using local cache/defaults for profile:', err);
  }
  return getStoredProfile();
}

export function saveProfile(profile: ProfileData): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  window.dispatchEvent(new Event('portfolio-data-updated'));
}

export function getStoredEducation(): EducationItem[] {
  if (typeof window === 'undefined') return initialEducation;
  try {
    const data = localStorage.getItem(EDUCATION_KEY);
    return data ? JSON.parse(data) : initialEducation;
  } catch (e) {
    return initialEducation;
  }
}

export async function fetchEducationFromApi(): Promise<EducationItem[]> {
  try {
    const res = await fetch('/api/education');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        localStorage.setItem(EDUCATION_KEY, JSON.stringify(data));
        return data;
      }
    }
  } catch (err) {
    console.warn('Using local cache/defaults for education:', err);
  }
  return getStoredEducation();
}

export function saveEducation(education: EducationItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(EDUCATION_KEY, JSON.stringify(education));
  window.dispatchEvent(new Event('portfolio-data-updated'));
}

export function getStoredCertificates(): CertificateItem[] {
  if (typeof window === 'undefined') return initialCertificates;
  try {
    const data = localStorage.getItem(CERTIFICATES_KEY);
    if (!data) return initialCertificates;
    const parsed: CertificateItem[] = JSON.parse(data);
    const merged = [...parsed];
    for (const init of initialCertificates) {
      if (!merged.some(m => m.id === init.id || m.title.toLowerCase() === init.title.toLowerCase())) {
        merged.push(init);
      }
    }
    return merged.map((item) => {
      const match = initialCertificates.find((init) => init.id === item.id || init.title.toLowerCase() === item.title.toLowerCase());
      return {
        ...item,
        pdfUrl: item.pdfUrl || match?.pdfUrl,
        image: item.image || match?.image,
        credentialUrl: item.credentialUrl || match?.credentialUrl,
      };
    });
  } catch (e) {
    return initialCertificates;
  }
}

export async function fetchCertificatesFromApi(): Promise<CertificateItem[]> {
  try {
    const res = await fetch('/api/certificates');
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data) && data.length > 0) {
        localStorage.setItem(CERTIFICATES_KEY, JSON.stringify(data));
        return data;
      }
    }
  } catch (err) {
    console.warn('Using local cache/defaults for certificates:', err);
  }
  return getStoredCertificates();
}

export function saveCertificates(certificates: CertificateItem[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(CERTIFICATES_KEY, JSON.stringify(certificates));
  window.dispatchEvent(new Event('portfolio-data-updated'));
}

export function resetAllData(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(PROJECTS_KEY);
  localStorage.removeItem(PROFILE_KEY);
  localStorage.removeItem(EDUCATION_KEY);
  localStorage.removeItem(CERTIFICATES_KEY);
  window.dispatchEvent(new Event('portfolio-data-updated'));
}

export function isAdminAuthenticated(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(ADMIN_AUTH_KEY) === 'true';
}

export function setAdminAuthenticated(auth: boolean): void {
  if (typeof window === 'undefined') return;
  if (auth) {
    localStorage.setItem(ADMIN_AUTH_KEY, 'true');
  } else {
    localStorage.removeItem(ADMIN_AUTH_KEY);
  }
  window.dispatchEvent(new Event('portfolio-auth-updated'));
}

export function usePortfolioData() {
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(initialProjects);
  const [profile, setProfile] = useState<ProfileData>(initialProfileData);
  const [educationList, setEducationList] = useState<EducationItem[]>(initialEducation);
  const [certificatesList, setCertificatesList] = useState<CertificateItem[]>(initialCertificates);

  const refreshData = async () => {
    // 1. Instantly load cached/local
    setProjectsList(getStoredProjects());
    setProfile(getStoredProfile());
    setEducationList(getStoredEducation());
    setCertificatesList(getStoredCertificates());

    // 2. Fetch fresh data from MySQL API
    const freshProjects = await fetchProjectsFromApi();
    setProjectsList(freshProjects);

    const freshProfile = await fetchProfileFromApi();
    setProfile(freshProfile);

    const freshEdu = await fetchEducationFromApi();
    setEducationList(freshEdu);

    const freshCert = await fetchCertificatesFromApi();
    setCertificatesList(freshCert);
  };

  useEffect(() => {
    refreshData();

    const handleUpdate = () => refreshData();
    window.addEventListener('portfolio-data-updated', handleUpdate);
    return () => window.removeEventListener('portfolio-data-updated', handleUpdate);
  }, []);

  return { projectsList, profile, educationList, certificatesList, refreshData };
}
