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

type MozoFormModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: { nombre: string; apellido: string }) => void;
  defaultValues?: { nombre: string; apellido: string };
};

const MozoFormModal = ({
  open,
  onClose,
  onSubmit,
  defaultValues = { nombre: "", apellido: "" },
}: MozoFormModalProps) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ defaultValues });

  const handleFormSubmit = (data: { nombre: string; apellido: string }) => {
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
        {defaultValues.nombre ? "Editar Mozo" : "Agregar Mozo"}
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
            name="apellido"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                label="Apellido"
                margin="normal"
                fullWidth
                error={!!errors.apellido}
                helperText={errors.apellido?.message}
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

export default MozoFormModal;
