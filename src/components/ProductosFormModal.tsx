import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
  Button,
  MenuItem,
} from "@mui/material";
import { Bebida } from "../services/bebidasService";

type ProductosFormModalPropTypes = {
  open: boolean;
  onClose: () => void;
  hanldeSubmit: ({
    nombre,
    precio,
    bonificacion,
  }: {
    nombre: string;
    precio: number;
    bonificacion: number;
  }) => void;

  selectedBebida: Bebida | null;
};

const ProductosFormModal = ({
  open,
  onClose,
  hanldeSubmit,
  selectedBebida,
}: ProductosFormModalPropTypes) => {
  const [nombre, setNombre] = useState<string>("");
  const [precio, setPrecio] = useState<string>("");
  const [bonificacion, setBonificacion] = useState<string>("0");

  useEffect(() => {
    if (open) {
      setNombre(selectedBebida?.nombre || "");
      setPrecio(selectedBebida?.precio?.toString() || "");
      setBonificacion(selectedBebida?.bonificacion?.toString() || "0");
    }
  }, [selectedBebida, open]);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    hanldeSubmit({
      nombre,
      precio: parseFloat(precio) || 0,
      bonificacion: parseFloat(bonificacion) || 0,
    });
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: "form",
        onSubmit: handleFormSubmit,
      }}
    >
      <DialogTitle>{selectedBebida ? "Editar" : "Agregar"}</DialogTitle>

      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          id="nombre"
          label="Nombre"
          type="text"
          fullWidth
          variant="outlined"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <TextField
          margin="dense"
          id="precio"
          label="Precio"
          type="text"
          fullWidth
          variant="outlined"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
        />
        <TextField
          select
          margin="dense"
          label="Bonificación"
          fullWidth
          variant="outlined"
          value={bonificacion}
          onChange={(e) => setBonificacion(e.target.value)}
        >
          <MenuItem value="0">0%</MenuItem>
          <MenuItem value="1">100%</MenuItem>
          <MenuItem value="0.5">50%</MenuItem>
        </TextField>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button type="submit">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProductosFormModal;
