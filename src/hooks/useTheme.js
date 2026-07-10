/*============================================
  HOOK: useTheme
  ============================================
  Acceso rápido al contexto de tema/tipografía
*/

import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme debe usarse dentro de ThemeProvider");
  }
  return context;
};
