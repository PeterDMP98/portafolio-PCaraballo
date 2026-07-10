/* ============================================
  MENU / NAVEGACIÓN PRINCIPAL
  ============================================
  - En home: usa anclas para scroll suave
  - En /projects: links navegan con React Router
  - Panel de temas deslizable desde arriba
  - Selector de idioma
*/

import { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../hooks/useLanguage";
import { myInfo } from "../config/data";
import MenuTheme from "./MenuTheme";
import "../styles/menu.css";

function Menu() {
  const { t, lang, switchLang } = useLanguage();
  const info = myInfo[0];
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";

  // Estados
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isThemePanelOpen, setIsThemePanelOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isOverflow, setIsOverflow] = useState(false);
  const navbarRef = useRef(null);

  // Detectar scroll
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navegar a sección en home o cambiar de página
  const handleNavigation = (sectionId) => {
    setIsMenuOpen(false);
    setIsThemePanelOpen(false);

    if (sectionId === "projects" && !isHome) {
      navigate("/");
      return;
    }

    if (sectionId === "home" && !isHome) {
      navigate("/");
      return;
    }

    if (isHome) {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // Detectar overflow de los links de navegación
  useEffect(() => {
    const nav = navbarRef.current;
    if (!nav) return;

    const checkOverflow = () => {
      const inner = nav.querySelector(".navbar-inner");
      const logo = nav.querySelector(".navbar-logo");
      const links = nav.querySelector(".navbar-links");
      const actions = nav.querySelector(".navbar-actions");
      if (!inner || !logo || !links || !actions) return;

      const totalWidth = logo.offsetWidth + links.offsetWidth + actions.offsetWidth;
      setIsOverflow(totalWidth + 32 > inner.clientWidth);
    };

    checkOverflow();
    const observer = new ResizeObserver(checkOverflow);
    observer.observe(nav);
    return () => observer.disconnect();
  }, []);

  // Alternar paneles
  const toggleThemePanel = () => {
    setIsThemePanelOpen((prev) => !prev);
  };

  // Cerrar paneles al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".navbar")) {
        setIsThemePanelOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const navItems = [
    { id: "home", label: t("nav.home") },
    { id: "about", label: t("nav.about") },
    { id: "skills", label: t("nav.skills") },
    { id: "projects", label: t("nav.projects") },
    { id: "contact", label: t("nav.contact") },
    { id: "theme-generator", label: t("nav.theme") },
  ];

  const handleLogoClick = (e) => {
    e.preventDefault();
    if (!isHome) {
      navigate("/");
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <>
      <nav ref={navbarRef} className={`navbar ${scrolled ? "navbar-scrolled" : ""} ${isOverflow ? "navbar-overflow" : ""}`}>
        <div className="navbar-inner">
          {/* Logo */}
          <a href="/" className="navbar-logo" onClick={handleLogoClick}>
            <span className="navbar-logo-accent">PC</span>araballo
          </a>

          {/* Enlaces de navegación desktop */}
          <div className="navbar-links">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={isHome ? `#${item.id}` : "/"}
                className={`navbar-link ${!isHome && item.id === "home" ? "active" : ""}`}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigation(item.id);
                }}
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Acciones */}
          <div className="navbar-actions">
            <button
              className={`navbar-action-btn ${isThemePanelOpen ? "active" : ""}`}
              onClick={toggleThemePanel}
              title={t("nav.theme")}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
            </button>

            <button
              className="navbar-action-btn navbar-lang-btn"
              onClick={switchLang}
              title={t("nav.language")}
            >
              {lang === "es" ? "EN" : "ES"}
            </button>

            {info.cvUrl && (
              <a
                href={info.cvUrl}
                className="navbar-action-btn navbar-cv-btn"
                title={t("nav.cv")}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
              </a>
            )}

            <button
              className={`navbar-hamburger ${isMenuOpen ? "open" : ""}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={t("nav.menu")}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>

        {/* Panel de temas */}
        <div className={`theme-slide-panel ${isThemePanelOpen ? "open" : ""}`}>
          <MenuTheme onClose={() => setIsThemePanelOpen(false)} />
        </div>
      </nav>

      {/* Menú móvil */}
      <div className={`mobile-menu ${isMenuOpen ? "open" : ""}`}>
        {navItems.map((item) => (
          <a
            key={item.id}
            href={isHome ? `#${item.id}` : "/"}
            className="mobile-menu-link"
            onClick={(e) => {
              e.preventDefault();
              handleNavigation(item.id);
            }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </>
  );
}

export default Menu;
