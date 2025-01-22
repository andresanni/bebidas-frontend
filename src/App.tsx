import { BrowserRouter } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import AppRoutes from "./AppRoutes";
import { Box } from "@mui/material";

const App = () => {
  return (
    <BrowserRouter>
      <Box sx={{ display: "flex" }}>
        {/* Barra lateral fija */}
        <Sidebar />

        {/* Contenido dinámico */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            backgroundColor: "background.default",
            color: "text.primary",
            minHeight: "100vh",
          }}
        >
          <AppRoutes />
        </Box>
      </Box>
    </BrowserRouter>
  );
};

export default App;
