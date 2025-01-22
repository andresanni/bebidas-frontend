import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import { Link } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import LiquorIcon from "@mui/icons-material/Liquor";

const Sidebar = () => {
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
            <ListItemButton component={Link} to="/mozos">
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary="Mozos" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton component={Link} to="/bebidas">
              <ListItemIcon>
                <LiquorIcon />
              </ListItemIcon>
              <ListItemText primary="Bebidas" />
            </ListItemButton>
          </ListItem>

          {/* Agrega más elementos aquí */}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
