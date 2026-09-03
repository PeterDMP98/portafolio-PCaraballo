/* ============================================
   CARDPROJECT / TARJETA DE PROYECTO INDIVIDUAL
   ============================================
   - Muestra imagen, nombre, versión, descripción, stack
   - Enlaces a demo y código
   - Botón "Ver más" que abre un modal con toda la
     información del proyecto (funciones, actualizaciones,
     descargable y enlaces)
*/

import { useState, useEffect, useCallback } from "react";
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
  const [open, setOpen] = useState(false);
  const [imgIndex, setImgIndex] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const status = statusConfig[project.status] || statusConfig.completed;
  const category = categoryConfig[project.category] || { label_es: project.category, label_en: project.category };
  const features = lang === "es" ? project.features : project.features_en;
  const hasFeatures = Array.isArray(features) && features.length > 0;
  const hasUpdates = Array.isArray(project.updates) && project.updates.length > 0;
  const images = project.images?.length ? project.images : [project.image];
  const hasMultiple = images.length > 1;

  const goTo = useCallback((dir) => {
    setImgIndex((prev) => (prev + dir + images.length) % images.length);
  }, [images.length]);

  const openModal = () => {
    setImgIndex(0);
    setLightboxOpen(false);
    setOpen(true);
  };

  const closeModal = () => setOpen(false);

  useEffect(() => {
    if (!lightboxOpen) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goTo(1);
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goTo(-1);
      } else if (e.key === "Escape") {
        setLightboxOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxOpen, goTo]);

  return (
    <>
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
          <div className="project-card-title-row">
            <h3 className="project-card-title">{project.name}</h3>
            {project.version && (
              <span className="project-version">v{project.version}</span>
            )}
          </div>
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
            ) : null}
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

          {/* Botón Ver más */}
          <button className="project-card-more" onClick={openModal}>
            {t("projects.viewDetails")}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      </article>

      {/* Modal de detalle */}
      {open && (
        <div
          className="project-modal-overlay"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeModal();
          }}
        >
          <div className="project-modal">
            <button
              className="project-modal-close"
              onClick={closeModal}
              aria-label={t("common.close")}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Header con carrusel de imágenes */}
            <div className="project-modal-hero">
              <img
                key={imgIndex}
                src={images[imgIndex]}
                alt={project.name}
                className="project-modal-hero-img"
              />
              {hasMultiple && (
                <>
                  <button
                    className="project-modal-nav project-modal-nav-left"
                    onClick={() => goTo(-1)}
                    aria-label={t("projects.prevImage")}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button
                    className="project-modal-nav project-modal-nav-right"
                    onClick={() => goTo(1)}
                    aria-label={t("projects.nextImage")}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </>
              )}
              <button
                className="project-modal-zoom"
                onClick={() => setLightboxOpen(true)}
                aria-label={t("projects.expandImage")}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 3 21 3 21 9" />
                  <polyline points="9 21 3 21 3 15" />
                  <line x1="21" y1="3" x2="14" y2="10" />
                  <line x1="3" y1="21" x2="10" y2="14" />
                </svg>
              </button>
              <div className="project-modal-hero-bottom">
                <div className="project-modal-badges">
                  <span className={`project-badge ${status.className}`}>
                    {lang === "es" ? status.label_es : status.label_en}
                  </span>
                  <span className="project-badge badge-category">
                    {lang === "es" ? category.label_es : category.label_en}
                  </span>
                  {project.isAI && (
                    <span className="project-badge badge-ai">IA</span>
                  )}
                  {project.version && (
                    <span className="project-version project-version-modal">v{project.version}</span>
                  )}
                </div>
                <div className="project-modal-hud">
                  {hasMultiple && (
                    <span className="project-modal-counter">
                      {imgIndex + 1} / {images.length}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="project-modal-body">
              <h3 className="project-modal-title">{project.name}</h3>
              <p className="project-modal-description">
                {lang === "es" ? project.description : project.description_en}
              </p>

              {/* Stack */}
              <div className="project-card-stack">
                {project.stack.map((tech) => (
                  <span key={tech} className="project-tech">
                    {tech}
                  </span>
                ))}
              </div>

              {/* Funciones */}
              {hasFeatures && (
                <div className="project-modal-section">
                  <p className="project-modal-section-title">
                    {t("projects.features")}
                  </p>
                  <ul className="project-modal-list">
                    {features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Actualizaciones */}
              {hasUpdates && (
                <div className="project-modal-section">
                  <p className="project-modal-section-title">
                    {t("projects.updates")}
                  </p>
                  <div className="project-modal-updates">
                    {project.updates.map((upd, i) => {
                      const label = lang === "es" ? upd.label_es : upd.label_en;
                      const changes = lang === "es" ? upd.changes_es : upd.changes_en;
                      return (
                        <div className="project-modal-update" key={i}>
                          <div className="project-modal-update-head">
                            <span className="project-modal-update-version">v{upd.version}</span>
                            {upd.date && (
                              <span className="project-modal-update-date">{upd.date}</span>
                            )}
                          </div>
                          {label && <p className="project-modal-update-label">{label}</p>}
                          {Array.isArray(changes) && changes.length > 0 && (
                            <ul className="project-modal-list project-modal-changes">
                              {changes.map((change, j) => (
                                <li key={j}>{change}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Acciones */}
              {(project.link || project.github || project.download) && (
                <div className="project-modal-actions">
                  {project.download ? (
                    <a
                      href={project.download}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-modal-action project-modal-action-primary"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                        <polyline points="7 10 12 15 17 10" />
                        <line x1="12" y1="15" x2="12" y2="3" />
                      </svg>
                      {t("projects.download")}
                    </a>
                  ) : project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-modal-action project-modal-action-primary"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                        <polyline points="15 3 21 3 21 9" />
                        <line x1="10" y1="14" x2="21" y2="3" />
                      </svg>
                      {t("projects.demo")}
                    </a>
                  ) : null}
                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-modal-action"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                      </svg>
                      {t("projects.code")}
                    </a>
                  ) : null}
                </div>
              )}
            </div>
          </div>

          {/* Lightbox: imagen ampliada a pantalla completa */}
          {lightboxOpen && (
            <div
              className="project-lightbox-overlay"
              onClick={(e) => {
                if (e.target === e.currentTarget) setLightboxOpen(false);
              }}
            >
              <button
                className="project-lightbox-close"
                onClick={() => setLightboxOpen(false)}
                aria-label={t("common.close")}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
              <img
                key={imgIndex}
                src={images[imgIndex]}
                alt={project.name}
                className="project-lightbox-img"
              />
              {hasMultiple && (
                <>
                  <button
                    className="project-lightbox-nav project-lightbox-nav-left"
                    onClick={() => goTo(-1)}
                    aria-label={t("projects.prevImage")}
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>
                  <button
                    className="project-lightbox-nav project-lightbox-nav-right"
                    onClick={() => goTo(1)}
                    aria-label={t("projects.nextImage")}
                  >
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                  <span className="project-lightbox-counter">
                    {imgIndex + 1} / {images.length}
                  </span>
                </>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default CardProject;
