// Tambahkan di file src/data/content.js
import { Home, User, Briefcase, Code, Mail, Award, ShieldCheck } from "lucide-react";

export const navItems = [
  { id: "home", label: "Home", icon: Home, type: "scroll" }, // Scroll ke atas
  { id: "about", label: "About", icon: User, type: "scroll" },
  { id: "experience", label: "Experience", icon: Briefcase, type: "scroll" },
  { id: "projects", label: "Projects", icon: Code, type: "scroll" },
  {
    id: "certificates",
    label: "Certificates",
    icon: Award,
    type: "route",
    path: "/certificates",
  }, // Pindah Halaman
  { id: "contact", label: "Contact", icon: Mail, type: "scroll" },
  {
    id: "admin",
    label: "Admin",
    icon: ShieldCheck, // Icon Admin Profesional (ShieldCheck)
    type: "route",
    path: "/admin",
  },
];

// File: src/data/content.js

// --- HERO DATA ---
export const heroData = {
  name: "Harpan",
  role: "Software Engineer",
  greeting: {
    id: "Halo, Saya",
    en: "Hello, I'm",
  },
  desc: {
    id: "Saya membangun website interaktif dan solusi sistem digital dengan performa tinggi, animasi halus, dan arsitektur kode modern.",
    en: "I build interactive websites and modern software solutions with high performance, smooth animations, and clean scalable architecture.",
  },
  image: "/herro.png",
  stats: {
    exp: "1+",
    projects: "10+",
    clients: "5+",
  },
};

// ... (pastikan export lainnya seperti navItems, projectsData, dll tetap ada di bawahnya)

// ... import icon lainnya ...
// Pastikan tidak ada duplikasi export, tambahkan ini di paling bawah atau gabungkan dengan export yang ada

export const certificatesData = [
  {
    id: 21,
    title: "Belajar Dasar Git dengan GitHub",
    issuer: "Dicoding Indonesia",
    date: "17 Agustus 2025 - 17 Agustus 2028",
    category: "DevOps & Tooling",
  },
  {
    id: 20,
    title: "Belajar Dasar Pemrograman Web",
    issuer: "Dicoding Indonesia",
    date: "21 Agustus 2025 - 21 Agustus 2028",
    category: "Bahasa Pemrograman",
  },
  {
    id: 19,
    title: "Belajar Dasar Pemrograman JavaScript",
    issuer: "Dicoding Indonesia",
    date: "10 September 2025 - 10 September 2028",
    category: "Bahasa Pemrograman",
  },
  {
    id: 18,
    title: "Belajar Membuat Front-End Web untuk Pemula",
    issuer: "Dicoding Indonesia",
    date: "17 September 2025 - 17 September 2028",
    category: "Frontend",
  },
  {
    id: 17,
    title: "Belajar Membuat Aplikasi Web dengan React",
    issuer: "Dicoding Indonesia",
    date: "24 September 2025 - 24 September 2028",
    category: "Frontend",
  },
  {
    id: 16,
    title: "Belajar Fundamental Aplikasi Web dengan React",
    issuer: "Dicoding Indonesia",
    date: "10 Oktober 2025 - 10 Oktober 2025",
    category: "Frontend",
  },
  {
    id: 15,
    title: "Belajar Fundamental Back-End dengan JavaScript",
    issuer: "Dicoding Indonesia",
    date: "17 Desember 2025 - 17 Desember 2028",
    category: "Backend",
  },
  {
    id: 14,
    title: "Fundamental Back-End dengan JavaScript",
    issuer: "Dicoding Indonesia",
    date: "17 Desember 2025 - 17 Desember 2028",
    category: "Bahasa Pemrograman",
  },
  {
    id: 13,
    title: "Junior Office Operator",
    issuer: "Badan Nasional Sertifikasi Profesi (BNSP)",
    date: "05 Januari 2022 - 05 Januari 2025",
    category: "Microsoft Office",
  },
  {
    id: 12,
    title: "Microsoft Office",
    issuer: "LPK Alkafi",
    date: "30 September 2021",
    category: "Microsoft Office",
  },
  {
    id: 11,
    title: "Belajar Dasar Cloud dan Gen AI di AWS",
    issuer: "Dicoding Indonesia",
    date: "16 Oktober 2025",
    category: "AI",
  },
  {
    id: 10,
    title: "Belajar Dasar AI",
    issuer: "Dicoding Indonesia",
    date: "13 Oktober 2025",
    category: "AI",
  },
];

export const aboutData = {
  title: {
    id: "Tentang Saya",
    en: "About Me",
  },
  subtitle: {
    id: "Latar Belakang & Fokus",
    en: "Background & Focus",
  },
  techTitle: {
    id: "Arsenal Teknis",
    en: "Technical Arsenal",
  },
  bio: {
    id: "Saya adalah Software Engineer dengan fokus pada Frontend & Web Development serta berlatar belakang desain visual. Saya terbiasa menerjemahkan kebutuhan bisnis dan desain ke dalam aplikasi yang responsif, berkinerja tinggi, dan ramah pengguna menggunakan React, Tailwind CSS, serta ekosistem modern lainnya.",
    en: "I am a Software Engineer focused on Frontend & Web Development with a background in visual design. I translate business requirements and design systems into responsive, high-performance, and accessible web experiences using React, Tailwind CSS, and modern architectures.",
  },
  stats: [
    { label: { id: "Pengalaman", en: "Years Exp" }, value: "1+" },
    { label: { id: "Proyek", en: "Projects" }, value: "10+" },
    { label: { id: "Klien", en: "Clients" }, value: "5+" },
    { label: { id: "Kopi", en: "Coffee" }, value: "∞" },
  ],
};
export const skills = [
  "Javascript",
  "HTML",
  "CSS",
  "Tilwind CSS",
  "React js",
  "Node js",
  "Express js",
  "MongoDB",
  "Figma",
  "Git",
];

// ... data lainnya ...

export const projectsData = [
  {
    id: 1,
    title: "Predictive Maintenance Copilot",
    category: "Web App",
    // Gambar Dashboard Futuristik High-Res
    image: "/image/projects/turbiq.webp",
    // image: "/image/projects/turbiq2.png",
    tech: ["React", "Tailwind", "Recharts", "Python", "ML"],
    desc: "Admin dashboard dengan analitik realtime dan dark mode.",
    link: "https://a25-cs-056-predictive-maintenance-c.vercel.app/",
    github:
      "https://github.com/MUHAMAD-NUR-AIDUL-HARPAN/-A25-CS056-PredictiveMaintenanceCopilot",
  },
  {
    id: 2,
    title: "Klora Studio",
    category: "Mobile",
    // Gambar HP/App High-Res
    image: "/image/projects/klora1.jpg",
    tech: ["React Native", "Redux"],
    desc: "Aplikasi klora Studio dengan animasi yang smooth.",
    link: "https://klora-studio.vercel.app/",
    github: "https://github.com/MUHAMAD-NUR-AIDUL-HARPAN/klora-studio",
  },
  {
    id: 3,
    title: "AI Image Generator",
    category: "AI Integration",
    // Gambar AI/Robot High-Res
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2532&auto=format&fit=crop",
    tech: ["OpenAI API", "React", "Node.js"],
    desc: "Generate gambar unik menggunakan text prompt.",
    link: "",
    github: "https://github.com",
  },
  {
    id: 4,
    title: "Luxury Hotel Booking",
    category: "Web App",
    // Gambar Hotel Mewah High-Res
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=2670&auto=format&fit=crop",
    tech: ["Vue.js", "GSAP"],
    desc: "Website booking hotel bintang 5 dengan animasi mewah.",
    link: "",
    github: "https://github.com",
  },
];
// ... (kode sebelumnya)

export const skillsData = [
  {
    category: "Frontend Engineering",
    icon: "Layout",
    skills: [
      { name: "HTML5", level: 95, iconKey: "html", color: "#E34F26" },
      { name: "CSS3", level: 90, iconKey: "css", color: "#1572B6" },
      {
        name: "Tailwind CSS",
        level: 98,
        iconKey: "tailwind",
        color: "#38B2AC",
      },
      { name: "JavaScript (ES6+)", level: 90, iconKey: "js", color: "#F7DF1E" },
      { name: "React.js", level: 95, iconKey: "react", color: "#61DAFB" },
    ],
  },
  {
    category: "Backend Architecture",
    icon: "Server",
    skills: [
      { name: "Node.js", level: 80, iconKey: "node", color: "#339933" },
      { name: "Express.js", level: 75, iconKey: "express", color: "#000000" },
      { name: "MongoDB", level: 85, iconKey: "mongo", color: "#47A248" },
      { name: "PostgreSQL", level: 70, iconKey: "postgres", color: "#336791" },
    ],
  },
  {
    category: "DevOps & Tooling",
    icon: "Settings",
    skills: [
      { name: "Git & GitHub", level: 95, iconKey: "git", color: "#F05032" },
      { name: "VS Code", level: 100, iconKey: "vscode", color: "#007ACC" },
      { name: "Figma (UI/UX)", level: 85, iconKey: "figma", color: "#F24E1E" },
      { name: "Microsoft Office (Word/Excel/PPT)", level: 90, iconKey: "office", color: "#D83B01" },
    ],
  },
];
export const contactData = {
  title: { id: "Mari Terhubung", en: "Let's Connect" },
  subtitle: {
    id: "Punya ide proyek menarik atau sekadar ingin menyapa? Saya selalu terbuka untuk diskusi.",
    en: "Have an exciting project idea or just want to say hi? I'm always open to discussion.",
  },
  email: "muhamadnurharpan@gmail.com",
  whatsappNumber: "6283805480105",
  whatsappDisplay: "+62 838-0548-0105",
  location: "Sukabumi, Indonesia",
  socials: {
    github: "https://github.com/MUHAMAD-NUR-AIDUL-HARPAN",
    linkedin: "https://linkedin.com/in/muhamad-nur-aidul-harpan",
    instagram: "https://instagram.com/aidl_harpan08",
  },
  form: {
    name: { id: "Nama Lengkap", en: "Full Name" },
    email: { id: "Alamat Email", en: "Email Address" },
    message: { id: "Pesan", en: "Message" },
    btnEmail: { id: "Kirim Pesan", en: "Send Message" },
    btnWa: { id: "Chat via WhatsApp", en: "Chat via WhatsApp" },
    sending: { id: "Mengirim...", en: "Sending..." },
    success: { id: "Terkirim!", en: "Sent!" },
  },
  tabs: {
    email: { id: "Email", en: "Email" },
    wa: { id: "WhatsApp", en: "WhatsApp" },
  },
};
// ... data lainnya

export const experienceData = [
  {
    id: 1,
    category: "work", // Untuk membedakan icon (Tas Kerja)
    role: {
      id: "Frontend Web Developer Intern",
      en: "Frontend Web Developer Intern",
    },
    company: "PT Anugrah Kreasi Digital",
    period: "5 Months", // Sesuaikan tahun jika perlu, misal: "Feb - Jun 2024"
    desc: {
      id: "Menerjemahkan desain UI Figma menjadi website responsif yang pixel-perfect menggunakan HTML, Tailwind CSS, dan JavaScript. Membangun komponen interaktif dan animasi kompleks menggunakan GSAP dan Swiper.js, serta berkolaborasi langsung dengan tim pengembang untuk proyek klien nyata.",
      en: "Translated Figma UI designs into pixel-perfect, responsive websites using HTML, Tailwind CSS, and JavaScript. Built interactive components and complex animations using GSAP and Swiper.js, collaborating directly with the development team on real client projects.",
    },
    tech: ["Tailwind CSS", "GSAP", "JavaScript", "Figma", "HTML5"],
  },
  {
    id: 2,
    category: "education", // Untuk membedakan icon (Topi Toga/Buku)
    role: { id: "React & Backend with AI", en: "React & Backend with AI" },
    company: "Asah led by Dicoding in association with Accenture",
    period: "Program SIB",
    desc: {
      id: "Menyelesaikan kurikulum intensif Fullstack & AI (React, Node.js, AWS). Mempelajari siklus pengembangan end-to-end mulai dari fundamental web, manajemen state React, arsitektur Backend REST API, hingga integrasi Gen-AI dan deployment cloud di AWS.",
      en: "Completed an intensive Fullstack & AI curriculum (React, Node.js, AWS). Mastered the end-to-end development cycle from web fundamentals, React state management, Backend REST API architecture, to Gen-AI integration and cloud deployment on AWS.",
    },
    tech: ["React.js", "Node.js", "AWS Cloud", "Rest API", "Git/GitHub"],
  },
];
// ... data lainnya

export const educationData = [
  {
    id: 1,
    type: "university", // Penanda untuk Icon Universitas
    school: "Nusa Putra University",
    degree: {
      id: "S1 Teknik Informatika",
      en: "B.E. Informatics Engineering",
    },
    period: "2022 - 2026 (Expected)",
    focus: {
      id: "Konsentrasi: Software Engineering",
      en: "Major: Software Engineering",
    },
    desc: {
      id: "Mempelajari fundamental ilmu komputer, algoritma, struktur data, dan siklus pengembangan perangkat lunak (SDLC). Aktif dalam proyek pengembangan aplikasi berbasis web dan mobile.",
      en: "Studying computer science fundamentals, algorithms, data structures, and the software development life cycle (SDLC). Active in web and mobile application development projects.",
    },
  },
  {
    id: 2,
    type: "bootcamp", // Penanda untuk Icon Bootcamp
    school: "Dicoding Indonesia",
    degree: {
      id: "Belajar Membuat Aplikasi Fullstack",
      en: "Become a Fullstack Web Developer",
    },
    period: "Intensive Bootcamp",
    focus: {
      id: "Sertifikasi Profesional",
      en: "Professional Certification",
    },
    desc: {
      id: "Kurikulum mendalam tentang pengembangan web modern, mencakup Front-End (React), Back-End, dan integrasi API dengan standar industri.",
      en: "In-depth curriculum on modern web development, covering Front-End (React), Back-End, and API integration with industry standards.",
    },
  },
  {
    id: 3,
    type: "course", // Penanda untuk Icon Course
    school: "Codepolitan",
    degree: {
      id: "Kelas Fullstack Web Developer",
      en: "Fullstack Web Developer Class",
    },
    period: "Online Course",
    focus: {
      id: "Pengembangan Skill Teknis",
      en: "Technical Skill Development",
    },
    desc: {
      id: "Program intensif penguasaan teknologi web dari dasar hingga mahir, dengan fokus pada studi kasus nyata dan best practice coding.",
      en: "Intensive program mastering web technologies from basic to advanced, focusing on real-world case studies and coding best practices.",
    },
  },
];
export const projectCategories = ["All", "Web App", "Mobile", "AI Integration"];
