import { Routes, Route } from "react-router-dom";
import MozosPage from "./components/MozosPage";
import ProductosPage from "./components/ProductosPage";
import DespachoPage from "./components/DespachoPage";
import JornadaDetailPage from "./components/JornadaDetailPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/mozos" element={<MozosPage />} />
      <Route path="/productos" element={<ProductosPage />} />
      <Route path="/despacho" element={<DespachoPage />} />
      <Route path="/jornada/:id" element={<JornadaDetailPage />} />
    </Routes>
  );
};

export default AppRoutes;
