import { useState, useEffect } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getMozos,
  deleteMozo,
  updateMozo,
  createMozo,
} from "../services/mozosService";
import { Mozo, MozoInput } from "../services/mozosService";
import MozoFormModal from "./MozoFormModal";

const MozosPage = () => {
  const [mozos, setMozos] = useState<Mozo[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMozo, setSelectedMozo] = useState<Mozo | null>(null);

  useEffect(() => {
    getMozos().then((data) => {
      setMozos(data);
    });
  }, []);

  const handleDeleteMozo = async (id: string) => {
    await deleteMozo(id);
    getMozos().then((data) => setMozos(data));
  };

  const handleOpenModal = (mozo?: Mozo) => {
    setSelectedMozo(mozo || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddOrEditMozo = async (data: MozoInput) => {
    if (selectedMozo) {
      await updateMozo({ ...selectedMozo, ...data });
    } else {
      await createMozo(data);
    }
    setIsModalOpen(false);
    setSelectedMozo(null);
    getMozos().then((data) => {
      setMozos(data);
    });
  };

  return (
    <Box margin={2}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Mozos
      </Typography>
      <IconButton
        onClick={() => {
          handleOpenModal();
        }}
        color="primary"
        sx={{ marginBottom: 3 }}
      >
        <PersonAddAlt1Icon sx={{ fontSize: 40 }} />
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
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mozos.map((mozo) => (
              <TableRow key={mozo.id}>
                <TableCell>{mozo.nombre}</TableCell>
                <TableCell>{mozo.apellido}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      handleOpenModal(mozo);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => handleDeleteMozo(mozo.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <MozoFormModal
        open={isModalOpen}
        onClose={handleCloseModal}
        hanldeSubmit={handleAddOrEditMozo}
        selectedMozo={selectedMozo}
      />
    </Box>
  );
};

export default MozosPage;
