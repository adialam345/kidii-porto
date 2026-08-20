import React, { useState, useEffect } from 'react';
import { 
  Plus, Edit, Trash2, Star, Save, RotateCcw, Download, Upload, 
  Lock, LogOut, ArrowLeft, CheckCircle2, ShieldCheck, LayoutGrid, 
  User, Link as LinkIcon, ExternalLink, Image as ImageIcon
} from 'lucide-react';
import { 
  ProjectItem, ProfileData, getStoredProjects, saveProjects, 
  getStoredProfile, saveProfile, resetAllData, 
  isAdminAuthenticated, setAdminAuthenticated 
} from '@/lib/portfolio-store';

export function AdminDashboard() {
  const [authenticated, setAuthenticated] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<'projects' | 'profile' | 'socials' | 'backup'>('projects');
  
  // Data State
  const [projectsList, setProjectsList] = useState<ProjectItem[]>([]);
  const [profile, setProfile] = useState<ProfileData>({
    name: '', role1: '', role2: '', role3: '', heroBio: '',
    aboutHeadline1: '', aboutHeadline2: '', aboutBio: '',
    profileImage: '', cvUrl: '', githubUrl: '', linkedinUrl: '',
    instagramUrl: '', email: ''
  });

  // Modal / Form state
  const [editingProject, setEditingProject] = useState<ProjectItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Form Fields for Project Modal
  const [projectForm, setProjectForm] = useState<Omit<ProjectItem, 'id'>>({
    title: '',
    description: '',
    tags: [],
    image: '',
    link: '',
    isFeatured: false
  });
  const [tagsInput, setTagsInput] = useState('');

  const handleFileUpload = async (file: File, onSuccess: (url: string) => void) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success && data.url) {
        onSuccess(data.url);
        showToast('File berhasil di-upload ke server!');
      } else {
        alert('Gagal mengunggah file: ' + (data.error || 'Unknown error'));
      }
    } catch (err: any) {
      alert('Terjadi kesalahan saat mengunggah file: ' + err.message);
    } finally {
      setUploading(false);
    }
  };


  useEffect(() => {
    setAuthenticated(isAdminAuthenticated());
    setProjectsList(getStoredProjects());
    setProfile(getStoredProfile());

    // Fetch from MySQL API
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => { if (Array.isArray(data)) setProjectsList(data); })
      .catch(() => {});

    fetch('/api/profile')
      .then(res => res.json())
      .then(data => { if (data && data.role2) setProfile(data); })
      .catch(() => {});
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (usernameInput === 'mrxnexsus' && passwordInput === 'abcd5678') {
      setAdminAuthenticated(true);
      setAuthenticated(true);
      setAuthError('');
      showToast('Selamat datang kembali, mrxnexsus!');
    } else {
      setAuthError('Username atau Password salah!');
    }
  };

  const handleLogout = () => {
    setAdminAuthenticated(false);
    setAuthenticated(false);
    showToast('Logged out successfully.');
  };

  // Projects CRUD
  const openNewProjectModal = () => {
    setEditingProject(null);
    setProjectForm({
      title: '',
      description: '',
      tags: ['React', 'Tailwind CSS'],
      image: '/ponpes.png',
      link: '',
      isFeatured: false
    });
    setTagsInput('React, Tailwind CSS');
    setIsModalOpen(true);
  };

  const openEditProjectModal = (proj: ProjectItem) => {
    setEditingProject(proj);
    setProjectForm({
      title: proj.title,
      description: proj.description,
      tags: proj.tags || [],
      image: proj.image,
      link: proj.link,
      isFeatured: !!proj.isFeatured
    });
    setTagsInput((proj.tags || []).join(', '));
    setIsModalOpen(true);
  };

  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const tagsArray = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    let updatedList: ProjectItem[];

    if (editingProject) {
      // Update local state
      updatedList = projectsList.map(p => {
        if (p.id === editingProject.id) {
          return {
            ...p,
            ...projectForm,
            tags: tagsArray
          };
        }
        return p;
      });

      // API Call MySQL
      try {
        await fetch('/api/projects', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: editingProject.id,
            ...projectForm,
            tags: tagsArray
          })
        });
      } catch (err) {}

      showToast('Project berhasil diperbarui di MySQL Database!');
    } else {
      // Create new API Call MySQL
      try {
        const res = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...projectForm,
            tags: tagsArray
          })
        });
        const data = await res.json();
        const newProj: ProjectItem = {
          id: data.id || Date.now(),
          ...projectForm,
          tags: tagsArray
        };
        updatedList = [newProj, ...projectsList];
      } catch (err) {
        const newId = projectsList.length > 0 ? Math.max(...projectsList.map(p => p.id)) + 1 : 1;
        const newProj: ProjectItem = {
          id: newId,
          ...projectForm,
          tags: tagsArray
        };
        updatedList = [newProj, ...projectsList];
      }

      showToast('Project baru berhasil ditambahkan ke MySQL Database!');
    }

    if (projectForm.isFeatured) {
      const featuredId = editingProject ? editingProject.id : updatedList[0].id;
      updatedList = updatedList.map(p => ({
        ...p,
        isFeatured: p.id === featuredId
      }));
    }

    setProjectsList(updatedList);
    saveProjects(updatedList);
    setIsModalOpen(false);
  };

  const handleDeleteProject = async (id: number) => {
    if (confirm('Apakah Anda yakin ingin menghapus project ini dari MySQL Database?')) {
      const updated = projectsList.filter(p => p.id !== id);
      setProjectsList(updated);
      saveProjects(updated);

      try {
        await fetch(`/api/projects?id=${id}`, { method: 'DELETE' });
      } catch (err) {}

      showToast('Project telah dihapus dari MySQL Database.');
    }
  };

  const handleToggleFeatured = async (id: number) => {
    const updated = projectsList.map(p => ({
      ...p,
      isFeatured: p.id === id
    }));
    setProjectsList(updated);
    saveProjects(updated);

    try {
      await fetch('/api/projects', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, toggleFeaturedOnly: true })
      });
    } catch (err) {}

    showToast('Featured project diperbarui!');
  };

  // Profile Save
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    saveProfile(profile);

    try {
      await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(profile)
      });
    } catch (err) {}

    showToast('Profil & Konten Website Berhasil Disimpan ke MySQL!');
  };

  // Reset Data
  const handleResetData = async () => {
    if (confirm('Apakah Anda yakin ingin mengembalikan semua data ke pengaturan awal (Reset)?')) {
      resetAllData();
      
      try {
        await fetch('/api/reset', { method: 'POST' });
        const resP = await fetch('/api/projects');
        const dataP = await resP.json();
        if (Array.isArray(dataP)) setProjectsList(dataP);

        const resProf = await fetch('/api/profile');
        const dataProf = await resProf.json();
        if (dataProf) setProfile(dataProf);
      } catch (err) {
        setProjectsList(getStoredProjects());
        setProfile(getStoredProfile());
      }

      showToast('Semua data berhasil di-reset di MySQL Database.');
    }
  };


  // Export JSON
  const handleExportData = () => {
    const backupObj = {
      projects: projectsList,
      profile: profile,
      exportedAt: new Date().toISOString()
    };
    const jsonString = `data:text/json;charset=utf-8,${encodeURIComponent(
      JSON.stringify(backupObj, null, 2)
    )}`;
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', jsonString);
    downloadAnchor.setAttribute('download', `portfolio_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Backup JSON berhasil diunduh!');
  };

  // Import JSON
  const handleImportData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader();
    if (e.target.files && e.target.files[0]) {
      fileReader.readAsText(e.target.files[0], "UTF-8");
      fileReader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.projects && parsed.profile) {
            saveProjects(parsed.projects);
            saveProfile(parsed.profile);
            setProjectsList(parsed.projects);
            setProfile(parsed.profile);
            showToast('Data berhasil di-import dari berkas JSON!');
          } else {
            alert('Format berkas JSON tidak valid.');
          }
        } catch (err) {
          alert('Gagal membaca berkas JSON.');
        }
      };
    }
  };

  // LOGIN SCREEN
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center px-4 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -top-20 -left-20"></div>
        <div className="absolute w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none -bottom-20 -right-20"></div>

        <div className="w-full max-w-md bg-neutral-900/80 border border-white/10 backdrop-blur-xl p-8 rounded-3xl shadow-2xl relative z-10">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white shadow-inner">
              <Lock className="w-8 h-8 text-neutral-200" />
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">Admin Dashboard</h1>
          <p className="text-sm text-neutral-400 text-center mb-8">Masukkan username & password untuk mengelola portofolio.</p>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Username Admin</label>
              <input
                type="text"
                required
                placeholder="Masukkan username"
                value={usernameInput}
                onChange={(e) => setUsernameInput(e.target.value)}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-neutral-400 uppercase tracking-wider mb-2">Password Admin</label>
              <input
                type="password"
                required
                placeholder="Masukkan password"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-neutral-500 focus:outline-none focus:border-white focus:ring-1 focus:ring-white transition-all text-sm font-mono"
              />
            </div>

            {authError && (
              <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-xs">
                {authError}
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-white text-black font-semibold py-3.5 rounded-xl hover:bg-neutral-200 active:scale-95 transition-all text-sm mt-2"
            >
              Masuk ke Admin Panel
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-white/10 flex justify-between items-center text-xs text-neutral-500">
            <a href="/" className="flex items-center gap-1 hover:text-white transition-colors">
              <ArrowLeft className="w-3.5 h-3.5" /> Kembali ke Website
            </a>
            <span>Portfolio CMS v1.0</span>
          </div>
        </div>
      </div>
    );
  }

  // MAIN DASHBOARD PANEL
  return (
    <div className="min-h-screen bg-black text-white selection:bg-white selection:text-black">
      {/* Toast Banner */}
      {toastMessage && (
        <div className="fixed top-6 right-6 z-50 bg-neutral-900 border border-white/20 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-4 duration-300">
          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
          <span className="text-sm font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Header Bar */}
      <header className="sticky top-0 z-40 border-b border-white/10 bg-black/80 backdrop-blur-md px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold flex items-center gap-2">
                Portfolio Admin Panel
                <span className="text-[10px] bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 px-2 py-0.5 rounded-full font-mono uppercase tracking-wider">Live CMS</span>
              </h1>
              <p className="text-xs text-neutral-400">Kelola Proyek & Konten Portofolio Anda secara Realtime</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <a 
              href="/" 
              className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/15 px-4 py-2 rounded-xl text-xs font-medium hover:bg-white/10 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" /> Lihat Live Site
            </a>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-2 rounded-xl text-xs font-medium hover:bg-red-500/20 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" /> Keluar
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 border-b border-white/10 scrollbar-none">
          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'projects'
                ? 'bg-white text-black font-semibold shadow-lg'
                : 'bg-white/5 border border-white/10 text-neutral-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <LayoutGrid className="w-4 h-4" /> Manajemen Proyek ({projectsList.length})
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'profile'
                ? 'bg-white text-black font-semibold shadow-lg'
                : 'bg-white/5 border border-white/10 text-neutral-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <User className="w-4 h-4" /> Teks & Profile
          </button>
          <button
            onClick={() => setActiveTab('socials')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'socials'
                ? 'bg-white text-black font-semibold shadow-lg'
                : 'bg-white/5 border border-white/10 text-neutral-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <LinkIcon className="w-4 h-4" /> Link & Kontak
          </button>
          <button
            onClick={() => setActiveTab('backup')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${
              activeTab === 'backup'
                ? 'bg-white text-black font-semibold shadow-lg'
                : 'bg-white/5 border border-white/10 text-neutral-400 hover:bg-white/10 hover:text-white'
            }`}
          >
            <Download className="w-4 h-4" /> Backup & Import
          </button>
        </div>

        {/* TAB 1: PROJECTS MANAGEMENT */}
        {activeTab === 'projects' && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl font-bold">Daftar Proyek Portofolio</h2>
                <p className="text-xs text-neutral-400">Tambah, ubah, atau hapus karya proyek portofolio Anda.</p>
              </div>
              <button
                onClick={openNewProjectModal}
                className="flex items-center justify-center gap-2 bg-white text-black font-semibold px-5 py-2.5 rounded-xl text-sm hover:bg-neutral-200 transition-all shadow-lg active:scale-95"
              >
                <Plus className="w-4 h-4" /> Tambah Proyek Baru
              </button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projectsList.map((proj) => (
                <div 
                  key={proj.id} 
                  className={`relative bg-neutral-900/60 border rounded-2xl p-5 flex flex-col justify-between transition-all duration-300 ${
                    proj.isFeatured ? 'border-amber-500/50 bg-amber-500/[0.03]' : 'border-white/10 hover:border-white/30'
                  }`}
                >
                  <div>
                    {/* Image Preview */}
                    <div className="relative h-44 rounded-xl overflow-hidden mb-4 border border-white/10 bg-neutral-950">
                      <img src={proj.image || '/ponpes.png'} alt={proj.title} className="w-full h-full object-cover" />
                      {proj.isFeatured && (
                        <div className="absolute top-3 left-3 bg-amber-500 text-black font-bold text-[10px] uppercase px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                          <Star className="w-3 h-3 fill-black" /> Featured Mockup
                        </div>
                      )}
                    </div>

                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-bold text-base line-clamp-1">{proj.title}</h3>
                    </div>

                    <p className="text-neutral-400 text-xs mb-4 line-clamp-3 leading-relaxed">{proj.description}</p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {proj.tags?.map((t, idx) => (
                        <span key={idx} className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded-md text-neutral-300">{t}</span>
                      ))}
                    </div>
                  </div>

                  {/* Actions Bar */}
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                    <button
                      onClick={() => handleToggleFeatured(proj.id)}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-colors flex items-center gap-1 ${
                        proj.isFeatured 
                          ? 'border-amber-500/40 text-amber-400 bg-amber-500/10' 
                          : 'border-white/10 text-neutral-400 hover:text-white hover:bg-white/5'
                      }`}
                      title="Tampilkan di Safari Mockup Utama"
                    >
                      <Star className={`w-3.5 h-3.5 ${proj.isFeatured ? 'fill-amber-400' : ''}`} />
                      {proj.isFeatured ? 'Featured' : 'Make Featured'}
                    </button>

                    <div className="flex gap-2">
                      <button
                        onClick={() => openEditProjectModal(proj)}
                        className="p-2 rounded-lg border border-white/10 text-neutral-300 hover:text-white hover:bg-white/10 transition-colors"
                        title="Edit Proyek"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteProject(proj.id)}
                        className="p-2 rounded-lg border border-red-500/20 text-red-400 hover:bg-red-500/20 transition-colors"
                        title="Hapus Proyek"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: PROFILE & HERO TEXT EDITOR */}
        {activeTab === 'profile' && (
          <form onSubmit={handleSaveProfile} className="max-w-4xl space-y-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-xl font-bold">Edit Profil & Teks Website</h2>
                <p className="text-xs text-neutral-400">Ubah judul hero, deskripsi, foto profil, dan headline tentang Anda.</p>
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-2.5 rounded-xl text-sm hover:bg-neutral-200 transition-all shadow-lg active:scale-95"
              >
                <Save className="w-4 h-4" /> Simpan Perubahan
              </button>
            </div>

            {/* Hero Section Card */}
            <div className="bg-neutral-900/60 border border-white/10 rounded-2xl p-6 space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 border-b border-white/5 pb-2">Bagian Hero (Halaman Depan)</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs text-neutral-400 mb-2 font-medium">Teks Baris 1 (Kecil/Italic)</label>
                  <input
                    type="text"
                    value={profile.role1}
                    onChange={e => setProfile({...profile, role1: e.target.value})}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-400 mb-2 font-medium">Teks Baris 2 (Bold Utama)</label>
                  <input
                    type="text"
                    value={profile.role2}
                    onChange={e => setProfile({...profile, role2: e.target.value})}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-400 mb-2 font-medium">Teks Baris 3 (Subtitle Bold)</label>
                  <input
                    type="text"
                    value={profile.role3}
                    onChange={e => setProfile({...profile, role3: e.target.value})}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-neutral-400 mb-2 font-medium">Deskripsi Singkat Hero</label>
                <textarea
                  rows={3}
                  value={profile.heroBio}
                  onChange={e => setProfile({...profile, heroBio: e.target.value})}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white leading-relaxed"
                />
              </div>
            </div>

            {/* About Section Card */}
            <div className="bg-neutral-900/60 border border-white/10 rounded-2xl p-6 space-y-6">
              <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-400 border-b border-white/5 pb-2">Bagian About Me</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-neutral-400 mb-2 font-medium">Headline 1 (Kecil/Italic)</label>
                  <input
                    type="text"
                    value={profile.aboutHeadline1}
                    onChange={e => setProfile({...profile, aboutHeadline1: e.target.value})}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-neutral-400 mb-2 font-medium">Headline 2 (Slogan Bold)</label>
                  <input
                    type="text"
                    value={profile.aboutHeadline2}
                    onChange={e => setProfile({...profile, aboutHeadline2: e.target.value})}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-neutral-400 mb-2 font-medium">Biografi Lengkap About Me</label>
                <textarea
                  rows={5}
                  value={profile.aboutBio}
                  onChange={e => setProfile({...profile, aboutBio: e.target.value})}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-white leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-400 mb-2 font-medium">Foto Profil (`/profile.jpg` atau Upload Gambar Baru)</label>
                <div className="flex gap-4 items-center">
                  <input
                    type="text"
                    value={profile.profileImage}
                    onChange={e => setProfile({...profile, profileImage: e.target.value})}
                    className="flex-1 bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white font-mono"
                  />
                  <input
                    type="file"
                    accept="image/*"
                    id="profile-photo-picker"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileUpload(e.target.files[0], (url) => setProfile(prev => ({ ...prev, profileImage: url })));
                      }
                    }}
                  />
                  <label
                    htmlFor="profile-photo-picker"
                    className="cursor-pointer bg-white/10 hover:bg-white/20 text-white px-3 py-2.5 rounded-xl text-xs flex items-center gap-1.5 border border-white/15 whitespace-nowrap transition-all active:scale-95"
                  >
                    <Upload className="w-4 h-4 text-blue-400" />
                    <span>Upload Foto</span>
                  </label>
                  <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/20 bg-neutral-950 flex-shrink-0">
                    <img src={profile.profileImage || '/profile.jpg'} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}

        {/* TAB 3: SOCIALS & CV LINKS */}
        {activeTab === 'socials' && (
          <form onSubmit={handleSaveProfile} className="max-w-3xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h2 className="text-xl font-bold">Link Sosial Media & CV</h2>
                <p className="text-xs text-neutral-400">Atur tautan akun sosial media dan file CV yang dapat diunduh pengujung.</p>
              </div>
              <button
                type="submit"
                className="flex items-center gap-2 bg-white text-black font-semibold px-6 py-2.5 rounded-xl text-sm hover:bg-neutral-200 transition-all shadow-lg active:scale-95"
              >
                <Save className="w-4 h-4" /> Simpan Perubahan
              </button>
            </div>

            <div className="bg-neutral-900/60 border border-white/10 rounded-2xl p-6 space-y-5">
              <div>
                <label className="block text-xs text-neutral-400 mb-2 font-medium">File Download CV (`/CV_Adi_Alam_Sami_Aji_1.pdf` atau Upload PDF Baru)</label>
                <div className="flex gap-3 items-center">
                  <input
                    type="text"
                    value={profile.cvUrl}
                    onChange={e => setProfile({...profile, cvUrl: e.target.value})}
                    className="flex-1 bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-white"
                  />
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    id="cv-file-picker"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        handleFileUpload(e.target.files[0], (url) => setProfile(prev => ({ ...prev, cvUrl: url })));
                      }
                    }}
                  />
                  <label
                    htmlFor="cv-file-picker"
                    className="cursor-pointer bg-white/10 hover:bg-white/20 text-white px-3 py-2.5 rounded-xl text-xs flex items-center gap-1.5 border border-white/15 whitespace-nowrap transition-all active:scale-95"
                  >
                    <Upload className="w-4 h-4 text-emerald-400" />
                    <span>Upload CV PDF</span>
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs text-neutral-400 mb-2 font-medium">URL GitHub</label>
                <input
                  type="text"
                  value={profile.githubUrl}
                  onChange={e => setProfile({...profile, githubUrl: e.target.value})}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-400 mb-2 font-medium">URL LinkedIn</label>
                <input
                  type="text"
                  value={profile.linkedinUrl}
                  onChange={e => setProfile({...profile, linkedinUrl: e.target.value})}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-400 mb-2 font-medium">URL Instagram</label>
                <input
                  type="text"
                  value={profile.instagramUrl}
                  onChange={e => setProfile({...profile, instagramUrl: e.target.value})}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-400 mb-2 font-medium">Alamat Email Contact</label>
                <input
                  type="email"
                  value={profile.email}
                  onChange={e => setProfile({...profile, email: e.target.value})}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-white"
                />
              </div>
            </div>
          </form>
        )}

        {/* TAB 4: BACKUP & IMPORT */}
        {activeTab === 'backup' && (
          <div className="max-w-3xl space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-xl font-bold">Backup & Restore Data CMS</h2>
              <p className="text-xs text-neutral-400">Simpan cadangan data portofolio dalam file JSON atau kembalikan data awal.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Export Card */}
              <div className="bg-neutral-900/60 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 mb-4">
                    <Download className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base mb-2">Export Backup JSON</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-6">Unduh semua data proyek dan profil yang telah Anda ubah menjadi file cadangan `.json`.</p>
                </div>
                <button
                  onClick={handleExportData}
                  className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:bg-neutral-200 transition-all text-xs flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" /> Export Data JSON
                </button>
              </div>

              {/* Import Card */}
              <div className="bg-neutral-900/60 border border-white/10 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4">
                    <Upload className="w-6 h-6" />
                  </div>
                  <h3 className="font-bold text-base mb-2">Import Data JSON</h3>
                  <p className="text-xs text-neutral-400 leading-relaxed mb-6">Unggah file cadangan JSON sebelumnya untuk memulihkan seluruh data portofolio.</p>
                </div>
                <label className="w-full bg-white/10 border border-white/20 text-white font-semibold py-3 rounded-xl hover:bg-white/20 transition-all text-xs flex items-center justify-center gap-2 cursor-pointer">
                  <Upload className="w-4 h-4" /> Pilih File JSON
                  <input type="file" accept=".json" onChange={handleImportData} className="hidden" />
                </label>
              </div>
            </div>

            {/* Reset Card */}
            <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6 mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-base text-red-400 mb-1">Reset All Data to Defaults</h3>
                <p className="text-xs text-neutral-400">Kembalikan semua proyek dan teks portofolio ke konfigurasi awal bawaan.</p>
              </div>
              <button
                onClick={handleResetData}
                className="bg-red-500 text-white font-semibold px-5 py-2.5 rounded-xl text-xs hover:bg-red-600 transition-colors flex items-center gap-2 whitespace-nowrap"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Reset Data Initial
              </button>
            </div>
          </div>
        )}
      </main>

      {/* PROJECT EDIT/ADD MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-neutral-900 border border-white/15 w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 my-8 animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold">
                {editingProject ? 'Edit Proyek' : 'Tambah Proyek Baru'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-neutral-400 hover:text-white text-sm px-3 py-1 rounded-lg border border-white/10"
              >
                Tutup
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div>
                <label className="block text-xs text-neutral-400 mb-1.5 font-medium">Judul Proyek</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: PONPES MIFTAHUL HUDA | WEBSITE"
                  value={projectForm.title}
                  onChange={e => setProjectForm({...projectForm, title: e.target.value})}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-xs text-neutral-400 mb-1.5 font-medium">Deskripsi Proyek</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Penjelasan fitur utama, arsitektur, dan kegunaan proyek..."
                  value={projectForm.description}
                  onChange={e => setProjectForm({...projectForm, description: e.target.value})}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-neutral-400 mb-1.5 font-medium">Gambar Proyek (Path atau Upload Gambar Baru)</label>
                  <div className="space-y-2">
                    <div className="flex gap-2">
                      <input
                        type="text"
                        required
                        placeholder="/ponpes.png"
                        value={projectForm.image}
                        onChange={e => setProjectForm({...projectForm, image: e.target.value})}
                        className="flex-1 bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-white"
                      />
                      <input
                        type="file"
                        accept="image/*"
                        id="project-image-picker"
                        className="hidden"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleFileUpload(e.target.files[0], (url) => setProjectForm(prev => ({ ...prev, image: url })));
                          }
                        }}
                      />
                      <label
                        htmlFor="project-image-picker"
                        className="cursor-pointer bg-white/10 hover:bg-white/20 text-white px-3 py-2.5 rounded-xl text-xs flex items-center gap-1.5 border border-white/15 whitespace-nowrap transition-all active:scale-95"
                      >
                        <Upload className="w-4 h-4 text-purple-400" />
                        <span>Upload</span>
                      </label>
                    </div>
                    {projectForm.image && (
                      <div className="h-20 w-full rounded-xl overflow-hidden border border-white/15 bg-neutral-950 relative">
                        <img src={projectForm.image} alt="Preview" className="w-full h-full object-cover" />
                        <span className="absolute bottom-1 right-2 bg-black/80 text-[10px] text-neutral-400 px-1.5 py-0.5 rounded">Preview</span>
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-neutral-400 mb-1.5 font-medium">Link Live Demo / GitHub Repo</label>
                  <input
                    type="text"
                    placeholder="https://github.com/..."
                    value={projectForm.link}
                    onChange={e => setProjectForm({...projectForm, link: e.target.value})}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white font-mono focus:outline-none focus:border-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-neutral-400 mb-1.5 font-medium">Tags (Pisahkan dengan koma)</label>
                <input
                  type="text"
                  placeholder="Laravel, Tailwind CSS, React"
                  value={tagsInput}
                  onChange={e => setTagsInput(e.target.value)}
                  className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white"
                />
              </div>

              <div className="pt-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={projectForm.isFeatured}
                    onChange={e => setProjectForm({...projectForm, isFeatured: e.target.checked})}
                    className="w-4 h-4 rounded bg-black border-white/20 text-white focus:ring-0"
                  />
                  <span className="text-xs text-neutral-300 font-medium">Tampilkan sebagai **Featured Safari Mockup Utama** di Halaman Depan</span>
                </label>
              </div>

              <div className="pt-4 border-t border-white/10 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-white/15 text-xs text-neutral-300 hover:text-white"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors"
                >
                  Simpan Proyek
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
