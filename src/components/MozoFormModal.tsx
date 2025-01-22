import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";
import { Mozo } from "../services/mozosService";

type MozoFormModalPropTypes = {
  open: boolean;
  onClose: () => void;
  hanldeSubmit: ({
    nombre,
    apellido,
  }: {
    nombre: string;
    apellido: string;
  }) => void;

  selectedMozo: Mozo | null;
};

const MozoFormModal = ({
  open,
  onClose,
  hanldeSubmit,
  selectedMozo,
}: MozoFormModalPropTypes) => {
  const [nombre, setNombre] = useState<string>("");
  const [apellido, setApellido] = useState<string>("");

  useEffect(() => {
    if (open) {
      setNombre(selectedMozo?.nombre || "");
      setApellido(selectedMozo?.apellido || "");
    }
  }, [selectedMozo, open]);

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    hanldeSubmit({ nombre, apellido });
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
      <DialogTitle>{selectedMozo ? "Editar" : "Agregar"}</DialogTitle>

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
          id="apellido"
          label="Apellido"
          type="text"
          fullWidth
          variant="outlined"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button type="submit">Guardar</Button>
      </DialogActions>
    </Dialog>
  );
};

export default MozoFormModal;
