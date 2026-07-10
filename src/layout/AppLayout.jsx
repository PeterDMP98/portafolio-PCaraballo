/* ============================================
   APPLAYOUT / LAYOUT PRINCIPAL CON RUTAS
   ============================================
   - "/" → Home: Hero, About, Skills, InicioProject, ThemeGen, Contact
   - "/projects" → Todos los proyectos con filtros
   - Menu global, Chat flotante, Footer
*/

import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Menu from "../component/Menu";
import Hero from "../component/Hero";
import About from "../component/About";
import Skill from "../component/Skill";
import InicioProject from "../component/InicioProject";
import Contact from "../component/Contact";
import Footer from "../component/Footer";
import Chat from "../component/Chat";
import ThemeGenerator from "../component/ThemeGenerator";
import Projects from "../pages/Projects";

/* ---- Componente: Página de inicio ---- */
function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skill />
      <InicioProject />
      <ThemeGenerator />
      <Contact />
    </>
  );
}

function AppLayout() {
  const location = useLocation();

  // Scroll al tope al cambiar de ruta
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  return (
    <div className="app-layout">
      <Menu />
      <main>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/projects" element={<Projects />} />
        </Routes>
      </main>
      <Footer />
      <Chat />
    </div>
  );
}

export default AppLayout;
