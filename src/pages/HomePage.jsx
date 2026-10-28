import { Hero } from "../components/organisms/Hero";
import { AboutSection } from "../components/organisms/AboutSection";
import { SkillsSection } from "../components/organisms/SkillsSection";
import { ProjectsSection } from "../components/organisms/ProjectsSection";
import { CertificatesSection } from "../components/organisms/CertificatesSection";
import { ContactSection } from "../components/organisms/ContactSection";
import { ExperienceSection } from "../components/organisms/ExperienceSection";
import { EducationSection } from "../components/organisms/EducationSection";

export const HomePage = () => {
  return (
    <div className="w-full">
      <section id="home">
        <Hero />
      </section>

      <section id="about">
        <AboutSection />
      </section>

      <section id="skills">
        <SkillsSection />
      </section>

      <section id="experience">
        <ExperienceSection />
      </section>

      <div id="education">
        <EducationSection />
      </div>

      <section id="projects">
        <ProjectsSection />
      </section>

      <section id="certificates">
        <CertificatesSection />
      </section>

      <section id="contact">
        <ContactSection />
      </section>
    </div>
  );
};

export default HomePage;
