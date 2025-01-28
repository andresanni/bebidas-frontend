import {
  Typography,
  Box,
  Table,
  IconButton,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import {
  getJornadas,
  createJornada,
  Jornada,
} from "../services/jornadaServices";
import { useEffect, useState } from "react";
import { formatDate } from "../utils/dateFormatter";
import { Link } from "react-router-dom";

const DespachoPage = () => {
  const [jornadas, setJornadas] = useState<Jornada[]>([]);
  const [isDialogOpen, setIsDialogopen] = useState<boolean>(false);
  const [dateInput, setDateInput] = useState<string>("");

  useEffect(() => {
    getJornadas().then((data) => setJornadas(data));
  }, []);

  const hanldeCloseDialog = () => {
    setIsDialogopen(false);
  };

  const openHandleOpenDialog = () => {
    setIsDialogopen(true);
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createJornada({ fecha: dateInput });
    getJornadas().then((data) => setJornadas(data));
  };
  return (
    <Box margin={2}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Despacho
      </Typography>
      <IconButton
        color="primary"
        sx={{ marginBottom: 3 }}
        onClick={() => openHandleOpenDialog()}
      >
        <AddCircleOutlinedIcon sx={{ fontSize: 40 }} />
      </IconButton>
      <Box>
        <Table
          size="small"
          sx={{
            border: 1.5,
            maxWidth: "50%",
            borderRadius: 1,
            borderCollapse: "separate",
            overflow: "hidden",
          }}
        >
          <TableHead sx={{ background: "#2c3138" }}>
            <TableRow>
              <TableCell>Jornada</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {jornadas.map((jornada) => (
              <TableRow key={jornada.id}>
                <TableCell>
                  <Typography
                    variant="body1"
                    component={Link}
                    to={`/jornada/${jornada.id}`}
                    sx={{
                      textDecoration: "none",
                      color: "white",
                      fontSize: 18,
                    }}
                  >
                    {formatDate(jornada.fecha)}
                  </Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
      <Box>
        <Dialog
          open={isDialogOpen}
          onClose={hanldeCloseDialog}
          PaperProps={{
            component: "form",
            onSubmit: handleFormSubmit,
          }}
        >
          <DialogTitle>Nueva Jornada</DialogTitle>
          <DialogContent>
            <TextField
              type="date"
              fullWidth
              margin="dense"
              value={dateInput}
              onChange={(e) => setDateInput(e.target.value)}
              required
            />
          </DialogContent>

          <DialogActions>
            <Button type="submit">Agregar</Button>
            <Button onClick={() => hanldeCloseDialog()}>Cancelar</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default DespachoPage;
