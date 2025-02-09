import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "black",
    },
    text: {
      primary: "#E2D7D5",
    },
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "#E2D7D5",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: 18,
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "black",
        },
      },
    },
  },
});
