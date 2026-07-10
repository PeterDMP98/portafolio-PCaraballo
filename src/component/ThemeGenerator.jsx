import { useState, useCallback } from "react";
import { useLanguage } from "../hooks/useLanguage";
import { useTheme } from "../hooks/useTheme";
import { generateThemeFromPrompt } from "../config/generarTheme";
import "../styles/themeGenerator.css";

/* Pool de 40 descripciones de estilos para mostrar como sugerencias.
   Cada texto alimenta el generador por vocabulario (generarTheme.js)
   que extrae palabras clave y arma una paleta coherente. */
const STYLE_POOL = [
  "Tropical caribeño con turquesa y arena",
  "Cyberpunk con neón rosa y azul eléctrico",
  "Bosque natural con verdes esmeralda",
  "Atardecer cálido con naranja y dorado",
  "Noche profunda con azul marino y luna",
  "Navidad con rojo y verde oscuro",
  "Fuego volcánico con rojo y naranja",
  "Lujo elegante con dorado y borgoña",
  "Primavera floral con rosa pastel y verde",
  "Otoño con naranja quemado y marrón",
  "Ártico con azul hielo y blanco plateado",
  "Tecnología moderno con azul y carbono",
  "Oscuro con neón rosa y violeta",
  "Vintage con café y crema",
  "Minimalista claro con azul cielo",
  "Verde menta fresco y blanco",
  "Océano profundo con azul marino",
  "Lavanda suave con morado claro",
  "Rojo pasión intenso y negro",
  "Rosa romántico pastel",
  "Chocolate espresso oscuro",
  "Monocromático en grises elegantes",
  "Neón vibrante con verde lima",
  "Pastel dulce con rosa y lavanda",
  "Playa caribeña con celeste y coral",
  "Naturaleza verde con marrón tierra",
  "Bosque oscuro con verde militar",
  "Frutal con naranja mandarina",
  "Oscuro con acentos ámbar y miel",
  "Hielo glacial con azul cielo",
  "Lujo real con púrpura y dorado",
  "Atardecer rosa con morado y naranja",
  "Medianoche con estrellas plateadas",
  "Tarde soleada con amarillo canario",
  "Cyberpunk oscuro con cian y magenta",
  "Rústico con caqui y marrón claro",
  "Náutico con azul marino y blanco",
  "Fresco con menta y turquesa",
  "Carmesí oscuro con vino tinto",
  "Lila suave con malva y blanco",
];

/* Toma n elementos aleatorios de un array (sin repetir) */
function pickRandom(array, count) {
  const shuffled = [...array].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function ThemeGenerator() {
  const { t, lang } = useLanguage();
  const { changeTheme, addCustomTheme } = useTheme();

  /* 4 sugerencias aleatorias que se muestran como chips cliqueables */
  const [suggestions, setSuggestions] = useState(() => pickRandom(STYLE_POOL, 4));
  const [generatedTheme, setGeneratedTheme] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  /* Mezcla la baraja: elige 4 sugerencias nuevas al azar */
  const handleShuffle = useCallback(() => {
    setSuggestions(pickRandom(STYLE_POOL, 4));
    setGeneratedTheme(null);
    setErrorMessage("");
  }, []);

  /* El usuario eligió un chip → genera el tema y muestra la preview */
  const handleSelectStyle = (styleText) => {
    setErrorMessage("");
    setGeneratedTheme(null);

    try {
      const theme = generateThemeFromPrompt(styleText, lang);
      setGeneratedTheme(theme);
    } catch (error) {
      setErrorMessage(t("themeGen.error"));
      console.error(error);
    }
  };

  /* Aplica el tema generado al sitio (lo guarda y lo activa) */
  const handleApplyTheme = () => {
    if (generatedTheme) {
      addCustomTheme(generatedTheme);
      changeTheme(generatedTheme.id);
    }
  };

  /* Determina si un color es claro u oscuro para elegir texto legible */
  const isLightColor = (hex) => parseInt(hex.slice(1), 16) > 0xffffff / 2;

  /* Muestra una cuadrícula con los colores del tema generado */
  const previewColors = generatedTheme?.colors
    ? [
        { label: lang === "es" ? "Fondo" : "Background", color: generatedTheme.colors.background },
        { label: lang === "es" ? "Superficie" : "Surface", color: generatedTheme.colors.surface },
        { label: lang === "es" ? "Primario" : "Primary", color: generatedTheme.colors.primary },
        { label: lang === "es" ? "Texto" : "Text", color: generatedTheme.colors.text },
        { label: lang === "es" ? "Borde" : "Border", color: generatedTheme.colors.border },
      ]
    : [];

  return (
    <section id="theme-generator" className="theme-generator">
      <div className="section-header">
        <span className="section-tag">{t("themeGen.title")}</span>
        <h2 className="section-title">{t("themeGen.title")}</h2>
        <div className="section-divider" />
      </div>

      <div className="theme-gen-content">
        <div className="theme-gen-input-area">
          {/* Sugerencias: 4 chips con estilos aleatorios */}
          <div className="theme-gen-suggestions">
            <span className="theme-gen-suggestions-label">
              {t("themeGen.suggestions")}:
            </span>
            <div className="theme-gen-chips">
              {suggestions.map((styleText, index) => (
                <button
                  key={styleText + index}
                  className="theme-gen-chip"
                  onClick={() => handleSelectStyle(styleText)}
                >
                  {styleText}
                </button>
              ))}
            </div>
          </div>

          {/* Botón para mezclar y mostrar 4 sugerencias distintas */}
          <button
            className="btn btn-outline theme-gen-shuffle"
            onClick={handleShuffle}
          >
            {t("themeGen.shuffle")}
          </button>

          {errorMessage && <p className="theme-gen-error">{errorMessage}</p>}
        </div>

        {/* Vista previa del tema generado */}
        {generatedTheme?.colors && (
          <div className="theme-gen-preview">
            <h4>{lang === "es" ? "Vista previa" : "Preview"}</h4>

            <div className="theme-gen-palette">
              {previewColors.map((item) => (
                <div
                  key={item.label}
                  className="theme-gen-color"
                  style={{ backgroundColor: item.color }}
                  title={item.color}
                >
                  <span
                    className="theme-gen-color-label"
                    style={{
                      color: isLightColor(item.color) ? "#000" : "#fff",
                    }}
                  >
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Muestra qué motor generó el tema (Vocabulario o Template) */}
            {generatedTheme.used && (
              <p className="theme-gen-engine">{generatedTheme.used}</p>
            )}

            <button className="btn btn-primary" onClick={handleApplyTheme}>
              {t("themeGen.apply")}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default ThemeGenerator;
