import { useState } from "react";
import { Send, Mail, MapPin, MessageCircle } from "lucide-react";
import { useGlobal } from "../../context/GlobalContext";
import { contactData } from "../../data/content";
import { InputGroup } from "../atoms/InputGroup";
import { TextHighlighter } from "../atoms/TextHighlighter";

const maskStyle = {
  WebkitMask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
  WebkitMaskComposite: "xor",
  maskComposite: "exclude",
};

export const ContactSection = () => {
  const { lang } = useGlobal();
  const t = contactData;
  const [activeTab, setActiveTab] = useState("email");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const response = await fetch("https://formsubmit.co/ajax/muhamadnurharpan@gmail.com", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _subject: `Pesan Baru dari Portofolio: ${formData.name}`,
          _template: "table",
          _captcha: "false",
        }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        throw new Error("Gagal mengirim email");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const handleWASubmit = (e) => {
    e.preventDefault();
    const cleanNumber = (t.whatsappNumber || "6283805480105").replace(/\D/g, "");
    const formattedText =
      `*Halo Aidul, saya menghubungi melalui Website Portofolio*\n\n` +
      `👤 *Nama:* ${formData.name}\n` +
      `💬 *Pesan:* ${formData.message}`;
    window.open(`https://wa.me/${cleanNumber}?text=${encodeURIComponent(formattedText)}`, "_blank");
  };

  const contactCards = [
    { label: "Email", value: t.email, icon: Mail },
    { label: "WhatsApp", value: t.whatsappDisplay || t.whatsappNumber, icon: MessageCircle },
    { label: lang === "id" ? "Lokasi" : "Location", value: t.location, icon: MapPin },
  ];

  return (
    <section className="py-24 bg-slate-50 dark:bg-slate-900 relative overflow-hidden">
      <div className="hidden md:block absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] dark:bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        <div data-aos="fade-up" className="flex flex-col justify-center h-full">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 shadow-sm">
              <Mail size={20} />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
              {lang === "id" ? "Hubungi Saya" : "Get In Touch"}
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4 relative inline-block z-10 self-start">
            <TextHighlighter />
            <span className="relative px-2 text-slate-900 dark:text-white">
              {lang === "id" ? t.title.id : t.title.en}
            </span>
          </h2>
          <p className="text-lg text-slate-500 mb-10 max-w-md">
            {lang === "id" ? t.subtitle.id : t.subtitle.en}
          </p>

          <div className="space-y-6">
            {contactCards.map((card, idx) => {
              const Icon = card.icon;
              return (
                <div
                  key={idx}
                  className="p-6 bg-slate-50 dark:bg-slate-900 rounded-2xl flex items-center gap-4 border border-slate-100 dark:border-slate-800 hover:border-blue-500/40 hover:shadow-xl hover:shadow-blue-500/10 hover:translate-x-2 transition-all duration-400 ease-out"
                >
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full">
                    <Icon size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase">{card.label}</p>
                    <p className="font-medium text-lg">{card.value}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div
          data-aos="fade-up"
          data-aos-delay="150"
          className="bg-white dark:bg-slate-900 p-2 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl"
        >
          <div className="flex bg-slate-100 dark:bg-black p-1 rounded-2xl mb-6 relative">
            {["email", "whatsapp"].map((tab) => {
              const isActive = activeTab === tab;
              const TabIcon = tab === "email" ? Mail : MessageCircle;
              const tabTitle = tab === "email"
                ? (lang === "id" ? t.tabs.email.id : t.tabs.email.en)
                : (lang === "id" ? t.tabs.wa.id : t.tabs.wa.en);

              return (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold relative z-10 transition-all duration-400 ease-out cursor-pointer ${
                    isActive
                      ? "text-slate-900 dark:text-white bg-white dark:bg-slate-800 shadow-sm border border-slate-200 dark:border-slate-700"
                      : "text-slate-500 hover:text-slate-800 dark:hover:text-white"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <TabIcon size={16} />
                    {tabTitle}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="px-6 pb-6">
            {activeTab === "email" ? (
              <form onSubmit={handleEmailSubmit} className="transition-opacity duration-300">
                <InputGroup
                  label={lang === "id" ? t.form.name.id : t.form.name.en}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
                <InputGroup
                  label={lang === "id" ? t.form.email.id : t.form.email.en}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                <InputGroup
                  label={lang === "id" ? t.form.message.id : t.form.message.en}
                  textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                />

                <div className="relative group/submit w-full mt-2">
                  <div
                    className="absolute -inset-[2px] rounded-xl p-[2px] overflow-hidden opacity-0 group-hover/submit:opacity-100 blur-[3px] transition-all duration-500 pointer-events-none"
                    style={maskStyle}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl" />
                  </div>
                  <div
                    className="absolute -inset-[1.5px] rounded-xl p-[1.5px] overflow-hidden opacity-0 group-hover/submit:opacity-100 transition-all duration-500 pointer-events-none z-10"
                    style={maskStyle}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-400 rounded-xl" />
                  </div>

                  <button
                    type="submit"
                    disabled={status !== "idle"}
                    className={`relative w-full py-4 rounded-xl font-bold text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg group-hover/submit:shadow-xl group-hover/submit:shadow-blue-500/25 cursor-pointer z-0 ${
                      status === "success" ? "bg-emerald-500" : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {status === "idle"
                      ? (lang === "id" ? t.form.btnEmail.id : t.form.btnEmail.en)
                      : status === "sending"
                      ? (lang === "id" ? t.form.sending.id : t.form.sending.en)
                      : status === "error"
                      ? (lang === "id" ? "Gagal Kirim, Coba Lagi" : "Failed to Send, Retry")
                      : (lang === "id" ? t.form.success.id : t.form.success.en)}
                  </button>
                </div>
              </form>
            ) : (
              <form onSubmit={handleWASubmit} className="transition-opacity duration-300">
                <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl text-blue-800 dark:text-blue-300 text-sm">
                  {lang === "id"
                    ? "Pesan ini akan membuka WhatsApp Web/App Anda secara otomatis."
                    : "This message will open your WhatsApp Web/App automatically."}
                </div>

                <InputGroup
                  label={lang === "id" ? t.form.name.id : t.form.name.en}
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <InputGroup
                  label={lang === "id" ? t.form.message.id : t.form.message.en}
                  textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />

                <div className="relative group/wa w-full mt-2">
                  <div
                    className="absolute -inset-[2px] rounded-xl p-[2px] overflow-hidden opacity-0 group-hover/wa:opacity-100 blur-[3px] transition-all duration-500 pointer-events-none"
                    style={maskStyle}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-green-500 rounded-xl" />
                  </div>
                  <div
                    className="absolute -inset-[1.5px] rounded-xl p-[1.5px] overflow-hidden opacity-0 group-hover/wa:opacity-100 transition-all duration-500 pointer-events-none z-10"
                    style={maskStyle}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-green-400 rounded-xl" />
                  </div>

                  <button
                    type="submit"
                    className="relative w-full py-4 rounded-xl font-bold text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg hover:shadow-emerald-500/30 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer z-0"
                  >
                    {lang === "id" ? t.form.btnWa.id : t.form.btnWa.en}{" "}
                    <Send
                      size={18}
                      className="group-hover/wa:translate-x-1 group-hover/wa:-translate-y-0.5 transition-transform duration-300"
                    />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
