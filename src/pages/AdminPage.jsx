import React, { useState, useEffect, useMemo } from "react";
import { Plus, Award, Building, Calendar, Tag, Link as LinkIcon, UploadCloud, AlertCircle, LayoutDashboard, Briefcase, Trash2, X, Github, Monitor, Edit2, Search, Filter, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "../lib/supabaseClient";

export const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("certificates"); 
  
  // ================= SEARCH & FILTER STATE =================
  const [certSearch, setCertSearch] = useState("");
  const [certFilterCat, setCertFilterCat] = useState("All");
  const [projSearch, setProjSearch] = useState("");
  const [projFilterCat, setProjFilterCat] = useState("All");

  // ================= CERTIFICATES STATE =================
  const [certificates, setCertificates] = useState([]);
  const [certForm, setCertForm] = useState({
    title: "", issuer: "", date: "", category: "Frontend", image: "", link: ""
  });
  const [certImageFile, setCertImageFile] = useState(null);
  const [certImagePreview, setCertImagePreview] = useState(null);
  const [certImageOption, setCertImageOption] = useState("upload"); 
  const [isNewCertCategory, setIsNewCertCategory] = useState(false);
  const [editingCertId, setEditingCertId] = useState(null);

  // ================= PROJECTS STATE =================
  const [projects, setProjects] = useState([]);
  const [projectForm, setProjectForm] = useState({
    title: "", category: "Web App", tech: "", desc: "", image: "", link: "", github: ""
  });
  const [projectImageFile, setProjectImageFile] = useState(null);
  const [projectImagePreview, setProjectImagePreview] = useState(null);
  const [projectImageOption, setProjectImageOption] = useState("upload");
  const [isNewProjectCategory, setIsNewProjectCategory] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);

  // ================= GLOBAL STATE =================
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const defaultCertCategories = ["Web Fullstack","Frontend", "Backend", "AI", "Microsoft Office", "Soft Skills", "Lainnya", "Bahasa Pemrograman", "Bahasa"];
  const certCategories = [...new Set([...defaultCertCategories, ...certificates.map(c => c.category).filter(Boolean)])];

  const defaultProjectCategories = ["Web App", "Mobile", "AI Integration", "Lainnya"];
  const projectCategories = [...new Set([...defaultProjectCategories, ...projects.map(p => p.category).filter(Boolean)])];

  // Filtered Certificates
  const filteredCertificates = useMemo(() => {
    return certificates.filter((cert) => {
      const matchSearch = (cert.title || "").toLowerCase().includes(certSearch.toLowerCase()) ||
                          (cert.issuer || "").toLowerCase().includes(certSearch.toLowerCase());
      const matchCat = certFilterCat === "All" || (cert.category || "Lainnya") === certFilterCat;
      return matchSearch && matchCat;
    });
  }, [certificates, certSearch, certFilterCat]);

  // Filtered Projects
  const filteredProjects = useMemo(() => {
    return projects.filter((proj) => {
      const matchSearch = (proj.title || "").toLowerCase().includes(projSearch.toLowerCase()) ||
                          (proj.desc || "").toLowerCase().includes(projSearch.toLowerCase()) ||
                          (proj.tech || "").toLowerCase().includes(projSearch.toLowerCase());
      const matchCat = projFilterCat === "All" || (proj.category || "Lainnya") === projFilterCat;
      return matchSearch && matchCat;
    });
  }, [projects, projSearch, projFilterCat]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [resCerts, resProj] = await Promise.all([
        supabase.from('certificates').select('*').order('id', { ascending: false }),
        supabase.from('projects').select('*').order('id', { ascending: false })
      ]);
      
      if (resCerts.error) throw resCerts.error;
      if (resProj.error) throw resProj.error;
      
      setCertificates(resCerts.data || []);
      setProjects(resProj.data || []);
      setError("");
    } catch (err) {
      setError("Tidak dapat terhubung ke Supabase. Periksa koneksi internet Anda.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '';
    if (imagePath.startsWith('/uploads/')) {
      const fileName = imagePath.replace('/uploads/', '');
      return `https://ugbwpgalnyazmbmntxhi.supabase.co/storage/v1/object/public/portfolio/${fileName}`;
    }
    return imagePath;
  };

  const uploadImageToSupabase = async (file) => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.round(Math.random() * 1e9)}.${fileExt}`;
    const { error } = await supabase.storage
      .from('portfolio')
      .upload(fileName, file, {
        contentType: file.type,
        upsert: true
      });
    if (error) throw error;
    const { data: publicData } = supabase.storage
      .from('portfolio')
      .getPublicUrl(fileName);
    return publicData.publicUrl;
  };

  // ================= HANDLERS =================
  const handleCertSubmit = async (e) => {
    e.preventDefault();
    if (!certImageFile && !certForm.image && !editingCertId) {
      setError("Silakan upload gambar sertifikat ATAU masukkan URL Gambar.");
      return;
    }
    setSubmitting(true);
    setError("");

    try {
      let imageUrl = certForm.image;
      if (certImageFile) {
        imageUrl = await uploadImageToSupabase(certImageFile);
      }

      const certData = {
        title: certForm.title,
        issuer: certForm.issuer,
        date: certForm.date,
        category: certForm.category || 'Lainnya',
        link: certForm.link || '#',
        image: imageUrl
      };

      if (editingCertId) {
        const { error } = await supabase
          .from('certificates')
          .update(certData)
          .eq('id', editingCertId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('certificates')
          .insert([certData]);
        if (error) throw error;
      }

      resetCertForm();
      fetchData();
    } catch (err) {
      setError(err.message || "Gagal menyimpan sertifikat.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (!projectImageFile && !projectForm.image && !editingProjectId) {
      setError("Silakan upload gambar proyek ATAU masukkan URL Gambar.");
      return;
    }
    setSubmitting(true);
    setError("");

    try {
      let imageUrl = projectForm.image;
      if (projectImageFile) {
        imageUrl = await uploadImageToSupabase(projectImageFile);
      }

      const projectData = {
        title: projectForm.title,
        category: projectForm.category,
        tech: projectForm.tech,
        desc: projectForm.desc,
        link: projectForm.link,
        github: projectForm.github,
        image: imageUrl
      };

      if (editingProjectId) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingProjectId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([projectData]);
        if (error) throw error;
      }

      resetProjectForm();
      fetchData();
    } catch (err) {
      setError(err.message || "Gagal menyimpan proyek.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (type, id) => {
    if (!window.confirm(`Apakah Anda yakin ingin menghapus data ini?`)) return;
    try {
      const tableName = type === "certificates" ? "certificates" : "projects";
      const { error } = await supabase.from(tableName).delete().eq('id', id);
      if (error) throw error;
      fetchData();
    } catch (err) {
      setError(err.message || "Gagal menghapus data");
    }
  };

  // Edit Handlers
  const handleEditCert = (cert) => {
    setEditingCertId(cert.id);
    setCertForm({
      title: cert.title, issuer: cert.issuer, date: cert.date, category: cert.category, link: cert.link, image: cert.image
    });
    setCertImageOption(cert.image && cert.image.startsWith('/uploads/') ? 'upload' : 'url');
    setCertImagePreview(cert.image && cert.image.startsWith('/uploads/') ? getImageUrl(cert.image) : null);
    setIsNewCertCategory(!certCategories.includes(cert.category));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEditProject = (proj) => {
    setEditingProjectId(proj.id);
    setProjectForm({
      title: proj.title, category: proj.category, tech: proj.tech, desc: proj.desc, link: proj.link, github: proj.github, image: proj.image
    });
    setProjectImageOption(proj.image && proj.image.startsWith('/uploads/') ? 'upload' : 'url');
    setProjectImagePreview(proj.image && proj.image.startsWith('/uploads/') ? getImageUrl(proj.image) : null);
    setIsNewProjectCategory(!projectCategories.includes(proj.category));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetCertForm = () => {
    setEditingCertId(null);
    setCertForm({ title: "", issuer: "", date: "", category: "Frontend", image: "", link: "" });
    setCertImageFile(null); setCertImagePreview(null); setIsNewCertCategory(false);
  };

  const resetProjectForm = () => {
    setEditingProjectId(null);
    setProjectForm({ title: "", category: "Web App", tech: "", desc: "", image: "", link: "", github: "" });
    setProjectImageFile(null); setProjectImagePreview(null); setIsNewProjectCategory(false);
  };

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50 dark:bg-slate-900 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* HEADER & TABS */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-50 mb-6">
            Admin <span className="text-blue-600">Dashboard</span>
          </h1>
          
          <div className="inline-flex bg-white dark:bg-slate-900 rounded-full p-1 shadow-lg border border-slate-200 dark:border-slate-800 relative z-10">
            <button
              onClick={() => { setActiveTab("certificates"); resetCertForm(); }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === "certificates" ? "bg-blue-600 text-white shadow-md transform scale-105" : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"}`}
            >
              <Award size={18} /> Kelola Sertifikat
            </button>
            <button
              onClick={() => { setActiveTab("projects"); resetProjectForm(); }}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold transition-all duration-300 ${activeTab === "projects" ? "bg-blue-600 text-white shadow-md transform scale-105" : "text-slate-500 hover:text-slate-800 dark:hover:text-slate-200"}`}
            >
              <Briefcase size={18} /> Kelola Proyek
            </button>
          </div>
        </div>

        {error && (
          <motion.div initial={{opacity:0, y:-10}} animate={{opacity:1, y:0}} className="mb-8 p-4 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 rounded-xl flex items-center gap-3 max-w-3xl mx-auto">
            <AlertCircle size={20} className="flex-shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </motion.div>
        )}

        <AnimatePresence mode="wait">
          {/* ======================= TAB: CERTIFICATES ======================= */}
          {activeTab === "certificates" && (
            <motion.div key="certificates" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Form Sertifikat */}
              <div className="lg:col-span-5">
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      {editingCertId ? <><Edit2 size={20} className="text-blue-600" /> Edit Sertifikat</> : <><Plus size={20} className="text-blue-600" /> Tambah Sertifikat</>}
                    </h2>
                    {editingCertId && (
                      <button onClick={resetCertForm} className="text-sm text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full"><X size={14}/> Batal</button>
                    )}
                  </div>

                  <form onSubmit={handleCertSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-2"><Award size={14} /> Judul Sertifikat</label>
                      <input type="text" required value={certForm.title} onChange={e => setCertForm({...certForm, title: e.target.value})} placeholder="e.g. Google UX Design" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 transition-all dark:text-white" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-2"><Building size={14} /> Penerbit (Issuer)</label>
                      <input type="text" required value={certForm.issuer} onChange={e => setCertForm({...certForm, issuer: e.target.value})} placeholder="e.g. Coursera" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 transition-all dark:text-white" />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-2"><Calendar size={14} /> Tanggal</label>
                        <input type="text" required value={certForm.date} onChange={e => setCertForm({...certForm, date: e.target.value})} placeholder="Aug 2024" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 transition-all dark:text-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center justify-between">
                          <span className="flex items-center gap-2"><Tag size={14} /> Kategori</span>
                          <button type="button" onClick={() => setIsNewCertCategory(!isNewCertCategory)} className="text-[10px] text-blue-600 hover:underline">{isNewCertCategory ? "Pilih dari daftar" : "Ketik manual"}</button>
                        </label>
                        {isNewCertCategory ? (
                          <input type="text" required value={certForm.category} onChange={e => setCertForm({...certForm, category: e.target.value})} placeholder="Kategori Baru" className="w-full px-4 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 focus:ring-2 focus:ring-blue-500 transition-all dark:text-white" />
                        ) : (
                          <select required value={certForm.category} onChange={e => setCertForm({...certForm, category: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 transition-all dark:text-white">
                            {certCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                          </select>
                        )}
                      </div>
                    </div>

                    <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50/50 dark:bg-slate-800/30">
                      <div className="flex border-b border-slate-200 dark:border-slate-700">
                        <button type="button" onClick={() => { setCertImageOption('upload'); setCertForm({ ...certForm, image: "" }); }} className={`flex-1 py-3 text-sm font-bold transition-colors ${certImageOption === 'upload' ? 'bg-blue-600 text-white' : 'bg-transparent text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>1. Upload File</button>
                        <button type="button" onClick={() => { setCertImageOption('url'); setCertImageFile(null); setCertImagePreview(null); }} className={`flex-1 py-3 text-sm font-bold transition-colors ${certImageOption === 'url' ? 'bg-blue-600 text-white' : 'bg-transparent text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>2. Gunakan URL</button>
                      </div>
                      <div className="p-4">
                        {certImageOption === 'upload' ? (
                          <label className="block relative border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-4 text-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer group bg-white dark:bg-slate-900">
                            <input type="file" accept="image/*" onChange={e => { const f = e.target.files[0]; if(f) { setCertImageFile(f); setCertImagePreview(URL.createObjectURL(f)); } }} className="hidden" />
                            {certImagePreview ? <img src={certImagePreview} alt="Preview" className="h-24 mx-auto object-contain rounded-lg shadow-sm" /> : <div className="py-2 opacity-60"><UploadCloud size={24} className="mx-auto text-slate-500 mb-1" /><p className="text-xs font-medium text-slate-600 dark:text-slate-400">Pilih file gambar {editingCertId && <span className="block text-[10px] mt-1 text-slate-400">(Biarkan kosong jika tidak ganti)</span>}</p></div>}
                          </label>
                        ) : (
                          <input type="text" value={certForm.image} onChange={e => setCertForm({...certForm, image: e.target.value})} placeholder="Contoh: https://contoh.com/gambar.jpg" className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 transition-all dark:text-white" />
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-2"><LinkIcon size={14} /> URL Verifikasi Sertifikat (Opsional)</label>
                      <input type="text" value={certForm.link} onChange={e => setCertForm({...certForm, link: e.target.value})} placeholder="https://coursera.org/verify/..." className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 transition-all dark:text-white" />
                    </div>

                    <button type="submit" disabled={submitting} className={`w-full mt-4 py-3 px-4 ${editingCertId ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-70 shadow-md`}>
                      {submitting ? "Menyimpan..." : (editingCertId ? "Update Sertifikat" : "Simpan Sertifikat")}
                    </button>
                  </form>
                </div>
              </div>

              {/* List Sertifikat */}
              <div className="lg:col-span-7">
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6">
                  {/* Header & Quick Stats */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Award size={20} className="text-blue-600" /> Daftar Sertifikat
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                          {filteredCertificates.length} {filteredCertificates.length !== certificates.length ? `dari ${certificates.length}` : ''}
                        </span>
                      </h2>
                      <p className="text-xs text-slate-400 mt-0.5">Kelola dan perbarui sertifikasi yang telah Anda raih</p>
                    </div>

                    {editingCertId && (
                      <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-bold px-3 py-1 rounded-full animate-pulse self-start sm:self-auto">
                        Mode Edit Aktif
                      </span>
                    )}
                  </div>

                  {/* Filter & Search Toolbar */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-4">
                    <div className="sm:col-span-7 relative">
                      <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Cari judul sertifikat / penerbit..."
                        value={certSearch}
                        onChange={(e) => setCertSearch(e.target.value)}
                        className="w-full pl-9 pr-8 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                      />
                      {certSearch && (
                        <button onClick={() => setCertSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                          <X size={14} />
                        </button>
                      )}
                    </div>

                    <div className="sm:col-span-5 relative">
                      <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      <select
                        value={certFilterCat}
                        onChange={(e) => setCertFilterCat(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 transition-all dark:text-white cursor-pointer"
                      >
                        <option value="All">Semua Kategori</option>
                        {certCategories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Scrollable Container with data-lenis-prevent and overscroll-contain */}
                  <div
                    data-lenis-prevent="true"
                    className="space-y-3 max-h-[580px] overflow-y-auto overscroll-contain pr-2 scrollbar-thin"
                  >
                    {filteredCertificates.map((cert) => (
                      <div
                        key={cert.id}
                        className={`flex items-center gap-3.5 p-3.5 border rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group ${
                          editingCertId === cert.id
                            ? 'border-amber-400 bg-amber-50/40 dark:bg-amber-900/10 shadow-sm'
                            : 'border-slate-100 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-900/40'
                        }`}
                      >
                        <div className="w-16 h-14 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-800 flex-shrink-0 border border-slate-200 dark:border-slate-700">
                          <img
                            src={getImageUrl(cert.image)}
                            alt={cert.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => { e.currentTarget.src = "https://placehold.co/100x80/e2e8f0/475569?text=Cert"; }}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-[10px] font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded-md truncate max-w-[120px]">
                              {cert.category || 'Lainnya'}
                            </span>
                            <span className="text-[11px] text-slate-400 flex items-center gap-1 font-mono">
                              <Calendar size={10} /> {cert.date}
                            </span>
                          </div>
                          
                          <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate" title={cert.title}>
                            {cert.title}
                          </h3>
                          
                          <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                            {cert.issuer}
                          </p>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-1">
                          {cert.link && (
                            <a
                              href={cert.link}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                              title="Buka Link Verifikasi"
                            >
                              <ArrowUpRight size={16} />
                            </a>
                          )}
                          <button
                            onClick={() => handleEditCert(cert)}
                            className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors cursor-pointer"
                            title="Edit Sertifikat"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete('certificates', cert.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors cursor-pointer"
                            title="Hapus Sertifikat"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}

                    {filteredCertificates.length === 0 && !loading && (
                      <div className="text-center py-12 text-slate-500 dark:text-slate-400 text-sm">
                        {certSearch || certFilterCat !== "All"
                          ? "Tidak ada sertifikat yang cocok dengan pencarian / filter."
                          : "Belum ada sertifikat. Silakan tambahkan melalui form."}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* ======================= TAB: PROJECTS ======================= */}
          {activeTab === "projects" && (
            <motion.div key="projects" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Form Tambah Proyek */}
              <div className="lg:col-span-5">
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      {editingProjectId ? <><Edit2 size={20} className="text-blue-600" /> Edit Proyek</> : <><Plus size={20} className="text-blue-600" /> Tambah Proyek</>}
                    </h2>
                    {editingProjectId && (
                      <button onClick={resetProjectForm} className="text-sm text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 flex items-center gap-1 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full"><X size={14}/> Batal</button>
                    )}
                  </div>
                  
                  <form onSubmit={handleProjectSubmit} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-2"><Briefcase size={14} /> Judul Proyek</label>
                      <input type="text" required value={projectForm.title} onChange={e => setProjectForm({...projectForm, title: e.target.value})} placeholder="e.g. Predictive Copilot" className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 transition-all dark:text-white" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center justify-between">
                        <span className="flex items-center gap-2"><Tag size={14} /> Kategori Platform</span>
                        <button type="button" onClick={() => setIsNewProjectCategory(!isNewProjectCategory)} className="text-[10px] text-blue-600 hover:underline">{isNewProjectCategory ? "Pilih dari daftar" : "Ketik manual"}</button>
                      </label>
                      {isNewProjectCategory ? (
                        <input type="text" required value={projectForm.category} onChange={e => setProjectForm({...projectForm, category: e.target.value})} placeholder="Kategori Baru" className="w-full px-4 py-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 focus:ring-2 focus:ring-blue-500 transition-all dark:text-white" />
                      ) : (
                        <select required value={projectForm.category} onChange={e => setProjectForm({...projectForm, category: e.target.value})} className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 transition-all dark:text-white">
                          {projectCategories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                        </select>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-2"><Monitor size={14} /> Teknologi (Pisahkan koma)</label>
                      <input type="text" value={projectForm.tech} onChange={e => setProjectForm({...projectForm, tech: e.target.value})} placeholder="React, Node, Tailwind..." className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 transition-all dark:text-white" />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Deskripsi Singkat</label>
                      <textarea rows="2" value={projectForm.desc} onChange={e => setProjectForm({...projectForm, desc: e.target.value})} placeholder="Dashboard pintar dengan..." className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 transition-all dark:text-white resize-none" />
                    </div>

                    <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden bg-slate-50/50 dark:bg-slate-800/30">
                      <div className="flex border-b border-slate-200 dark:border-slate-700">
                        <button type="button" onClick={() => { setProjectImageOption('upload'); setProjectForm({ ...projectForm, image: "" }); }} className={`flex-1 py-3 text-sm font-bold transition-colors ${projectImageOption === 'upload' ? 'bg-blue-600 text-white' : 'bg-transparent text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>1. Upload File</button>
                        <button type="button" onClick={() => { setProjectImageOption('url'); setProjectImageFile(null); setProjectImagePreview(null); }} className={`flex-1 py-3 text-sm font-bold transition-colors ${projectImageOption === 'url' ? 'bg-blue-600 text-white' : 'bg-transparent text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800'}`}>2. Gunakan URL</button>
                      </div>
                      <div className="p-4">
                        {projectImageOption === 'upload' ? (
                          <label className="block relative border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-xl p-4 text-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer group bg-white dark:bg-slate-900">
                            <input type="file" accept="image/*" onChange={e => { const f = e.target.files[0]; if(f) { setProjectImageFile(f); setProjectImagePreview(URL.createObjectURL(f)); } }} className="hidden" />
                            {projectImagePreview ? <img src={projectImagePreview} alt="Preview" className="h-24 mx-auto object-cover rounded-lg shadow-sm" /> : <div className="py-2 opacity-60"><UploadCloud size={24} className="mx-auto text-slate-500 mb-1" /><p className="text-xs font-medium text-slate-600 dark:text-slate-400">Pilih Thumbnail {editingProjectId && <span className="block text-[10px] mt-1 text-slate-400">(Biarkan kosong jika tidak ganti)</span>}</p></div>}
                          </label>
                        ) : (
                          <input type="text" value={projectForm.image} onChange={e => setProjectForm({...projectForm, image: e.target.value})} placeholder="Contoh: https://contoh.com/gambar.jpg" className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 transition-all dark:text-white" />
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-2"><LinkIcon size={14} /> Live Demo URL</label>
                        <input type="text" value={projectForm.link} onChange={e => setProjectForm({...projectForm, link: e.target.value})} placeholder="https://..." className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 transition-all dark:text-white" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1 flex items-center gap-2"><Github size={14} /> Source Code</label>
                        <input type="text" value={projectForm.github} onChange={e => setProjectForm({...projectForm, github: e.target.value})} placeholder="https://github.com/..." className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 transition-all dark:text-white" />
                      </div>
                    </div>

                    <button type="submit" disabled={submitting} className={`w-full mt-4 py-3 px-4 ${editingProjectId ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-600 hover:bg-blue-700'} text-white rounded-xl font-bold flex items-center justify-center gap-2 transition-colors disabled:opacity-70 shadow-md`}>
                      {submitting ? "Menyimpan..." : (editingProjectId ? "Update Proyek" : "Simpan Proyek")}
                    </button>
                  </form>
                </div>
              </div>

              {/* List Proyek */}
              <div className="lg:col-span-7">
                <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 p-6">
                  {/* Header & Quick Stats */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
                    <div>
                      <h2 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                        <Briefcase size={20} className="text-blue-600" /> Daftar Proyek
                        <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
                          {filteredProjects.length} {filteredProjects.length !== projects.length ? `dari ${projects.length}` : ''}
                        </span>
                      </h2>
                      <p className="text-xs text-slate-400 mt-0.5">Kelola portofolio karya dan proyek unggulan Anda</p>
                    </div>

                    {editingProjectId && (
                      <span className="text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 font-bold px-3 py-1 rounded-full animate-pulse self-start sm:self-auto">
                        Mode Edit Aktif
                      </span>
                    )}
                  </div>

                  {/* Filter & Search Toolbar */}
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mb-4">
                    <div className="sm:col-span-7 relative">
                      <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Cari judul proyek, tech stack..."
                        value={projSearch}
                        onChange={(e) => setProjSearch(e.target.value)}
                        className="w-full pl-9 pr-8 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 transition-all dark:text-white"
                      />
                      {projSearch && (
                        <button onClick={() => setProjSearch("")} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                          <X size={14} />
                        </button>
                      )}
                    </div>

                    <div className="sm:col-span-5 relative">
                      <Filter size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                      <select
                        value={projFilterCat}
                        onChange={(e) => setProjFilterCat(e.target.value)}
                        className="w-full pl-8 pr-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 transition-all dark:text-white cursor-pointer"
                      >
                        <option value="All">Semua Kategori</option>
                        {projectCategories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Scrollable Container with data-lenis-prevent and overscroll-contain */}
                  <div
                    data-lenis-prevent="true"
                    className="space-y-3 max-h-[580px] overflow-y-auto overscroll-contain pr-2 scrollbar-thin"
                  >
                    {filteredProjects.map((proj) => (
                      <div
                        key={proj.id}
                        className={`flex items-center gap-3.5 p-3.5 border rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all group ${
                          editingProjectId === proj.id
                            ? 'border-amber-400 bg-amber-50/40 dark:bg-amber-900/10 shadow-sm'
                            : 'border-slate-100 dark:border-slate-800/80 bg-slate-50/40 dark:bg-slate-900/40'
                        }`}
                      >
                        <div className="w-20 h-14 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-800 flex-shrink-0 border border-slate-200 dark:border-slate-700">
                          <img
                            src={getImageUrl(proj.image)}
                            alt={proj.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => { e.currentTarget.src = "https://placehold.co/100x80/e2e8f0/475569?text=Project"; }}
                          />
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-sm text-slate-900 dark:text-white truncate" title={proj.title}>
                            {proj.title}
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">{proj.desc}</p>
                          <div className="flex flex-wrap items-center gap-1.5 mt-2">
                            <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 dark:bg-blue-900/30 px-2 py-0.5 rounded">
                              {proj.category}
                            </span>
                            {proj.tech.split(',').slice(0, 3).map((t, i) => (
                              <span key={i} className="text-[10px] text-slate-500 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                                {t.trim()}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-1">
                          {proj.link && (
                            <a
                              href={proj.link}
                              target="_blank"
                              rel="noreferrer"
                              className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                              title="Buka Live Demo"
                            >
                              <ArrowUpRight size={16} />
                            </a>
                          )}
                          <button
                            onClick={() => handleEditProject(proj)}
                            className="p-2 text-slate-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg transition-colors cursor-pointer"
                            title="Edit Proyek"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete('projects', proj.id)}
                            className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors cursor-pointer"
                            title="Hapus Proyek"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    ))}

                    {filteredProjects.length === 0 && !loading && (
                      <div className="text-center py-12 text-slate-500 dark:text-slate-400 text-sm">
                        {projSearch || projFilterCat !== "All"
                          ? "Tidak ada proyek yang cocok dengan pencarian / filter."
                          : "Belum ada proyek. Silakan tambahkan melalui form."}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default AdminPage;
