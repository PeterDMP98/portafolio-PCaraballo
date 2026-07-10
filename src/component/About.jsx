/* ============================================
  ABOUT / SOBRE MÍ
  ============================================
  - Información personal, descripción
  - Tarjetas de formación académica
*/

import { useLanguage } from "../hooks/useLanguage";
import { myInfo } from "../config/data";
import "../styles/about.css";

function About() {
  const { t, lang } = useLanguage();
  const info = myInfo[0];

  return (
    <section id="about" className="about">
      <div className="section-header">
        <span className="section-tag">{t("about.title")}</span>
        <h2 className="section-title">{t("about.title")}</h2>
        <div className="section-divider" />
      </div>

      <div className="about-content">
        <div className="about-text">
          <p>{lang === "es" ? info.about : info.about_en}</p>

          <div className="about-details">
            <div className="about-detail">
              <span className="about-detail-label">
                {lang === "es" ? "Ubicación" : "Location"}
              </span>
              <span className="about-detail-value">
                {lang === "es" ? "Colombia" : "Colombia"}
              </span>
            </div>
            <div className="about-detail">
              <span className="about-detail-label">
                {lang === "es" ? "Disponibilidad" : "Available"}
              </span>
              <span className="about-detail-value about-status">
                <span className="status-dot" />
                {lang === "es" ? "Inmediata" : "Immediate"}
              </span>
            </div>
          </div>
        </div>

        <div className="about-studies">
          <h3 className="about-studies-title">{t("about.study")}</h3>
          <div className="studies-grid">
            {info.study.map((study, index) => (
              <div key={index} className="study-card">
                <div className="study-card-icon">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                  </svg>
                </div>
                <div className="study-card-info">
                  <span className="study-card-degree">
                    {lang === "es" ? study.degree : study.degree_en}
                  </span>
                  <span className="study-card-institution">{study.institution}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
