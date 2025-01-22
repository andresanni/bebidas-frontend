import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { Bebida } from "../services/bebidasService";

type BebidaFormModalPropTypes = {
  open: boolean;
  onClose: () => void;
  hanldeSubmit: ({
    nombre,
    precio,
  }: {
    nombre: string;
    precio: number;
  }) => void;

  selectedBebida: Bebida | null;
};

const BebidaFormModal = ({
  open,
  onClose,
  hanldeSubmit,
  selectedBebida,
}: BebidaFormModalPropTypes) => {
  const [nombre, setNombre] = useState<string>("");
  const [precio, setPrecio] = useState<string>("");

  useEffect(() => {
    if (open) {
      setNombre(selectedBebida?.nombre || "");
      setPrecio(selectedBebida?.precio?.toString() || "");
    }
  }, [selectedBebida, open]);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    hanldeSubmit({ nombre, precio: parseFloat(precio) || 0 });
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
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button type="submit">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default BebidaFormModal;
