/* ============================================
   PROJECTS / PÁGINA COMPLETA DE PROYECTOS
   ============================================
   - Muestra TODOS los proyectos
   - Filtros completos: estado, categoría, lenguaje, IA
   - Navegación independiente
*/

import { useState } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { allProjects, getUniqueLanguages } from "../config/data";
import CardProject from "../component/CardProject";
import "../styles/projects.css";

function Projects() {
  const { t, lang } = useLanguage();

  // Estados de filtros
  const [activeFilter, setActiveFilter] = useState("all");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeLanguage, setActiveLanguage] = useState("all");

  const uniqueLanguages = getUniqueLanguages();

  // Opciones de filtros
  const statusFilters = [
    { id: "all", label_es: "Todos", label_en: "All" },
    { id: "completed", label_es: "Completados", label_en: "Completed" },
    { id: "inDevelopment", label_es: "En Desarrollo", label_en: "In Development" },
    { id: "planned", label_es: "Planificados", label_en: "Planned" },
  ];

  const categoryFilters = [
    { id: "all", label_es: "Todas", label_en: "All" },
    { id: "web", label_es: "Web", label_en: "Web" },
    { id: "mobile", label_es: "Móvil", label_en: "Mobile" },
    { id: "desktop", label_es: "Escritorio", label_en: "Desktop" },
    { id: "game", label_es: "Juegos", label_en: "Games" },
    { id: "ai", label_es: "IA", label_en: "AI" },
    { id: "components", label_es: "Componentes", label_en: "Components" },
  ];

  const specialFilters = [
    { id: "madeWithAI", label_es: "Hechos con IA", label_en: "Made with AI" },
  ];

  // Aplica todos los filtros combinados
  const getFilteredProjects = () => {
    let projects = [...allProjects];

    // Filtro por estado
    if (activeFilter !== "all") {
      if (activeFilter === "madeWithAI") {
        projects = projects.filter((p) => p.isAI);
      } else {
        projects = projects.filter((p) => p.status === activeFilter);
      }
    }

    // Filtro por categoría
    if (activeCategory !== "all") {
      projects = projects.filter((p) => p.category === activeCategory);
    }

    // Filtro por lenguaje
    if (activeLanguage !== "all") {
      projects = projects.filter((p) => p.stack.includes(activeLanguage));
    }

    return projects;
  };

  const filteredProjects = getFilteredProjects();

  return (
    <div className="projects-page">
      <div className="section-header">
        <span className="section-tag">{t("projects.title")}</span>
        <h2 className="section-title">{t("projects.title")}</h2>
        <p className="section-subtitle">{t("projects.subtitle")}</p>
        <div className="section-divider" />
      </div>

      {/* Filtros */}
      <div className="projects-filters">
        {/* Filtro por estado */}
        <div className="filter-group">
          <span className="filter-label">{t("projects.filter.status")}</span>
          <div className="filter-chips">
            {statusFilters.map((f) => (
              <button
                key={f.id}
                className={`filter-chip ${activeFilter === f.id ? "active" : ""}`}
                onClick={() => setActiveFilter(f.id)}
              >
                {lang === "es" ? f.label_es : f.label_en}
              </button>
            ))}
            {specialFilters.map((f) => (
              <button
                key={f.id}
                className={`filter-chip ${activeFilter === f.id ? "active" : ""}`}
                onClick={() => setActiveFilter(f.id)}
              >
                {lang === "es" ? f.label_es : f.label_en}
              </button>
            ))}
          </div>
        </div>

        {/* Filtro por categoría */}
        <div className="filter-group">
          <span className="filter-label">{t("projects.filter.category")}</span>
          <div className="filter-chips">
            {categoryFilters.map((f) => (
              <button
                key={f.id}
                className={`filter-chip ${activeCategory === f.id ? "active" : ""}`}
                onClick={() => setActiveCategory(f.id)}
              >
                {lang === "es" ? f.label_es : f.label_en}
              </button>
            ))}
          </div>
        </div>

        {/* Filtro por lenguaje */}
        <div className="filter-group">
          <span className="filter-label">{t("projects.filter.language")}</span>
          <div className="filter-chips">
            <button
              className={`filter-chip ${activeLanguage === "all" ? "active" : ""}`}
              onClick={() => setActiveLanguage("all")}
            >
              {lang === "es" ? "Todos" : "All"}
            </button>
            {uniqueLanguages.map((tech) => (
              <button
                key={tech}
                className={`filter-chip ${activeLanguage === tech ? "active" : ""}`}
                onClick={() => setActiveLanguage(tech)}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Grid de proyectos filtrados */}
      <div className="projects-grid">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <CardProject key={project.id} project={project} />
          ))
        ) : (
          <div className="projects-empty">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
            <p>{t("projects.empty")}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;
