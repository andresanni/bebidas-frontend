import {
  Box,
  MenuItem,
  TextField,
  CircularProgress,
  Typography,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { createItem, createPedido } from "../services/pedidoServices";
import { getMozos } from "../services/mozosService";
import { getMesas } from "../services/mesaServices";
import { getBebidas } from "../services/bebidasService";
import { Pedido, Mozo, Mesa, Bebida } from "../types";
import { useJornadaStore } from "../store/jornadaStore";

const DespachoForm = () => {
  //Datos estáticos
  const [mozos, setMozos] = useState<Mozo[]>([]);
  const [mesas, setMesas] = useState<Mesa[]>([]);
  const [bebidas, setBebidas] = useState<Bebida[]>([]);

  //Datos dinámicos
  const { jornada, pedidos, agregarItem, agregarPedido } = useJornadaStore();

  //Pedido nuevo o existente
  const [isNew, setIsNew] = useState<boolean>(true);

  //UI
  const [loading, setLoading] = useState<boolean>(true);

  //Estado del formulario
  const [formState, setFormState] = useState<{
    mesa: Mesa | null;
    mozo: Mozo | null;
    pedido: Pedido | null;
    adultos: number | null;
    menores: number | null;
    bebida: Bebida | null;
    cantidad: number | null;
  }>({
    mesa: null,
    mozo: null,
    pedido: null,
    adultos: null,
    menores: null,
    bebida: null,
    cantidad: null,
  });

  //Carga de datos
  useEffect(() => {
    if (!jornada) return;
    const fetchData = async () => {
      try {
        const [mozos, mesas, bebidas] = await Promise.all([
          getMozos(),
          getMesas(),
          getBebidas(),
        ]);

        setMozos(mozos);
        setBebidas(bebidas);
        setMesas(mesas);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [jornada]);

  //CHANGE HANDLERS
  const handleMesaChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    //if (!mesas.length || !pedidos.length) return;
    const mesaId = e.target.value;
    if (!mesaId) {
      setFormState((prevState) => ({
        ...prevState,
        mesa: null,
        pedido: null,
      }));
      setIsNew(true);
      return;
    }
    const selectedMesa = mesas.find((m) => m.id === mesaId) || null;
    const pedido = selectedMesa
      ? pedidos.find((p) => p.mesa_id === mesaId) || null
      : null;

    setFormState((prevState) => ({
      ...prevState,
      mesa: selectedMesa,
      pedido: pedido,
    }));

    setIsNew(!pedido);
  };

  const handleChangeMozo = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const mozoId = e.target.value;
    const selectedMozo = mozos.find((m) => m.id === mozoId) || null;
    setFormState((prevState) => ({
      ...prevState,
      mozo: selectedMozo,
    }));
  };

  const handleChangeNumero = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const parsedValue = parseInt(value, 10);

    setFormState((prevState) => ({
      ...prevState,
      [name]: isNaN(parsedValue) ? null : parsedValue,
    }));
  };

  const handleChangeBebida = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const bebidaId = e.target.value;
    const selectedBebida = bebidas.find((b) => b.id === bebidaId) || null;
    setFormState((prevState) => ({ ...prevState, bebida: selectedBebida }));
  };

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "40vh",
        }}
      >
        <CircularProgress size={60} color="secondary" />
      </Box>
    );

  //Agregar item handler
  const hanldeAgregar = async () => {
    const { mesa, bebida, cantidad, mozo, adultos, menores, pedido } =
      formState;

    if (!mesa || !bebida || !cantidad) {
      alert("Complete todos los campos");
      return;
    }
    try {
      if (isNew) {
        //CASO A: crear pedido y agregar item
        if (!mozo || adultos === null || menores === null) {
          alert("Complete mozo, adultos y menores para abrir pedido nuevo");
          return;
        } else {
          const nuevoPedido = await createPedido({
            mesa_id: mesa.id,
            mozo_id: mozo!.id,
            adultos,
            menores,
            jornada_id: jornada!.id,
          });

          const nuevoItem = await createItem({
            bebida_id: bebida.id,
            pedido_id: nuevoPedido.id,
            cantidad: cantidad,
            subtotal: cantidad * bebida.precio,
          });

          console.log({ nuevoPedido });
          if (nuevoPedido && nuevoItem) {
            agregarPedido({ ...nuevoPedido, items: [nuevoItem] });
          }
        }
      } else {
        //CASO B: Agregar el item al pedido existente
        if (!pedido) {
          alert("No se encontró el pedido");
          return;
        } else {
          const nuevoItem = await createItem({
            pedido_id: pedido.id,
            bebida_id: bebida.id,
            cantidad,
            subtotal: cantidad * bebida.precio,
          });

          if (nuevoItem) {
            agregarItem(pedido.id, nuevoItem);
          }
        }
      }
    } catch (error) {
      console.error(error);
    } finally {
      setFormState({
        mesa: null,
        mozo: null,
        pedido: null,
        adultos: null,
        menores: null,
        bebida: null,
        cantidad: null,
      });
    }
  };

  return (
    <Box sx={{ mt: 2, maxWidth: 400 }}>
      <TextField
        select
        fullWidth
        label="Mesa"
        value={formState.mesa?.id || ""}
        onChange={handleMesaChange}
        sx={{ mt: 2, mb: 2 }}
      >
        {mesas.map((mesa) => (
          <MenuItem key={mesa.id} value={mesa.id}>
            {mesa.numero}
          </MenuItem>
        ))}
      </TextField>
      {/* Bifurcacion del flujo */}
      {formState.mesa && (
        <>
          {isNew ? (
            /* CASO A: Si el pedido es nuevo, se admite el ingreso de los campos para crearlo */
            <>
              <TextField
                select
                fullWidth
                label="Mozo"
                value={formState.mozo?.id || ""}
                onChange={handleChangeMozo}
                sx={{ mt: 2, mb: 2 }}
              >
                {mozos.map((mozo) => (
                  <MenuItem key={mozo.id} value={mozo.id}>
                    {mozo.nombre}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                label="Adultos"
                type="number"
                name="adultos"
                fullWidth
                margin="dense"
                value={formState.adultos || ""}
                onChange={handleChangeNumero}
                sx={{ mt: 2, mb: 2 }}
              />
              <TextField
                label="Menores"
                type="number"
                name="menores"
                fullWidth
                margin="dense"
                value={formState.menores || ""}
                onChange={handleChangeNumero}
                sx={{ mt: 2, mb: 2 }}
              />
            </>
          ) : (
            /* CASO B: Si el pedido ya existe, se muestra la informacion */
            <Box
              sx={{
                p: 2,
                border: "1px solid #ccc",
                borderRadius: 1,
                mt: 2,
                mb: 2,
              }}
            >
              <Typography variant="h6" gutterBottom>
                Información del pedido
              </Typography>
              <Typography>
                <strong>Mozo:</strong>{" "}
                {formState.pedido?.mozo?.nombre || "No asignado"}
              </Typography>
              <Typography>
                <strong>Adultos:</strong> {formState.pedido?.adultos || 0}
              </Typography>
              <Typography>
                <strong>Menores:</strong> {formState.pedido?.menores || 0}
              </Typography>
            </Box>
          )}

          {/* Selector de bebida y cantidad, ambos flujos se unen */}
          <Box>
            <TextField
              select
              label="Bebida"
              fullWidth
              onChange={handleChangeBebida}
              value={formState.bebida?.id || ""}
              sx={{ mt: 2, mb: 2 }}
            >
              {bebidas.map((bebida) => (
                <MenuItem key={bebida.id} value={bebida.id}>
                  {bebida.nombre}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              label="Cantidad"
              type="number"
              fullWidth
              margin="normal"
              name="cantidad"
              value={formState.cantidad ?? ""}
              onChange={handleChangeNumero}
              sx={{ mt: 2, mb: 2 }}
            />

            <Button
              variant="contained"
              color="primary"
              onClick={hanldeAgregar}
              disabled={
                !formState.mesa ||
                !formState.bebida ||
                !formState.cantidad ||
                (isNew &&
                  (!formState.mozo ||
                    formState.adultos === null ||
                    formState.menores === null))
              }
            >
              Agregar
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default DespachoForm;
