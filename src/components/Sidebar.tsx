import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
  Collapse,
} from "@mui/material";
import { Link } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import LiquorIcon from "@mui/icons-material/Liquor";
import TableRestaurantIcon from "@mui/icons-material/TableRestaurant";

import { useState } from "react";

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 200,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 200,
          boxSizing: "border-box",
        },
      }}
    >
      <Box sx={{ overflow: "auto" }}>
        <List>
          <ListItem>
            <ListItemButton onClick={handleToggle}>
              <ListItemIcon sx={{ minWidth: 30 }}>
                {" "}
                {/* Ajusta el espacio entre el icono y el texto */}
                <LiquorIcon />
              </ListItemIcon>
              <ListItemText
                primary="Bebidas"
                disableTypography={true}
                sx={{ fontSize: 20, fontWeight: "bold" }}
              />
              {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
          </ListItem>

          <Collapse
            in={open}
            timeout={300}
            unmountOnExit
            sx={{
              transitionTimingFunction: "ease-in-out", // Curva de animación suave
            }}
          >
            <List component="div" disablePadding sx={{ backgroundColor: "#" }}>
              <ListItem sx={{ pl: 4, py: 0.25 }}>
                {" "}
                {/* Ajusta el espaciado vertical */}
                <ListItemButton component={Link} to="/mozos">
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    {" "}
                    {/* Ajusta el espacio entre el icono y el texto */}
                    <PersonIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Mozos"
                    disableTypography={true}
                    sx={{ fontSize: 18, fontWeight: "bold" }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem sx={{ pl: 4, py: 0.25 }}>
                {" "}
                {/* Ajusta el espaciado vertical */}
                <ListItemButton component={Link} to="/productos">
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    {" "}
                    {/* Ajusta el espacio entre el icono y el texto */}
                    <LiquorIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Productos"
                    disableTypography={true}
                    sx={{ fontSize: 18, fontWeight: "bold" }}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem sx={{ pl: 4, py: 0.25 }}>
                {" "}
                {/* Ajusta el espaciado vertical */}
                <ListItemButton component={Link} to="/despacho">
                  <ListItemIcon sx={{ minWidth: 30 }}>
                    {" "}
                    {/* Ajusta el espacio entre el icono y el texto */}
                    <TableRestaurantIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Despacho"
                    disableTypography={true}
                    sx={{ fontSize: 18, fontWeight: "bold" }}
                  />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
