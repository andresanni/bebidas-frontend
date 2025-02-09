import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Jornada, getJornadaById } from "../services/jornadaServices";
import { Pedido, getPedidosByJornadaId } from "../services/pedidoServices";
import { formatDate } from "../utils/dateFormatter";
import DespachoForm from "./DespachoForm";

const JornadaDetailPage = () => {
  const { id } = useParams();
  const [jornada, setJornada] = useState<Jornada | null>(null);
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [selectedPedido, setSelectedPedido] = useState<Pedido | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      getJornadaById(id).then((data) => setJornada(data));
      getPedidosByJornadaId(id).then((data) => setPedidos(data));
    }
  }, [id]);

  const handleOpenModal = (pedido: Pedido) => {
    setSelectedPedido(pedido);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPedido(null);
    setIsModalOpen(false);
  };

  return (
    <Box margin={2}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Despacho
      </Typography>
      <Typography variant="h5">
        {jornada && formatDate(jornada.fecha)}
      </Typography>
      <DespachoForm jornadaId={jornada?.id || ""} />
      <Grid container spacing={3} marginTop={2}>
        {pedidos.map((pedido) => (
          <Grid item xs={12} sm={6} md={3} key={pedido.id}>
            <Card>
              <CardContent>
                <Typography variant="h5" fontWeight="bold">
                  Mesa: {pedido.mesa?.numero || "No se encontro"}
                </Typography>
                <Typography>
                  Mozo: {pedido.mozo?.nombre || "No se encontro"}{" "}
                  {pedido.mozo?.apellido}
                </Typography>
                <Typography>
                  Total: $ {pedido.total?.toFixed(2) || "0.00"}
                </Typography>
                <Typography>
                  Estado:{" "}
                  <span>{pedido.estado?.descripcion || "Desconocido"}</span>
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => handleOpenModal(pedido)}
                  variant="contained"
                >
                  Ver Detalles
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Modal para mostrar detalles del pedido */}
      <Dialog
        open={isModalOpen}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>
          Detalles de la Mesa {selectedPedido!.mesa!.numero}
        </DialogTitle>
        <DialogContent dividers>
          <Typography variant="h6" gutterBottom>
            Mozo: {selectedPedido!.mozo!.nombre}{" "}
            {selectedPedido!.mozo!.apellido}
          </Typography>
          <Typography gutterBottom>Total: ${selectedPedido?.total}</Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Bebida</TableCell>
                <TableCell>Cantidad</TableCell>
                <TableCell>Precio Unitario</TableCell>
                <TableCell>Subtotal</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {selectedPedido?.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.bebida.nombre}</TableCell>
                  <TableCell>{item.cantidad}</TableCell>
                  <TableCell>${item.bebida.precio.toFixed(2)}</TableCell>
                  <TableCell>${item.subtotal.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              console.log("Imprimir cuenta", selectedPedido?.id);
            }}
            color="primary"
            variant="contained"
          >
            Imprimir Cuenta
          </Button>
          <Button
            onClick={handleCloseModal}
            color="secondary"
            variant="outlined"
          >
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default JornadaDetailPage;
