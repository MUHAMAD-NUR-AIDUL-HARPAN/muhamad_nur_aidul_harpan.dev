// Tambahkan di file src/data/content.js
import { Home, User, Briefcase, Code, Mail, Award } from "lucide-react";

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
];

// File: src/data/content.js

// --- TAMBAHKAN BAGIAN INI ---
export const heroData = {
  name: "Harpan", // Ganti dengan nama Anda
  role: "Frontend Developer",
  greeting: {
    id: "Halo, Saya",
    en: "Hello, I'm",
  },
  desc: {
    id: "Saya membangun website interaktif dengan fokus pada animasi halus, performa tinggi, dan desain yang ramah pengguna.",
    en: "I build interactive websites with a focus on smooth animations, high performance, and user-friendly design.",
  },
  image: "../public/herro.png", // Ganti dengan URL foto profil asli Anda nanti
  stats: {
    exp: "3+", // Tahun pengalaman
    projects: "20+",
    clients: "10+",
  },
};

// ... (pastikan export lainnya seperti navItems, projectsData, dll tetap ada di bawahnya)

// ... import icon lainnya ...
// Pastikan tidak ada duplikasi export, tambahkan ini di paling bawah atau gabungkan dengan export yang ada

export const certificatesData = [
  {
    id: 1,
    title: "Google UX Design Professional Certificate",
    issuer: "Coursera & Google",
    date: "Aug 2023",
    image: "https://placehold.co/600x400/2563eb/white?text=Google+UX", // Ganti dengan URL gambar sertifikat asli
    link: "#",
  },
  {
    id: 2,
    title: "Meta Front-End Developer",
    issuer: "Meta",
    date: "Dec 2022",
    image: "https://placehold.co/600x400/0891b2/white?text=Meta+Frontend",
    link: "#",
  },
  {
    id: 3,
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Jan 2024",
    image: "https://placehold.co/600x400/f59e0b/white?text=AWS+Cloud",
    link: "#",
  },
  {
    id: 4,
    title: "React Advanced Patterns",
    issuer: "Epic React by Kent C. Dodds",
    date: "Jun 2023",
    image: "https://placehold.co/600x400/ec4899/white?text=React+Advanced",
    link: "#",
  },
];

export const personalData = {
  name: "Alex Sandy",
  role: "Frontend Architect",
  photoUrl:
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1000&auto=format&fit=crop",
  desc: {
    id: "Membangun pengalaman digital yang pixel-perfect, engaging, dan performa tinggi.",
    en: "Building pixel-perfect, engaging, and accessible digital experiences.",
  },
};

export const certificates = [
  {
    id: 1,
    title: "Google UX Professional",
    issuer: "Coursera",
    year: "2024",
    img: "https://placehold.co/600x400/2563eb/white?text=UX",
  },
  {
    id: 2,
    title: "Meta Frontend Dev",
    issuer: "Meta",
    year: "2023",
    img: "https://placehold.co/600x400/10b981/white?text=Frontend",
  },
];

// ... data personalData dan certificates yang sudah ada ...

export const aboutData = {
  title: "About Me",
  subtitle: "My Journey & Philosophy",
  bio: {
    id: "Saya bukan sekadar programmer; saya adalah problem solver. Dengan latar belakang desain grafis yang beralih ke rekayasa perangkat lunak, saya menjembatani kesenjangan antara estetika visual dan fungsionalitas teknis. Kode saya bersih, mudah dipelihara, dan skalabel.",
    en: "I am not just a programmer; I am a problem solver. With a background in graphic design turned software engineering, I bridge the gap between visual aesthetics and technical functionality. My code is clean, maintainable, and scalable.",
  },
  stats: [
    { label: "Years Exp", value: "5+" },
    { label: "Projects", value: "50+" },
    { label: "Clients", value: "30+" },
    { label: "Coffee", value: "∞" }, // Sedikit humor
  ],
};

export const skills = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind CSS",
  "Node.js",
  "GraphQL",
  "Framer Motion",
  "Docker",
  "Figma",
  "Git",
  "Redux",
  "Jest",
];

// ... data lainnya ...

export const projectsData = [
  {
    id: 1,
    title: "E-Commerce Dashboard",
    category: "Web App",
    image: "https://placehold.co/600x400/1e293b/white?text=Dashboard",
    tech: ["Next.js", "Tailwind", "Recharts"],
    desc: "Admin dashboard dengan analitik realtime dan dark mode.",
  },
  {
    id: 2,
    title: "Crypto Wallet Mobile",
    category: "Mobile",
    image: "https://placehold.co/600x400/4f46e5/white?text=Crypto+App",
    tech: ["React Native", "Redux"],
    desc: "Aplikasi dompet digital dengan keamanan biometrik.",
  },
  {
    id: 3,
    title: "AI Image Generator",
    category: "AI Integration",
    image: "https://placehold.co/600x400/db2777/white?text=AI+Gen",
    tech: ["OpenAI API", "React", "Node.js"],
    desc: "Generate gambar unik menggunakan text prompt.",
  },
  {
    id: 4,
    title: "Luxury Hotel Booking",
    category: "Web App",
    image: "https://placehold.co/600x400/d97706/white?text=Hotel",
    tech: ["Vue.js", "GSAP"],
    desc: "Website booking hotel bintang 5 dengan animasi mewah.",
  },
];

// ... (kode sebelumnya)

export const skillsData = [
  {
    category: "Frontend Power",
    icon: "Layout", // String identifier untuk Lucide Icon
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "Tailwind CSS", level: 98 },
      { name: "Framer Motion", level: 85 },
      { name: "TypeScript", level: 90 },
    ],
  },
  {
    category: "Backend & API",
    icon: "Server",
    skills: [
      { name: "Node.js", level: 80 },
      { name: "GraphQL", level: 75 },
      { name: "PostgreSQL", level: 70 },
      { name: "Firebase", level: 85 },
    ],
  },
  {
    category: "Tools & DevOps",
    icon: "Settings",
    skills: [
      { name: "Git / GitHub", level: 95 },
      { name: "Docker", level: 60 },
      { name: "Figma", level: 80 },
      { name: "Jest / Testing", level: 75 },
    ],
  },
];

export const contactData = {
  // ... title & subtitle tetap sama ...
  title: { id: "Mari Terhubung", en: "Let's Connect" },
  subtitle: {
    id: "Punya ide proyek? Mari diskusikan dan wujudkan menjadi kenyataan.",
    en: "Have a project in mind? Let's discuss and turn it into reality.",
  },
  // Tambahkan ini:
  tabs: {
    email: { id: "Kirim Email", en: "Send Email" },
    wa: { id: "Chat WhatsApp", en: "Chat WhatsApp" },
  },
  whatsappNumber: "6281234567890", // GANTI DENGAN NOMOR ASLI ANDA (Format: 628...)
  form: {
    name: { id: "Nama Anda", en: "Your Name" },
    email: { id: "Email Anda", en: "Your Email" },
    message: { id: "Pesan", en: "Message" },
    btnEmail: { id: "Kirim Email", en: "Send Email" },
    btnWa: { id: "Kirim ke WhatsApp", en: "Send to WhatsApp" },
    sending: { id: "Mengirim...", en: "Sending..." },
    success: { id: "Terkirim!", en: "Sent!" },
  },
  info: [
    { label: "Email", value: "hello@alex.dev" },
    { label: "Location", value: "Jakarta, Indonesia" },
    { label: "Socials", value: "@alexsandy" },
  ],
};

// ... data lainnya

export const experienceData = [
  {
    id: 1,
    role: { id: "Senior Frontend Engineer", en: "Senior Frontend Engineer" },
    company: "Tech Unicorn Inc.",
    period: "2023 - Present",
    desc: {
      id: "Memimpin migrasi arsitektur Monolith ke Micro-frontend. Meningkatkan performa loading website sebesar 40% dan mengelola tim beranggotakan 5 developer.",
      en: "Led the migration from Monolith to Micro-frontend architecture. Improved website loading performance by 40% and managed a team of 5 developers.",
    },
    tech: ["Next.js", "TypeScript", "GraphQL", "AWS"],
  },
  {
    id: 2,
    role: { id: "Frontend Developer", en: "Frontend Developer" },
    company: "Creative Agency XYZ",
    period: "2021 - 2023",
    desc: {
      id: "Mengembangkan 10+ website interaktif untuk klien internasional dengan animasi kompleks menggunakan GSAP dan Three.js.",
      en: "Developed 10+ interactive websites for international clients featuring complex animations using GSAP and Three.js.",
    },
    tech: ["React", "GSAP", "Tailwind", "Figma"],
  },
  {
    id: 3,
    role: { id: "Junior Web Developer", en: "Junior Web Developer" },
    company: "StartUp Indo",
    period: "2019 - 2021",
    desc: {
      id: "Berkontribusi dalam pembuatan dashboard admin dan landing page. Memastikan website responsif di semua perangkat.",
      en: "Contributed to building admin dashboards and landing pages. Ensured website responsiveness across all devices.",
    },
    tech: ["Vue.js", "Bootstrap", "Laravel"],
  },
];

// ... data lainnya

export const educationData = [
  {
    id: 1,
    degree: { id: "Sarjana Ilmu Komputer", en: "B.S. Computer Science" },
    school: "Universitas Indonesia",
    year: "2015 - 2019",
    desc: {
      id: "Fokus pada Rekayasa Perangkat Lunak dan Kecerdasan Buatan. Lulus dengan predikat Cum Laude.",
      en: "Focused on Software Engineering and Artificial Intelligence. Graduated with Cum Laude honors.",
    },
    achievements: [
      "GPA: 3.8/4.0",
      "Best Capstone Project",
      "Head of Coding Club",
    ],
  },
  {
    id: 2,
    degree: { id: "Sertifikasi Full Stack Web", en: "Full Stack Web Bootcamp" },
    school: "Hacktiv8 Indonesia",
    year: "2020",
    desc: {
      id: "Program intensif 12 minggu mempelajari MERN Stack, testing, dan deployment cloud.",
      en: "Intensive 12-week program mastering MERN Stack, automated testing, and cloud deployment.",
    },
    achievements: ["Top 3 Finalist", "Perfect Attendance"],
  },
];

export const projectCategories = ["All", "Web App", "Mobile", "AI Integration"];
