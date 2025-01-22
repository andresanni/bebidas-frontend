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
import AddCircleOutlinedIcon from "@mui/icons-material/AddCircleOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  getBebidas,
  deleteBebida,
  updateBebida,
  createBebida,
  BebidaInput,
} from "../services/bebidasService";
import { Bebida } from "../services/bebidasService";
import BebidaFormModal from "./BebidaFormModal";

const BebidasPage = () => {
  const [bebidas, setBebidas] = useState<Bebida[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBebida, setSelectedBebida] = useState<Bebida | null>(null);

  useEffect(() => {
    getBebidas().then((data) => {
      setBebidas(data);
    });
  }, []);

  const handleDeleteBebida = async (id: string) => {
    await deleteBebida(id);
    getBebidas().then((data) => setBebidas(data));
  };

  const handleOpenModal = (bebida?: Bebida) => {
    setSelectedBebida(bebida || null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddOrEditBebida = async (data: BebidaInput) => {
    if (selectedBebida) {
      await updateBebida({ ...selectedBebida, ...data });
    } else {
      await createBebida(data);
    }
    setIsModalOpen(false);
    setSelectedBebida(null);
    getBebidas().then((data) => {
      setBebidas(data);
    });
  };

  return (
    <Box margin={2}>
      <Typography variant="h3" fontWeight="bold" gutterBottom>
        Bebidas
      </Typography>
      <IconButton
        onClick={() => {
          handleOpenModal();
        }}
        color="primary"
        sx={{ marginBottom: 3 }}
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
              <TableCell>Nombre</TableCell>
              <TableCell>Precio</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bebidas.map((bebida) => (
              <TableRow key={bebida.id}>
                <TableCell>{bebida.nombre}</TableCell>
                <TableCell>$ {bebida.precio}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => {
                      handleOpenModal(bebida);
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="primary"
                    onClick={() => handleDeleteBebida(bebida.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>

      <BebidaFormModal
        open={isModalOpen}
        onClose={handleCloseModal}
        hanldeSubmit={handleAddOrEditBebida}
        selectedBebida={selectedBebida}
      />
    </Box>
  );
};

export default BebidasPage;
