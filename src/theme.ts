import { blue } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          fontSize: 20,
        },
      },
    },
  },
});
