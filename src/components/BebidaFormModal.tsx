import {
  Dialog,
  Box,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
  Button,
} from "@mui/material";
import { useForm, Controller } from "react-hook-form";

type BebidaFormModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { nombre: string; precio: number }) => void;
  defaultValues?: { nombre: string; precio: number };
};

const BebidaFormModal = ({
  open,
  onClose,
  onSubmit,
  defaultValues = { nombre: "", precio: 0 },
}: BebidaFormModalProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues });

  const handleFormSubmit = (data: { nombre: string; precio: number }) => {
    onSubmit(data);
    onClose();
    reset();
  };

  return (
    <Dialog
      open={open}
      onClose={() => {
        onClose();
        reset();
      }}
    >
      <DialogTitle>
        {defaultValues.nombre ? "Editar Bebida" : "Agregar Bebida"}
      </DialogTitle>

      <DialogContent>
        <Box component="form" onSubmit={handleSubmit(handleFormSubmit)}>
          <Controller
            name="nombre"
            control={control}
            rules={{ required: "Nombre Obligatorio" }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Nombre"
                margin="normal"
                fullWidth
                error={!!errors.nombre}
                helperText={errors.nombre?.message}
              />
            )}
          />
          <Controller
            name="precio"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Precio"
                margin="normal"
                fullWidth
                error={!!errors.precio}
                helperText={errors.precio?.message}
              />
            )}
          />
          <DialogActions>
            <Button
              onClick={() => {
                onClose();
                reset();
              }}
              color="secondary"
            >
              Cancelar
            </Button>
            <Button type="submit" color="primary">
              {defaultValues.nombre ? "Guardar Cambios" : "Agregar"}
            </Button>
          </DialogActions>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default BebidaFormModal;
