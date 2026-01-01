import { createTheme } from "@mui/material/styles";

export const getTheme = (mode) =>
  createTheme({
    palette: {
      mode,
      ...(mode === "dark"
        ? {
            background: {
              default: "#0b1120",
              paper: "rgba(255,255,255,0.08)",
            },
          }
        : {
            background: {
              default: "#f4f6f8",
              paper: "#ffffff",
            },
          }),
    },
    shape: {
      borderRadius: 12,
    },
    typography: {
      fontFamily: "Inter, system-ui, sans-serif",
    },
  });
