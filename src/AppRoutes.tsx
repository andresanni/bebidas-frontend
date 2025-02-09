import { Routes, Route } from "react-router-dom";
import MozosPage from "./components/MozosPage";
import ProductosPage from "./components/ProductosPage";
import DespachoPage from "./components/DespachoPage";
import JornadaLayout from "./components/JornadaLayout";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/mozos" element={<MozosPage />} />
      <Route path="/productos" element={<ProductosPage />} />
      <Route path="/despacho" element={<DespachoPage />} />
      <Route path="/jornada/:id" element={<JornadaLayout />} />
    </Routes>
  );
};

export default AppRoutes;
