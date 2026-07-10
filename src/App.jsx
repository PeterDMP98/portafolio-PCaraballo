/* ============================================
   APP / PUNTO DE ENTRADA CON RUTAS
   ============================================
   - "/" → Home con todas las secciones
   - "/projects" → Todos los proyectos con filtros
*/

import { Routes, Route } from "react-router-dom";
import AppLayout from "./layout/AppLayout";

function App() {
  return (
    <Routes>
      <Route path="/*" element={<AppLayout />} />
    </Routes>
  );
}

export default App;
