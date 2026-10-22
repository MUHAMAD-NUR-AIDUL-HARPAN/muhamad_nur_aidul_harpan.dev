import { Github, Linkedin, Instagram } from "lucide-react";
import { contactData } from "../../data/content";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: contactData.socials.github, label: "GitHub" },
    {
      icon: Linkedin,
      href: contactData.socials.linkedin,
      label: "LinkedIn",
    },
    {
      icon: Instagram,
      href: contactData.socials.instagram,
      label: "Instagram",
    },
  ];

  return (
    <footer className="w-full bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* BAGIAN KIRI: Identitas */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-200 tracking-wide uppercase">
              Muhamad Nur Aidul Harpan
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Software Engineer &nbsp;&bull;&nbsp; &copy; {currentYear}
            </p>
          </div>

          {/* BAGIAN KANAN: Ikon Sosial Media (Fixed Size & Centered) */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social, idx) => (
              <a
                key={idx}
                href={social.href}
                target="_blank"
                rel="noreferrer"
                // KUNCI KERAPIHAN ADA DI SINI:
                // 1. 'w-10 h-10': Mengunci ukuran tombol agar sama persis
                // 2. 'flex items-center justify-center': Memaksa ikon tepat di tengah
                // 3. 'rounded-full': Lingkaran sempurna (paling rapi)
                className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 dark:bg-slate-800 text-slate-400 dark:text-slate-500 border border-slate-200 dark:border-slate-700 hover:bg-blue-600 hover:text-white hover:border-blue-600 dark:hover:bg-blue-600 dark:hover:text-white dark:hover:border-blue-600 transition-all duration-300"
                aria-label={social.label}
              >
                <social.icon size={18} strokeWidth={2} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};
