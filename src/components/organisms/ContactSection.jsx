import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  CheckCircle,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import { useGlobal } from "../../context/GlobalContext";
import { contactData } from "../../data/content";
import { InputGroup } from "../atoms/InputGroup";

export const ContactSection = () => {
  const { lang } = useGlobal();
  const t = contactData;

  // State untuk Tab Aktif ('email' atau 'whatsapp')
  const [activeTab, setActiveTab] = useState("email");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Logic Kirim Email (Simulasi)
  const handleEmailSubmit = (e) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 3000);
    }, 2000);
  };

  // Logic Kirim WhatsApp (Real)
  const handleWASubmit = (e) => {
    e.preventDefault();
    // Format pesan: "Halo, saya [Nama]. [Pesan]"
    const text = `Halo, saya ${formData.name}. ${formData.message}`;
    const url = `https://wa.me/${t.whatsappNumber}?text=${encodeURIComponent(
      text
    )}`;

    // Buka WhatsApp di tab baru
    window.open(url, "_blank");
  };

  return (
    <section className="py-24 bg-white dark:bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* LEFT COLUMN: Info & Title */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="flex flex-col justify-center h-full"
        >
          <h2 className="text-5xl font-black mb-6 tracking-tight">
            {lang === "id" ? t.title.id : t.title.en}
            <span className="text-blue-600">.</span>
          </h2>
          <p className="text-xl text-gray-500 mb-12 max-w-md">
            {lang === "id" ? t.subtitle.id : t.subtitle.en}
          </p>

          <div className="space-y-6">
            {/* Info Cards */}
            <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl flex items-center gap-4 border border-gray-100 dark:border-gray-800">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-full">
                <Mail size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">
                  Email
                </p>
                <p className="font-medium text-lg">{t.info[0].value}</p>
              </div>
            </div>

            <div className="p-6 bg-gray-50 dark:bg-gray-900 rounded-2xl flex items-center gap-4 border border-gray-100 dark:border-gray-800">
              <div className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 rounded-full">
                <MessageCircle size={24} />
              </div>
              <div>
                <p className="text-xs font-bold text-gray-400 uppercase">
                  WhatsApp
                </p>
                <p className="font-medium text-lg">+62 812-3456-7890</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: The Complex Form Switcher */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-gray-900 p-2 rounded-3xl border border-gray-200 dark:border-gray-800 shadow-2xl"
        >
          {/* 1. Toggle Switcher (Tab) */}
          <div className="flex bg-gray-100 dark:bg-black p-1 rounded-2xl mb-6 relative">
            {["email", "whatsapp"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold relative z-10 transition-colors duration-300 ${
                  activeTab === tab
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-500"
                }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="activeTabBg"
                    className="absolute inset-0 bg-white dark:bg-gray-800 shadow-sm rounded-xl border border-gray-200 dark:border-gray-700"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  {tab === "email" ? (
                    <Mail size={16} />
                  ) : (
                    <MessageCircle size={16} />
                  )}
                  {tab === "email"
                    ? lang === "id"
                      ? t.tabs.email.id
                      : t.tabs.email.en
                    : lang === "id"
                    ? t.tabs.wa.id
                    : t.tabs.wa.en}
                </span>
              </button>
            ))}
          </div>

          {/* 2. Dynamic Form Content */}
          <div className="px-6 pb-6">
            <AnimatePresence mode="wait">
              {/* --- FORM EMAIL --- */}
              {activeTab === "email" ? (
                <motion.form
                  key="email-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleEmailSubmit}
                >
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
                    label={
                      lang === "id" ? t.form.message.id : t.form.message.en
                    }
                    textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  />

                  <button
                    type="submit"
                    disabled={status !== "idle"}
                    className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center gap-2 shadow-lg ${
                      status === "success"
                        ? "bg-green-500"
                        : "bg-blue-600 hover:bg-blue-700"
                    }`}
                  >
                    {status === "idle"
                      ? lang === "id"
                        ? t.form.btnEmail.id
                        : t.form.btnEmail.en
                      : status === "sending"
                      ? lang === "id"
                        ? t.form.sending.id
                        : t.form.sending.en
                      : lang === "id"
                      ? t.form.success.id
                      : t.form.success.en}
                  </button>
                </motion.form>
              ) : (
                /* --- FORM WHATSAPP --- */
                <motion.form
                  key="wa-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  onSubmit={handleWASubmit}
                >
                  <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-xl text-green-800 dark:text-green-300 text-sm">
                    {lang === "id"
                      ? "Pesan ini akan membuka WhatsApp Web/App Anda secara otomatis."
                      : "This message will open your WhatsApp Web/App automatically."}
                  </div>

                  <InputGroup
                    label={lang === "id" ? t.form.name.id : t.form.name.en}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                  <InputGroup
                    label={
                      lang === "id" ? t.form.message.id : t.form.message.en
                    }
                    textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                  />

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl font-bold text-white bg-green-600 hover:bg-green-700 shadow-lg hover:shadow-green-500/30 transition-all flex items-center justify-center gap-2"
                  >
                    {lang === "id" ? t.form.btnWa.id : t.form.btnWa.en}{" "}
                    <Send size={18} />
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
