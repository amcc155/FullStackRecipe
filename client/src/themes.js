import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff7043", // Vibrant orange for buttons and accents
    },
    secondary: {
      main: "#8bc34a", // Fresh green for secondary elements
    },
    background: {
      default: "#f5f5f5", // Light gray for background areas
      paper: "#ffffff", // Clean white for cards and containers
    },
    text: {
      primary: "#333333", // Dark text for readability
      secondary: "#666666", // Lighter text for secondary information
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
    h4: {
      fontWeight: 600,
      color: "#ff7043", // Title color
    },
    body1: {
      fontSize: "1rem",
      color: "#333333", // General text color
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12, // Rounded corners for cards
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)", // Soft shadow
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
         
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 20, // Rounded buttons for a friendly look
          textTransform: "none", // Keep text in buttons lowercase
        },
      },
    },
  },
});

export default theme;
