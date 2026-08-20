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
  email: string;
}

export const initialProfileData: ProfileData = {
  name: "Adi Alam Sami Aji",
  role1: "I'm a",
  role2: "FULL-STACK",
  role3: "DEVELOPER & SOFTWARE ENGINEER",
  heroBio: "I am a student at Polytechnic State Madiun, majoring in Information Technology. I am currently learning to become a full-stack developer and software engineer, with skills in internet networking.",
  aboutHeadline1: "where",
  aboutHeadline2: "EXPERIENCE BUILDS CHARACTER",
  aboutBio: "I am an Information Technology student at Politeknik Negeri Madiun with experience in Laravel, PHP, JavaScript, React, Kotlin, Python, as well as interests in IoT and cybersecurity. I aim to become a skilled full-stack developer and software engineer while deepening my knowledge of networking, IoT, and secure system design. Through various projects, I've integrated Laravel with React and JavaScript, explored mobile app development with Kotlin, and built IoT-based solutions. My passion for technology drives me to keep learning and contribute to creating innovative and secure solutions.",
  profileImage: "/profile.jpg",
  cvUrl: "/CV_Adi_Alam_Sami_Aji_1.pdf",
  githubUrl: "https://github.com/adialam345",
  linkedinUrl: "https://www.linkedin.com/in/adi-alam-sami-aji-a62234334/",
  instagramUrl: "https://www.instagram.com/kidiepie_/",
  email: "adialam347@gmail.com"
};

const PROJECTS_KEY = 'portfolio_projects_data_v1';
const PROFILE_KEY = 'portfolio_profile_data_v1';
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

export function resetAllData(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(PROJECTS_KEY);
  localStorage.removeItem(PROFILE_KEY);
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

  const refreshData = async () => {
    // 1. Instantly load cached/local
    setProjectsList(getStoredProjects());
    setProfile(getStoredProfile());

    // 2. Fetch fresh data from MySQL API
    const freshProjects = await fetchProjectsFromApi();
    setProjectsList(freshProjects);

    const freshProfile = await fetchProfileFromApi();
    setProfile(freshProfile);
  };

  useEffect(() => {
    refreshData();

    const handleUpdate = () => refreshData();
    window.addEventListener('portfolio-data-updated', handleUpdate);
    return () => window.removeEventListener('portfolio-data-updated', handleUpdate);
  }, []);

  return { projectsList, profile };
}
