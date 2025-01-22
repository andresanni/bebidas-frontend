import { Routes, Route } from "react-router-dom";
import MozosPage from "./components/MozosPage";
import BebidasPage from "./components/BebidasPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/mozos" element={<MozosPage />} />
      <Route path="/bebidas" element={<BebidasPage />} />
    </Routes>
  );
};

export default AppRoutes;
