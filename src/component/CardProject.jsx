/* ============================================
   CARDPROJECT / TARJETA DE PROYECTO INDIVIDUAL
   ============================================
   - Muestra imagen, nombre, descripción, stack
   - Enlaces a demo y código (placeholder)
   - Badge de estado y categoría
*/

import { useLanguage } from "../hooks/useLanguage";
import "../styles/cardProject.css";

// Configuración de badges para estados
const statusConfig = {
  completed: {
    label_es: "Completado",
    label_en: "Completed",
    className: "status-completed",
  },
  inDevelopment: {
    label_es: "En Desarrollo",
    label_en: "In Development",
    className: "status-dev",
  },
  planned: {
    label_es: "Planificado",
    label_en: "Planned",
    className: "status-planned",
  },
};

// Configuración de badges para categorías
const categoryConfig = {
  web: { label_es: "Web", label_en: "Web" },
  mobile: { label_es: "Móvil", label_en: "Mobile" },
  desktop: { label_es: "Escritorio", label_en: "Desktop" },
  game: { label_es: "Juego", label_en: "Game" },
  ai: { label_es: "IA", label_en: "AI" },
  components: { label_es: "Componentes", label_en: "Components" },
};

function CardProject({ project }) {
  const { t, lang } = useLanguage();

  const status = statusConfig[project.status] || statusConfig.completed;
  const category = categoryConfig[project.category] || { label_es: project.category, label_en: project.category };

  return (
    <article className="project-card">
      {/* Imagen del proyecto */}
      <div className="project-card-image">
        <img
          src={project.image}
          alt={project.name}
          loading="lazy"
        />
        <div className="project-card-overlay">
          <div className="project-card-badges">
            <span className={`project-badge ${status.className}`}>
              {lang === "es" ? status.label_es : status.label_en}
            </span>
            <span className="project-badge badge-category">
              {lang === "es" ? category.label_es : category.label_en}
            </span>
            {project.isAI && (
              <span className="project-badge badge-ai">IA</span>
            )}
          </div>
        </div>
      </div>

      {/* Información del proyecto */}
      <div className="project-card-body">
        <h3 className="project-card-title">{project.name}</h3>
        <p className="project-card-description">
          {lang === "es" ? project.description : project.description_en}
        </p>

        {/* Stack tecnológico */}
        <div className="project-card-stack">
          {project.stack.map((tech) => (
            <span key={tech} className="project-tech">
              {tech}
            </span>
          ))}
        </div>

        {/* Enlaces */}
        <div className="project-card-links">
          {project.link ? (
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              {t("projects.demo")}
            </a>
          ) : (
            <span className="project-link project-link-disabled">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                <polyline points="15 3 21 3 21 9" />
                <line x1="10" y1="14" x2="21" y2="3" />
              </svg>
              {t("projects.addLinks")}
            </span>
          )}
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="project-link"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              {t("projects.code")}
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}

export default CardProject;
