import { useParams } from "react-router-dom";
import DespachoForm from "./DespachoForm";
import MapaMesas from "./MapaMesas";
import { Box } from "@mui/material";
import { useJornadaStore } from "../store/jornadaStore";
import { useEffect } from "react";
import { getJornadaById } from "../services/jornadaServices";
import { getPedidosByJornadaId } from "../services/pedidoServices";

const JornadaLayout = () => {
  const { id } = useParams();
  const { setJornada, setPedidos } = useJornadaStore();

  useEffect(() => {
    const fetchData = async () => {
      const jornada = await getJornadaById(id!);
      setJornada(jornada);
      const pedidos = await getPedidosByJornadaId(id!);
      setPedidos(pedidos);
    };

    fetchData();
  }, [id, setJornada, setPedidos]);
  return (
    <Box display="flex" height="100vh">
      <Box width="50%" height="100%" overflow="auto">
        <DespachoForm />
      </Box>
      <Box width="50%" height="100%" overflow="auto">
        <MapaMesas />
      </Box>
    </Box>
  );
};

export default JornadaLayout;
