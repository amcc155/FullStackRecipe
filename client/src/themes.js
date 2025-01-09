import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#FF6532', // Hero background color
    },
    secondary: {
      main: '#FF8A65', // Lighter accent color
    },
    background: {
      default: '#FFFFFF', // Light background for the body
      paper: '#F5F5F5', // Light background for paper components
    },
    text: {
      primary: '#333333', // Dark text color for contrast
      secondary: '#666666', // Medium dark text color
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h1: {
      fontSize: '2.5rem',
      fontWeight: 700,
      color: '#FF6532', // Primary color for headings
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 700,
      color: '#FF6532', // Primary color for headings
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 700,
      color: '#FF6532', // Primary color for headings
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 700,
      color: '#FF6532', // Primary color for headings
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 700,
      color: '#FF6532', // Primary color for headings
    },
    h6: {
      fontSize: '1rem',
      fontWeight: 700,
      color: '#FF6532', // Primary color for headings
    },
    body1: {
      fontSize: '1rem',
      fontWeight: 400,
      color: '#333333', // Dark text color for body text
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 400,
      color: '#666666', // Medium dark text color for secondary text
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          backgroundColor: '#FF6532', // Primary color for buttons
          color: '#FFFFFF', // White text color for buttons
          '&:hover': {
            backgroundColor: '#FF8A65', // Lighter accent color on hover
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: '#F5F5F5', // Light background for paper components
          color: '#333333', // Dark text color for paper components
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#FF6532', // Primary color for app bar
          color: '#FFFFFF', // White text color for app bar
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          color: '#333333', // Dark text color for input
          '& .MuiInputBase-input': {
            color: '#333333', // Dark text color for input base
          },
          '& .MuiInput-underline:before': {
            borderBottomColor: '#FF6532', // Primary color for input underline
          },
          '& .MuiInput-underline:hover:before': {
            borderBottomColor: '#FF6532', // Primary color for input underline on hover
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#FF8A65', // Lighter accent color for input underline after focus
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiInputBase-input': {
            color: '#333333', // Dark text color for text field input
          },
          '& .MuiInputLabel-root': {
            color: '#666666', // Medium dark text color for text field label
          },
          '& .MuiInput-underline:before': {
            borderBottomColor: '#FF6532', // Primary color for text field underline
          },
          '& .MuiInput-underline:hover:before': {
            borderBottomColor: '#FF6532', // Primary color for text field underline on hover
          },
          '& .MuiInput-underline:after': {
            borderBottomColor: '#FF8A65', // Lighter accent color for text field underline after focus
          },
        },
      },
    },
  },
});

export default theme;