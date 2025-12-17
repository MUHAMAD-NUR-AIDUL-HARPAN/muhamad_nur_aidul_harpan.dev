import { motion } from "framer-motion";

import { Hero } from "../components/organisms/Hero";
import { AboutSection } from "../components/organisms/AboutSection";
import { SkillsSection } from "../components/organisms/SkillsSection";
import { ProjectsSection } from "../components/organisms/ProjectsSection";
import { ContactSection } from "../components/organisms/ContactSection"; // <-- Import
import { ExperienceSection } from "../components/organisms/ExperienceSection";
import { EducationSection } from "../components/organisms/EducationSection";

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Tambahkan id="..." pada setiap pembungkus */}

      <section id="home">
        <Hero />
      </section>

      <section id="about">
        <AboutSection />
      </section>

      <section id="skills">
        {" "}
        {/* Skills gabung di area About/Experience atau sendiri */}
        <SkillsSection />
      </section>

      <section id="experience">
        <ExperienceSection />
      </section>

      <div id="education">
        {" "}
        {/* Opsional, bisa digabung experience */}
        <EducationSection />
      </div>

      <section id="projects">
        <ProjectsSection />
      </section>

      <section id="contact">
        <ContactSection />
      </section>
    </motion.div>
  );
};

export default HomePage;
