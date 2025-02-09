import { useJornadaStore } from "../store/jornadaStore";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Pedido } from "../types";

const MapaMesas = () => {
  const { pedidos } = useJornadaStore();
  const [pedidosOrdenados, setPedidosOrdenados] = useState<Pedido[]>([]);

  useEffect(() => {
    const pedidosOrdenadosLocal = pedidos.slice().sort((a, b) => {
      const numeroMesaA = Number(a.mesa?.numero) || 0;
      const numeroMesaB = Number(b.mesa?.numero) || 0;
      return numeroMesaA - numeroMesaB;
    });

    setPedidosOrdenados(pedidosOrdenadosLocal);
  }, [pedidos]);

  return (
    <Box
      display="grid"
      gridTemplateColumns={{
        xs: "repeat(1, 1fr)",
        sm: "repeat(2, 1fr)",
        md: "repeat(3, 1fr)",
      }}
      gap={3}
      mt={2}
    >
      {pedidosOrdenados.map((p) => (
        <Card key={p.id} sx={{ minHeight: 150 }}>
          <CardContent>
            <Typography variant="h5" fontWeight="bold">
              Mesa: {p.mesa?.numero || "No se encontró"}
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              {p.mozo?.nombre || "No se encontró"}
            </Typography>
            <Typography>Total: $ {p.total?.toFixed(2) || "0.00"}</Typography>
            <Typography>
              Estado: <span>{p.estado?.descripcion || "Desconocido"}</span>
            </Typography>
            <CardActions>
              <Button size="small" variant="contained">
                Ver Detalles
              </Button>
            </CardActions>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default MapaMesas;
