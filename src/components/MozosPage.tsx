/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { Mozo } from "../services/mozosService";
import MozoFormModal from "./MozoFormModal";

const MozosPage = () => {
  const [mozos, setMozos] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMozo, setSelectedMozo] = useState<Mozo | null>(null);

  console.log("selectedMozo", selectedMozo);

  useEffect(() => {
    getMozos().then((data) => {
      setMozos(data);
    });
  }, []);

  const handleDeleteMozo = async (id: string) => {
    await deleteMozo(id);
    setMozos(mozos.filter((mozo) => mozo.id !== id));
  };

  const handleOpenModal = (mozo?: Mozo) => {
    setSelectedMozo(mozo || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMozo(null);
  };

  const handleAddOrEditMozo = async (data: {
    nombre: string;
    apellido: string;
  }) => {
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
      >
        <PersonAddAlt1Icon sx={{ fontSize: 40, marginBottom: 3 }} />
      </IconButton>
      <Box>
        <Table
          size="small"
          sx={{
            border: 1,
            borderColor: "GrayText",
            borderWidth: 1,
            maxWidth: "50%",
          }}
        >
          <TableHead>
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
        onSubmit={handleAddOrEditMozo}
        defaultValues={selectedMozo || undefined}
      />
    </Box>
  );
};

export default MozosPage;
