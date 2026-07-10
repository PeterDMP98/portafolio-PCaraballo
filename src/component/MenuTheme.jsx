/*============================================
  MENUTHEME / SELECTOR DE TEMAS (COLORES)
  ============================================
  - Muestra todos los temas disponibles
  - Vista previa con 3 colores
  - Tema activo resaltado
  - Incluye temas personalizados generados
*/

import { useTheme } from "../hooks/useTheme";
import { useLanguage } from "../hooks/useLanguage";
import { themeIcons } from "../config/dataStyle";
import "../styles/menuTheme.css";

function MenuTheme({ onClose }) {
  const { theme, themes, changeTheme } = useTheme();
  const { t } = useLanguage();

  return (
    <div className="menu-theme-panel">
      <div className="menu-theme-header">
        <span>{t("nav.theme")}</span>
        <button className="menu-theme-close" onClick={onClose}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
      </div>

      <div className="menu-theme-grid">
        {themes.map((t) => {
          const Icon = themeIcons[t.icon] || themeIcons.light;
          const isActive = theme.id === t.id;
          const previewColors = t.preview || [t.colors?.background || "#ccc", t.colors?.primary || "#666", t.colors?.text || "#333"];

          return (
            <button
              key={t.id}
              className={`menu-theme-item ${isActive ? "active" : ""}`}
              onClick={() => changeTheme(t.id)}
              title={t.name}
            >
              {/* Vista previa de colores */}
              <div className="menu-theme-preview">
                {previewColors.map((color, i) => (
                  <span
                    key={i}
                    className="menu-theme-swatch"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>

              {/* Nombre e ícono */}
              <div className="menu-theme-info">
                <Icon className="menu-theme-icon" />
                <span className="menu-theme-name">{t.name}</span>
              </div>

              {/* Check activo */}
              {isActive && (
                <span className="menu-theme-check">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                  </svg>
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default MenuTheme;
