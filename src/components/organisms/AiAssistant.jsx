import { useState, useRef, useEffect } from "react";
import { X, Send, RotateCcw, ArrowRight } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";
import {
  experienceData,
  educationData,
  projectsData,
  certificatesData,
  contactData,
} from "../../data/content";

const AiIcon = ({ size = 20, className = "" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
  >

    <path d="M12 2C12 7.523 7.523 12 2 12C7.523 12 12 16.477 12 22C12 16.477 16.477 12 22 12C16.477 12 12 7.523 12 2Z" />

    <path
      d="M19 3C19 5.209 17.209 7 15 7C17.209 7 19 8.791 19 11C19 8.791 20.791 7 23 7C20.791 7 19 5.209 19 3Z"
      opacity="0.85"
    />
  </svg>
);

const buildHarpanContext = (dynamicCerts = [], dynamicProjects = []) => {

  const allProjects = dynamicProjects.length > 0 ? dynamicProjects : projectsData;
  const projectListFormatted = allProjects
    .map((p, idx) => {
      return `Proyek ${idx + 1}:
  - Judul: ${p.title}
  - Kategori: ${p.category || "Web App"}
  - Tech Stack: ${Array.isArray(p.tech) ? p.tech.join(", ") : p.tech || "-"}
  - Deskripsi & Fitur: ${p.desc || "-"}
  - Live Demo Link: ${p.link || "Tersedia di website / request via WhatsApp"}
  - Repository GitHub: ${p.github || "Tersedia di GitHub"}`;
    })
    .join("\n\n");

  const experienceFormatted = experienceData
    .map((exp, idx) => {
      return `Pengalaman ${idx + 1}:
  - Posisi/Peran: ${exp.role?.id || exp.role}
  - Instansi/Perusahaan: ${exp.company}
  - Periode: ${exp.period}
  - Tanggung Jawab & Kontribusi: ${exp.desc?.id || exp.desc}
  - Teknologi Digunakan: ${Array.isArray(exp.tech) ? exp.tech.join(", ") : exp.tech}`;
    })
    .join("\n\n");

  const educationFormatted = educationData
    .map((edu, idx) => {
      return `Pendidikan ${idx + 1}:
  - Institusi: ${edu.school}
  - Jenjang/Gelar: ${edu.degree?.id || edu.degree}
  - Periode: ${edu.period} (Lulusan S1 Teknik Informatika, angkatan 2022 - lulus 2026)
  - Fokus/Jurusan: ${edu.focus?.id || edu.focus}
  - Rincian Studi: ${edu.desc?.id || edu.desc}`;
    })
    .join("\n\n");

  const actualCerts = dynamicCerts.length > 0 ? dynamicCerts : certificatesData;
  const certsFormatted = actualCerts
    .map((c, idx) => `${idx + 1}. ${c.title} (${c.issuer} - ${c.category || 'Sertifikasi'})`)
    .join("\n");

  return `
Anda adalah AI Assistant resmi, cerdas, ramah, dan profesional yang bertindak sebagai Representasi Digital Muhamad Nur Aidul Harpan (bisa dipanggil Aidul atau Harpan).

Tugas Anda adalah memberikan informasi yang 100% akurat, solutif, dan meyakinkan kepada calon klien, perekrut, atau pengunjung website portofolio Harpan.

Total Sertifikat yang dimiliki saat ini: ${actualCerts.length} sertifikat.
Total Proyek yang terdaftar saat ini: ${allProjects.length} proyek.

=========================================
PROFIL UTAMA HARPAN:
=========================================
- Nama Lengkap: Muhamad Nur Aidul Harpan (Panggilan: Aidul / Harpan)
- Profesi: Software Engineer / Frontend Web Developer
- Lokasi: Sukabumi, Jawa Barat, Indonesia
- Email: ${contactData.email}
- WhatsApp: ${contactData.whatsappDisplay || "+62 838-0548-0105"} (Nomor WA: ${contactData.whatsappNumber})
- Profil GitHub: ${contactData.socials?.github}
- Profil LinkedIn: ${contactData.socials?.linkedin}

=========================================
STATUS KETERSEDIAAN KERJA (AVAILABILITY):
=========================================
- Harpan sangat terbuka untuk: Pekerjaan Freelance, Kontrak Proyekan, Magang (Internship), maupun peluang Full-time / Part-time di bidang pengembangan website dan frontend engineering.
- Sistem Kerja: Fleksibel dan bersedia bekerja secara Remote (WFA), Hybrid, maupun On-site (khususnya area Sukabumi, Jabodetabek, dan sekitarnya sesuai kesepakatan).

=========================================
PROYEK UNGGULAN & PENGALAMAN SPESIFIK:
=========================================
- Latar Belakang: Memiliki dasar yang kuat dalam desain visual & UI/UX. Sangat mahir menerjemahkan desain antarmuka dari Figma menjadi kode website interaktif yang presisi (pixel-perfect).
- Tantangan & Pembelajaran: Salah satu tantangan utama yang dihadapi adalah pembuatan animasi website yang kompleks dan interaktif. Harpan mendalami teknik animasi modern tingkat tinggi (GSAP, AOS, CSS GPU Acceleration) demi menghadirkan User Experience (UX) yang mulus 60-120fps tanpa lag.
- Proyek Referensi Utama:
  1. "Predictive Maintenance Copilot (TurbIQ)":
     - Solusi web app industri AI & IoT untuk memprediksi perawatan mesin otomatis.
     - Tech: React, Tailwind CSS, Recharts, Python, Machine Learning.
     - Kontribusi: Membangun dashboard analitik realtime, visualisasi metrik anomali, integrasi model prediksi, dan interface dark/light mode yang responsif.
  2. "Klora Studio":
     - Aplikasi web & mobile studio kreatif dengan fokus pada transisi animasi yang sangat halus, interaktif, dan modern.
     - Tech: React / React Native, Redux, Tailwind CSS.
  3. "AI Image Generator":
     - Web app integrasi API cerdas yang memungkinkan pengguna menghasilkan gambar unik dari text prompt.
     - Tech: OpenAI API, React, Node.js.

DAFTAR LENGKAP PROYEK DI WEBSITE:
${projectListFormatted}

=========================================
RIWAYAT PENDIDIKAN & AKADEMIK:
=========================================
- Universitas: Universitas Nusa Putra (Sukabumi)
- Program Studi: S1 Teknik Informatika (Fakultas Ilmu Komputer, Konsentrasi Software Engineering).
- Masa Studi: Masuk tahun 2022, lulus tahun 2026.
- Detail Akademik:
${educationFormatted}

=========================================
RIWAYAT PENGALAMAN KERJA & BOOTCAMP:
=========================================
${experienceFormatted}

=========================================
DAFTAR SERTIFIKASI & PELATIHAN RESMI:
=========================================
${certsFormatted}

=========================================
KEAHLIAN TEKNIS (SKILLSET) & PRODUCTIVITY:
=========================================
- Frontend Specialist: HTML5, CSS3, Tailwind CSS, JavaScript (ES6+), React.js, GSAP Animation, Responsive & Pixel-Perfect Design.
- Backend & Database: Node.js, Express.js, REST API, MongoDB, PostgreSQL, SQLite.
- Tooling & Workspace: Git & GitHub, VS Code, Figma (UI/UX).
- Mahir Microsoft Office (Word, Excel, PowerPoint):
  * Harpan sangat mahir mengoperasikan paket lengkap Microsoft Office dan telah menyelesaikan pelatihan bersertifikasi.
  * Microsoft Excel: Pengolahan data, rumus/fungsi kalkulasi, analisis data terstruktur, dan pembuatan tabel/grafik.
  * Microsoft Word: Penyusunan dokumen teknis, proposal proyek, laporan formal, dan tata letak dokumen yang rapi standar industri.
  * Microsoft PowerPoint: Perancangan slide presentasi profesional, materi pitch deck proyek, dan visualisasi konsep ide yang menarik.

=========================================
PENGUASAAN BAHASA (LANGUAGES):
=========================================
- Bahasa Indonesia: Penutur Asli (Native / Sangat Fasih).
- Bahasa Inggris: Profesional & Teknis (Sangat mampu membaca dokumentasi teknis, menulis kode, dan berkomunikasi profesional dengan klien global).

=========================================
GAYA KOMUNIKASI & SOFT SKILLS:
=========================================
- Terbiasa berkomunikasi dan berkolaborasi tim secara aktif dan transparan menggunakan platform seperti Discord, Slack, WhatsApp, dan GitHub.
- Terbuka untuk berdiskusi, menerima masukan (feedback), cepat mempelajari teknologi baru, serta adaptif menyesuaikan pengerjaan dengan kebutuhan klien/tim.

=========================================
KEBIJAKAN TARIF & PENAWARAN FREELANCE:
=========================================
- Tarif freelance bersifat fleksibel dan dapat dinegosiasikan secara adil berdasarkan kompleksitas fitur, skala teknologi, estimasi waktu pengerjaan, dan spesifikasi website yang diinginkan.
- Jika pengunjung menanyakan tarif atau ingin membuat website:
  1. Jelaskan secara singkat bahwa biaya fleksibel sesuai kebutuhan fitur proyek.
  2. Ajak calon klien untuk berdiskusi langsung via WhatsApp Harpan di: ${contactData.whatsappDisplay || "+62 838-0548-0105"}.

=========================================
PANDUAN & ATURAN MENJAWAB (MUTLAK & ULTRA-RINGKAS):
=========================================
1. PANJANG JAWABAN:
   - Jawaban umum: 1 sampai 2 kalimat pendek yang selesai tuntas (TIDAK BOLEH MENGGANTUNG ATAU TERPOTONG DI TENGAH KALIMAT!).
   - Pertanyaan meminta daftar/semua sertifikat/proyek/pengalaman: Sebutkan SELURUH item yang ada di daftar secara lengkap bernomor dari 1 sampai akhir!
2. LANGSUNG KE JAWABAN INTI:
   - DILARANG KERAS menggunakan kalimat basa-basi seperti "Terima kasih atas pertanyaannya!", "Halo!", "Tentu!", dll.
   - Langsung berikan informasi faktual yang lengkap dan tuntas.
3. CONTOH POLA JAWABAN:
   - Tanya: "harpan bisa bahasa inggris ga?" -> Jawab: "Bisa, Harpan mampu berkomunikasi dalam Bahasa Inggris dengan baik, terutama untuk kebutuhan teknis dan kolaborasi profesional."
   - Tanya: "harpan bisa bahasa apa saja?" -> Jawab: "Harpan fasih berbahasa Indonesia (Native) dan menguasai Bahasa Inggris untuk keperluan profesional serta dokumentasi teknis."
   - Tanya: "di lulusan tahun berapa?" -> Jawab: "Harpan lulusan S1 Teknik Informatika Universitas Nusa Putra tahun 2026."
   - Tanya: "bisa excel dan ppt?" -> Jawab: "Ya, Harpan bersertifikasi dan mahir Word, Excel (analisis data), serta PowerPoint."
4. HANYA FAKTA (ANTI-HALUSINASI):
   - Jawab HANYA berdasarkan daftar data aktual di atas. Jangan mengarang data yang tidak ada.
`;
};

const QUICK_QUESTIONS = [
  "💼 Apa pengalaman & fokus kerja Harpan?",
  "🛠️ Apa tech stack yang paling dikuasai?",
  "📊 Apakah Harpan bisa Microsoft Office?",
  "📬 Bagaimana cara menghubungi Harpan?",
];

export const AiAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [dynamicCerts, setDynamicCerts] = useState([]);
  const [dynamicProjects, setDynamicProjects] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    if (dynamicCerts.length === 0) {
      supabase
        .from("certificates")
        .select("*")
        .then(({ data }) => {
          if (data && data.length > 0) setDynamicCerts(data);
        })
        .catch(() => {});
    }

    if (dynamicProjects.length === 0) {
      supabase
        .from("projects")
        .select("*")
        .then(({ data }) => {
          if (data && data.length > 0) setDynamicProjects(data);
        })
        .catch(() => {});
    }
  }, [isOpen, dynamicCerts.length, dynamicProjects.length]);

  const initialGreeting = {
    role: "assistant",
    content: "Halo! 👋 Saya Harpan AI Assistant. Ada yang bisa saya bantu terkait profil, pengalaman, atau proyek Harpan?",
  };

  const [messages, setMessages] = useState([initialGreeting]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      window.lenis?.stop();
      const originalBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        window.lenis?.start();
        document.body.style.overflow = originalBodyOverflow;
      };
    }
  }, [isOpen]);

  const scrollToBottom = (behavior = "smooth") => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior, block: "nearest" });
    }
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      scrollToBottom(isOpen ? "smooth" : "auto");
    }, 60);
    return () => clearTimeout(timer);
  }, [messages, isLoading, isOpen]);

  const handleResetChat = () => {
    setMessages([initialGreeting]);
  };

  const sendMessage = async (messageText) => {
    const textToSend = messageText.trim();
    if (!textToSend || isLoading) return;

    const apiKey = import.meta.env.VITE_GROQ_API_KEY;

    if (!apiKey || apiKey.trim() === "") {
      setInput("");
      setMessages((prev) => [
        ...prev,
        { role: "user", content: textToSend },
        {
          role: "assistant",
          content: "⚠️ API Key Groq belum disetel.",
        },
      ]);
      return;
    }

    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: textToSend }]);
    setIsLoading(true);

    try {

      const dynamicContext = buildHarpanContext(dynamicCerts, dynamicProjects);

      const recentHistory = messages.slice(-4).map((m) => ({ role: m.role, content: m.content }));

      const lowerQuery = textToSend.toLowerCase();
      const isAskingList = lowerQuery.includes("semua") || lowerQuery.includes("daftar") || lowerQuery.includes("apa saja") || lowerQuery.includes("list") || lowerQuery.includes("rincian");
      const dynamicMaxTokens = isAskingList ? 800 : 450;

      const requestGroq = async (modelName) => {
        const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            messages: [
              { role: "system", content: dynamicContext },
              ...recentHistory,
              { role: "user", content: textToSend },
            ],
            model: modelName,
            temperature: 0.2,
            max_tokens: dynamicMaxTokens,
          }),
        });
        if (!res.ok) {
          const errData = await res.json().catch(() => ({}));
          const error = new Error(errData.error?.message || `HTTP ${res.status}`);
          error.status = res.status;
          throw error;
        }
        return await res.json();
      };

      let reply = "";
      try {
        const completion = await requestGroq("qwen/qwen3.8-27b");
        reply = completion.choices[0]?.message?.content;
      } catch (primaryErr) {
        if (primaryErr.status === 429) {
          const fallbackCompletion = await requestGroq("openai/gpt-oss-20b");
          reply = fallbackCompletion.choices[0]?.message?.content;
        } else {
          throw primaryErr;
        }
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: reply || "Terima kasih atas pertanyaannya!" },
      ]);
    } catch (error) {
      console.error("Groq API Error:", error);
      let errorMsg = "Maaf, terjadi kendala koneksi ke server AI. Silakan coba sesaat lagi.";
      if (error.status === 429) {
        errorMsg = "Limit permintaan AI sementara tercapai. Silakan coba beberapa detik lagi.";
      } else if (error.status === 401) {
        errorMsg = "API Key Groq tidak valid. Pastikan API key sudah dimasukkan dengan benar.";
      }
      setMessages((prev) => [...prev, { role: "assistant", content: errorMsg }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <>

      <div className={`fixed bottom-6 right-6 z-40 transition-all duration-300 ${isOpen ? "opacity-0 scale-90 pointer-events-none" : "opacity-100 scale-100 pointer-events-auto"}`}>
        <div className="relative group transition-all duration-300">
          <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400 opacity-70 blur-md group-hover:opacity-100 transition-opacity animate-pulse pointer-events-none transform-gpu will-change-transform" />

          <button
            onClick={() => setIsOpen(true)}
            className="relative flex items-center gap-3 px-5 py-3.5 rounded-full bg-slate-900/90 dark:bg-slate-800/90 text-white backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-500 text-white shadow-md">
              <AiIcon size={16} className="group-hover:scale-110 transition-transform duration-300" />
              <span className="absolute -top-0.5 -right-0.5 flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 border border-slate-900"></span>
              </span>
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-xs font-bold leading-tight tracking-wide">Tanya Harpan AI</p>
              <p className="text-[10px] text-blue-300/80 leading-tight">Online • Siap membantu</p>
            </div>
          </button>
        </div>
      </div>

      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-slate-950/50 backdrop-blur-md transition-all duration-300 ease-out cursor-pointer ${
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-label="Tutup chatbot"
      />

      <div
        className={`fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[410px] h-[580px] max-h-[85vh] rounded-3xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col overflow-hidden will-change-transform transform-gpu transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
      >

              <div className="shrink-0 p-4 px-5 bg-slate-50 dark:bg-slate-800/90 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-md shadow-blue-500/20">
                    <AiIcon size={20} />
                    <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-white dark:border-slate-900"></span>
                    </span>
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white">Harpan AI</h3>
                      <span className="px-1.5 py-0.5 text-[9px] font-semibold tracking-wider uppercase bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 rounded-md">
                        Assistant
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      Didukung AI • Respon instan
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={handleResetChat}
                    title="Reset Percakapan"
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <RotateCcw size={16} />
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    title="Tutup"
                    className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>

              <div
                ref={scrollRef}
                data-lenis-prevent="true"
                className="flex-1 min-h-0 p-4 sm:p-5 overflow-y-auto space-y-4 bg-slate-50/50 dark:bg-slate-950/40 overscroll-contain select-text"
                style={{
                  overflowY: "auto",
                  WebkitOverflowScrolling: "touch",
                  overscrollBehavior: "contain",
                }}
              >
              {messages.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex items-start gap-2.5 ${
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                      <AiIcon size={13} />
                    </div>
                  )}

                  <div
                    className={`max-w-[82%] px-4 py-3 rounded-2xl text-xs sm:text-[13px] leading-relaxed tracking-normal ${
                      msg.role === "user"
                        ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-tr-sm shadow-md shadow-blue-500/15"
                        : "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-sm border border-slate-200/70 dark:border-slate-700/60 shadow-sm"
                    }`}
                  >
                    <p className="whitespace-pre-line">{msg.content}</p>
                  </div>
                </div>
              ))}

              {isLoading && (
                <div className="flex items-start gap-2.5 justify-start">
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
                    <AiIcon size={13} />
                  </div>
                  <div className="px-4 py-3 rounded-2xl rounded-tl-sm bg-white dark:bg-slate-800 border border-slate-200/70 dark:border-slate-700/60 shadow-sm flex items-center gap-1.5">
                    <span
                      style={{ animationDelay: "0ms" }}
                      className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-bounce"
                    />
                    <span
                      style={{ animationDelay: "150ms" }}
                      className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-bounce"
                    />
                    <span
                      style={{ animationDelay: "300ms" }}
                      className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-bounce"
                    />
                  </div>
                </div>
              )}

              {messages.length <= 2 && !isLoading && (
                <div className="pt-2">
                  <p className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 mb-2 px-1">
                    Pertanyaan Cepat:
                  </p>
                  <div className="flex flex-col gap-1.5">
                    {QUICK_QUESTIONS.map((question, qIdx) => (
                      <button
                        key={qIdx}
                        onClick={() => sendMessage(question)}
                        className="text-left text-xs px-3.5 py-2 rounded-xl bg-white dark:bg-slate-800/80 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200/60 dark:border-slate-700/60 transition-all flex items-center justify-between group shadow-2xs"
                      >
                        <span>{question}</span>
                        <ArrowRight size={13} className="text-slate-400 group-hover:translate-x-0.5 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-all" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} className="h-1" />
            </div>

            <div className="shrink-0 p-3.5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
              <form onSubmit={handleSubmit} className="flex items-center gap-2">
                <div className="flex-1 relative flex items-center rounded-2xl bg-slate-100 dark:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/60 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all">
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Tanya apapun tentang Harpan..."
                    className="w-full bg-transparent px-4 py-2.5 text-xs sm:text-sm outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
                  />
                </div>

                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white flex items-center justify-center transition-all duration-200 shadow-md shadow-blue-500/25 hover:scale-105 active:scale-95 disabled:opacity-40 disabled:hover:scale-100 disabled:shadow-none cursor-pointer"
                >
                  <Send size={16} />
                </button>
              </form>

              <p className="text-[10px] text-center text-slate-400 dark:text-slate-500 mt-2">
                AI Assistant dapat memberikan jawaban otomatis seputar profil Harpan.
              </p>
            </div>
          </div>
    </>
  );
};
