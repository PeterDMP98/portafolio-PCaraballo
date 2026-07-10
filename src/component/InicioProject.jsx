/* ============================================
   INICIOPROJECT / PROYECTOS DESTACADOS (3)
   ============================================
   - Muestra solo los 3 proyectos principales
   - Botón "Ver Más" que navega a /projects
*/

import { Link } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import { myProjects } from "../config/data";
import CardProject from "./CardProject";
import "../styles/projects.css";

function InicioProject() {
  const { t } = useLanguage();

  return (
    <section id="projects" className="projects">
      <div className="section-header">
        <span className="section-tag">{t("projects.title")}</span>
        <h2 className="section-title">{t("projects.title")}</h2>
        <p className="section-subtitle">{t("projects.subtitle")}</p>
        <div className="section-divider" />
      </div>

      {/* Grid de proyectos destacados */}
      <div className="projects-grid">
        {myProjects.map((project) => (
          <CardProject key={project.id} project={project} />
        ))}
      </div>

      {/* Botón Ver Más que navega a /projects */}
      <div className="projects-toggle">
        <Link to="/projects" className="btn btn-outline">
          {t("projects.viewMore")}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </Link>
      </div>
    </section>
  );
}

export default InicioProject;
