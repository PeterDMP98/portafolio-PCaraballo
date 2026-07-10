/*============================================
  CONTEXTO DE TEMA (Colores + Tipografía)
  ============================================
  - theme:       Tema activo con colores
  - themes:      Lista de todos los temas disponibles
  - currentFont: Objeto de tipografía activa
  - fonts:       Lista de fuentes disponibles
  - changeTheme(id): Cambia el tema por ID
  - changeFont(id):  Cambia la tipografía por ID
  - addCustomTheme(theme): Agrega un tema generado
*/

import { createContext, useEffect, useState, useCallback } from "react";
import { themes, fonts } from "../config/dataStyle.js";

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // ---- Estado del tema de colores ----
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    if (!savedTheme) return themes[0];
    const found = themes.find((t) => t.id === savedTheme);
    if (found) return found;
    try {
      const customSaved = localStorage.getItem("customThemes");
      if (customSaved) {
        const custom = JSON.parse(customSaved);
        const foundCustom = custom.find((t) => t.id === savedTheme);
        if (foundCustom) return foundCustom;
      }
    } catch { /* ignore */ }
    return themes[0];
  });

  // ---- Estado de la tipografía ----
  const [currentFont, setCurrentFont] = useState(() => {
    const savedFont = localStorage.getItem("font");
    if (!savedFont) return fonts[0]; // system default
    return fonts.find((f) => f.id === savedFont) || fonts[0];
  });

  // ---- Temas personalizados adicionales (deduplicados por id) ----
  const [customThemes, setCustomThemes] = useState(() => {
    const saved = localStorage.getItem("customThemes");
    if (!saved) return [];
    const parsed = JSON.parse(saved);
    const seen = new Set();
    return parsed.filter((t) => {
      if (seen.has(t.id)) return false;
      seen.add(t.id);
      return true;
    });
  });

  // ---- Cambiar tema de colores (también cambia tipografía) ----
  const changeTheme = useCallback((themeId) => {
    const allThemes = [...themes, ...JSON.parse(localStorage.getItem("customThemes") || "[]")];
    const newTheme = allThemes.find((t) => t.id === themeId);
    if (!newTheme) return;
    setTheme(newTheme);
    // Cambia la tipografía asociada al tema
    if (newTheme.fontId) {
      const themeFont = fonts.find((f) => f.id === newTheme.fontId);
      if (themeFont) setCurrentFont(themeFont);
    }
  }, []);

  // ---- Cambiar tipografía ----
  const changeFont = useCallback((fontId) => {
    setCurrentFont((prev) => {
      return fonts.find((f) => f.id === fontId) || prev;
    });
  }, []);

  // ---- Agregar tema personalizado (reemplaza si ya existe) ----
  const addCustomTheme = useCallback((newTheme) => {
    setCustomThemes((prev) => {
      const filtered = prev.filter((t) => t.id !== newTheme.id);
      const updated = [...filtered, newTheme];
      localStorage.setItem("customThemes", JSON.stringify(updated));
      return updated;
    });
    setTheme(newTheme);
    if (newTheme.fontId) {
      const themeFont = fonts.find((f) => f.id === newTheme.fontId);
      if (themeFont) setCurrentFont(themeFont);
    }
  }, []);

  // ---- Efecto: aplicar colores CSS ----
  useEffect(() => {
    if (!theme?.colors) return;

    // Aplica cada variable de color al :root
    Object.entries(theme.colors).forEach(([key, value]) => {
      const cssVar = `--${key.replace(/([A-Z])/g, "-$1").toLowerCase()}`;
      document.documentElement.style.setProperty(cssVar, value);
    });

    // Aplica la sombra
    if (theme.colors.shadow) {
      document.documentElement.style.setProperty("--shadow", theme.colors.shadow);
    }

    // Aplica el color del cursor (para selection y scrollbar)
    if (theme.cursor) {
      document.documentElement.style.setProperty("--cursor", theme.cursor);
    }

    localStorage.setItem("theme", theme.id);
  }, [theme]);

  // ---- Efecto: aplicar tipografía CSS ----
  useEffect(() => {
    if (!currentFont?.family) return;

    const { sans, heading, mono } = currentFont.family;

    document.documentElement.style.setProperty("--sans", sans);
    document.documentElement.style.setProperty("--heading", heading);
    document.documentElement.style.setProperty("--mono", mono);

    // Aplica la fuente como principal si no es system
    if (currentFont.id !== "system") {
      document.documentElement.style.setProperty("--applied-font", sans);
    }

    localStorage.setItem("font", currentFont.id);

    // Agrega el @import si existe
    const existingStyle = document.getElementById("font-import");
    if (currentFont.import) {
      if (existingStyle) {
        existingStyle.textContent = currentFont.import;
      } else {
        const style = document.createElement("style");
        style.id = "font-import";
        style.textContent = currentFont.import;
        document.head.appendChild(style);
      }
    } else if (existingStyle) {
      existingStyle.remove();
    }
  }, [currentFont]);

  return (
    <ThemeContext.Provider
      value={{
        theme,
        themes: [...themes, ...customThemes],
        currentFont,
        fonts,
        changeTheme,
        changeFont,
        addCustomTheme,
        customThemes,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
