/* ============================================
   HOOK: useLanguage
   ============================================
   Acceso rápido al contexto de idioma
   - t(clave, vars): traduce
   - lang: "es" | "en"
   - switchLang(): alterna
*/

import { useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage debe usarse dentro de LanguageProvider");
  }
  return context;
};
