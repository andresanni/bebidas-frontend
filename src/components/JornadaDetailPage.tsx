import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Jornada,
  Pedido,
  getJornadaById,
  getJornadaDetails,
} from "../services/jornadaServices";
import { formatDate } from "../utils/dateFormatter";

const JornadaDetailPage = () => {
  const { id } = useParams();
  const [jornada, setJornada] = useState<Jornada | null>(null);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);

  useEffect(() => {
    if (id) {
      getJornadaById(id).then((data) => setJornada(data));
      getJornadaDetails(id).then((data) => setPedidos(data));
    }
  }, [id]);

  return (
    <Box margin={2}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Despacho
      </Typography>
      <Typography variant="h5">
        {jornada && formatDate(jornada.fecha)}
      </Typography>

      {pedidos.map((pedido) => (
        <Box key={pedido.id} marginBottom={4}>
          <Typography variant="h6" gutterBottom>
            Mesa {pedido.mesa.numero} - Mozo: {pedido.mozo.nombre}{" "}
            {pedido.mozo.apellido} - Total: ${pedido.total}
          </Typography>
          <Table
            size="small"
            sx={{
              border: 1.5,
              borderRadius: 1,
              borderCollapse: "separate",
              overflow: "hidden",
            }}
          >
            <TableHead sx={{ background: "#2c3138" }}>
              <TableRow>
                <TableCell>Bebida</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Precio Unitario</TableCell>
                <TableCell>Subtotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pedido.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.bebida.nombre}</TableCell>
                  <TableCell>{item.cantidad}</TableCell>
                  <TableCell>${item.bebida.precio}</TableCell>
                  <TableCell>${item.subtotal}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      ))}
    </Box>
  );
};

export default JornadaDetailPage;
