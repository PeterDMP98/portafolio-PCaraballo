/* ============================================
   CONTEXTO DE IDIOMA (ES / EN)
   ============================================
   - lang:        Idioma actual ("es" | "en")
   - setLang(l):  Cambia el idioma
   - t(key):      Traduce una clave al idioma activo
   - switchLang(): Alterna entre es/en
*/

import { createContext, useState, useCallback } from "react";
import translations from "../config/translations.js";

// eslint-disable-next-line react-refresh/only-export-components
export const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    return localStorage.getItem("lang") || "es";
  });

  const switchLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === "es" ? "en" : "es";
      localStorage.setItem("lang", next);
      return next;
    });
  }, []);

  const changeLang = useCallback((l) => {
    setLang(l);
    localStorage.setItem("lang", l);
  }, []);

  // Función de traducción: t("nav.home") => "Inicio"
  const t = useCallback(
    (key, vars = {}) => {
      const langData = translations[lang];
      let text = langData?.[key];

      // Si no encuentra en el idioma activo, busca en español
      if (!text && lang !== "es") {
        text = translations.es?.[key];
      }

      // Si aún no encuentra, devuelve la clave
      if (!text) return key;

      // Reemplaza variables como {count}
      if (vars.count !== undefined) {
        text = text.replace("{count}", vars.count);
      }

      return text;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLang: changeLang, switchLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
