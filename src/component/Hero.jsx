/* ============================================
   HERO / SECCIÓN DE INICIO
   ============================================
   - Muestra nombre, rol, descripción
   - Botones CTA: Proyectos, Contacto
   - Rol con efecto de deslizamiento vertical
*/

import { useEffect, useState, useRef, useMemo } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { myInfo } from "../config/data";
import "../styles/hero.css";

function Hero() {
  const { t, lang } = useLanguage();
  const info = myInfo[0];

  // Roles con efecto de deslizamiento vertical
  const roles = useMemo(() => [
    lang === "es" ? "Desarrollador Full Stack" : "Full Stack Developer",
    lang === "es" ? "Creador de Experiencias Web" : "Web Experience Creator",
    lang === "es" ? "Innovador Tecnológico" : "Tech Innovator",
  ], [lang]);

  const roleRef = useRef(0);
  const [displayRole, setDisplayRole] = useState(roles[0]);
  const [nextRole, setNextRole] = useState(null);
  const [phase, setPhase] = useState("show"); // "show" | "exit" | "enter"

  useEffect(() => {
    let timer;

    const cycle = () => {
      setPhase("exit");

      timer = setTimeout(() => {
        const next = (roleRef.current + 1) % roles.length;
        roleRef.current = next;
        setNextRole(roles[next]);
        setPhase("enter");
      }, 450);

      timer = setTimeout(() => {
        setDisplayRole(roles[roleRef.current]);
        setNextRole(null);
        setPhase("show");
        timer = setTimeout(cycle, 3000);
      }, 950);
    };

    timer = setTimeout(cycle, 3000);

    return () => clearTimeout(timer);
  }, [roles]);

  // Reinicia al cambiar idioma
  useEffect(() => {
    roleRef.current = 0;
    const t = setTimeout(() => {
      setDisplayRole(roles[0]);
      setNextRole(null);
      setPhase("show");
    }, 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="home" className="hero">
      <div className="hero-content">
        <div className="hero-badge">
          <span className="hero-badge-dot" />
          {lang === "es" ? "Disponible para proyectos" : "Available for projects"}
        </div>

        <h1 className="hero-greeting">
          {t("hero.greeting")}{" "}
          <span className="hero-name">{info.name.split(" ")[0]}</span>
        </h1>

        <div className="hero-role-wrapper">
          {phase !== "enter" && (
            <span className={`hero-role ${phase === "exit" ? "role-exit" : ""}`}>
              {displayRole}
            </span>
          )}
          {phase === "enter" && nextRole && (
            <span className="hero-role role-enter">{nextRole}</span>
          )}
        </div>

        <p className="hero-description">
          {lang === "es" ? info.about.split(".")[0] + "." : info.about_en.split(".")[0] + "."}
        </p>

        <div className="hero-cta">
          <button
            className="btn btn-primary"
            onClick={() => scrollToSection("projects")}
          >
            {t("hero.cta.projects")}
          </button>
          <button
            className="btn btn-outline"
            onClick={() => scrollToSection("contact")}
          >
            {t("hero.cta.contact")}
          </button>
        </div>

        <div className="hero-social">
          <a
            href={info.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social-link"
            aria-label="GitHub"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
          </a>
          <a
            href={info.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hero-social-link"
            aria-label="LinkedIn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </a>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-shape" />
      </div>
    </section>
  );
}

export default Hero;
